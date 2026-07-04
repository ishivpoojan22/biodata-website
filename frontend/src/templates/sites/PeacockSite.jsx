import { useState } from 'react'
import {
  ageFromDob,
  detailRows,
  fullName,
  hasAny,
  location,
  toList,
  val,
} from '../templateUtils'

const GOLD = '#e7c66b'
const TEAL = '#0d7d7d'

const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'career', label: 'Career' },
  { id: 'family', label: 'Family' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact' },
]

/**
 * PEACOCK MOR — architecture: an asymmetric "bento" magazine grid. Content is
 * arranged as tiles of varying sizes (a large feature tile beside small fact
 * tiles and wide banners) rather than a uniform list. Teal→blue→purple
 * gradient ground, gold + glass tiles. Top glassy nav.
 */
export default function PeacockSite({ data = {}, embedded = false }) {
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

  const age = basicInfo.age || ageFromDob(basicInfo.dateOfBirth)

  return (
    <div
      className={`relative ${embedded ? 'min-h-full' : 'min-h-screen'}`}
      style={{ background: 'linear-gradient(135deg,#0a4d4d 0%,#0f3d7a 55%,#3b1d6e 100%)', color: '#eaf6f6', fontFamily: 'Inter, sans-serif' }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-16 top-10 h-56 w-56 rounded-full" style={{ background: `radial-gradient(circle,${GOLD}22,transparent 60%)` }} />
        <div className="absolute -right-16 top-56 h-72 w-72 rounded-full" style={{ background: 'radial-gradient(circle,#7c3aed33,transparent 60%)' }} />
      </div>

      {/* Top nav */}
      <header className="relative px-4 pt-6 no-print">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur">
          <span className="font-serif text-lg font-bold">🦚 {fullName(basicInfo)}</span>
          <div className="flex flex-wrap gap-1">
            {NAV.map((n) => {
              const on = active === n.id
              return (
                <button key={n.id} onClick={() => go(n.id)} className="rounded-lg px-3 py-1.5 text-sm font-medium transition" style={on ? { backgroundColor: GOLD, color: '#0a4d4d' } : { color: '#d7eeee' }}>
                  {n.label}
                </button>
              )
            })}
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-5xl px-4 py-8">
        <Body
          active={active}
          basicInfo={basicInfo}
          education={education}
          family={family}
          aboutMe={aboutMe}
          partner={partner}
          contact={contact}
          photos={photos}
          age={age}
        />
      </main>
    </div>
  )
}

// ---------------------------------------------------------------------------

function Tile({ label, value, className = '' }) {
  return (
    <div className={`rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur ${className}`}>
      <p className="text-xs uppercase tracking-wide" style={{ color: GOLD }}>{label}</p>
      <p className="mt-1 text-lg font-semibold text-white">{value}</p>
    </div>
  )
}

/** Bento grid where the first row spans wider to break uniformity. */
function Bento({ rows }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {rows.map((r, i) => (
        <Tile
          key={r.label}
          label={r.label}
          value={r.value}
          className={i === 0 ? 'col-span-2 sm:col-span-2 sm:row-span-2' : 'col-span-1 sm:col-span-2'}
        />
      ))}
    </div>
  )
}

function Heading({ title }) {
  return (
    <div className="mb-6">
      <h2 className="font-serif text-3xl font-bold text-white">{title}</h2>
      <div className="mt-2 h-1 w-16 rounded-full" style={{ background: GOLD }} />
    </div>
  )
}

function Body({ active, basicInfo, education, family, aboutMe, partner, contact, photos, age }) {
  if (active === 'about') {
    return (
      <section>
        <Heading title="About Me" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {aboutMe.bio && (
            <div className="col-span-2 row-span-2 rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur">
              <p className="text-xs uppercase tracking-wide" style={{ color: GOLD }}>Bio</p>
              <p className="mt-2 leading-relaxed text-teal-50/90">{aboutMe.bio}</p>
            </div>
          )}
          <Tile className="col-span-1 sm:col-span-1" label="Gender" value={val(basicInfo.gender)} />
          <Tile className="col-span-1 sm:col-span-1" label="Religion" value={val(basicInfo.religion)} />
          <Tile className="col-span-1 sm:col-span-1" label="Caste" value={val(basicInfo.caste)} />
          <Tile className="col-span-1 sm:col-span-1" label="Tongue" value={val(basicInfo.motherTongue)} />
        </div>
        {(aboutMe.hobbies || aboutMe.interests) && (
          <div className="mt-4 flex flex-wrap gap-2">
            {[...toList(aboutMe.hobbies), ...toList(aboutMe.interests)].map((t, i) => (
              <span key={i} className="rounded-full px-3 py-1.5 text-sm font-medium" style={{ border: `1px solid ${GOLD}66`, color: GOLD }}>{t}</span>
            ))}
          </div>
        )}
        {aboutMe.lifeStory && (
          <div className="mt-4 rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur">
            <p className="text-xs uppercase tracking-wide" style={{ color: GOLD }}>My Journey</p>
            <p className="mt-2 whitespace-pre-line leading-relaxed text-teal-50/90">{aboutMe.lifeStory}</p>
          </div>
        )}
        {hasAny(basicInfo, ['rashi', 'nakshatra', 'gotra', 'manglik']) && (
          <div className="mt-4">
            <p className="mb-3 text-sm font-semibold" style={{ color: GOLD }}>✦ Astrological Details</p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {detailRows.astro(basicInfo).map((r) => (
                <Tile key={r.label} label={r.label} value={r.value} className="col-span-1 sm:col-span-1" />
              ))}
            </div>
          </div>
        )}
      </section>
    )
  }
  if (active === 'career') {
    return (<section><Heading title="Career" /><Bento rows={detailRows.education(education)} /></section>)
  }
  if (active === 'family') {
    return (
      <section>
        <Heading title="Family" />
        <Bento rows={detailRows.family(family)} />
        {(family.familyValues || family.about) && (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {family.familyValues && (
              <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur">
                <p className="text-xs uppercase tracking-wide" style={{ color: GOLD }}>Family Values</p>
                <p className="mt-2 leading-relaxed text-teal-50/90">{family.familyValues}</p>
              </div>
            )}
            {family.about && (
              <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur">
                <p className="text-xs uppercase tracking-wide" style={{ color: GOLD }}>Family Background</p>
                <p className="mt-2 leading-relaxed text-teal-50/90">{family.about}</p>
              </div>
            )}
          </div>
        )}
      </section>
    )
  }
  if (active === 'gallery') {
    const gallery = toList(photos.gallery)
    return (
      <section>
        <Heading title="Gallery" />
        {gallery.length ? (
          <div className="grid auto-rows-[140px] grid-cols-2 gap-4 sm:grid-cols-4">
            {gallery.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Gallery ${i + 1}`}
                className={`h-full w-full rounded-2xl object-cover ${i % 3 === 0 ? 'col-span-2 row-span-2' : ''}`}
                style={{ border: `3px solid ${GOLD}` }}
              />
            ))}
          </div>
        ) : (<p className="text-teal-100/70">No photos added yet.</p>)}
      </section>
    )
  }
  if (active === 'contact') {
    const items = [
      contact.phone && { label: 'Phone', value: contact.phone, href: `tel:${contact.phone}` },
      contact.email && { label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
      contact.whatsapp && { label: 'WhatsApp', value: contact.whatsapp, href: `https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}` },
    ].filter(Boolean)
    return (
      <section>
        <Heading title="Partner & Contact" />
        <Bento rows={detailRows.partner(partner)} />
        {items.length > 0 && (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {items.map((it) => (
              <a key={it.label} href={it.href} target="_blank" rel="noreferrer" className="rounded-2xl border border-white/15 bg-white/10 p-5 text-center backdrop-blur transition hover:-translate-y-0.5">
                <p className="text-xs uppercase tracking-wide" style={{ color: GOLD }}>{it.label}</p>
                <p className="mt-1 break-words font-semibold text-white">{it.value}</p>
              </a>
            ))}
          </div>
        )}
      </section>
    )
  }

  // home — feature bento
  return (
    <section>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {/* large feature tile */}
        <div className="col-span-2 row-span-2 flex flex-col items-center justify-center rounded-2xl border border-white/15 bg-white/10 p-8 text-center backdrop-blur">
          <div className="rounded-full p-1.5" style={{ background: `conic-gradient(${GOLD},${TEAL},#7c3aed,${GOLD})` }}>
            {photos.profilePhoto ? (
              <img src={photos.profilePhoto} alt={fullName(basicInfo)} className="h-28 w-28 rounded-full object-cover ring-4 ring-white/30" />
            ) : (
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white/10 font-serif text-4xl font-bold ring-4 ring-white/30">
                {(basicInfo.firstName?.[0] || '?').toUpperCase()}
              </div>
            )}
          </div>
          <h1 className="mt-4 font-serif text-3xl font-bold text-white">{fullName(basicInfo)}</h1>
          {(aboutMe.headline || education.occupation) && (
            <p className="mt-1 text-sm" style={{ color: GOLD }}>{val(aboutMe.headline || education.occupation, '')}</p>
          )}
        </div>

        <Tile className="col-span-1 sm:col-span-1" label="Age" value={age ? `${age} yrs` : '—'} />
        <Tile className="col-span-1 sm:col-span-1" label="Height" value={val(basicInfo.height)} />
        <Tile className="col-span-1 sm:col-span-1" label="Diet" value={val(basicInfo.diet)} />
        <Tile className="col-span-1 sm:col-span-1" label="Location" value={location(basicInfo)} />

        {aboutMe.tagline && (
          <div className="col-span-2 rounded-2xl border border-white/15 bg-white/10 p-5 text-center backdrop-blur sm:col-span-4">
            <p className="font-serif text-lg italic text-teal-50/90">“{aboutMe.tagline}”</p>
          </div>
        )}
      </div>

      {aboutMe.bio && (
        <div className="mt-4 rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur">
          <p className="leading-relaxed text-teal-50/90">{aboutMe.bio}</p>
        </div>
      )}

      <div className="mt-6 flex gap-3 no-print">
        <button onClick={() => window.print()} className="rounded-full px-6 py-3 text-sm font-semibold" style={{ backgroundColor: GOLD, color: '#0a4d4d' }}>
          Download PDF
        </button>
      </div>
    </section>
  )
}
