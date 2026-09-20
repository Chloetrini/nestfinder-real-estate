import { createContext, useContext, useEffect, useState, type FC, type ReactNode } from 'react'
import { getCurrentUser } from '@/api/auth'
import { getToken, removeToken } from '@/api/client'
import type { User } from '@/types/user'
import type { SignUpp } from '@/types/auth'

interface AuthContextType {
  isLoggedIn: boolean
  setIsLoggedIn: (loggedIn: boolean) => void
  user: User
  setUser: (user: User) => void
  showModal: boolean
  setShowModal: (show: boolean) => void
  isSignedUp: SignUpp
  setIsSignedUp: (val: SignUpp) => void
  isAdmin: boolean
  setIsAdmin: (val: boolean) => void
  /** True while a saved token is being verified after a page refresh */
  isCheckingAuth: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<User>({ name: '', email: '' })
  const [showModal, setShowModal] = useState(false)
  const [isSignedUp, setIsSignedUp] = useState<SignUpp>({ email: '', password: '' })
  const [isAdmin, setIsAdmin] = useState(false)

  // Only wait when there is a token to check. Visitors without one see the site immediately.
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(() => Boolean(getToken()))

  // Keep the user signed in after a refresh by verifying the saved token
  useEffect(() => {
    if (!getToken()) return

    let cancelled = false
    const checkAuth = async () => {
      try {
        const result = await getCurrentUser()
        if (cancelled) return

        if (result.success && result.user) {
          setIsLoggedIn(true)
          setUser({ name: result.user.name, email: result.user.email })
          setIsAdmin(result.user.role === 'admin')
        } else {
          removeToken() // invalid or expired
          setIsLoggedIn(false)
        }
      } catch {
        if (cancelled) return
        removeToken() // network error
        setIsLoggedIn(false)
      } finally {
        if (!cancelled) setIsCheckingAuth(false)
      }
    }

    void checkAuth()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        showModal,
        setShowModal,
        isSignedUp,
        setIsSignedUp,
        isAdmin,
        setIsAdmin,
        isCheckingAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}
