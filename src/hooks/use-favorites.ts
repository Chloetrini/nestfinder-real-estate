import { useCallback, useSyncExternalStore } from 'react'

// "Saved properties": kept in this browser's localStorage (no account or server needed).
const KEY = 'nestfinder_saved'
const listeners = new Set<() => void>()
let cache: string[] | null = null

const read = (): string[] => {
  if (cache) return cache
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) || '[]')
    cache = Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === 'string') : []
  } catch {
    cache = []
  }
  return cache
}

const write = (ids: string[]) => {
  cache = ids
  try {
    localStorage.setItem(KEY, JSON.stringify(ids))
  } catch {
    // storage blocked (private mode): still works for this visit
  }
  listeners.forEach(l => l())
}

const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export const useFavorites = () => {
  const ids = useSyncExternalStore(subscribe, read, () => [])

  const toggle = useCallback((id: string) => {
    const current = read()
    write(current.includes(id) ? current.filter(x => x !== id) : [...current, id])
  }, [])

  return { ids, isSaved: (id: string) => ids.includes(id), toggle, count: ids.length }
}
