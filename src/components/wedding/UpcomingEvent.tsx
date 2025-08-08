"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Calendar, Clock, MapPin, Users, Heart, User, Edit, ArrowLeft, Check, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import ChatBar from "./ChatBar";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { Guest, Wedding, WeddingWebsite as WeddingWebsiteType, Event, EventInvitation } from "@/lib/supabase";

interface UpcomingEventProps {
  website: WeddingWebsiteType & { wedding: Wedding };
  guest: Guest;
  event: Event;
  invitation: EventInvitation;
  onEditProfile?: () => void;
}

export default function UpcomingEvent({ 
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

  const showChat = website.show_chat !== false;

  const handleRSVPUpdate = async (status: 'yes' | 'no' | 'maybe') => {
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

      if (error) {
        console.error('Error updating RSVP:', error);
        throw error;
      }
      
      setRsvpStatus(status);
      setShowRSVPForm(false);
    } catch (error) {
      console.error('Error updating RSVP:', error);
      alert('Failed to update RSVP. Please try again.');
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

  const getRSVPColor = (status: string | null) => {
    switch(status) {
      case 'yes': return 'bg-green-100 text-green-800 border-green-300';
      case 'no': return 'bg-red-100 text-red-800 border-red-300';
      case 'maybe': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* Guest Welcome Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 md:px-6 py-3 md:py-4 max-w-7xl">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
              <div className="flex items-center gap-2 md:gap-3">
                {guest.profile_image ? (
                  <div className="w-10 md:w-12 h-10 md:h-12 rounded-full overflow-hidden border-2 md:border-3 border-rose-300 shadow-md flex-shrink-0">
                    <img 
                      src={guest.profile_image} 
                      alt={guest.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-10 md:w-12 h-10 md:h-12 rounded-full bg-gradient-to-br from-rose-200 to-pink-200 flex items-center justify-center shadow-md flex-shrink-0">
                    <User className="w-5 md:w-6 h-5 md:h-6 text-rose-700" />
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider">Welcome</p>
                  <p className="font-semibold text-gray-900 text-sm md:text-lg truncate">
                    <span className="hidden sm:inline">{guest.title || ''} </span>
                    {guest.name}
                  </p>
                </div>
              </div>
              
              <div className="hidden md:block h-10 w-px bg-gray-200" />
              
              <Badge className="hidden sm:flex bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 border-rose-300 px-2 md:px-3 py-1 text-xs">
                <Heart className="w-3 h-3 mr-1" />
                <span className="hidden md:inline">
                  {guest.side === 'bride' ? "Bride's Side" : guest.side === 'groom' ? "Groom's Side" : "Friend"}
                </span>
                <span className="md:hidden">
                  {guest.side === 'bride' ? "Bride's" : guest.side === 'groom' ? "Groom's" : "Friend"}
                </span>
              </Badge>
            </div>
            
            <Button 
              onClick={onEditProfile}
              className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white gap-1 md:gap-2 shadow-md text-xs md:text-sm px-3 md:px-4"
            >
              <Edit className="w-3 md:w-4 h-3 md:h-4" />
              <span className="hidden sm:inline">Edit Profile</span>
              <span className="sm:hidden">Edit</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Event Details */}
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 max-w-4xl">
        {/* Event Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-gradient-to-br from-rose-400 to-pink-400 text-white shadow-xl">
            <Calendar className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-4">
            {event.name}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {event.description}
          </p>
        </div>

        {/* Event Details Card */}
        <Card className="overflow-hidden border-2 border-rose-200 shadow-xl mb-8">
          <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">Event Details</h2>
            <p className="text-rose-100">You're invited to celebrate with us!</p>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Date & Time */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-6 h-6 text-rose-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Date & Time</h3>
                <p className="text-gray-700">{formatDate(event.event_date)}</p>
                <p className="text-gray-600 text-sm">
                  {formatTime(event.start_time)} - {formatTime(event.end_time)}
                </p>
              </div>
            </div>

            {/* Venue */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-rose-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Venue</h3>
                <p className="text-gray-700">{event.venue}</p>
                {event.address && (
                  <p className="text-gray-600 text-sm mt-1">{event.address}</p>
                )}
                <Button 
                  variant="link" 
                  className="text-rose-600 hover:text-rose-700 p-0 h-auto mt-2"
                  onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(event.address || event.venue)}`, '_blank')}
                >
                  View on Maps →
                </Button>
              </div>
            </div>

            {/* RSVP Status */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-rose-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-3">Your RSVP</h3>
                
                {!showRSVPForm ? (
                  <div className="space-y-3">
                    {rsvpStatus && (
                      <Badge className={`${getRSVPColor(rsvpStatus)} px-4 py-2 text-sm font-medium`}>
                        {rsvpStatus === 'yes' && '✓ Attending'}
                        {rsvpStatus === 'no' && '✗ Not Attending'}
                        {rsvpStatus === 'maybe' && '? Maybe'}
                      </Badge>
                    )}
                    
                    <div className="flex gap-2">
                      {(!rsvpStatus || rsvpStatus !== 'yes') && (
                        <Button 
                          onClick={() => setShowRSVPForm(true)}
                          className="bg-green-600 hover:bg-green-700 text-white"
                          size="sm"
                        >
                          <Check className="w-4 h-4 mr-1" />
                          {rsvpStatus ? 'Change to Yes' : 'Yes, I\'ll Attend'}
                        </Button>
                      )}
                      {(!rsvpStatus || rsvpStatus !== 'no') && (
                        <Button 
                          onClick={() => handleRSVPUpdate('no')}
                          variant="outline"
                          className="border-red-300 text-red-600 hover:bg-red-50"
                          size="sm"
                        >
                          <X className="w-4 h-4 mr-1" />
                          {rsvpStatus ? 'Change to No' : 'Can\'t Attend'}
                        </Button>
                      )}
                      {(!rsvpStatus || rsvpStatus !== 'maybe') && (
                        <Button 
                          onClick={() => handleRSVPUpdate('maybe')}
                          variant="outline"
                          className="border-yellow-500 text-yellow-600 hover:bg-yellow-50"
                          size="sm"
                        >
                          {rsvpStatus ? 'Change to Maybe' : 'Maybe'}
                        </Button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        How many guests? (including yourself)
                      </label>
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          onClick={() => setPlusOnes(Math.max(1, plusOnes - 1))}
                          className="w-10 h-10 rounded-full"
                          variant="outline"
                        >
                          -
                        </Button>
                        <span className="w-12 text-center font-semibold">{plusOnes || 1}</span>
                        <Button
                          type="button"
                          onClick={() => setPlusOnes(plusOnes + 1)}
                          className="w-10 h-10 rounded-full"
                          variant="outline"
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message (optional)
                      </label>
                      <Textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Any dietary preferences or special requests?"
                        rows={3}
                      />
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleRSVPUpdate('yes')}
                        className="bg-green-600 hover:bg-green-700 text-white"
                        disabled={isUpdating}
                      >
                        Confirm Attendance
                      </Button>
                      <Button
                        onClick={() => setShowRSVPForm(false)}
                        variant="outline"
                        disabled={isUpdating}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Additional Info */}
        <Card className="border-2 border-rose-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-rose-600" />
            Need Help?
          </h3>
          <p className="text-gray-600 mb-4">
            If you have any questions about the event or need assistance with directions, 
            please don't hesitate to reach out through the chat below or contact the couple directly.
          </p>
          {website.wedding.rsvp_contact && (
            <p className="text-sm text-gray-500">
              Contact: {website.wedding.rsvp_contact}
            </p>
          )}
        </Card>
      </div>

      {/* Floating View Wedding Button */}
      <Link 
        href={`/website/${website.url_slug}?guest=${guest.id}`}
        className="fixed bottom-24 right-6 z-30"
      >
        <Button className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-lg rounded-full px-6 py-3 flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" />
          View Wedding Website
        </Button>
      </Link>

      {/* Footer */}
      <div className={`mt-16 ${showChat ? 'mb-20' : 'mb-0'} py-8 border-t border-gray-200 bg-white`}>
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <span className="text-sm">Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span className="text-sm">by</span>
            <div className="flex items-center gap-2">
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