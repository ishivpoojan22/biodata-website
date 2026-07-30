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
      isActive ? 'text-amber-700' : 'text-stone-600 hover:text-amber-600'
    }`

  return (
    <header className="sticky top-0 z-40 border-b border-amber-100 bg-[#FAFAF8]/90 backdrop-blur no-print">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-yellow-500 text-white shadow-sm shadow-amber-500/30 group-hover:shadow-md transition-shadow text-lg">
            ✤
          </span>
          <span className="font-serif text-2xl font-bold text-stone-900 tracking-wide">
            Shubh<span className="text-amber-600 font-medium">Vivah</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 sm:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
          <Button to="/templates" size="md" className="!bg-gradient-to-r !from-amber-600 !to-yellow-500 !text-white hover:!from-amber-700 hover:!to-yellow-600 !border-none shadow-sm shadow-amber-500/20 px-6 py-2.5" variant="ghost">
            Get Started
          </Button>
        </div>

        <button
          className="sm:hidden flex items-center justify-center h-10 w-10 rounded-md hover:bg-amber-50 text-stone-700 transition-colors"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className="text-xl">{open ? '✕' : '☰'}</span>
        </button>
      </nav>

      {open && (
        <div className="border-t border-amber-100 bg-[#FAFAF8] px-4 py-4 sm:hidden shadow-lg absolute w-full left-0">
          <div className="flex flex-col gap-2">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md font-medium transition ${
                    isActive
                      ? 'bg-amber-50 text-amber-700'
                      : 'text-stone-600 hover:bg-amber-50 hover:text-amber-600'
                  }`
                }
                onClick={() => setOpen(false)}
              >
                {l.label}
              </NavLink>
            ))}
            <div className="mt-2 pt-2 border-t border-amber-50 px-3">
              <Button
                to="/templates"
                size="md"
                className="!bg-gradient-to-r !from-amber-600 !to-yellow-500 !text-white !border-none shadow-sm shadow-amber-500/20 w-full justify-center"
                variant="ghost"
                onClick={() => setOpen(false)}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
