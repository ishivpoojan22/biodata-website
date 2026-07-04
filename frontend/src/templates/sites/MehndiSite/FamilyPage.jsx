import { val } from '../../templateUtils'
import { GOLD, GOLD_LIGHT, MAROON } from './theme'

export default function FamilyPage({
  family,
  basicInfo,
  dark,
  textColor,
  mutedColor,
  cardBg,
  borderColor,
}) {
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
          Ancestry &amp; Roots
        </p>
        <h1 className="mx-auto mt-4 max-w-xl font-serif text-3xl font-bold leading-snug text-white sm:text-4xl">
          Our Family Heritage
        </h1>
        <p className="mx-auto mt-4 max-w-md font-serif text-sm italic text-neutral-300">
          &ldquo;A family is like a tree, its branches grow in all directions, yet its roots remain as one.&rdquo;
        </p>
        <div className="mt-4 text-lg" style={{ color: GOLD }}>⚜</div>
      </section>

      {/* ─── Parent Cards ─── */}
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Father */}
          <div
            className="flex gap-4 rounded-2xl p-5"
            style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}` }}
          >
            <div className="flex-shrink-0">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold text-white"
                style={{ background: `linear-gradient(135deg, ${GOLD_LIGHT}, ${GOLD})` }}
              >
                👨
              </div>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: GOLD }}>
                Head of Family
              </p>
              <h3 className="mt-1 font-serif text-lg font-bold" style={{ color: textColor }}>
                {val(family.fatherName, 'Father\'s Name')}
              </h3>
              <p className="mt-1 text-sm leading-relaxed" style={{ color: mutedColor }}>
                {val(family.fatherOccupation, 'Occupation not specified')}. A man of principles who instilled the value of integrity and education in his children.
              </p>
              <p className="mt-2 text-xs font-medium" style={{ color: MAROON }}>
                ♡ {val(family.familyType, 'Family')}
              </p>
            </div>
          </div>

          {/* Mother */}
          <div
            className="flex gap-4 rounded-2xl p-5"
            style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}` }}
          >
            <div className="flex-shrink-0">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold text-white"
                style={{ background: `linear-gradient(135deg, ${GOLD_LIGHT}, ${GOLD})` }}
              >
                👩
              </div>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: GOLD }}>
                The Matriarch
              </p>
              <h3 className="mt-1 font-serif text-lg font-bold" style={{ color: textColor }}>
                {val(family.motherName, 'Mother\'s Name')}
              </h3>
              <p className="mt-1 text-sm leading-relaxed" style={{ color: mutedColor }}>
                {val(family.motherOccupation, 'Homemaker')}. The emotional anchor of the family, known for her culinary heritage and preservation of spiritual traditions.
              </p>
              <p className="mt-2 text-xs font-medium" style={{ color: MAROON }}>
                ♡ Traditional Values
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Core Values + Siblings ─── */}
      <section className="mx-auto max-w-5xl px-4 pb-12 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* Core Values */}
          <div
            className="rounded-2xl p-6"
            style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}` }}
          >
            <h3 className="mb-5 flex items-center gap-2 font-serif text-xl font-bold" style={{ color: textColor }}>
              <span style={{ color: GOLD }}>✦</span> Our Core Values
            </h3>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <ValueItem
                icon="🤝"
                title="Family Unity"
                desc="We believe in staying connected across generations, celebrating every milestone together with grand traditions."
                textColor={textColor}
                mutedColor={mutedColor}
              />
              <ValueItem
                icon="📚"
                title="Lifelong Learning"
                desc="Education is viewed as the greatest wealth; our lineage prides itself on academic and professional excellence."
                textColor={textColor}
                mutedColor={mutedColor}
              />
              <ValueItem
                icon="🕉"
                title="Spiritual Roots"
                desc="Maintaining a balance between modern ambition and traditional spiritual practices is central to our lifestyle."
                textColor={textColor}
                mutedColor={mutedColor}
              />
              <ValueItem
                icon="🙏"
                title="Social Respect"
                desc="Honoring elders and contributing to the community is a legacy passed down from our forefathers."
                textColor={textColor}
                mutedColor={mutedColor}
              />
            </div>
          </div>

          {/* Siblings & Beyond */}
          <div
            className="rounded-2xl p-6"
            style={{
              background: dark
                ? 'linear-gradient(180deg, #2a1a16 0%, #3d2017 100%)'
                : 'linear-gradient(180deg, #4a2020 0%, #6b2f2f 100%)',
            }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-300">
              The New Generation
            </p>
            <h3 className="mt-1 font-serif text-xl font-bold text-white">
              Siblings &amp; Beyond
            </h3>

            <div className="mt-5 space-y-4">
              {family.siblings ? (
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 h-2 w-2 flex-shrink-0 rounded-full" style={{ backgroundColor: GOLD }} />
                  <div>
                    <p className="text-sm font-semibold text-white">{val(family.siblings)}</p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-neutral-300">No sibling details provided.</p>
              )}
            </div>

            <p className="mt-6 text-xs italic text-neutral-400">
              A family of professionals rooted in culture.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Preserving Traditions ─── */}
      <section
        className="py-14"
        style={{ backgroundColor: dark ? '#1a1410' : '#f5ede4' }}
      >
        <div className="mx-auto grid max-w-5xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[280px_1fr]">
          {/* Image / decorative visual */}
          <div className="relative flex justify-center">
            <div
              className="h-64 w-56 overflow-hidden rounded-2xl"
              style={{ background: `linear-gradient(180deg, ${GOLD}22, ${MAROON}22)` }}
            >
              <div className="flex h-full items-center justify-center text-5xl">🪔</div>
            </div>
            <span
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1.5 text-[10px] font-bold text-white"
              style={{ backgroundColor: MAROON }}
            >
              100+ Years of Heritage
            </span>
          </div>

          {/* Text content */}
          <div>
            <h2 className="font-serif text-2xl font-bold sm:text-3xl" style={{ color: MAROON }}>
              Preserving Traditions
            </h2>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: mutedColor }}>
              {family.about
                ? family.about
                : `Our family originates from ${val(basicInfo.city || basicInfo.state, 'our hometown')}, known for its rich cultural history. We celebrate all festivals with traditional fervor, often hosting large gatherings that bring distant relatives together.`}
            </p>

            <ul className="mt-5 space-y-2">
              <li className="flex items-start gap-2 text-sm" style={{ color: mutedColor }}>
                <span className="mt-0.5 h-2 w-2 flex-shrink-0 rounded-full" style={{ backgroundColor: GOLD }} />
                Annual family gatherings and pilgrimages
              </li>
              <li className="flex items-start gap-2 text-sm" style={{ color: mutedColor }}>
                <span className="mt-0.5 h-2 w-2 flex-shrink-0 rounded-full" style={{ backgroundColor: GOLD }} />
                Grand celebration of Diwali and Holi with ancestral recipes
              </li>
              <li className="flex items-start gap-2 text-sm" style={{ color: mutedColor }}>
                <span className="mt-0.5 h-2 w-2 flex-shrink-0 rounded-full" style={{ backgroundColor: GOLD }} />
                Monthly family &lsquo;Satsang&rsquo; and community service initiatives
              </li>
            </ul>

            {family.familyValues && (
              <div
                className="mt-5 rounded-xl p-4"
                style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}` }}
              >
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: GOLD }}>Our Values</p>
                <p className="mt-1 text-sm leading-relaxed" style={{ color: mutedColor }}>{family.familyValues}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── Quote ─── */}
      <section className="py-14 text-center">
        <blockquote className="mx-auto max-w-2xl px-4 font-serif text-2xl italic leading-relaxed sm:text-3xl" style={{ color: textColor }}>
          &ldquo;Building a future on the foundation of the past.&rdquo;
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

function ValueItem({ icon, title, desc, textColor, mutedColor }) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <span className="text-lg">{icon}</span>
        <h4 className="text-sm font-bold" style={{ color: textColor }}>{title}</h4>
      </div>
      <p className="mt-1 text-xs leading-relaxed" style={{ color: mutedColor }}>{desc}</p>
    </div>
  )
}
