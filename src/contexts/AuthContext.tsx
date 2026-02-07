// AuthContext - COMMENTED OUT
// Authentication now handled by Caddy server-side basic auth
// This context is no longer needed but kept for reference

/*
import { createContext, useContext, useState, useEffect } from "react"
import type { ReactNode } from "react"

interface AuthContextType {
  isAuthenticated: boolean
  login: (password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AUTH_KEY = "wedding_auth"
const SITE_PASSWORD = import.meta.env.VITE_SITE_PASSWORD || "wedding2026"

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  // Check if user is already authenticated on mount
  useEffect(() => {
    const stored = sessionStorage.getItem(AUTH_KEY)
    if (stored === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  const login = (password: string): boolean => {
    if (password === SITE_PASSWORD) {
      setIsAuthenticated(true)
      sessionStorage.setItem(AUTH_KEY, "true")
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem(AUTH_KEY)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
*/

// Placeholder exports to avoid build errors
import type { ReactNode } from "react"

interface AuthContextType {
  isAuthenticated: boolean
  login: (password: string) => boolean
  logout: () => void
}

export function AuthProvider({ children }: { children: ReactNode }) {
  return <>{children}</>
}

export function useAuth(): AuthContextType {
  return {
    isAuthenticated: true,
    login: () => true,
    logout: () => {}
  }
}
