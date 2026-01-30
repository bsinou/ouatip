import { useState } from "react"
import { NavLink, Outlet } from "react-router-dom"
import { useTranslation } from "react-i18next"

export default function Layout() {
  const { t, i18n } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    localStorage.setItem('language', lng)
  }

  return (
    <div className="layout">
      {/* Backdrop overlay */}
      {isMenuOpen && (
        <div className="menu-backdrop" onClick={closeMenu}></div>
      )}

      <header className="header">
        {!isMenuOpen && (
          <button
            className="menu-toggle"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="hamburger"></span>
          </button>
        )}

        <h1 className="header-title">15 août 2026</h1>

        <div className="language-switcher">
          <button
            onClick={() => changeLanguage('fr')}
            className={i18n.language === 'fr' ? 'active' : ''}
            title="Français"
          >
            🥖
          </button>
          <button
            onClick={() => changeLanguage('en')}
            className={i18n.language === 'en' ? 'active' : ''}
            title="English"
          >
            💂
          </button>
          <button
            onClick={() => changeLanguage('de')}
            className={i18n.language === 'de' ? 'active' : ''}
            title="Deutsch"
          >
            🍺
          </button>
          <button
            onClick={() => changeLanguage('es')}
            className={i18n.language === 'es' ? 'active' : ''}
            title="Español"
          >
            💃
          </button>
        </div>

        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <NavLink to="/" end onClick={closeMenu}>{t('nav.home')}</NavLink>
          <NavLink to="/info" onClick={closeMenu}>{t('nav.info')}</NavLink>
          <NavLink to="/address" onClick={closeMenu}>{t('nav.address')}</NavLink>
          <NavLink to="/accommodations" onClick={closeMenu}>{t('nav.accommodations')}</NavLink>
          <NavLink to="/news" onClick={closeMenu}>{t('nav.news')}</NavLink>
          <NavLink to="/gallery" onClick={closeMenu}>{t('nav.gallery')}</NavLink>
          <NavLink to="/contact" onClick={closeMenu}>{t('nav.contact')}</NavLink>
        </nav>
      </header>

      <main className="main">
        <Outlet />
      </main>

      <footer className="footer">
        <p>💍 {t('footer.names')}</p>
        <p className="subtitle"><small><i>{t('footer.tagline')}</i></small></p>
      </footer>
    </div>
  )
}
