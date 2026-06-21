import {
  ageFromDob,
  detailRows,
  formatDate,
  fullName,
  location,
  val,
} from '../../templates/templateUtils'

function Block({ title, rows }) {
  return (
    <section className="mb-5">
      <h2 className="mb-2 border-b border-gray-300 pb-1 font-serif text-base font-bold uppercase tracking-wide text-gray-800">
        {title}
      </h2>
      <table className="w-full text-sm">
        <tbody>
          {rows.map((r) => (
            <tr key={r.label}>
              <td className="w-44 py-1 align-top text-gray-500">{r.label}</td>
              <td className="py-1 font-medium text-gray-900">{r.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

/**
 * A clean, light, single-page document used for the Download PDF / print
 * output. It is shared by every site theme so the printed biodata always looks
 * crisp and professional regardless of the on-screen design. Rendered inside a
 * `hidden print:block` wrapper by the dispatcher.
 */
export default function PrintableBiodata({ data = {} }) {
  const {
    basicInfo = {},
    education = {},
    family = {},
    aboutMe = {},
    partner = {},
    contact = {},
    photos = {},
  } = data
  const age = ageFromDob(basicInfo.dateOfBirth)

  return (
    <div className="mx-auto max-w-3xl bg-white p-8 text-gray-900">
      {/* Header */}
      <div className="mb-6 flex items-center gap-6 border-b-2 border-gray-800 pb-5">
        {photos.profilePhoto && (
          <img
            src={photos.profilePhoto}
            alt={fullName(basicInfo)}
            className="h-28 w-28 rounded object-cover"
          />
        )}
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
            Marriage Biodata
          </p>
          <h1 className="mt-1 font-serif text-3xl font-bold">
            {fullName(basicInfo)}
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            {val(aboutMe.headline || education.occupation, '')}
            {age ? ` · ${age} years` : ''} · {location(basicInfo)}
          </p>
        </div>
      </div>

      {aboutMe.bio && (
        <p className="mb-5 text-sm italic leading-relaxed text-gray-700">
          “{aboutMe.bio}”
        </p>
      )}

      <Block
        title="Personal Details"
        rows={[
          { label: 'Gender', value: val(basicInfo.gender) },
          { label: 'Date of Birth', value: formatDate(basicInfo.dateOfBirth) },
          { label: 'Height', value: val(basicInfo.height) },
          { label: 'Religion', value: val(basicInfo.religion) },
          { label: 'Caste', value: val(basicInfo.caste) },
          { label: 'Mother Tongue', value: val(basicInfo.motherTongue) },
          { label: 'Diet', value: val(basicInfo.diet) },
        ]}
      />
      <Block title="Education & Career" rows={detailRows.education(education)} />
      <Block title="Family Details" rows={detailRows.family(family)} />
      <Block title="Partner Preferences" rows={detailRows.partner(partner)} />
      <Block
        title="Contact"
        rows={[
          { label: 'Phone', value: val(contact.phone) },
          { label: 'Email', value: val(contact.email) },
          { label: 'WhatsApp', value: val(contact.whatsapp) },
        ]}
      />
    </div>
  )
}
