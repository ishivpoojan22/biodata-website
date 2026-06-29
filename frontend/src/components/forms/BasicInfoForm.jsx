import { SelectField, TextField } from '../ui/FormField'
import { useSection } from './useSection'

export default function BasicInfoForm() {
  const { data, set } = useSection('basicInfo')

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <TextField
        id="firstName"
        label="First Name"
        value={data.firstName}
        onChange={set('firstName')}
        placeholder="First Name"
        required
      />
      <TextField
        id="lastName"
        label="Last Name"
        value={data.lastName}
        onChange={set('lastName')}
        placeholder="Last Name"
      />
      <SelectField
        id="gender"
        label="Gender"
        value={data.gender}
        onChange={set('gender')}
        options={['Male', 'Female', 'Other']}
      />
      <TextField
        id="dateOfBirth"
        label="Date of Birth"
        type="date"
        value={data.dateOfBirth}
        onChange={set('dateOfBirth')}
      />
      <TextField
        id="height"
        label="Height"
        value={data.height}
        onChange={set('height')}
        placeholder={`5'8" / 173 cm`}
      />
      <TextField
        id="religion"
        label="Religion"
        value={data.religion}
        onChange={set('religion')}
        placeholder="Hindu"
      />
      <TextField
        id="caste"
        label="Caste"
        value={data.caste}
        onChange={set('caste')}
        placeholder="Caste / Community"
      />
      <TextField
        id="motherTongue"
        label="Mother Tongue"
        value={data.motherTongue}
        onChange={set('motherTongue')}
        placeholder="Hindi"
      />
      <SelectField
        id="diet"
        label="Diet"
        value={data.diet}
        onChange={set('diet')}
        options={['Vegetarian', 'Non-Vegetarian', 'Eggetarian', 'Vegan', 'Jain']}
      />
      <TextField
        id="city"
        label="City"
        value={data.city}
        onChange={set('city')}
        placeholder="Lucknow"
      />
      <TextField
        id="state"
        label="State"
        value={data.state}
        onChange={set('state')}
        placeholder="Uttar Pradesh"
      />
      <TextField
        id="country"
        label="Country"
        value={data.country}
        onChange={set('country')}
        placeholder="India"
      />
    </div>
  )
}
