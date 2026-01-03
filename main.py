import dotenv
import os

# CRITICAL: Load environment variables FIRST, before any other imports
# that might need them (like routes.route which initializes OpenAI client)
dotenv.load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from database.database import init_postgres, close_postgres
from routes.route import router
import uvicorn
import logging
from pathlib import Path


# Configure logging
def setup_logging():
    """Configure logging with file output and configurable log level."""
    # Get log level from environment variable, default to INFO
    log_level = os.getenv("LOG_LEVEL", "INFO").upper()

    # Set up the logging directory and file
    log_file = Path(__file__).parent / "api.log"

    # Create formatter
    formatter = logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        datefmt='%Y-%m-%d %H:%M:%S'
    )

    # File handler
    file_handler = logging.FileHandler(log_file)
    file_handler.setLevel(getattr(logging, log_level))
    file_handler.setFormatter(formatter)

    # Console handler
    console_handler = logging.StreamHandler()
    console_handler.setLevel(getattr(logging, log_level))
    console_handler.setFormatter(formatter)

    # Configure root logger
    root_logger = logging.getLogger()
    root_logger.setLevel(getattr(logging, log_level))
    root_logger.addHandler(file_handler)
    root_logger.addHandler(console_handler)

    return logging.getLogger(__name__)


# Initialize logging
logger = setup_logging()


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("=" * 80)
    logger.info("Starting FastAPI Portfolio RAG ChatBot API")
    logger.info(f"Log level: {os.getenv('LOG_LEVEL', 'INFO')}")
    logger.info("=" * 80)

    logger.info("Initializing PostgreSQL connection pool")
    await init_postgres()
    logger.info("PostgreSQL connection pool initialized successfully")

    logger.info("Application startup complete")
    yield

    logger.info("Shutting down application")
    await close_postgres()
    logger.info("PostgreSQL connection pool closed")
    logger.info("Application shutdown complete")


app: FastAPI = FastAPI(lifespan=lifespan, title="FastAPI Portfolio RAG ChatBot API")
app.include_router(router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#def main():
#    print("Hello from portfolio!")


#if __name__ == "__main__":
#    main()
