import { Link } from 'react-router-dom'

const variants = {
  primary:
    'bg-brand-600 text-white hover:bg-brand-700 focus:ring-brand-300 shadow-sm',
  secondary:
    'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-200',
  ghost: 'bg-transparent text-brand-700 hover:bg-brand-50 focus:ring-brand-200',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-300',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
}

/**
 * Polymorphic button: renders an <a> (external), <Link> (internal `to`) or a
 * <button>. Shares consistent styling across the app.
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  className = '',
  disabled,
  ...props
}) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-lg font-medium transition focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${sizes[size]} ${className}`

  if (to) {
    return (
      <Link to={to} className={cls} {...props}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={cls} {...props}>
        {children}
      </a>
    )
  }
  return (
    <button className={cls} disabled={disabled} {...props}>
      {children}
    </button>
  )
}
