import { toList, val } from '../../templateUtils'
import { GOLD, GOLD_LIGHT, MAROON } from './theme'

export default function CareerPage({
  basicInfo,
  education,
  aboutMe,
  dark,
  textColor,
  mutedColor,
  cardBg,
  borderColor,
}) {
  const skills = toList(aboutMe.hobbies).length
    ? toList(aboutMe.hobbies)
    : education.education
      ? [education.education]
      : []

  return (
    <>
      {/* Career Hero Banner */}
      <section
        className="py-14 text-center"
        style={{
          background: dark
            ? 'linear-gradient(180deg, #1a1410 0%, #2a1a16 100%)'
            : 'linear-gradient(180deg, #3d2017 0%, #5c2e24 100%)',
        }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: GOLD }}>
          Professional Journey
        </p>
        <h1 className="mx-auto mt-4 max-w-xl font-serif text-3xl font-bold leading-snug text-white sm:text-4xl">
          Heritage &amp; Heart in Technology
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-neutral-300">
          Merging technical excellence in {val(education.occupation, 'professional work').toLowerCase()} with a foundation of traditional Indian values and educational rigor.
        </p>
        <button
          onClick={() => window.print()}
          className="mt-6 inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          style={{ backgroundColor: MAROON }}
        >
          ⬇ Download PDF
        </button>
      </section>

      {/* Professional Tenure */}
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <h2 className="mb-8 text-center font-serif text-2xl font-bold sm:text-3xl" style={{ color: textColor }}>
          Professional Tenure
        </h2>

        <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
          {/* Main job card */}
          <div
            className="rounded-2xl p-6"
            style={{ backgroundColor: cardBg, border: `2px solid ${MAROON}33`, borderLeft: `4px solid ${MAROON}` }}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold" style={{ color: textColor }}>
                  {val(education.occupation, 'Professional')}
                </h3>
                <p className="text-sm" style={{ color: mutedColor }}>
                  Current Position | {val(education.company, 'Company')}
                </p>
              </div>
              <span
                className="rounded-full border px-3 py-1 text-xs font-semibold"
                style={{ borderColor: GOLD, color: GOLD }}
              >
                Current
              </span>
            </div>

            {aboutMe.bio && (
              <p className="mt-4 text-sm leading-relaxed" style={{ color: mutedColor }}>
                Responsible for delivering excellence in {val(education.occupation, 'their role').toLowerCase()} at {val(education.company, 'the organization')}. Bringing strong technical skills and a passion for building impactful solutions.
              </p>
            )}

            {/* Skill tags */}
            {skills.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {skills.slice(0, 6).map((s, i) => (
                  <span
                    key={i}
                    className="rounded-full border px-3 py-1 text-xs font-medium"
                    style={{ borderColor, color: mutedColor }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Key Milestones */}
          <div
            className="rounded-2xl p-5"
            style={{ backgroundColor: dark ? '#2a1a16' : '#faf0e6', border: `1px solid ${borderColor}` }}
          >
            <div className="mb-3 flex items-center gap-2">
              <span className="text-lg" style={{ color: MAROON }}>✦</span>
              <h4 className="font-serif text-base font-bold" style={{ color: MAROON }}>
                Key Milestones
              </h4>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm" style={{ color: mutedColor }}>
                <span style={{ color: GOLD }}>◉</span>
                <span>Working at {val(education.company, 'a reputed firm')}</span>
              </li>
              <li className="flex items-start gap-2 text-sm" style={{ color: mutedColor }}>
                <span style={{ color: GOLD }}>◉</span>
                <span>Earning {val(education.annualIncome, 'a competitive package')}</span>
              </li>
            </ul>
            <p className="mt-4 text-right font-serif text-xs italic" style={{ color: GOLD }}>
              Excellence in Execution
            </p>
          </div>
        </div>
      </section>

      {/* Academic Foundation */}
      <section className="mx-auto max-w-5xl px-4 pb-12 sm:px-6">
        <h2 className="mb-8 text-center font-serif text-2xl font-bold sm:text-3xl" style={{ color: textColor }}>
          Academic Foundation
        </h2>

        <div className="grid gap-6 sm:grid-cols-2">
          {/* Primary education card */}
          <div
            className="overflow-hidden rounded-2xl"
            style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}` }}
          >
            <div className="h-32 w-full" style={{ background: `linear-gradient(135deg, ${MAROON}22, ${GOLD}22)` }}>
              <div className="flex h-full items-center justify-center">
                <span className="text-4xl">🎓</span>
              </div>
            </div>
            <div className="p-5">
              <h4 className="font-bold" style={{ color: textColor }}>
                {val(education.education, 'Education')}
              </h4>
              <p className="mt-0.5 text-sm font-medium" style={{ color: MAROON }}>
                {val(education.college, 'Institution')}
              </p>
            </div>
          </div>

          {/* Company card */}
          <div
            className="overflow-hidden rounded-2xl"
            style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}` }}
          >
            <div className="h-32 w-full" style={{ background: `linear-gradient(135deg, ${GOLD}22, ${MAROON}22)` }}>
              <div className="flex h-full items-center justify-center">
                <span className="text-4xl">💼</span>
              </div>
            </div>
            <div className="p-5">
              <h4 className="font-bold" style={{ color: textColor }}>
                {val(education.occupation, 'Profession')}
              </h4>
              <p className="mt-0.5 text-sm font-medium" style={{ color: MAROON }}>
                {val(education.company, 'Company')}
              </p>
              <p className="mt-1 text-xs" style={{ color: mutedColor }}>
                Annual Income: {val(education.annualIncome)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Aspirations & Vision */}
      <section
        className="py-14"
        style={{ backgroundColor: dark ? '#1a1410' : '#f5ede4' }}
      >
        <div className="mx-auto grid max-w-5xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-2xl font-bold sm:text-3xl" style={{ color: MAROON }}>
              Aspirations &amp; Vision
            </h2>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: mutedColor }}>
              {basicInfo.firstName || 'The candidate'} aims to grow further in their career as a {val(education.occupation, 'professional').toLowerCase()}, focusing on building impactful solutions and contributing to communities that empower through technology.
            </p>
            <ul className="mt-5 space-y-3">
              <li className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full text-sm" style={{ backgroundColor: `${MAROON}15`, color: MAROON }}>
                  🎯
                </span>
                <span className="text-sm font-medium" style={{ color: textColor }}>Career Growth & Mastery</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full text-sm" style={{ backgroundColor: `${MAROON}15`, color: MAROON }}>
                  🌱
                </span>
                <span className="text-sm font-medium" style={{ color: textColor }}>Empowering Next Generation</span>
              </li>
            </ul>
          </div>
          {/* Decorative compass */}
          <div className="flex justify-center">
            <div
              className="flex h-52 w-52 items-center justify-center rounded-full sm:h-64 sm:w-64"
              style={{
                background: `linear-gradient(135deg, ${GOLD_LIGHT}33, ${GOLD}22)`,
                border: `3px solid ${GOLD}44`,
              }}
            >
              <span className="text-6xl">🧭</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
