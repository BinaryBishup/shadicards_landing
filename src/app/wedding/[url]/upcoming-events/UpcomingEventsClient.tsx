'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { 
  Calendar, Clock, MapPin, ArrowLeft, Phone, Mail, 
  Users, Shirt, Info, Check, X, Loader2, ChevronRight,
  Navigation, Heart, Sparkles
} from 'lucide-react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faGlassCheers, faRing, faCamera, faUtensils, faCake, 
  faMusic, faCar, faHeart, faGift, faPrayingHands,
  faUsers, faDrum, faHandHoldingHeart
} from '@fortawesome/free-solid-svg-icons'

const iconMap: { [key: string]: any } = {
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

interface Event {
  id: string
  name: string
  description: string
  event_date: string
  start_time: string
  end_time: string
  venue: string
  address: string
  dress_code?: string
  special_instructions?: string
  icon?: string
  color?: string
  map_link?: string
  venue_phone?: string
  venue_email?: string
  invitationId: string
  rsvpStatus: string
  plusOnes?: number
}

interface UpcomingEventsClientProps {
  events: Event[]
  guestName: string
  guestId: string
  weddingUrl: string
  brideName: string
  groomName: string
  coupleImage?: string
  weddingDate: string
}

export default function UpcomingEventsClient({
  events,
  guestName,
  guestId,
  weddingUrl,
  brideName,
  groomName,
  coupleImage,
  weddingDate
}: UpcomingEventsClientProps) {
  const router = useRouter()
  const [currentEventIndex, setCurrentEventIndex] = useState(0)
  const [updatingRsvp, setUpdatingRsvp] = useState(false)
  const [rsvpMessage, setRsvpMessage] = useState('')
  
  const currentEvent = events[currentEventIndex]
  
  const handleRsvpUpdate = async (status: 'attending' | 'not_attending' | 'maybe') => {
    if (!currentEvent) return
    
    setUpdatingRsvp(true)
    setRsvpMessage('')
    
    const supabase = createClient()
    
    const { error } = await supabase
      .from('event_invitations')
      .update({ 
        rsvp_status: status,
        updated_at: new Date().toISOString()
      })
      .eq('id', currentEvent.invitationId)
    
    if (error) {
      setRsvpMessage('Failed to update RSVP. Please try again.')
    } else {
      setRsvpMessage(
        status === 'attending' 
          ? "Great! We're excited to see you there! 🎉" 
          : status === 'not_attending'
          ? "Thank you for letting us know. We'll miss you! 💔"
          : "We've noted that you might attend. Please confirm when you can! 🤔"
      )
      
      // Update local state
      currentEvent.rsvpStatus = status
    }
    
    setUpdatingRsvp(false)
  }

  if (!currentEvent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No Upcoming Events</h2>
            <p className="text-gray-600 mb-4">You don't have any upcoming events at the moment.</p>
            <Link href={`/wedding/${weddingUrl}?guest=${guestId}`}>
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Wedding
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const eventDate = new Date(currentEvent.event_date)
  const daysUntilEvent = Math.ceil((eventDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href={`/wedding/${weddingUrl}?guest=${guestId}`}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">
              Upcoming Events
            </h1>
            <div className="text-sm text-gray-600">
              {currentEventIndex + 1} of {events.length}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Couple Header */}
        <div className="text-center mb-8">
          {/* Couple Image */}
          {coupleImage && (
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
                  <img
                    src={coupleImage}
                    alt={`${brideName} & ${groomName}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white rounded-full p-2 shadow-lg">
                  <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
                </div>
              </div>
            </div>
          )}
          
          {/* Couple Names */}
          <h1 className="text-4xl font-light text-gray-900 mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
            {brideName} & {groomName}
          </h1>
          <p className="text-gray-600 mb-6">
            {new Date(weddingDate).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </p>
          
          {/* Welcome Message */}
          <div className="bg-white rounded-xl p-4 shadow-md mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Welcome, {guestName}!
            </h2>
            <p className="text-gray-600">
              Here are your upcoming events and RSVP status
            </p>
          </div>
        </div>

        {/* RSVP Summary Card */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle>Your Event Invitations</CardTitle>
            <CardDescription>Quick overview of all events you're invited to</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {events.map((event, index) => {
                const eventDate = new Date(event.event_date)
                return (
                  <div 
                    key={event.id}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      index === currentEventIndex ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:bg-gray-50'
                    } cursor-pointer transition-colors`}
                    onClick={() => setCurrentEventIndex(index)}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: event.color || '#8B5CF6' }}
                      >
                        {event.icon && iconMap[event.icon] ? (
                          <FontAwesomeIcon 
                            icon={iconMap[event.icon]} 
                            className="text-white text-sm"
                          />
                        ) : (
                          <Heart className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{event.name}</p>
                        <p className="text-sm text-gray-600">
                          {eventDate.toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true
                          })}
                        </p>
                      </div>
                    </div>
                    <Badge 
                      className={
                        event.rsvpStatus === 'attending' 
                          ? 'bg-green-100 text-green-800' 
                          : event.rsvpStatus === 'not_attending'
                          ? 'bg-red-100 text-red-800'
                          : event.rsvpStatus === 'maybe'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }
                    >
                      {event.rsvpStatus === 'attending' 
                        ? '✓ Attending' 
                        : event.rsvpStatus === 'not_attending'
                        ? '✗ Not Attending'
                        : event.rsvpStatus === 'maybe'
                        ? '? Maybe'
                        : 'No Response'}
                    </Badge>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Selected Event Details */}
        <div className="mb-2">
          <h3 className="text-lg font-semibold text-gray-700">Event Details</h3>
          <p className="text-sm text-gray-500">Click on any event above to view details</p>
        </div>
        <Card className="shadow-xl overflow-hidden mb-6">
          {/* Event Header with Icon */}
          <div 
            className="h-32 flex items-center justify-center"
            style={{ backgroundColor: currentEvent.color || '#8B5CF6' }}
          >
            {currentEvent.icon && iconMap[currentEvent.icon] ? (
              <FontAwesomeIcon 
                icon={iconMap[currentEvent.icon]} 
                className="text-white text-5xl"
              />
            ) : (
              <Heart className="w-16 h-16 text-white" />
            )}
          </div>

          <CardHeader className="text-center pb-2">
            <CardTitle className="text-3xl mb-2">{currentEvent.name}</CardTitle>
            <CardDescription className="text-lg">
              {currentEvent.description}
            </CardDescription>
            
            {/* Days Until Badge */}
            <div className="mt-4">
              {daysUntilEvent === 0 ? (
                <Badge className="bg-red-500 text-white px-4 py-1">
                  <Sparkles className="w-4 h-4 mr-1" />
                  Today!
                </Badge>
              ) : daysUntilEvent === 1 ? (
                <Badge className="bg-orange-500 text-white px-4 py-1">
                  Tomorrow
                </Badge>
              ) : (
                <Badge variant="secondary" className="px-4 py-1">
                  {daysUntilEvent} days to go
                </Badge>
              )}
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Date & Time */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-purple-600 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Date</p>
                  <p className="text-gray-600">
                    {eventDate.toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-purple-600 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Time</p>
                  <p className="text-gray-600">
                    {new Date(`2000-01-01T${currentEvent.start_time}`).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true
                    })}
                    {currentEvent.end_time && ` - ${new Date(`2000-01-01T${currentEvent.end_time}`).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true
                    })}`}
                  </p>
                </div>
              </div>
            </div>

            {/* Venue */}
            <div className="border-t pt-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-purple-600 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Venue</p>
                  <p className="text-gray-600">{currentEvent.venue}</p>
                  {currentEvent.address && (
                    <p className="text-gray-500 text-sm mt-1">{currentEvent.address}</p>
                  )}
                  {currentEvent.map_link && (
                    <a 
                      href={currentEvent.map_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
                    >
                      <Navigation className="w-4 h-4" />
                      Get Directions
                    </a>
                  )}
                </div>
              </div>

              {/* Venue Contact */}
              {(currentEvent.venue_phone || currentEvent.venue_email) && (
                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  {currentEvent.venue_phone && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      <a href={`tel:${currentEvent.venue_phone}`} className="hover:text-purple-600">
                        {currentEvent.venue_phone}
                      </a>
                    </div>
                  )}
                  {currentEvent.venue_email && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4" />
                      <a href={`mailto:${currentEvent.venue_email}`} className="hover:text-purple-600">
                        {currentEvent.venue_email}
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Additional Info */}
            {(currentEvent.dress_code || currentEvent.special_instructions) && (
              <div className="border-t pt-4 space-y-3">
                {currentEvent.dress_code && (
                  <div className="flex items-start gap-3">
                    <Shirt className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Dress Code</p>
                      <p className="text-gray-600">{currentEvent.dress_code}</p>
                    </div>
                  </div>
                )}
                
                {currentEvent.special_instructions && (
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Special Instructions</p>
                      <p className="text-gray-600">{currentEvent.special_instructions}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* RSVP Section */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your RSVP</h3>
              
              {/* Current Status */}
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Current Status:</p>
                <Badge 
                  className={
                    currentEvent.rsvpStatus === 'attending' 
                      ? 'bg-green-100 text-green-800' 
                      : currentEvent.rsvpStatus === 'not_attending'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }
                >
                  {currentEvent.rsvpStatus === 'attending' 
                    ? 'Attending' 
                    : currentEvent.rsvpStatus === 'not_attending'
                    ? 'Not Attending'
                    : currentEvent.rsvpStatus === 'maybe'
                    ? 'Maybe'
                    : 'Not Responded'}
                </Badge>
              </div>

              {/* RSVP Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => handleRsvpUpdate('attending')}
                  disabled={updatingRsvp || currentEvent.rsvpStatus === 'attending'}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  {updatingRsvp && currentEvent.rsvpStatus !== 'attending' ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Check className="w-4 h-4 mr-2" />
                  )}
                  I'll Be There
                </Button>
                
                <Button
                  onClick={() => handleRsvpUpdate('not_attending')}
                  disabled={updatingRsvp || currentEvent.rsvpStatus === 'not_attending'}
                  variant="outline"
                  className="border-red-200 hover:bg-red-50 text-red-600"
                >
                  {updatingRsvp && currentEvent.rsvpStatus !== 'not_attending' ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <X className="w-4 h-4 mr-2" />
                  )}
                  Can't Make It
                </Button>
                
                <Button
                  onClick={() => handleRsvpUpdate('maybe')}
                  disabled={updatingRsvp || currentEvent.rsvpStatus === 'maybe'}
                  variant="outline"
                >
                  {updatingRsvp && currentEvent.rsvpStatus !== 'maybe' ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : null}
                  Not Sure Yet
                </Button>
              </div>

              {/* RSVP Message */}
              {rsvpMessage && (
                <Alert className="mt-4">
                  <AlertDescription>{rsvpMessage}</AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Navigation Between Events */}
        {events.length > 1 && (
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={() => setCurrentEventIndex(Math.max(0, currentEventIndex - 1))}
              disabled={currentEventIndex === 0}
            >
              Previous Event
            </Button>
            
            <div className="flex gap-2">
              {events.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentEventIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentEventIndex 
                      ? 'bg-purple-600' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
            
            <Button
              variant="outline"
              onClick={() => setCurrentEventIndex(Math.min(events.length - 1, currentEventIndex + 1))}
              disabled={currentEventIndex === events.length - 1}
            >
              Next Event
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}