import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Logo({
  className,
  showText = true,
}: {
  className?: string
  showText?: boolean
}) {
  return (
    <Link
      href="/"
      className={cn('flex items-center gap-2', className)}
      aria-label="Tortello home"
    >
      <span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground">
        <svg
          viewBox="0 0 24 24"
          className="size-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3c2.5 3 2.5 6 0 9s-2.5 6 0 9" />
          <path d="M3.5 9.5c3 2 6.5 2 9 0s5.5-2 8 0" />
        </svg>
      </span>
      {showText && (
        <span className="font-heading text-xl font-semibold tracking-tight">
          Tortello
        </span>
      )}
    </Link>
  )
}
