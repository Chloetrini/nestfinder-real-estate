// Every backend response is { success, message?, ...data }
export type ApiSuccess<T = object> = { success: true; message?: string } & T
export type ApiFailure = { success: false; message?: string }
export type ApiResponse<T = object> = ApiSuccess<T> | ApiFailure

export interface DashboardStat {
  count: number
  percent: number
}

export interface DashboardStats {
  totalProperties: DashboardStat
  activeListings: DashboardStat
  pendingProperties: DashboardStat
}

export interface Enquiry {
  _id: string
  name: string
  email: string
  message: string
  propertyId: string
  propertyName: string
  status: 'new' | 'responded'
  createdAt: string
}

export interface ContactMessage {
  _id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  status: 'new' | 'responded'
  createdAt: string
}

export interface AdminUser {
  _id: string
  name: string
  email: string
  role: 'user' | 'admin'
  isVerified: boolean
  createdAt: string
}
