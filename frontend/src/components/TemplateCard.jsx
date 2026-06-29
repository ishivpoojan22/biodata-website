import { useNavigate } from 'react-router-dom'
import ProfileSite from './profile/ProfileSite'
import { sampleProfile } from '../templates/sampleProfile'

/**
 * Template gallery card — works for both "website" and "template" types.
 * Renders a scaled-down live preview with sample data so users can see the
 * real design before choosing.
 */
export default function TemplateCard({ template, selected, onSelect }) {
  const isWebsite = template.type === 'website'
  const navigate = useNavigate()

  return (
    <div
      onClick={() => onSelect(template.id)}
      className={`group flex cursor-pointer flex-col overflow-hidden rounded-2xl border bg-white transition ${
        selected
          ? 'border-brand-500 ring-2 ring-brand-200'
          : 'border-gray-200 hover:border-brand-300 hover:shadow-md'
      }`}
    >
      {/* Live thumbnail */}
      <div
        className={`relative h-72 overflow-hidden ${isWebsite ? 'bg-neutral-950' : 'bg-gray-100'}`}
      >
        <div
          className={`pointer-events-none absolute left-0 top-0 origin-top-left ${
            isWebsite
              ? 'h-[200%] w-[200%] scale-50'
              : 'h-[250%] w-[250%] scale-[0.40]'
          }`}
        >
          <ProfileSite
            data={sampleProfile}
            templateId={template.id}
            initialMode="dark"
            embedded
          />
        </div>

        {/* Badges */}
        <div className="absolute left-3 top-3 z-10 flex gap-2">
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-medium text-white shadow ${
              isWebsite ? 'bg-indigo-600' : 'bg-amber-600'
            }`}
          >
            {isWebsite ? '🌐 Website' : '📄 Template'}
          </span>
          {template.premium && (
            <span className="rounded-full bg-amber-500 px-2.5 py-1 text-xs font-medium text-white shadow">
              Premium
            </span>
          )}
        </div>

        {selected && (
          <span className="absolute right-3 top-3 z-10 rounded-full bg-brand-600 px-2.5 py-1 text-xs font-medium text-white shadow">
            ✓ Selected
          </span>
        )}
      </div>

      {/* Meta */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2">
          <span
            className="h-4 w-4 rounded-full ring-2 ring-white"
            style={{ backgroundColor: template.swatch }}
          />
          <h3 className="font-serif text-lg font-semibold text-gray-900">
            {template.name}
          </h3>
        </div>
        <p className="mt-1 flex-1 text-sm text-gray-500">
          {template.description}
        </p>
        {selected ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              navigate('/create')
            }}
            className="mt-4 w-full rounded-lg bg-brand-600 px-4 py-2.5 text-center text-sm font-medium text-white transition hover:bg-brand-700"
          >
            Create Biodata →
          </button>
        ) : (
          <div className="mt-4 w-full rounded-lg border border-brand-300 bg-brand-50 px-4 py-2.5 text-center text-sm font-medium text-brand-700 transition group-hover:bg-brand-100">
            Click to select
          </div>
        )}
      </div>
    </div>
  )
}
