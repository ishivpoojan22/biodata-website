/**
 * Template metadata served by GET /api/templates. This mirrors the frontend
 * registry (src/templates/index.jsx) by `id`. The actual rendering components
 * live on the client; the server only stores/serves metadata so templates and
 * data stay fully decoupled.
 */
export const templates = [
  {
    id: 'classic',
    name: 'Classic',
    description:
      'Traditional ornate design with a maroon & gold palette. Perfect for a formal, time-honoured biodata.',
    premium: false,
  },
  {
    id: 'modern',
    name: 'Modern',
    description:
      'Clean two-column layout with a bold sidebar and tag-based interests. Great for a contemporary look.',
    premium: false,
  },
  {
    id: 'elegant',
    name: 'Elegant',
    description:
      'Minimal editorial style with serif headings and plenty of whitespace. Subtle and refined.',
    premium: false,
  },
]

export const isValidTemplate = (id) => templates.some((t) => t.id === id)
