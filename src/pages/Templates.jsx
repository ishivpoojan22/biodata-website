import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import TemplateCard from '../components/TemplateCard'
import Button from '../components/ui/Button'
import { selectTemplate } from '../redux/slices/templateSlice'
import { useGetTemplatesQuery } from '../services/api'
import { TEMPLATES, getTemplate } from '../templates/registry'

/**
 * Templates gallery. Template definitions live in the frontend registry
 * (because the render logic is React). The GET /api/templates call is used to
 * order/augment that list; if the API is unavailable we fall back to the local
 * registry so the gallery always works.
 */
export default function Templates() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const selectedTemplate = useSelector((s) => s.template.selectedTemplate)
  const { data: apiTemplates } = useGetTemplatesQuery()

  // Merge API metadata (if any) with local components.
  const templates = useMemo(() => {
    if (Array.isArray(apiTemplates) && apiTemplates.length) {
      return apiTemplates
        .map((t) => {
          const local = getTemplate(t.id)
          return local ? { ...local, ...t, component: local.component } : null
        })
        .filter(Boolean)
    }
    return TEMPLATES
  }, [apiTemplates])

  const handleSelect = (id) => dispatch(selectTemplate(id))

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-serif text-3xl font-bold text-gray-900">
            Choose a template
          </h1>
          <p className="mt-2 text-gray-500">
            Every template uses the same details, so you can switch anytime.
          </p>
        </div>
        <Button
          to="/create"
          disabled={!selectedTemplate}
          className={!selectedTemplate ? 'pointer-events-none opacity-60' : ''}
        >
          Continue →
        </Button>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((t) => (
          <TemplateCard
            key={t.id}
            template={t}
            selected={selectedTemplate === t.id}
            onSelect={handleSelect}
          />
        ))}
      </div>

      {selectedTemplate && (
        <div className="mt-10 flex justify-center">
          <Button size="lg" onClick={() => navigate('/create')}>
            Continue with{' '}
            {getTemplate(selectedTemplate)?.name ?? 'selected'} template →
          </Button>
        </div>
      )}
    </div>
  )
}
