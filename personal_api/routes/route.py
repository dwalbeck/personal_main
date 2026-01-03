from fastapi import APIRouter, HTTPException, Depends, UploadFile, File
from models.model import PortfolioEntryCreate, PortfolioEntryResponse, QueryRequest, ContactRequest
from database.database import get_postgres
import asyncpg
from typing import List
import os
from openai import OpenAI
import numpy as np
import logging
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

router = APIRouter()
logger = logging.getLogger(__name__)



client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
    organization=os.getenv("OPENAI_ORG_ID"),
    project=os.getenv("OPENAI_PROJECT_ID"),
)


async def generate_embedding(content: str) -> List[float]:
    """
    Generate an embedding for the given content using OpenAI API.
    """
    try:
        content = content.replace("\n", " ")
        response = client.embeddings.create(
            input=[content],
            model="text-embedding-3-small",
        )
        return response.data[0].embedding
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating embedding: {e}")


@router.post("/add-entry/", response_model=PortfolioEntryResponse)
async def add_portfolio_entry(
    entry: PortfolioEntryCreate, pool: asyncpg.Pool = Depends(get_postgres)
):
    """
    Add a new portfolio entry and store its embedding in PostgreSQL.
    """
    logger.info("POST /add-entry/ - Request started")
    logger.debug(f"POST /add-entry/ - Entry content length: {len(entry.content)} characters")

    try:
        logger.debug("Generating embedding for entry content")
        embedding = await generate_embedding(entry.content)

        embedding_np = np.array(embedding)

        logger.debug("Inserting entry into database")
        async with pool.acquire() as conn:
            row = await conn.fetchrow(
                """
                INSERT INTO portfolio_embeddings (content, embedding)
                VALUES ($1, $2)
                RETURNING id, content, embedding
                """,
                entry.content,
                embedding_np,
            )
            if row:
                logger.info(f"POST /add-entry/ - Request completed successfully (entry_id: {row['id']})")
                return PortfolioEntryResponse(
                    id=row["id"], content=row["content"], embedding=row["embedding"]
                )
            else:
                logger.error("POST /add-entry/ - Failed to insert entry into database")
                raise HTTPException(
                    status_code=500, detail="Failed to insert entry into the database."
                )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"POST /add-entry/ - Request failed with error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to add entry: {e}")


@router.post("/add-file", response_model=PortfolioEntryResponse)
async def add_portfolio_file(
    file: UploadFile = File(...), pool: asyncpg.Pool = Depends(get_postgres)
):
    """
    Add a new portfolio entry from an uploaded file and store its embedding in PostgreSQL.
    """
    logger.info("POST /add-file - Request started")
    logger.debug(f"POST /add-file - File name: {file.filename}, Content type: {file.content_type}")

    try:
        # Read file contents
        logger.debug("Reading file contents")
        file_contents = await file.read()
        content = file_contents.decode('utf-8')

        logger.debug(f"POST /add-file - File content length: {len(content)} characters")

        # Generate embedding for the file content
        logger.debug("Generating embedding for file content")
        embedding = await generate_embedding(content)

        embedding_np = np.array(embedding)

        # Insert entry into database
        logger.debug("Inserting entry into database")
        async with pool.acquire() as conn:
            row = await conn.fetchrow(
                """
                INSERT INTO portfolio_embeddings (content, embedding)
                VALUES ($1, $2)
                RETURNING id, content, embedding
                """,
                content,
                embedding_np,
            )
            if row:
                logger.info(f"POST /add-file - Request completed successfully (entry_id: {row['id']})")
                return PortfolioEntryResponse(
                    id=row["id"], content=row["content"], embedding=row["embedding"]
                )
            else:
                logger.error("POST /add-file - Failed to insert entry into database")
                raise HTTPException(
                    status_code=500, detail="Failed to insert entry into the database."
                )
    except UnicodeDecodeError as e:
        logger.error(f"POST /add-file - File encoding error: {str(e)}")
        raise HTTPException(
            status_code=400, detail="File must be a valid UTF-8 text file."
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"POST /add-file - Request failed with error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to add file: {e}")


@router.post("/chat/")
async def chat(query: QueryRequest, pool: asyncpg.Pool = Depends(get_postgres)):
    """
    Chat with the portfolio chatbot by retrieving relevant information from stored embeddings
    and using it as context to generate a response.
    """
    logger.info("POST /chat/ - Request started")
    logger.debug(f"POST /chat/ - Query: {query.query[:100]}...")  # Log first 100 chars

    try:
        logger.debug("Generating embedding for query")
        query_embedding = await generate_embedding(query.query)

        query_embedding_np = np.array(query_embedding)

        logger.debug("Fetching similar portfolio entries from database")
        async with pool.acquire() as conn:
            rows = await conn.fetch(
                """
                SELECT content, embedding <=> $1 AS similarity
                FROM portfolio_embeddings
                ORDER BY similarity
                LIMIT 5
                """,
                query_embedding_np,
            )

            logger.debug(f"Found {len(rows)} relevant portfolio entries")
            context = "\n".join([row["content"] for row in rows])

        logger.debug("Generating chat completion with OpenAI")
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are YOUR NAME, and you are answering questions as yourself, using 'I' and 'my' in your responses. "
                        "You should respond to questions about your portfolio, skills, experience, and education. For example, you should answer questions about specific technologies you've worked with, such as Java, React, or other tools. "
                        "If you have relevant experience with a technology, describe it concisely. For example, if asked about Java, describe your experience using it. "
                        "You should also answer questions about your education, including your experience at school, and your work in relevant industries. "
                        "However, if a question is completely unrelated to your professional experience, such as questions about recipes, trivia, or non-technical personal matters, respond with: 'That question isn't relevant to my experience or skills.' "
                        "Focus on answering technical and career-related questions, but only reject questions that are clearly off-topic."
                        "If they ask you about a technology you havent used, you can say: 'I haven't worked with that technology yet, but I'm always eager to learn new things.'"
                        "Answer any personal questions that are related to technology, like 'What are our favorite languages?' or 'What technology/language/anything tech are you most excited about?'"
                    ),
                },
                {
                    "role": "user",
                    "content": f"Context: {context}\n\nQuestion: {query.query}",
                },
            ],
            max_tokens=200,
            stream=False,
        )

        logger.info("POST /chat/ - Request completed successfully")
        return {"response": response.choices[0].message.content}

    except Exception as e:
        logger.error(f"POST /chat/ - Request failed with error: {str(e)}")
        raise HTTPException(
            status_code=500, detail=f"Failed to process chat request: {e}"
        )


@router.post("/contact/")
async def contact(contact_data: ContactRequest):
    """
    Handle contact form submission and send email.
    """
    logger.info("POST /contact/ - Request started")
    logger.debug(f"POST /contact/ - From: {contact_data.firstName} {contact_data.lastName} ({contact_data.email})")

    try:
        # Create email message
        msg = MIMEMultipart()
        msg['From'] = contact_data.email
        msg['To'] = os.getenv("EMAIL_TO")
        msg['Subject'] = f"Personal Site Contact Form - {contact_data.firstName} {contact_data.lastName}"

        # Create email body
        body = f"""
New contact form submission from personal website:

Name: {contact_data.firstName} {contact_data.lastName}
Email: {contact_data.email}
Phone: {contact_data.phone}

Message:
{contact_data.message}
"""

        msg.attach(MIMEText(body, 'plain'))

        # Get SMTP settings from environment
        smtp_host = os.getenv("SMTP_HOST", "localhost")
        smtp_port = int(os.getenv("SMTP_PORT", "25"))
        smtp_user = os.getenv("SMTP_USER", "")
        smtp_password = os.getenv("SMTP_PASSWORD", "")

        # Strip whitespace from password (App Passwords often have spaces when copied)
        if smtp_password:
            smtp_password = smtp_password.replace(" ", "").replace("\n", "").replace("\r", "").strip()

        logger.debug(f"Sending email via SMTP server: {smtp_host}:{smtp_port}")
        logger.debug(f"SMTP user: {smtp_user}")
        logger.debug(f"SMTP password length: {len(smtp_password)} characters")
        logger.debug(f"SMTP password (masked): {'*' * min(len(smtp_password), 16)}")

        # Send email
        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.set_debuglevel(1)  # Enable SMTP debug output
            if smtp_user and smtp_password:
                logger.debug("Starting TLS...")
                server.starttls()
                logger.debug(f"Attempting login with user: {smtp_user}")
                server.login(smtp_user, smtp_password)
                logger.debug("Login successful")

            server.send_message(msg)

        logger.info("POST /contact/ - Email sent successfully")
        return {"status": "success", "message": "Contact form submitted successfully"}

    except Exception as e:
        logger.error(f"POST /contact/ - Request failed with error: {str(e)}")
        raise HTTPException(
            status_code=500, detail=f"Failed to send contact email: {e}"
        )
