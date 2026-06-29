import { useState } from 'react'
import {
  ageFromDob,
  detailRows,
  fullName,
  location,
  toList,
  val,
} from '../templateUtils'

const ACCENT = '#b91c1c' // crimson
const GOLD = '#c79a3a' // antique gold

const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'career', label: 'Career' },
  { id: 'family', label: 'Family' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact' },
]

/**
 * SHUBH VIVAH — a festive Indian-wedding themed site. A marigold→crimson→
 * magenta gradient hero framed in antique gold, ornamental flourishes around
 * every section heading, and warm ivory cards with gold borders. Distinct
 * architecture: gradient banner + centered ornamental nav + single column.
 */
export default function FestiveSite({ data = {}, embedded = false }) {
  const [active, setActive] = useState('home')
  const {
    basicInfo = {},
    education = {},
    family = {},
    aboutMe = {},
    partner = {},
    contact = {},
    photos = {},
  } = data

  const go = (id) => {
    setActive(id)
    if (!embedded) window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const age = ageFromDob(basicInfo.dateOfBirth)

  return (
    <div
      className={embedded ? 'min-h-full' : 'min-h-screen'}
      style={{
        background:
          'linear-gradient(180deg, #fff8ee 0%, #fdf2e3 100%)',
        color: '#3b2412',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Festive gradient hero */}
      <header className="relative overflow-hidden">
        {/* gold top rule */}
        <div
          className="h-2 w-full"
          style={{
            background:
              'repeating-linear-gradient(90deg,#c79a3a 0 14px,#8a6d1f 14px 28px)',
          }}
        />
        <div
          className="relative px-4 pb-16 pt-14 text-center text-white"
          style={{
            background:
              'linear-gradient(135deg,#f59e0b 0%,#dc2626 45%,#be185d 100%)',
          }}
        >
          {/* decorative corner mandalas */}
          <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full border-[6px] border-white/15" />
          <div className="pointer-events-none absolute -right-12 top-4 h-48 w-48 rounded-full border-[6px] border-white/10" />

          <p className="font-serif text-sm tracking-[0.3em] text-amber-100">
            ॥ शुभ विवाह ॥
          </p>

          {/* photo in gold frame */}
          <div className="mx-auto mt-6 w-fit rounded-full p-1.5" style={{ background: GOLD }}>
            {photos.profilePhoto ? (
              <img
                src={photos.profilePhoto}
                alt={fullName(basicInfo)}
                className="h-32 w-32 rounded-full object-cover ring-4 ring-white/70"
              />
            ) : (
              <div className="flex h-32 w-32 items-center justify-center rounded-full bg-white/20 font-serif text-5xl font-bold ring-4 ring-white/70">
                {(basicInfo.firstName?.[0] || '?').toUpperCase()}
              </div>
            )}
          </div>

          <h1 className="mt-5 font-serif text-4xl font-bold drop-shadow sm:text-5xl">
            {fullName(basicInfo)}
          </h1>

          {/* ornamental divider */}
          <Flourish className="my-3 text-amber-100" />

          {(aboutMe.headline || education.occupation) && (
            <p className="text-lg text-amber-50">
              {val(aboutMe.headline || education.occupation, '')}
            </p>
          )}
          {aboutMe.tagline && (
            <p className="mt-2 font-serif text-base italic text-amber-100/90">
              “{aboutMe.tagline}”
            </p>
          )}
        </div>
        {/* gold bottom rule */}
        <div
          className="h-2 w-full"
          style={{
            background:
              'repeating-linear-gradient(90deg,#c79a3a 0 14px,#8a6d1f 14px 28px)',
          }}
        />
      </header>

      {/* Ornamental nav */}
      <div className="px-4 no-print">
        <div className="mx-auto -mt-0 flex max-w-3xl flex-wrap justify-center gap-1 py-4">
          {NAV.map((n) => {
            const on = active === n.id
            return (
              <button
                key={n.id}
                onClick={() => go(n.id)}
                className="rounded-full px-4 py-2 text-sm font-semibold transition"
                style={
                  on
                    ? { backgroundColor: ACCENT, color: '#fff' }
                    : { color: '#7c2d12' }
                }
              >
                {n.label}
              </button>
            )
          })}
        </div>
      </div>

      <main className="mx-auto max-w-3xl px-4 pb-16">
        <Content
          active={active}
          basicInfo={basicInfo}
          education={education}
          family={family}
          aboutMe={aboutMe}
          partner={partner}
          contact={contact}
          photos={photos}
          age={age}
          onContact={() => go('contact')}
        />
      </main>
    </div>
  )
}

// ---------------------------------------------------------------------------

function Flourish({ className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="h-px w-12" style={{ background: 'currentColor', opacity: 0.5 }} />
      <span className="text-lg">❁</span>
      <span className="h-px w-12" style={{ background: 'currentColor', opacity: 0.5 }} />
    </div>
  )
}

function GoldCard({ label, value }) {
  return (
    <div
      className="rounded-xl bg-white p-5 shadow-sm"
      style={{ border: `1px solid ${GOLD}55` }}
    >
      <p className="text-xs uppercase tracking-wide" style={{ color: GOLD }}>
        {label}
      </p>
      <p className="mt-1 text-lg font-semibold" style={{ color: '#3b2412' }}>
        {value}
      </p>
    </div>
  )
}

function Grid({ rows }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {rows.map((r) => (
        <GoldCard key={r.label} label={r.label} value={r.value} />
      ))}
    </div>
  )
}

function SectionTitle({ title }) {
  return (
    <div className="mb-8 text-center" style={{ color: ACCENT }}>
      <h2 className="font-serif text-3xl font-bold">{title}</h2>
      <Flourish className="mt-3" />
    </div>
  )
}

function Content({
  active,
  basicInfo,
  education,
  family,
  aboutMe,
  partner,
  contact,
  photos,
  age,
  onContact,
}) {
  if (active === 'about') {
    return (
      <section className="pt-4">
        <SectionTitle title="About Me" />
        {aboutMe.bio && (
          <p className="mx-auto mb-6 max-w-2xl text-center text-lg leading-relaxed text-amber-900/80">
            {aboutMe.bio}
          </p>
        )}
        <Grid
          rows={[
            { label: 'Gender', value: val(basicInfo.gender) },
            { label: 'Religion', value: val(basicInfo.religion) },
            { label: 'Caste', value: val(basicInfo.caste) },
            { label: 'Mother Tongue', value: val(basicInfo.motherTongue) },
          ]}
        />
        {(aboutMe.hobbies || aboutMe.interests) && (
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {[...toList(aboutMe.hobbies), ...toList(aboutMe.interests)].map(
              (tag, i) => (
                <span
                  key={i}
                  className="rounded-full px-3 py-1.5 text-sm font-medium"
                  style={{ backgroundColor: '#fde68a', color: '#92400e' }}
                >
                  {tag}
                </span>
              ),
            )}
          </div>
        )}
      </section>
    )
  }

  if (active === 'career') {
    return (
      <section className="pt-4">
        <SectionTitle title="Career" />
        <Grid rows={detailRows.education(education)} />
      </section>
    )
  }

  if (active === 'family') {
    return (
      <section className="pt-4">
        <SectionTitle title="Family" />
        <Grid rows={detailRows.family(family)} />
      </section>
    )
  }

  if (active === 'gallery') {
    const gallery = toList(photos.gallery)
    return (
      <section className="pt-4">
        <SectionTitle title="Gallery" />
        {gallery.length ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {gallery.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Gallery ${i + 1}`}
                className="aspect-square w-full rounded-xl object-cover"
                style={{ border: `3px solid ${GOLD}` }}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-amber-900/60">No photos added yet.</p>
        )}
      </section>
    )
  }

  if (active === 'contact') {
    const items = [
      contact.phone && {
        label: 'Phone',
        value: contact.phone,
        href: `tel:${contact.phone}`,
      },
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
      <section className="pt-4">
        <SectionTitle title="Partner & Contact" />
        <Grid rows={detailRows.partner(partner)} />
        {items.length > 0 && (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {items.map((it) => (
              <a
                key={it.label}
                href={it.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-white p-5 text-center shadow-sm transition hover:-translate-y-0.5"
                style={{ border: `1px solid ${GOLD}55` }}
              >
                <p className="text-xs uppercase tracking-wide" style={{ color: GOLD }}>
                  {it.label}
                </p>
                <p className="mt-1 break-words font-semibold" style={{ color: '#3b2412' }}>
                  {it.value}
                </p>
              </a>
            ))}
          </div>
        )}
      </section>
    )
  }

  // Home / overview
  const facts = [
    { label: 'Age', value: age ? `${age} yrs` : '—' },
    { label: 'Height', value: val(basicInfo.height) },
    { label: 'Diet', value: val(basicInfo.diet) },
    { label: 'Location', value: location(basicInfo) },
  ]
  return (
    <section className="pt-4">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {facts.map((f) => (
          <GoldCard key={f.label} label={f.label} value={f.value} />
        ))}
      </div>

      {aboutMe.bio && (
        <p className="mx-auto mt-8 max-w-2xl text-center text-lg leading-relaxed text-amber-900/80">
          {aboutMe.bio}
        </p>
      )}

      <Flourish className="my-8" />

      <div className="flex justify-center gap-3 no-print">
        <button
          onClick={onContact}
          className="rounded-full px-6 py-3 text-sm font-semibold text-white shadow-md"
          style={{ backgroundColor: ACCENT }}
        >
          ❤ Get in touch
        </button>
        <button
          onClick={() => window.print()}
          className="rounded-full bg-white px-6 py-3 text-sm font-semibold shadow-sm"
          style={{ border: `1px solid ${GOLD}`, color: '#92400e' }}
        >
          ⬇ Download PDF
        </button>
      </div>
    </section>
  )
}
