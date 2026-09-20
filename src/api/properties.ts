import { request } from './client'
import type { DashboardStats } from '@/types/api'
import type { Property } from '@/types/property'

// Public (published only)
export const getProperties = () => request<{ count: number; properties: Property[] }>('/api/properties')
export const getPropertyById = (id: string) => request<{ property: Property }>(`/api/properties/${id}`)

// Admin (includes drafts)
export const getAdminProperties = () => request<{ count: number; properties: Property[] }>('/api/properties/admin/all', { auth: true })
export const createProperty = (formData: FormData) => request<{ property: Property }>('/api/properties', { method: 'POST', body: formData, auth: true })
export const updateProperty = (id: string, formData: FormData) =>
  request<{ property: Property }>(`/api/properties/${id}`, { method: 'PUT', body: formData, auth: true })
export const setPropertyFeatured = (id: string, isFeatured: boolean) =>
  request<{ property: Property }>(`/api/properties/${id}/featured`, { method: 'PATCH', body: { isFeatured }, auth: true })
export const deleteProperty = (id: string) => request(`/api/properties/${id}`, { method: 'DELETE', auth: true })

// Dashboard numbers compared with last month (admin)
export const getDashboardStats = () => request<{ stats: DashboardStats }>('/api/auth/stats', { auth: true })
