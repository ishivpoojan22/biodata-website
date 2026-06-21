import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Button from '../components/ui/Button'
import ProfileSite from '../components/profile/ProfileSite'
import { useSaveProfile } from '../services/useSaveProfile'
import { DEFAULT_TEMPLATE_ID } from '../templates/registry'

export default function PreviewProfile() {
  const navigate = useNavigate()
  const profileData = useSelector((s) => s.profile.profileData)
  const slug = useSelector((s) => s.profile.slug)
  const selectedTemplate = useSelector((s) => s.template.selectedTemplate)
  const { save, isSaving, error, isExisting } = useSaveProfile()
  const [copied, setCopied] = useState(false)

  const templateId = selectedTemplate || DEFAULT_TEMPLATE_ID
  const shareUrl = slug ? `${window.location.origin}/profile/${slug}` : ''

  const handleSave = async () => {
    try {
      await save()
    } catch {
      /* surfaced below */
    }
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div>
      {/* Action bar */}
      <div className="border-b border-gray-100 bg-white no-print">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4">
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h1 className="font-serif text-xl font-bold text-gray-900">
                Preview your biodata website
              </h1>
              <p className="text-sm text-gray-500">
                This is exactly what visitors will see. Save to get your link.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" onClick={() => navigate('/create')}>
                ← Edit
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving
                  ? 'Saving…'
                  : isExisting
                    ? 'Update biodata'
                    : 'Save & Get Link'}
              </Button>
            </div>
          </div>

          {slug && (
            <div className="rounded-xl bg-brand-50 p-4">
              <p className="text-sm font-medium text-brand-800">
                ✓ Your biodata is live! Share this link:
              </p>
              <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                <input
                  readOnly
                  value={shareUrl}
                  onFocus={(e) => e.target.select()}
                  className="flex-1 rounded-lg border border-brand-200 bg-white px-3 py-2 text-sm text-gray-700"
                />
                <div className="flex gap-2">
                  <Button variant="secondary" size="md" onClick={copyLink}>
                    {copied ? 'Copied!' : 'Copy'}
                  </Button>
                  <Button to={`/profile/${slug}`} size="md">
                    Open
                  </Button>
                </div>
              </div>
            </div>
          )}

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
              Could not save the profile. Make sure the server is running, then
              try again.
            </p>
          )}
        </div>
      </div>

      {/* Full multi-page biodata website preview */}
      <ProfileSite data={profileData} templateId={templateId} initialMode="dark" />
    </div>
  )
}
