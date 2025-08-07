'use client'

import { useState, useEffect, useRef } from 'react'
import { Calendar, MapPin, Clock, Heart, ChevronDown, MessageCircle, X, Send, Navigation, Sparkles, Users, Facebook, Twitter, Instagram, Wine, Heart as HeartIcon, Camera, Utensils, Cake, User, Car, Bot } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useGSAP, fadeInUp, fadeIn, scaleIn, slideInLeft, slideInRight } from '@/hooks/useGSAP'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface EventDetail {
  name: string
  date: string
  time: string
  venue: string
  mapUrl?: string
  icon?: string
}

interface TeamMember {
  name: string
  role: string
  image?: string
}

interface WeddingData {
  brideName: string
  groomName: string
  weddingDate: string
  venue: string
  coupleImage?: string
  brideImage?: string
  groomImage?: string
  events: EventDetail[]
  story: string
  howWeMet?: string
  aboutBride?: string
  aboutGroom?: string
  gallery?: string[]
  bridesmaids?: TeamMember[]
  groomsmen?: TeamMember[]
  families: {
    bride: {
      father: string
      mother: string
    }
    groom: {
      father: string
      mother: string
    }
  }
}

interface Template001Props {
  data: WeddingData
}

function MobileCalendarWidget({ targetDate, coupleNames }: { targetDate: string; coupleNames: string }) {
  const [currentDate, setCurrentDate] = useState(new Date())
  
  const weddingDate = new Date(targetDate)
  const currentMonth = weddingDate.toLocaleString('default', { month: 'long' })
  const currentYear = weddingDate.getFullYear()
  
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }
  
  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }
  
  const daysInMonth = getDaysInMonth(weddingDate)
  const firstDay = getFirstDayOfMonth(weddingDate)
  const weddingDay = weddingDate.getDate()
  
  const days = []
  
  // Empty cells for days before the first day of month
  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }
  
  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day)
  }
  
  return (
    <div className="relative flex flex-col items-center">
      {/* Top floral decoration - match mobile couple size */}
      <div className="w-[400px] h-[120px] -mb-8">
        <img 
          src="/templates/assets/flower_calendar_top.png" 
          alt="" 
          className="w-full h-full object-contain"
        />
      </div>
      
      {/* Calendar container - no background, compact */}
      <div className="relative z-10 w-72 py-2">
        {/* Couple names */}
        <div className="text-center mb-2">
          <h2 className="text-3xl font-dancing text-gray-700 mb-2">{coupleNames}</h2>
          <p className="text-gray-600 font-light text-lg">{currentMonth} {currentYear}</p>
        </div>
        
        {/* Calendar grid */}
        <div className="space-y-2">
          {/* Days of week header */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {['S', 'S', 'M', 'T', 'W', 'T', 'F'].map((dayName, index) => (
              <div key={index} className="text-sm font-medium text-gray-600 py-1">
                {dayName}
              </div>
            ))}
          </div>
          
          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => (
              <div key={index} className="aspect-square flex items-center justify-center">
                {day && (
                  <div className={`w-8 h-8 flex items-center justify-center rounded-full text-sm ${
                    day === weddingDay 
                      ? 'text-red-500' 
                      : 'text-gray-600'
                  }`}>
                    {day === weddingDay ? (
                      <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                    ) : (
                      day
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom floral decoration - same size as top */}
      <div className="w-[400px] h-[120px] -mt-8">
        <img 
          src="/templates/assets/flower_calendar_down.png" 
          alt="" 
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  )
}

function DesktopCalendarWidget({ targetDate, coupleNames }: { targetDate: string; coupleNames: string }) {
  const [currentDate, setCurrentDate] = useState(new Date())
  
  const weddingDate = new Date(targetDate)
  const currentMonth = weddingDate.toLocaleString('default', { month: 'long' })
  const currentYear = weddingDate.getFullYear()
  
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }
  
  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }
  
  const daysInMonth = getDaysInMonth(weddingDate)
  const firstDay = getFirstDayOfMonth(weddingDate)
  const weddingDay = weddingDate.getDate()
  
  const days = []
  
  // Empty cells for days before the first day of month
  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }
  
  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day)
  }
  
  return (
    <div className="relative flex flex-col items-center w-[700px]">
      {/* Top floral decoration - larger size for desktop */}
      <div className="w-[600px] h-[140px] -mb-12">
        <img 
          src="/templates/assets/flower_calendar_top.png" 
          alt="" 
          className="w-full h-full object-contain"
        />
      </div>
      
      {/* Calendar container - no background, with padding */}
      <div className="relative z-10 w-[450px] py-6">
        {/* Couple names */}
        <div className="text-center mb-4">
          <h2 className="text-5xl font-dancing text-gray-600 mb-3">{coupleNames}</h2>
          <p className="text-gray-500 font-light text-2xl">{currentMonth} {currentYear}</p>
        </div>
        
        {/* Calendar grid */}
        <div className="space-y-3">
          {/* Days of week header */}
          <div className="grid grid-cols-7 gap-2 text-center">
            {['S', 'S', 'M', 'T', 'W', 'T', 'F'].map((dayName, index) => (
              <div key={index} className="text-base font-medium text-gray-600 py-2">
                {dayName}
              </div>
            ))}
          </div>
          
          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-2">
            {days.map((day, index) => (
              <div key={index} className="aspect-square flex items-center justify-center">
                {day && (
                  <div className={`w-10 h-10 flex items-center justify-center rounded-full text-base ${
                    day === weddingDay 
                      ? 'text-red-500' 
                      : 'text-gray-600'
                  }`}>
                    {day === weddingDay ? (
                      <Heart className="w-6 h-6 fill-red-500 text-red-500" />
                    ) : (
                      day
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom floral decoration - larger size for desktop */}
      <div className="w-[600px] h-[140px] -mt-12">
        <img 
          src="/templates/assets/flower_calendar_down.png" 
          alt="" 
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  )
}

function CalendarWidget({ targetDate, coupleNames }: { targetDate: string; coupleNames: string }) {
  const [currentDate, setCurrentDate] = useState(new Date())
  
  const weddingDate = new Date(targetDate)
  const currentMonth = weddingDate.toLocaleString('default', { month: 'long' })
  const currentYear = weddingDate.getFullYear()
  
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }
  
  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }
  
  const daysInMonth = getDaysInMonth(weddingDate)
  const firstDay = getFirstDayOfMonth(weddingDate)
  const weddingDay = weddingDate.getDate()
  
  const days = []
  
  // Empty cells for days before the first day of month
  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }
  
  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day)
  }
  
  return (
    <div className="relative">
      {/* Top floral decoration */}
      <div className="absolute -top-8 lg:-top-12 left-1/2 transform -translate-x-1/2 w-64 lg:w-80 h-20 lg:h-24">
        <img 
          src="/templates/assets/flower_calendar_top.png" 
          alt="" 
          className="w-full h-full object-contain"
        />
      </div>
      
      {/* Calendar container */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-lg border border-gray-100 relative z-10 w-72 lg:w-80">
        {/* Couple names */}
        <div className="text-center mb-4 lg:mb-6">
          <h2 className="text-xl lg:text-2xl font-script text-gray-700 mb-1">{coupleNames}</h2>
          <p className="text-gray-600 font-light text-sm lg:text-base">{currentMonth} {currentYear}</p>
        </div>
        
        {/* Calendar grid */}
        <div className="space-y-3 lg:space-y-4">
          {/* Days of week header */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {['S', 'S', 'M', 'T', 'W', 'T', 'F'].map((dayName, index) => (
              <div key={index} className="text-xs lg:text-sm font-medium text-gray-600 py-2">
                {dayName}
              </div>
            ))}
          </div>
          
          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => (
              <div key={index} className="aspect-square flex items-center justify-center">
                {day && (
                  <div className={`w-7 lg:w-8 h-7 lg:h-8 flex items-center justify-center rounded-full text-xs lg:text-sm ${
                    day === weddingDay 
                      ? 'bg-blue-500 text-white font-semibold' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}>
                    {day}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom floral decoration */}
      <div className="absolute -bottom-6 lg:-bottom-8 left-1/2 transform -translate-x-1/2 w-64 lg:w-80 h-16 lg:h-20">
        <img 
          src="/templates/assets/flower_calendar_down.png" 
          alt="" 
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  )
}

export default function Template001({ data }: Template001Props) {
  const heroRef = useRef<HTMLDivElement>(null)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [chatMessage, setChatMessage] = useState('')
  const [chatMessages, setChatMessages] = useState<Array<{text: string, isUser: boolean}>>([])
  
  const coupleNames = `${data.brideName} & ${data.groomName}`
  
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
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)
        
        setTimeLeft({ days, hours, minutes, seconds })
      }
    }
    
    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    
    return () => clearInterval(timer)
  }, [data.weddingDate, isClient])
  
  useGSAP(() => {
    // Hero animations
    const heroTimeline = gsap.timeline()
    heroTimeline
      .fromTo('.hero-couple-image', 
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out' }
      )
      .fromTo('.hero-calendar',
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: 'power3.out' },
        '-=0.8'
      )
      
    // Countdown animations
    gsap.fromTo('.countdown-item',
      { scale: 0, opacity: 0 },
      { 
        scale: 1, 
        opacity: 1, 
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.countdown-section',
          start: 'top 80%',
          once: true
        }
      }
    )
    
    // Profile animations
    gsap.fromTo('.profile-card',
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1,
        stagger: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.profiles-section',
          start: 'top 80%',
          once: true
        }
      }
    )
    
    // Gallery animations - Elegant and smooth
    gsap.fromTo('.gallery-title',
      { y: 40, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.gallery-section',
          start: 'top 80%',
          once: true
        }
      }
    )
    
    // Simple fade in for gallery items
    gsap.fromTo('.gallery-grid .gallery-item',
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.gallery-grid',
          start: 'top 85%',
          once: true
        }
      }
    )
    
    // Thumbnail gallery simple animation
    gsap.fromTo('.gallery-thumbnails .gallery-item',
      { scale: 0.8, opacity: 0 },
      { 
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.05,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.gallery-thumbnails',
          start: 'top 85%',
          once: true
        }
      }
    )
    
    // Event timeline animations
    gsap.fromTo('.timeline-title',
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.timeline-section',
          start: 'top 80%',
          once: true
        }
      }
    )
    
    gsap.fromTo('.timeline-item',
      { y: 40, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.timeline-container',
          start: 'top 85%',
          once: true
        }
      }
    )
  }, [])

  const handleUpcomingEventClick = () => {
    // Navigate to wedding page with guest parameter
    const coupleName = coupleNames.replace(' & ', '-').toLowerCase()
    const guestName = 'Guest Name' // This would be dynamic based on actual guest
    window.location.href = `/wedding/${coupleName}?guest=${encodeURIComponent(guestName)}`
  }
  
  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Guest Name */}
            <div>
              <p className="text-lg font-bold text-gray-800">Guest Name</p>
            </div>
            
            {/* Upcoming Event Button */}
            <button
              onClick={handleUpcomingEventClick}
              className="px-5 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium text-sm hover:from-purple-600 hover:to-pink-600 transition-colors shadow-md"
            >
              Upcoming Events
            </button>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center py-8 lg:py-20 mt-16">
        {/* Welcome Header - Now removed since it's in sticky header */}
        
        <div className="container mx-auto px-4">
          {/* Desktop Layout */}
          <div className="hidden lg:flex items-center justify-center gap-24">
            {/* Couple Image with Floral Frame - Larger Size */}
            <div className="hero-couple-image relative flex-shrink-0 flex items-center justify-center w-[750px] h-[750px]">
              {/* Floral decorations positioned around the couple image */}
              <img 
                src="/templates/assets/flower_couple_background.png" 
                alt="" 
                className="absolute top-0 left-0 w-full h-full object-contain z-0 animate-spin-slow"
              />
              
              {/* Couple photo in circle - centered and elevated */}
              <div className="relative z-20 w-[500px] h-[500px]">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl">
                  <img
                    src={data.coupleImage || '/couple_image.jpg'}
                    alt={coupleNames}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            
            {/* Calendar Widget - Desktop with Floral Design - Equal Size */}
            <div className="hero-calendar flex-shrink-0">
              <DesktopCalendarWidget 
                targetDate={data.weddingDate} 
                coupleNames={coupleNames}
              />
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="flex flex-col lg:hidden items-center space-y-8">
            {/* Couple Image with Floral Frame - Mobile */}
            <div className="hero-couple-image relative flex-shrink-0 flex items-center justify-center w-[400px] h-[400px]">
              {/* Floral decorations positioned around the couple image */}
              <img 
                src="/templates/assets/flower_couple_background.png" 
                alt="" 
                className="absolute top-0 left-0 w-full h-full object-contain z-0 animate-spin-slow"
              />
              
              {/* Couple photo in circle - centered and elevated */}
              <div className="relative z-20 w-[240px] h-[240px]">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl">
                  <img
                    src={data.coupleImage || '/couple_image.jpg'}
                    alt={coupleNames}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            
            {/* Calendar Widget - Mobile */}
            <div className="hero-calendar flex-shrink-0">
              <MobileCalendarWidget 
                targetDate={data.weddingDate} 
                coupleNames={coupleNames}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Countdown & Profiles Section */}
      <section className="py-16 lg:py-32 bg-white relative overflow-hidden">
        {/* Left decorative element - hidden on mobile */}
        <div className="hidden lg:block absolute -left-10 top-1/2 -translate-y-1/2 w-96 h-[550px]">
          <img 
            src="/templates/assets/flower_left_shape.png" 
            alt="" 
            className="w-full h-full object-contain object-left"
          />
        </div>
        
        {/* Right decorative element - hidden on mobile */}
        <div className="hidden lg:block absolute -right-10 top-1/2 -translate-y-1/2 w-96 h-[550px]">
          <img 
            src="/templates/assets/flower_right_shape.png" 
            alt="" 
            className="w-full h-full object-contain object-right"
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
                      <img 
                        src="/templates/assets/flower_countdown.png" 
                        alt="" 
                        className="w-full h-full object-contain"
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
              {/* Bride Profile with mobile decoration */}
              <div className="profile-card text-center max-w-sm relative">
                {/* Mobile left decoration for bride */}
                <div className="absolute -left-24 top-1/2 -translate-y-1/2 w-32 h-48 lg:hidden">
                  <img 
                    src="/templates/assets/flower_left_shape.png" 
                    alt="" 
                    className="w-full h-full object-contain"
                  />
                </div>
                
                <div className="relative w-48 h-48 lg:w-80 lg:h-80 mx-auto mb-6">
                  <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl">
                    <img
                      src={data.brideImage || '/couple_image.jpg'}
                      alt={data.brideName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <h3 className="text-2xl lg:text-4xl font-dancing text-gray-600 mb-3">
                  {data.brideName} Agarwal
                </h3>
                <p className="text-gray-500 text-sm lg:text-lg max-w-sm mx-auto mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna arci auctor vitae nisl. Fringilla pellesque amet tempus.
                </p>
                <div className="flex justify-center gap-4">
                  <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Groom Profile with mobile decoration */}
              <div className="profile-card text-center max-w-sm relative">
                {/* Mobile right decoration for groom */}
                <div className="absolute -right-24 top-1/2 -translate-y-1/2 w-32 h-48 lg:hidden">
                  <img 
                    src="/templates/assets/flower_right_shape.png" 
                    alt="" 
                    className="w-full h-full object-contain"
                  />
                </div>
                
                <div className="relative w-48 h-48 lg:w-80 lg:h-80 mx-auto mb-6">
                  <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl">
                    <img
                      src={data.groomImage || '/couple_image.jpg'}
                      alt={data.groomName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <h3 className="text-2xl lg:text-4xl font-dancing text-gray-600 mb-3">
                  {data.groomName} Mishra
                </h3>
                <p className="text-gray-500 text-sm lg:text-lg max-w-sm mx-auto mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna arci auctor vitae nisl. Fringilla pellesque amet tempus.
                </p>
                <div className="flex justify-center gap-4">
                  <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Gallery Section */}
      <section className="gallery-section py-20 lg:py-32 bg-gray-50 mt-16">
        <div className="container mx-auto px-4">
          {/* Section Title */}
          <div className="gallery-title text-center mb-16 lg:mb-20">
            <h2 className="text-3xl lg:text-4xl font-dancing text-gray-400 mb-3">Sweet Memories</h2>
            <h3 className="text-2xl lg:text-3xl font-light text-gray-600">Our Captured Moment</h3>
            <div className="w-24 h-0.5 bg-gray-300 mx-auto mt-6"></div>
          </div>

          {/* Gallery Grid */}
          <div className="gallery-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Gallery Item 1 - First Time We Meet */}
            <div 
              className="gallery-item group cursor-pointer"
              onClick={() => setSelectedImage("https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=1067&fit=crop")}
            >
              <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:-translate-y-2">
                <div className="aspect-[3/4] bg-gray-200">
                  <img
                    src="https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=533&fit=crop"
                    alt="First Time We Meet"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
              <div className="text-center mt-4">
                <h4 className="text-xl font-dancing text-gray-600 mb-1">First Time We Meet</h4>
                <p className="text-sm text-gray-400 uppercase tracking-wider">14 Feb 2022</p>
              </div>
            </div>

            {/* Gallery Item 2 - Our First Kiss */}
            <div 
              className="gallery-item group cursor-pointer"
              onClick={() => setSelectedImage("https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&h=1067&fit=crop")}
            >
              <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:-translate-y-2">
                <div className="aspect-[3/4] bg-gray-200">
                  <img
                    src="https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=400&h=533&fit=crop"
                    alt="Our First Kiss"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
              <div className="text-center mt-4">
                <h4 className="text-xl font-dancing text-gray-600 mb-1">Our First Kiss</h4>
                <p className="text-sm text-gray-400 uppercase tracking-wider">15 Feb 2023</p>
              </div>
            </div>

            {/* Gallery Item 3 - Our First Date */}
            <div 
              className="gallery-item group cursor-pointer"
              onClick={() => setSelectedImage("https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=1067&fit=crop")}
            >
              <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:-translate-y-2">
                <div className="aspect-[3/4] bg-gray-200">
                  <img
                    src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&h=533&fit=crop"
                    alt="Our First Date"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
              <div className="text-center mt-4">
                <h4 className="text-xl font-dancing text-gray-600 mb-1">Our First Date</h4>
                <p className="text-sm text-gray-400 uppercase tracking-wider">20 Mar 2023</p>
              </div>
            </div>

            {/* Gallery Item 4 - She Said Yes! */}
            <div 
              className="gallery-item group cursor-pointer"
              onClick={() => setSelectedImage("https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=1067&fit=crop")}
            >
              <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:-translate-y-2">
                <div className="aspect-[3/4] bg-gray-200">
                  <img
                    src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&h=533&fit=crop"
                    alt="She Said Yes!"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
              <div className="text-center mt-4">
                <h4 className="text-xl font-dancing text-gray-600 mb-1">She Said Yes!</h4>
                <p className="text-sm text-gray-400 uppercase tracking-wider">18 Sep 2023</p>
              </div>
            </div>
          </div>

          {/* Additional Gallery Rows for more photos */}
          <div className="gallery-thumbnails mt-8 lg:mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              "https://images.unsplash.com/photo-1529636798458-92182e662485?w=300&h=300&fit=crop",
              "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=300&h=300&fit=crop",
              "https://images.unsplash.com/photo-1595407753234-0882f1e77954?w=300&h=300&fit=crop",
              "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=300&h=300&fit=crop",
              "https://images.unsplash.com/photo-1519741497674-611481863552?w=300&h=300&fit=crop",
              "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=300&h=300&fit=crop"
            ].map((src, index) => (
              <div 
                key={index} 
                className="gallery-item group cursor-pointer"
                onClick={() => setSelectedImage(src.replace('w=300&h=300', 'w=600&h=600'))}
              >
                <div className="relative overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:-translate-y-1">
                  <div className="aspect-square bg-gray-200">
                    <img
                      src={src}
                      alt={`Memory ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Timeline Section */}
      <section className="timeline-section py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4">
          {/* Desktop Timeline - Horizontal */}
          <div className="hidden lg:block max-w-7xl mx-auto mt-16">
            <div className="relative">
              {/* Timeline Events */}
              <div className="flex justify-between items-start relative">
                {/* Horizontal line */}
                <div className="absolute top-[120px] left-0 right-0 h-[2px] bg-gray-300"></div>
                
                {/* Event Items */}
                <div className="flex justify-between w-full relative">
                  {/* Mehendi */}
                  <div className="timeline-item flex flex-col items-center text-center relative" style={{ width: '14.28%' }}>
                    <div className="w-16 h-16 rounded-full border-2 border-gray-400 bg-white flex items-center justify-center mb-4">
                      <Wine className="w-8 h-8 text-gray-700" />
                    </div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Mehendi</h4>
                    <div className="absolute top-[120px] left-1/2 transform -translate-x-1/2 w-[2px] h-8 bg-gray-300"></div>
                    <div className="absolute top-[152px] left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-purple-400"></div>
                    <p className="text-sm text-gray-500 mt-12">14 Feb</p>
                  </div>

                  {/* Haldi */}
                  <div className="timeline-item flex flex-col items-center text-center relative" style={{ width: '14.28%' }}>
                    <div className="w-16 h-16 rounded-full border-2 border-gray-400 bg-white flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="9" cy="9" r="3"/>
                        <circle cx="15" cy="9" r="3"/>
                        <path d="M9 12 C9 16, 15 16, 15 12"/>
                      </svg>
                    </div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Haldi</h4>
                    <div className="absolute top-[120px] left-1/2 transform -translate-x-1/2 w-[2px] h-8 bg-gray-300"></div>
                    <div className="absolute top-[152px] left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-purple-400"></div>
                    <p className="text-sm text-gray-500 mt-12">15 Feb</p>
                  </div>

                  {/* Sangeet */}
                  <div className="timeline-item flex flex-col items-center text-center relative" style={{ width: '14.28%' }}>
                    <div className="w-16 h-16 rounded-full border-2 border-gray-400 bg-white flex items-center justify-center mb-4">
                      <Camera className="w-8 h-8 text-gray-700" />
                    </div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Sangeet</h4>
                    <div className="absolute top-[120px] left-1/2 transform -translate-x-1/2 w-[2px] h-8 bg-gray-300"></div>
                    <div className="absolute top-[152px] left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-purple-400"></div>
                    <p className="text-sm text-gray-500 mt-12">15 Feb</p>
                  </div>

                  {/* Wedding */}
                  <div className="timeline-item flex flex-col items-center text-center relative" style={{ width: '14.28%' }}>
                    <div className="w-16 h-16 rounded-full border-2 border-gray-400 bg-white flex items-center justify-center mb-4">
                      <Utensils className="w-8 h-8 text-gray-700" />
                    </div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Wedding</h4>
                    <div className="absolute top-[120px] left-1/2 transform -translate-x-1/2 w-[2px] h-8 bg-gray-300"></div>
                    <div className="absolute top-[152px] left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-purple-400"></div>
                    <p className="text-sm text-gray-500 mt-12">16 Feb</p>
                  </div>

                  {/* Reception */}
                  <div className="timeline-item flex flex-col items-center text-center relative" style={{ width: '14.28%' }}>
                    <div className="w-16 h-16 rounded-full border-2 border-gray-400 bg-white flex items-center justify-center mb-4">
                      <Cake className="w-8 h-8 text-gray-700" />
                    </div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Reception</h4>
                    <div className="absolute top-[120px] left-1/2 transform -translate-x-1/2 w-[2px] h-8 bg-gray-300"></div>
                    <div className="absolute top-[152px] left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-purple-400"></div>
                    <p className="text-sm text-gray-500 mt-12">17 Feb</p>
                  </div>

                  {/* Vidaai */}
                  <div className="timeline-item flex flex-col items-center text-center relative" style={{ width: '14.28%' }}>
                    <div className="w-16 h-16 rounded-full border-2 border-gray-400 bg-white flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M9 19V13l-2 2"/>
                        <circle cx="9" cy="7" r="2"/>
                        <path d="M15 19V13l2 2"/>
                        <circle cx="15" cy="7" r="2"/>
                      </svg>
                    </div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Vidaai</h4>
                    <div className="absolute top-[120px] left-1/2 transform -translate-x-1/2 w-[2px] h-8 bg-gray-300"></div>
                    <div className="absolute top-[152px] left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-purple-400"></div>
                    <p className="text-sm text-gray-500 mt-12">17 Feb</p>
                  </div>

                  {/* Griha Pravesh */}
                  <div className="timeline-item flex flex-col items-center text-center relative" style={{ width: '14.28%' }}>
                    <div className="w-16 h-16 rounded-full border-2 border-gray-400 bg-white flex items-center justify-center mb-4">
                      <Car className="w-8 h-8 text-gray-700" />
                    </div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Griha Pravesh</h4>
                    <div className="absolute top-[120px] left-1/2 transform -translate-x-1/2 w-[2px] h-8 bg-gray-300"></div>
                    <div className="absolute top-[152px] left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-purple-400"></div>
                    <p className="text-sm text-gray-500 mt-12">18 Feb</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Timeline - Vertical */}
          <div className="lg:hidden max-w-md mx-auto">
            <div className="relative">
              {/* Vertical timeline line */}
              <div className="absolute left-[72px] top-0 bottom-0 w-[2px] bg-gray-300"></div>
              
              {/* Timeline Events */}
              <div className="space-y-6">
                {/* Welcome Drinks */}
                <div className="timeline-item flex items-center relative">
                  <div className="absolute left-0 text-sm text-gray-500 w-16 text-right">2:00 PM</div>
                  <div className="ml-[68px] w-2 h-2 rounded-full bg-purple-400 relative z-10"></div>
                  <div className="ml-6 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full border-2 border-gray-400 bg-white flex items-center justify-center">
                      <Wine className="w-7 h-7 text-gray-700" />
                    </div>
                    <h4 className="text-sm font-medium text-gray-700">Welcome Drinks</h4>
                  </div>
                </div>

                {/* Ceremony */}
                <div className="timeline-item flex items-center relative">
                  <div className="absolute left-0 text-sm text-gray-500 w-16 text-right">3:00 PM</div>
                  <div className="ml-[68px] w-2 h-2 rounded-full bg-purple-400 relative z-10"></div>
                  <div className="ml-6 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full border-2 border-gray-400 bg-white flex items-center justify-center">
                      <svg className="w-7 h-7 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="9" cy="9" r="3"/>
                        <circle cx="15" cy="9" r="3"/>
                        <path d="M9 12 C9 16, 15 16, 15 12"/>
                      </svg>
                    </div>
                    <h4 className="text-sm font-medium text-gray-700">Ceremony</h4>
                  </div>
                </div>

                {/* Party Photos */}
                <div className="timeline-item flex items-center relative">
                  <div className="absolute left-0 text-sm text-gray-500 w-16 text-right">5:00 PM</div>
                  <div className="ml-[68px] w-2 h-2 rounded-full bg-purple-400 relative z-10"></div>
                  <div className="ml-6 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full border-2 border-gray-400 bg-white flex items-center justify-center">
                      <Camera className="w-7 h-7 text-gray-700" />
                    </div>
                    <h4 className="text-sm font-medium text-gray-700">Party Photos</h4>
                  </div>
                </div>

                {/* Dinner */}
                <div className="timeline-item flex items-center relative">
                  <div className="absolute left-0 text-sm text-gray-500 w-16 text-right">7:00 PM</div>
                  <div className="ml-[68px] w-2 h-2 rounded-full bg-purple-400 relative z-10"></div>
                  <div className="ml-6 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full border-2 border-gray-400 bg-white flex items-center justify-center">
                      <Utensils className="w-7 h-7 text-gray-700" />
                    </div>
                    <h4 className="text-sm font-medium text-gray-700">Dinner</h4>
                  </div>
                </div>

                {/* Cake Cutting */}
                <div className="timeline-item flex items-center relative">
                  <div className="absolute left-0 text-sm text-gray-500 w-16 text-right">9:00 PM</div>
                  <div className="ml-[68px] w-2 h-2 rounded-full bg-purple-400 relative z-10"></div>
                  <div className="ml-6 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full border-2 border-gray-400 bg-white flex items-center justify-center">
                      <Cake className="w-7 h-7 text-gray-700" />
                    </div>
                    <h4 className="text-sm font-medium text-gray-700">Cake Cutting</h4>
                  </div>
                </div>

                {/* First Dance */}
                <div className="timeline-item flex items-center relative">
                  <div className="absolute left-0 text-sm text-gray-500 w-16 text-right">10:00 PM</div>
                  <div className="ml-[68px] w-2 h-2 rounded-full bg-purple-400 relative z-10"></div>
                  <div className="ml-6 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full border-2 border-gray-400 bg-white flex items-center justify-center">
                      <svg className="w-7 h-7 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M9 19V13l-2 2"/>
                        <circle cx="9" cy="7" r="2"/>
                        <path d="M15 19V13l2 2"/>
                        <circle cx="15" cy="7" r="2"/>
                      </svg>
                    </div>
                    <h4 className="text-sm font-medium text-gray-700">First Dance</h4>
                  </div>
                </div>
              </div>
            </div>
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
            <img
              src={selectedImage}
              alt="Preview"
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-4 -right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Sticky Chat Bar */}
      {!isChatOpen && (
        <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-gradient-to-t from-white via-white to-transparent">
          <div 
            className="max-w-2xl mx-auto bg-white rounded-full shadow-lg border border-gray-200 p-3 flex items-center gap-3 cursor-pointer hover:shadow-xl transition-shadow"
            onClick={() => setIsChatOpen(true)}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <input
              type="text"
              placeholder="Ask me anything about the wedding..."
              className="flex-1 bg-transparent outline-none text-gray-600 placeholder-gray-400"
              readOnly
            />
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">AI Assistant</span>
            </div>
          </div>
        </div>
      )}

      {/* Chat Modal */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full sm:max-w-lg h-[80vh] sm:h-[600px] rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Wedding Assistant</h3>
                  <p className="text-xs text-gray-500">Always here to help</p>
                </div>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-purple-500" />
                  </div>
                  <h4 className="text-lg font-medium text-gray-700 mb-2">Hi! I'm your Wedding Assistant</h4>
                  <p className="text-sm text-gray-500 mb-6">I can help you with:</p>
                  <div className="grid grid-cols-2 gap-2 max-w-sm mx-auto">
                    <button 
                      className="text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      onClick={() => {
                        setChatMessages([
                          {text: "What's the venue address?", isUser: true},
                          {text: `The wedding will be held at ${data.venue}. You can find directions and parking information on our website.`, isUser: false}
                        ])
                      }}
                    >
                      <MapPin className="w-4 h-4 text-purple-500 mb-1" />
                      <p className="text-xs text-gray-600">Venue details</p>
                    </button>
                    <button 
                      className="text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      onClick={() => {
                        setChatMessages([
                          {text: "What time does the ceremony start?", isUser: true},
                          {text: "The ceremony begins at 3:00 PM on February 16th. We recommend arriving 15 minutes early.", isUser: false}
                        ])
                      }}
                    >
                      <Clock className="w-4 h-4 text-purple-500 mb-1" />
                      <p className="text-xs text-gray-600">Event timings</p>
                    </button>
                    <button 
                      className="text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      onClick={() => {
                        setChatMessages([
                          {text: "What's the dress code?", isUser: true},
                          {text: "The dress code is traditional Indian attire. For the wedding ceremony, we suggest wearing vibrant colors. White is traditionally avoided.", isUser: false}
                        ])
                      }}
                    >
                      <Users className="w-4 h-4 text-purple-500 mb-1" />
                      <p className="text-xs text-gray-600">Dress code</p>
                    </button>
                    <button 
                      className="text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      onClick={() => {
                        setChatMessages([
                          {text: "Is there parking available?", isUser: true},
                          {text: "Yes! Free valet parking is available at the venue. There's also self-parking available in the adjacent lot.", isUser: false}
                        ])
                      }}
                    >
                      <Car className="w-4 h-4 text-purple-500 mb-1" />
                      <p className="text-xs text-gray-600">Parking info</p>
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-3 rounded-2xl ${
                        msg.isUser 
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        <p className="text-sm">{msg.text}</p>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-gray-200">
              <form 
                onSubmit={(e) => {
                  e.preventDefault()
                  if (chatMessage.trim()) {
                    const newMessages = [...chatMessages, {text: chatMessage, isUser: true}]
                    setChatMessages(newMessages)
                    
                    // Simulate AI response
                    setTimeout(() => {
                      const responses = [
                        `That's a great question about "${chatMessage}". Let me help you with that!`,
                        `Regarding "${chatMessage}", I'd be happy to provide more information.`,
                        `Thanks for asking about "${chatMessage}". Here's what you need to know...`
                      ]
                      setChatMessages([...newMessages, {
                        text: responses[Math.floor(Math.random() * responses.length)], 
                        isUser: false
                      }])
                    }, 1000)
                    
                    setChatMessage('')
                  }
                }}
                className="flex items-center gap-2 bg-gray-50 rounded-full p-2"
              >
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-transparent outline-none px-3 text-gray-700 placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}