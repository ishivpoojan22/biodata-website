/**
 * Template registry — the available biodata "themes". Every profile renders as
 * the same multi-page personal website (see components/profile/ProfileSite);
 * the template id selects the accent colour / mood. Templates and data stay
 * fully decoupled: the backend only stores the `id`.
 *
 * This module intentionally contains no JSX so it can be imported anywhere.
 */
export const TEMPLATES = [
  {
    id: 'classic',
    name: 'Classic Gold',
    description:
      'Dark, ceremonial layout with a centered hero, top navbar and a floating bottom pill nav. Gold on charcoal.',
    accent: 'from-amber-400 to-yellow-600',
    swatch: '#d9a441',
    premium: false,
  },
  {
    id: 'modern',
    name: 'Modern Rose',
    description:
      'Light app-style dashboard with a fixed left sidebar menu and rounded content cards. Vibrant rose.',
    accent: 'from-pink-400 to-rose-600',
    swatch: '#e11d6b',
    premium: false,
  },
  {
    id: 'elegant',
    name: 'Elegant Emerald',
    description:
      'Cream editorial / magazine style with numbered sections, big serif headings and thin rules. Calm emerald.',
    accent: 'from-emerald-400 to-teal-600',
    swatch: '#047857',
    premium: false,
  },
]

export const DEFAULT_TEMPLATE_ID = TEMPLATES[0].id

/** Look up a template entry by id. */
export const getTemplate = (id) => TEMPLATES.find((t) => t.id === id) || null
