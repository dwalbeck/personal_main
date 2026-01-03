# Portfolio Frontend

React + TypeScript + Vite frontend application for the personal portfolio website.

## Health Check Endpoint

The application provides a health check endpoint at `/health` that returns HTTP 200.

**Response:**
```json
{
  "status": "ok",
  "service": "portfolio-frontend"
}
```

**Testing:**
```bash
# Development
curl http://localhost:5173/health

# Production
curl http://your-domain.com/health
```

The health check works in:
- Development mode (`npm run dev`) - via Vite plugin
- Preview mode (`npm run preview`) - via Vite plugin  
- Production static hosting - falls back to `/health` or `/health.json` files

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment variables
cp env.example .env

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

## Environment Variables

All variables must be prefixed with `VITE_`:
- `VITE_API_URL` - Backend API URL
- `VITE_GITHUB_URL` - GitHub profile
- `VITE_LINKEDIN_URL` - LinkedIn profile
- `VITE_CONTACT_EMAIL` - Contact email
- `VITE_FILES_RESUME` - Resume file path

See `env.example` for details.


run with nginx