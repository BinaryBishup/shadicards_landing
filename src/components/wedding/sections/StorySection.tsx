'use client'

import { useState } from 'react'
import Image from 'next/image'
import { WeddingData } from '../types'
import { placeholders } from '../utils/placeholders'

interface StorySectionProps {
  data: WeddingData
}

export default function StorySection({ data }: StorySectionProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <>
      <section className="story-section py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4">
          {/* Section Title */}
          <div className="story-title text-center mb-16 lg:mb-20">
            <h2 className="text-3xl lg:text-4xl font-dancing text-gray-400 mb-3">Our Love Story</h2>
            <h3 className="text-2xl lg:text-3xl font-light text-gray-600">How It All Began</h3>
            <div className="w-24 h-0.5 bg-gray-300 mx-auto mt-6"></div>
          </div>

          {/* Story Items Grid - if storyItems provided, use them, otherwise use default */}
          {data.storyItems && data.storyItems.length > 0 ? (
            <div className="story-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {data.storyItems.map((item, index) => (
                <div 
                  key={index}
                  className="story-item group cursor-pointer"
                  onClick={() => setSelectedImage(item.image)}
                >
                  <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:-translate-y-2">
                    <div className="aspect-[3/4] bg-gray-200">
                      <Image
                        src={item.image || placeholders.story}
                        alt={item.title}
                        width={400}
                        height={533}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                        quality={85}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                  <div className="text-center mt-4">
                    <h4 className="text-xl font-dancing text-gray-600 mb-1">{item.title}</h4>
                    {item.date && (
                      <p className="text-sm text-gray-400 uppercase tracking-wider mb-2">{item.date}</p>
                    )}
                    <p className="text-sm text-gray-500 px-2">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Default story if no story items provided */
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-gray-700 leading-relaxed text-center">
                {data.story}
              </p>
              {data.howWeMet && (
                <p className="text-lg text-gray-700 leading-relaxed text-center mt-6">
                  {data.howWeMet}
                </p>
              )}
            </div>
          )}
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