"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Calendar, MapPin, Clock, Users, Heart, Sparkles, User, Edit } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ChatBar from "./ChatBar";
import type { Guest, Wedding, WeddingWebsite as WeddingWebsiteType, Event } from "@/lib/supabase";

interface WeddingWebsiteProps {
  website: WeddingWebsiteType & { wedding: Wedding };
  guest: Guest;
  events?: Event[];
  onEditProfile?: () => void;
}

export default function WeddingWebsite({ website, guest, events = [], onEditProfile }: WeddingWebsiteProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Date TBD';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getDaysUntilWedding = () => {
    if (!website.wedding.wedding_date) return null;
    const weddingDate = new Date(website.wedding.wedding_date);
    const today = new Date();
    const diffTime = weddingDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const daysUntil = getDaysUntilWedding();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[rgb(254.7,255,235)] to-[rgb(252,250,230)]">
      {/* Enhanced Guest Welcome Header - Mobile Optimized */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="container mx-auto px-4 md:px-6 py-3 md:py-4 max-w-7xl">
          <div className="flex items-center justify-between gap-2">
            {/* Left: Profile Info */}
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
            
            {/* Right: Edit Profile Button */}
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

      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-100 rounded-full filter blur-3xl opacity-30" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-100 rounded-full filter blur-3xl opacity-30" />
        </div>

        {/* Couple Image */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center">
            <div className="mb-8">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-8 border-white shadow-2xl mx-auto">
                {website.wedding.couple_picture ? (
                  <Image
                    src={website.wedding.couple_picture}
                    alt={`${website.wedding.bride_name} & ${website.wedding.groom_name}`}
                    width={256}
                    height={256}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-rose-200 to-pink-200 flex items-center justify-center">
                    <Heart className="w-16 h-16 text-white" />
                  </div>
                )}
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-light text-gray-900 mb-4">
              {website.wedding.bride_name} & {website.wedding.groom_name}
            </h1>
            
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              <p className="text-xl text-gray-600 italic">are getting married</p>
              <Sparkles className="w-5 h-5 text-yellow-500" />
            </div>

            {website.wedding.wedding_date && (
              <p className="text-2xl text-rose-600 font-medium">
                {formatDate(website.wedding.wedding_date)}
              </p>
            )}

            {daysUntil !== null && (
              <div className="mt-4 inline-flex items-center gap-2 bg-white/80 backdrop-blur px-6 py-3 rounded-full shadow-lg">
                <span className="text-3xl font-bold text-rose-600">{daysUntil}</span>
                <span className="text-gray-600">days to go!</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Events */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-rose-600" />
                  Wedding Events
                </CardTitle>
                <CardDescription>
                  You're invited to these special moments
                </CardDescription>
              </CardHeader>
              <CardContent>
                {events.length > 0 ? (
                  <div className="space-y-4">
                    {events.map((event) => (
                      <div key={event.id} className="p-4 rounded-lg border border-gray-200 hover:border-rose-300 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg text-gray-900 mb-1">{event.name}</h3>
                            {event.description && (
                              <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                            )}
                            <div className="space-y-1 text-sm text-gray-600">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{formatDate(event.event_date)}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{event.start_time} - {event.end_time}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                <span>{event.venue}</span>
                              </div>
                            </div>
                          </div>
                          {event.color && (
                            <div 
                              className="w-3 h-full rounded-full"
                              style={{ backgroundColor: event.color }}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">Event details coming soon!</p>
                )}
              </CardContent>
            </Card>

            {/* Our Story Section */}
            {(website.wedding.our_story || website.wedding.how_we_met) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-rose-600" />
                    Our Love Story
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {website.wedding.how_we_met && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">How We Met</h4>
                      <p className="text-gray-600">{website.wedding.how_we_met}</p>
                    </div>
                  )}
                  {website.wedding.our_story && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Our Journey</h4>
                      <p className="text-gray-600">{website.wedding.our_story}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Guest Info & Actions */}
          <div className="space-y-6">
            {/* Guest Profile Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  {guest.profile_image ? (
                    <img 
                      src={guest.profile_image} 
                      alt={guest.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="w-8 h-8 text-gray-500" />
                    </div>
                  )}
                  <div>
                    <p className="font-semibold">{guest.name}</p>
                    <p className="text-sm text-gray-600">{guest.relationship}</p>
                  </div>
                </div>
                
                <div className="pt-3 space-y-2 text-sm">
                  {guest.email && (
                    <p className="text-gray-600">
                      <span className="font-medium">Email:</span> {guest.email}
                    </p>
                  )}
                  {guest.whatsapp && (
                    <p className="text-gray-600">
                      <span className="font-medium">WhatsApp:</span> {guest.whatsapp}
                    </p>
                  )}
                  {guest.dietary_preferences && (
                    <p className="text-gray-600">
                      <span className="font-medium">Dietary:</span> {guest.dietary_preferences}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Venue Card */}
            {website.wedding.venue_name && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-rose-600" />
                    Wedding Venue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold text-gray-900">{website.wedding.venue_name}</p>
                  {website.wedding.venue_address && (
                    <p className="text-sm text-gray-600 mt-1">{website.wedding.venue_address}</p>
                  )}
                  <Button className="w-full mt-4" variant="outline" size="sm">
                    Get Directions
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full justify-start" variant="outline" size="sm">
                  <Users className="w-4 h-4 mr-2" />
                  Update RSVP
                </Button>
                <Button className="w-full justify-start" variant="outline" size="sm">
                  <Heart className="w-4 h-4 mr-2" />
                  Send Wishes
                </Button>
                <Button className="w-full justify-start" variant="outline" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Add to Calendar
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Enhanced Footer with Logo - Add margin bottom for chat bar */}
      <div className="mt-16 mb-20 py-8 border-t border-gray-200 bg-white">
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

      {/* Chat Bar Interface */}
      <ChatBar 
        weddingName={`${website.wedding.bride_name} & ${website.wedding.groom_name}'s wedding`}
        guestName={guest.first_name || guest.name.split(' ')[0]}
      />
    </div>
  );
}