import { useRef } from 'react'
import {
  ageFromDob,
  detailRows,
  fullName,
  hasAny,
  location,
  toList,
  val,
} from '../templateUtils'

const ACCENT = '#b91c1c' // crimson
const GOLD = '#c79a3a'

const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'career', label: 'Career' },
  { id: 'family', label: 'Family' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact' },
]

/**
 * SHUBH VIVAH — architecture: a single long-scroll wedding website (NOT tabbed).
 * Every section is a full-width band that stacks vertically with alternating
 * ivory/blush backgrounds; a fixed vertical dot-nav on the right jumps between
 * them. Marigold→crimson→magenta gradient hero, antique-gold ornament.
 */
export default function FestiveSite({ data = {}, embedded = false }) {
  const {
    basicInfo = {},
    education = {},
    family = {},
    aboutMe = {},
    partner = {},
    contact = {},
    photos = {},
  } = data

  const refs = {
    home: useRef(null),
    about: useRef(null),
    career: useRef(null),
    family: useRef(null),
    gallery: useRef(null),
    contact: useRef(null),
  }

  const scrollTo = (id) =>
    refs[id]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const age = basicInfo.age || ageFromDob(basicInfo.dateOfBirth)
  const gallery = toList(photos.gallery)
  const tags = [...toList(aboutMe.hobbies), ...toList(aboutMe.interests)]
  const contactItems = [
    contact.phone && { label: 'Phone', value: contact.phone, href: `tel:${contact.phone}` },
    contact.email && { label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
    contact.whatsapp && {
      label: 'WhatsApp',
      value: contact.whatsapp,
      href: `https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`,
    },
  ].filter(Boolean)

  return (
    <div
      className={embedded ? 'min-h-full' : 'min-h-screen'}
      style={{ backgroundColor: '#fff8ee', color: '#3b2412', fontFamily: 'Inter, sans-serif' }}
    >
      {/* Fixed dot nav */}
      <nav
        className={`${embedded ? 'absolute' : 'fixed'} right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex no-print`}
      >
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            title={s.label}
            className="group flex items-center gap-2"
          >
            <span className="text-xs font-medium opacity-0 transition group-hover:opacity-100" style={{ color: ACCENT }}>
              {s.label}
            </span>
            <span
              className="h-3 w-3 rounded-full border-2"
              style={{ borderColor: ACCENT, backgroundColor: '#fff' }}
            />
          </button>
        ))}
      </nav>

      {/* HERO band */}
      <section ref={refs.home}>
        <div className="h-2 w-full" style={{ background: `repeating-linear-gradient(90deg,${GOLD} 0 14px,#8a6d1f 14px 28px)` }} />
        <div
          className="relative px-4 py-16 text-center text-white"
          style={{ background: 'linear-gradient(135deg,#f59e0b 0%,#dc2626 45%,#be185d 100%)' }}
        >
          <p className="font-serif text-sm tracking-[0.3em] text-amber-100">॥ शुभ विवाह ॥</p>
          <div className="mx-auto mt-6 w-fit rounded-full p-1.5" style={{ background: GOLD }}>
            {photos.profilePhoto ? (
              <img src={photos.profilePhoto} alt={fullName(basicInfo)} className="h-36 w-36 rounded-full object-cover ring-4 ring-white/70" />
            ) : (
              <div className="flex h-36 w-36 items-center justify-center rounded-full bg-white/20 font-serif text-5xl font-bold ring-4 ring-white/70">
                {(basicInfo.firstName?.[0] || '?').toUpperCase()}
              </div>
            )}
          </div>
          <h1 className="mt-5 font-serif text-5xl font-bold drop-shadow">{fullName(basicInfo)}</h1>
          {(aboutMe.headline || education.occupation) && (
            <p className="mt-2 text-lg text-amber-50">{val(aboutMe.headline || education.occupation, '')}</p>
          )}
          {aboutMe.tagline && <p className="mt-2 font-serif italic text-amber-100/90">“{aboutMe.tagline}”</p>}

          <div className="mx-auto mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: 'Age', value: age ? `${age} yrs` : '—' },
              { label: 'Height', value: val(basicInfo.height) },
              { label: 'Diet', value: val(basicInfo.diet) },
              { label: 'City', value: val(basicInfo.city) },
            ].map((f) => (
              <div key={f.label} className="rounded-xl bg-white/15 px-3 py-3 backdrop-blur">
                <p className="text-[10px] uppercase tracking-wide text-amber-100">{f.label}</p>
                <p className="mt-0.5 font-semibold text-white">{f.value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="h-2 w-full" style={{ background: `repeating-linear-gradient(90deg,${GOLD} 0 14px,#8a6d1f 14px 28px)` }} />
      </section>

      {/* ABOUT band (ivory) */}
      <Band innerRef={refs.about} title="About Me">
        {aboutMe.bio && <p className="mx-auto mb-8 max-w-2xl text-center text-lg leading-relaxed text-amber-900/80">{aboutMe.bio}</p>}
        {aboutMe.lifeStory && (
          <div className="mx-auto mb-8 max-w-2xl">
            <p className="mb-2 text-center font-serif text-lg font-semibold" style={{ color: ACCENT }}>My Journey</p>
            <p className="whitespace-pre-line text-center leading-relaxed text-amber-900/80">{aboutMe.lifeStory}</p>
          </div>
        )}
        <Rows
          rows={[
            { label: 'Gender', value: val(basicInfo.gender) },
            { label: 'Religion', value: val(basicInfo.religion) },
            { label: 'Caste', value: val(basicInfo.caste) },
            { label: 'Mother Tongue', value: val(basicInfo.motherTongue) },
          ]}
        />
        {hasAny(basicInfo, ['rashi', 'nakshatra', 'gotra', 'manglik']) && (
          <div className="mt-6">
            <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: ACCENT }}>✦ Astrological Details</p>
            <Rows rows={detailRows.astro(basicInfo)} />
          </div>
        )}
        {tags.length > 0 && (
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {tags.map((t, i) => (
              <span key={i} className="rounded-full px-3 py-1.5 text-sm font-medium" style={{ backgroundColor: '#fde68a', color: '#92400e' }}>
                {t}
              </span>
            ))}
          </div>
        )}
      </Band>

      {/* CAREER band (blush) */}
      <Band innerRef={refs.career} title="Career" tint="#fdeef0">
        <Rows rows={detailRows.education(education)} />
      </Band>

      {/* FAMILY band (ivory) */}
      <Band innerRef={refs.family} title="Family">
        <Rows rows={detailRows.family(family)} />
        {(family.familyValues || family.about) && (
          <div className="mx-auto mt-6 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
            {family.familyValues && (
              <div className="rounded-xl bg-white p-5 shadow-sm" style={{ border: `1px solid ${GOLD}55` }}>
                <p className="mb-1 font-semibold" style={{ color: ACCENT }}>Family Values</p>
                <p className="leading-relaxed text-amber-900/80">{family.familyValues}</p>
              </div>
            )}
            {family.about && (
              <div className="rounded-xl bg-white p-5 shadow-sm" style={{ border: `1px solid ${GOLD}55` }}>
                <p className="mb-1 font-semibold" style={{ color: ACCENT }}>Family Background</p>
                <p className="leading-relaxed text-amber-900/80">{family.about}</p>
              </div>
            )}
          </div>
        )}
      </Band>

      {/* GALLERY band (blush) */}
      <Band innerRef={refs.gallery} title="Gallery" tint="#fdeef0">
        {gallery.length ? (
          <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-3">
            {gallery.map((src, i) => (
              <img key={i} src={src} alt={`Gallery ${i + 1}`} className="aspect-square w-full rounded-xl object-cover" style={{ border: `3px solid ${GOLD}` }} />
            ))}
          </div>
        ) : (
          <p className="text-center text-amber-900/60">No photos added yet.</p>
        )}
      </Band>

      {/* CONTACT band (ivory) */}
      <Band innerRef={refs.contact} title="Partner & Contact">
        <Rows rows={detailRows.partner(partner)} />
        {contactItems.length > 0 && (
          <div className="mx-auto mt-6 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
            {contactItems.map((it) => (
              <a key={it.label} href={it.href} target="_blank" rel="noreferrer" className="rounded-xl bg-white p-5 text-center shadow-sm transition hover:-translate-y-0.5" style={{ border: `1px solid ${GOLD}55` }}>
                <p className="text-xs uppercase tracking-wide" style={{ color: GOLD }}>{it.label}</p>
                <p className="mt-1 break-words font-semibold">{it.value}</p>
              </a>
            ))}
          </div>
        )}
        <div className="mt-8 flex justify-center no-print">
          <button onClick={() => window.print()} className="rounded-full px-6 py-3 text-sm font-semibold text-white shadow-md" style={{ backgroundColor: ACCENT }}>
            ⬇ Download PDF
          </button>
        </div>
      </Band>
    </div>
  )
}

// ---------------------------------------------------------------------------

function Band({ innerRef, title, children, tint = '#fff8ee' }) {
  return (
    <section ref={innerRef} className="px-4 py-14" style={{ backgroundColor: tint }}>
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center" style={{ color: ACCENT }}>
          <h2 className="font-serif text-3xl font-bold">{title}</h2>
          <div className="mt-3 flex items-center justify-center gap-3">
            <span className="h-px w-12" style={{ background: GOLD }} />
            <span className="text-lg" style={{ color: GOLD }}>❁</span>
            <span className="h-px w-12" style={{ background: GOLD }} />
          </div>
        </div>
        {children}
      </div>
    </section>
  )
}

function Rows({ rows }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {rows.map((r) => (
        <div key={r.label} className="rounded-xl bg-white p-5 shadow-sm" style={{ border: `1px solid ${GOLD}55` }}>
          <p className="text-xs uppercase tracking-wide" style={{ color: GOLD }}>{r.label}</p>
          <p className="mt-1 text-lg font-semibold">{r.value}</p>
        </div>
      ))}
    </div>
  )
}
