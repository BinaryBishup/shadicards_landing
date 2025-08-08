'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faGlassCheers, faRing, faCamera, faUtensils, faCake, 
  faMusic, faCar, faHeart, faGift, faPrayingHands,
  faUsers, faDrum, faHandHoldingHeart, IconDefinition
} from '@fortawesome/free-solid-svg-icons'
import { WeddingData } from '../types'

interface EventsSectionProps {
  data: WeddingData
}

export default function EventsSection({ data }: EventsSectionProps) {
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

  return (
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
                const eventIcon = event.icon ? iconMap[event.icon] || faHeart : faHeart
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
                const eventIcon = event.icon ? iconMap[event.icon] || faHeart : faHeart
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
                      <p className="text-xs text-gray-500">{event.venue}</p>
                      {event.date && (
                        <p className="text-xs text-gray-400">{event.date}</p>
                      )}
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
  )
}