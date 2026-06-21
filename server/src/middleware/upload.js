import multer from 'multer'

// Keep files in memory; we stream the buffer straight to Cloudinary.
const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) cb(null, true)
  else cb(new Error('Only image files are allowed'))
}

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB per file
})
