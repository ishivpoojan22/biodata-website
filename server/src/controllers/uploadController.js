import { Readable } from 'node:stream'
import { cloudinary, isCloudinaryConfigured } from '../config/cloudinary.js'

/** Stream a file buffer to Cloudinary and resolve with the secure URL. */
function uploadBuffer(buffer, folder) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image' },
      (error, result) => {
        if (error) return reject(error)
        resolve(result)
      },
    )
    Readable.from(buffer).pipe(stream)
  })
}

const folderName = () => process.env.CLOUDINARY_FOLDER || 'biodata'

// POST /api/upload/profile-photo  (field: "image")
export async function uploadProfilePhoto(req, res, next) {
  try {
    if (!isCloudinaryConfigured()) {
      return res
        .status(503)
        .json({ message: 'Image uploads are not configured (Cloudinary).' })
    }
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' })
    }

    const result = await uploadBuffer(req.file.buffer, `${folderName()}/profile`)
    res.json({ url: result.secure_url, publicId: result.public_id })
  } catch (err) {
    next(err)
  }
}

// POST /api/upload/gallery  (field: "images", multiple)
export async function uploadGallery(req, res, next) {
  try {
    if (!isCloudinaryConfigured()) {
      return res
        .status(503)
        .json({ message: 'Image uploads are not configured (Cloudinary).' })
    }
    const files = req.files || []
    if (!files.length) {
      return res.status(400).json({ message: 'No image files provided' })
    }

    const results = await Promise.all(
      files.map((f) => uploadBuffer(f.buffer, `${folderName()}/gallery`)),
    )

    res.json({
      urls: results.map((r) => r.secure_url),
      images: results.map((r) => ({
        url: r.secure_url,
        publicId: r.public_id,
      })),
    })
  } catch (err) {
    next(err)
  }
}
