import { SelectField, TextAreaField, TextField } from '../ui/FormField'
import { useSection } from './useSection'

export default function FamilyForm() {
  const { data, set } = useSection('family')

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <TextField
        id="fatherName"
        label="Father's Name"
        value={data.fatherName}
        onChange={set('fatherName')}
        placeholder="Father's full name"
      />
      <TextField
        id="fatherOccupation"
        label="Father's Occupation"
        value={data.fatherOccupation}
        onChange={set('fatherOccupation')}
        placeholder="Retired Bank Manager"
      />
      <TextField
        id="motherName"
        label="Mother's Name"
        value={data.motherName}
        onChange={set('motherName')}
        placeholder="Mother's full name"
      />
      <TextField
        id="motherOccupation"
        label="Mother's Occupation"
        value={data.motherOccupation}
        onChange={set('motherOccupation')}
        placeholder="Homemaker"
      />
      <TextField
        id="siblings"
        label="Siblings"
        value={data.siblings}
        onChange={set('siblings')}
        placeholder="1 brother, 1 sister"
      />
      <SelectField
        id="familyType"
        label="Family Type"
        value={data.familyType}
        onChange={set('familyType')}
        options={['Nuclear Family', 'Joint Family']}
      />
      <SelectField
        id="familyStatus"
        label="Family Status"
        value={data.familyStatus}
        onChange={set('familyStatus')}
        options={['Middle Class', 'Upper Middle Class', 'Affluent', 'Rich']}
      />
      <TextAreaField
        id="familyValues"
        label="Family Values"
        value={data.familyValues}
        onChange={set('familyValues')}
        rows={3}
        placeholder="What your family believes in and how you celebrate together."
      />
      <div className="sm:col-span-2">
        <TextAreaField
          id="about"
          label="Family Background"
          value={data.about}
          onChange={set('about')}
          rows={3}
          placeholder="A short paragraph about your family's background and roots."
        />
      </div>
    </div>
  )
}
