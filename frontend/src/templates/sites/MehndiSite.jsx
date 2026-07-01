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

const GREEN = '#3f6212' // mehndi green
const GOLD = '#b58a2b'
const TERRA = '#c2410c' // terracotta

const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'career', label: 'Career' },
  { id: 'family', label: 'Family' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact' },
]

/**
 * MEHNDI BAGH — architecture: a vertical "journey" timeline. Each section's
 * details are rendered as nodes strung along a single decorative green vine,
 * with marker dots and paisley buds — not a grid. Light pista/cream ground,
 * mehndi-green + terracotta accents, left-aligned content.
 */
export default function MehndiSite({ data = {}, embedded = false }) {
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
      style={{ background: 'linear-gradient(180deg,#f7faec 0%,#eef4dd 100%)', color: '#2c3a12', fontFamily: 'Inter, sans-serif' }}
    >
      {/* Split hero: photo left, intro right */}
      <header className="mx-auto max-w-4xl px-4 pt-10">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
          <div className="rounded-2xl p-1.5" style={{ background: `linear-gradient(135deg,${GREEN},${GOLD})` }}>
            {photos.profilePhoto ? (
              <img src={photos.profilePhoto} alt={fullName(basicInfo)} className="h-32 w-32 rounded-xl object-cover ring-2 ring-white" />
            ) : (
              <div className="flex h-32 w-32 items-center justify-center rounded-xl bg-lime-50 font-serif text-4xl font-bold ring-2 ring-white" style={{ color: GREEN }}>
                {(basicInfo.firstName?.[0] || '?').toUpperCase()}
              </div>
            )}
          </div>
          <div className="text-center sm:text-left">
            <p className="text-2xl" style={{ color: TERRA }}>❦</p>
            <h1 className="font-serif text-4xl font-bold sm:text-5xl" style={{ color: GREEN }}>{fullName(basicInfo)}</h1>
            {(aboutMe.headline || education.occupation) && (
              <p className="mt-1 text-lg" style={{ color: '#4d5a2e' }}>{val(aboutMe.headline || education.occupation, '')}</p>
            )}
            {aboutMe.tagline && <p className="mt-1 font-serif italic" style={{ color: TERRA }}>“{aboutMe.tagline}”</p>}
          </div>
        </div>
      </header>

      {/* Nav */}
      <div className="px-4 no-print">
        <div className="mx-auto mt-6 flex max-w-4xl flex-wrap justify-center gap-1 border-y py-3" style={{ borderColor: `${GREEN}33` }}>
          {NAV.map((n) => {
            const on = active === n.id
            return (
              <button key={n.id} onClick={() => go(n.id)} className="rounded-full px-4 py-1.5 text-sm font-semibold transition" style={on ? { backgroundColor: GREEN, color: '#fff' } : { color: '#4d5a2e' }}>
                {n.label}
              </button>
            )
          })}
        </div>
      </div>

      <main className="mx-auto max-w-2xl px-4 py-10">
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

/** A vine timeline: a vertical line with a marker dot per row. */
function Timeline({ rows }) {
  return (
    <ol className="relative ml-3 border-l-2" style={{ borderColor: `${GREEN}55` }}>
      {rows.map((r) => (
        <li key={r.label} className="relative ml-6 pb-7 last:pb-0">
          {/* marker */}
          <span
            className="absolute -left-[35px] top-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] text-white"
            style={{ backgroundColor: GREEN }}
          >
            ❀
          </span>
          <p className="text-xs uppercase tracking-wide" style={{ color: TERRA }}>{r.label}</p>
          <p className="mt-0.5 font-serif text-xl" style={{ color: '#2c3a12' }}>{r.value}</p>
        </li>
      ))}
    </ol>
  )
}

function Heading({ title }) {
  return (
    <div className="mb-8">
      <h2 className="font-serif text-3xl font-bold" style={{ color: GREEN }}>{title}</h2>
      <div className="mt-2 flex items-center gap-2" style={{ color: GOLD }}>
        <span>❦</span>
        <span className="h-px w-20" style={{ background: GOLD, opacity: 0.6 }} />
      </div>
    </div>
  )
}

function Body({ active, basicInfo, education, family, aboutMe, partner, contact, photos, age }) {
  if (active === 'about') {
    return (
      <section>
        <Heading title="About Me" />
        {aboutMe.bio && <p className="mb-6 leading-relaxed" style={{ color: '#4d5a2e' }}>{aboutMe.bio}</p>}
        {aboutMe.lifeStory && (
          <div className="mb-8">
            <p className="mb-2 font-serif text-lg font-semibold" style={{ color: GREEN }}>My Journey</p>
            <p className="whitespace-pre-line leading-relaxed" style={{ color: '#4d5a2e' }}>{aboutMe.lifeStory}</p>
          </div>
        )}
        <Timeline
          rows={[
            { label: 'Gender', value: val(basicInfo.gender) },
            { label: 'Religion', value: val(basicInfo.religion) },
            { label: 'Caste', value: val(basicInfo.caste) },
            { label: 'Mother Tongue', value: val(basicInfo.motherTongue) },
          ]}
        />
        {hasAny(basicInfo, ['rashi', 'nakshatra', 'gotra', 'manglik']) && (
          <div className="mt-8">
            <p className="mb-4 font-serif text-xl font-semibold" style={{ color: GREEN }}>✦ Astrological Details</p>
            <Timeline rows={detailRows.astro(basicInfo)} />
          </div>
        )}
        {(aboutMe.hobbies || aboutMe.interests) && (
          <div className="mt-6 flex flex-wrap gap-2">
            {[...toList(aboutMe.hobbies), ...toList(aboutMe.interests)].map((t, i) => (
              <span key={i} className="rounded-full px-3 py-1.5 text-sm font-medium" style={{ backgroundColor: '#ecfccb', color: GREEN }}>{t}</span>
            ))}
          </div>
        )}
      </section>
    )
  }
  if (active === 'career') {
    return (<section><Heading title="Career" /><Timeline rows={detailRows.education(education)} /></section>)
  }
  if (active === 'family') {
    return (
      <section>
        <Heading title="Family" />
        <Timeline rows={detailRows.family(family)} />
        {(family.familyValues || family.about) && (
          <div className="mt-8 space-y-5">
            {family.familyValues && (
              <div className="rounded-2xl bg-white p-5 shadow-sm" style={{ border: `1px solid ${GREEN}33` }}>
                <p className="mb-1 font-serif text-lg font-semibold" style={{ color: GREEN }}>Family Values</p>
                <p className="leading-relaxed" style={{ color: '#4d5a2e' }}>{family.familyValues}</p>
              </div>
            )}
            {family.about && (
              <div className="rounded-2xl bg-white p-5 shadow-sm" style={{ border: `1px solid ${GREEN}33` }}>
                <p className="mb-1 font-serif text-lg font-semibold" style={{ color: GREEN }}>Family Background</p>
                <p className="leading-relaxed" style={{ color: '#4d5a2e' }}>{family.about}</p>
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
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {gallery.map((src, i) => (
              <img key={i} src={src} alt={`Gallery ${i + 1}`} className="aspect-square w-full rounded-xl object-cover" style={{ border: `3px solid ${GREEN}` }} />
            ))}
          </div>
        ) : (<p style={{ color: '#4d5a2e99' }}>No photos added yet.</p>)}
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
        <Timeline rows={detailRows.partner(partner)} />
        {items.length > 0 && (
          <div className="mt-6 flex flex-col gap-2">
            {items.map((it) => (
              <a key={it.label} href={it.href} target="_blank" rel="noreferrer" className="font-serif text-lg underline-offset-4 hover:underline" style={{ color: GREEN }}>
                {it.label}: {it.value}
              </a>
            ))}
          </div>
        )}
      </section>
    )
  }

  // home
  return (
    <section>
      <Heading title="At a Glance" />
      <Timeline
        rows={[
          { label: 'Age', value: age ? `${age} years` : '—' },
          { label: 'Height', value: val(basicInfo.height) },
          { label: 'Diet', value: val(basicInfo.diet) },
          { label: 'Location', value: location(basicInfo) },
        ]}
      />
      <div className="mt-8 flex gap-3 no-print">
        <button onClick={() => window.print()} className="rounded-full px-6 py-3 text-sm font-semibold text-white shadow-md" style={{ backgroundColor: GREEN }}>
          Download PDF
        </button>
      </div>
    </section>
  )
}
