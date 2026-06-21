/**
 * Reusable, accessible form inputs shared by every profile section form.
 * Keeping them in one place ensures consistent styling and behaviour.
 */

const baseInput =
  'w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200 placeholder:text-gray-400'

function Label({ htmlFor, children, required }) {
  if (!children) return null
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1 block text-sm font-medium text-gray-700"
    >
      {children}
      {required && <span className="ml-0.5 text-brand-600">*</span>}
    </label>
  )
}

export function TextField({
  id,
  label,
  value = '',
  onChange,
  type = 'text',
  placeholder,
  required,
}) {
  return (
    <div>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className={baseInput}
      />
    </div>
  )
}

export function SelectField({
  id,
  label,
  value = '',
  onChange,
  options = [],
  placeholder = 'Select…',
  required,
}) {
  return (
    <div>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <select
        id={id}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className={baseInput}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => {
          const o = typeof opt === 'string' ? { value: opt, label: opt } : opt
          return (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export function TextAreaField({
  id,
  label,
  value = '',
  onChange,
  placeholder,
  rows = 3,
  hint,
}) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <textarea
        id={id}
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`${baseInput} resize-y`}
      />
      {hint && <p className="mt-1 text-xs text-gray-400">{hint}</p>}
    </div>
  )
}
