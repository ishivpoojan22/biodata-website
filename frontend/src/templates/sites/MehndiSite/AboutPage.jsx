import { formatDate, fullName, toList, val } from '../../templateUtils'
import { GOLD, GOLD_LIGHT, MAROON } from './theme'

export default function AboutPage({
  basicInfo,
  aboutMe,
  photos,
  dark,
  textColor,
  mutedColor,
  cardBg,
  borderColor,
}) {
  const hobbies = toList(aboutMe.hobbies)
  const interests = toList(aboutMe.interests)
  const lifestyle = toList(aboutMe.lifestyle)

  return (
    <>
      {/* ─── Hero Banner ─── */}
      <section
        className="py-14 text-center"
        style={{
          background: dark
            ? 'linear-gradient(180deg, #1a1410 0%, #2a1a16 100%)'
            : 'linear-gradient(180deg, #3d2017 0%, #5c2e24 100%)',
        }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: GOLD }}>
          Get to Know Me
        </p>
        <h1 className="mx-auto mt-4 max-w-xl font-serif text-3xl font-bold leading-snug text-white sm:text-4xl">
          The Story Behind the Name
        </h1>
        <p className="mx-auto mt-4 max-w-md font-serif text-sm italic text-neutral-300">
          &ldquo;{aboutMe.tagline || 'Grounded in values. Ambitious in dreams.'}&rdquo;
        </p>
        <div className="mt-4 text-lg" style={{ color: GOLD }}>⚜</div>
      </section>

      {/* ─── Bio + Photo ─── */}
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[280px_1fr]">
          {/* Photo */}
          <div className="flex justify-center">
            <div
              className="rounded-2xl p-1.5"
              style={{ background: `linear-gradient(135deg, ${GOLD_LIGHT}, ${GOLD})` }}
            >
              {photos.profilePhoto ? (
                <img
                  src={photos.profilePhoto}
                  alt={fullName(basicInfo)}
                  className="h-56 w-56 rounded-xl object-cover sm:h-64 sm:w-64"
                  style={{ border: '3px solid #fff' }}
                />
              ) : (
                <div
                  className="flex h-56 w-56 items-center justify-center rounded-xl font-serif text-5xl font-bold sm:h-64 sm:w-64"
                  style={{ backgroundColor: cardBg, color: GOLD, border: '3px solid #fff' }}
                >
                  {(basicInfo.firstName?.[0] || '?').toUpperCase()}
                </div>
              )}
            </div>
          </div>

          {/* Bio text */}
          <div>
            <h2 className="font-serif text-2xl font-bold sm:text-3xl" style={{ color: textColor }}>
              About {basicInfo.firstName || 'Me'}
            </h2>
            {aboutMe.bio && (
              <p className="mt-4 text-base leading-relaxed" style={{ color: mutedColor }}>
                {aboutMe.bio}
              </p>
            )}
            {aboutMe.lifeStory && (
              <div className="mt-5">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider" style={{ color: GOLD }}>
                  My Journey
                </p>
                <p className="whitespace-pre-line text-sm leading-relaxed" style={{ color: mutedColor }}>
                  {aboutMe.lifeStory}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── Personal Details ─── */}
      <section className="mx-auto max-w-5xl px-4 pb-12 sm:px-6">
        <h2 className="mb-6 text-center font-serif text-2xl font-bold" style={{ color: textColor }}>
          Personal Details
        </h2>
        <div
          className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl sm:grid-cols-3 lg:grid-cols-4"
          style={{ backgroundColor: borderColor }}
        >
          <DetailCell label="Full Name" value={fullName(basicInfo)} cardBg={cardBg} textColor={textColor} mutedColor={mutedColor} />
          <DetailCell label="Gender" value={val(basicInfo.gender)} cardBg={cardBg} textColor={textColor} mutedColor={mutedColor} />
          <DetailCell label="Date of Birth" value={formatDate(basicInfo.dateOfBirth)} cardBg={cardBg} textColor={textColor} mutedColor={mutedColor} />
          <DetailCell label="Height" value={val(basicInfo.height)} cardBg={cardBg} textColor={textColor} mutedColor={mutedColor} />
          <DetailCell label="Religion" value={val(basicInfo.religion)} cardBg={cardBg} textColor={textColor} mutedColor={mutedColor} />
          <DetailCell label="Caste" value={val(basicInfo.caste)} cardBg={cardBg} textColor={textColor} mutedColor={mutedColor} />
          <DetailCell label="Mother Tongue" value={val(basicInfo.motherTongue)} cardBg={cardBg} textColor={textColor} mutedColor={mutedColor} />
          <DetailCell label="Diet" value={val(basicInfo.diet)} cardBg={cardBg} textColor={textColor} mutedColor={mutedColor} />
        </div>
      </section>

      {/* ─── Astrological Details (Dark card style) ─── */}
      <section className="mx-auto max-w-5xl px-4 pb-12 sm:px-6">
        <div
          className="rounded-2xl p-6 sm:p-8"
          style={{
            backgroundColor: dark ? '#1e1814' : '#2a2220',
            border: `1px solid ${dark ? '#3d3028' : '#3d3530'}`,
          }}
        >
          <h3 className="mb-5 flex items-center gap-2 font-serif text-xl font-bold text-white">
            <span style={{ color: GOLD }}>✨</span> Astrological Details
          </h3>
          <div className="space-y-0">
            <AstroRow label="Rashi:" value={val(basicInfo.rashi)} />
            <AstroRow label="Gotra:" value={val(basicInfo.gotra)} />
            <AstroRow label="Nakshatra:" value={val(basicInfo.nakshatra)} />
            <AstroRow label="Manglik Status:" value={val(basicInfo.manglik)} />
          </div>
        </div>
      </section>

      {/* ─── Hobbies, Interests & Lifestyle ─── */}
      {(hobbies.length > 0 || interests.length > 0 || lifestyle.length > 0) && (
        <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
          <h2 className="mb-8 text-center font-serif text-2xl font-bold" style={{ color: textColor }}>
            Hobbies &amp; Interests
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hobbies.length > 0 && (
              <TagGroup
                title="Hobbies"
                icon="🎨"
                items={hobbies}
                cardBg={cardBg}
                borderColor={borderColor}
                textColor={textColor}
                mutedColor={mutedColor}
              />
            )}
            {interests.length > 0 && (
              <TagGroup
                title="Interests"
                icon="💡"
                items={interests}
                cardBg={cardBg}
                borderColor={borderColor}
                textColor={textColor}
                mutedColor={mutedColor}
              />
            )}
            {lifestyle.length > 0 && (
              <TagGroup
                title="Lifestyle"
                icon="🌿"
                items={lifestyle}
                cardBg={cardBg}
                borderColor={borderColor}
                textColor={textColor}
                mutedColor={mutedColor}
              />
            )}
          </div>
        </section>
      )}

      {/* ─── Quote ─── */}
      <section className="py-12 text-center">
        <blockquote className="mx-auto max-w-2xl px-4 font-serif text-2xl italic leading-relaxed sm:text-3xl" style={{ color: textColor }}>
          &ldquo;{aboutMe.tagline || 'Live with purpose, grow with grace.'}&rdquo;
        </blockquote>
        <div className="mt-5 flex items-center justify-center gap-2">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: GOLD }} />
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: MAROON }} />
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: GOLD }} />
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: MAROON }} />
        </div>
      </section>
    </>
  )
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function DetailCell({ label, value, cardBg, textColor, mutedColor }) {
  return (
    <div className="px-5 py-4" style={{ backgroundColor: cardBg }}>
      <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: mutedColor }}>
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold" style={{ color: textColor }}>
        {value}
      </p>
    </div>
  )
}

function AstroRow({ label, value }) {
  return (
    <div
      className="flex items-center justify-between py-3"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
    >
      <span className="text-sm font-semibold" style={{ color: GOLD }}>
        {label}
      </span>
      <span className="text-sm font-medium text-neutral-200">
        {value}
      </span>
    </div>
  )
}

function TagGroup({ title, icon, items, cardBg, borderColor, textColor, mutedColor }) {
  return (
    <div
      className="rounded-2xl p-5"
      style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}` }}
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="text-lg">{icon}</span>
        <h4 className="text-sm font-bold" style={{ color: textColor }}>{title}</h4>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <span
            key={i}
            className="rounded-full border px-3 py-1 text-xs font-medium"
            style={{ borderColor, color: MAROON }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
