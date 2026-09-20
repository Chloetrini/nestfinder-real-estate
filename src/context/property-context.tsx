import { createContext, useContext, type FC, type ReactNode } from 'react'
import { AdminPageSkeleton } from '@/components/skeletons/admin-skeletons'
import { useAdminProperties, useDeleteProperty, useInvalidateProperties } from '@/hooks/admin/use-admin'
import type { Property } from '@/types/property'

// Admin-only state: the property list (including drafts) and the one being edited.
// The list comes from React Query, so it is cached, shared and refreshed after every change.

export type PropertyType = Property

export type PropertyContextType = {
  properties: Property[]
  /** Call after a property was created on the server */
  publishProperty: (newProperty: Property) => void
  /** Call after a property was updated on the server */
  updateProperty: (updatedProperty: Property) => void
  deleteProperty: (id: string) => Promise<void>
  fetchProperties: () => void
  isLoading: boolean
}

export const PropertyContext = createContext<PropertyContextType | null>(null)

export const useProperties = () => {
  const context = useContext(PropertyContext)
  if (!context) throw new Error('useProperties must be used within a PropertyProvider')
  return context
}

export const PropertyProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { data: properties = [], isLoading, refetch } = useAdminProperties()
  const invalidate = useInvalidateProperties()
  const removeProperty = useDeleteProperty()

  const value: PropertyContextType = {
    properties,
    isLoading,
    fetchProperties: () => void refetch(),
    publishProperty: () => void invalidate(),
    updateProperty: () => void invalidate(),
    deleteProperty: async id => {
      try {
        await removeProperty.mutateAsync(id)
      } catch {
        alert('Failed to delete property')
      }
    },
  }

  return (
    <PropertyContext.Provider value={value}>
      {isLoading ? (
        <AdminPageSkeleton />
      ) : (
        children
      )}
    </PropertyContext.Provider>
  )
}
