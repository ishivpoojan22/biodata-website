import { useState } from 'react'
import { fullName } from '../../templateUtils'
import { GOLD, MAROON, NAV, getThemeTokens } from './theme'
import HomePage from './HomePage'
import AboutPage from './AboutPage'
import CareerPage from './CareerPage'
import FamilyPage from './FamilyPage'
import GalleryPage from './GalleryPage'
import ContactPage from './ContactPage'

/**
 * MEHNDI BAGH — warm cream biodata site with golden accents.
 * Architecture: sticky navbar, page-based routing, elegant footer.
 */
export default function MehndiSite({ data = {}, embedded = false }) {
  const [active, setActive] = useState('home')
  const [mode, setMode] = useState('light')
  const {
    basicInfo = {},
    education = {},
    family = {},
    aboutMe = {},
    partner = {},
    contact = {},
    photos = {},
  } = data

  const go = (id) => {
    setActive(id)
    if (!embedded) window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleMode = () => setMode((m) => (m === 'light' ? 'dark' : 'light'))
  const { dark, bg, textColor, mutedColor, cardBg, borderColor, navBg } = getThemeTokens(mode)

  // Common props passed to every page component
  const pageProps = {
    basicInfo,
    education,
    family,
    aboutMe,
    partner,
    contact,
    photos,
    go,
    dark,
    textColor,
    mutedColor,
    cardBg,
    borderColor,
  }

  const renderPage = () => {
    switch (active) {
      case 'about':
        return <AboutPage {...pageProps} />
      case 'career':
        return <CareerPage {...pageProps} />
      case 'family':
        return <FamilyPage {...pageProps} />
      case 'gallery':
        return <GalleryPage {...pageProps} />
      case 'contact':
        return <ContactPage {...pageProps} />
      case 'home':
      default:
        return <HomePage {...pageProps} />
    }
  }

  return (
    <div
      className={embedded ? 'min-h-full' : 'min-h-screen'}
      style={{ backgroundColor: bg, color: textColor, fontFamily: "'Inter', sans-serif" }}
    >
      {/* ─── Navbar ─── */}
      <header
        className="sticky top-0 z-30 backdrop-blur no-print"
        style={{ backgroundColor: navBg, borderBottom: `1px solid ${borderColor}` }}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          {/* Logo + Name */}
          <button
            onClick={() => go('home')}
            className="flex items-center gap-2"
            style={{ color: textColor }}
          >
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
              style={{ backgroundColor: GOLD }}
            >
              {(basicInfo.firstName?.[0] || 'A').toUpperCase()}
            </span>
            <span className="font-serif text-lg font-semibold">
              {fullName(basicInfo)}
            </span>
          </button>

          {/* Nav Links */}
          <div className="hidden items-center gap-6 md:flex">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => go(n.id)}
                className="text-sm font-medium transition-colors"
                style={{
                  color: active === n.id ? MAROON : mutedColor,
                  textDecoration: active === n.id ? 'underline' : 'none',
                  textUnderlineOffset: '6px',
                  textDecorationColor: active === n.id ? MAROON : 'transparent',
                }}
              >
                {n.label}
              </button>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            <span className="text-sm" style={{ color: mutedColor }} title="Language">
              🌐
            </span>
            <button
              onClick={toggleMode}
              aria-label="Toggle theme"
              className="text-lg transition"
              style={{ color: mutedColor }}
            >
              {dark ? '☀️' : '🌙'}
            </button>
          </div>
        </nav>

        {/* Mobile nav */}
        <div className="flex flex-wrap justify-center gap-1 border-t px-2 py-2 md:hidden" style={{ borderColor }}>
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => go(n.id)}
              className="rounded-full px-3 py-1 text-xs font-medium"
              style={{
                backgroundColor: active === n.id ? MAROON : 'transparent',
                color: active === n.id ? '#fff' : mutedColor,
              }}
            >
              {n.label}
            </button>
          ))}
        </div>
      </header>

      {/* ─── Page Content ─── */}
      <main>{renderPage()}</main>

      {/* ─── Footer ─── */}
      <footer
        className="mt-16 border-t py-10 text-center no-print"
        style={{ borderColor, backgroundColor: dark ? '#151010' : '#faf5ee' }}
      >
        <div className="mx-auto max-w-4xl px-4">
          <span
            className="mx-auto flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
            style={{ backgroundColor: GOLD }}
          >
            {(basicInfo.firstName?.[0] || 'A').toUpperCase()}
          </span>
          <p className="mt-3 font-serif text-lg font-semibold" style={{ color: MAROON }}>
            {fullName(basicInfo)}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm" style={{ color: mutedColor }}>
            <span className="cursor-pointer underline underline-offset-2">Privacy Policy</span>
            <span className="cursor-pointer underline underline-offset-2">Terms of Service</span>
            <button onClick={() => window.print()} className="cursor-pointer underline underline-offset-2">
              PDF Download
            </button>
          </div>
          <p className="mt-4 text-xs" style={{ color: mutedColor }}>
            &copy; {new Date().getFullYear()} {fullName(basicInfo)}. All rights reserved. Built with tradition and technology.
          </p>
        </div>
      </footer>
    </div>
  )
}
