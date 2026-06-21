import { Profile } from '../models/Profile.js'
import { isValidTemplate } from '../data/templates.js'
import { generateUniqueSlug } from '../utils/slug.js'

const SECTION_KEYS = [
  'basicInfo',
  'education',
  'family',
  'aboutMe',
  'partner',
  'contact',
  'photos',
]

/** Pick only the known profile sections from a request body. */
function pickSections(body = {}) {
  const out = {}
  for (const key of SECTION_KEYS) {
    if (body[key] && typeof body[key] === 'object') out[key] = body[key]
  }
  return out
}

// POST /api/profile
export async function createProfile(req, res, next) {
  try {
    const { templateId } = req.body
    const sections = pickSections(req.body)

    const slug = await generateUniqueSlug(sections.basicInfo)

    const profile = await Profile.create({
      templateId: isValidTemplate(templateId) ? templateId : 'classic',
      slug,
      ...sections,
    })

    res.status(201).json(profile)
  } catch (err) {
    next(err)
  }
}

// GET /api/profile/:slug
export async function getProfileBySlug(req, res, next) {
  try {
    const profile = await Profile.findOne({ slug: req.params.slug }).lean()
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' })
    }
    res.json(profile)
  } catch (err) {
    next(err)
  }
}

// PUT /api/profile/:id
export async function updateProfile(req, res, next) {
  try {
    const { id } = req.params
    const profile = await Profile.findById(id)
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' })
    }

    const sections = pickSections(req.body)
    for (const key of SECTION_KEYS) {
      if (sections[key]) profile[key] = { ...profile[key], ...sections[key] }
    }

    if (isValidTemplate(req.body.templateId)) {
      profile.templateId = req.body.templateId
    }

    // Refresh the slug if the name changed (keeps the link in sync) but keep it
    // unique across other documents.
    if (sections.basicInfo) {
      profile.slug = await generateUniqueSlug(profile.basicInfo, profile._id)
    }

    await profile.save()
    res.json(profile)
  } catch (err) {
    next(err)
  }
}

// DELETE /api/profile/:id
export async function deleteProfile(req, res, next) {
  try {
    const deleted = await Profile.findByIdAndDelete(req.params.id)
    if (!deleted) {
      return res.status(404).json({ message: 'Profile not found' })
    }
    res.json({ message: 'Profile deleted', id: req.params.id })
  } catch (err) {
    next(err)
  }
}
