import { toList } from '../../templateUtils'
import { SectionHeading } from './components'

export default function GalleryPage({
  photos,
  dark,
  textColor,
  mutedColor,
  cardBg,
  borderColor,
}) {
  const gallery = toList(photos.gallery)

  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <SectionHeading title="Gallery" textColor={textColor} />
      {gallery.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {gallery.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Gallery ${i + 1}`}
              className="aspect-square w-full rounded-2xl object-cover shadow-sm"
              style={{ border: `2px solid ${borderColor}` }}
            />
          ))}
        </div>
      ) : (
        <p className="text-center" style={{ color: mutedColor }}>No photos added yet.</p>
      )}
    </section>
  )
}
