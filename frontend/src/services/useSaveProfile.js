import { useDispatch, useSelector } from 'react-redux'
import { setSavedProfile } from '../redux/slices/profileSlice'
import {
  useCreateProfileMutation,
  useUpdateProfileMutation,
} from './api'

/**
 * Centralised save logic shared by the Create and Preview pages.
 * Creates a new profile or updates an existing one depending on whether a
 * profileId already exists in the store. On success the saved id + slug are
 * written back to the store and returned.
 */
export function useSaveProfile() {
  const dispatch = useDispatch()
  const { profileId, profileData } = useSelector((s) => s.profile)
  const selectedTemplate = useSelector((s) => s.template.selectedTemplate)

  const [createProfile, createState] = useCreateProfileMutation()
  const [updateProfile, updateState] = useUpdateProfileMutation()

  const save = async () => {
    const payload = {
      templateId: selectedTemplate,
      ...profileData,
    }

    const result = profileId
      ? await updateProfile({ id: profileId, ...payload }).unwrap()
      : await createProfile(payload).unwrap()

    dispatch(
      setSavedProfile({
        id: result._id ?? result.id,
        slug: result.slug,
      }),
    )
    return result
  }

  return {
    save,
    isSaving: createState.isLoading || updateState.isLoading,
    error: createState.error || updateState.error,
    isExisting: Boolean(profileId),
  }
}
