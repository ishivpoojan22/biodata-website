import { TextField } from '../ui/FormField'
import { useSection } from './useSection'

export default function PartnerForm() {
  const { data, set } = useSection('partner')

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <TextField
        id="preferredAge"
        label="Preferred Age"
        value={data.preferredAge}
        onChange={set('preferredAge')}
        placeholder="25 - 30 years"
      />
      <TextField
        id="preferredEducation"
        label="Preferred Education"
        value={data.preferredEducation}
        onChange={set('preferredEducation')}
        placeholder="Graduate or above"
      />
      <TextField
        id="preferredOccupation"
        label="Preferred Occupation"
        value={data.preferredOccupation}
        onChange={set('preferredOccupation')}
        placeholder="Any professional"
      />
      <TextField
        id="preferredLocation"
        label="Preferred Location"
        value={data.preferredLocation}
        onChange={set('preferredLocation')}
        placeholder="India / Abroad"
      />
    </div>
  )
}
