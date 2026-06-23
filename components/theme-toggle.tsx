'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/components/providers'
import { cn } from '@/lib/utils'

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme()
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={cn(
        'grid size-9 place-items-center rounded-full border border-border bg-background/60 text-foreground transition-colors hover:bg-muted',
        className,
      )}
    >
      {theme === 'dark' ? (
        <Sun className="size-4" />
      ) : (
        <Moon className="size-4" />
      )}
    </button>
  )
}
