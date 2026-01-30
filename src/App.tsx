import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { AuthProvider } from "./contexts/AuthContext"
import Layout from "./components/Layout"
import ProtectedRoute from "./components/ProtectedRoute"

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
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="address" element={<ProtectedRoute><Address /></ProtectedRoute>} />
            <Route path="info" element={<ProtectedRoute><Info /></ProtectedRoute>} />
            <Route path="accommodations" element={<ProtectedRoute><Accommodations /></ProtectedRoute>} />
            <Route path="news" element={<ProtectedRoute><News /></ProtectedRoute>} />
            <Route path="contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
            <Route path="gallery" element={<ProtectedRoute><Gallery /></ProtectedRoute>} />
            <Route path="rsvp" element={<ProtectedRoute><RSVP /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
