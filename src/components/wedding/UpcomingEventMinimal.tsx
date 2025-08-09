"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import ChatBar from "./ChatBar";
import type { Guest, Wedding, WeddingWebsite as WeddingWebsiteType, Event, EventInvitation } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Home, Calendar, Clock, MapPin, Navigation } from "lucide-react";

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
  mehendi: '/templates/assets/event_type/mehandi.jpg',  // Fixed spelling to match file
  mehandi: '/templates/assets/event_type/mehandi.jpg',  // Support both spellings
  sangeet: '/templates/assets/event_type/sangeet.jpg',
  wedding: '/templates/assets/event_type/wedding.jpg',
  reception: '/templates/assets/event_type/reception.jpg',
  engagement: '/templates/assets/event_type/engagement.jpg',
};

// Event themes
const eventThemes: Record<string, { primary: string; secondary: string }> = {
  haldi: { primary: '#FFA500', secondary: '#FFD700' },
  mehendi: { primary: '#228B22', secondary: '#90EE90' },
  mehandi: { primary: '#228B22', secondary: '#90EE90' },  // Support both spellings
  sangeet: { primary: '#9B59B6', secondary: '#E74C3C' },
  wedding: { primary: '#E91E63', secondary: '#FF4081' },
  reception: { primary: '#2C3E50', secondary: '#34495E' },
  engagement: { primary: '#E74C3C', secondary: '#EC407A' },
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

  const eventType = event.event_type?.toLowerCase() || 'wedding';
  const backgroundImage = eventBackgrounds[eventType] || eventBackgrounds.wedding;
  const theme = eventThemes[eventType] || eventThemes.wedding;
  const showChat = website.show_chat !== false;

  useEffect(() => {
    setShowGuestCount(rsvpStatus === 'yes');
  }, [rsvpStatus]);

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
  const prevEvent = currentEventIndex > 0 ? allEvents[currentEventIndex - 1] : null;
  const nextEvent = currentEventIndex < allEvents.length - 1 ? allEvents[currentEventIndex + 1] : null;

  return (
    <div className="min-h-screen relative">
      {/* Background Image - Full Screen */}
      <div className="fixed inset-0">
        <Image
          src={backgroundImage}
          alt={event.name}
          fill
          className="object-cover"
          priority
        />
        {/* Light overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
        
        {/* Subtle animation overlay */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Navigation Header */}
        <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between gap-2">
              {/* Previous Event */}
              <Link 
                href={prevEvent ? `/website/${website.url_slug}/upcoming_event?guest=${guest.id}` : '#'}
                className={cn(
                  "flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-white/80 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10",
                  !prevEvent && "opacity-50 pointer-events-none"
                )}
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="text-xs sm:text-sm">
                  <span className="sm:hidden">Prev</span>
                  <span className="hidden sm:inline">Previous</span>
                  {prevEvent && (
                    <span className="block sm:hidden text-[10px] mt-0.5 text-white/60">
                      {prevEvent.name.split(' ')[0]}
                    </span>
                  )}
                </span>
              </Link>

              {/* Center - View Wedding */}
              <Link 
                href={`/website/${website.url_slug}?guest=${guest.id}`}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md px-4 py-2 rounded-full transition-all text-white font-medium shadow-lg"
              >
                <Home className="w-4 h-4" />
                <span className="text-sm sm:text-base">Wedding</span>
              </Link>

              {/* Next Event */}
              <Link 
                href={nextEvent ? `/website/${website.url_slug}/upcoming_event?guest=${guest.id}` : '#'}
                className={cn(
                  "flex flex-col-reverse sm:flex-row items-center gap-1 sm:gap-2 text-white/80 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10",
                  !nextEvent && "opacity-50 pointer-events-none"
                )}
              >
                <span className="text-xs sm:text-sm">
                  <span className="sm:hidden">Next</span>
                  <span className="hidden sm:inline">Next</span>
                  {nextEvent && (
                    <span className="block sm:hidden text-[10px] mt-0.5 text-white/60">
                      {nextEvent.name.split(' ')[0]}
                    </span>
                  )}
                </span>
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content - Centered */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="max-w-2xl w-full text-center space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
            {/* Couple Image */}
            {website.wedding.couple_picture && (
              <div className="mx-auto w-32 h-32 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl">
                <Image
                  src={website.wedding.couple_picture}
                  alt={`${website.wedding.bride_name} & ${website.wedding.groom_name}`}
                  width={128}
                  height={128}
                  className="object-cover"
                />
              </div>
            )}

            {/* Guest Welcome */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                Welcome, {guest.name}
              </h2>
              <p className="text-white/80 text-lg">
                You are invited to {website.wedding.bride_name} & {website.wedding.groom_name}'s celebration
              </p>
            </div>

            {/* Event Details Glass Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl space-y-6">
              {/* Event Name & Description */}
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-3">
                  {event.icon && (
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                      <FontAwesomeIcon 
                        icon={['fas', (event.icon || 'calendar') as any]} 
                        className="text-white text-xl"
                      />
                    </div>
                  )}
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    {event.name}
                  </h1>
                </div>
                {event.description && (
                  <p className="text-white/90 text-lg max-w-lg mx-auto">
                    {event.description}
                  </p>
                )}
              </div>

              <div className="h-px bg-white/20" />

              {/* Countdown Timer */}
              <div className="space-y-4">
                <h3 className="text-white/80 text-sm uppercase tracking-wider">Event Starts In</h3>
                <div className="flex items-center justify-center gap-4">
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-white">{countdown.days}</div>
                    <div className="text-white/60 text-xs uppercase">Days</div>
                  </div>
                  <div className="text-white/40 text-2xl">:</div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-white">{countdown.hours}</div>
                    <div className="text-white/60 text-xs uppercase">Hours</div>
                  </div>
                  <div className="text-white/40 text-2xl">:</div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-white">{countdown.minutes}</div>
                    <div className="text-white/60 text-xs uppercase">Min</div>
                  </div>
                  <div className="text-white/40 text-2xl">:</div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-white">{countdown.seconds}</div>
                    <div className="text-white/60 text-xs uppercase">Sec</div>
                  </div>
                </div>
                
                {/* Date and Time Below Countdown */}
                <div className="space-y-1 pt-2">
                  <div className="flex items-center justify-center gap-2 text-white/80">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{formatDate(event.event_date)}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-white/70">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{formatTime(event.start_time)} - {formatTime(event.end_time)}</span>
                  </div>
                </div>
              </div>

              <div className="h-px bg-white/20" />

              {/* Venue with Location Button */}
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
                
                {/* Open Location Button */}
                <button
                  onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(event.address || event.venue)}`, '_blank')}
                  className="inline-flex items-center gap-2 mx-auto bg-white/20 hover:bg-white/30 backdrop-blur-md px-6 py-3 rounded-full transition-all text-white font-medium shadow-lg hover:scale-105"
                >
                  <Navigation className="w-5 h-5" />
                  <span>Open Location</span>
                </button>
              </div>
            </div>

            {/* RSVP Card - Only Card Element */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 mt-8">
              <h3 className="font-semibold text-gray-800 mb-6 text-lg">Will you be attending?</h3>
              
              {/* RSVP Buttons */}
              <div className="flex rounded-lg overflow-hidden border-2" style={{ borderColor: theme.primary }}>
                <button
                  onClick={() => handleRSVPUpdate('yes')}
                  disabled={isUpdating}
                  className={cn(
                    "flex-1 py-3 px-4 text-sm font-medium transition-all duration-300",
                    rsvpStatus === 'yes' 
                      ? 'text-white shadow-inner' 
                      : 'bg-white hover:bg-gray-50 text-gray-600'
                  )}
                  style={{
                    backgroundColor: rsvpStatus === 'yes' ? theme.primary : undefined,
                  }}
                >
                  Yes, I'll Attend
                </button>
                <button
                  onClick={() => handleRSVPUpdate('no')}
                  disabled={isUpdating}
                  className={cn(
                    "flex-1 py-3 px-4 text-sm font-medium transition-all duration-300 border-x-2",
                    rsvpStatus === 'no' 
                      ? 'text-white shadow-inner' 
                      : 'bg-white hover:bg-gray-50 text-gray-600'
                  )}
                  style={{
                    borderColor: theme.primary,
                    backgroundColor: rsvpStatus === 'no' ? theme.primary : undefined,
                  }}
                >
                  Can't Attend
                </button>
                <button
                  onClick={() => handleRSVPUpdate('maybe')}
                  disabled={isUpdating}
                  className={cn(
                    "flex-1 py-3 px-4 text-sm font-medium transition-all duration-300",
                    rsvpStatus === 'maybe' 
                      ? 'text-white shadow-inner' 
                      : 'bg-white hover:bg-gray-50 text-gray-600'
                  )}
                  style={{
                    backgroundColor: rsvpStatus === 'maybe' ? theme.primary : undefined,
                  }}
                >
                  Maybe
                </button>
              </div>

              {/* Guest Count */}
              {showGuestCount && (
                <div className="mt-6 animate-in fade-in slide-in-from-top-2 duration-500">
                  <label className="text-sm font-medium text-gray-600 block mb-3">
                    Number of Guests
                  </label>
                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={() => updateGuestCount(Math.max(1, plusOnes - 1))}
                      className="w-10 h-10 rounded-full border-2 hover:bg-gray-50 transition-all"
                      style={{ borderColor: theme.primary }}
                    >
                      <span className="text-lg font-semibold" style={{ color: theme.primary }}>−</span>
                    </button>
                    <span className="text-2xl font-bold w-12 text-center" style={{ color: theme.primary }}>
                      {plusOnes}
                    </span>
                    <button
                      onClick={() => updateGuestCount(plusOnes + 1)}
                      className="w-10 h-10 rounded-full border-2 hover:bg-gray-50 transition-all"
                      style={{ borderColor: theme.primary }}
                    >
                      <span className="text-lg font-semibold" style={{ color: theme.primary }}>+</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer - Same as Wedding Page */}
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

      {/* Chat Bar - From Wedding Page */}
      {showChat && (
        <ChatBar 
          weddingName={`${website.wedding.bride_name} & ${website.wedding.groom_name}'s wedding`}
          guestName={guest.first_name || guest.name.split(' ')[0]}
        />
      )}
    </div>
  );
}