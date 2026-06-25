'use client'

// ============================================================
// Admin Layout
// Sidebar navigation + login guard for all /admin/* pages
// ============================================================

import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  LayoutDashboard,
  Pizza,
  Star,
  MessageSquareText,
  HelpCircle,
  Tag,
  Package,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Menu Items', icon: Pizza },
  { href: '/admin/featured', label: 'Featured Dishes', icon: Star },
  { href: '/admin/reviews', label: 'Reviews', icon: MessageSquareText },
  { href: '/admin/faqs', label: 'FAQs', icon: HelpCircle },
  { href: '/admin/coupons', label: 'Coupons', icon: Tag },
  { href: '/admin/orders', label: 'Orders', icon: Package },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [authed, setAuthed] = useState<boolean | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    fetch('/api/admin/login').then(async (r) => {
      const data = await r.json()
      if (!data.authenticated) router.push('/admin/login')
      else setAuthed(true)
    })
  }, [router])

  if (pathname === '/admin/login') return <>{children}</>
  if (authed !== true) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="size-8 animate-spin rounded-full border-4 border-border border-t-accent" />
      </div>
    )
  }

  async function handleLogout() {
    await fetch('/api/admin/login', { method: 'DELETE' })
    router.push('/admin/login')
  }

  return (
    <div className="flex min-h-screen bg-background">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-border bg-card transition-transform lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-5">
          <Link href="/admin" className="font-heading text-lg font-bold text-foreground">
            Tortello Admin
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X className="size-5" />
          </button>
        </div>
        <nav className="space-y-1 p-3">
          {navItems.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <item.icon className="size-4.5" />
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 border-t border-border p-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <LogOut className="size-4.5" />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-border bg-card/90 px-5 backdrop-blur">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
            <Menu className="size-5" />
          </button>
          <h1 className="font-heading text-lg font-semibold">
            {navItems.find((n) => n.href === pathname)?.label ?? 'Admin'}
          </h1>
        </header>
        <main className="flex-1 p-5">{children}</main>
      </div>
    </div>
  )
}
