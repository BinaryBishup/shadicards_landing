"use client";

import { useState } from "react";
import Image from "next/image";
import { Calendar, Clock, MapPin, User, ArrowLeft, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import ChatBar from "./ChatBar";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { Guest, Wedding, WeddingWebsite as WeddingWebsiteType, Event, EventInvitation } from "@/lib/supabase";
import { cn } from "@/lib/utils";

interface UpcomingEventProps {
  website: WeddingWebsiteType & { wedding: Wedding };
  guest: Guest;
  event: Event;
  invitation: EventInvitation;
  onEditProfile?: () => void;
}

// Design system colors
const colors = {
  primary: '#D6336C', // Rose pink
  secondary: '#6F42C1', // Muted violet
  accent: '#FFC107', // Warm mustard
  light: '#F8F9FA',
  white: '#FFFFFF',
  text: {
    primary: '#1A1A1A',
    secondary: '#666666',
    muted: '#999999'
  }
};

export default function UpcomingEventEnhanced({ 
  website, 
  guest, 
  event, 
  invitation,
  onEditProfile
}: UpcomingEventProps) {
  const [rsvpStatus, setRsvpStatus] = useState<'yes' | 'no' | 'maybe' | null>(invitation.rsvp_status);
  const [plusOnes, setPlusOnes] = useState(invitation.plus_ones || 0);
  const [message, setMessage] = useState(invitation.message || '');
  const [isUpdating, setIsUpdating] = useState(false);
  const [showRSVPForm, setShowRSVPForm] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const handleRSVPUpdate = async (status: 'yes' | 'no' | 'maybe') => {
    if (status === rsvpStatus) return;
    
    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from('event_invitations')
        .update({
          rsvp_status: status,
          rsvp_date: new Date().toISOString(),
          plus_ones: plusOnes || 0,
          message: message || null,
          invitation_status: 'responded'
        })
        .eq('id', invitation.id);

      if (error) throw error;
      
      setRsvpStatus(status);
      setShowRSVPForm(false);
    } catch (error) {
      console.error('Error updating RSVP:', error);
    } finally {
      setIsUpdating(false);
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
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: colors.light }}>
      {/* Subtle Corner Accent Pattern - Top Right */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.08] pointer-events-none">
        <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="50" fill="none" stroke={colors.primary} strokeWidth="0.5"/>
          <circle cx="60" cy="60" r="40" fill="none" stroke={colors.primary} strokeWidth="0.5"/>
          <circle cx="60" cy="60" r="30" fill="none" stroke={colors.primary} strokeWidth="0.5"/>
          <circle cx="60" cy="60" r="20" fill="none" stroke={colors.primary} strokeWidth="0.5"/>
        </svg>
      </div>
      
      {/* Subtle Corner Accent Pattern - Bottom Left */}
      <div className="absolute bottom-0 left-0 w-32 h-32 opacity-[0.08] pointer-events-none">
        <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="50" fill="none" stroke={colors.primary} strokeWidth="0.5"/>
          <circle cx="60" cy="60" r="40" fill="none" stroke={colors.primary} strokeWidth="0.5"/>
          <circle cx="60" cy="60" r="30" fill="none" stroke={colors.primary} strokeWidth="0.5"/>
          <circle cx="60" cy="60" r="20" fill="none" stroke={colors.primary} strokeWidth="0.5"/>
        </svg>
      </div>

      {/* Refined Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40 border-b" style={{ borderColor: colors.light }}>
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {guest.profile_image ? (
                <div 
                  className="w-12 h-12 rounded-full overflow-hidden"
                  style={{ 
                    border: `2px solid ${colors.primary}`
                  }}
                >
                  <img src={guest.profile_image} alt={guest.name} className="w-full h-full object-cover"/>
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${colors.primary}20` }}>
                  <User className="w-6 h-6" style={{ color: colors.primary }} />
                </div>
              )}
              <div>
                <p className="text-xs uppercase tracking-wider" style={{ color: colors.text.muted }}>Welcome</p>
                <p className="font-semibold" style={{ color: colors.text.primary }}>
                  {guest.title} {guest.name}
                </p>
              </div>
            </div>
            
            <Button 
              onClick={onEditProfile}
              className="transition-all duration-150 hover:scale-[0.98]"
              style={{ 
                backgroundColor: colors.primary,
                color: colors.white
              }}
            >
              Edit Profile
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content - Centered Card with proper gutters */}
      <div className="container mx-auto px-8 py-16 max-w-[600px] animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Card 
          className="overflow-hidden shadow-xl"
          style={{ 
            border: `1px solid ${colors.primary}30`,
            borderRadius: '12px'
          }}
        >
          {/* Event Header - Clean and Simple */}
          <div 
            className="px-8 py-6 relative overflow-hidden"
            style={{ 
              backgroundColor: colors.primary
            }}
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-semibold text-white">{event.name}</h1>
                {event.description && (
                  <p className="text-white/90 text-sm mt-1">{event.description}</p>
                )}
              </div>
            </div>
            {/* Small corner accent */}
            <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
              <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
                <circle cx="40" cy="40" r="30" fill="none" stroke="white" strokeWidth="1"/>
                <circle cx="40" cy="40" r="20" fill="none" stroke="white" strokeWidth="1"/>
              </svg>
            </div>
          </div>

          {/* Event Details Section with generous padding */}
          <div className="p-8 space-y-8">
            {/* Date & Time */}
            <div className="flex items-start gap-4">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${colors.primary}10` }}
              >
                <Calendar className="w-5 h-5" style={{ color: colors.primary }} />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-base mb-1" style={{ color: colors.text.primary }}>
                  Date & Time
                </h3>
                <p className="text-sm" style={{ color: colors.text.secondary }}>
                  {formatDate(event.event_date)}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="w-4 h-4" style={{ color: colors.text.muted }} />
                  <span className="text-sm" style={{ color: colors.text.secondary }}>
                    {formatTime(event.start_time)} - {formatTime(event.end_time)}
                  </span>
                </div>
              </div>
            </div>

            {/* Venue */}
            <div className="flex items-start gap-4">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${colors.secondary}10` }}
              >
                <MapPin className="w-5 h-5" style={{ color: colors.secondary }} />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-base mb-1" style={{ color: colors.text.primary }}>
                  Venue
                </h3>
                <p className="text-sm" style={{ color: colors.text.secondary }}>
                  {event.venue}
                </p>
                {event.address && (
                  <p className="text-sm mt-1" style={{ color: colors.text.muted }}>
                    {event.address}
                  </p>
                )}
                <button
                  onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(event.address || event.venue)}`, '_blank')}
                  className="mt-2 text-sm font-medium transition-all duration-150 hover:underline"
                  style={{ color: colors.accent }}
                >
                  View on Maps →
                </button>
              </div>
            </div>

            {/* RSVP Section with Segmented Control */}
            <div className="pt-4 border-t" style={{ borderColor: colors.light }}>
              <h3 className="font-medium text-base mb-4" style={{ color: colors.text.primary }}>
                Your RSVP
              </h3>
              
              {/* Segmented Control */}
              <div className="flex rounded-lg overflow-hidden border" style={{ borderColor: colors.primary }}>
                <button
                  onClick={() => handleRSVPUpdate('yes')}
                  disabled={isUpdating}
                  className={cn(
                    "flex-1 py-3 px-4 text-sm font-medium transition-all duration-150",
                    rsvpStatus === 'yes' 
                      ? 'text-white' 
                      : 'bg-white hover:bg-gray-50'
                  )}
                  style={{
                    backgroundColor: rsvpStatus === 'yes' ? colors.primary : undefined,
                    color: rsvpStatus === 'yes' ? colors.white : colors.text.secondary
                  }}
                >
                  Attending
                </button>
                <button
                  onClick={() => handleRSVPUpdate('no')}
                  disabled={isUpdating}
                  className={cn(
                    "flex-1 py-3 px-4 text-sm font-medium transition-all duration-150 border-x",
                    rsvpStatus === 'no' 
                      ? 'text-white' 
                      : 'bg-white hover:bg-gray-50'
                  )}
                  style={{
                    borderColor: colors.primary,
                    backgroundColor: rsvpStatus === 'no' ? colors.primary : undefined,
                    color: rsvpStatus === 'no' ? colors.white : colors.text.secondary
                  }}
                >
                  Not Attending
                </button>
                <button
                  onClick={() => handleRSVPUpdate('maybe')}
                  disabled={isUpdating}
                  className={cn(
                    "flex-1 py-3 px-4 text-sm font-medium transition-all duration-150",
                    rsvpStatus === 'maybe' 
                      ? 'text-white' 
                      : 'bg-white hover:bg-gray-50'
                  )}
                  style={{
                    backgroundColor: rsvpStatus === 'maybe' ? colors.primary : undefined,
                    color: rsvpStatus === 'maybe' ? colors.white : colors.text.secondary
                  }}
                >
                  Maybe
                </button>
              </div>

              {/* Additional Options for "Yes" */}
              {rsvpStatus === 'yes' && (
                <div className="mt-4 p-4 rounded-lg animate-in fade-in slide-in-from-top-2" style={{ backgroundColor: colors.light }}>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium" style={{ color: colors.text.secondary }}>
                        Number of Guests
                      </label>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => setPlusOnes(Math.max(1, plusOnes - 1))}
                          className="w-8 h-8 rounded-full border hover:bg-gray-50 transition-all duration-150"
                          style={{ borderColor: colors.primary }}
                        >
                          -
                        </button>
                        <span className="w-12 text-center font-medium">{plusOnes || 1}</span>
                        <button
                          onClick={() => setPlusOnes(plusOnes + 1)}
                          className="w-8 h-8 rounded-full border hover:bg-gray-50 transition-all duration-150"
                          style={{ borderColor: colors.primary }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium" style={{ color: colors.text.secondary }}>
                        Special Requests
                      </label>
                      <Textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Dietary preferences or other notes..."
                        className="mt-2 resize-none"
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Floating Buttons - Clean positioning */}
      <Link 
        href={`/website/${website.url_slug}?guest=${guest.id}`}
        className="fixed bottom-8 right-8 z-30"
      >
        <Button 
          className="rounded-full shadow-lg transition-all duration-150 hover:scale-[1.02] px-6 py-3"
          style={{ 
            backgroundColor: colors.accent,
            color: colors.text.primary,
            fontWeight: '500'
          }}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          View Wedding
        </Button>
      </Link>

      {/* Chat Button - Subtle pulse */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-8 left-8 z-30 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-150 hover:scale-[1.05]"
        style={{ 
          backgroundColor: colors.primary,
          color: colors.white
        }}
      >
        <MessageCircle className="w-5 h-5" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
      </button>

      {/* Chat Interface - Simplified */}
      {showChat && (
        <div className="fixed bottom-24 left-8 z-40 w-72 bg-white rounded-lg shadow-xl animate-in fade-in slide-in-from-bottom-2">
          <div className="p-4 border-b" style={{ borderColor: colors.light }}>
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-sm">Need Help?</h3>
              <button 
                onClick={() => setShowChat(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
          </div>
          <div className="p-4">
            <p className="text-sm" style={{ color: colors.text.secondary }}>
              Questions about the event? Contact us!
            </p>
            {website.wedding.rsvp_contact && (
              <p className="text-xs mt-2 font-medium" style={{ color: colors.primary }}>
                {website.wedding.rsvp_contact}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-24 py-8 border-t bg-white" style={{ borderColor: colors.light }}>
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm" style={{ color: colors.text.muted }}>Made with</span>
            <svg className="w-4 h-4" fill={colors.primary} viewBox="0 0 20 20">
              <path d="M10 18l-1.45-1.32C3.4 12.36 0 9.28 0 5.5 0 2.42 2.42 0 5.5 0c1.74 0 3.41.81 4.5 2.09C11.09.81 12.76 0 14.5 0 17.58 0 20 2.42 20 5.5c0 3.78-3.4 6.86-8.55 11.18L10 18z"/>
            </svg>
            <span className="text-sm" style={{ color: colors.text.muted }}>by</span>
            <Image
              src="/Shadiards_logo.svg"
              alt="ShadiCards"
              width={100}
              height={30}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}