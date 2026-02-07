// Login component - COMMENTED OUT
// Authentication now handled by Caddy server-side basic auth
// This component is no longer needed but kept for reference

/*
import { useState } from "react"
import type { FormEvent } from "react"
import { useTranslation } from "react-i18next"
import { useAuth } from "../contexts/AuthContext"

export default function Login() {
  const { t } = useTranslation()
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const { login } = useAuth()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const success = login(password)
    if (!success) {
      setError(true)
      setPassword("")
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>🔒 {t('login.title')}</h2>
        <p>{t('login.message')}</p>

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setError(false)
            }}
            placeholder={t('login.placeholder')}
            autoFocus
            className={error ? "input-error" : ""}
          />

          {error && (
            <p className="error-message">{t('login.error')}</p>
          )}

          <button type="submit">{t('login.submit')}</button>
        </form>
      </div>
    </div>
  )
}
*/

// Placeholder export to avoid build errors
export default function Login() {
  return null
}
