/**
 * Template metadata served by GET /api/templates. This mirrors the frontend
 * registry (src/templates/registry.js) by `id`. The actual rendering components
 * live on the client; the server only stores/serves metadata so templates and
 * data stay fully decoupled.
 */
export const templates = [
  // Website themes (multi-page personal site)
  {
    id: 'classic',
    type: 'website',
    name: 'Classic Gold',
    description:
      'Dark, ceremonial layout with a centered hero, top navbar and floating bottom pill nav. Gold on charcoal.',
    premium: false,
  },
  {
    id: 'modern',
    type: 'website',
    name: 'Modern Rose',
    description:
      'Light app-style dashboard with a fixed left sidebar menu and rounded content cards. Vibrant rose.',
    premium: false,
  },
  {
    id: 'elegant',
    type: 'website',
    name: 'Elegant Emerald',
    description:
      'Cream editorial / magazine style with numbered sections, big serif headings and thin rules. Calm emerald.',
    premium: false,
  },

  // Page templates (single-page printable biodata)
  {
    id: 'royal',
    type: 'template',
    name: 'Royal Gold',
    description:
      'Grand ornate A4 biodata with decorative double borders, maroon/gold palette and religious invocation.',
    premium: false,
  },
  {
    id: 'minimal',
    type: 'template',
    name: 'Minimal Dark',
    description:
      'Clean professional biodata with a bold dark header, quick chips, and white card sections. Slate/cyan.',
    premium: false,
  },
  {
    id: 'floral',
    type: 'template',
    name: 'Floral Blush',
    description:
      'Soft pastel biodata with floral accents, rounded shapes and a warm pink palette. Feminine and elegant.',
    premium: false,
  },
]

export const isValidTemplate = (id) => templates.some((t) => t.id === id)
