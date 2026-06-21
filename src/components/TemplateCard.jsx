import ProfileSite from './profile/ProfileSite'
import { sampleProfile } from '../templates/sampleProfile'

/**
 * A theme gallery card with a scaled-down live preview of the actual
 * multi-page profile website (rendered with sample data), plus a select
 * action.
 */
export default function TemplateCard({ template, selected, onSelect }) {
  return (
    <div
      className={`group flex flex-col overflow-hidden rounded-2xl border bg-white transition ${
        selected
          ? 'border-brand-500 ring-2 ring-brand-200'
          : 'border-gray-200 hover:border-brand-300 hover:shadow-md'
      }`}
    >
      {/* Live thumbnail */}
      <div className="relative h-64 overflow-hidden bg-neutral-950">
        <div className="pointer-events-none absolute left-0 top-0 h-[200%] w-[200%] origin-top-left scale-50">
          <ProfileSite
            data={sampleProfile}
            templateId={template.id}
            initialMode="dark"
            embedded
          />
        </div>
        {selected && (
          <span className="absolute right-3 top-3 z-10 rounded-full bg-brand-600 px-2.5 py-1 text-xs font-medium text-white shadow">
            Selected
          </span>
        )}
        {template.premium && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-amber-500 px-2.5 py-1 text-xs font-medium text-white shadow">
            Premium
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
          <h3 className="font-serif text-xl font-semibold text-gray-900">
            {template.name}
          </h3>
        </div>
        <p className="mt-1 flex-1 text-sm text-gray-500">
          {template.description}
        </p>
        <button
          type="button"
          onClick={() => onSelect(template.id)}
          className={`mt-4 w-full rounded-lg px-4 py-2.5 text-sm font-medium transition ${
            selected
              ? 'bg-brand-600 text-white hover:bg-brand-700'
              : 'border border-brand-300 bg-brand-50 text-brand-700 hover:bg-brand-100'
          }`}
        >
          {selected ? 'Selected' : 'Use this theme'}
        </button>
      </div>
    </div>
  )
}
