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
          <div className="gallery-grid-row">
            {firstFourImages.map((image, index) => (
              <img
                key={image.filename}
                src={image.path}
                alt={image.alt || `${t('gallery.altText')} ${index + 1}`}
                loading="lazy"
              />
            ))}
          </div>

          <div className="gallery-caption">
            <p><em>{t('gallery.caption')}</em></p>
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
            />
          ))}
        </div>
      )}
    </div>
  )
}