# Portfolio Backend API

A FastAPI-based backend service that powers a portfolio website with RAG (Retrieval-Augmented Generation) chatbot functionality. The API handles AI-powered conversations, contact form submissions, and portfolio content management using OpenAI embeddings and PostgreSQL with pgvector for semantic search.

## Technology Stack

- **FastAPI** - Modern, high-performance Python web framework
- **Gunicorn** - Production WSGI HTTP server with Uvicorn workers
- **PostgreSQL + pgvector** - Vector database for embeddings
- **OpenAI API** - GPT models and embeddings
- **Asyncpg** - Async PostgreSQL driver
- **Python 3.10+** - Programming language

## Features

- AI-powered chatbot using RAG (Retrieval-Augmented Generation)
- Vector similarity search for context-aware responses
- Contact form with SMTP email notifications
- Portfolio content management with embedding generation
- Automatic database connection pooling
- Health check endpoints
- Comprehensive logging
- Production-ready with Gunicorn

## Project Structure

```
personal_api/
├── database/
│   └── database.py             # PostgreSQL connection and pooling
├── docs/
│   └── nginx.conf              # Production Nginx reverse proxy config
├── models/
│   └── model.py                # Pydantic request/response models
├── routes/
│   └── route.py                # API endpoint definitions
├── .env                        # Environment variables (not committed)
├── env.example                 # Environment variable template
├── Dockerfile                  # Production container configuration
├── gunicorn.conf.py            # Gunicorn server configuration
├── main.py                     # FastAPI application entry point
├── requirements.txt            # Python dependencies
└── README.md                   # This file
```

## Prerequisites

- Python 3.10 or higher
- PostgreSQL 13+ with pgvector extension
- OpenAI API account with API key
- SMTP server credentials (for contact form)

## Getting Started

### Installation

1. **Create a virtual environment** (recommended):
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Linux/Mac
   # OR
   venv\Scripts\activate     # On Windows
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure environment variables:**
   ```bash
   cp env.example .env
   ```

   Edit `.env` with your configuration:
   ```bash
   # Database Configuration
   DATABASE_URL=postgres://apiuser:password@localhost:5432/personal-ai?sslmode=disable

   # OpenAI API Configuration
   OPENAI_API_KEY=sk-proj-your-api-key-here
   OPENAI_ORG_ID=org-your-org-id-here
   OPENAI_PROJECT_ID=proj_your-project-id-here

   # Logging Configuration
   LOG_LEVEL=INFO

   # SMTP Email Configuration
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-16-char-app-password

   # Email recipient for contact form
   EMAIL_TO=recipient@example.com
   ```

## Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Yes | `postgres://user:pass@host:5432/db` |
| `OPENAI_API_KEY` | OpenAI API key | Yes | `sk-proj-...` |
| `OPENAI_ORG_ID` | OpenAI organization ID | Yes | `org-...` |
| `OPENAI_PROJECT_ID` | OpenAI project ID | Yes | `proj_...` |
| `SMTP_HOST` | SMTP server hostname | Yes | `smtp.gmail.com` |
| `SMTP_PORT` | SMTP server port | Yes | `587` |
| `SMTP_USER` | SMTP username | Yes | `email@gmail.com` |
| `SMTP_PASSWORD` | SMTP password (App Password for Gmail) | Yes | 16-char password |
| `EMAIL_TO` | Contact form recipient email | Yes | `contact@example.com` |
| `LOG_LEVEL` | Logging verbosity | No | `INFO` (DEBUG, INFO, WARNING, ERROR, CRITICAL) |
| `GUNICORN_WORKERS` | Number of worker processes | No | `4` (default: CPU count * 2 + 1) |
| `GUNICORN_RELOAD` | Auto-reload on code changes | No | `false` (set `true` for dev) |

### Database Setup

The database is automatically initialized by the Docker Compose stack. For manual setup:

1. **Install PostgreSQL with pgvector:**
   ```bash
   # Ubuntu/Debian
   sudo apt install postgresql postgresql-contrib
   ```

2. **Install pgvector extension:**
   ```bash
   sudo -u postgres psql
   CREATE EXTENSION vector;
   ```

3. **Create database and user:**
   ```sql
   CREATE DATABASE "personal-ai";
   CREATE USER apiuser WITH PASSWORD 'changeme';
   GRANT ALL PRIVILEGES ON DATABASE "personal-ai" TO apiuser;
   ```

4. **Create tables:**
   ```sql
   \c personal-ai

   CREATE TABLE IF NOT EXISTS portfolio_embeddings (
     id SERIAL PRIMARY KEY,
     content TEXT NOT NULL,
     embedding VECTOR(1536) NOT NULL
   );

   GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO apiuser;
   GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO apiuser;
   ```

## Running the Application

### Development Mode

**With Uvicorn (simple, auto-reload):**
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

**With Gunicorn (production-like, auto-reload):**
```bash
GUNICORN_RELOAD=true gunicorn main:app -c gunicorn.conf.py
```

The API will be available at:
- API: http://localhost:8000
- Interactive docs: http://localhost:8000/docs
- Alternative docs: http://localhost:8000/redoc

### Production Mode

**Using Gunicorn with Uvicorn workers (recommended):**

```bash
# Simple command
gunicorn main:app -c gunicorn.conf.py

# Or without config file
gunicorn main:app \
  --workers 4 \
  --worker-class uvicorn.workers.UvicornWorker \
  --bind 0.0.0.0:8000 \
  --timeout 120
```

**Gunicorn configuration** (`gunicorn.conf.py`):
- Workers: Automatically calculated based on CPU cores
- Worker class: Uvicorn (ASGI support)
- Timeout: 120 seconds for long-running requests
- Graceful shutdown: 30 seconds
- Max requests: 1000 per worker (prevents memory leaks)

## API Endpoints

### Public Endpoints

#### `POST /chat/`
AI chatbot interaction using RAG.

**Request body:**
```json
{
  "message": "Tell me about your experience with Python"
}
```

**Response:**
```json
{
  "response": "Based on my portfolio, I have extensive experience with Python..."
}
```

#### `POST /contact/`
Submit contact form with email notification.

**Request body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I'd like to discuss an opportunity"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Message sent successfully"
}
```

### Admin Endpoints (IP-restricted in production)

#### `POST /add-entry/`
Add a portfolio entry with automatic embedding generation.

**Request body:**
```json
{
  "content": "Led development of a React-based web application..."
}
```

**Response:**
```json
{
  "status": "success",
  "id": 123
}
```

#### `POST /add-file/`
Upload a document and extract content for embedding.

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: File upload

**Response:**
```json
{
  "status": "success",
  "id": 124,
  "content_preview": "First 100 characters..."
}
```

### Documentation Endpoints

- `GET /docs` - Swagger UI (interactive API documentation)
- `GET /redoc` - ReDoc (alternative documentation)

## Docker Usage

### Development with Docker Compose

From the parent directory (`personal_main/`):

```bash
# Build and start API container
docker compose up api

# Start in detached mode
docker compose up -d api

# View logs
docker compose logs -f api

# Restart after code changes
docker compose restart api

# Rebuild and restart
docker compose up -d --build api
```

**Container details:**
- Name: `api.dw.com`
- Port: 8000:8000
- IP: 172.19.1.10
- Depends on: PostgreSQL database

### Standalone Docker Build

```bash
# Build Docker image
docker build -t portfolio-api .

# Run container
docker run -p 8000:8000 \
  --env-file .env \
  portfolio-api
```

### Docker Container Management

```bash
# Access container shell
docker compose exec api bash

# Check Python version
docker compose exec api python --version

# View environment variables
docker compose exec api env

# Run database migrations (if applicable)
docker compose exec api python scripts/migrate.py
```

## Production Deployment

### Deployment Overview

Production deployment uses Nginx as a reverse proxy to handle SSL/TLS termination, IP restrictions for admin endpoints, and load balancing.

### 1. Configure Environment Variables

Update `.env` for production:

```bash
# Use production database hostname
DATABASE_URL=postgres://apiuser:strongpassword@pgsql.dw.com:5432/personal-ai?sslmode=disable

# Add real OpenAI credentials
OPENAI_API_KEY=sk-proj-your-real-key
OPENAI_ORG_ID=org-your-real-org
OPENAI_PROJECT_ID=proj_your-real-project

# Configure production SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-production-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_TO=contact@yourdomain.com

# Set production logging
LOG_LEVEL=INFO
```

**Important for Gmail SMTP:**
1. Enable 2-Factor Authentication
2. Create App Password at https://myaccount.google.com/apppasswords
3. Use the 16-character password (remove spaces)
4. Never use your regular Gmail password

### 2. Start Docker Container

```bash
# Start API container
docker compose up -d api

# Verify it's running
docker compose ps api

# Check logs
docker compose logs -f api
```

### 3. Configure Nginx Reverse Proxy

Copy the provided Nginx configuration:

```bash
# Copy configuration
sudo cp docs/nginx.conf /etc/nginx/sites-available/personal-api

# Edit to update domain and IP restrictions
sudo nano /etc/nginx/sites-available/personal-api
```

**Key Nginx configuration features:**

```nginx
server {
    listen 80;
    server_name ps-api.daveywalbeck.com;

    # Admin endpoints - restricted by IP
    location ~ ^/(add-entry|add-file)/ {
        allow YOUR.IP.ADDRESS.HERE;
        deny all;

        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Public endpoints
    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

**Enable the site:**
```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/personal-api /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### 4. Configure SSL/TLS

```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d ps-api.daveywalbeck.com

# Certbot automatically updates Nginx config for HTTPS
```

### 5. Production Systemd Service (Alternative to Docker)

For direct deployment without Docker:

**Create systemd service** (`/etc/systemd/system/portfolio-api.service`):

```ini
[Unit]
Description=Portfolio API Service
After=network.target postgresql.service

[Service]
Type=notify
User=www-data
Group=www-data
WorkingDirectory=/opt/portfolio/backend
Environment="PATH=/opt/portfolio/backend/venv/bin"
ExecStart=/opt/portfolio/backend/venv/bin/gunicorn main:app -c gunicorn.conf.py
ExecReload=/bin/kill -s HUP $MAINPID
KillMode=mixed
TimeoutStopSec=30
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```

**Install and manage:**
```bash
# Install service
sudo systemctl daemon-reload
sudo systemctl enable portfolio-api

# Start service
sudo systemctl start portfolio-api

# Check status
sudo systemctl status portfolio-api

# View logs
sudo journalctl -u portfolio-api -f
```

### Production Deployment Checklist

- [ ] Update `.env` with production credentials
- [ ] Verify DATABASE_URL points to production database
- [ ] Test OpenAI API connection
- [ ] Configure SMTP with App Password (Gmail)
- [ ] Set LOG_LEVEL to INFO
- [ ] Update Nginx config with correct domain
- [ ] Add your IP to admin endpoint restrictions
- [ ] Set up SSL/TLS certificates
- [ ] Start Docker containers
- [ ] Test API endpoints
- [ ] Verify chatbot responses
- [ ] Test contact form email delivery
- [ ] Check logs for errors
- [ ] Monitor resource usage

### Updating Production

```bash
# Pull latest code
cd personal_api
git pull

# Rebuild and restart container
docker compose up -d --build api

# Or for systemd deployment
sudo systemctl restart portfolio-api

# Verify service is running
docker compose ps api
# OR
sudo systemctl status portfolio-api

# Monitor logs
docker compose logs -f api
# OR
sudo journalctl -u portfolio-api -f
```

## Unit Testing

### Testing Framework

The API uses **pytest** for unit testing with async support.

**Testing tools:**
- **pytest** - Testing framework
- **pytest-asyncio** - Async test support
- **httpx** - Async HTTP client for API testing
- **pytest-cov** - Coverage reporting

### Installing Test Dependencies

```bash
# Install test dependencies
pip install pytest pytest-asyncio httpx pytest-cov

# Or add to requirements.txt
echo "pytest>=7.4.0" >> requirements.txt
echo "pytest-asyncio>=0.21.0" >> requirements.txt
echo "httpx>=0.24.0" >> requirements.txt
echo "pytest-cov>=4.1.0" >> requirements.txt
```

### Test Structure

```
personal_api/
├── tests/
│   ├── __init__.py
│   ├── conftest.py             # Shared fixtures
│   ├── test_database.py        # Database tests
│   ├── test_routes.py          # API endpoint tests
│   ├── test_embeddings.py      # Embedding generation tests
│   └── test_email.py           # Email functionality tests
├── routes/
│   └── route.py
├── database/
│   └── database.py
└── models/
    └── model.py
```

### Running Tests

```bash
# Run all tests
pytest

# Run with verbose output
pytest -v

# Run specific test file
pytest tests/test_routes.py

# Run specific test
pytest tests/test_routes.py::test_chat_endpoint

# Run with coverage report
pytest --cov=. --cov-report=html

# Run with coverage and show missing lines
pytest --cov=. --cov-report=term-missing
```

### Writing Tests

**Example: Testing API endpoints:**

```python
# tests/test_routes.py
import pytest
from httpx import AsyncClient
from main import app

@pytest.mark.asyncio
async def test_chat_endpoint():
    async with AsyncClient(app=app, base_url="http://test") as client:
        response = await client.post(
            "/chat/",
            json={"message": "Hello, tell me about Python"}
        )
        assert response.status_code == 200
        data = response.json()
        assert "response" in data
        assert len(data["response"]) > 0

@pytest.mark.asyncio
async def test_contact_endpoint():
    async with AsyncClient(app=app, base_url="http://test") as client:
        response = await client.post(
            "/contact/",
            json={
                "name": "Test User",
                "email": "test@example.com",
                "message": "Test message"
            }
        )
        assert response.status_code == 200
        assert response.json()["status"] == "success"
```

**Example: Testing database operations:**

```python
# tests/test_database.py
import pytest
from database.database import get_pool, query_embeddings

@pytest.mark.asyncio
async def test_database_connection():
    pool = await get_pool()
    assert pool is not None

@pytest.mark.asyncio
async def test_query_embeddings():
    test_embedding = [0.1] * 1536  # Mock embedding
    results = await query_embeddings(test_embedding, limit=5)
    assert isinstance(results, list)
    assert len(results) <= 5
```

**Example: Testing with mocks:**

```python
# tests/test_email.py
import pytest
from unittest.mock import patch, MagicMock
from routes.route import send_contact_email

@pytest.mark.asyncio
@patch('smtplib.SMTP')
async def test_send_contact_email(mock_smtp):
    # Mock SMTP server
    mock_server = MagicMock()
    mock_smtp.return_value.__enter__.return_value = mock_server

    # Test email sending
    result = await send_contact_email(
        name="Test User",
        email="test@example.com",
        message="Test message"
    )

    assert result is True
    mock_server.send_message.assert_called_once()
```

### Test Configuration

**pytest configuration** (`pytest.ini` or `pyproject.toml`):

```ini
[pytest]
testpaths = tests
python_files = test_*.py
python_classes = Test*
python_functions = test_*
asyncio_mode = auto

# Coverage settings
[coverage:run]
omit =
    */tests/*
    */venv/*
    */__pycache__/*

[coverage:report]
exclude_lines =
    pragma: no cover
    def __repr__
    raise AssertionError
    raise NotImplementedError
    if __name__ == .__main__.:
```

### Testing Best Practices

1. **Use fixtures for common setup:**
   ```python
   # tests/conftest.py
   import pytest
   from httpx import AsyncClient
   from main import app

   @pytest.fixture
   async def client():
       async with AsyncClient(app=app, base_url="http://test") as client:
           yield client
   ```

2. **Test error handling:**
   ```python
   @pytest.mark.asyncio
   async def test_invalid_chat_request(client):
       response = await client.post("/chat/", json={})
       assert response.status_code == 422  # Validation error
   ```

3. **Mock external dependencies:**
   ```python
   @patch('openai.OpenAI')
   def test_openai_integration(mock_openai):
       mock_openai.return_value.embeddings.create.return_value = Mock()
       # Test code here
   ```

4. **Test database transactions:**
   ```python
   @pytest.mark.asyncio
   async def test_add_entry_rollback():
       # Test that failed inserts don't leave partial data
       with pytest.raises(Exception):
           await add_portfolio_entry(invalid_data)
   ```

### Coverage Goals

- **Statements:** 80%+
- **Branches:** 75%+
- **Functions:** 85%+
- **Lines:** 80%+

### Continuous Integration

**GitHub Actions example:**

```yaml
name: Test API

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: axiosmedia/postgres-pgvector:15.8-0.7.3
        env:
          POSTGRES_PASSWORD: testpass
          POSTGRES_DB: test_db
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v3

      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.10'

      - name: Install dependencies
        run: |
          pip install -r requirements.txt
          pip install pytest pytest-asyncio pytest-cov

      - name: Run tests
        env:
          DATABASE_URL: postgres://postgres:testpass@localhost:5432/test_db
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
        run: pytest --cov=. --cov-report=xml

      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

## Operational Keypoints

### Monitoring and Logging

**Log files:**
- Application logs: `api.log` in the application directory
- Gunicorn access logs: stdout (captured by Docker or systemd)
- Gunicorn error logs: stdout (captured by Docker or systemd)

**View logs:**
```bash
# Docker deployment
docker compose logs -f api

# Systemd deployment
sudo journalctl -u portfolio-api -f

# Application log file
tail -f api.log
```

**Log levels:**
- `DEBUG` - Detailed information for debugging
- `INFO` - General informational messages (default)
- `WARNING` - Warning messages
- `ERROR` - Error messages
- `CRITICAL` - Critical errors

### Performance Tuning

**Gunicorn workers:**
```bash
# Calculate optimal workers
# Formula: (2 x CPU cores) + 1
GUNICORN_WORKERS=4 docker compose up -d api
```

**Database connection pooling:**
- Connections automatically managed by asyncpg
- Pool size scales with number of workers
- Connections closed on shutdown

**OpenAI rate limiting:**
- Monitor usage at https://platform.openai.com/usage
- Implement request queuing if hitting limits
- Consider caching common responses

### Security Considerations

1. **Environment variables:**
   - Never commit `.env` to version control
   - Use strong database passwords
   - Rotate API keys regularly

2. **Admin endpoints:**
   - Always restrict by IP in production
   - Update allowed IPs in Nginx config
   - Consider adding authentication

3. **CORS configuration:**
   - Production should restrict origins
   - Update `allow_origins` in `main.py:main.py:79`
   - Use specific domains instead of `*`

4. **Database security:**
   - Use SSL connections in production
   - Limit database user permissions
   - Regular backups

## Troubleshooting

### Application Won't Start

**Check environment variables:**
```bash
# Verify .env file exists
ls -la .env

# Check variables are loaded
docker compose exec api env | grep OPENAI
```

**Common errors:**
- "OpenAI API key must be set" - Check OPENAI_API_KEY
- "Database connection failed" - Verify DATABASE_URL
- "Module not found" - Run `pip install -r requirements.txt`

### Database Connection Issues

**Verify database is running:**
```bash
# Check database container
docker compose ps db

# Test connection
docker compose exec db psql -U apiuser -d personal-ai -c "SELECT 1;"
```

**Connection string format:**
```
postgres://username:password@hostname:port/database?sslmode=disable
```

### OpenAI API Issues

**Rate limiting:**
- Error: "Rate limit exceeded"
- Solution: Implement exponential backoff, upgrade plan

**Invalid API key:**
- Error: "Incorrect API key"
- Solution: Verify key at https://platform.openai.com/api-keys

**Quota exceeded:**
- Error: "You exceeded your current quota"
- Solution: Add billing information or upgrade plan

### Email Issues

**Gmail SMTP authentication:**
1. Enable 2-Factor Authentication
2. Create App Password: https://myaccount.google.com/apppasswords
3. Use 16-character password (no spaces)
4. Never use your regular password

**Common errors:**
- "Username and Password not accepted" (535) - Wrong credentials
- "Application-specific password required" (534) - Need App Password
- "Connection refused" - Check SMTP_HOST and SMTP_PORT

**Testing email:**
```python
# Test SMTP connection
import smtplib
smtp = smtplib.SMTP('smtp.gmail.com', 587)
smtp.starttls()
smtp.login('your-email@gmail.com', 'your-app-password')
smtp.quit()
```

### Performance Issues

**Slow responses:**
- Check database query performance
- Monitor OpenAI API latency
- Increase Gunicorn workers
- Add caching layer

**High memory usage:**
- Reduce max_requests in gunicorn.conf.py
- Decrease number of workers
- Monitor with `docker stats`

**Database connection exhaustion:**
- Increase connection pool size
- Check for unclosed connections
- Review query efficiency

## Additional Resources

- **FastAPI Documentation:** https://fastapi.tiangolo.com/
- **Gunicorn Documentation:** https://docs.gunicorn.org/
- **OpenAI API Documentation:** https://platform.openai.com/docs
- **pgvector Documentation:** https://github.com/pgvector/pgvector
- **PostgreSQL Documentation:** https://www.postgresql.org/docs/

## Support

For issues related to:
- **API bugs:** Check application logs (`api.log`)
- **Database issues:** See database troubleshooting section
- **Frontend integration:** See `../personal_site/README.md`
- **Docker setup:** See `../README.md`

## License

This project is for personal portfolio use.
