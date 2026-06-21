import 'dotenv/config'
import { createApp } from './app.js'
import { connectDB } from './config/db.js'
import {
  configureCloudinary,
  isCloudinaryConfigured,
} from './config/cloudinary.js'

const PORT = process.env.PORT || 5000

async function start() {
  configureCloudinary()
  if (!isCloudinaryConfigured()) {
    console.warn(
      '⚠ Cloudinary is not fully configured — image uploads will return 503 until credentials are set in .env',
    )
  }

  try {
    await connectDB()
  } catch (err) {
    console.error('✗ Failed to connect to MongoDB:', err.message)
    console.error('  Set MONGODB_URI in server/.env and ensure MongoDB is running.')
    process.exit(1)
  }

  const app = createApp()
  app.listen(PORT, () => {
    console.log(`✓ API server running on http://localhost:${PORT}`)
  })
}

start()
