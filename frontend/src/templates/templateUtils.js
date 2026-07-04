/**
 * Helpers shared by every biodata template so that rendering logic stays
 * consistent and templates remain thin presentational components.
 */

/** Safe display value with a fallback dash for empty fields. */
export const val = (v, fallback = '—') => {
  if (v === null || v === undefined) return fallback
  const s = String(v).trim()
  return s.length ? s : fallback
}

/** Full name from basic info. */
export const fullName = (basicInfo = {}) => {
  const name = [basicInfo.firstName, basicInfo.lastName]
    .filter(Boolean)
    .join(' ')
    .trim()
  return name || 'Your Name'
}

/** Format an ISO date string into a readable date. */
export const formatDate = (value) => {
  if (!value) return '—'
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return String(value)
  return d.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

/** Derive an age (in years) from a date of birth. */
export const ageFromDob = (value) => {
  if (!value) return null
  const dob = new Date(value)
  if (Number.isNaN(dob.getTime())) return null
  const diff = Date.now() - dob.getTime()
  const age = Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000))
  return age > 0 ? age : null
}

/** Join location parts into a single string. */
export const location = (basicInfo = {}) =>
  [basicInfo.city, basicInfo.state, basicInfo.country]
    .filter(Boolean)
    .join(', ') || '—'

/** Turn a comma/line separated string into an array of trimmed items. */
export const toList = (value) => {
  if (Array.isArray(value)) return value.filter(Boolean)
  if (!value) return []
  return String(value)
    .split(/[,\n]/)
    .map((s) => s.trim())
    .filter(Boolean)
}

/**
 * Build an ordered list of { label, value } detail rows for a section so each
 * template can map over them without repeating field names.
 */
export const detailRows = {
  basic: (b = {}) => [
    { label: 'Gender', value: val(b.gender) },
    { label: 'Date of Birth', value: formatDate(b.dateOfBirth) },
    { label: 'Height', value: val(b.height) },
    { label: 'Religion', value: val(b.religion) },
    { label: 'Caste', value: val(b.caste) },
  ],
  education: (e = {}) => [
    { label: 'Education', value: val(e.education) },
    { label: 'School', value: val(e.school) },
    { label: 'College', value: val(e.college) },
    { label: 'Occupation', value: val(e.occupation) },
    { label: 'Company', value: val(e.company) },
    { label: 'Annual Income', value: val(e.annualIncome) },
  ],
  family: (f = {}) => [
    { label: "Father's Name", value: val(f.fatherName) },
    { label: "Father's Occupation", value: val(f.fatherOccupation) },
    { label: "Mother's Name", value: val(f.motherName) },
    { label: "Mother's Occupation", value: val(f.motherOccupation) },
    { label: 'Siblings', value: val(f.siblings) },
    { label: 'Family Type', value: val(f.familyType) },
    { label: 'Family Status', value: val(f.familyStatus) },
  ],
  partner: (p = {}) => [
    { label: 'Preferred Age', value: val(p.preferredAge) },
    { label: 'Preferred Education', value: val(p.preferredEducation) },
    { label: 'Preferred Occupation', value: val(p.preferredOccupation) },
    { label: 'Preferred Location', value: val(p.preferredLocation) },
  ],
  // Astrological details live on basicInfo (kept optional).
  astro: (b = {}) => [
    { label: 'Rashi', value: val(b.rashi) },
    { label: 'Nakshatra', value: val(b.nakshatra) },
    { label: 'Gotra', value: val(b.gotra) },
    { label: 'Manglik Status', value: val(b.manglik) },
  ],
}

/** True when an object has at least one non-empty value among the given keys. */
export const hasAny = (obj = {}, keys = []) =>
  keys.some((k) => {
    const v = obj[k]
    return v !== null && v !== undefined && String(v).trim().length > 0
  })
