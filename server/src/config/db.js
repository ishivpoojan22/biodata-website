import mongoose from 'mongoose'

/**
 * Connect to MongoDB. The connection string is read from MONGODB_URI.
 * Throws if it cannot connect so the caller can decide how to handle startup.
 */
export async function connectDB() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    throw new Error('MONGODB_URI is not set. Copy .env.example to .env.')
  }

  mongoose.set('strictQuery', true)
  await mongoose.connect(uri)
  console.log('✓ MongoDB connected')
}
