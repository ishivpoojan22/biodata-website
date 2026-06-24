import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Button from '../ui/Button'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/templates', label: 'Templates' },
  { to: '/create', label: 'Create' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition ${
      isActive ? 'text-brand-600' : 'text-gray-600 hover:text-brand-600'
    }`

  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/80 backdrop-blur no-print">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
            ❤
          </span>
          <span className="font-serif text-lg font-semibold text-gray-900">
            Biodata Builder
          </span>
        </Link>

        <div className="hidden items-center gap-7 sm:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
          <Button to="/templates" size="sm">
            Get Started
          </Button>
        </div>

        <button
          className="sm:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className="text-2xl text-gray-700">{open ? '✕' : '☰'}</span>
        </button>
      </nav>

      {open && (
        <div className="border-t border-gray-100 bg-white px-4 py-3 sm:hidden">
          <div className="flex flex-col gap-3">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </NavLink>
            ))}
            <Button to="/templates" size="sm" onClick={() => setOpen(false)}>
              Get Started
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
