"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { Guest, Wedding, WeddingWebsite as WeddingWebsiteType, Event, EventInvitation } from "@/lib/supabase";
import { cn } from "@/lib/utils";

// Add FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

interface UpcomingEventProps {
  website: WeddingWebsiteType & { wedding: Wedding };
  guest: Guest;
  event: Event;
  invitation: EventInvitation;
  onEditProfile?: () => void;
}

// Event type backgrounds mapping
const eventBackgrounds: Record<string, string> = {
  haldi: '/templates/assets/event_type/haldi.jpg',
  mehendi: '/templates/assets/event_type/mehendi.jpg',
  sangeet: '/templates/assets/event_type/sangeet.jpg',
  wedding: '/templates/assets/event_type/wedding.jpg',
  reception: '/templates/assets/event_type/reception.jpg',
  engagement: '/templates/assets/event_type/engagement.jpg',
};

// Event type color themes
const eventThemes: Record<string, { primary: string; secondary: string; accent: string }> = {
  haldi: { primary: '#FFA500', secondary: '#FFD700', accent: '#FF8C00' },
  mehendi: { primary: '#228B22', secondary: '#90EE90', accent: '#006400' },
  sangeet: { primary: '#9B59B6', secondary: '#E74C3C', accent: '#3498DB' },
  wedding: { primary: '#E91E63', secondary: '#FF4081', accent: '#C2185B' },
  reception: { primary: '#2C3E50', secondary: '#34495E', accent: '#1ABC9C' },
  engagement: { primary: '#E74C3C', secondary: '#EC407A', accent: '#AD1457' },
};

export default function UpcomingEventRevamped({ 
  website, 
  guest, 
  event, 
  invitation,
  onEditProfile
}: UpcomingEventProps) {
  const [rsvpStatus, setRsvpStatus] = useState<'yes' | 'no' | 'maybe' | null>(invitation.rsvp_status);
  const [plusOnes, setPlusOnes] = useState(invitation.plus_ones || 1);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showGuestCount, setShowGuestCount] = useState(rsvpStatus === 'yes');

  const eventType = event.event_type?.toLowerCase() || 'wedding';
  const backgroundImage = eventBackgrounds[eventType] || eventBackgrounds.wedding;
  const theme = eventThemes[eventType] || eventThemes.wedding;

  useEffect(() => {
    setShowGuestCount(rsvpStatus === 'yes');
  }, [rsvpStatus]);

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
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-50">
      {/* Animated Background with Event Image */}
      <div className="absolute inset-0">
        <div className="relative w-full h-full">
          <Image
            src={backgroundImage}
            alt={event.name}
            fill
            className="object-cover"
            priority
          />
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
          
          {/* Subtle floating animation overlay */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-2000" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Couple Header */}
        <div className="bg-white/95 backdrop-blur-md shadow-lg">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {website.wedding.couple_picture ? (
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md">
                    <Image
                      src={website.wedding.couple_picture}
                      alt={`${website.wedding.bride_name} & ${website.wedding.groom_name}`}
                      width={56}
                      height={56}
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div 
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold shadow-md"
                    style={{ backgroundColor: theme.primary }}
                  >
                    {website.wedding.bride_name[0]}&{website.wedding.groom_name[0]}
                  </div>
                )}
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {website.wedding.bride_name} & {website.wedding.groom_name}
                  </h2>
                  <p className="text-sm text-gray-600">Invite you to celebrate</p>
                </div>
              </div>
              
              {/* Guest Info */}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Welcome</p>
                  <p className="text-sm font-medium text-gray-800">{guest.name}</p>
                </div>
                {guest.profile_image && (
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow">
                    <img src={guest.profile_image} alt={guest.name} className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="container mx-auto px-6 py-12 max-w-[650px]">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-700">
            {/* Event Header with Icon */}
            <div 
              className="px-8 py-6 text-white relative overflow-hidden"
              style={{ backgroundColor: theme.primary }}
            >
              <div className="flex items-center gap-4">
                {event.icon && (
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <FontAwesomeIcon 
                      icon={['fas', (event.icon || 'calendar') as any]} 
                      className="text-white text-xl"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h1 className="text-3xl font-bold">{event.name}</h1>
                  {event.description && (
                    <p className="text-white/90 text-sm mt-1">{event.description}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Event Details */}
            <div className="p-8 space-y-6">
              {/* Date & Time */}
              <div className="flex items-start gap-4">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${theme.primary}15` }}
                >
                  <FontAwesomeIcon 
                    icon={['fas', 'calendar-days']} 
                    style={{ color: theme.primary }}
                    className="text-lg"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800 mb-1">Date & Time</h3>
                  <p className="text-gray-700">{formatDate(event.event_date)}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <FontAwesomeIcon 
                      icon={['fas', 'clock']} 
                      className="text-gray-400 text-sm"
                    />
                    <span className="text-sm text-gray-600">
                      {formatTime(event.start_time)} - {formatTime(event.end_time)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Venue */}
              <div className="flex items-start gap-4">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${theme.secondary}15` }}
                >
                  <FontAwesomeIcon 
                    icon={['fas', 'location-dot']} 
                    style={{ color: theme.secondary }}
                    className="text-lg"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800 mb-1">Venue</h3>
                  <p className="text-gray-700">{event.venue}</p>
                  {event.address && (
                    <p className="text-sm text-gray-600 mt-1">{event.address}</p>
                  )}
                  
                  {/* Google Maps Button */}
                  <button
                    onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(event.address || event.venue)}`, '_blank')}
                    className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22S19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="#EA4335"/>
                      <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22S19 14.25 19 9C19 5.13 15.87 2 12 2Z" fill="#4285F4" fillOpacity="0.5"/>
                      <circle cx="12" cy="9" r="2.5" fill="#34A853"/>
                    </svg>
                    <span className="text-sm font-medium text-gray-700">Open Location</span>
                  </button>
                </div>
              </div>

              {/* RSVP Section */}
              <div className="pt-4 border-t border-gray-100">
                <h3 className="font-medium text-gray-800 mb-4">Your RSVP</h3>
                
                {/* Segmented Control */}
                <div className="flex rounded-lg overflow-hidden border" style={{ borderColor: theme.primary }}>
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
                    Attending
                  </button>
                  <button
                    onClick={() => handleRSVPUpdate('no')}
                    disabled={isUpdating}
                    className={cn(
                      "flex-1 py-3 px-4 text-sm font-medium transition-all duration-300 border-x",
                      rsvpStatus === 'no' 
                        ? 'text-white shadow-inner' 
                        : 'bg-white hover:bg-gray-50 text-gray-600'
                    )}
                    style={{
                      borderColor: theme.primary,
                      backgroundColor: rsvpStatus === 'no' ? theme.primary : undefined,
                    }}
                  >
                    Not Attending
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

                {/* Guest Count - Only shows when attending */}
                {showGuestCount && (
                  <div className="mt-6 animate-in fade-in slide-in-from-top-2 duration-500">
                    <div className="text-center">
                      <label className="text-sm font-medium text-gray-600 block mb-3">
                        Number of Guests
                      </label>
                      <div className="flex items-center justify-center gap-4">
                        <button
                          onClick={() => updateGuestCount(Math.max(1, plusOnes - 1))}
                          className="w-10 h-10 rounded-full border-2 hover:bg-gray-50 transition-all flex items-center justify-center"
                          style={{ borderColor: theme.primary }}
                        >
                          <span className="text-lg font-semibold" style={{ color: theme.primary }}>−</span>
                        </button>
                        <span className="text-2xl font-bold w-12 text-center" style={{ color: theme.primary }}>
                          {plusOnes}
                        </span>
                        <button
                          onClick={() => updateGuestCount(plusOnes + 1)}
                          className="w-10 h-10 rounded-full border-2 hover:bg-gray-50 transition-all flex items-center justify-center"
                          style={{ borderColor: theme.primary }}
                        >
                          <span className="text-lg font-semibold" style={{ color: theme.primary }}>+</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Floating View Wedding Button */}
        <Link 
          href={`/website/${website.url_slug}?guest=${guest.id}`}
          className="fixed bottom-8 right-8 z-30"
        >
          <button 
            className="bg-white/95 backdrop-blur-md text-gray-800 px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-medium flex items-center gap-2"
          >
            <FontAwesomeIcon icon={['fas', 'arrow-left']} className="text-sm" />
            View Wedding Website
          </button>
        </Link>
      </div>
    </div>
  );
}