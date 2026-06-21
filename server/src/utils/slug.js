import slugify from 'slugify'
import { Profile } from '../models/Profile.js'

/**
 * Build a unique, URL-friendly slug from a profile's name. If the base slug is
 * already taken, a short numeric suffix is appended until a free slug is found
 * (e.g. shiv-poojan-pal, shiv-poojan-pal-2, …).
 */
export async function generateUniqueSlug(basicInfo = {}, excludeId = null) {
  const name =
    [basicInfo.firstName, basicInfo.lastName].filter(Boolean).join(' ').trim() ||
    'biodata'

  const base = slugify(name, { lower: true, strict: true }) || 'biodata'

  let slug = base
  let counter = 1

  // Loop until we find a slug not used by another document.
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const existing = await Profile.findOne({ slug }).select('_id').lean()
    if (!existing || String(existing._id) === String(excludeId)) break
    counter += 1
    slug = `${base}-${counter}`
  }

  return slug
}
