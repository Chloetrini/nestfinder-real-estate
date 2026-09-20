import { useEffect, useState } from 'react'

/** The value, but only after it has stopped changing for `delay` ms. Keeps typing instant while the work behind it waits. */
export const useDebouncedValue = <T,>(value: T, delay = 250): T => {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debounced
}
