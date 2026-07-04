import { ageFromDob, fullName, val } from '../../templateUtils'
import { GOLD, GOLD_LIGHT, MAROON, RED_BTN } from './theme'
import { SectionHeading, DetailGrid } from './components'

export default function HomePage({
  basicInfo,
  education,
  aboutMe,
  photos,
  go,
  dark,
  textColor,
  mutedColor,
  cardBg,
  borderColor,
}) {
  const age = basicInfo.age || ageFromDob(basicInfo.dateOfBirth)
  const headline = val(aboutMe.headline || education.occupation, '')
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
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-[340px_1fr]">
          {/* Photo with golden ring */}
          <div className="flex justify-center lg:justify-start">
            <div
              className="rounded-full p-2"
              style={{
                background: `linear-gradient(135deg, ${GOLD_LIGHT}, ${GOLD}, ${GOLD_LIGHT})`,
                boxShadow: `0 8px 32px ${GOLD}33`,
              }}
            >
              {photos.profilePhoto ? (
                <img
                  src={photos.profilePhoto}
                  alt={fullName(basicInfo)}
                  className="h-60 w-60 rounded-full object-cover sm:h-72 sm:w-72"
                  style={{ border: '4px solid #fff' }}
                />
              ) : (
                <div
                  className="flex h-60 w-60 items-center justify-center rounded-full font-serif text-6xl font-bold sm:h-72 sm:w-72"
                  style={{ backgroundColor: cardBg, color: GOLD, border: '4px solid #fff' }}
                >
                  {(basicInfo.firstName?.[0] || '?').toUpperCase()}
                </div>
              )}
            </div>
          </div>

          {/* Intro text */}
          <div>
            <p className="flex items-center gap-2 text-sm font-medium uppercase tracking-wider" style={{ color: mutedColor }}>
              <span>🙏</span> Namaste · Marriage Biodata
            </p>
            <h1 className="mt-3 font-serif text-4xl font-bold leading-tight sm:text-5xl" style={{ color: textColor }}>
              {fullName(basicInfo)}
            </h1>
            {headline && (
              <p className="mt-2 font-serif text-xl italic" style={{ color: MAROON }}>
                {headline}
              </p>
            )}

            {aboutMe.bio && (
              <p className="mt-5 max-w-lg text-base leading-relaxed" style={{ color: mutedColor }}>
                {aboutMe.bio}
              </p>
            )}

            {aboutMe.tagline && (
              <p className="mt-3 font-serif italic" style={{ color: MAROON }}>
                — {aboutMe.tagline}
              </p>
            )}

            {/* Chips */}
            {chips.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {chips.map((chip, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium"
                    style={{ borderColor: borderColor, color: mutedColor, backgroundColor: cardBg }}
                  >
                    <span style={{ color: GOLD }}>
                      {i === 0 ? '👁' : i === 1 ? '🙏' : '🥗'}
                    </span>
                    {chip}
                  </span>
                ))}
              </div>
            )}

            {/* Action buttons */}
            <div className="mt-7 flex flex-wrap gap-3">
              <button
                onClick={() => go('contact')}
                className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-90"
                style={{ backgroundColor: RED_BTN }}
              >
                ✉ Contact Me
              </button>
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 rounded-lg border px-6 py-3 text-sm font-semibold transition hover:opacity-90"
                style={{ borderColor: MAROON, color: MAROON }}
              >
                ⬇ Download PDF
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* At a Glance */}
      <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6">
        <SectionHeading title="At a Glance" textColor={textColor} />
        <DetailGrid
          rows={facts}
          cardBg={cardBg}
          borderColor={borderColor}
          textColor={textColor}
          mutedColor={mutedColor}
        />
      </section>
    </>
  )
}
