import { useParams } from 'react-router-dom'
import Button from '../components/ui/Button'
import Spinner from '../components/ui/Spinner'
import ProfileSite from '../components/profile/ProfileSite'
import { useGetProfileBySlugQuery } from '../services/api'
import { DEFAULT_TEMPLATE_ID } from '../templates/registry'

/**
 * Public, shareable profile. Renders the full multi-page personal biodata
 * website (Home / About / Career / Family / Gallery / Contact) with no app
 * chrome — just the person's own site.
 */
export default function PublicProfile() {
  const { slug } = useParams()
  const { data, isLoading, isError } = useGetProfileBySlugQuery(slug)

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-950">
        <Spinner label="Loading biodata…" />
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-neutral-950 px-4 text-center text-neutral-100">
        <h1 className="font-serif text-3xl font-bold">Biodata not found</h1>
        <p className="max-w-md text-neutral-400">
          The profile you are looking for doesn’t exist or may have been
          removed.
        </p>
        <Button to="/">Go home</Button>
      </div>
    )
  }

  return (
    <ProfileSite
      data={data}
      templateId={data.templateId || DEFAULT_TEMPLATE_ID}
      initialMode="dark"
    />
  )
}
