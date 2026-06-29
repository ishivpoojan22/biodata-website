import { useState } from 'react'
import {
  ageFromDob,
  detailRows,
  fullName,
  location,
  toList,
  val,
} from '../templateUtils'

const ACCENT = '#0ea5e9' // sky blue
const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'career', label: 'Career' },
  { id: 'family', label: 'Family' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact' },
]

/**
 * AZURE WAVE — bright, airy single-flow architecture. A full-width gradient
 * hero sits on top with a translucent glass card; horizontal pill tabs switch
 * the section shown beneath. Cool sky/cyan palette, glassmorphism accents.
 */
export default function AzureSite({ data = {}, embedded = false }) {
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
      className={`bg-gradient-to-b from-sky-50 to-cyan-50 text-slate-800 ${
        embedded ? 'min-h-full' : 'min-h-screen'
      }`}
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {/* Hero */}
      <header className="relative overflow-hidden bg-gradient-to-br from-sky-500 via-cyan-500 to-blue-600 px-4 pb-28 pt-16 text-white">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          {photos.profilePhoto ? (
            <img
              src={photos.profilePhoto}
              alt={fullName(basicInfo)}
              className="h-28 w-28 rounded-full object-cover shadow-xl ring-4 ring-white/40"
            />
          ) : (
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white/20 text-4xl font-bold ring-4 ring-white/30">
              {(basicInfo.firstName?.[0] || '?').toUpperCase()}
            </div>
          )}
          <p className="mt-5 text-sm font-medium uppercase tracking-[0.25em] text-sky-100">
            Marriage Biodata
          </p>
          <h1 className="mt-2 text-4xl font-bold sm:text-5xl">
            {fullName(basicInfo)}
          </h1>
          {(aboutMe.headline || education.occupation) && (
            <p className="mt-2 text-lg text-sky-50">
              {val(aboutMe.headline || education.occupation, '')}
            </p>
          )}
          {aboutMe.tagline && (
            <p className="mt-3 max-w-xl italic text-sky-100/90">
              “{aboutMe.tagline}”
            </p>
          )}
        </div>
      </header>

      {/* Floating tab bar */}
      <div className="-mt-16 px-4 no-print">
        <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-1 rounded-2xl border border-white/60 bg-white/80 p-1.5 shadow-lg backdrop-blur">
          {NAV.map((n) => {
            const on = active === n.id
            return (
              <button
                key={n.id}
                onClick={() => go(n.id)}
                className="rounded-xl px-4 py-2 text-sm font-medium transition"
                style={
                  on
                    ? { backgroundColor: ACCENT, color: '#fff' }
                    : { color: '#0369a1' }
                }
              >
                {n.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Content */}
      <main className="mx-auto max-w-4xl px-4 py-10">
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

function GlassCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-sky-100 bg-white/70 p-5 shadow-sm backdrop-blur">
      <p className="text-xs uppercase tracking-wide text-sky-500">{label}</p>
      <p className="mt-1 text-lg font-semibold text-slate-800">{value}</p>
    </div>
  )
}

function Grid({ rows }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {rows.map((r) => (
        <GlassCard key={r.label} label={r.label} value={r.value} />
      ))}
    </div>
  )
}

function SectionTitle({ eyebrow, title }) {
  return (
    <div className="mb-6 text-center">
      <p
        className="text-xs font-semibold uppercase tracking-[0.25em]"
        style={{ color: ACCENT }}
      >
        {eyebrow}
      </p>
      <h2 className="mt-1 text-3xl font-bold text-slate-900">{title}</h2>
      <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-sky-400" />
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
        <SectionTitle eyebrow="Get to know me" title="About Me" />
        {aboutMe.bio && (
          <p className="mx-auto mb-6 max-w-2xl text-center text-lg leading-relaxed text-slate-600">
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
                  className="rounded-full bg-sky-100 px-3 py-1.5 text-sm font-medium text-sky-700"
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
                className="aspect-square w-full rounded-2xl object-cover shadow-sm"
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-500">No photos added yet.</p>
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
                className="rounded-2xl border border-sky-100 bg-white/70 p-5 text-center shadow-sm backdrop-blur transition hover:-translate-y-0.5"
              >
                <p className="text-xs uppercase tracking-wide text-sky-500">
                  {it.label}
                </p>
                <p className="mt-1 break-words font-semibold text-slate-800">
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
    <section>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {facts.map((f) => (
          <div
            key={f.label}
            className="rounded-2xl border border-sky-100 bg-white/70 p-5 text-center shadow-sm backdrop-blur"
          >
            <p className="text-xs uppercase tracking-wide text-sky-500">
              {f.label}
            </p>
            <p className="mt-1 text-lg font-bold text-slate-800">{f.value}</p>
          </div>
        ))}
      </div>

      {aboutMe.bio && (
        <p className="mx-auto mt-8 max-w-2xl text-center text-lg leading-relaxed text-slate-600">
          {aboutMe.bio}
        </p>
      )}

      <div className="mt-8 flex justify-center gap-3 no-print">
        <button
          onClick={onContact}
          className="rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-md"
          style={{ backgroundColor: ACCENT }}
        >
          Get in touch
        </button>
        <button
          onClick={() => window.print()}
          className="rounded-xl border border-sky-300 bg-white/70 px-6 py-3 text-sm font-semibold text-sky-700 backdrop-blur"
        >
          Download PDF
        </button>
      </div>
    </section>
  )
}
