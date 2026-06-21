import { Router } from 'express'
import {
  createProfile,
  deleteProfile,
  getProfileBySlug,
  updateProfile,
} from '../controllers/profileController.js'

const router = Router()

router.post('/', createProfile) // POST   /api/profile
router.get('/:slug', getProfileBySlug) // GET    /api/profile/:slug
router.put('/:id', updateProfile) // PUT    /api/profile/:id
router.delete('/:id', deleteProfile) // DELETE /api/profile/:id

export default router
