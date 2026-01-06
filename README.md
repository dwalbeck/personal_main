# Personal Professional Website

## Overview

A full-stack portfolio website designed to promote a candidate for employment. The site includes a React-based frontend, a FastAPI backend with RAG (Retrieval-Augmented Generation) chatbot functionality, and a PostgreSQL database with vector search capabilities.

Special thanks to **Samuel Harrison** and the [article](https://neon.com/guides/react-fastapi-rag-portfolio) that he wrote, upon which the core of this project was constructed.

## Features
- Professional layout and page sections
- Organized and easily readable Skills section
- Automatic slideshow for personal interests
- Contact form that will email submissions to you
- AI Chat feature able to handle all questions about your work experience
- RAG local DB populated with your unique data
- Easily extensible for anything you may want to add

## Architecture

This project consists of three main components running in a Docker Compose stack:

### Component Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         User Browser                          │
└────────────────┬──────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React + Vite)                    │
│  - Container: dw.com                                          │
│  - Port: 80 (external) → 5173 (internal)                     │
│  - IP: 172.19.1.20                                            │
│  - Serves UI, handles user interactions                       │
└────────────────┬──────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│               Backend API (FastAPI + Gunicorn)                │
│  - Container: api.dw.com                                      │
│  - Port: 8000 (both internal and external)                   │
│  - IP: 172.19.1.10                                            │
│  - Handles chat requests, contact forms, embeddings          │
└────────────────┬──────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│            Database (PostgreSQL + pgvector)                   │
│  - Container: pgsql.dw.com                                    │
│  - Port: 5431 (external) → 5432 (internal)                   │
│  - IP: 172.19.1.30                                            │
│  - Stores vectorized embeddings for AI chatbot               │
└─────────────────────────────────────────────────────────────┘
```

### 1. Frontend (React + TypeScript + Vite)

The presentation layer of the application:
- Built with React 18 and TypeScript
- Styled with Tailwind CSS
- Bundled with Vite for fast development and optimized production builds
- Communicates with the backend API for chat and contact form functionality
- Serves static assets and provides a responsive user interface

**Key Files:**
- `personal_site/` - Frontend application source
- `personal_site/Dockerfile-dev` - Container configuration
- `personal_site/docs/nginx.conf` - Production Nginx configuration

### 2. Backend API (FastAPI + Python)

The business logic and AI integration layer:
- FastAPI framework for high-performance API endpoints
- OpenAI integration for AI-powered chatbot
- RAG (Retrieval-Augmented Generation) using vector embeddings
- Contact form email functionality via SMTP
- Gunicorn with Uvicorn workers for production deployment

**Key Files:**
- `personal_api/` - Backend application source
- `personal_api/Dockerfile` - Container configuration
- `personal_api/docs/nginx.conf` - Production Nginx configuration
- `personal_api/routes/` - API endpoint definitions

**API Endpoints:**
- `POST /chat/` - AI chatbot interaction
- `POST /contact/` - Contact form submission
- `POST /add-entry/` - Add portfolio entry with embedding (admin)
- `POST /add-file/` - Upload portfolio document (admin)
- `GET /docs` - Interactive API documentation

### 3. Database (PostgreSQL + pgvector)

The data persistence layer:
- PostgreSQL 15.8 with pgvector 0.7.3 extension
- Stores vectorized embeddings (1536 dimensions) for semantic search
- Used by the chatbot for context-aware responses
- Automatic schema initialization on first run

**Key Files:**
- `db/initdb/setup.sh` - Database initialization script
- `db/.env` - Database configuration
- `db/Dockerfile` - Custom PostgreSQL image

## Project Structure

```
personal_main/                    # Parent repository
├── db/                           # Database configuration
│   ├── initdb/
│   │   └── setup.sh              # DB schema setup script
│   ├── .env                      # Database credentials
│   └── Dockerfile                # PostgreSQL + pgvector image
├── docs/                         # Project documentation and assets
│   ├── chat.xcf                  # Design files
│   ├── cv.xcf
│   ├── document.xcf
│   ├── email.xcf
│   ├── github.xcf
│   └── linkedin.xcf
├── personal_api/                 # Backend API (subtree repository)
│   ├── database/                 # Database connection logic
│   ├── docs/                     # API documentation
│   │   └── nginx.conf            # Production Nginx config
│   ├── models/                   # Pydantic models
│   ├── routes/                   # API endpoint handlers
│   ├── .env                      # API environment variables
│   ├── Dockerfile                # API container config
│   ├── main.py                   # FastAPI application entry
│   └── requirements.txt          # Python dependencies
├── personal_site/                # Frontend website (subtree repository)
│   ├── docs/                     # Frontend documentation
│   │   └── nginx.conf            # Production Nginx config
│   ├── public/                   # Static assets
│   ├── src/
│   │   ├── components/           # React components
│   │   ├── config/               # Configuration
│   │   └── test/                 # Unit tests
│   ├── .env                      # Frontend environment variables
│   ├── Dockerfile-dev            # Frontend container config
│   └── package.json              # Node.js dependencies
├── docker-compose.yml            # Main Docker orchestration
├── CLAUDE.md                     # Project instructions for Claude Code
└── README.md                     # This file
```

## Getting Started

### Prerequisites

- Docker Engine 20.10 or higher
- Docker Compose 2.0 or higher
- OpenAI API key (for chatbot functionality)
- SMTP credentials (for contact form)

### Development Environment Setup

1. **Clone the repository:**
   ```bash
   git clone git@github.com:dwalbeck/personal_main.git
   cd personal_main
   ```

2. **Configure environment variables:**

   Create and configure the database environment file:
   ```bash
   cd db
   cp .env.example .env  # If .env doesn't exist
   # Edit db/.env with your database credentials
   ```

   Configure the API environment variables:
   ```bash
   cd ../personal_api
   cp env.example .env
   # Edit personal_api/.env with your settings:
   # - OPENAI_API_KEY, OPENAI_ORG_ID, OPENAI_PROJECT_ID
   # - DATABASE_URL (should match db/.env credentials)
   # - SMTP credentials for contact form
   ```

   Configure the frontend environment variables:
   ```bash
   cd ../personal_site
   cp env.example .env
   # Edit personal_site/.env with your settings:
   # - VITE_API_URL (default: http://api.dw.com:8000)
   # - Social media URLs and contact information
   ```

3. **Build the Docker images:**
   ```bash
   cd ..  # Return to personal_main directory
   docker compose build
   ```

4. **Start the application stack:**
   ```bash
   docker compose up
   ```

   Or run in detached mode:
   ```bash
   docker compose up -d
   ```

5. **Access the application:**
   - Frontend: http://localhost (or http://localhost:80)
   - API Documentation: http://localhost:8000/docs
   - Database: localhost:5431 (PostgreSQL connection)

### Docker Commands

**Starting the stack:**
```bash
# Start all services
docker compose up

# Start in detached mode (background)
docker compose up -d

# Start specific service only
docker compose up frontend
docker compose up api
docker compose up db
```

**Stopping the stack:**
```bash
# Stop all services (containers remain)
docker compose stop

# Stop and remove all containers
docker compose down

# Stop and remove containers, volumes, and images
docker compose down -v --rmi all
```

**Restarting services:**
```bash
# Restart all services
docker compose restart

# Restart specific service
docker compose restart frontend
docker compose restart api
docker compose restart db
```

**Viewing logs:**
```bash
# View logs from all services
docker compose logs

# Follow logs in real-time
docker compose logs -f

# View logs for specific service
docker compose logs -f api
docker compose logs -f frontend
docker compose logs -f db
```

**Rebuilding after code changes:**
```bash
# Rebuild specific service
docker compose build api
docker compose build frontend

# Rebuild and restart
docker compose up -d --build

# Force rebuild without cache
docker compose build --no-cache
```

**Checking service status:**
```bash
# List running containers
docker compose ps

# View detailed container information
docker compose ps -a

# Check service health
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
```

**Accessing container shells:**
```bash
# Open shell in API container
docker compose exec api bash

# Open shell in frontend container
docker compose exec frontend sh

# Open psql in database container
docker compose exec db psql -U apiuser -d personal-ai
```

## Production Deployment

### Overview

Production deployment uses Nginx as a reverse proxy to serve the built frontend static files and proxy API requests to the backend. This provides better performance, security, and SSL/TLS termination.

### Architecture

```
Internet → Nginx (Port 80/443)
  ├─→ Frontend (Static Files) - daveywalbeck.com
  └─→ Backend API (Reverse Proxy) - ps-api.daveywalbeck.com
        └─→ Gunicorn + FastAPI (Port 8000)
              └─→ PostgreSQL (Port 5432)
```

### Prerequisites

- VPS or dedicated server with:
  - Ubuntu 20.04+ or similar Linux distribution
  - Docker and Docker Compose installed
  - Nginx installed (`sudo apt install nginx`)
  - Domain names configured with DNS A records pointing to your server
- SSL certificates (recommended: Let's Encrypt with certbot)

### Production Configuration Steps

#### 1. Configure Environment Variables for Production

**Database configuration** (`db/.env`):
```bash
POSTGRES_DB=personal-ai
POSTGRES_USER=apiuser
POSTGRES_PASSWORD=<strong-secure-password>
PGDATA=/var/lib/postgresql/data
POSTGRES_HOST_AUTH_METHOD=password
```

**API configuration** (`personal_api/.env`):
```bash
# Update DATABASE_URL to use container hostname
DATABASE_URL=postgres://apiuser:<password>@pgsql.dw.com:5432/personal-ai?sslmode=disable

# Add your OpenAI credentials
OPENAI_API_KEY=sk-proj-your-actual-key
OPENAI_ORG_ID=org-your-org-id
OPENAI_PROJECT_ID=proj_your-project-id

# Configure SMTP for contact form
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_TO=recipient@example.com

# Set production log level
LOG_LEVEL=INFO
```

**Frontend configuration** (`personal_site/.env`):
```bash
# Update API URL to use production domain
VITE_API_URL=https://ps-api.daveywalbeck.com

# Update social media and contact information
VITE_GITHUB_URL=https://github.com/yourusername
VITE_LINKEDIN_URL=https://www.linkedin.com/in/yourprofile
VITE_CONTACT_EMAIL=your@email.com
VITE_FILES_RESUME=./resume_file.docx
```

#### 2. Build Frontend for Production

```bash
cd personal_site

# Install dependencies
npm install

# Build production bundle
npm run build

# The built files will be in personal_site/dist/
```

#### 3. Deploy Static Files

Copy the built frontend to the Nginx web root:
```bash
# Create web directory
sudo mkdir -p /var/www/personal_site

# Copy built files
sudo cp -r personal_site/dist/* /var/www/personal_site/

# Set proper permissions
sudo chgrp-R www-data /var/www/personal_site
sudo chmod -R 755 /var/www/personal_site
```

#### 4. Configure Nginx for Frontend

**Location:** `/etc/nginx/sites-available/personal-frontend`

Copy the configuration from `personal_site/docs/nginx.conf`:

```bash
# Copy the nginx config
sudo cp personal_site/docs/nginx.conf /etc/nginx/sites-available/personal-frontend

# Edit the configuration file to update domain names
sudo nano /etc/nginx/sites-available/personal-frontend
```

Key configuration points:
- Serves static files from `/var/www/personal_site`
- Enables gzip compression for faster loading
- Sets cache headers for static assets (1 year)
- Includes security headers (X-Frame-Options, CSP, etc.)
- Handles SPA routing with `try_files $uri /index.html`

**Enable the site:**
```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/personal-frontend /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

#### 5. Configure Nginx for Backend API

**Location:** `/etc/nginx/sites-available/personal-api`

Copy the configuration from `personal_api/docs/nginx.conf`:

```bash
# Copy the nginx config
sudo cp personal_api/docs/nginx.conf /etc/nginx/sites-available/personal-api

# Edit the configuration file
sudo nano /etc/nginx/sites-available/personal-api
```

Key configuration points:
- Proxies requests to `http://127.0.0.1:8000` (API container)
- Restricts admin endpoints (`/add-entry`, `/add-file`) by IP address
- Sets proper proxy headers for client information
- Logs access and errors to separate files

**Update IP restrictions:**
```nginx
# In the nginx config, update the allowed IP:
location ~ ^/(add-entry|add-file)/ {
    allow YOUR.IP.ADDRESS.HERE;  # Replace with your IP
    deny all;
    ...
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

#### 6. Configure SSL/TLS with Let's Encrypt

```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Obtain certificates for both domains
sudo certbot --nginx -d <domain_name> -d www.<domain_name>
sudo certbot --nginx -d ps-api.<domain_name>

# Certbot will automatically:
# - Obtain SSL certificates
# - Modify Nginx configs to use HTTPS
# - Set up automatic renewal
```

NOTE: Be sure to verify that your Nginx configuration is properly configured to handle SSL requests, which in 
a nutshell requires having the following:
```nginx configuration
listen 443 ssl;
ssl on;
ssl_certificate /etc/nginx/ssl/<your_domain>.crt;
ssl_certificate_key /etc/nginx/ssl/<your_domain>.key;

# add optionally
ssl_protocols TLSv1.1 TLSv1.2;
ssl_prefer_server_ciphers on;
ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-SHA384;

```

**Verify automatic renewal:**
```bash
sudo certbot renew --dry-run
```

#### 7. Start the Docker Stack

Update `docker-compose.yml` for production if needed:
```yaml
# Ensure frontend is using production Dockerfile
frontend:
  build:
    context: personal_site/
    dockerfile: Dockerfile  # Change from Dockerfile-dev if you have a production Dockerfile
```

Start the services:
```bash
# Start all services in detached mode
docker compose up -d

# Verify all services are healthy
docker compose ps

# Check logs
docker compose logs -f
```

#### 8. Configure Docker to Start on Boot

```bash
# Enable Docker service
sudo systemctl enable docker

# Configure containers to restart automatically
# (already set in docker-compose.yml with restart: always)
```

### Post-Deployment Verification

1. **Test frontend access:**
   ```bash
   curl -I https://<your_domain>
   # Should return: HTTP/2 200
   ```

2. **Test API access:**
   ```bash
   curl https://ps-api.<your_domain>/docs
   # Should return API documentation HTML
   ```

3. **Test API health:**
   ```bash
   curl https://ps-api.<your_domain>/docs | grep "FastAPI"
   ```

4. **Check container health:**
   ```bash
   docker compose ps
   # All services should show as "healthy"
   ```

5. **Monitor logs:**
   ```bash
   # Application logs
   docker compose logs -f api

   # Nginx logs
   sudo tail -f /var/log/nginx/personal-access.log
   sudo tail -f /var/log/nginx/ps-api_access.log
   ```

### Production Maintenance

**Updating the application:**
```bash
# Pull latest code
git pull

# Rebuild and restart services
docker compose up -d --build

# Or restart specific service
docker compose up -d --build api
```

**Updating frontend:**
```bash
cd personal_site
npm run build
sudo cp -r dist/* /var/www/personal_site/
sudo systemctl reload nginx
```

**Database backups:**
```bash
# Backup database
docker compose exec db pg_dump -U apiuser personal-ai > backup_$(date +%Y%m%d).sql

# Restore database
docker compose exec -T db psql -U apiuser personal-ai < backup_20260106.sql
```

**Viewing logs:**
```bash
# Container logs
docker compose logs -f api
docker compose logs -f frontend

# Nginx logs
sudo tail -f /var/log/nginx/personal-access.log
sudo tail -f /var/log/nginx/ps-api_access.log
sudo tail -f /var/log/nginx/personal-error.log
sudo tail -f /var/log/nginx/ps-api_error.log

# Backend API logs
tail -f /var/www/personal_site/api.log
```

## Network Configuration

The Docker Compose stack uses a custom bridge network with static IP addresses:

```yaml
Network: 1vision
Subnet: 172.19.1.0/26
IP Assignments:
  - Frontend: 172.19.1.20
  - API: 172.19.1.10
  - Database: 172.19.1.30
```

Services communicate using container hostnames:
- `api.dw.com` - Backend API
- `dw.com` - Frontend
- `pgsql.dw.com` - Database

Feel free to change these to whatever domain name you want, just be consistent in every place that uses it.

## Health Checks

All services include health checks for automatic restart and dependency management:

- **Frontend:** HTTP check on `http://localhost:5173/`
- **API:** HTTP check on `http://localhost:8000/docs`
- **Database:** PostgreSQL ready check using `pg_isready`

Services start in dependency order:
1. Database starts first
2. API starts after database is healthy
3. Frontend starts after both API and database are healthy

## Troubleshooting

### Container won't start
```bash
# Check container logs
docker compose logs <service-name>

# Check all containers status
docker compose ps -a

# Restart specific service
docker compose restart <service-name>

# Rebuild and restart
docker compose up -d --build <service-name>
```

### Database connection issues
```bash
# Verify database is running
docker compose ps db

# Check database logs
docker compose logs db

# Verify database credentials match between:
# - db/.env
# - personal_api/.env (DATABASE_URL)

# Test database connection
docker compose exec db psql -U apiuser -d personal-ai -c "SELECT 1;"
```

### API not responding
```bash
# Check API logs
docker compose logs -f api

# Verify environment variables are set
docker compose exec api env | grep OPENAI
docker compose exec api env | grep DATABASE

# Check API health endpoint
curl http://localhost:8000/docs
```

### Frontend not loading
```bash
# Check frontend logs
docker compose logs -f frontend

# Verify environment variables
docker compose exec frontend env | grep VITE

# In production, check Nginx logs
sudo tail -f /var/log/nginx/personal-error.log

# Verify static files exist
ls -la /var/www/personal/
```

### Port conflicts
```bash
# Check if ports are already in use
sudo netstat -tuln | grep -E '80|8000|5431'

# Change ports in docker-compose.yml if needed
# Example: change frontend port from 80:5173 to 8080:5173
```

## Additional Resources

- Frontend documentation: [personal_site/README.md](personal_site/README.md)
- API documentation: [personal_api/README.md](personal_api/README.md)
- FastAPI documentation: https://fastapi.tiangolo.com/
- React documentation: https://react.dev/
- Docker Compose documentation: https://docs.docker.com/compose/

## License

This project is for personal portfolio use.

## Acknowledgments

Based on the guide by Samuel Harrison: [Building a RAG Portfolio with React and FastAPI](https://neon.com/guides/react-fastapi-rag-portfolio)
