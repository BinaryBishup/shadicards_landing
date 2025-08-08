'use client'

import Image from 'next/image'
import { Heart } from 'lucide-react'
import { WeddingData } from '../types'
import { placeholders } from '../utils/placeholders'

interface WeddingPartySectionProps {
  data: WeddingData
}

export default function WeddingPartySection({ data }: WeddingPartySectionProps) {
  // Don't render if no wedding party data
  if (!data.bridesmaids?.length && !data.groomsmen?.length) {
    return null
  }

  return (
    <section className="wedding-party-section py-20 lg:py-32 bg-gradient-to-b from-[#FFFEF5] to-white">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-7xl mb-4" style={{ 
            fontFamily: 'var(--font-dancing)', 
            color: '#8B9A8C', 
            fontWeight: 400 
          }}>
            Our Wedding Squad
          </h2>
          <p className="text-xl text-gray-600" style={{ fontFamily: 'var(--font-playfair)' }}>
            Meet our beloved friends who stand by our side
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Bride's Squad - Sahelis */}
          {data.bridesmaids && data.bridesmaids.length > 0 && (
            <div>
              <h3 className="text-3xl lg:text-4xl text-center mb-8" style={{ 
                fontFamily: 'var(--font-dancing)', 
                color: '#D8A7A2', 
                fontWeight: 400 
              }}>
                Bride's Sahelis
              </h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {data.bridesmaids.map((member, index) => (
                  <div key={index} className="text-center group">
                    <div className="relative mb-4 overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                      <div className="aspect-[3/4] bg-gradient-to-br from-pink-100 to-purple-100">
                        {member.image ? (
                          <Image 
                            src={member.image || placeholders.bridesmaid} 
                            alt={member.name}
                            width={300}
                            height={400}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                            quality={85}
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Heart className="w-20 h-20 text-pink-300" />
                          </div>
                        )}
                      </div>
                    </div>
                    <h4 className="text-xl font-semibold text-gray-800" style={{ fontFamily: 'var(--font-playfair)' }}>
                      {member.name}
                    </h4>
                    <p className="text-gray-600 italic">{member.role || 'Bridesmaid'}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Groom's Squad - Baraatis */}
          {data.groomsmen && data.groomsmen.length > 0 && (
            <div>
              <h3 className="text-3xl lg:text-4xl text-center mb-8" style={{ 
                fontFamily: 'var(--font-dancing)', 
                color: '#7C9885', 
                fontWeight: 400 
              }}>
                Groom's Baraatis
              </h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {data.groomsmen.map((member, index) => (
                  <div key={index} className="text-center group">
                    <div className="relative mb-4 overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                      <div className="aspect-[3/4] bg-gradient-to-br from-blue-100 to-green-100">
                        {member.image ? (
                          <Image 
                            src={member.image || placeholders.groomsman} 
                            alt={member.name}
                            width={300}
                            height={400}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                            quality={85}
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Heart className="w-20 h-20 text-blue-300" />
                          </div>
                        )}
                      </div>
                    </div>
                    <h4 className="text-xl font-semibold text-gray-800" style={{ fontFamily: 'var(--font-playfair)' }}>
                      {member.name}
                    </h4>
                    <p className="text-gray-600 italic">{member.role || 'Groomsman'}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}