import { useTranslation } from "react-i18next"

export default function Address() {
  const { t } = useTranslation()

  return (
    <>
          <div>

      <h2>{t('address.title')}</h2>
      <p>
        {t('address.street')}<br />
        {t('address.city')}<br />
        {t('address.country')}
      </p>
        <br />
      <p>
              {t('address.access')}<br />
              {t('address.gps')} <br />
              {t('address.map')} <a href="https://maps.app.goo.gl/pQNXR9TZ3nFKcBZy6">{t('address.mapLink')}</a> {t('address.mapSuffix')}<br />
      </p>
        <br />
        <p>
              {t('address.train')} <a href="https://www.ter.sncf.com/nouvelle-aquitaine/se-deplacer/gares/la-souterraine-87592378">{t('address.trainLink')}</a>. <br/>
              {t('address.trainInfo')}
       </p>
       </div>
    </>
  )
}
