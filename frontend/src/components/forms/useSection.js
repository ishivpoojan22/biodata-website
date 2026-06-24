import { useDispatch, useSelector } from 'react-redux'
import { updateField } from '../../redux/slices/profileSlice'

/**
 * Binds a profileData section to Redux. Returns the current section object and
 * a `set(field)` helper that produces an onChange handler dispatching
 * updateField for that section. Lets section forms stay declarative.
 */
export function useSection(section) {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.profile.profileData[section]) || {}

  const set = (field) => (value) =>
    dispatch(updateField({ section, field, value }))

  return { data, set }
}
