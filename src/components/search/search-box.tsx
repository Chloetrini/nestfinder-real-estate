import { useEffect, useId, useMemo, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import { Building2, MapPin, Search, Tag } from 'lucide-react'
import { useProperties } from '@/hooks/properties/use-properties'
import { useDebouncedValue } from '@/hooks/use-debounced-value'
import { optimizeImage } from '@/lib/image'

export type Suggestion =
  | { kind: 'property'; id: string; label: string; hint: string; image?: string }
  | { kind: 'location'; label: string; hint: string }
  | { kind: 'type'; label: string; hint: string }

interface SearchBoxProps {
  value: string
  onChange: (value: string) => void
  /** Enter pressed (or the Search button) with nothing highlighted */
  onSubmit: (value: string) => void
  /** A suggestion was picked */
  onSelect: (suggestion: Suggestion) => void
  variant?: 'hero' | 'page'
  placeholder?: string
}

const words = (text: string) => text.toLowerCase().split(/\s+/).filter(Boolean)

// One search box for the whole site: type, and after a short pause matching homes, places and types appear underneath
const SearchBox = ({ value, onChange, onSubmit, onSelect, variant = 'page', placeholder = 'Search by name, area, city or type, e.g. Lekki villa' }: SearchBoxProps) => {
  const { data: properties = [] } = useProperties()
  const debounced = useDebouncedValue(value, 250)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)
  const wrapper = useRef<HTMLDivElement>(null)
  const listId = useId()

  const suggestions = useMemo<Suggestion[]>(() => {
    const w = words(debounced)
    if (!w.length) return []
    const matches = (text: string) => w.every(word => text.toLowerCase().includes(word))

    const homes: Suggestion[] = properties
      .filter(p => matches(`${p.propertyName} ${p.location.city} ${p.location.state} ${p.propertyType}`))
      .slice(0, 4)
      .map(p => ({ kind: 'property', id: p._id, label: p.propertyName, hint: `${p.location.city}, ${p.location.state} · ₦${p.price.toLocaleString()}`, image: p.images?.[0] }))

    const places = new Map<string, number>()
    const types = new Map<string, number>()
    for (const p of properties) {
      const city = p.location.city?.trim()
      const place = city ? `${city}, ${p.location.state}` : ''
      if (place && matches(place)) places.set(place, (places.get(place) ?? 0) + 1)
      if (p.propertyType && matches(p.propertyType)) types.set(p.propertyType, (types.get(p.propertyType) ?? 0) + 1)
    }
    const placeItems: Suggestion[] = [...places].slice(0, 3).map(([label, n]) => ({ kind: 'location', label, hint: `${n} ${n === 1 ? 'listing' : 'listings'}` }))
    const typeItems: Suggestion[] = [...types].slice(0, 2).map(([label, n]) => ({ kind: 'type', label, hint: `${n} ${n === 1 ? 'listing' : 'listings'}` }))

    return [...homes, ...placeItems, ...typeItems]
  }, [debounced, properties])

  // New results: start with nothing highlighted
  useEffect(() => setActive(-1), [suggestions])

  // Click anywhere else closes the list
  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!wrapper.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  const show = open && suggestions.length > 0
  const pick = (s: Suggestion) => {
    setOpen(false)
    onSelect(s)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') return setOpen(false)
    if (!suggestions.length) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setOpen(true)
      setActive(i => (i + 1) % suggestions.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive(i => (i <= 0 ? suggestions.length - 1 : i - 1))
    }
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (show && active >= 0) return pick(suggestions[active])
    setOpen(false)
    onSubmit(value.trim())
  }

  const isHero = variant === 'hero'
  const Icon = { property: Building2, location: MapPin, type: Tag }

  return (
    <div ref={wrapper} className="relative w-full">
      <form
        onSubmit={submit}
        role="search"
        className={
          isHero
            ? 'flex w-full items-center gap-2 rounded-[16px] border border-gray-200 bg-white p-2 shadow-[0_20px_50px_-20px_rgba(26,60,52,0.45)] dark:border-gray-800 dark:bg-gray-900'
            : 'relative w-full'
        }
      >
        {isHero ? (
          <MapPin size={20} className="ml-3 shrink-0 text-[#4F887B]" aria-hidden="true" />
        ) : (
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" aria-hidden="true" />
        )}
        <input
          value={value}
          onChange={e => {
            onChange(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          aria-label="Search properties"
          role="combobox"
          aria-expanded={show}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined}
          autoComplete="off"
          className={
            isHero
              ? 'h-[48px] min-w-0 flex-1 bg-transparent px-2 text-[15px] text-[#0A1916] outline-none placeholder:text-gray-400 dark:text-gray-100'
              : 'h-[52px] w-full rounded-[12px] border border-gray-200 bg-white pl-12 pr-4 text-[15px] text-[#0A1916] shadow-md outline-none transition-shadow focus:ring-2 focus:ring-[#1A3C34]/40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:ring-[#8fd3c0]/40'
          }
        />
        {isHero && (
          <button type="submit" className="flex h-[48px] shrink-0 items-center gap-2 rounded-[12px] bg-[#1A3C34] px-5 font-[Manrope] font-semibold text-white transition-all hover:bg-[#264d43] active:scale-95 dark:bg-[#24574a] dark:hover:bg-[#2d6a5a] md:px-7">
            <Search size={18} aria-hidden="true" />
            <span className="hidden sm:inline">Search</span>
          </button>
        )}
      </form>

      {show && (
        <ul
          id={listId}
          role="listbox"
          className="animate-fade-up absolute left-0 right-0 top-full z-40 mt-2 max-h-[340px] overflow-y-auto rounded-2xl border border-gray-200 bg-white p-2 text-left shadow-2xl dark:border-gray-700 dark:bg-gray-900"
        >
          {suggestions.map((s, i) => {
            const SIcon = Icon[s.kind]
            return (
              <li
                key={`${s.kind}-${s.label}-${i}`}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={i === active}
                onMouseDown={e => e.preventDefault()}
                onClick={() => pick(s)}
                onMouseEnter={() => setActive(i)}
                className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 transition-colors ${i === active ? 'bg-[#D7FFF6] dark:bg-[#0f3b32]' : ''}`}
              >
                {s.kind === 'property' && s.image ? (
                  <img src={optimizeImage(s.image, 96)} alt="" width={40} height={40} loading="lazy" className="h-10 w-10 shrink-0 rounded-lg object-cover" />
                ) : (
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EFF8F6] text-[#1A3C34] dark:bg-gray-800 dark:text-[#8fd3c0]">
                    <SIcon size={18} aria-hidden="true" />
                  </span>
                )}
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-[Manrope] text-[14px] font-semibold text-[#0A1916] dark:text-gray-100">{s.label}</span>
                  <span className="block truncate text-[12px] text-gray-500 dark:text-gray-400">
                    {s.kind === 'location' ? `Homes in this area · ${s.hint}` : s.kind === 'type' ? `Property type · ${s.hint}` : s.hint}
                  </span>
                </span>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default SearchBox
