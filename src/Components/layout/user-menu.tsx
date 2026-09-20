import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, Heart, LayoutDashboard, LogOut, Mail } from 'lucide-react'
import { useAuth } from '@/context/auth-context'
import { useFavorites } from '@/hooks/use-favorites'

// Signed-in menu in the navbar: your name and avatar open a dropdown with your links and Log out
const UserMenu = ({ onLogout }: { onLogout: () => void }) => {
  const { user, isAdmin } = useAuth()
  const { count } = useFavorites()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Close on outside click or Escape
  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const firstName = user.name.split(' ')[0] || 'Account'
  const initial = (user.name[0] || '?').toUpperCase()

  const item =
    'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] text-[#0A1916] dark:text-gray-100 transition-colors hover:bg-[#D7FFF6] dark:hover:bg-[#0f3b32]'

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full border border-[#1A3C34]/25 dark:border-[#8fd3c0]/30 py-1.5 pl-1.5 pr-3 transition-colors hover:bg-[#D7FFF6] dark:hover:bg-[#0f3b32]"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1A3C34] dark:bg-[#24574a] text-[14px] font-bold text-white">{initial}</span>
        <span className="max-w-[110px] truncate text-[15px] font-medium text-[#1A3C34] dark:text-[#8fd3c0]">{firstName}</span>
        <ChevronDown size={16} className={`text-[#1A3C34] dark:text-[#8fd3c0] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div role="menu" className="absolute right-0 top-full z-50 mt-3 w-64 origin-top-right rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-2 shadow-2xl animate-fade-up">
          <div className="mb-1 border-b border-gray-100 dark:border-gray-800 px-3 pb-3 pt-2">
            <p className="flex items-center gap-2 font-bold text-[#0A1916] dark:text-gray-100">
              <span className="truncate">{user.name}</span>
              {isAdmin && <span className="rounded bg-[#F4A261] px-2 py-0.5 text-[11px] font-bold text-[#1A3C34]">Admin</span>}
            </p>
            <p className="flex items-center gap-1.5 truncate text-[13px] text-gray-500 dark:text-gray-400">
              <Mail size={13} className="shrink-0" />
              <span className="truncate">{user.email}</span>
            </p>
          </div>

          {isAdmin && (
            <Link to="/adminPage/dashboard" role="menuitem" onClick={() => setOpen(false)} className={item}>
              <LayoutDashboard size={18} className="text-[#4F887B]" /> Admin dashboard
            </Link>
          )}
          <Link to="/saved" role="menuitem" onClick={() => setOpen(false)} className={item}>
            <Heart size={18} className="text-[#4F887B]" /> Saved properties
            {count > 0 && <span className="ml-auto rounded-full bg-[#F4A261] px-2 text-[12px] font-bold leading-5 text-[#1A3C34]">{count}</span>}
          </Link>

          <div className="my-1 border-t border-gray-100 dark:border-gray-800" />
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setOpen(false)
              onLogout()
            }}
            className={`${item} !text-red-600 dark:!text-red-400 hover:!bg-red-50 dark:hover:!bg-red-900/20`}
          >
            <LogOut size={18} /> Log out
          </button>
        </div>
      )}
    </div>
  )
}

export default UserMenu
