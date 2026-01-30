import { useTranslation } from "react-i18next"

export default function News() {
  const { t } = useTranslation()

  return (
    <>
    <div>

      <h2>{t('news.title')}</h2>
      <p>{t('news.message')}</p>
          </div>

    </>
  )
}
