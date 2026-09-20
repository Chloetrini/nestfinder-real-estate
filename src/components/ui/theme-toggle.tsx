import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/context/theme-context'

interface ThemeToggleProps {
  className?: string
}

// Sun/moon button that switches between light and dark mode
const ThemeToggle = ({ className = '' }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-current/20 transition-colors hover:bg-black/5 dark:hover:bg-white/10 ${className}`}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}

export default ThemeToggle
