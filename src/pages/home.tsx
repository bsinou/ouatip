import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

export default function Home() {
  const { t } = useTranslation()

  return (
    <>
      <div className="home-content">
        <p>
          {t('home.message1')}<br />
          {t('home.message1b')}
        </p>
        <p>
          {t('home.message2')}
        </p>
        <br />
        <p>
          <Link to="/info" style={{ color: '#8a6d3b', textDecoration: 'underline' }}>
            {t('home.moreInfo')}
          </Link>
        </p>
      </div>
    </>
  )
}
