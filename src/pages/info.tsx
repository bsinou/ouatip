import { useTranslation } from "react-i18next"

export default function Info() {
  const { t } = useTranslation()

  return (
    <>
      <div>
        <h2>{t('info.title')}</h2>
        <br />
        <p>
          📅 <strong>{t('info.date')}</strong><br />
          📍 <strong>{t('info.location')}</strong>
        </p>
        <br />

        <ul className="list">
          <li>👗 {t('info.dress')}</li>
          <li>👩‍❤️‍💋‍👨 {t('info.ceremony')}</li>
          <li>🍽️ {t('info.dinner')}</li>
          <li>👼 {t('info.children')}</li>
        </ul>

        <br />
        <p>
          <i>{t('info.dietary')}</i>
        </p>
      </div>
    </>
  )
}
