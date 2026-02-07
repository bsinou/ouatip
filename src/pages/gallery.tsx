import { useTranslation } from "react-i18next"
import { useState, useEffect } from "react"

interface GalleryImage {
  filename: string
  path: string
  alt?: string
}

interface GalleryData {
  generated?: string
  images: GalleryImage[]
}

// Gallery page with automatic image loading from gallery.json
export default function Gallery() {
  const { t } = useTranslation()
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    // Try to load gallery.json, fallback to default images if not found
    fetch('/images/gallery.json')
      .then(res => {
        if (!res.ok) throw new Error('Gallery data not found')
        return res.json()
      })
      .then((data: GalleryData) => {
        setImages(data.images)
        setLoading(false)
      })
      .catch(() => {
        // Fallback to existing images if gallery.json doesn't exist
        setImages([
          { filename: 'photo1.jpg', path: '/images/photo1.jpg', alt: 'Gallery image 1' },
          { filename: 'photo2.jpg', path: '/images/photo2.jpg', alt: 'Gallery image 2' },
          { filename: 'photo3.jpg', path: '/images/photo3.jpg', alt: 'Gallery image 3' },
          { filename: 'photo4.jpg', path: '/images/photo4.jpg', alt: 'Gallery image 4' },
        ])
        setLoading(false)
      })
  }, [])

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox()
      } else if (e.key === 'ArrowLeft') {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
      } else if (e.key === 'ArrowRight') {
        setCurrentImageIndex((prev) => (prev + 1) % images.length)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen, images.length])

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden' // Prevent background scrolling
    // Hide language switcher
    const langSwitcher = document.querySelector('.language-switcher') as HTMLElement
    if (langSwitcher) langSwitcher.style.display = 'none'
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = '' // Restore scrolling
    // Show language switcher again
    const langSwitcher = document.querySelector('.language-switcher') as HTMLElement
    if (langSwitcher) langSwitcher.style.display = ''
  }

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  if (loading) {
    return (
      <div>
        <h2>{t('gallery.title')}</h2>
        <p>{t('gallery.loading', 'Loading gallery...')}</p>
      </div>
    )
  }

  const firstFourImages = images.slice(0, 4)
  const remainingImages = images.slice(4)

  return (
    <div>
      <h2>{t('gallery.title')}</h2>

      {/* First 4 images in a row */}
      {firstFourImages.length > 0 && (
        <>
          <div className="gallery-caption">
            <p><em>{t('gallery.caption1')}</em></p>
          </div>

          <div className="gallery-grid-row">
            {firstFourImages.map((image, index) => (
              <img
                key={image.filename}
                src={image.path}
                alt={image.alt || `${t('gallery.altText')} ${index + 1}`}
                loading="lazy"
                onClick={() => openLightbox(index)}
              />
            ))}
          </div>

          <div className="gallery-caption">
            <p><em>{t('gallery.caption2')}</em></p>
          </div>
        </>
      )}

      {/* Remaining images in masonry layout */}
      {remainingImages.length > 0 && (
        <div className="gallery-masonry">
          {remainingImages.map((image, index) => (
            <img
              key={image.filename}
              src={image.path}
              alt={image.alt || `${t('gallery.altText')} ${index + 5}`}
              loading="lazy"
              onClick={() => openLightbox(index + 4)}
            />
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox} aria-label="Close">
            ✕
          </button>

          <button
            className="lightbox-nav lightbox-prev"
            onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
            aria-label="Previous"
          >
            ‹
          </button>

          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[currentImageIndex].path}
              alt={images[currentImageIndex].alt || `${t('gallery.altText')} ${currentImageIndex + 1}`}
            />
            <div className="lightbox-counter">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>

          <button
            className="lightbox-nav lightbox-next"
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            aria-label="Next"
          >
            ›
          </button>
        </div>
      )}
    </div>
  )
}