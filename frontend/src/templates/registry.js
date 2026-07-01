/**
 * Template registry — the single source of truth for all available biodata
 * options. Each entry has a `type`:
 *   - "website" → multi-page personal biodata site (distinct layout/architecture)
 *   - "template" → single-page printable biodata document (A4 card style)
 *
 * Templates and data stay fully decoupled: the backend stores only the `id`.
 * This module intentionally contains no JSX so it can be imported anywhere.
 */

// ─── Website themes (multi-page, each has distinct architecture) ─────────────

export const WEBSITES = [
  {
    id: 'classic',
    type: 'website',
    name: 'Classic Gold',
    description:
      'Dark, ceremonial layout with a centered hero, top navbar and floating bottom pill nav. Gold on charcoal.',
    accent: 'from-amber-400 to-yellow-600',
    swatch: '#d9a441',
    premium: false,
  },
  {
    id: 'modern',
    type: 'website',
    name: 'Modern Rose',
    description:
      'Light app-style dashboard with a fixed left sidebar menu and rounded content cards. Vibrant rose.',
    accent: 'from-pink-400 to-rose-600',
    swatch: '#e11d6b',
    premium: false,
  },
  {
    id: 'elegant',
    type: 'website',
    name: 'Elegant Emerald',
    description:
      'Cream editorial / magazine style with numbered sections, big serif headings and thin rules. Calm emerald.',
    accent: 'from-emerald-400 to-teal-600',
    swatch: '#047857',
    premium: false,
  },
  {
    id: 'azure',
    type: 'website',
    name: 'Classic Azure',
    description:
      'Same ceremonial layout as Classic Gold — centered hero, top navbar and floating pill nav — in a cool sky-blue accent.',
    accent: 'from-sky-400 to-blue-600',
    swatch: '#0ea5e9',
    premium: false,
  },
  {
    id: 'noir',
    type: 'website',
    name: 'Classic Violet',
    description:
      'Same ceremonial layout as Classic Gold — centered hero, top navbar and floating pill nav — in an elegant violet accent.',
    accent: 'from-violet-400 to-fuchsia-600',
    swatch: '#a78bfa',
    premium: false,
  },
  {
    id: 'festive',
    type: 'website',
    name: 'Shubh Vivah',
    description:
      'Festive Indian-wedding design with a marigold→crimson→magenta gradient hero framed in antique gold, ornamental flourishes and warm ivory cards.',
    accent: 'from-amber-500 via-rose-600 to-fuchsia-700',
    swatch: '#dc2626',
    premium: false,
  },
  {
    id: 'royalwed',
    type: 'website',
    name: 'Royal Rajwada',
    description:
      'Regal Rajasthani palace theme — deep maroon background, antique gold ornament and a Mughal arch photo frame. Rich and ceremonial.',
    accent: 'from-red-900 to-yellow-700',
    swatch: '#4a0e12',
    premium: false,
  },
  {
    id: 'mehndi',
    type: 'website',
    name: 'Mehndi Bagh',
    description:
      'Fresh henna-garden theme — light pista/cream background with deep mehndi-green, gold and terracotta accents and paisley flourishes.',
    accent: 'from-lime-700 to-amber-600',
    swatch: '#3f6212',
    premium: false,
  },
  {
    id: 'peacock',
    type: 'website',
    name: 'Peacock Mor',
    description:
      'Jewel-tone peacock theme — teal→royal-blue→purple gradient with gold accents, feather glows and glassy panels. Vibrant and regal.',
    accent: 'from-teal-600 via-blue-700 to-purple-700',
    swatch: '#0d7d7d',
    premium: false,
  },
]

// ─── Page templates (single-page, printable A4 biodata) ──────────────────────

export const PAGE_TEMPLATES = [
  {
    id: 'royal',
    type: 'template',
    name: 'Royal Gold',
    description:
      'Grand ornate A4 biodata with decorative double borders, maroon/gold palette and religious invocation.',
    accent: 'from-amber-600 to-amber-800',
    swatch: '#b45309',
    premium: false,
  },
  {
    id: 'minimal',
    type: 'template',
    name: 'Minimal Dark',
    description:
      'Clean professional biodata with a bold dark header, quick chips, and white card sections. Slate/cyan.',
    accent: 'from-slate-700 to-slate-900',
    swatch: '#334155',
    premium: false,
  },
  {
    id: 'floral',
    type: 'template',
    name: 'Floral Blush',
    description:
      'Soft pastel biodata with floral accents, rounded shapes and a warm pink palette. Feminine and elegant.',
    accent: 'from-pink-300 to-rose-400',
    swatch: '#f43f5e',
    premium: false,
  },
]

// ─── Combined ────────────────────────────────────────────────────────────────

export const TEMPLATES = [...WEBSITES, ...PAGE_TEMPLATES]

export const DEFAULT_TEMPLATE_ID = TEMPLATES[0].id

/** Look up a template entry by id. */
export const getTemplate = (id) => TEMPLATES.find((t) => t.id === id) || null

/** Get template type by id. */
export const getTemplateType = (id) => getTemplate(id)?.type || 'website'
