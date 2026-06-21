import { Router } from 'express'
import { getTemplates } from '../controllers/templateController.js'

const router = Router()

// GET /api/templates
router.get('/', getTemplates)

export default router
