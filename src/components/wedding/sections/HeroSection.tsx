'use client'

import { User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { WeddingData } from '../types'
import { placeholders } from '../utils/placeholders'

interface HeroSectionProps {
  data: WeddingData
}

// Separate calendar components for better performance
function MobileCalendar({ date, names }: { date: string; names: string }) {
  const weddingDate = new Date(date)
  const month = weddingDate.toLocaleString('default', { month: 'long' })
  const day = weddingDate.getDate()
  const year = weddingDate.getFullYear()
  
  return (
    <div className="relative flex flex-col items-center">
      <div className="w-[450px] h-[150px] -mb-12">
        <Image 
          src="/templates/assets/flower_calendar_top.png" 
          alt="" 
          width={450}
          height={150}
          className="w-full h-full object-contain"
          priority
        />
      </div>
      
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-[380px] relative z-10">
        <div className="text-center mb-4">
          <h3 className="text-2xl font-dancing text-purple-600">{names}</h3>
        </div>
        <div className="bg-purple-50 rounded-2xl p-6">
          <div className="text-center">
            <div className="text-lg font-medium text-purple-600 mb-2">{month}</div>
            <div className="text-5xl font-bold text-purple-700 mb-2">{day}</div>
            <div className="text-lg text-purple-600">{year}</div>
          </div>
        </div>
      </div>
      
      <div className="w-[450px] h-[150px] -mt-12">
        <Image 
          src="/templates/assets/flower_calendar_down.png" 
          alt="" 
          width={450}
          height={150}
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  )
}

export default function HeroSection({ data }: HeroSectionProps) {
  const coupleNames = `${data.brideName} & ${data.groomName}`
  
  return (
    <section className="hero-section relative min-h-screen flex items-center justify-center py-8 lg:py-16 bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Guest Profile Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-white/90 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-3 lg:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 lg:gap-4">
              <div className="relative">
                <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center ring-2 ring-white shadow-md">
                  {data.guestProfileImage ? (
                    <img 
                      src={data.guestProfileImage} 
                      alt={data.guestName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-6 h-6 lg:w-7 lg:h-7 text-purple-600" />
                  )}
                </div>
              </div>
              <div>
                <p className="text-sm lg:text-base font-medium text-gray-800">Welcome,</p>
                <p className="text-base lg:text-lg font-semibold text-gray-900">{data.guestName || 'Guest'}</p>
              </div>
            </div>
            
            {data.guestId && data.weddingUrl && (
              <Link 
                href={`/wedding/${data.weddingUrl}/edit-profile?guest=${data.guestId}`}
                className="text-purple-600 hover:text-purple-700 transition-colors"
              >
                <span className="text-sm lg:text-base font-medium">Edit Profile</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center justify-center gap-24">
          <div className="hero-couple-image relative flex-shrink-0 flex items-center justify-center w-[750px] h-[750px]">
            <Image 
              src="/templates/assets/flower_couple_background.png" 
              alt="" 
              width={750}
              height={750}
              className="absolute top-0 left-0 w-full h-full object-contain z-0"
              priority
            />
            <div className="relative z-20 w-[500px] h-[500px]">
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl">
                <Image
                  src={data.coupleImage || placeholders.couple}
                  alt={coupleNames}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>
          
          <div className="hero-calendar">
            <MobileCalendar date={data.weddingDate} names={coupleNames} />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="flex flex-col lg:hidden items-center space-y-8">
          <div className="hero-couple-image relative flex-shrink-0 flex items-center justify-center w-[400px] h-[400px]">
            <Image 
              src="/templates/assets/flower_couple_background.png" 
              alt="" 
              width={400}
              height={400}
              className="absolute top-0 left-0 w-full h-full object-contain z-0"
              priority
            />
            <div className="relative z-20 w-[240px] h-[240px]">
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl">
                <Image
                  src={data.coupleImage || placeholders.couple}
                  alt={coupleNames}
                  width={240}
                  height={240}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>
          
          <div className="hero-calendar">
            <MobileCalendar date={data.weddingDate} names={coupleNames} />
          </div>
        </div>
      </div>
    </section>
  )
}