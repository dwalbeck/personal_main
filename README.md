# Personal Website Frontend

A modern, responsive portfolio website built with React, TypeScript, and Vite. This frontend application provides a clean, professional interface for showcasing skills, experience, and projects, with an integrated AI-powered chatbot for visitor interaction.

## Technology Stack

- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Vitest** - Unit testing framework
- **Axios** - HTTP client for API requests

## Features

- Responsive design optimized for all screen sizes
- AI chatbot integration for answering visitor questions
- Contact form with email functionality
- Fast page loads with optimized asset bundling
- Health check endpoint for monitoring
- Progressive Web App capabilities

## Project Structure

```
personal_site/
├── docs/
│   └── nginx.conf              # Production Nginx configuration
├── public/                     # Static assets served directly
│   ├── resume_file.docx        # Resume download
│   └── ...                     # Images, icons, etc.
├── src/
│   ├── assets/                 # Build-time assets
│   ├── components/             # React components
│   │   ├── Header.tsx          # Navigation header
│   │   ├── Footer.tsx          # Footer with links
│   │   ├── Chat.tsx            # AI chatbot interface
│   │   ├── Contact.tsx         # Contact form
│   │   └── ...                 # Other components
│   ├── config/                 # Configuration files
│   │   └── env.ts              # Environment variable validation
│   ├── test/                   # Test files and setup
│   │   └── setup.ts            # Vitest configuration
│   ├── App.tsx                 # Main application component
│   ├── main.tsx                # Application entry point
│   └── index.css               # Global styles
├── .env                        # Environment variables (not committed)
├── env.example                 # Environment variable template
├── Dockerfile-dev              # Docker container configuration
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite configuration
└── README.md                   # This file
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm 9+
- Backend API running (see `../personal_api/README.md`)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp env.example .env
   ```

   Edit `.env` with your configuration:
   ```bash
   # API Configuration
   VITE_API_URL=http://localhost:8000

   # Social Media URLs
   VITE_GITHUB_URL=https://github.com/yourusername
   VITE_LINKEDIN_URL=https://www.linkedin.com/in/yourprofile

   # Contact Information
   VITE_CONTACT_EMAIL=your@email.com
   VITE_FILES_RESUME=./resume_file.docx
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

   The application will be available at http://localhost:5173

## Environment Variables

All environment variables must be prefixed with `VITE_` to be exposed to the client-side code.

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:8000` |
| `VITE_GITHUB_URL` | GitHub profile link | `https://github.com/username` |
| `VITE_LINKEDIN_URL` | LinkedIn profile link | `https://linkedin.com/in/profile` |
| `VITE_CONTACT_EMAIL` | Contact email address | `contact@example.com` |
| `VITE_FILES_RESUME` | Path to resume file | `./resume_file.docx` |

**Important:** After changing environment variables:
- Restart the development server
- Rebuild for production

## Development

### Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run linter
npm run lint

# Run unit tests
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage report
npm run test:coverage
```

### Development Server

The Vite dev server provides:
- Hot Module Replacement (HMR) for instant updates
- Fast startup time
- Optimized dependency pre-bundling
- Source maps for debugging

Access the dev server at:
- Main app: http://localhost:5173
- Health check: http://localhost:5173/health

### Building for Production

```bash
# Build optimized production bundle
npm run build
```

This creates a `dist/` directory with:
- Minified JavaScript and CSS
- Optimized and compressed assets
- Hash-based filenames for cache busting
- Source maps (optional)

**Build output:**
```
dist/
├── index.html              # Entry HTML file
├── assets/
│   ├── index-[hash].js     # Main JavaScript bundle
│   ├── index-[hash].css    # Compiled CSS
│   └── ...                 # Other assets
└── ...                     # Public files
```

## Docker Usage

### Development with Docker Compose

From the parent directory (`personal_main/`):

```bash
# Build and start frontend container
docker compose up frontend

# Start in detached mode
docker compose up -d frontend

# View logs
docker compose logs -f frontend

# Restart after code changes
docker compose restart frontend

# Rebuild and restart
docker compose up -d --build frontend
```

**Container details:**
- Name: `dw.com`
- Port: 80:5173 (external:internal)
- IP: 172.19.1.20
- Volume mounts: Source code for live reload

### Standalone Docker Build

```bash
# Build Docker image
docker build -f Dockerfile-dev -t portfolio-frontend .

# Run container
docker run -p 5173:5173 \
  --env-file .env \
  portfolio-frontend
```

## Production Deployment

### Building for Production

1. **Update environment variables for production:**
   ```bash
   # Edit .env
   VITE_API_URL=https://ps-api.daveywalbeck.com
   VITE_GITHUB_URL=https://github.com/yourusername
   VITE_LINKEDIN_URL=https://www.linkedin.com/in/yourprofile
   VITE_CONTACT_EMAIL=your@email.com
   ```

2. **Build the application:**
   ```bash
   npm run build
   ```

3. **Test the production build locally:**
   ```bash
   npm run preview
   # Access at http://localhost:4173
   ```

### Deploying with Nginx

The recommended production setup uses Nginx to serve static files.

#### 1. Copy Built Files

```bash
# Copy production build to web root
sudo mkdir -p /var/www/personal_site
sudo cp -r dist/* /var/www/personal_site/

# Set permissions
sudo chgrp -R www-data /var/www/personal_site
sudo chmod -R 755 /var/www/personal_site
```

#### 2. Configure Nginx

Copy the provided Nginx configuration:

```bash
# Copy configuration
sudo cp docs/nginx.conf /etc/nginx/sites-available/personal-frontend

# Edit to update domain names
sudo nano /etc/nginx/sites-available/personal-frontend
```

**Key Nginx configuration features:**

```nginx
server {
    listen 80;
    server_name daveywalbeck.com www.daveywalbeck.com;

    # Gzip compression for faster loading
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;

    location / {
        root /var/www/personal;
        index index.html;
        # SPA routing - always serve index.html
        try_files $uri /index.html;
    }

    # Cache static assets (1 year)
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
}
```

#### 3. Enable the Site

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/personal-frontend /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

#### 4. Configure SSL/TLS

```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d <your_domain> -d www.<your_domain>

# Certbot automatically updates Nginx config for HTTPS
```

### Deployment Checklist

- [ ] Update `.env` with production API URL
- [ ] Build production bundle (`npm run build`)
- [ ] Test build locally (`npm run preview`)
- [ ] Copy files to `/var/www/personal_site/`
- [ ] Configure Nginx with correct domain names
- [ ] Set up SSL/TLS certificates
- [ ] Test frontend loads correctly
- [ ] Verify API communication works
- [ ] Check browser console for errors
- [ ] Test on mobile devices
- [ ] Verify contact form functionality
- [ ] Test chatbot integration

### Updating Production

```bash
# Pull latest code
cd personal_site
git pull

# Install any new dependencies
npm install

# Build new version
npm run build

# Deploy new files
sudo cp -r dist/* /var/www/personal_site/

# Clear browser cache or use hard refresh (Ctrl+F5)
```

## Unit Testing

### Testing Framework

The project uses **Vitest** for unit testing, with React Testing Library for component tests.

**Testing tools:**
- **Vitest** - Fast unit test runner (Vite-native)
- **React Testing Library** - Test React components
- **@testing-library/user-event** - Simulate user interactions
- **@testing-library/jest-dom** - Custom matchers for DOM
- **happy-dom** - Lightweight DOM implementation

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with UI (browser-based test runner)
npm run test:ui

# Generate coverage report
npm run test:coverage
```

### Test Structure

Tests are colocated with components or in the `src/test/` directory:

```
src/
├── components/
│   ├── Header.tsx
│   └── Header.test.tsx         # Component test
├── test/
│   └── setup.ts                # Test configuration
└── ...
```

### Writing Tests

**Example component test:**

```typescript
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Header } from './Header'

describe('Header', () => {
  it('renders navigation links', () => {
    render(<Header />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
  })

  it('displays logo', () => {
    render(<Header />)
    const logo = screen.getByRole('img', { name: /logo/i })
    expect(logo).toBeInTheDocument()
  })
})
```

**Example user interaction test:**

```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { ContactForm } from './ContactForm'

describe('ContactForm', () => {
  it('submits form with user input', async () => {
    const user = userEvent.setup()
    const handleSubmit = vi.fn()

    render(<ContactForm onSubmit={handleSubmit} />)

    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/message/i), 'Hello!')
    await user.click(screen.getByRole('button', { name: /submit/i }))

    expect(handleSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      message: 'Hello!'
    })
  })
})
```

### Test Configuration

**Vitest configuration** (`vite.config.ts`):

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: './src/test/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'src/test/']
    }
  }
})
```

### Coverage Reports

After running `npm run test:coverage`, view the report:

```bash
# View HTML coverage report
open coverage/index.html

# Or check console output for summary
```

**Coverage goals:**
- Statements: 80%+
- Branches: 75%+
- Functions: 80%+
- Lines: 80%+

### Testing Best Practices

1. **Test user behavior, not implementation:**
   ```typescript
   // Good - tests what user sees
   expect(screen.getByText('Welcome')).toBeInTheDocument()

   // Avoid - tests implementation details
   expect(component.state.isVisible).toBe(true)
   ```

2. **Use accessible queries:**
   ```typescript
   // Prefer (in order)
   screen.getByRole('button', { name: /submit/i })
   screen.getByLabelText(/email/i)
   screen.getByText(/welcome/i)

   // Avoid
   screen.getByClassName('submit-button')
   ```

3. **Test error states:**
   ```typescript
   it('shows error message on failed submission', async () => {
     render(<ContactForm />)
     // Trigger error condition
     await user.click(screen.getByRole('button'))
     expect(screen.getByText(/error/i)).toBeInTheDocument()
   })
   ```

4. **Mock external dependencies:**
   ```typescript
   import { vi } from 'vitest'
   import axios from 'axios'

   vi.mock('axios')
   axios.post.mockResolvedValue({ data: { success: true } })
   ```

### Continuous Integration

Tests can be run in CI/CD pipelines:

```yaml
# GitHub Actions example
- name: Run tests
  run: npm test -- --coverage --run

- name: Upload coverage
  uses: codecov/codecov-action@v3
  with:
    files: ./coverage/coverage-final.json
```

## Health Check Endpoint

The application provides a health check endpoint for monitoring:

**Endpoint:** `/health`

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
curl https://<your_domain>/health
```

The health check works in all environments:
- **Development mode:** Via Vite plugin
- **Preview mode:** Via Vite plugin
- **Production:** Falls back to `/health` or `/health.json` static files

## Troubleshooting

### Development Server Issues

**Port already in use:**
```bash
# Check what's using port 5173
lsof -ti:5173

# Kill the process
kill -9 $(lsof -ti:5173)

# Or use a different port
npm run dev -- --port 3000
```

**Environment variables not loading:**
- Ensure variable names are prefixed with `VITE_`
- Restart dev server after changing `.env`
- Check for typos in variable names

**Hot reload not working:**
- Check file watcher limits on Linux:
  ```bash
  # Increase limit
  echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
  sudo sysctl -p
  ```

### Build Issues

**TypeScript errors:**
```bash
# Run type checking
npx tsc --noEmit

# Fix common issues
npm install --save-dev @types/react @types/react-dom
```

**Missing dependencies:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

**Build fails:**
```bash
# Clear Vite cache
rm -rf node_modules/.vite

# Rebuild
npm run build
```

### Production Issues

**Blank page after deployment:**
- Check browser console for errors
- Verify API URL in `.env` is correct
- Check Nginx error logs: `sudo tail -f /var/log/nginx/personal-error.log`
- Ensure all assets are copied to web root

**404 on page refresh:**
- Ensure Nginx config includes `try_files $uri /index.html`
- Reload Nginx: `sudo systemctl reload nginx`

**API calls failing:**
- Verify `VITE_API_URL` points to correct backend
- Check CORS configuration on backend
- Inspect network tab in browser dev tools

### Docker Issues

**Container won't start:**
```bash
# Check logs
docker compose logs -f frontend

# Rebuild
docker compose up --build frontend
```

**Changes not reflected:**
```bash
# Volume mount issue - restart
docker compose restart frontend

# Or rebuild
docker compose up -d --build frontend
```

## Performance Optimization

### Build Optimization

- **Code splitting:** Automatic route-based splitting
- **Tree shaking:** Removes unused code
- **Minification:** JavaScript and CSS minified
- **Asset optimization:** Images compressed and optimized

### Runtime Optimization

- **Lazy loading:** Load components on demand
- **Memoization:** Use `React.memo()` for expensive components
- **Virtual scrolling:** For long lists
- **Image optimization:** Use WebP format, lazy load images

### Caching Strategy

Production Nginx configuration sets cache headers:
- Static assets (JS/CSS/images): 1 year
- HTML files: No cache (always fresh)
- API responses: Handled by backend

## Additional Resources

- **Vite Documentation:** https://vitejs.dev/
- **React Documentation:** https://react.dev/
- **Vitest Documentation:** https://vitest.dev/
- **Tailwind CSS:** https://tailwindcss.com/
- **React Testing Library:** https://testing-library.com/react

## Support

For issues related to:
- **Frontend bugs:** Check browser console and logs
- **API communication:** See `../personal_api/README.md`
- **Docker setup:** See `../README.md`

## License

This project is for personal portfolio use.
