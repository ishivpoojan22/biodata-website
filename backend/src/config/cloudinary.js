import { v2 as cloudinary } from 'cloudinary'

/**
 * Configure the Cloudinary SDK from environment variables. Call once at
 * startup. Uploads use cloudinary.uploader.upload_stream (see uploadController).
 */
export function configureCloudinary() {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  })
}

/** True when all required Cloudinary credentials are present. */
export function isCloudinaryConfigured() {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET,
  )
}

export { cloudinary }
