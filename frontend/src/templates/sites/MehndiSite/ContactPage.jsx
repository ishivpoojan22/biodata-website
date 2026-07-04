import { fullName, location, val } from '../../templateUtils'
import { GOLD, MAROON } from './theme'

export default function ContactPage({
  partner,
  contact,
  basicInfo,
  dark,
  textColor,
  mutedColor,
  cardBg,
  borderColor,
}) {
  const city = basicInfo.city || basicInfo.state || 'India'
  const mapQuery = encodeURIComponent(location(basicInfo))

  return (
    <>
      {/* ─── Let's Connect + Form ─── */}
      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          {/* Left — info */}
          <div>
            <h1 className="font-serif text-3xl font-bold sm:text-4xl" style={{ color: textColor }}>
              Let&rsquo;s Connect
            </h1>
            <p className="mt-4 max-w-sm text-sm leading-relaxed" style={{ color: mutedColor }}>
              We believe that every great union begins with a simple conversation. Whether you have questions about family background or wish to schedule a meeting, we welcome your inquiry.
            </p>

            <div className="mt-8 space-y-5">
              {contact.email && (
                <ContactItem
                  icon="✉"
                  label="Email Address"
                  value={contact.email}
                  href={`mailto:${contact.email}`}
                  textColor={textColor}
                  mutedColor={mutedColor}
                />
              )}
              {contact.phone && (
                <ContactItem
                  icon="📞"
                  label="Phone Number"
                  value={contact.phone}
                  href={`tel:${contact.phone}`}
                  textColor={textColor}
                  mutedColor={mutedColor}
                />
              )}
              <ContactItem
                icon="📍"
                label="Location"
                value={location(basicInfo)}
                textColor={textColor}
                mutedColor={mutedColor}
              />
              {contact.whatsapp && (
                <ContactItem
                  icon="💬"
                  label="WhatsApp"
                  value={contact.whatsapp}
                  href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`}
                  textColor={textColor}
                  mutedColor={mutedColor}
                />
              )}
            </div>
          </div>

          {/* Right — form */}
          <div
            className="rounded-2xl p-6 sm:p-8"
            style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}` }}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.target)
                const name = formData.get('name')
                const email = formData.get('email')
                const message = formData.get('message')
                // Open mailto as fallback
                window.location.href = `mailto:${contact.email || ''}?subject=Marriage Inquiry from ${name}&body=${encodeURIComponent(message)}%0A%0AFrom: ${name} (${email})`
              }}
              className="space-y-5"
            >
              <FormField
                label="Full Name"
                name="name"
                placeholder="Your Name"
                type="text"
                dark={dark}
                borderColor={borderColor}
                textColor={textColor}
                mutedColor={mutedColor}
                cardBg={cardBg}
              />
              <FormField
                label="Email Address"
                name="email"
                placeholder="email@example.com"
                type="email"
                dark={dark}
                borderColor={borderColor}
                textColor={textColor}
                mutedColor={mutedColor}
                cardBg={cardBg}
              />
              <div>
                <label className="mb-1.5 block text-xs font-medium" style={{ color: mutedColor }}>
                  Inquiry Type
                </label>
                <select
                  name="type"
                  className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition focus:ring-2"
                  style={{
                    borderColor,
                    backgroundColor: dark ? '#1a1410' : '#fff',
                    color: textColor,
                    focusRingColor: GOLD,
                  }}
                >
                  <option>Marriage Inquiry</option>
                  <option>Family Background</option>
                  <option>Schedule Meeting</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium" style={{ color: mutedColor }}>
                  Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="How can we help you?"
                  className="w-full resize-none rounded-lg border px-4 py-2.5 text-sm outline-none transition focus:ring-2"
                  style={{
                    borderColor,
                    backgroundColor: dark ? '#1a1410' : '#fff',
                    color: textColor,
                  }}
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                style={{ backgroundColor: GOLD }}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ─── Map Section ─── */}
      <section className="mx-auto max-w-5xl px-4 pb-14 sm:px-6">
        <div
          className="overflow-hidden rounded-2xl"
          style={{ border: `1px solid ${borderColor}` }}
        >
          <iframe
            title={`Map of ${city}`}
            src={`https://maps.google.com/maps?q=${mapQuery}&t=&z=12&ie=UTF8&iwloc=&output=embed`}
            className="h-64 w-full sm:h-80"
            style={{ border: 0, filter: dark ? 'invert(0.9) hue-rotate(180deg)' : 'none' }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      {/* ─── Partner Preferences (below map) ─── */}
      {(partner.preferredAge || partner.preferredEducation || partner.preferredOccupation || partner.preferredLocation) && (
        <section className="mx-auto max-w-5xl px-4 pb-14 sm:px-6">
          <h2 className="mb-6 text-center font-serif text-2xl font-bold" style={{ color: textColor }}>
            Partner Preferences
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {partner.preferredAge && (
              <PrefCard label="Preferred Age" value={partner.preferredAge} cardBg={cardBg} borderColor={borderColor} textColor={textColor} mutedColor={mutedColor} />
            )}
            {partner.preferredEducation && (
              <PrefCard label="Education" value={partner.preferredEducation} cardBg={cardBg} borderColor={borderColor} textColor={textColor} mutedColor={mutedColor} />
            )}
            {partner.preferredOccupation && (
              <PrefCard label="Occupation" value={partner.preferredOccupation} cardBg={cardBg} borderColor={borderColor} textColor={textColor} mutedColor={mutedColor} />
            )}
            {partner.preferredLocation && (
              <PrefCard label="Location" value={partner.preferredLocation} cardBg={cardBg} borderColor={borderColor} textColor={textColor} mutedColor={mutedColor} />
            )}
          </div>
        </section>
      )}
    </>
  )
}

function ContactItem({ icon, label, value, href, textColor, mutedColor }) {
  const content = (
    <div className="flex items-start gap-3">
      <span
        className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-base"
        style={{ backgroundColor: `${MAROON}10`, color: MAROON }}
      >
        {icon}
      </span>
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: mutedColor }}>
          {label}
        </p>
        <p className="mt-0.5 text-sm font-semibold" style={{ color: textColor }}>
          {value}
        </p>
      </div>
    </div>
  )

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="block transition hover:opacity-80">
        {content}
      </a>
    )
  }
  return content
}

function FormField({ label, name, placeholder, type, dark, borderColor, textColor, mutedColor, cardBg }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium" style={{ color: mutedColor }}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition focus:ring-2"
        style={{
          borderColor,
          backgroundColor: dark ? '#1a1410' : '#fff',
          color: textColor,
        }}
      />
    </div>
  )
}

function PrefCard({ label, value, cardBg, borderColor, textColor, mutedColor }) {
  return (
    <div
      className="rounded-xl p-4 text-center"
      style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}` }}
    >
      <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: mutedColor }}>
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold" style={{ color: textColor }}>
        {value}
      </p>
    </div>
  )
}
