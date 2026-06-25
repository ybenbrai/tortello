// ============================================================
// Form Field
// Reusable input with label, used by checkout and contact pages
// ============================================================

export function FormField({
  label,
  name,
  type = 'text',
  required = true,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/30"
      />
    </div>
  )
}
