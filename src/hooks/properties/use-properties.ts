import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getProperties, getPropertyById } from '@/api/properties'
import { unwrap } from '@/api/client'
import type { Property } from '@/types/property'

export const propertyKeys = {
  all: ['properties'] as const,
  list: () => [...propertyKeys.all, 'list'] as const,
  detail: (id: string) => [...propertyKeys.all, 'detail', id] as const,
  admin: () => [...propertyKeys.all, 'admin'] as const,
}

/** All published properties (shared cache: home, listing and detail pages reuse it). */
export const useProperties = () =>
  useQuery({
    queryKey: propertyKeys.list(),
    queryFn: async () => unwrap(await getProperties()).properties,
  })

/**
 * One property. If the listing is already cached the page renders instantly from it
 * while the fresh copy loads in the background.
 */
export const useProperty = (id: string | undefined) => {
  const queryClient = useQueryClient()

  return useQuery({
    queryKey: propertyKeys.detail(id ?? ''),
    enabled: Boolean(id),
    queryFn: async () => unwrap(await getPropertyById(id!)).property,
    initialData: () => queryClient.getQueryData<Property[]>(propertyKeys.list())?.find(p => p._id === id),
    initialDataUpdatedAt: () => queryClient.getQueryState(propertyKeys.list())?.dataUpdatedAt,
  })
}
