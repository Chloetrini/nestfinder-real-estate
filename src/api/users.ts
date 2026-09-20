import { request } from './client'
import type { AdminUser } from '@/types/api'

export const getUsersCount = () => request<{ count: number; percent: number }>('/api/auth/users/count', { auth: true })
export const getAllUsers = () => request<{ users: AdminUser[] }>('/api/auth/users/count/all', { auth: true })
export const deleteUser = (id: string) => request(`/api/auth/delete/${id}`, { method: 'DELETE', auth: true })
