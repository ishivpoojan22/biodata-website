/**
 * Theme tokens for the multi-page ProfileSite. The accent colour is derived
 * from the selected template id, and the light/dark mode controls the surface
 * colours. Returns a `t` object of Tailwind class strings (+ an inline accent
 * hex) consumed by every section.
 */

const ACCENTS = {
  classic: '#d9a441', // gold
  modern: '#ec4899', // pink
  elegant: '#10b981', // emerald
}

export const getAccent = (templateId) => ACCENTS[templateId] || ACCENTS.classic

export function buildTheme(mode, templateId) {
  const accent = getAccent(templateId)
  const dark = mode === 'dark'

  return {
    accent,
    mode,
    page: dark ? 'bg-neutral-950' : 'bg-neutral-50',
    text: dark ? 'text-neutral-50' : 'text-neutral-900',
    muted: dark ? 'text-neutral-400' : 'text-neutral-500',
    // cards sit on a faint divider colour (factWrap) to create hairline grids
    card: dark ? 'bg-neutral-900' : 'bg-white',
    factWrap: dark ? 'bg-neutral-800' : 'bg-neutral-200',
    chip: dark
      ? 'border-neutral-700 bg-neutral-900 text-neutral-200'
      : 'border-neutral-300 bg-white text-neutral-700',
    navBar: dark
      ? 'bg-neutral-950/80 border-neutral-800'
      : 'bg-white/80 border-neutral-200',
    navLink: dark
      ? 'text-neutral-300 hover:text-white'
      : 'text-neutral-600 hover:text-neutral-900',
    bottomNav: dark
      ? 'bg-neutral-900/95 border-neutral-800'
      : 'bg-white/95 border-neutral-200',
  }
}
