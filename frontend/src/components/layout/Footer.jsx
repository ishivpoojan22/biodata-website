import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white no-print">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-gray-500 sm:flex-row">
        <p>
          © {new Date().getFullYear()} Marriage Biodata Builder. Made with ❤.
        </p>
        <div className="flex gap-5">
          <Link to="/templates" className="hover:text-brand-600">
            Templates
          </Link>
          <Link to="/create" className="hover:text-brand-600">
            Create Profile
          </Link>
        </div>
      </div>
    </footer>
  )
}
