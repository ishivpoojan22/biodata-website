import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FORM_SECTIONS } from '../components/forms'
import Button from '../components/ui/Button'
import { selectTemplate } from '../redux/slices/templateSlice'
import { useSaveProfile } from '../services/useSaveProfile'
import { DEFAULT_TEMPLATE_ID, TEMPLATES } from '../templates/registry'
import ProfileSite from '../components/profile/ProfileSite'

/**
 * Create / edit flow: a multi-step form on the left and a live preview of the
 * selected template on the right. The same profileData drives both, so the
 * preview updates in real time as the user types.
 */
export default function CreateProfile() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)

  const selectedTemplate = useSelector((s) => s.template.selectedTemplate)
  const profileData = useSelector((s) => s.profile.profileData)
  const { save, isSaving, error } = useSaveProfile()

  // Ensure a template is always selected so the preview has something to show.
  useEffect(() => {
    if (!selectedTemplate) dispatch(selectTemplate(DEFAULT_TEMPLATE_ID))
  }, [selectedTemplate, dispatch])

  const templateId = selectedTemplate || DEFAULT_TEMPLATE_ID
  const section = FORM_SECTIONS[step]
  const StepComponent = section.Component
  const isLast = step === FORM_SECTIONS.length - 1

  const handleSave = async () => {
    try {
      const result = await save()
      if (result?.slug) navigate(`/preview`)
    } catch {
      /* error surfaced via `error` below */
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-serif text-2xl font-bold text-gray-900">
            Create your biodata
          </h1>
          <p className="text-sm text-gray-500">
            Fill in your details. The preview updates as you type.
          </p>
        </div>
        {/* Template switcher */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Template:</span>
          <select
            value={templateId}
            onChange={(e) => dispatch(selectTemplate(e.target.value))}
            className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
          >
            {TEMPLATES.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Form column */}
        <div>
          {/* Step indicator */}
          <div className="mb-6 flex flex-wrap gap-2">
            {FORM_SECTIONS.map((s, i) => (
              <button
                key={s.key}
                onClick={() => setStep(i)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                  i === step
                    ? 'bg-brand-600 text-white'
                    : i < step
                      ? 'bg-brand-100 text-brand-700'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {i + 1}. {s.title}
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">
              {section.title}
            </h2>
            <p className="mb-5 text-sm text-gray-500">{section.description}</p>

            <StepComponent />

            <div className="mt-8 flex items-center justify-between">
              <Button
                variant="secondary"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
              >
                ← Back
              </Button>

              {isLast ? (
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? 'Saving…' : 'Save & Get Link'}
                </Button>
              ) : (
                <Button onClick={() => setStep((s) => s + 1)}>Next →</Button>
              )}
            </div>

            {error && (
              <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                Could not save the profile. Make sure the server is running, then
                try again.
              </p>
            )}
          </div>
        </div>

        {/* Live preview column */}
        <div className="lg:sticky lg:top-20 lg:self-start">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Live Preview
            </span>
            <Button to="/preview" variant="ghost" size="sm">
              Full preview →
            </Button>
          </div>
          <div className="h-[75vh] overflow-y-auto rounded-2xl border border-gray-200 scrollbar-thin">
            <ProfileSite
              data={profileData}
              templateId={templateId}
              initialMode="dark"
              embedded
            />
          </div>
        </div>
      </div>
    </div>
  )
}
