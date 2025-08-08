'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { WeddingData } from '../types'

interface CountdownSectionProps {
  data: WeddingData
}

export default function CountdownSection({ data }: CountdownSectionProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(data.weddingDate) - +new Date()
      
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
  }, [data.weddingDate])

  const countdownItems = [
    { value: timeLeft.days, label: 'Days', position: 'top-left' },
    { value: timeLeft.hours, label: 'Hours', position: 'top-right' },
    { value: timeLeft.minutes, label: 'Mins', position: 'bottom-left' },
    { value: timeLeft.seconds, label: 'Secs', position: 'bottom-right' }
  ]

  return (
    <section className="countdown-wrapper py-16 lg:py-24 bg-white relative overflow-hidden">
      {/* Left decorative element */}
      <div className="hidden lg:block absolute -left-10 top-1/2 -translate-y-1/2 w-96 h-[550px]">
        <Image 
          src="/templates/assets/flower_left_shape.png" 
          alt=""
          width={384}
          height={550}
          className="w-full h-full object-contain object-left"
          loading="lazy"
        />
      </div>
      
      {/* Right decorative element */}
      <div className="hidden lg:block absolute -right-10 top-1/2 -translate-y-1/2 w-96 h-[550px]">
        <Image 
          src="/templates/assets/flower_right_shape.png" 
          alt=""
          width={384}
          height={550}
          className="w-full h-full object-contain object-right"
          loading="lazy"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="countdown-section mb-16 lg:mb-24">
          <div className="flex flex-wrap justify-center gap-6 lg:gap-12">
            {countdownItems.map((item) => (
              <div key={item.label} className="countdown-item relative">
                <div className="relative w-32 h-32 lg:w-48 lg:h-48">
                  {/* Circular background */}
                  <div className="absolute inset-0 bg-blue-50 rounded-full border-2 border-blue-100"></div>
                  
                  {/* Flower decoration */}
                  <div className={`absolute w-16 h-16 lg:w-24 lg:h-24 ${
                    item.position === 'top-left' ? '-top-4 -left-4' :
                    item.position === 'top-right' ? '-top-4 -right-4' :
                    item.position === 'bottom-left' ? '-bottom-4 -left-4' :
                    '-bottom-4 -right-4'
                  }`}>
                    <Image 
                      src="/templates/assets/flower_countdown.png" 
                      alt=""
                      width={96}
                      height={96}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="relative h-full flex flex-col items-center justify-center">
                    <span className="text-3xl lg:text-5xl font-bold text-blue-600">
                      {item.value.toString().padStart(2, '0')}
                    </span>
                    <span className="text-sm lg:text-base text-gray-600 mt-1">
                      {item.label}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}