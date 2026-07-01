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
  {
    id: 'azure',
    type: 'website',
    name: 'Classic Azure',
    description:
      'Same ceremonial layout as Classic Gold — centered hero, top navbar and floating pill nav — in a cool sky-blue accent.',
    premium: false,
  },
  {
    id: 'noir',
    type: 'website',
    name: 'Classic Violet',
    description:
      'Same ceremonial layout as Classic Gold — centered hero, top navbar and floating pill nav — in an elegant violet accent.',
    premium: false,
  },
  {
    id: 'festive',
    type: 'website',
    name: 'Shubh Vivah',
    description:
      'Festive Indian-wedding design with a marigold→crimson→magenta gradient hero framed in antique gold, ornamental flourishes and warm ivory cards.',
    premium: false,
  },
  {
    id: 'royalwed',
    type: 'website',
    name: 'Royal Rajwada',
    description:
      'Regal Rajasthani palace theme — deep maroon background, antique gold ornament and a Mughal arch photo frame. Rich and ceremonial.',
    premium: false,
  },
  {
    id: 'mehndi',
    type: 'website',
    name: 'Mehndi Bagh',
    description:
      'Fresh henna-garden theme — light pista/cream background with deep mehndi-green, gold and terracotta accents and paisley flourishes.',
    premium: false,
  },
  {
    id: 'peacock',
    type: 'website',
    name: 'Peacock Mor',
    description:
      'Jewel-tone peacock theme — teal→royal-blue→purple gradient with gold accents, feather glows and glassy panels. Vibrant and regal.',
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
