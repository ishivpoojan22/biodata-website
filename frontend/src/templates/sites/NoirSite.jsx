import { useState } from 'react'
import {
  ageFromDob,
  detailRows,
  fullName,
  location,
  toList,
  val,
} from '../templateUtils'

const ACCENT = '#a78bfa' // violet
const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'career', label: 'Career' },
  { id: 'family', label: 'Family' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact' },
]

/**
 * MIDNIGHT LUXE — premium dark architecture. A sticky top bar holds the name
 * and inline nav; sections render as glowing glass panels over a deep slate
 * gradient with violet accents. Elegant serif headings, generous spacing.
 */
export default function NoirSite({ data = {}, embedded = false }) {
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
      className={`relative bg-slate-950 text-slate-100 ${
        embedded ? 'min-h-full' : 'min-h-screen'
      }`}
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-0 h-80 w-80 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute -right-20 top-40 h-96 w-96 rounded-full bg-fuchsia-600/10 blur-3xl" />
      </div>

      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/70 backdrop-blur no-print">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <button
            onClick={() => go('home')}
            className="font-serif text-lg font-semibold tracking-wide"
          >
            {fullName(basicInfo)}
          </button>
          <div className="hidden items-center gap-5 md:flex">
            {NAV.filter((n) => n.id !== 'home').map((n) => (
              <button
                key={n.id}
                onClick={() => go(n.id)}
                className="text-sm font-medium text-slate-300 transition hover:text-white"
                style={active === n.id ? { color: ACCENT } : undefined}
              >
                {n.label}
              </button>
            ))}
          </div>
        </nav>
      </header>

      <main className="relative mx-auto max-w-5xl px-4 py-10">
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

      {/* Floating bottom nav (mobile-friendly) */}
      <div
        className={`${embedded ? 'sticky' : 'fixed'} inset-x-0 bottom-4 z-30 flex justify-center px-4 no-print`}
      >
        <div className="flex flex-wrap justify-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 shadow-xl backdrop-blur">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => go(n.id)}
              className="rounded-full px-3 py-1.5 text-xs font-medium transition sm:px-4 sm:text-sm"
              style={
                active === n.id
                  ? { backgroundColor: ACCENT, color: '#0f172a' }
                  : { color: '#cbd5e1' }
              }
            >
              {n.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------

function Panel({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:border-violet-400/40">
      <p className="text-xs uppercase tracking-wide text-violet-300/80">
        {label}
      </p>
      <p className="mt-1 text-lg font-semibold text-white">{value}</p>
    </div>
  )
}

function Grid({ rows }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {rows.map((r) => (
        <Panel key={r.label} label={r.label} value={r.value} />
      ))}
    </div>
  )
}

function SectionTitle({ eyebrow, title }) {
  return (
    <div className="mb-8">
      <p
        className="text-xs font-semibold uppercase tracking-[0.3em]"
        style={{ color: ACCENT }}
      >
        {eyebrow}
      </p>
      <h2 className="mt-2 font-serif text-4xl font-bold text-white">{title}</h2>
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
      <section>
        <SectionTitle eyebrow="Get to know me" title="About" />
        {aboutMe.bio && (
          <p className="mb-6 max-w-3xl text-lg leading-relaxed text-slate-300">
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
          <div className="mt-6 flex flex-wrap gap-2">
            {[...toList(aboutMe.hobbies), ...toList(aboutMe.interests)].map(
              (tag, i) => (
                <span
                  key={i}
                  className="rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1.5 text-sm font-medium text-violet-200"
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
      <section>
        <SectionTitle eyebrow="Education & work" title="Career" />
        <Grid rows={detailRows.education(education)} />
      </section>
    )
  }

  if (active === 'family') {
    return (
      <section>
        <SectionTitle eyebrow="My roots" title="Family" />
        <Grid rows={detailRows.family(family)} />
      </section>
    )
  }

  if (active === 'gallery') {
    const gallery = toList(photos.gallery)
    return (
      <section>
        <SectionTitle eyebrow="Moments" title="Gallery" />
        {gallery.length ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {gallery.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Gallery ${i + 1}`}
                className="aspect-square w-full rounded-2xl object-cover ring-1 ring-white/10"
              />
            ))}
          </div>
        ) : (
          <p className="text-slate-400">No photos added yet.</p>
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
      <section>
        <SectionTitle eyebrow="What I'm looking for" title="Partner & Contact" />
        <Grid rows={detailRows.partner(partner)} />
        {items.length > 0 && (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {items.map((it) => (
              <a
                key={it.label}
                href={it.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:-translate-y-0.5 hover:border-violet-400/40"
              >
                <p className="text-xs uppercase tracking-wide text-violet-300/80">
                  {it.label}
                </p>
                <p className="mt-1 break-words font-semibold text-white">
                  {it.value}
                </p>
              </a>
            ))}
          </div>
        )}
      </section>
    )
  }

  // Home / hero
  const facts = [
    { label: 'Age', value: age ? `${age} yrs` : '—' },
    { label: 'Height', value: val(basicInfo.height) },
    { label: 'Diet', value: val(basicInfo.diet) },
    { label: 'Location', value: location(basicInfo) },
  ]
  return (
    <section>
      <div className="flex flex-col items-center gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-violet-600/20 to-fuchsia-600/10 p-8 text-center backdrop-blur sm:p-12">
        {photos.profilePhoto ? (
          <img
            src={photos.profilePhoto}
            alt={fullName(basicInfo)}
            className="h-32 w-32 rounded-full object-cover shadow-2xl ring-2 ring-violet-400/40"
          />
        ) : (
          <div className="flex h-32 w-32 items-center justify-center rounded-full bg-violet-500/20 text-4xl font-bold text-violet-200 ring-2 ring-violet-400/30">
            {(basicInfo.firstName?.[0] || '?').toUpperCase()}
          </div>
        )}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-300">
            Marriage Biodata
          </p>
          <h1 className="mt-2 font-serif text-5xl font-bold text-white">
            {fullName(basicInfo)}
          </h1>
          {(aboutMe.headline || education.occupation) && (
            <p className="mt-2 text-lg text-slate-300">
              {val(aboutMe.headline || education.occupation, '')}
            </p>
          )}
          {aboutMe.tagline && (
            <p className="mt-3 italic text-violet-200/90">“{aboutMe.tagline}”</p>
          )}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {facts.map((f) => (
          <Panel key={f.label} label={f.label} value={f.value} />
        ))}
      </div>

      {aboutMe.bio && (
        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-slate-300">
          {aboutMe.bio}
        </p>
      )}

      <div className="mt-8 flex flex-wrap gap-3 no-print">
        <button
          onClick={onContact}
          className="rounded-xl px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg"
          style={{ backgroundColor: ACCENT }}
        >
          Get in touch
        </button>
        <button
          onClick={() => window.print()}
          className="rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur"
        >
          Download PDF
        </button>
      </div>
    </section>
  )
}
