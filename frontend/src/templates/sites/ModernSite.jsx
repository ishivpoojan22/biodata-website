import { useState } from 'react'
import {
  ageFromDob,
  detailRows,
  fullName,
  location,
  toList,
  val,
} from '../templateUtils'

const ACCENT = '#e11d6b' // rose
const NAV = [
  { id: 'home', label: 'Overview', icon: '◆' },
  { id: 'about', label: 'About', icon: '☺' },
  { id: 'career', label: 'Career', icon: '💼' },
  { id: 'family', label: 'Family', icon: '🏠' },
  { id: 'gallery', label: 'Gallery', icon: '🖼' },
  { id: 'contact', label: 'Contact', icon: '✉' },
]

/**
 * MODERN — light "app dashboard" architecture. A fixed left sidebar holds the
 * photo, name and vertical navigation; the main panel shows the active section
 * as soft rounded cards. Rose accent, clean sans typography.
 */
export default function ModernSite({ data = {}, embedded = false }) {
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

  return (
    <div
      className={`grid grid-cols-1 bg-rose-50/40 text-slate-800 md:grid-cols-[260px_1fr] ${
        embedded ? 'min-h-full' : 'min-h-screen'
      }`}
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {/* Sidebar */}
      <aside className="sticky top-0 flex h-auto flex-col border-r border-rose-100 bg-white md:h-screen no-print">
        <div className="flex flex-col items-center gap-3 px-6 py-8 text-center">
          {photos.profilePhoto ? (
            <img
              src={photos.profilePhoto}
              alt={fullName(basicInfo)}
              className="h-24 w-24 rounded-2xl object-cover shadow-md ring-2 ring-rose-200"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-rose-100 text-3xl font-bold text-rose-500">
              {(basicInfo.firstName?.[0] || '?').toUpperCase()}
            </div>
          )}
          <div>
            <h1 className="text-lg font-bold leading-tight">
              {fullName(basicInfo)}
            </h1>
            <p className="text-xs font-medium" style={{ color: ACCENT }}>
              {val(aboutMe.headline || education.occupation, 'Marriage Biodata')}
            </p>
          </div>
        </div>

        <nav className="flex flex-row flex-wrap justify-center gap-1 px-3 md:flex-col md:flex-nowrap">
          {NAV.map((n) => {
            const on = active === n.id
            return (
              <button
                key={n.id}
                onClick={() => go(n.id)}
                className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition"
                style={
                  on
                    ? { backgroundColor: ACCENT, color: '#fff' }
                    : { color: '#475569' }
                }
              >
                <span className="text-base">{n.icon}</span>
                <span>{n.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="mt-auto hidden flex-col gap-2 p-4 md:flex">
          {contact.whatsapp && (
            <a
              href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl px-4 py-2.5 text-center text-sm font-semibold text-white"
              style={{ backgroundColor: ACCENT }}
            >
              Contact on WhatsApp
            </a>
          )}
          <button
            onClick={() => window.print()}
            className="rounded-xl border border-rose-200 px-4 py-2.5 text-sm font-semibold text-rose-600"
          >
            Download PDF
          </button>
        </div>
      </aside>

      {/* Main panel */}
      <main className="px-5 py-8 sm:px-10">
        <MainContent
          active={active}
          basicInfo={basicInfo}
          education={education}
          family={family}
          aboutMe={aboutMe}
          partner={partner}
          contact={contact}
          photos={photos}
        />
      </main>
    </div>
  )
}

// ---------------------------------------------------------------------------

function CardGrid({ rows }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {rows.map((r) => (
        <div
          key={r.label}
          className="rounded-2xl border border-rose-100 bg-white p-5 shadow-sm"
        >
          <p className="text-xs uppercase tracking-wide text-slate-400">
            {r.label}
          </p>
          <p className="mt-1 text-lg font-semibold text-slate-800">{r.value}</p>
        </div>
      ))}
    </div>
  )
}

function Heading({ eyebrow, title }) {
  return (
    <div className="mb-6">
      <p
        className="text-xs font-semibold uppercase tracking-[0.2em]"
        style={{ color: ACCENT }}
      >
        {eyebrow}
      </p>
      <h2 className="mt-1 text-3xl font-bold text-slate-900">{title}</h2>
    </div>
  )
}

function MainContent({
  active,
  basicInfo,
  education,
  family,
  aboutMe,
  partner,
  contact,
  photos,
}) {
  if (active === 'about') {
    return (
      <section>
        <Heading eyebrow="Get to know me" title="About" />
        {aboutMe.bio && (
          <p className="mb-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {aboutMe.bio}
          </p>
        )}
        <CardGrid
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
                  className="rounded-full bg-rose-100 px-3 py-1.5 text-sm font-medium text-rose-700"
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
        <Heading eyebrow="Education & work" title="Career" />
        <CardGrid rows={detailRows.education(education)} />
      </section>
    )
  }

  if (active === 'family') {
    return (
      <section>
        <Heading eyebrow="My roots" title="Family" />
        <CardGrid rows={detailRows.family(family)} />
      </section>
    )
  }

  if (active === 'gallery') {
    const gallery = toList(photos.gallery)
    return (
      <section>
        <Heading eyebrow="Moments" title="Gallery" />
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
          <p className="text-slate-500">No photos added yet.</p>
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
        <Heading eyebrow="What I'm looking for" title="Partner & Contact" />
        <CardGrid rows={detailRows.partner(partner)} />
        {items.length > 0 && (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {items.map((it) => (
              <a
                key={it.label}
                href={it.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-rose-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5"
              >
                <p className="text-xs uppercase tracking-wide text-slate-400">
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

  // Overview / home
  const age = ageFromDob(basicInfo.dateOfBirth)
  const facts = [
    { label: 'Age', value: age ? `${age} yrs` : '—' },
    { label: 'Height', value: val(basicInfo.height) },
    { label: 'Diet', value: val(basicInfo.diet) },
    { label: 'Location', value: location(basicInfo) },
  ]
  return (
    <section>
      <div className="rounded-3xl bg-gradient-to-br from-rose-500 to-pink-600 p-8 text-white shadow-lg sm:p-10">
        <p className="text-sm text-rose-100">Namaste 🙏 · Marriage Biodata</p>
        <h2 className="mt-2 text-4xl font-bold sm:text-5xl">
          {fullName(basicInfo)}
        </h2>
        <p className="mt-2 text-lg text-rose-50">
          {val(aboutMe.headline || education.occupation, '')}
        </p>
        {aboutMe.bio && (
          <p className="mt-5 max-w-2xl text-rose-50/90">{aboutMe.bio}</p>
        )}
        {aboutMe.tagline && (
          <p className="mt-3 italic text-rose-100">— {aboutMe.tagline}</p>
        )}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {facts.map((f) => (
          <div
            key={f.label}
            className="rounded-2xl border border-rose-100 bg-white p-5 text-center shadow-sm"
          >
            <p className="text-xs uppercase tracking-wide text-slate-400">
              {f.label}
            </p>
            <p className="mt-1 text-lg font-bold text-slate-800">{f.value}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
