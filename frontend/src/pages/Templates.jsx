import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import TemplateCard from '../components/TemplateCard'
import Button from '../components/ui/Button'
import { selectTemplate } from '../redux/slices/templateSlice'
import { useGetTemplatesQuery } from '../services/api'
import {
  TEMPLATES,
  getTemplate,
} from '../templates/registry'

const TABS = [
  { key: 'all', label: 'All', emoji: '✦' },
  { key: 'website', label: 'Websites', emoji: '🌐' },
  { key: 'template', label: 'Templates', emoji: '📄' },
]

/**
 * Templates gallery with category tabs. Users can browse all designs,
 * only multi-page websites, or only single-page printable templates.
 */
export default function Templates() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const selectedTemplate = useSelector((s) => s.template.selectedTemplate)
  const { data: apiTemplates } = useGetTemplatesQuery()
  const [activeTab, setActiveTab] = useState('all')

  // Merge API metadata (if any) with local registry.
  const templates = useMemo(() => {
    if (Array.isArray(apiTemplates) && apiTemplates.length) {
      return apiTemplates
        .map((t) => {
          const local = getTemplate(t.id)
          return local ? { ...local, ...t } : null
        })
        .filter(Boolean)
    }
    return TEMPLATES
  }, [apiTemplates])

  const filtered = useMemo(() => {
    if (activeTab === 'all') return templates
    return templates.filter((t) => t.type === activeTab)
  }, [templates, activeTab])

  const handleSelect = (id) => dispatch(selectTemplate(id))

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-serif text-3xl font-bold text-gray-900">
            Choose your biodata style
          </h1>
          <p className="mt-2 max-w-lg text-gray-500">
            Pick a multi-page <strong>website</strong> for a personal biodata site, or
            a single-page <strong>template</strong> for a classic printable biodata.
            Same details work with any design.
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

      {/* Tabs */}
      <div className="mt-8 flex flex-wrap gap-2 border-b border-gray-200 pb-4">
        {TABS.map((tab) => {
          const count =
            tab.key === 'all'
              ? templates.length
              : templates.filter((t) => t.type === tab.key).length
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition ${
                activeTab === tab.key
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span>{tab.emoji}</span>
              {tab.label}
              <span
                className={`ml-1 rounded-full px-1.5 py-0.5 text-xs ${
                  activeTab === tab.key
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((t) => (
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
            {getTemplate(selectedTemplate)?.name ?? 'selected'} →
          </Button>
        </div>
      )}
    </div>
  )
}
