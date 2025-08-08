'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Heart } from 'lucide-react'
import { WeddingData } from '../types'
import { placeholders } from '../utils/placeholders'

interface GallerySectionProps {
  data: WeddingData
}

export default function GallerySection({ data }: GallerySectionProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  // Default gallery images
  const defaultGalleryItems = [
    { src: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2ZjZTdmMyIvPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9IjIwMCIgeT0iMjAwIiBzdHlsZT0iZmlsbDojZWM0ODk5O2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1zaXplOjIwcHg7Zm9udC1mYW1pbHk6QXJpYWwsc2Fucy1zZXJpZjsiPkZpcnN0IE1lZXQ8L3RleHQ+PC9zdmc+", title: "First Meet" },
    { src: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2YzZThmZiIvPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9IjIwMCIgeT0iMjAwIiBzdHlsZT0iZmlsbDojYTg1NWY3O2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1zaXplOjIwcHg7Zm9udC1mYW1pbHk6QXJpYWwsc2Fucy1zZXJpZjsiPkZpcnN0IERhdGU8L3RleHQ+PC9zdmc+", title: "First Date" },
    { src: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2U5ZDVmZiIvPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9IjIwMCIgeT0iMjAwIiBzdHlsZT0iZmlsbDojOTMzM2VhO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1zaXplOjIwcHg7Zm9udC1mYW1pbHk6QXJpYWwsc2Fucy1zZXJpZjsiPlByb3Bvc2FsPC90ZXh0Pjwvc3ZnPg==", title: "Proposal" },
    { src: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2RkZDZmZSIvPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9IjIwMCIgeT0iMjAwIiBzdHlsZT0iZmlsbDojN2MzYWVkO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1zaXplOjIwcHg7Zm9udC1mYW1pbHk6QXJpYWwsc2Fucy1zZXJpZjsiPkVuZ2FnZW1lbnQ8L3RleHQ+PC9zdmc+", title: "Engagement" }
  ]

  return (
    <>
      <section className="gallery-section py-20 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Section Title */}
          <div className="gallery-title text-center mb-16 lg:mb-20">
            <h2 className="text-3xl lg:text-4xl font-dancing text-gray-400 mb-3">Sweet Memories</h2>
            <h3 className="text-2xl lg:text-3xl font-light text-gray-600">Our Photo Gallery</h3>
            <div className="w-24 h-0.5 bg-gray-300 mx-auto mt-6"></div>
          </div>

          {/* Gallery Grid */}
          <div className="gallery-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {data.gallery && data.gallery.length > 0 ? (
              data.gallery.map((image, index) => (
                <div 
                  key={index} 
                  className="gallery-item group cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:-translate-y-2">
                    <div className="aspect-square bg-gray-200">
                      <Image
                        src={image || placeholders.gallery}
                        alt={`Wedding Memory ${index + 1}`}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                        quality={85}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Heart className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              /* Default gallery images */
              <>
                {defaultGalleryItems.map((item, index) => (
                  <div 
                    key={index} 
                    className="gallery-item group cursor-pointer"
                    onClick={() => setSelectedImage(item.src)}
                  >
                    <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:-translate-y-2">
                      <div className="aspect-square bg-gray-200">
                        <Image
                          src={item.src}
                          alt={item.title}
                          width={400}
                          height={400}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                          quality={85}
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Heart className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Image Preview Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <Image
              src={selectedImage}
              alt="Preview"
              width={800}
              height={800}
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
              quality={95}
              priority={true}
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}