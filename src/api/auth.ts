import { request } from './client'
import type { ApiResponse } from '@/types/api'

interface AuthUser {
  id: string
  name: string
  email: string
  role: 'user' | 'admin'
}

export const registerUser = (data: { name: string; email: string; password: string }) =>
  request('/api/auth/register', { method: 'POST', body: data })

export const loginUser = (data: { email: string; password: string }): Promise<ApiResponse<{ token: string; user: AuthUser }>> =>
  request('/api/auth/login', { method: 'POST', body: data })

export const getCurrentUser = (): Promise<ApiResponse<{ user: AuthUser }>> => request('/api/auth/me', { auth: true })

export const forgotPassword = (email: string) => request('/api/auth/forgot-password', { method: 'POST', body: { email } })

export const resetPassword = (token: string, data: { password: string; confirmPassword: string }) =>
  request(`/api/auth/reset-password/${token}`, { method: 'POST', body: data })
