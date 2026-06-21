import { useState } from 'react'
import { fullName } from '../templateUtils'
import { buildTheme } from '../../components/profile/theme'
import {
  AboutSection,
  CareerSection,
  ContactSection,
  FamilySection,
  GallerySection,
  HomeSection,
  PartnerSection,
} from '../../components/profile/sections'

const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'career', label: 'Career' },
  { id: 'family', label: 'Family' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact' },
]

/**
 * CLASSIC — dark, ceremonial, gold accent. Architecture: top navbar +
 * centered hero + quick-facts bar + floating bottom pill nav. Supports a
 * dark/light toggle.
 */
export default function ClassicSite({
  data = {},
  templateId = 'classic',
  initialMode = 'dark',
  embedded = false,
}) {
  const [mode, setMode] = useState(initialMode)
  const [active, setActive] = useState('home')
  const t = buildTheme(mode, templateId)

  const go = (id) => {
    setActive(id)
    if (!embedded) window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const toggleMode = () => setMode((m) => (m === 'dark' ? 'light' : 'dark'))

  const renderSection = () => {
    switch (active) {
      case 'about':
        return <AboutSection data={data} t={t} />
      case 'career':
        return <CareerSection data={data} t={t} />
      case 'family':
        return <FamilySection data={data} t={t} />
      case 'gallery':
        return <GallerySection data={data} t={t} />
      case 'contact':
        return (
          <>
            <PartnerSection data={data} t={t} />
            <ContactSection data={data} t={t} />
          </>
        )
      case 'home':
      default:
        return (
          <HomeSection
            data={data}
            t={t}
            onContact={() => go('contact')}
            onDownload={() => window.print()}
          />
        )
    }
  }

  return (
    <div
      className={`relative ${embedded ? 'min-h-full' : 'min-h-screen'} ${t.page} ${t.text} transition-colors`}
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {/* Top navbar */}
      <header
        className={`sticky top-0 z-30 border-b backdrop-blur ${t.navBar} no-print`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <button
            onClick={() => go('home')}
            className={`font-serif text-lg font-semibold ${t.text}`}
          >
            {fullName(data.basicInfo)}
          </button>

          <div className="hidden items-center gap-6 md:flex">
            {NAV.filter((n) => n.id !== 'home').map((n) => (
              <button
                key={n.id}
                onClick={() => go(n.id)}
                className={`text-sm font-medium transition ${t.navLink}`}
                style={active === n.id ? { color: t.accent } : undefined}
              >
                {n.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className={`text-sm ${t.muted}`} title="Language">
              हिं
            </span>
            <button
              onClick={toggleMode}
              aria-label="Toggle theme"
              className={`text-lg transition ${t.navLink}`}
            >
              {mode === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
        </nav>
      </header>

      {/* Active section */}
      <div className="pb-24">{renderSection()}</div>

      {/* Floating bottom nav */}
      <div
        className={`${embedded ? 'sticky' : 'fixed'} inset-x-0 bottom-4 z-30 flex justify-center px-4 no-print`}
      >
        <div
          className={`flex flex-wrap justify-center gap-1 rounded-full border p-1 shadow-xl backdrop-blur ${t.bottomNav}`}
        >
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => go(n.id)}
              className="rounded-full px-3 py-1.5 text-xs font-medium transition sm:px-4 sm:text-sm"
              style={
                active === n.id
                  ? { backgroundColor: t.accent, color: '#fff' }
                  : undefined
              }
            >
              {n.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
