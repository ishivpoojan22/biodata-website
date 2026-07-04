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
 * MINIMAL — Clean, modern single-page biodata with a two-tone header
 * (photo + name on a bold gradient), then structured white cards below.
 * Great for professionals who want a contemporary, clean look.
 */
export default function MinimalTemplate({ data = {} }) {
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
    <div className="mx-auto max-w-3xl bg-slate-50 font-sans shadow-lg" style={{ minHeight: '100vh' }}>
      {/* Hero header */}
      <header className="relative bg-gradient-to-br from-slate-800 to-slate-950 px-8 pb-10 pt-8 text-white sm:px-12">
        <div className="flex flex-col items-center gap-6 sm:flex-row">
          {photos.profilePhoto ? (
            <img
              src={photos.profilePhoto}
              alt={fullName(basicInfo)}
              className="h-28 w-28 rounded-2xl border-2 border-white/30 object-cover shadow-xl"
            />
          ) : (
            <div className="flex h-28 w-28 items-center justify-center rounded-2xl border-2 border-white/20 bg-white/10 text-4xl font-bold">
              {(basicInfo.firstName?.[0] || '?').toUpperCase()}
            </div>
          )}
          <div className="text-center sm:text-left">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">
              Marriage Biodata
            </p>
            <h1 className="mt-1 text-3xl font-bold sm:text-4xl">
              {fullName(basicInfo)}
            </h1>
            <p className="mt-2 text-lg text-slate-300">
              {val(aboutMe.headline || education.occupation, '')}
            </p>
            <p className="mt-1 text-sm text-slate-400">
              {location(basicInfo)} {age ? `· ${age} years` : ''}
            </p>
          </div>
        </div>

        {/* Quick chips */}
        <div className="mt-6 flex flex-wrap justify-center gap-2 sm:justify-start">
          {[education.education, `${basicInfo.religion}, ${basicInfo.caste}`, basicInfo.diet]
            .filter(Boolean)
            .map((tag, i) => (
              <span
                key={i}
                className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium"
              >
                {tag}
              </span>
            ))}
        </div>
      </header>

      {/* Content */}
      <div className="space-y-5 px-6 py-8 sm:px-10">
        {aboutMe.bio && (
          <Card>
            <p className="text-sm italic leading-relaxed text-slate-600">
              &ldquo;{aboutMe.bio}&rdquo;
            </p>
            {aboutMe.tagline && (
              <p className="mt-2 text-xs font-medium text-cyan-700">
                — {aboutMe.tagline}
              </p>
            )}
          </Card>
        )}

        <Card title="Personal">
          <Grid
            rows={[
              { label: 'Gender', value: val(basicInfo.gender) },
              { label: 'DOB', value: formatDate(basicInfo.dateOfBirth) },
              { label: 'Height', value: val(basicInfo.height) },
              { label: 'Religion', value: val(basicInfo.religion) },
              { label: 'Mother Tongue', value: val(basicInfo.motherTongue) },
              { label: 'Diet', value: val(basicInfo.diet) },
            ]}
          />
        </Card>

        <Card title="Education & Career">
          <Grid rows={detailRows.education(education)} />
        </Card>

        <Card title="Family">
          <Grid rows={detailRows.family(family)} />
        </Card>

        <Card title="Partner Preferences">
          <Grid rows={detailRows.partner(partner)} />
        </Card>

        {(contact.phone || contact.email || contact.whatsapp) && (
          <Card title="Contact">
            <Grid
              rows={[
                contact.phone && { label: 'Phone', value: contact.phone },
                contact.email && { label: 'Email', value: contact.email },
                contact.whatsapp && { label: 'WhatsApp', value: contact.whatsapp },
              ].filter(Boolean)}
            />
          </Card>
        )}

        {gallery.length > 0 && (
          <Card title="Gallery">
            <div className="grid grid-cols-3 gap-3">
              {gallery.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Gallery ${i + 1}`}
                  className="aspect-square w-full rounded-xl object-cover"
                />
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}

function Card({ title, children }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      {title && (
        <h3 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-700">
          <span className="h-0.5 w-5 bg-cyan-500" />
          {title}
        </h3>
      )}
      {children}
    </div>
  )
}

function Grid({ rows }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {rows.map((r) => (
        <div key={r.label}>
          <p className="text-xs uppercase tracking-wide text-slate-400">{r.label}</p>
          <p className="text-sm font-medium text-slate-800">{r.value}</p>
        </div>
      ))}
    </div>
  )
}
