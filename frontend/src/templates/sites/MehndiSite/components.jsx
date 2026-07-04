/**
 * Mehndi Bagh — shared presentational components used across pages.
 */
import { GOLD } from './theme'

/** Centered section heading with a gold underline bar. */
export function SectionHeading({ title, textColor }) {
  return (
    <div className="mb-8 text-center">
      <h2 className="font-serif text-3xl font-bold sm:text-4xl" style={{ color: textColor }}>
        {title}
      </h2>
      <div className="mx-auto mt-3 h-1 w-10 rounded-full" style={{ backgroundColor: GOLD }} />
    </div>
  )
}

/** Horizontal grid of stat cells (used in At a Glance, etc). */
export function DetailGrid({ rows, cardBg, borderColor, textColor, mutedColor }) {
  return (
    <div
      className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl sm:grid-cols-3 lg:grid-cols-5"
      style={{ backgroundColor: borderColor }}
    >
      {rows.map((r) => (
        <div key={r.label} className="px-4 py-5 text-center" style={{ backgroundColor: cardBg }}>
          <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: mutedColor }}>
            {r.label}
          </p>
          <p className="mt-1 text-base font-semibold sm:text-lg" style={{ color: textColor }}>
            {r.value}
          </p>
        </div>
      ))}
    </div>
  )
}

/** Vertical list of label→value rows in a rounded card. */
export function DetailList({ rows, cardBg, borderColor, textColor, mutedColor }) {
  return (
    <div
      className="overflow-hidden rounded-2xl"
      style={{ border: `1px solid ${borderColor}`, backgroundColor: cardBg }}
    >
      {rows.map((r, i) => (
        <div
          key={r.label}
          className="flex items-center justify-between px-5 py-4"
          style={i < rows.length - 1 ? { borderBottom: `1px solid ${borderColor}` } : {}}
        >
          <span className="text-sm font-medium" style={{ color: mutedColor }}>
            {r.label}
          </span>
          <span className="text-sm font-semibold" style={{ color: textColor }}>
            {r.value}
          </span>
        </div>
      ))}
    </div>
  )
}
