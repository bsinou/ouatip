import { useTranslation } from "react-i18next"

export default function Accommodations() {
  const { t } = useTranslation()

  return (
    <>
    <div>
      <h2>{t('accommodations.title')}</h2>
      <br/>
      <p>{t('accommodations.camping')}</p>
      <p>{t('accommodations.online')}</p>
      <p>{t('accommodations.backup')}</p>
      </div>
    </>
  )
}
