import { useState } from "react"
import type { FormEvent } from "react"
import { useTranslation } from "react-i18next"

// RSVP page with a simple form
export default function RSVP() {
  const { t } = useTranslation()
  const [name, setName] = useState("")
  const [attending, setAttending] = useState(true)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log("RSVP:", { name, attending })
    setSubmitted(true)
  }

  if (submitted) {
    return <p>{t('rsvp.thankYou', { name })}</p>
  }

  return (
    <div>
      <h2>{t('rsvp.title')}</h2>
      <form onSubmit={handleSubmit} className="rsvp-form">
        <div>
          <label>{t('rsvp.nameLabel')}</label><br/>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div style={{ marginTop: "1rem" }}>
          <label>
            <input
              type="checkbox"
              checked={attending}
              onChange={e => setAttending(e.target.checked)}
            />
            {' '}{t('rsvp.attendLabel')}
          </label>
        </div>
        <button type="submit" style={{ marginTop: "1rem" }}>{t('rsvp.submit')}</button>
      </form>
    </div>
  )
}