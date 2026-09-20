import { useFavorites } from '@/hooks/use-favorites'

// Round heart in the corner of a property card: saves / unsaves the property on this device
const HeartButton = ({ propertyId, className = '' }: { propertyId: string; className?: string }) => {
  const { isSaved, toggle } = useFavorites()
  const saved = isSaved(propertyId)

  return (
    <button
      type="button"
      aria-label={saved ? 'Remove from saved properties' : 'Save property'}
      aria-pressed={saved}
      onClick={e => {
        e.stopPropagation()
        toggle(propertyId)
      }}
      className={`flex h-10 w-10 items-center justify-center rounded-full bg-white/90 dark:bg-gray-900/80 shadow-md backdrop-blur transition-transform hover:scale-110 active:scale-90 ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        className={`h-5 w-5 transition-all duration-300 ${saved ? 'fill-red-500 stroke-red-500 scale-110' : 'fill-transparent stroke-gray-600 dark:stroke-gray-300'}`}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
      </svg>
    </button>
  )
}

export default HeartButton
