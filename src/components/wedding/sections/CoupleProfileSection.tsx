'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { WeddingData } from '../types'
import { placeholders } from '../utils/placeholders'

interface CoupleProfileSectionProps {
  data: WeddingData
}

export default function CoupleProfileSection({ data }: CoupleProfileSectionProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [isClient, setIsClient] = useState(false)

  // Handle client-side hydration
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Calculate countdown
  useEffect(() => {
    if (!isClient) return
    
    const calculateTimeLeft = () => {
      const weddingDate = new Date(data.weddingDate)
      const now = new Date()
      const difference = weddingDate.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [data.weddingDate, isClient])

  return (
    <section className="py-16 lg:py-32 bg-white relative overflow-hidden">
      {/* Left decorative element - hidden on mobile */}
      <div className="hidden lg:block absolute -left-10 top-1/2 -translate-y-1/2 w-96 h-[550px]">
        <Image 
          src="/templates/assets/flower_left_shape.png" 
          alt="Decorative floral element"
          width={384}
          height={550}
          className="w-full h-full object-contain object-left"
          loading="lazy"
          quality={80}
        />
      </div>
      
      {/* Right decorative element - hidden on mobile */}
      <div className="hidden lg:block absolute -right-10 top-1/2 -translate-y-1/2 w-96 h-[550px]">
        <Image 
          src="/templates/assets/flower_right_shape.png" 
          alt="Decorative floral element"
          width={384}
          height={550}
          className="w-full h-full object-contain object-right"
          loading="lazy"
          quality={80}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Countdown Timer */}
        <div className="countdown-section mb-16 lg:mb-24">
          <div className="flex flex-wrap justify-center gap-6 lg:gap-12">
            {[
              { value: timeLeft.days, label: 'Days', position: 'top-left' },
              { value: timeLeft.hours, label: 'Hours', position: 'top-right' },
              { value: timeLeft.minutes, label: 'Mins', position: 'bottom-left' },
              { value: timeLeft.seconds, label: 'Secs', position: 'bottom-right' }
            ].map((item, index) => (
              <div key={item.label} className="countdown-item relative">
                <div className="relative w-32 h-32 lg:w-48 lg:h-48">
                  {/* Circular background */}
                  <div className="absolute inset-0 bg-blue-50 rounded-full border-2 border-blue-100"></div>
                  
                  {/* Flower decoration - positioned based on item */}
                  <div className={`absolute w-16 h-16 lg:w-24 lg:h-24 ${
                    item.position === 'top-left' ? '-top-4 -left-4' :
                    item.position === 'top-right' ? '-top-4 -right-4' :
                    item.position === 'bottom-left' ? '-bottom-4 -left-4' :
                    '-bottom-4 -right-4'
                  }`}>
                    <Image 
                      src="/templates/assets/flower_countdown.png" 
                      alt="Decorative floral countdown element"
                      width={96}
                      height={96}
                      className="w-full h-full object-contain"
                      loading="lazy"
                      quality={75}
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl lg:text-5xl font-bold text-gray-600">
                      {isClient ? item.value : 0}
                    </span>
                    <span className="text-sm lg:text-lg text-gray-500 mt-1">{item.label}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bride & Groom Profiles */}
        <div className="profiles-section">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24">
            {/* Bride Profile */}
            <div className="profile-card text-center max-w-sm relative">
              <div className="absolute -left-24 top-1/2 -translate-y-1/2 w-32 h-48 lg:hidden">
                <img 
                  src="/templates/assets/flower_left_shape.png" 
                  alt="" 
                  className="w-full h-full object-contain"
                />
              </div>
              
              <div className="relative w-48 h-48 lg:w-80 lg:h-80 mx-auto mb-6">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl">
                  <Image
                    src={data.brideImage || placeholders.bride}
                    alt={data.brideName}
                    width={320}
                    height={320}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    quality={90}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  />
                </div>
              </div>
              <h3 className="text-3xl lg:text-5xl mb-3" style={{ fontFamily: 'var(--font-dancing)', color: '#6B7C6F', fontWeight: 400 }}>
                {data.brideName}
              </h3>
              <p className="text-gray-600 text-sm lg:text-base max-w-sm mx-auto leading-relaxed" style={{ fontFamily: 'var(--font-playfair)' }}>
                {data.aboutBride || 'A beautiful soul ready to embark on this wonderful journey of love and companionship.'}
              </p>
            </div>

            {/* Groom Profile */}
            <div className="profile-card text-center max-w-sm relative">
              <div className="absolute -right-24 top-1/2 -translate-y-1/2 w-32 h-48 lg:hidden">
                <img 
                  src="/templates/assets/flower_right_shape.png" 
                  alt="" 
                  className="w-full h-full object-contain"
                />
              </div>
              
              <div className="relative w-48 h-48 lg:w-80 lg:h-80 mx-auto mb-6">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl">
                  <Image
                    src={data.groomImage || placeholders.groom}
                    alt={data.groomName}
                    width={320}
                    height={320}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    quality={90}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  />
                </div>
              </div>
              <h3 className="text-3xl lg:text-5xl mb-3" style={{ fontFamily: 'var(--font-dancing)', color: '#6B7C6F', fontWeight: 400 }}>
                {data.groomName}
              </h3>
              <p className="text-gray-600 text-sm lg:text-base max-w-sm mx-auto leading-relaxed" style={{ fontFamily: 'var(--font-playfair)' }}>
                {data.aboutGroom || 'A wonderful person ready to start this new chapter of life filled with love and happiness.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}