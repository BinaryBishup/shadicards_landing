"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Calendar, MapPin, Clock, Users, Heart, Sparkles, User, LogOut } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Guest, Wedding, WeddingWebsite as WeddingWebsiteType, Event } from "@/lib/supabase";

interface WeddingWebsiteProps {
  website: WeddingWebsiteType & { wedding: Wedding };
  guest: Guest;
  events?: Event[];
}

export default function WeddingWebsite({ website, guest, events = [] }: WeddingWebsiteProps) {
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
      {/* Guest Welcome Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-4 max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                {guest.profile_image ? (
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-rose-200">
                    <img 
                      src={guest.profile_image} 
                      alt={guest.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center">
                    <User className="w-5 h-5 text-rose-600" />
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-600">Welcome back,</p>
                  <p className="font-semibold text-gray-900">{guest.title} {guest.name}</p>
                </div>
              </div>
              <Badge className="bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 border-rose-200">
                {guest.side === 'bride' ? "Bride's Side" : guest.side === 'groom' ? "Groom's Side" : "Friend"}
              </Badge>
            </div>
            
            <div className="flex items-center gap-4">
              {daysUntil !== null && (
                <div className="text-right">
                  <p className="text-sm text-gray-600">Days until wedding</p>
                  <p className="text-2xl font-bold text-rose-600">{daysUntil}</p>
                </div>
              )}
              <Button variant="outline" size="sm" className="gap-2">
                <LogOut className="w-4 h-4" />
                Exit
              </Button>
            </div>
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

                <Button className="w-full mt-4" variant="outline">
                  Edit Profile
                </Button>
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

      {/* Footer */}
      <div className="mt-16 py-8 border-t border-gray-200 bg-white">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-gray-500">
            Powered by{" "}
            <span className="font-medium text-gray-700">ShadiCards</span>
          </p>
        </div>
      </div>
    </div>
  );
}