import { Star } from 'lucide-react'
import { useSetFeatured } from '@/hooks/admin/use-admin'
import type { Property } from '@/types/property'

// One click to feature or unfeature a property. Featured properties are the ones shown in the home page's
// "Featured Properties" section and in the photo collage at the top of the home page.
const FeatureButton = ({ property, variant = 'icon' }: { property: Property; variant?: 'icon' | 'full' }) => {
  const setFeatured = useSetFeatured()
  const on = property.isFeatured
  const disabled = setFeatured.isPending || property.isDraft
  const label = property.isDraft ? 'Publish this property before featuring it' : on ? 'Remove from featured' : 'Feature on the home page'

  const toggle = () => setFeatured.mutate({ id: property._id, isFeatured: !on })
  const failed = setFeatured.isError ? 'Could not update, please try again' : null

  if (variant === 'full') {
    return (
      <button
        type="button"
        onClick={toggle}
        disabled={disabled}
        title={label}
        className={`inline-flex items-center gap-2 rounded-[10px] border px-5 py-3 font-semibold transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 ${
          on
            ? 'border-[#F4A261] bg-[#F4A261]/15 text-[#b45d1a] dark:text-[#F4A261]'
            : 'border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-200'
        }`}
      >
        <Star size={18} className={on ? 'fill-[#F4A261] text-[#F4A261]' : ''} aria-hidden="true" />
        {setFeatured.isPending ? 'Saving...' : on ? 'Featured' : 'Make featured'}
        {failed && <span className="text-[12px] font-normal text-red-500">{failed}</span>}
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={disabled}
      title={failed ?? label}
      aria-label={label}
      aria-pressed={on}
      className="rounded-full p-1.5 transition-transform hover:scale-125 disabled:cursor-not-allowed disabled:opacity-40"
    >
      <Star size={20} className={failed ? 'text-red-500' : on ? 'fill-[#F4A261] text-[#F4A261]' : 'text-gray-400 dark:text-gray-500'} aria-hidden="true" />
    </button>
  )
}

export default FeatureButton
