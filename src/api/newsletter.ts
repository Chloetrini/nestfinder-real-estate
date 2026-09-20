import { request } from './client'
import type { Subscriber } from '@/types/api'

export const subscribeToNewsletter = (email: string) => request('/api/newsletter', { method: 'POST', body: { email } })

// ---- admin ----
export const getSubscribers = () => request<{ count: number; subscribers: Subscriber[] }>('/api/newsletter', { auth: true })
export const deleteSubscriber = (id: string) => request(`/api/newsletter/${id}`, { method: 'DELETE', auth: true })
