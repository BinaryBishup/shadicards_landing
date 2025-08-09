"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import ChatBar from "./ChatBar";
import EventLoadingScreen from "./EventLoadingScreen";
import type { Guest, Wedding, WeddingWebsite as WeddingWebsiteType, Event, EventInvitation } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin, Navigation, Check, X, HelpCircle, Users, ExternalLink, Grid3x3 } from "lucide-react";

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

interface UpcomingEventProps {
  website: WeddingWebsiteType & { wedding: Wedding };
  guest: Guest;
  event: Event;
  invitation: EventInvitation;
  allEvents?: Event[];
  onEditProfile?: () => void;
}

// Animated Counter Component
const AnimatedCounter = ({ value, label }: { value: number; label: string }) => {
  const [displayValue, setDisplayValue] = useState(value);
  
  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  return (
    <div className="relative">
      <div className="bg-gradient-to-b from-white/20 to-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-xl">
        <div className="relative overflow-hidden h-12 flex items-center justify-center">
          <div
            className="text-4xl md:text-5xl font-bold text-white transition-all duration-500 transform"
            style={{
              transform: `translateY(${displayValue !== value ? '-100%' : '0'})`,
            }}
          >
            {String(displayValue).padStart(2, '0')}
          </div>
        </div>
        <div className="text-white/70 text-xs uppercase tracking-wider mt-1">{label}</div>
      </div>
    </div>
  );
};

// Bokeh Background Animation
const BokehBackground = ({ primaryColor }: { primaryColor: string }) => {
  // Use deterministic values based on index instead of Math.random()
  const bokehElements = [
    { width: 150, height: 150, left: 20, top: 15 },
    { width: 200, height: 200, left: 70, top: 60 },
    { width: 120, height: 120, left: 40, top: 80 },
    { width: 180, height: 180, left: 85, top: 25 },
    { width: 160, height: 160, left: 10, top: 50 },
    { width: 140, height: 140, left: 55, top: 35 },
  ];

  // Convert hex to rgba with opacity
  const hexToRgba = (hex: string, opacity: number) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result 
      ? `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${opacity})`
      : `rgba(255, 255, 255, ${opacity})`;
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated bokeh lights */}
      {bokehElements.map((element, i) => (
        <div
          key={i}
          className="absolute rounded-full mix-blend-screen animate-float"
          style={{
            width: `${element.width}px`,
            height: `${element.height}px`,
            left: `${element.left}%`,
            top: `${element.top}%`,
            background: `radial-gradient(circle, ${hexToRgba(primaryColor || '#FFFFFF', 0.3)} 0%, transparent 70%)`,
            animationDelay: `${i * 2}s`,
            animationDuration: `${15 + i * 3}s`,
          }}
        />
      ))}
    </div>
  );
};

// Event Selection Modal
const EventSelectionModal = ({ 
  isOpen, 
  onClose, 
  events, 
  currentEventId,
  guestId,
  urlSlug 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  events: Event[]; 
  currentEventId: string;
  guestId: string;
  urlSlug: string;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">All Your Events</h2>
        
        <div className="grid gap-4 sm:grid-cols-2">
          {events.map((event, index) => {
            const eventDate = new Date(event.event_date);
            const isCurrentEvent = event.id === currentEventId;
            
            return (
              <button
                key={event.id}
                onClick={() => {
                  onClose();
                  // Use window.location for full page reload to show loading
                  window.location.href = `/wedding/${urlSlug}/event?guest=${guestId}&index=${index}`;
                }}
                className={cn(
                  "relative p-4 rounded-xl border-2 transition-all hover:scale-105 w-full text-left",
                  isCurrentEvent 
                    ? "border-blue-500 bg-blue-50" 
                    : "border-gray-200 hover:border-gray-400 bg-white"
                )}
              >
                {isCurrentEvent && (
                  <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    Current
                  </div>
                )}
                
                <div className="flex items-start gap-3">
                  {event.icon && (
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ 
                        backgroundColor: `${event.primary_color || '#E91E63'}20`
                      }}
                    >
                      <FontAwesomeIcon 
                        icon={['fas', event.icon as any]} 
                        className="text-lg"
                        style={{ color: event.primary_color || '#E91E63' }}
                      />
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{event.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {eventDate.toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{event.venue}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        
        <button
          onClick={onClose}
          className="mt-6 w-full py-3 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium text-gray-700 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default function UpcomingEventMinimal({ 
  website, 
  guest, 
  event, 
  invitation,
  allEvents = [],
  onEditProfile
}: UpcomingEventProps) {
  const router = useRouter();
  const [rsvpStatus, setRsvpStatus] = useState<'yes' | 'no' | 'maybe' | null>(invitation.rsvp_status);
  const [plusOnes, setPlusOnes] = useState(invitation.plus_ones || 1);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showGuestCount, setShowGuestCount] = useState(rsvpStatus === 'yes');
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [prevPlusOnes, setPrevPlusOnes] = useState(plusOnes);
  const [showEventModal, setShowEventModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Use dynamic data from Supabase
  const backgroundImage = event.background_image || '/templates/assets/event_type/wedding.jpg';
  const primaryColor = event.primary_color || '#E91E63';
  const secondaryColor = event.secondary_color || '#FF4081';
  const accentColor = event.accent_color || '#D4AF37';
  const showChat = website.show_chat !== false;

  // Set initial load to false after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 500); // Short delay to show loading screen
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setShowGuestCount(rsvpStatus === 'yes');
  }, [rsvpStatus]);

  // Smooth counter animation for guest count
  useEffect(() => {
    if (plusOnes !== prevPlusOnes) {
      const timer = setTimeout(() => setPrevPlusOnes(plusOnes), 50);
      return () => clearTimeout(timer);
    }
  }, [plusOnes, prevPlusOnes]);

  // Countdown timer effect
  useEffect(() => {
    const calculateCountdown = () => {
      const eventDateTime = new Date(`${event.event_date}T${event.start_time}`);
      const now = new Date();
      const difference = eventDateTime.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setCountdown({ days, hours, minutes, seconds });
      } else {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateCountdown();
    const timer = setInterval(calculateCountdown, 1000);

    return () => clearInterval(timer);
  }, [event.event_date, event.start_time]);

  const handleRSVPUpdate = async (status: 'yes' | 'no' | 'maybe') => {
    if (status === rsvpStatus) return;
    
    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from('event_invitations')
        .update({
          rsvp_status: status,
          rsvp_date: new Date().toISOString(),
          plus_ones: status === 'yes' ? plusOnes : 0,
          invitation_status: 'responded'
        })
        .eq('id', invitation.id);

      if (error) throw error;
      
      setRsvpStatus(status);
    } catch (error) {
      console.error('Error updating RSVP:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const updateGuestCount = async (count: number) => {
    setPlusOnes(count);
    if (rsvpStatus === 'yes') {
      await supabase
        .from('event_invitations')
        .update({ plus_ones: count })
        .eq('id', invitation.id);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  // Find current event index
  const currentEventIndex = allEvents.findIndex(e => e.id === event.id);
  const hasPrevEvent = currentEventIndex > 0;
  const hasNextEvent = currentEventIndex < allEvents.length - 1;

  // Handle navigation with loading state
  const handleNavigation = (url: string) => {
    setIsLoading(true);
    router.push(url);
  };

  // Show loading screen when navigating or initial load
  if (isLoading || isInitialLoad) {
    return <EventLoadingScreen eventName={event.name} />;
  }

  return (
    <div className="min-h-screen relative">
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          33% { transform: translate(30px, -30px) scale(1.1); opacity: 0.5; }
          66% { transform: translate(-20px, 20px) scale(0.9); opacity: 0.3; }
        }
        
        @keyframes float-slow {
          0% { transform: translateY(100vh) rotate(0deg); }
          100% { transform: translateY(-100px) rotate(360deg); }
        }
        
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 25s linear infinite;
        }
        
        .gold-shimmer {
          background: linear-gradient(
            45deg,
            transparent 30%,
            ${accentColor}80 50%,
            transparent 70%
          );
          background-size: 200% 200%;
          animation: shimmer 3s ease-in-out infinite;
        }
        
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      {/* Background Image */}
      <div className="fixed inset-0">
        <Image
          src={backgroundImage}
          alt={event.name}
          fill
          className="object-cover"
          priority
        />
        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />
        
        {/* Bokeh animation with dynamic color */}
        <BokehBackground primaryColor={primaryColor} />
        
        {/* Floating icon elements based on event icon */}
        {event.icon && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <div
                key={`icon-${i}`}
                className="absolute animate-float-slow opacity-10"
                style={{
                  left: `${20 + i * 30}%`,
                  animationDelay: `${i * 4}s`,
                  animationDuration: '22s',
                }}
              >
                <FontAwesomeIcon 
                  icon={['fas', event.icon as any]} 
                  className="text-6xl text-white"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Navigation Header */}
        <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between gap-2">
              {/* Previous Event */}
              <button
                onClick={() => hasPrevEvent && handleNavigation(`/wedding/${website.url_slug}/event?guest=${guest.id}&index=${currentEventIndex - 1}`)}
                disabled={!hasPrevEvent}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full transition-all text-white font-medium",
                  hasPrevEvent 
                    ? "bg-white/20 hover:bg-white/30 backdrop-blur-md shadow-lg" 
                    : "bg-white/10 opacity-50 cursor-not-allowed"
                )}
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline text-sm">Previous</span>
              </button>

              {/* Center Buttons */}
              <div className="flex items-center gap-2">
                <Link 
                  href={`/wedding/${website.url_slug}?guest=${guest.id}`}
                  className="flex items-center gap-2 bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 backdrop-blur-md px-4 py-2 rounded-full transition-all text-white font-medium shadow-lg border border-white/20"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="text-sm">View Website</span>
                </Link>
                
                <button
                  onClick={() => setShowEventModal(true)}
                  className="flex items-center gap-2 bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 backdrop-blur-md px-4 py-2 rounded-full transition-all text-white font-medium shadow-lg border border-white/20"
                >
                  <Grid3x3 className="w-4 h-4" />
                  <span className="text-sm">All Events</span>
                </button>
              </div>

              {/* Next Event */}
              <button
                onClick={() => hasNextEvent && handleNavigation(`/wedding/${website.url_slug}/event?guest=${guest.id}&index=${currentEventIndex + 1}`)}
                disabled={!hasNextEvent}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full transition-all text-white font-medium",
                  hasNextEvent 
                    ? "bg-white/20 hover:bg-white/30 backdrop-blur-md shadow-lg" 
                    : "bg-white/10 opacity-50 cursor-not-allowed"
                )}
              >
                <span className="hidden sm:inline text-sm">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="max-w-2xl w-full text-center space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
            {/* Couple Image with Gold Ring */}
            {website.wedding.couple_picture && (
              <div className="mx-auto w-36 h-36 rounded-full overflow-hidden shadow-2xl relative">
                <div 
                  className="absolute inset-0 rounded-full border-4"
                  style={{ 
                    borderColor: accentColor,
                    boxShadow: `0 0 30px ${accentColor}40`
                  }}
                />
                <Image
                  src={website.wedding.couple_picture}
                  alt={`${website.wedding.bride_name} & ${website.wedding.groom_name}`}
                  width={144}
                  height={144}
                  className="object-cover"
                />
              </div>
            )}

            {/* Guest Welcome */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
                Welcome, {guest.name}
              </h2>
              <p className="text-white/90 text-lg">
                You are invited to {website.wedding.bride_name} & {website.wedding.groom_name}'s celebration
              </p>
            </div>

            {/* Event Details Glass Card */}
            <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/30 shadow-2xl space-y-6">
              {/* Event Name & Description */}
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-3">
                  {event.icon && (
                    <div 
                      className="w-14 h-14 rounded-full backdrop-blur flex items-center justify-center shadow-lg"
                      style={{ 
                        background: `linear-gradient(135deg, ${primaryColor}40, ${secondaryColor}40)`,
                        borderColor: accentColor,
                        borderWidth: '2px',
                        borderStyle: 'solid'
                      }}
                    >
                      <FontAwesomeIcon 
                        icon={['fas', event.icon as any]} 
                        className="text-white text-xl"
                      />
                    </div>
                  )}
                  <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                    {event.name}
                  </h1>
                </div>
                {event.description && (
                  <p className="text-white/90 text-lg max-w-lg mx-auto italic">
                    "{event.description}"
                  </p>
                )}
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

              {/* Enhanced Countdown Timer */}
              <div className="space-y-4">
                <h3 className="text-white/80 text-sm uppercase tracking-wider">Celebration Begins In</h3>
                <div className="flex items-center justify-center gap-2 sm:gap-3">
                  <AnimatedCounter value={countdown.days} label="Days" />
                  <span className="text-white/40 text-2xl animate-pulse">:</span>
                  <AnimatedCounter value={countdown.hours} label="Hours" />
                  <span className="text-white/40 text-2xl animate-pulse">:</span>
                  <AnimatedCounter value={countdown.minutes} label="Min" />
                  <span className="text-white/40 text-2xl animate-pulse hidden sm:block">:</span>
                  <div className="hidden sm:block">
                    <AnimatedCounter value={countdown.seconds} label="Sec" />
                  </div>
                </div>
                
                {/* Date and Time */}
                <div className="space-y-1 pt-2">
                  <div className="flex items-center justify-center gap-2 text-white/90">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">{formatDate(event.event_date)}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-white/80">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{formatTime(event.start_time)} - {formatTime(event.end_time)}</span>
                  </div>
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

              {/* Enhanced Venue Section */}
              <div className="space-y-4">
                <div className="text-center space-y-2">
                  <div className="flex items-center justify-center gap-2 text-white">
                    <MapPin className="w-5 h-5" />
                    <span className="text-xl font-medium">{event.venue}</span>
                  </div>
                  {event.address && (
                    <p className="text-white/80 text-sm max-w-md mx-auto">{event.address}</p>
                  )}
                </div>
                
                {/* Embedded Google Maps */}
                {event.address && process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && (
                  <div className="rounded-xl overflow-hidden border border-white/20 mx-auto max-w-md shadow-lg">
                    <iframe
                      src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(event.address)}&zoom=15`}
                      width="100%"
                      height="200"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full"
                      title={`Map showing ${event.venue}`}
                    />
                  </div>
                )}
                
                {/* Get Directions Button */}
                <button
                  onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(event.address || event.venue)}`, '_blank')}
                  className="inline-flex items-center gap-2 mx-auto bg-gradient-to-r from-white/25 to-white/15 hover:from-white/35 hover:to-white/25 backdrop-blur-md px-6 py-3 rounded-full transition-all text-white font-medium shadow-lg hover:scale-105 border border-white/20"
                >
                  <Navigation className="w-5 h-5" />
                  <span>Get Directions</span>
                </button>
              </div>
            </div>

            {/* Enhanced RSVP Card */}
            <div className="relative bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 mt-8 overflow-hidden">
              {/* Gold foil effect */}
              <div className="absolute inset-0 gold-shimmer opacity-10 pointer-events-none" />
              
              <h3 className="font-semibold text-gray-800 mb-6 text-lg relative z-10">Will you be attending?</h3>
              
              {/* RSVP Buttons with Icons */}
              <div className="flex rounded-xl overflow-hidden shadow-inner relative z-10">
                <button
                  onClick={() => handleRSVPUpdate('yes')}
                  disabled={isUpdating}
                  className={cn(
                    "flex-1 py-4 px-4 font-medium transition-all duration-300 flex flex-col items-center gap-1 group",
                    rsvpStatus === 'yes' 
                      ? 'text-white shadow-lg transform scale-105 z-10' 
                      : 'bg-white hover:bg-gray-50 text-gray-600 hover:scale-105'
                  )}
                  style={{
                    backgroundColor: rsvpStatus === 'yes' ? primaryColor : undefined,
                    boxShadow: rsvpStatus === 'yes' ? `0 10px 30px ${primaryColor}40` : undefined,
                  }}
                >
                  <Check className={cn(
                    "w-5 h-5 transition-transform",
                    rsvpStatus === 'yes' ? 'animate-bounce' : 'group-hover:scale-110'
                  )} />
                  <span className="text-sm">Yes, I'll Attend</span>
                </button>
                
                <button
                  onClick={() => handleRSVPUpdate('no')}
                  disabled={isUpdating}
                  className={cn(
                    "flex-1 py-4 px-4 font-medium transition-all duration-300 flex flex-col items-center gap-1 group",
                    rsvpStatus === 'no' 
                      ? 'text-white shadow-lg transform scale-105 z-10' 
                      : 'bg-white hover:bg-gray-50 text-gray-600 hover:scale-105'
                  )}
                  style={{
                    backgroundColor: rsvpStatus === 'no' ? primaryColor : undefined,
                    boxShadow: rsvpStatus === 'no' ? `0 10px 30px ${primaryColor}40` : undefined,
                  }}
                >
                  <X className={cn(
                    "w-5 h-5 transition-transform",
                    rsvpStatus === 'no' ? 'animate-bounce' : 'group-hover:scale-110'
                  )} />
                  <span className="text-sm">Can't Attend</span>
                </button>
                
                <button
                  onClick={() => handleRSVPUpdate('maybe')}
                  disabled={isUpdating}
                  className={cn(
                    "flex-1 py-4 px-4 font-medium transition-all duration-300 flex flex-col items-center gap-1 group",
                    rsvpStatus === 'maybe' 
                      ? 'text-white shadow-lg transform scale-105 z-10' 
                      : 'bg-white hover:bg-gray-50 text-gray-600 hover:scale-105'
                  )}
                  style={{
                    backgroundColor: rsvpStatus === 'maybe' ? primaryColor : undefined,
                    boxShadow: rsvpStatus === 'maybe' ? `0 10px 30px ${primaryColor}40` : undefined,
                  }}
                >
                  <HelpCircle className={cn(
                    "w-5 h-5 transition-transform",
                    rsvpStatus === 'maybe' ? 'animate-bounce' : 'group-hover:scale-110'
                  )} />
                  <span className="text-sm">Maybe</span>
                </button>
              </div>

              {/* Enhanced Guest Count Selector */}
              {showGuestCount && (
                <div className="mt-8 animate-in fade-in slide-in-from-top-2 duration-500 relative z-10">
                  <label className="text-sm font-medium text-gray-600 block mb-4 flex items-center justify-center gap-2">
                    <Users className="w-4 h-4" />
                    Number of Guests
                  </label>
                  <div className="flex items-center justify-center gap-6">
                    <button
                      onClick={() => updateGuestCount(Math.max(1, plusOnes - 1))}
                      className="relative w-12 h-12 rounded-full transition-all hover:scale-110 group"
                      style={{ 
                        background: `linear-gradient(135deg, ${primaryColor}20, ${secondaryColor}20)`,
                        borderColor: primaryColor,
                        borderWidth: '2px',
                        borderStyle: 'solid'
                      }}
                    >
                      <span className="text-xl font-bold" style={{ color: primaryColor }}>−</span>
                      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ 
                          background: `radial-gradient(circle, ${accentColor}20, transparent)`,
                        }}
                      />
                    </button>
                    
                    <div className="relative">
                      <span 
                        className="text-3xl font-bold w-16 text-center block transition-all duration-300"
                        style={{ 
                          color: primaryColor,
                          transform: plusOnes !== prevPlusOnes ? 'scale(1.2)' : 'scale(1)',
                        }}
                      >
                        {plusOnes}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => updateGuestCount(plusOnes + 1)}
                      className="relative w-12 h-12 rounded-full transition-all hover:scale-110 group"
                      style={{ 
                        background: `linear-gradient(135deg, ${primaryColor}20, ${secondaryColor}20)`,
                        borderColor: primaryColor,
                        borderWidth: '2px',
                        borderStyle: 'solid'
                      }}
                    >
                      <span className="text-xl font-bold" style={{ color: primaryColor }}>+</span>
                      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ 
                          background: `radial-gradient(circle, ${accentColor}20, transparent)`,
                        }}
                      />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto">
          <div className="py-6 bg-black/20 backdrop-blur-sm border-t border-white/10">
            <div className="container mx-auto px-6 text-center">
              <div className="flex items-center justify-center gap-2 text-white/80">
                <span className="text-sm">Made with</span>
                <svg className="w-4 h-4" fill="#FF4081" viewBox="0 0 20 20">
                  <path d="M10 18l-1.45-1.32C3.4 12.36 0 9.28 0 5.5 0 2.42 2.42 0 5.5 0c1.74 0 3.41.81 4.5 2.09C11.09.81 12.76 0 14.5 0 17.58 0 20 2.42 20 5.5c0 3.78-3.4 6.86-8.55 11.18L10 18z"/>
                </svg>
                <span className="text-sm">by</span>
                <Image
                  src="/Shadiards_logo.svg"
                  alt="ShadiCards"
                  width={100}
                  height={30}
                  className="object-contain brightness-0 invert"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Selection Modal */}
      <EventSelectionModal
        isOpen={showEventModal}
        onClose={() => setShowEventModal(false)}
        events={allEvents}
        currentEventId={event.id}
        guestId={guest.id}
        urlSlug={website.url_slug}
      />

      {/* Chat Bar */}
      {showChat && (
        <ChatBar 
          weddingName={`${website.wedding.bride_name} & ${website.wedding.groom_name}'s wedding`}
          guestName={guest.first_name || guest.name.split(' ')[0]}
        />
      )}
    </div>
  );
}