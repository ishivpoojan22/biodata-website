import { Router } from 'express'
import { upload } from '../middleware/upload.js'
import {
  uploadGallery,
  uploadProfilePhoto,
} from '../controllers/uploadController.js'

const router = Router()

// POST /api/upload/profile-photo  (single file, field "image")
router.post('/profile-photo', upload.single('image'), uploadProfilePhoto)

// POST /api/upload/gallery  (multiple files, field "images")
router.post('/gallery', upload.array('images', 12), uploadGallery)

export default router
