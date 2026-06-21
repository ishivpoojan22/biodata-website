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
 * FLORAL — A soft, pastel floral-themed single-page biodata with rounded
 * shapes, a pink/blush palette, and decorative section dividers. Feminine,
 * warm, and print-ready.
 */
export default function FloralTemplate({ data = {} }) {
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
  const gallery = toList(photos.gallery)

  return (
    <div
      className="mx-auto max-w-3xl bg-gradient-to-b from-pink-50 via-white to-rose-50 font-sans shadow-lg"
      style={{ minHeight: '100vh' }}
    >
      {/* Decorative top */}
      <div className="h-3 bg-gradient-to-r from-pink-300 via-rose-400 to-pink-300" />

      <div className="px-6 py-8 sm:px-10">
        {/* Header */}
        <header className="mb-8 text-center">
          <p className="text-sm font-medium tracking-wide text-rose-500">
            ✿ Marriage Biodata ✿
          </p>

          <div className="mx-auto my-5">
            {photos.profilePhoto ? (
              <img
                src={photos.profilePhoto}
                alt={fullName(basicInfo)}
                className="mx-auto h-40 w-40 rounded-full border-4 border-rose-200 object-cover shadow-md"
              />
            ) : (
              <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-full border-4 border-rose-200 bg-rose-50 font-serif text-5xl text-rose-300">
                {(basicInfo.firstName?.[0] || '?').toUpperCase()}
              </div>
            )}
          </div>

          <h1 className="font-serif text-4xl font-bold text-rose-900">
            {fullName(basicInfo)}
          </h1>
          <p className="mt-2 font-serif text-lg italic text-rose-600">
            {val(aboutMe.headline || education.occupation, '')}
          </p>
          <p className="mt-2 text-sm text-rose-700/70">
            {location(basicInfo)} {age ? `• ${age} years` : ''}
          </p>

          {aboutMe.tagline && (
            <p className="mx-auto mt-4 max-w-md text-sm italic text-gray-600">
              &ldquo;{aboutMe.tagline}&rdquo;
            </p>
          )}
        </header>

        {aboutMe.bio && (
          <div className="mb-6 rounded-2xl border border-rose-100 bg-white/80 p-5 text-center">
            <p className="text-sm leading-relaxed text-gray-700">{aboutMe.bio}</p>
          </div>
        )}

        <Block title="Personal Details">
          <DetailList
            rows={[
              { label: 'Full Name', value: fullName(basicInfo) },
              { label: 'Gender', value: val(basicInfo.gender) },
              { label: 'Date of Birth', value: formatDate(basicInfo.dateOfBirth) },
              { label: 'Height', value: val(basicInfo.height) },
              { label: 'Religion', value: val(basicInfo.religion) },
              { label: 'Caste', value: val(basicInfo.caste) },
              { label: 'Mother Tongue', value: val(basicInfo.motherTongue) },
              { label: 'Diet', value: val(basicInfo.diet) },
            ]}
          />
        </Block>

        <Block title="Education & Career">
          <DetailList rows={detailRows.education(education)} />
        </Block>

        <Block title="Family">
          <DetailList rows={detailRows.family(family)} />
        </Block>

        {(aboutMe.hobbies || aboutMe.interests || aboutMe.lifestyle) && (
          <Block title="Lifestyle & Interests">
            <div className="flex flex-wrap gap-2">
              {[
                ...toList(aboutMe.hobbies),
                ...toList(aboutMe.interests),
                ...toList(aboutMe.lifestyle),
              ].map((tag, i) => (
                <span
                  key={i}
                  className="rounded-full bg-rose-100 px-3 py-1.5 text-xs font-medium text-rose-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Block>
        )}

        <Block title="Partner Preferences">
          <DetailList rows={detailRows.partner(partner)} />
        </Block>

        {(contact.phone || contact.email || contact.whatsapp) && (
          <Block title="Contact">
            <DetailList
              rows={[
                contact.phone && { label: 'Phone', value: contact.phone },
                contact.email && { label: 'Email', value: contact.email },
                contact.whatsapp && { label: 'WhatsApp', value: contact.whatsapp },
              ].filter(Boolean)}
            />
          </Block>
        )}

        {gallery.length > 0 && (
          <Block title="Gallery">
            <div className="grid grid-cols-3 gap-3">
              {gallery.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Gallery ${i + 1}`}
                  className="aspect-square w-full rounded-xl border border-rose-100 object-cover"
                />
              ))}
            </div>
          </Block>
        )}

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="font-serif text-sm text-rose-400">✿ ✿ ✿</p>
        </div>
      </div>

      <div className="h-3 bg-gradient-to-r from-pink-300 via-rose-400 to-pink-300" />
    </div>
  )
}

function Block({ title, children }) {
  return (
    <section className="mb-5">
      <div className="mb-3 flex items-center gap-3">
        <span className="text-rose-400">✿</span>
        <h3 className="font-serif text-base font-semibold text-rose-800">
          {title}
        </h3>
        <span className="h-px flex-1 bg-rose-200" />
      </div>
      {children}
    </section>
  )
}

function DetailList({ rows }) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {rows.map((r) => (
        <div key={r.label} className="flex gap-3 rounded-lg bg-white/60 px-3 py-2">
          <span className="shrink-0 text-xs font-medium uppercase tracking-wide text-rose-500">
            {r.label}
          </span>
          <span className="text-sm text-gray-800">{r.value}</span>
        </div>
      ))}
    </div>
  )
}
