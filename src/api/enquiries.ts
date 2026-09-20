import { request } from './client'
import type { Enquiry } from '@/types/api'

export const submitEnquiry = (data: { name: string; email: string; message: string; propertyId: string }) =>
  request('/api/enquiries', { method: 'POST', body: data })

export const getEnquiries = () => request<{ count: number; enquiries: Enquiry[] }>('/api/enquiries', { auth: true })
export const updateEnquiryStatus = (id: string, status: string) => request(`/api/enquiries/${id}`, { method: 'PUT', body: { status }, auth: true })
export const deleteEnquiry = (id: string) => request(`/api/enquiries/${id}`, { method: 'DELETE', auth: true })
