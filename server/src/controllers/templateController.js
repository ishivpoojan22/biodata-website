import { templates } from '../data/templates.js'

// GET /api/templates
export function getTemplates(req, res) {
  res.json(templates)
}
