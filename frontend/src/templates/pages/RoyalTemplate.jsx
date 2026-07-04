import {
  ageFromDob,
  detailRows,
  formatDate,
  fullName,
  location,
  toList,
  val,
} from '../templateUtils'

/**
 * ROYAL — A grand, ornate single-page biodata with a deep maroon/gold palette,
 * decorative borders, centered header with religious invocation, and structured
 * detail tables. Print-ready A4 design.
 */
export default function RoyalTemplate({ data = {} }) {
  const {
    basicInfo = {},
    education = {},
    family = {},
    aboutMe = {},
    partner = {},
    contact = {},
    photos = {},
  } = data
  const age = basicInfo.age || ageFromDob(basicInfo.dateOfBirth)
  const gallery = toList(photos.gallery)

  return (
    <div
      className="mx-auto max-w-3xl bg-gradient-to-b from-amber-50 via-white to-amber-50 font-sans shadow-lg"
      style={{ minHeight: '100vh' }}
    >
      {/* Double border frame */}
      <div className="m-3 border-4 border-double border-amber-700/60 p-6 sm:m-6 sm:p-10">
        {/* Header */}
        <header className="mb-8 text-center">
          <p className="font-serif text-lg text-amber-700">॥ श्री गणेशाय नमः ॥</p>
          <div className="mx-auto my-5 h-px w-32 bg-gradient-to-r from-transparent via-amber-600 to-transparent" />

          <div className="mx-auto mb-4 w-fit">
            {photos.profilePhoto ? (
              <img
                src={photos.profilePhoto}
                alt={fullName(basicInfo)}
                className="h-36 w-36 rounded-full border-4 border-amber-600 object-cover shadow-lg"
              />
            ) : (
              <div className="flex h-36 w-36 items-center justify-center rounded-full border-4 border-amber-600 bg-amber-100 font-serif text-5xl text-amber-700">
                {(basicInfo.firstName?.[0] || '?').toUpperCase()}
              </div>
            )}
          </div>

          <h1 className="font-serif text-4xl font-bold text-amber-900">
            {fullName(basicInfo)}
          </h1>
          <p className="mt-1 font-serif text-lg italic text-amber-700">
            {val(aboutMe.headline || education.occupation, 'Marriage Biodata')}
          </p>
          <p className="mt-2 text-sm text-amber-800/70">
            {location(basicInfo)} {age ? `• ${age} years` : ''}
          </p>
        </header>

        {aboutMe.bio && (
          <p className="mb-6 text-center font-serif text-sm italic leading-relaxed text-gray-700">
            &ldquo;{aboutMe.bio}&rdquo;
          </p>
        )}

        {/* Sections */}
        <Section title="Personal Details">
          <Rows
            rows={[
              { label: 'Full Name', value: fullName(basicInfo) },
              { label: 'Date of Birth', value: formatDate(basicInfo.dateOfBirth) },
              ...detailRows.basic(basicInfo),
              { label: 'Mother Tongue', value: val(basicInfo.motherTongue) },
              { label: 'Diet', value: val(basicInfo.diet) },
            ]}
          />
        </Section>

        <Section title="Education & Career">
          <Rows rows={detailRows.education(education)} />
        </Section>

        <Section title="Family Details">
          <Rows rows={detailRows.family(family)} />
        </Section>

        <Section title="Partner Preferences">
          <Rows rows={detailRows.partner(partner)} />
        </Section>

        {(contact.phone || contact.email || contact.whatsapp) && (
          <Section title="Contact">
            <Rows
              rows={[
                contact.phone && { label: 'Phone', value: contact.phone },
                contact.email && { label: 'Email', value: contact.email },
                contact.whatsapp && { label: 'WhatsApp', value: contact.whatsapp },
              ].filter(Boolean)}
            />
          </Section>
        )}

        {gallery.length > 0 && (
          <Section title="Gallery">
            <div className="grid grid-cols-3 gap-3">
              {gallery.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Gallery ${i + 1}`}
                  className="aspect-square w-full rounded border border-amber-200 object-cover"
                />
              ))}
            </div>
          </Section>
        )}

        <div className="mt-8 text-center">
          <div className="mx-auto h-px w-32 bg-gradient-to-r from-transparent via-amber-600 to-transparent" />
          <p className="mt-4 font-serif text-sm text-amber-700">
            ॥ शुभ विवाह ॥
          </p>
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <section className="mb-6">
      <h3 className="mb-3 border-b-2 border-amber-200 pb-1 text-center font-serif text-base font-bold uppercase tracking-[0.15em] text-amber-800">
        ❖ {title} ❖
      </h3>
      {children}
    </section>
  )
}

function Rows({ rows }) {
  return (
    <table className="w-full text-sm">
      <tbody>
        {rows.map((r) => (
          <tr key={r.label} className="border-b border-amber-100/60">
            <td className="w-40 py-2 pr-4 font-medium text-amber-900">
              {r.label}
            </td>
            <td className="py-2 text-gray-800">{r.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
