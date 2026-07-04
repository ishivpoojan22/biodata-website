import { TextField } from '../ui/FormField'
import { useSection } from './useSection'

export default function EducationForm() {
  const { data, set } = useSection('education')

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <TextField
        id="education"
        label="Education"
        value={data.education}
        onChange={set('education')}
        placeholder="B.Tech, Computer Science"
      />
      <TextField
        id="school"
        label="School"
        value={data.school}
        onChange={set('school')}
        placeholder="St. Mary's High School"
      />
      <TextField
        id="college"
        label="College / University"
        value={data.college}
        onChange={set('college')}
        placeholder="IIT Delhi"
      />
      <TextField
        id="occupation"
        label="Occupation"
        value={data.occupation}
        onChange={set('occupation')}
        placeholder="Software Engineer"
      />
      <TextField
        id="company"
        label="Company"
        value={data.company}
        onChange={set('company')}
        placeholder="Google"
      />
      <TextField
        id="annualIncome"
        label="Annual Income"
        value={data.annualIncome}
        onChange={set('annualIncome')}
        placeholder="₹ 12 LPA"
      />
    </div>
  )
}
