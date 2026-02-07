import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useTranslation } from "react-i18next"
// Authentication now handled by Caddy server - client-side auth commented out
// import { AuthProvider } from "./contexts/AuthContext"
import Layout from "./components/Layout"
// import ProtectedRoute from "./components/ProtectedRoute"

import Home from "./pages/home"
import Address from "./pages/address"
import Info from "./pages/info"
import Contact from "./pages/contact"
import News from "./pages/news"
import Accommodations from "./pages/accommodations"
import Gallery from "./pages/gallery"
import RSVP from "./pages/rsvp"

function NotFound() {
  const { t } = useTranslation()
  return <h2>{t('notFound')}</h2>
}

function App() {
  return (
    // Authentication now handled by Caddy server
    // <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            {/* All routes now directly accessible - Caddy handles authentication */}
            <Route path="address" element={<Address />} />
            <Route path="info" element={<Info />} />
            <Route path="accommodations" element={<Accommodations />} />
            <Route path="news" element={<News />} />
            <Route path="contact" element={<Contact />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="rsvp" element={<RSVP />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    // </AuthProvider>
  )
}

export default App
