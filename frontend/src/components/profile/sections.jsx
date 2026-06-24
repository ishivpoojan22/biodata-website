import {
  ageFromDob,
  detailRows,
  formatDate,
  fullName,
  location,
  toList,
  val,
} from '../../templates/templateUtils'

/**
 * Section page components for the multi-page ProfileSite. Each receives the
 * full profile `data` object plus theme helpers and renders one "page" of the
 * personal biodata website.
 */

// Shared building blocks ------------------------------------------------------

export function SectionShell({ eyebrow, title, subtitle, children, t }) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
      <div className="mb-8">
        {eyebrow && (
          <p
            className="text-xs font-semibold uppercase tracking-[0.25em]"
            style={{ color: t.accent }}
          >
            {eyebrow}
          </p>
        )}
        <h2 className={`mt-2 font-serif text-3xl font-bold sm:text-4xl ${t.text}`}>
          {title}
        </h2>
        {subtitle && <p className={`mt-2 ${t.muted}`}>{subtitle}</p>}
      </div>
      {children}
    </div>
  )
}

function DetailGrid({ rows, t }) {
  return (
    <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl sm:grid-cols-2">
      {rows.map((r) => (
        <div key={r.label} className={`p-5 ${t.card}`}>
          <p className={`text-xs uppercase tracking-wide ${t.muted}`}>
            {r.label}
          </p>
          <p className={`mt-1 text-lg font-medium ${t.text}`}>{r.value}</p>
        </div>
      ))}
    </div>
  )
}

function Chips({ items, t }) {
  if (!items.length) return null
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((tag, i) => (
        <span
          key={i}
          className={`rounded-full border px-3 py-1.5 text-sm ${t.chip}`}
        >
          {tag}
        </span>
      ))}
    </div>
  )
}

// Pages -----------------------------------------------------------------------

export function HomeSection({ data, t, onContact, onDownload }) {
  const { basicInfo = {}, aboutMe = {}, education = {}, photos = {} } = data
  const age = ageFromDob(basicInfo.dateOfBirth)
  const headline = val(aboutMe.headline || education.occupation, 'Marriage Biodata')

  const chips = [
    education.education,
    [basicInfo.religion, basicInfo.caste].filter(Boolean).join(', '),
    basicInfo.diet,
  ].filter(Boolean)

  const facts = [
    { label: 'Age', value: age ? `${age} Years` : '—' },
    { label: 'Height', value: val(basicInfo.height) },
    { label: 'Diet', value: val(basicInfo.diet) },
    { label: 'Mother Tongue', value: val(basicInfo.motherTongue) },
    { label: 'Location', value: val(basicInfo.city || basicInfo.state) },
  ]

  return (
    <div className="mx-auto max-w-6xl px-4 pb-28 pt-10 sm:pt-16">
      <div className="grid items-center gap-10 lg:grid-cols-[320px_1fr]">
        {/* Photo */}
        <div className="flex justify-center lg:justify-start">
          {photos.profilePhoto ? (
            <img
              src={photos.profilePhoto}
              alt={fullName(basicInfo)}
              className="h-64 w-64 rounded-full object-cover shadow-2xl sm:h-72 sm:w-72"
              style={{ boxShadow: `0 0 0 6px ${t.accent}22` }}
            />
          ) : (
            <div
              className={`flex h-64 w-64 items-center justify-center rounded-full text-7xl font-serif sm:h-72 sm:w-72 ${t.card}`}
            >
              {(basicInfo.firstName?.[0] || '?').toUpperCase()}
            </div>
          )}
        </div>

        {/* Intro */}
        <div>
          <p
            className="text-sm font-medium tracking-wide"
            style={{ color: t.accent }}
          >
            Namaste 🙏 · Marriage Biodata
          </p>
          <h1
            className={`mt-3 font-serif text-5xl font-bold leading-tight sm:text-6xl ${t.text}`}
          >
            {fullName(basicInfo)}
          </h1>
          <p
            className="mt-3 font-serif text-xl italic"
            style={{ color: t.accent }}
          >
            {headline}
          </p>

          {aboutMe.bio && (
            <p className={`mt-6 max-w-2xl text-lg leading-relaxed ${t.muted}`}>
              &ldquo; {aboutMe.bio} &rdquo;
            </p>
          )}
          {aboutMe.tagline && (
            <p className={`mt-3 text-base italic ${t.muted}`}>
              — {aboutMe.tagline}
            </p>
          )}

          {chips.length > 0 && (
            <div className="mt-6">
              <Chips t={t} items={chips} />
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onContact}
              className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:opacity-90"
              style={{ backgroundColor: t.accent }}
            >
              ❤ Contact Me
            </button>
            <button
              type="button"
              onClick={onDownload}
              className={`inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold transition ${t.chip}`}
            >
              ⬇ Download PDF
            </button>
          </div>
        </div>
      </div>

      {/* Quick facts bar */}
      <div
        className={`mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl sm:grid-cols-3 lg:grid-cols-5 ${t.factWrap}`}
      >
        {facts.map((f) => (
          <div key={f.label} className={`px-4 py-5 text-center ${t.card}`}>
            <p className={`text-xs uppercase tracking-wide ${t.muted}`}>
              {f.label}
            </p>
            <p className={`mt-1 text-lg font-semibold ${t.text}`}>{f.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export function AboutSection({ data, t }) {
  const { basicInfo = {}, aboutMe = {} } = data
  return (
    <SectionShell
      t={t}
      eyebrow="Get to know me"
      title="About Me"
      subtitle={aboutMe.tagline}
    >
      {aboutMe.bio && (
        <p className={`mb-8 max-w-3xl text-lg leading-relaxed ${t.muted}`}>
          {aboutMe.bio}
        </p>
      )}

      <DetailGrid
        t={t}
        rows={[
          { label: 'Full Name', value: fullName(basicInfo) },
          { label: 'Gender', value: val(basicInfo.gender) },
          { label: 'Date of Birth', value: formatDate(basicInfo.dateOfBirth) },
          { label: 'Religion', value: val(basicInfo.religion) },
          { label: 'Caste', value: val(basicInfo.caste) },
          { label: 'Mother Tongue', value: val(basicInfo.motherTongue) },
        ]}
      />

      {(aboutMe.hobbies || aboutMe.interests || aboutMe.lifestyle) && (
        <div className="mt-8 space-y-4">
          {aboutMe.hobbies && (
            <div>
              <p className={`mb-2 text-sm font-semibold ${t.text}`}>Hobbies</p>
              <Chips t={t} items={toList(aboutMe.hobbies)} />
            </div>
          )}
          {aboutMe.interests && (
            <div>
              <p className={`mb-2 text-sm font-semibold ${t.text}`}>Interests</p>
              <Chips t={t} items={toList(aboutMe.interests)} />
            </div>
          )}
          {aboutMe.lifestyle && (
            <div>
              <p className={`mb-2 text-sm font-semibold ${t.text}`}>Lifestyle</p>
              <Chips t={t} items={toList(aboutMe.lifestyle)} />
            </div>
          )}
        </div>
      )}
    </SectionShell>
  )
}

export function CareerSection({ data, t }) {
  return (
    <SectionShell
      t={t}
      eyebrow="Education & work"
      title="Career"
      subtitle="Academic background and professional journey."
    >
      <DetailGrid t={t} rows={detailRows.education(data.education)} />
    </SectionShell>
  )
}

export function FamilySection({ data, t }) {
  return (
    <SectionShell
      t={t}
      eyebrow="My roots"
      title="Family"
      subtitle="A little about my family."
    >
      <DetailGrid t={t} rows={detailRows.family(data.family)} />
    </SectionShell>
  )
}

export function GallerySection({ data, t }) {
  const gallery = toList(data.photos?.gallery)
  return (
    <SectionShell
      t={t}
      eyebrow="Moments"
      title="Gallery"
      subtitle={gallery.length ? undefined : 'No photos added yet.'}
    >
      {gallery.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {gallery.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Gallery ${i + 1}`}
              className="aspect-square w-full rounded-2xl object-cover"
            />
          ))}
        </div>
      )}
    </SectionShell>
  )
}

export function PartnerSection({ data, t }) {
  return (
    <SectionShell
      t={t}
      eyebrow="What I'm looking for"
      title="Partner Preferences"
    >
      <DetailGrid t={t} rows={detailRows.partner(data.partner)} />
    </SectionShell>
  )
}

export function ContactSection({ data, t }) {
  const { contact = {}, basicInfo = {} } = data
  const items = [
    contact.phone && { label: 'Phone', value: contact.phone, href: `tel:${contact.phone}` },
    contact.email && {
      label: 'Email',
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    contact.whatsapp && {
      label: 'WhatsApp',
      value: contact.whatsapp,
      href: `https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`,
    },
  ].filter(Boolean)

  return (
    <SectionShell
      t={t}
      eyebrow="Reach out"
      title="Contact"
      subtitle={`Interested families can connect with ${basicInfo.firstName || 'me'} directly.`}
    >
      {items.length ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {items.map((it) => (
            <a
              key={it.label}
              href={it.href}
              target="_blank"
              rel="noreferrer"
              className={`block rounded-2xl p-6 transition hover:-translate-y-0.5 ${t.card}`}
            >
              <p className={`text-xs uppercase tracking-wide ${t.muted}`}>
                {it.label}
              </p>
              <p className={`mt-1 break-words text-lg font-medium ${t.text}`}>
                {it.value}
              </p>
            </a>
          ))}
        </div>
      ) : (
        <p className={t.muted}>No contact details provided.</p>
      )}

      <p className={`mt-8 text-sm ${t.muted}`}>
        Location: {location(basicInfo)}
        {ageFromDob(basicInfo.dateOfBirth)
          ? ` · ${ageFromDob(basicInfo.dateOfBirth)} years`
          : ''}
      </p>
    </SectionShell>
  )
}
