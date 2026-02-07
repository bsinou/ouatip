// ProtectedRoute - COMMENTED OUT
// Authentication now handled by Caddy server-side basic auth
// This component is no longer needed but kept for reference

/*
import type { ReactNode } from "react"
import { useAuth } from "../contexts/AuthContext"
import Login from "./Login"

interface ProtectedRouteProps {
  children: ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Login />
  }

  return <>{children}</>
}
*/

// Placeholder export to avoid build errors if still imported
import type { ReactNode } from "react"

interface ProtectedRouteProps {
  children: ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  return <>{children}</>
}
