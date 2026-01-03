# Portfolio Backend API

FastAPI-based backend for the portfolio website with RAG (Retrieval-Augmented Generation) chatbot functionality.

## Prerequisites

- Python 3.10 or higher
- PostgreSQL with pgvector extension
- OpenAI API key

## Environment Setup

1. **Create a virtual environment** (recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Linux/Mac
   # OR
   venv\Scripts\activate  # On Windows
   ```

2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure environment variables**:
   ```bash
   cp env.example .env
   # Edit .env with your actual configuration
   ```

   Required environment variables:
   - `DATABASE_URL` - PostgreSQL connection string with pgvector
   - `OPENAI_API_KEY` - Your OpenAI API key
   - `OPENAI_ORG_ID` - Your OpenAI organization ID
   - `OPENAI_PROJECT_ID` - Your OpenAI project ID
   - `SMTP_*` - SMTP configuration for contact form emails
   - `EMAIL_TO` - Recipient email for contact form submissions

## Running the Application

### Development Mode

With auto-reload enabled:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

Or with Gunicorn (with reload):
```bash
GUNICORN_RELOAD=true gunicorn main:app -c gunicorn.conf.py
```

### Production Mode

**Recommended: Using Gunicorn with Uvicorn workers**

Simple command:
```bash
gunicorn main:app -c gunicorn.conf.py
```

Or without config file:
```bash
gunicorn main:app \
  --workers 4 \
  --worker-class uvicorn.workers.UvicornWorker \
  --bind 0.0.0.0:8000 \
  --timeout 120
```

### Production with systemd (Recommended)

**Setup (one-time):**

1. **Install the application:**
   ```bash
   # Adjust paths as needed
   sudo mkdir -p /opt/portfolio/backend
   sudo cp -r . /opt/portfolio/backend/
   cd /opt/portfolio/backend

   # Create virtual environment
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

2. **Create log directory:**
   ```bash
   sudo mkdir -p /var/log/portfolio-api
   sudo chown www-data:www-data /var/log/portfolio-api
   ```

3. **Install systemd service:**
   ```bash
   sudo cp portfolio-api.service /etc/systemd/system/
   sudo systemctl daemon-reload
   sudo systemctl enable portfolio-api
   ```

**Daily usage:**
```bash
# Start the service
sudo systemctl start portfolio-api

# Stop the service
sudo systemctl stop portfolio-api

# Restart the service (use this after code/config changes)
sudo systemctl restart portfolio-api

# Reload without dropping connections (graceful restart)
sudo systemctl reload portfolio-api

# Check status
sudo systemctl status portfolio-api

# View logs
sudo journalctl -u portfolio-api -f

# View access logs
sudo tail -f /var/log/portfolio-api/access.log

# View error logs
sudo tail -f /var/log/portfolio-api/error.log
```

### Using Docker

Development:
```bash
docker-compose up api
```

Production build:
```bash
docker build -t portfolio-api .
docker run -p 8000:8000 --env-file .env portfolio-api
```

**To restart Docker container:**
```bash
docker-compose restart api
# or
docker restart <container-name>
```

## API Endpoints

- `POST /add-entry/` - Add a new portfolio entry with embedding
- `POST /add-file` - Add a portfolio entry from an uploaded file
- `POST /chat/` - Chat with the portfolio chatbot
- `POST /contact/` - Submit contact form

## Troubleshooting

### "OpenAI API key must be set" Error

This error occurs when environment variables aren't loaded before the OpenAI client is initialized. Make sure:

1. Your `.env` file exists in the backend directory
2. You're running the command from the backend directory
3. The `.env` file contains valid `OPENAI_API_KEY`, `OPENAI_ORG_ID`, and `OPENAI_PROJECT_ID`

### Database Connection Issues

Ensure your PostgreSQL database:
- Has the pgvector extension installed
- Is accessible from your server
- Has the correct credentials in `DATABASE_URL`

### Gmail SMTP Authentication Issues

If you're getting SMTP authentication errors like "Username and Password not accepted" (535) or "Application-specific password required" (534), follow these steps:

**1. Verify 2-Factor Authentication is enabled:**
   - Go to https://myaccount.google.com/security
   - Ensure "2-Step Verification" is ON
   - If it's not enabled, enable it first

**2. Create an App Password:**
   - Go to https://myaccount.google.com/apppasswords
   - If you don't see "App passwords", 2FA might not be enabled
   - Select "Mail" as the app type
   - Generate the password
   - Copy the 16-character password (it may be shown with spaces like "abcd efgh ijkl mnop")

**3. Update your .env file:**
   ```bash
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=abcdefghijklmnop  # 16 characters, NO SPACES
   ```
   **Important:** Remove any spaces from the App Password when pasting it into .env

**4. Verify the configuration:**
   - Ensure `SMTP_USER` matches the Google account that created the App Password
   - Ensure `SMTP_PASSWORD` is exactly 16 lowercase letters with no spaces
   - Restart the API after updating .env

**5. Check the logs:**
   The updated code includes detailed logging showing:
   - SMTP server and port being used
   - Username being used for authentication
   - Password length (actual password is masked for security)
   - Step-by-step SMTP conversation

   Check `api.log` for detailed error messages.

**Common issues:**
- **Spaces in password:** App Passwords are often displayed with spaces but must be entered without spaces
- **Wrong account:** The App Password must be created for the same Gmail account specified in `SMTP_USER`
- **Revoked password:** If you regenerate the App Password, you must update the .env file
- **2FA not enabled:** App Passwords only work when 2-Factor Authentication is enabled

**Alternative SMTP providers:**
If Gmail continues to have issues, consider using:
- **SendGrid:** Free tier available, more reliable for application emails
- **Mailgun:** Good for transactional emails
- **AWS SES:** Reliable and cost-effective if you're using AWS

## Logs

Application logs are written to `api.log` in the backend directory. You can control the log level with the `LOG_LEVEL` environment variable (DEBUG, INFO, WARNING, ERROR, CRITICAL).
