import { useState } from 'react'
import {
  ageFromDob,
  detailRows,
  formatDate,
  fullName,
  location,
  toList,
  val,
} from '../templateUtils'

const ACCENT = '#047857' // emerald
const INK = '#1c1917'
const PAPER = '#faf7f0'

const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'career', label: 'Career' },
  { id: 'family', label: 'Family' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact' },
]

/**
 * ELEGANT — cream editorial / magazine architecture. A centered minimal top
 * nav with numbered links, large serif headings, thin divider rules and big
 * section numerals. Single column, generous whitespace, emerald accent.
 */
export default function ElegantSite({ data = {}, embedded = false }) {
  const [active, setActive] = useState('home')
  const { basicInfo = {} } = data

  const go = (id) => {
    setActive(id)
    if (!embedded) window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const activeIndex = NAV.findIndex((n) => n.id === active)

  return (
    <div
      className={embedded ? 'min-h-full' : 'min-h-screen'}
      style={{ backgroundColor: PAPER, color: INK, fontFamily: 'Inter, sans-serif' }}
    >
      {/* Top nav */}
      <header
        className="sticky top-0 z-30 border-b no-print"
        style={{ backgroundColor: `${PAPER}f2`, borderColor: '#e7e1d5' }}
      >
        <nav className="mx-auto flex max-w-4xl flex-col items-center gap-2 px-4 py-4 sm:flex-row sm:justify-between">
          <button
            onClick={() => go('home')}
            className="font-serif text-base font-semibold tracking-wide"
          >
            {fullName(basicInfo)}
          </button>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
            {NAV.filter((n) => n.id !== 'home').map((n, i) => {
              const on = active === n.id
              return (
                <button
                  key={n.id}
                  onClick={() => go(n.id)}
                  className="text-sm transition"
                  style={{ color: on ? ACCENT : '#6b6557' }}
                >
                  <span className="mr-1 text-xs tabular-nums opacity-60">
                    0{i + 1}
                  </span>
                  {n.label}
                </button>
              )
            })}
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-4xl px-5 py-12 sm:py-16">
        <Content active={active} activeIndex={activeIndex} data={data} />
      </main>

      {/* Footer rule */}
      <footer
        className="mx-auto max-w-4xl border-t px-5 py-8 text-center text-xs uppercase tracking-[0.3em] no-print"
        style={{ borderColor: '#e7e1d5', color: '#9a927f' }}
      >
        {fullName(basicInfo)} · Marriage Biodata
      </footer>
    </div>
  )
}

// ---------------------------------------------------------------------------

function SectionTitle({ index, eyebrow, title }) {
  return (
    <div className="mb-10 flex items-end gap-5 border-b pb-6" style={{ borderColor: '#e7e1d5' }}>
      <span
        className="font-serif text-6xl font-bold leading-none opacity-20"
        style={{ color: ACCENT }}
      >
        {index != null ? `0${index}` : '✦'}
      </span>
      <div>
        {eyebrow && (
          <p
            className="text-xs uppercase tracking-[0.3em]"
            style={{ color: ACCENT }}
          >
            {eyebrow}
          </p>
        )}
        <h2 className="mt-1 font-serif text-4xl font-bold">{title}</h2>
      </div>
    </div>
  )
}

function DefRows({ rows }) {
  return (
    <dl className="divide-y" style={{ borderColor: '#e7e1d5' }}>
      {rows.map((r) => (
        <div
          key={r.label}
          className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-8"
        >
          <dt
            className="w-48 shrink-0 text-xs uppercase tracking-[0.2em]"
            style={{ color: '#9a927f' }}
          >
            {r.label}
          </dt>
          <dd className="font-serif text-lg">{r.value}</dd>
        </div>
      ))}
    </dl>
  )
}

function Content({ active, activeIndex, data }) {
  const {
    basicInfo = {},
    education = {},
    family = {},
    aboutMe = {},
    partner = {},
    contact = {},
    photos = {},
  } = data

  if (active === 'about') {
    return (
      <section>
        <SectionTitle index={activeIndex} eyebrow="Get to know me" title="About" />
        {aboutMe.bio && (
          <p className="mb-8 max-w-2xl font-serif text-xl leading-relaxed">
            {aboutMe.bio}
          </p>
        )}
        <DefRows
          rows={[
            { label: 'Gender', value: val(basicInfo.gender) },
            { label: 'Date of Birth', value: formatDate(basicInfo.dateOfBirth) },
            { label: 'Religion', value: val(basicInfo.religion) },
            { label: 'Caste', value: val(basicInfo.caste) },
            { label: 'Mother Tongue', value: val(basicInfo.motherTongue) },
            { label: 'Hobbies', value: val(aboutMe.hobbies) },
            { label: 'Interests', value: val(aboutMe.interests) },
            { label: 'Lifestyle', value: val(aboutMe.lifestyle) },
          ]}
        />
      </section>
    )
  }

  if (active === 'career') {
    return (
      <section>
        <SectionTitle index={activeIndex} eyebrow="Education & work" title="Career" />
        <DefRows rows={detailRows.education(education)} />
      </section>
    )
  }

  if (active === 'family') {
    return (
      <section>
        <SectionTitle index={activeIndex} eyebrow="My roots" title="Family" />
        <DefRows rows={detailRows.family(family)} />
      </section>
    )
  }

  if (active === 'gallery') {
    const gallery = toList(photos.gallery)
    return (
      <section>
        <SectionTitle index={activeIndex} eyebrow="Moments" title="Gallery" />
        {gallery.length ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {gallery.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Gallery ${i + 1}`}
                className="w-full object-cover"
                style={{ border: '6px solid #fff', boxShadow: '0 1px 12px rgba(0,0,0,0.08)' }}
              />
            ))}
          </div>
        ) : (
          <p style={{ color: '#9a927f' }}>No photos added yet.</p>
        )}
      </section>
    )
  }

  if (active === 'contact') {
    const items = [
      contact.phone && { label: 'Phone', value: contact.phone, href: `tel:${contact.phone}` },
      contact.email && { label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
      contact.whatsapp && {
        label: 'WhatsApp',
        value: contact.whatsapp,
        href: `https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`,
      },
    ].filter(Boolean)
    return (
      <section>
        <SectionTitle index={activeIndex} eyebrow="What I'm looking for" title="Partner & Contact" />
        <DefRows rows={detailRows.partner(partner)} />
        {items.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-6">
            {items.map((it) => (
              <a
                key={it.label}
                href={it.href}
                target="_blank"
                rel="noreferrer"
                className="font-serif text-lg underline-offset-4 hover:underline"
                style={{ color: ACCENT }}
              >
                {it.label}: {it.value}
              </a>
            ))}
          </div>
        )}
      </section>
    )
  }

  // Home — editorial cover
  const age = ageFromDob(basicInfo.dateOfBirth)
  return (
    <section className="text-center">
      <p className="text-xs uppercase tracking-[0.4em]" style={{ color: ACCENT }}>
        Marriage Biodata
      </p>
      <div className="mx-auto my-8 w-fit" style={{ padding: 8, backgroundColor: '#fff', boxShadow: '0 2px 20px rgba(0,0,0,0.08)' }}>
        {photos.profilePhoto ? (
          <img
            src={photos.profilePhoto}
            alt={fullName(basicInfo)}
            className="h-56 w-56 object-cover sm:h-64 sm:w-64"
          />
        ) : (
          <div className="flex h-56 w-56 items-center justify-center bg-stone-100 font-serif text-6xl text-stone-300 sm:h-64 sm:w-64">
            {(basicInfo.firstName?.[0] || '?').toUpperCase()}
          </div>
        )}
      </div>
      <h1 className="font-serif text-5xl font-bold leading-tight sm:text-7xl">
        {fullName(basicInfo)}
      </h1>
      <p className="mt-4 font-serif text-2xl italic" style={{ color: ACCENT }}>
        {val(aboutMe.headline || education.occupation, '')}
      </p>

      <div
        className="mx-auto my-10 h-px w-24"
        style={{ backgroundColor: ACCENT }}
      />

      {aboutMe.bio && (
        <p className="mx-auto max-w-2xl font-serif text-xl leading-relaxed">
          &ldquo;{aboutMe.bio}&rdquo;
        </p>
      )}
      {aboutMe.tagline && (
        <p className="mt-4 text-base italic" style={{ color: '#6b6557' }}>
          — {aboutMe.tagline}
        </p>
      )}

      <div className="mx-auto mt-12 grid max-w-2xl grid-cols-2 gap-y-8 sm:grid-cols-4">
        {[
          { label: 'Age', value: age ? `${age}` : '—' },
          { label: 'Height', value: val(basicInfo.height) },
          { label: 'Diet', value: val(basicInfo.diet) },
          { label: 'City', value: val(basicInfo.city) },
        ].map((f) => (
          <div key={f.label}>
            <p className="text-xs uppercase tracking-[0.25em]" style={{ color: '#9a927f' }}>
              {f.label}
            </p>
            <p className="mt-1 font-serif text-xl font-semibold">{f.value}</p>
          </div>
        ))}
      </div>

      <p className="mt-10 text-sm" style={{ color: '#9a927f' }}>
        {location(basicInfo)}
      </p>
    </section>
  )
}
