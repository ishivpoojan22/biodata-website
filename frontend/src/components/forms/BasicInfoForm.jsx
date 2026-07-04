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
      <TextField
        id="age"
        label="Age"
        value={data.age}
        onChange={set('age')}
        placeholder="Age"
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

      {/* Astrological details (optional) */}
      <div className="sm:col-span-2 mt-2 border-t border-gray-100 pt-4">
        <p className="text-sm font-semibold text-gray-700">
          Astrological Details
          <span className="ml-1 font-normal text-gray-400">(optional)</span>
        </p>
      </div>
      <TextField
        id="rashi"
        label="Rashi (Moon Sign)"
        value={data.rashi}
        onChange={set('rashi')}
        placeholder="Simha (Leo)"
      />
      <TextField
        id="nakshatra"
        label="Nakshatra"
        value={data.nakshatra}
        onChange={set('nakshatra')}
        placeholder="Magha"
      />
      <TextField
        id="gotra"
        label="Gotra"
        value={data.gotra}
        onChange={set('gotra')}
        placeholder="Kashyap"
      />
      <SelectField
        id="manglik"
        label="Manglik Status"
        value={data.manglik}
        onChange={set('manglik')}
        options={['Non-Manglik', 'Manglik', 'Anshik Manglik', "Don't Know"]}
      />
    </div>
  )
}
