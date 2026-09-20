import type { ApiResponse, ApiSuccess } from '@/types/api'

// All backend calls go through here.
export const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:7200'

// ---- JWT token (kept in localStorage) ----
const TOKEN_KEY = 'nestfinder_token'

export const saveToken = (token: string) => localStorage.setItem(TOKEN_KEY, token)
export const getToken = () => localStorage.getItem(TOKEN_KEY)
export const removeToken = () => localStorage.removeItem(TOKEN_KEY)

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  /** JSON object, or FormData for file uploads */
  body?: unknown
  /** Send the JWT in the Authorization header */
  auth?: boolean
}


export async function request<T = object>(path: string, { method = 'GET', body, auth = false }: RequestOptions = {}): Promise<ApiResponse<T>> {
  const headers: Record<string, string> = {}
  const isForm = body instanceof FormData

  if (body !== undefined && !isForm) headers['Content-Type'] = 'application/json'
  if (auth) {
    const token = getToken()
    if (token) headers.Authorization = `Bearer ${token}`
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : isForm ? body : JSON.stringify(body),
  })

  try {
    return (await res.json()) as ApiResponse<T>
  } catch {
    return { success: false, message: `Request failed (${res.status})` }
  }
}

/** For React Query: turns { success: false } into a thrown Error so `isError` works. */
export function unwrap<T extends object>(response: ApiResponse<T>): ApiSuccess<T> {
  if (!response.success) throw new Error(response.message || 'Something went wrong')
  return response
}
