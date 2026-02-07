import { useTranslation } from "react-i18next"

export default function Contact() {
  const { t } = useTranslation()
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL

  return (
    <>
        <div>
            <h2>{t('contact.title')}</h2>
            <p>
                {t('contact.message')}<br />
                ✉️ <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
            </p>
        </div>
    </>
  )
}
