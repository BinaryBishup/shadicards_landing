"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import ChatBar from "./ChatBar";
import type { Guest, Wedding, WeddingWebsite as WeddingWebsiteType, Event, EventInvitation } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Home, Calendar, Clock, MapPin, Navigation, Check, X, HelpCircle, Users, ExternalLink } from "lucide-react";

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

// Event type backgrounds
const eventBackgrounds: Record<string, string> = {
  haldi: '/templates/assets/event_type/haldi.jpg',
  mehendi: '/templates/assets/event_type/mehandi.jpg',
  mehandi: '/templates/assets/event_type/mehandi.jpg',
  sangeet: '/templates/assets/event_type/sangeet.jpg',
  wedding: '/templates/assets/event_type/wedding.jpg',
  reception: '/templates/assets/event_type/reception.jpg',
  engagement: '/templates/assets/event_type/engagement.jpg',
};

// Event themes with gold accent
const eventThemes: Record<string, { primary: string; secondary: string; gold: string }> = {
  haldi: { primary: '#FFA500', secondary: '#FFD700', gold: '#D4AF37' },
  mehendi: { primary: '#228B22', secondary: '#90EE90', gold: '#B8860B' },
  mehandi: { primary: '#228B22', secondary: '#90EE90', gold: '#B8860B' },
  sangeet: { primary: '#9B59B6', secondary: '#E74C3C', gold: '#FFD700' },
  wedding: { primary: '#E91E63', secondary: '#FF4081', gold: '#D4AF37' },
  reception: { primary: '#2C3E50', secondary: '#34495E', gold: '#F0E68C' },
  engagement: { primary: '#E74C3C', secondary: '#EC407A', gold: '#FFD700' },
};

// Cultural event descriptions
const eventDescriptions: Record<string, string> = {
  haldi: "Join us for blessings, turmeric, and the golden glow of tradition",
  mehendi: "Let's celebrate love, color, and mehendi magic together",
  mehandi: "Join us for an evening of music, laughter, and henna art",
  sangeet: "An evening of dance, music, and joyful celebrations awaits",
  wedding: "Witness the sacred union of two souls becoming one",
  reception: "Celebrate our new beginning with dinner, dancing, and memories",
  engagement: "Join us as we mark the beginning of our forever journey",
};

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
const BokehBackground = ({ eventType }: { eventType: string }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated bokeh lights */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full mix-blend-screen animate-float"
          style={{
            width: `${Math.random() * 200 + 100}px`,
            height: `${Math.random() * 200 + 100}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `radial-gradient(circle, ${
              eventType === 'mehendi' || eventType === 'mehandi' 
                ? 'rgba(34, 139, 34, 0.3)' 
                : eventType === 'haldi'
                ? 'rgba(255, 215, 0, 0.3)'
                : 'rgba(255, 255, 255, 0.1)'
            } 0%, transparent 70%)`,
            animationDelay: `${i * 2}s`,
            animationDuration: `${15 + i * 3}s`,
          }}
        />
      ))}
      
      {/* Floating petals/elements based on event type */}
      {eventType === 'mehendi' || eventType === 'mehandi' ? (
        // Mehendi cone patterns
        [...Array(4)].map((_, i) => (
          <div
            key={`mehendi-${i}`}
            className="absolute text-4xl animate-float-slow opacity-20"
            style={{
              left: `${20 + i * 20}%`,
              animationDelay: `${i * 3}s`,
              animationDuration: '20s',
            }}
          >
            🌿
          </div>
        ))
      ) : eventType === 'haldi' ? (
        // Flower petals for Haldi
        [...Array(4)].map((_, i) => (
          <div
            key={`haldi-${i}`}
            className="absolute text-3xl animate-float-slow opacity-20"
            style={{
              left: `${15 + i * 25}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: '18s',
            }}
          >
            🌼
          </div>
        ))
      ) : null}
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
  const [rsvpStatus, setRsvpStatus] = useState<'yes' | 'no' | 'maybe' | null>(invitation.rsvp_status);
  const [plusOnes, setPlusOnes] = useState(invitation.plus_ones || 1);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showGuestCount, setShowGuestCount] = useState(rsvpStatus === 'yes');
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [prevPlusOnes, setPrevPlusOnes] = useState(plusOnes);

  const eventType = event.event_type?.toLowerCase() || 'wedding';
  const backgroundImage = eventBackgrounds[eventType] || eventBackgrounds.wedding;
  const theme = eventThemes[eventType] || eventThemes.wedding;
  const showChat = website.show_chat !== false;
  const customDescription = eventDescriptions[eventType] || event.description;

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
  const prevEventName = hasPrevEvent ? allEvents[currentEventIndex - 1].name : null;
  const nextEventName = hasNextEvent ? allEvents[currentEventIndex + 1].name : null;

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
            rgba(212, 175, 55, 0.5) 50%,
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
        
        {/* Bokeh animation */}
        <BokehBackground eventType={eventType} />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Navigation Header */}
        <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between gap-2">
              {/* Previous Event */}
              <Link 
                href={hasPrevEvent ? `/wedding/${website.url_slug}/event?guest=${guest.id}&index=${currentEventIndex - 1}` : '#'}
                className={cn(
                  "flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-white/80 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10",
                  !hasPrevEvent && "opacity-50 pointer-events-none"
                )}
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="text-xs sm:text-sm">
                  <span className="sm:hidden">Prev</span>
                  <span className="hidden sm:inline">Previous</span>
                  {prevEventName && (
                    <span className="block sm:hidden text-[10px] mt-0.5 text-white/60">
                      {prevEventName.split(' ')[0]}
                    </span>
                  )}
                </span>
              </Link>

              {/* Center - View Website */}
              <Link 
                href={`/wedding/${website.url_slug}?guest=${guest.id}`}
                className="flex items-center gap-2 bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 backdrop-blur-md px-4 py-2 rounded-full transition-all text-white font-medium shadow-lg border border-white/20"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="text-sm sm:text-base">View Website</span>
              </Link>

              {/* Next Event */}
              <Link 
                href={hasNextEvent ? `/wedding/${website.url_slug}/event?guest=${guest.id}&index=${currentEventIndex + 1}` : '#'}
                className={cn(
                  "flex flex-col-reverse sm:flex-row items-center gap-1 sm:gap-2 text-white/80 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10",
                  !hasNextEvent && "opacity-50 pointer-events-none"
                )}
              >
                <span className="text-xs sm:text-sm">
                  <span className="sm:hidden">Next</span>
                  <span className="hidden sm:inline">Next</span>
                  {nextEventName && (
                    <span className="block sm:hidden text-[10px] mt-0.5 text-white/60">
                      {nextEventName.split(' ')[0]}
                    </span>
                  )}
                </span>
                <ChevronRight className="w-5 h-5" />
              </Link>
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
                    borderColor: theme.gold,
                    boxShadow: `0 0 30px ${theme.gold}40`
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
                        background: `linear-gradient(135deg, ${theme.primary}40, ${theme.secondary}40)`,
                        borderColor: theme.gold,
                        borderWidth: '2px',
                        borderStyle: 'solid'
                      }}
                    >
                      <FontAwesomeIcon 
                        icon={['fas', (event.icon || 'calendar') as any]} 
                        className="text-white text-xl"
                      />
                    </div>
                  )}
                  <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                    {event.name}
                  </h1>
                </div>
                <p className="text-white/90 text-lg max-w-lg mx-auto italic">
                  "{customDescription}"
                </p>
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
                
                {/* Map Thumbnail */}
                <div className="rounded-xl overflow-hidden border border-white/20 mx-auto max-w-sm">
                  <div className="relative h-32 bg-gradient-to-br from-gray-200 to-gray-300">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <MapPin className="w-8 h-8 text-gray-600" />
                    </div>
                  </div>
                </div>
                
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
                    backgroundColor: rsvpStatus === 'yes' ? theme.primary : undefined,
                    boxShadow: rsvpStatus === 'yes' ? `0 10px 30px ${theme.primary}40` : undefined,
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
                    backgroundColor: rsvpStatus === 'no' ? theme.primary : undefined,
                    boxShadow: rsvpStatus === 'no' ? `0 10px 30px ${theme.primary}40` : undefined,
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
                    backgroundColor: rsvpStatus === 'maybe' ? theme.primary : undefined,
                    boxShadow: rsvpStatus === 'maybe' ? `0 10px 30px ${theme.primary}40` : undefined,
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
                        background: `linear-gradient(135deg, ${theme.primary}20, ${theme.secondary}20)`,
                        borderColor: theme.primary,
                        borderWidth: '2px',
                        borderStyle: 'solid'
                      }}
                    >
                      <span className="text-xl font-bold" style={{ color: theme.primary }}>−</span>
                      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ 
                          background: `radial-gradient(circle, ${theme.gold}20, transparent)`,
                        }}
                      />
                    </button>
                    
                    <div className="relative">
                      <span 
                        className="text-3xl font-bold w-16 text-center block transition-all duration-300"
                        style={{ 
                          color: theme.primary,
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
                        background: `linear-gradient(135deg, ${theme.primary}20, ${theme.secondary}20)`,
                        borderColor: theme.primary,
                        borderWidth: '2px',
                        borderStyle: 'solid'
                      }}
                    >
                      <span className="text-xl font-bold" style={{ color: theme.primary }}>+</span>
                      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ 
                          background: `radial-gradient(circle, ${theme.gold}20, transparent)`,
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