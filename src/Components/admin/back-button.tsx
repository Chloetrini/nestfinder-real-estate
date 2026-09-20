import { useNavigate } from 'react-router-dom'

// "Back" for the admin area: goes to the previous page, or to a sensible fallback when the page was opened directly
const BackButton = ({ fallback = '/adminPage/dashboard', label = 'Back' }: { fallback?: string; label?: string }) => {
  const navigate = useNavigate()

  const goBack = () => {
    // history.state.idx is 0 on the first page of a visit: nothing to go back to
    const idx = (window.history.state as { idx?: number } | null)?.idx ?? 0
    if (idx > 0) navigate(-1)
    else navigate(fallback)
  }

  return (
    <button
      type="button"
      onClick={goBack}
      className="group inline-flex items-center gap-2 rounded-lg px-3 py-2 text-[14px] font-medium text-[#1A3C34] dark:text-[#8fd3c0] transition-colors hover:bg-[#D7FFF6] dark:hover:bg-[#0f3b32]"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 18l-6-6 6-6" />
      </svg>
      {label}
    </button>
  )
}

export default BackButton
