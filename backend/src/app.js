import express from 'express'
import cors from 'cors'
import templateRoutes from './routes/templateRoutes.js'
import profileRoutes from './routes/profileRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'

export function createApp() {
  const app = express()

  app.use(
    cors({
      origin: process.env.CLIENT_URL?.split(',') || true,
    }),
  )
  app.use(express.json({ limit: '2mb' }))
  app.use(express.urlencoded({ extended: true }))

  // Health check
  app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

  // Feature routes
  app.use('/api/templates', templateRoutes)
  app.use('/api/profile', profileRoutes)
  app.use('/api/upload', uploadRoutes)

  // 404 + error handling
  app.use(notFound)
  app.use(errorHandler)

  return app
}
