import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { unwrap } from '@/api/client'
import { deleteContactMessage, getContactMessages, updateContactStatus } from '@/api/contact'
import { deleteEnquiry, getEnquiries, updateEnquiryStatus } from '@/api/enquiries'
import { deleteProperty, getAdminProperties, getDashboardStats } from '@/api/properties'
import { deleteUser, getAllUsers, getUsersCount } from '@/api/users'
import { propertyKeys } from '@/hooks/properties/use-properties'

const adminKeys = {
  stats: ['admin', 'stats'] as const,
  usersCount: ['admin', 'users-count'] as const,
  users: ['admin', 'users'] as const,
  enquiries: ['admin', 'enquiries'] as const,
  messages: ['admin', 'messages'] as const,
}

// ---- properties (including drafts) ----
export const useAdminProperties = (enabled = true) =>
  useQuery({
    queryKey: propertyKeys.admin(),
    enabled,
    queryFn: async () => unwrap(await getAdminProperties()).properties,
  })

/** Public and admin lists both change when a property is created, edited or deleted. */
export const useInvalidateProperties = () => {
  const queryClient = useQueryClient()
  return () => queryClient.invalidateQueries({ queryKey: propertyKeys.all })
}

export const useDeleteProperty = () => {
  const invalidate = useInvalidateProperties()
  return useMutation({
    mutationFn: async (id: string) => unwrap(await deleteProperty(id)),
    onSuccess: invalidate,
  })
}

// ---- dashboard ----
export const useDashboardStats = () =>
  useQuery({ queryKey: adminKeys.stats, queryFn: async () => unwrap(await getDashboardStats()).stats })

export const useUsersCount = () =>
  useQuery({
    queryKey: adminKeys.usersCount,
    queryFn: async () => {
      const { count, percent } = unwrap(await getUsersCount())
      return { count, percent }
    },
  })

// ---- users ----
export const useAllUsers = () =>
  useQuery({ queryKey: adminKeys.users, queryFn: async () => unwrap(await getAllUsers()).users })

export const useDeleteUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => unwrap(await deleteUser(id)),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: adminKeys.users })
      void queryClient.invalidateQueries({ queryKey: adminKeys.usersCount })
    },
  })
}

// ---- enquiries ----
export const useEnquiries = () =>
  useQuery({ queryKey: adminKeys.enquiries, queryFn: async () => unwrap(await getEnquiries()).enquiries })

export const useUpdateEnquiryStatus = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => unwrap(await updateEnquiryStatus(id, status)),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: adminKeys.enquiries }),
  })
}

export const useDeleteEnquiry = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => unwrap(await deleteEnquiry(id)),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: adminKeys.enquiries }),
  })
}

// ---- contact-page messages ----
export const useContactMessages = (enabled = true) =>
  useQuery({
    queryKey: adminKeys.messages,
    enabled,
    refetchInterval: 60_000, // the sidebar badge stays fresh while the admin works
    queryFn: async () => unwrap(await getContactMessages()),
  })

export const useUpdateContactStatus = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: 'new' | 'responded' }) => unwrap(await updateContactStatus(id, status)),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: adminKeys.messages }),
  })
}

export const useDeleteContactMessage = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => unwrap(await deleteContactMessage(id)),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: adminKeys.messages }),
  })
}
