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

const GOLD = '#d4af37'
const MAROON = '#4a0e12'

const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'career', label: 'Career' },
  { id: 'family', label: 'Family' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact' },
]

/**
 * ROYAL RAJWADA — architecture: a formal "wedding invitation card". The whole
 * page is one ornate double-gold-bordered card on a deep maroon ground. Details
 * are shown as classic definition rows with dotted leaders (label · · · value),
 * not cards. Centered tab nav lives inside the card header.
 */
export default function RoyalWedSite({ data = {}, embedded = false }) {
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

  const age = basicInfo.age || ageFromDob(basicInfo.dateOfBirth)

  return (
    <div
      className={`px-4 py-8 ${embedded ? 'min-h-full' : 'min-h-screen'}`}
      style={{
        background: `radial-gradient(circle at top, #5e1419 0%, ${MAROON} 60%, #2d0a0d 100%)`,
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Ornate invitation card */}
      <div
        className="mx-auto max-w-3xl"
        style={{ border: `2px solid ${GOLD}`, padding: 6, borderRadius: 6 }}
      >
        <div
          className="px-5 py-10 sm:px-10"
          style={{
            border: `1px solid ${GOLD}88`,
            color: '#f6e7c1',
            background: 'linear-gradient(180deg,#3a0b0e 0%,#460f13 100%)',
          }}
        >
          {/* Card header */}
          <div className="text-center">
            <p className="font-serif text-sm tracking-[0.35em]" style={{ color: GOLD }}>॥ शुभ विवाह ॥</p>
            <div className="mx-auto my-5 flex items-center justify-center gap-3" style={{ color: GOLD }}>
              <span className="h-px w-20" style={{ background: GOLD, opacity: 0.7 }} />
              <span>✦</span>
              <span className="h-px w-20" style={{ background: GOLD, opacity: 0.7 }} />
            </div>
            {photos.profilePhoto ? (
              <img
                src={photos.profilePhoto}
                alt={fullName(basicInfo)}
                className="mx-auto h-40 w-40 rounded-full object-cover"
                style={{ border: `3px solid ${GOLD}` }}
              />
            ) : (
              <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-full bg-[#5e1419] font-serif text-6xl font-bold" style={{ border: `3px solid ${GOLD}`, color: GOLD }}>
                {(basicInfo.firstName?.[0] || '?').toUpperCase()}
              </div>
            )}
            <h1 className="mt-5 font-serif text-4xl font-bold sm:text-5xl" style={{ color: '#fff7e6' }}>
              {fullName(basicInfo)}
            </h1>
            {(aboutMe.headline || education.occupation) && (
              <p className="mt-2 text-lg" style={{ color: '#e7cfa0' }}>{val(aboutMe.headline || education.occupation, '')}</p>
            )}
          </div>

          {/* Tab nav inside card */}
          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 border-y py-3 no-print" style={{ borderColor: `${GOLD}44` }}>
            {NAV.map((n) => {
              const on = active === n.id
              return (
                <button
                  key={n.id}
                  onClick={() => setActive(n.id)}
                  className="text-sm font-medium tracking-wide transition"
                  style={{ color: on ? GOLD : '#cdaf86' }}
                >
                  {n.label}
                </button>
              )
            })}
          </div>

          {/* Card body */}
          <div className="mt-8">
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
          </div>

          <div className="mt-10 flex items-center justify-center gap-3" style={{ color: GOLD }}>
            <span className="h-px w-20" style={{ background: GOLD, opacity: 0.7 }} />
            <span>✦</span>
            <span className="h-px w-20" style={{ background: GOLD, opacity: 0.7 }} />
          </div>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------

/** Definition rows with dotted leaders (label ········· value). */
function DefList({ rows }) {
  return (
    <dl className="mx-auto max-w-xl">
      {rows.map((r) => (
        <div key={r.label} className="flex items-baseline gap-2 py-3">
          <dt className="shrink-0 text-sm uppercase tracking-wide" style={{ color: '#cdaf86' }}>
            {r.label}
          </dt>
          <span className="min-w-6 flex-1 translate-y-[-3px] border-b border-dotted" style={{ borderColor: `${GOLD}66` }} />
          <dd className="shrink-0 text-right font-serif text-lg" style={{ color: '#fff7e6' }}>
            {r.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}

function Heading({ title }) {
  return (
    <h2 className="mb-6 text-center font-serif text-2xl font-bold tracking-wide" style={{ color: GOLD }}>
      {title}
    </h2>
  )
}

function Body({ active, basicInfo, education, family, aboutMe, partner, contact, photos, age }) {
  if (active === 'about') {
    return (
      <section>
        <Heading title="About Me" />
        {aboutMe.bio && <p className="mx-auto mb-6 max-w-xl text-center leading-relaxed" style={{ color: '#e7cfa0cc' }}>{aboutMe.bio}</p>}
        {aboutMe.lifeStory && (
          <p className="mx-auto mb-8 max-w-xl whitespace-pre-line text-center leading-relaxed" style={{ color: '#e7cfa0cc' }}>
            {aboutMe.lifeStory}
          </p>
        )}
        <DefList
          rows={[
            { label: 'Gender', value: val(basicInfo.gender) },
            { label: 'Religion', value: val(basicInfo.religion) },
            { label: 'Caste', value: val(basicInfo.caste) },
            { label: 'Mother Tongue', value: val(basicInfo.motherTongue) },
          ]}
        />
        {hasAny(basicInfo, ['rashi', 'nakshatra', 'gotra', 'manglik']) && (
          <div className="mt-8">
            <p className="mb-2 text-center font-serif text-lg" style={{ color: GOLD }}>✦ Astrological Details ✦</p>
            <DefList rows={detailRows.astro(basicInfo)} />
          </div>
        )}
      </section>
    )
  }
  if (active === 'career') {
    return (<section><Heading title="Career" /><DefList rows={detailRows.education(education)} /></section>)
  }
  if (active === 'family') {
    return (
      <section>
        <Heading title="Family" />
        <DefList rows={detailRows.family(family)} />
        {(family.familyValues || family.about) && (
          <div className="mx-auto mt-6 max-w-xl space-y-4 text-center">
            {family.familyValues && (
              <div>
                <p className="font-serif text-lg" style={{ color: GOLD }}>Family Values</p>
                <p className="mt-1 leading-relaxed" style={{ color: '#e7cfa0cc' }}>{family.familyValues}</p>
              </div>
            )}
            {family.about && (
              <div>
                <p className="font-serif text-lg" style={{ color: GOLD }}>Family Background</p>
                <p className="mt-1 leading-relaxed" style={{ color: '#e7cfa0cc' }}>{family.about}</p>
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
              <img key={i} src={src} alt={`Gallery ${i + 1}`} className="aspect-square w-full object-cover" style={{ border: `3px solid ${GOLD}` }} />
            ))}
          </div>
        ) : (
          <p className="text-center" style={{ color: '#e7cfa099' }}>No photos added yet.</p>
        )}
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
        <DefList rows={detailRows.partner(partner)} />
        {items.length > 0 && (
          <div className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-2">
            {items.map((it) => (
              <a key={it.label} href={it.href} target="_blank" rel="noreferrer" className="font-serif text-lg underline-offset-4 hover:underline" style={{ color: GOLD }}>
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
      <DefList
        rows={[
          { label: 'Age', value: age ? `${age} years` : '—' },
          { label: 'Height', value: val(basicInfo.height) },
          { label: 'Diet', value: val(basicInfo.diet) },
          { label: 'Location', value: location(basicInfo) },
        ]}
      />
      {aboutMe.bio && (
        <p className="mx-auto mt-6 max-w-xl text-center font-serif text-lg italic leading-relaxed" style={{ color: '#e7cfa0cc' }}>
          “{aboutMe.bio}”
        </p>
      )}
      <div className="mt-8 flex justify-center no-print">
        <button onClick={() => window.print()} className="rounded px-6 py-2.5 text-sm font-semibold" style={{ backgroundColor: GOLD, color: MAROON }}>
          Download PDF
        </button>
      </div>
    </section>
  )
}
