import multer from 'multer'

// 404 for unmatched routes.
export function notFound(req, res) {
  res.status(404).json({ message: `Not found: ${req.method} ${req.originalUrl}` })
}

// Central error handler. Translates known errors into clean JSON responses.
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  console.error('API error:', err.message)

  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: `Upload error: ${err.message}` })
  }

  // Duplicate slug (unique index) — extremely unlikely due to slug generation.
  if (err.code === 11000) {
    return res.status(409).json({ message: 'A profile with that link already exists' })
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid id format' })
  }

  res.status(err.status || 500).json({ message: err.message || 'Server error' })
}
