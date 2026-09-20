import { request } from './client'
import type { ContactMessage } from '@/types/api'

export interface ContactPayload {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  /** Honeypot: must stay empty. Bots fill it in, people never see it. */
  website?: string
}

export const sendContactMessage = (data: ContactPayload) => request('/api/contact', { method: 'POST', body: data })

// ---- admin inbox ----
export const getContactMessages = () => request<{ count: number; newCount: number; messages: ContactMessage[] }>('/api/contact', { auth: true })
export const updateContactStatus = (id: string, status: 'new' | 'responded') => request(`/api/contact/${id}`, { method: 'PUT', body: { status }, auth: true })
export const deleteContactMessage = (id: string) => request(`/api/contact/${id}`, { method: 'DELETE', auth: true })
