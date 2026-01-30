import { useTranslation } from "react-i18next"

export default function Contact() {
  const { t } = useTranslation()

  return (
    <>
        <div>
            <h2>{t('contact.title')}</h2>
            <p>
                {t('contact.message')}<br />
                ✉️ <a href="mailto:mariage@sinou.org">mariage@sinou.org</a>
            </p>
        </div>
    </>
  )
}
