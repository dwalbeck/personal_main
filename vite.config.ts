import { defineConfig, loadEnv, Plugin } from 'vite'
import react from '@vitejs/plugin-react'
//import tailwindcss from '@tailwindcss/vite'

// Custom plugin to add health check endpoint
const healthCheckPlugin = (): Plugin => ({
    name: 'health-check',
    configureServer(server) {
        server.middlewares.use((req, res, next) => {
            if (req.url === '/health') {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ status: 'ok', service: 'portfolio-frontend' }))
                return
            }
            next()
        })
    },
    configurePreviewServer(server) {
        server.middlewares.use((req, res, next) => {
            if (req.url === '/health') {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ status: 'ok', service: 'portfolio-frontend' }))
                return
            }
            next()
        })
    }
})

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    // Load env file based on `mode` in the current working directory.
    const env = loadEnv(mode, process.cwd(), '')

    return {
        plugins: [
            react(),
            healthCheckPlugin(),
    //        tailwindcss()
        ],
        server: {
            host: true,
            port: 5173,
            strictPort: true,
            proxy: {
                '/api': {
                    target: env.VITE_API_URL || 'http://localhost:8000',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, '')
                }
            }
        }
    }
})
