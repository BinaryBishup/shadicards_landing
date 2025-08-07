'use client'

import { useState, useEffect, useRef } from 'react'
import { Calendar, MapPin, Clock, ChevronDown, MessageCircle, X, Send, Heart, User, Edit, CalendarDays } from 'lucide-react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faGlassCheers, faRing, faCamera, faUtensils, faCake, 
  faMusic, faCar, faHeart, faGift, faPrayingHands,
  faUsers, faDrum, faHandHoldingHeart, IconDefinition
} from '@fortawesome/free-solid-svg-icons'

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
  color?: string
}

interface TeamMember {
  name: string
  role: string
  image?: string
}

interface StoryItem {
  title: string
  date?: string
  description: string
  image: string
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
      father?: string
      mother?: string
      siblings?: Array<{ name: string; relation: string }>
    }
    groom: {
      father?: string
      mother?: string
      siblings?: Array<{ name: string; relation: string }>
    }
  }
  guestName?: string
  guestId?: string
  guestProfileImage?: string
  guestSide?: string
  weddingUrl?: string
  // Story items for multiple story sections
  storyItems?: StoryItem[]
  // Section visibility controls
  showHero?: boolean
  showCoupleProfiles?: boolean
  showStory?: boolean
  showGallery?: boolean
  showEvents?: boolean
  showChat?: boolean
  showFamilies?: boolean
  showWeddingParty?: boolean
}

interface Template001Props {
  data: WeddingData
}

function MobileCalendarWidget({ targetDate, coupleNames }: { targetDate: string; coupleNames: string }) {
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
      {/* Top floral decoration */}
      <div className="w-[450px] h-[150px] -mb-12">
        <img 
          src="/templates/assets/flower_calendar_top.png" 
          alt="" 
          className="w-full h-full object-contain"
        />
      </div>
      
      {/* Calendar container - no background for mobile */}
      <div className="relative z-10 w-[320px] py-4">
        {/* Couple names */}
        <div className="text-center mb-3">
          <h2 className="text-4xl font-dancing text-gray-600 mb-2">{coupleNames}</h2>
          <p className="text-gray-500 font-light text-lg tracking-wide">{currentMonth} {currentYear}</p>
        </div>
        
        {/* Calendar grid */}
        <div className="space-y-1">
          {/* Days of week header */}
          <div className="grid grid-cols-7 gap-0 text-center">
            {['S', 'S', 'M', 'T', 'W', 'T', 'F'].map((dayName, index) => (
              <div key={index} className="text-xs font-medium text-gray-600 py-1">
                {dayName}
              </div>
            ))}
          </div>
          
          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-0">
            {days.map((day, index) => (
              <div key={index} className="aspect-square flex items-center justify-center">
                {day && (
                  <div className={`w-7 h-7 flex items-center justify-center rounded-full text-xs ${
                    day === weddingDay 
                      ? 'text-red-500' 
                      : 'text-gray-600'
                  }`}>
                    {day === weddingDay ? (
                      <Heart className="w-4 h-4 fill-red-500 text-red-500" />
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
      
      {/* Bottom floral decoration */}
      <div className="w-[450px] h-[150px] -mt-12">
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
      <div className="w-[750px] h-[200px] -mb-20">
        <img 
          src="/templates/assets/flower_calendar_top.png" 
          alt="" 
          className="w-full h-full object-contain"
        />
      </div>
      
      {/* Calendar container - no background, with padding */}
      <div className="relative z-10 w-[400px] py-4">
        {/* Couple names */}
        <div className="text-center mb-3">
          <h2 className="text-5xl font-dancing text-gray-600 mb-2">{coupleNames}</h2>
          <p className="text-gray-500 font-light text-xl tracking-wide">{currentMonth} {currentYear}</p>
        </div>
        
        {/* Calendar grid */}
        <div className="space-y-1">
          {/* Days of week header */}
          <div className="grid grid-cols-7 gap-0 text-center">
            {['S', 'S', 'M', 'T', 'W', 'T', 'F'].map((dayName, index) => (
              <div key={index} className="text-sm font-medium text-gray-600 py-1">
                {dayName}
              </div>
            ))}
          </div>
          
          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-0">
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
      
      {/* Bottom floral decoration - larger size for desktop */}
      <div className="w-[750px] h-[200px] -mt-20">
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
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [isClient, setIsClient] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [inputMessage, setInputMessage] = useState('')
  const [messages, setMessages] = useState<Array<{text: string, isUser: boolean}>>([])
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  
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

  // GSAP Animations
  useEffect(() => {
    if (!isClient) return

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
  }, [isClient])

  const sendMessage = () => {
    if (!inputMessage.trim()) return
    
    setMessages(prev => [...prev, { text: inputMessage, isUser: true }])
    
    // Simple bot response
    setTimeout(() => {
      const responses = [
        "Thank you for your message! We're so excited to celebrate with you!",
        "We can't wait to see you at our wedding!",
        "Feel free to reach out if you have any questions about the event.",
        "Thanks for being part of our special day!"
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      setMessages(prev => [...prev, { text: randomResponse, isUser: false }])
    }, 1000)
    
    setInputMessage('')
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Guest Profile Header */}
      {data.guestName ? (
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 lg:gap-4">
              {/* Profile Image */}
              <div className="relative">
                <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center ring-2 ring-white shadow-md">
                  {data.guestProfileImage ? (
                    <img 
                      src={data.guestProfileImage} 
                      alt={data.guestName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-6 h-6 lg:w-7 lg:h-7 text-purple-400" />
                  )}
                </div>
                {/* Side Badge */}
                {data.guestSide && (
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                    data.guestSide.toLowerCase() === 'bride' 
                      ? 'bg-pink-400' 
                      : 'bg-blue-400'
                  }`} />
                )}
              </div>
              
              {/* Guest Info */}
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base lg:text-lg font-semibold text-gray-800" style={{ fontFamily: 'var(--font-playfair)' }}>
                    {data.guestName}
                  </h3>
                  <span className={`hidden sm:inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                    data.guestSide?.toLowerCase() === 'bride' 
                      ? 'bg-pink-100 text-pink-700' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {data.guestSide?.toLowerCase() === 'bride' ? "Bride's Side" : "Groom's Side"}
                  </span>
                </div>
                <p className="text-xs lg:text-sm text-gray-500">
                  Welcome to {data.brideName} & {data.groomName}'s Wedding
                </p>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {/* Upcoming Events Button */}
              {data.guestId && data.weddingUrl ? (
                <Link 
                  href={`/wedding/${data.weddingUrl}/upcoming-events?guest=${data.guestId}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-purple-600 rounded-full hover:bg-purple-100 transition-colors text-sm font-medium"
                >
                  <CalendarDays className="w-4 h-4" />
                  <span className="hidden sm:inline">Events</span>
                  <span className="inline sm:hidden">{data.events?.length || 0}</span>
                </Link>
              ) : (
                <button
                  onClick={() => {
                    const eventsSection = document.querySelector('.timeline-section')
                    eventsSection?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-purple-600 rounded-full hover:bg-purple-100 transition-colors text-sm font-medium"
                >
                  <CalendarDays className="w-4 h-4" />
                  <span className="hidden sm:inline">Events</span>
                  <span className="inline sm:hidden">{data.events?.length || 0}</span>
                </button>
              )}
              
              {/* Edit Profile Button */}
              {data.guestId && data.weddingUrl && (
                <Link 
                  href={`/wedding/${data.weddingUrl}/edit-profile?guest=${data.guestId}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:shadow-md transition-shadow text-sm font-medium"
                >
                  <Edit className="w-4 h-4" />
                  <span className="hidden sm:inline">Edit Profile</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
      ) : (
      /* Default Header when no guest */
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-800" style={{ fontFamily: 'var(--font-playfair)' }}>
              {data.brideName} & {data.groomName}
            </h1>
            <p className="text-sm text-gray-500">Wedding Celebration</p>
          </div>
        </div>
      </header>
      )}
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center py-8 lg:py-20 mt-16">
        <div className="container mx-auto px-4">
          {/* Desktop Layout */}
          <div className="hidden lg:flex items-center justify-center gap-24">
            {/* Couple Image with Floral Frame - Larger Size */}
            <div className="hero-couple-image relative flex-shrink-0 flex items-center justify-center w-[750px] h-[750px]">
              {/* Floral decorations positioned around the couple image */}
              <img 
                src="/templates/assets/flower_couple_background.png" 
                alt="" 
                className="absolute top-0 left-0 w-full h-full object-contain z-0"
                style={{ animation: 'spin 30s linear infinite' }}
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
            
            {/* Calendar Widget - Desktop with Floral Design */}
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
                className="absolute top-0 left-0 w-full h-full object-contain z-0"
                style={{ animation: 'spin 30s linear infinite' }}
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
      {data.showCoupleProfiles !== false && (
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
                    <img
                      src={data.brideImage || '/couple_image.jpg'}
                      alt={data.brideName}
                      className="w-full h-full object-cover"
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
                    <img
                      src={data.groomImage || '/couple_image.jpg'}
                      alt={data.groomName}
                      className="w-full h-full object-cover"
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
      )}

      {/* Our Story Section */}
      {data.showStory !== false && (
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
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
      )}

      {/* Gallery Section */}
      {data.showGallery !== false && (
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
                      <img
                        src={image}
                        alt={`Memory ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
                {[
                  { src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=400&fit=crop", title: "First Meet" },
                  { src: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=400&h=400&fit=crop", title: "First Date" },
                  { src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&h=400&fit=crop", title: "Proposal" },
                  { src: "https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?w=400&h=400&fit=crop", title: "Engagement" }
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className="gallery-item group cursor-pointer"
                    onClick={() => setSelectedImage(item.src.replace('w=400&h=400', 'w=800&h=800'))}
                  >
                    <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:-translate-y-2">
                      <div className="aspect-square bg-gray-200">
                        <img
                          src={item.src}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
      )}

      {/* Wedding Party Section - Baraatis & Sahelis */}
      {data.showWeddingParty !== false && (data.bridesmaids?.length || data.groomsmen?.length) ? (
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
                            <img 
                              src={member.image} 
                              alt={member.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
                            <img 
                              src={member.image} 
                              alt={member.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
      ) : null}

      {/* Families Section - Parivaar */}
      {data.showFamilies !== false && (data.families?.bride || data.families?.groom) && (
      <section className="families-section py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-7xl mb-4" style={{ 
              fontFamily: 'var(--font-dancing)', 
              color: '#8B9A8C', 
              fontWeight: 400 
            }}>
              Our Families
            </h2>
            <p className="text-xl text-gray-600" style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}>
              With the blessings of our beloved parents and family
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Bride's Family - Ladki Waale */}
            {data.families?.bride && (
              <div className="text-center">
                <div className="mb-8">
                  <h3 className="text-3xl lg:text-4xl mb-6" style={{ 
                    fontFamily: 'var(--font-dancing)', 
                    color: '#D8A7A2', 
                    fontWeight: 400 
                  }}>
                    Ladki Waale
                  </h3>
                  <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-8 shadow-lg">
                    <div className="space-y-6">
                      {data.families.bride.father && (
                        <div className="border-b border-pink-200 pb-4">
                          <p className="text-sm text-gray-500 mb-1">Father</p>
                          <p className="text-xl font-semibold text-gray-800" style={{ fontFamily: 'var(--font-playfair)' }}>
                            {data.families.bride.father}
                          </p>
                        </div>
                      )}
                      {data.families.bride.mother && (
                        <div className="border-b border-pink-200 pb-4">
                          <p className="text-sm text-gray-500 mb-1">Mother</p>
                          <p className="text-xl font-semibold text-gray-800" style={{ fontFamily: 'var(--font-playfair)' }}>
                            {data.families.bride.mother}
                          </p>
                        </div>
                      )}
                      {data.families.bride.siblings && data.families.bride.siblings.length > 0 && (
                        <div>
                          <p className="text-sm text-gray-500 mb-3">Siblings</p>
                          <div className="space-y-2">
                            {data.families.bride.siblings.map((sibling, index) => (
                              <div key={index}>
                                <p className="text-lg text-gray-800" style={{ fontFamily: 'var(--font-playfair)' }}>
                                  {sibling.name}
                                </p>
                                <p className="text-sm text-gray-500 italic">{sibling.relation}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Groom's Family - Ladka Waale */}
            {data.families?.groom && (
              <div className="text-center">
                <div className="mb-8">
                  <h3 className="text-3xl lg:text-4xl mb-6" style={{ 
                    fontFamily: 'var(--font-dancing)', 
                    color: '#7C9885', 
                    fontWeight: 400 
                  }}>
                    Ladka Waale
                  </h3>
                  <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-3xl p-8 shadow-lg">
                    <div className="space-y-6">
                      {data.families.groom.father && (
                        <div className="border-b border-blue-200 pb-4">
                          <p className="text-sm text-gray-500 mb-1">Father</p>
                          <p className="text-xl font-semibold text-gray-800" style={{ fontFamily: 'var(--font-playfair)' }}>
                            {data.families.groom.father}
                          </p>
                        </div>
                      )}
                      {data.families.groom.mother && (
                        <div className="border-b border-blue-200 pb-4">
                          <p className="text-sm text-gray-500 mb-1">Mother</p>
                          <p className="text-xl font-semibold text-gray-800" style={{ fontFamily: 'var(--font-playfair)' }}>
                            {data.families.groom.mother}
                          </p>
                        </div>
                      )}
                      {data.families.groom.siblings && data.families.groom.siblings.length > 0 && (
                        <div>
                          <p className="text-sm text-gray-500 mb-3">Siblings</p>
                          <div className="space-y-2">
                            {data.families.groom.siblings.map((sibling, index) => (
                              <div key={index}>
                                <p className="text-lg text-gray-800" style={{ fontFamily: 'var(--font-playfair)' }}>
                                  {sibling.name}
                                </p>
                                <p className="text-sm text-gray-500 italic">{sibling.relation}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Blessing Quote */}
          <div className="text-center mt-12">
            <p className="text-2xl text-gray-600 italic" style={{ fontFamily: 'var(--font-dancing)' }}>
              "Two families become one, united in love and celebration"
            </p>
          </div>
        </div>
      </section>
      )}

      {/* Events Timeline Section */}
      {data.showEvents !== false && (
      <section className="timeline-section py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4">
          {/* Section Title */}
          <div className="timeline-title text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-dancing text-gray-700 mb-3">Wedding Events</h2>
            <p className="text-lg text-gray-500">Join Us In Our Celebration</p>
            <div className="w-24 h-0.5 bg-gray-300 mx-auto mt-6"></div>
          </div>

          {/* Desktop Timeline - Horizontal */}
          <div className="hidden lg:block max-w-7xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute top-[120px] left-8 right-8 h-[2px] bg-gray-300"></div>
              
              {/* Events */}
              <div className="flex justify-between relative px-8">
                {data.events.map((event, index) => {
                  // Map icon names to FontAwesome icons
                  const iconMap: { [key: string]: IconDefinition } = {
                    'glass-cheers': faGlassCheers,
                    'ring': faRing,
                    'camera': faCamera,
                    'utensils': faUtensils,
                    'cake': faCake,
                    'music': faMusic,
                    'car': faCar,
                    'heart': faHeart,
                    'gift': faGift,
                    'praying-hands': faPrayingHands,
                    'users': faUsers,
                    'drum': faDrum,
                    'hand-holding-heart': faHandHoldingHeart,
                  }
                  const eventIcon = event.icon ? iconMap[event.icon] || faHeart : faHeart
                  
                  // Subtle color palette
                  const subtleColors = [
                    '#D4AF37', // Gold
                    '#7C9885', // Sage Green
                    '#9B7EBD', // Lavender
                    '#D4A5A5', // Dusty Rose
                    '#8BA89C', // Eucalyptus
                    '#C9A961', // Mustard
                    '#BC8F8F', // Rosy Brown
                    '#9B9BD4', // Periwinkle
                    '#A8A8A8', // Silver Gray
                  ]
                  const eventColor = subtleColors[index % subtleColors.length]
                  
                  return (
                    <div key={index} className="flex flex-col items-center flex-1 max-w-[150px]">
                      {/* Icon Circle */}
                      <div 
                        className="w-20 h-20 rounded-full flex items-center justify-center bg-white border-4 relative z-10 shadow-lg"
                        style={{ borderColor: eventColor }}
                      >
                        <FontAwesomeIcon 
                          icon={eventIcon} 
                          className="text-3xl"
                          style={{ color: eventColor }}
                        />
                      </div>
                      
                      {/* Event Name */}
                      <h4 className="text-lg font-medium text-gray-700 mt-4 text-center" style={{ fontFamily: 'var(--font-playfair)' }}>{event.name}</h4>
                      
                      {/* Timeline Marker and Time */}
                      <div className="mt-auto pt-8">
                        <div 
                          className="w-3 h-3 rounded-full mx-auto mb-2"
                          style={{ backgroundColor: eventColor }}
                        ></div>
                        <p className="text-2xl text-gray-600" style={{ fontFamily: 'var(--font-dancing)', fontWeight: 400 }}>{event.time}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Mobile Timeline - Vertical */}
          <div className="lg:hidden">
            <div className="relative max-w-xs mx-auto">
              {/* Vertical timeline line */}
              <div className="absolute left-[50px] top-0 bottom-0 w-[2px] bg-gray-300"></div>
              
              {/* Timeline Events */}
              <div className="space-y-6">
                {data.events.map((event, index) => {
                  // Map icon names to FontAwesome icons
                  const iconMap: { [key: string]: IconDefinition } = {
                    'glass-cheers': faGlassCheers,
                    'ring': faRing,
                    'camera': faCamera,
                    'utensils': faUtensils,
                    'cake': faCake,
                    'music': faMusic,
                    'car': faCar,
                    'heart': faHeart,
                    'gift': faGift,
                    'praying-hands': faPrayingHands,
                    'users': faUsers,
                    'drum': faDrum,
                    'hand-holding-heart': faHandHoldingHeart,
                  }
                  const eventIcon = event.icon ? iconMap[event.icon] || faHeart : faHeart
                  
                  // Subtle color palette
                  const subtleColors = [
                    '#D4AF37', // Gold
                    '#7C9885', // Sage Green
                    '#9B7EBD', // Lavender
                    '#D4A5A5', // Dusty Rose
                    '#8BA89C', // Eucalyptus
                    '#C9A961', // Mustard
                    '#BC8F8F', // Rosy Brown
                    '#9B9BD4', // Periwinkle
                    '#A8A8A8', // Silver Gray
                  ]
                  const eventColor = subtleColors[index % subtleColors.length]
                  
                  return (
                    <div key={index} className="flex items-center gap-4 relative">
                      {/* Icon Circle */}
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center bg-white border-2 flex-shrink-0 relative z-10 shadow-md"
                        style={{ borderColor: eventColor }}
                      >
                        <FontAwesomeIcon 
                          icon={eventIcon} 
                          className="text-lg"
                          style={{ color: eventColor }}
                        />
                      </div>
                      
                      {/* Event Details */}
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-700" style={{ fontFamily: 'var(--font-playfair)' }}>{event.name}</h4>
                      </div>
                      
                      {/* Time */}
                      <div className="text-right">
                        <p className="text-lg text-gray-600" style={{ fontFamily: 'var(--font-dancing)', fontWeight: 400 }}>{event.time}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

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
              className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 shadow-lg"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* Bottom Chat Bar - Shows when chat is not open */}
      {data.showChat !== false && !isChatOpen && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-white via-white to-transparent p-4">
          <div 
            className="max-w-2xl mx-auto bg-white rounded-full shadow-lg border border-gray-200 p-3 flex items-center gap-3 cursor-pointer hover:shadow-xl transition-shadow"
            onClick={() => setIsChatOpen(true)}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <input
              type="text"
              placeholder="Ask me anything about the wedding..."
              className="flex-1 bg-transparent outline-none text-gray-600 placeholder-gray-400"
              readOnly
            />
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span className="hidden sm:inline">AI Assistant</span>
            </div>
          </div>
        </div>
      )}

      {/* Chat Modal - Full Screen on Mobile */}
      {data.showChat !== false && isChatOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full sm:max-w-lg h-[80vh] sm:h-[600px] rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
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
              {messages.length === 0 ? (
                <div className="text-center py-8">
                  <h4 className="text-lg font-medium text-gray-700 mb-4">Hi! I'm your Wedding Assistant</h4>
                  <p className="text-sm text-gray-500 mb-6">Ask me anything about the wedding!</p>
                </div>
              ) : (
                messages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-2xl ${
                      msg.isUser 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center gap-2 bg-gray-50 rounded-full p-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 bg-transparent outline-none px-3 text-gray-700 placeholder-gray-400"
                />
                <button
                  onClick={sendMessage}
                  className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}