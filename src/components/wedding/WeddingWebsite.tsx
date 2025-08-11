"use client";

import Image from "next/image";
import { Heart, User, Edit, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ChatBar from "./ChatBar";
import Link from "next/link";
import { getTemplate } from "@/lib/template-registry";
import { mapDatabaseToTemplateData, getTemplateIdFromDatabase } from "@/lib/wedding-data-mapper";
import type { Guest, Wedding, WeddingWebsite as WeddingWebsiteType, Event } from "@/lib/supabase";

interface WeddingWebsiteProps {
  website: WeddingWebsiteType & { wedding: Wedding };
  guest: Guest;
  events?: Event[];
  onEditProfile?: () => void;
  urlSlug: string;
}

export default function WeddingWebsite({ website, guest, events = [], onEditProfile, urlSlug }: WeddingWebsiteProps) {
  // Get the template ID from the database
  const templateId = getTemplateIdFromDatabase(website.template_id);
  const templateConfig = getTemplate(templateId);
  const TemplateComponent = templateConfig.component;

  // Map database data to template format
  const weddingData = mapDatabaseToTemplateData(website.wedding, website, events);
  
  // Determine what sections to show based on website settings
  const showChat = website.show_chat !== false; // Default to true if not set

  return (
    <div className="min-h-screen">
      {/* Guest Welcome Header - Kept from original */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
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

      {/* Template Content */}
      <TemplateComponent 
        data={weddingData}
        primaryColor={website.primary_color || "#ec4899"}
        secondaryColor={website.secondary_color || "#f97316"}
        visibility={{
          show_hero: website.show_hero ?? undefined,
          show_about: website.show_about ?? undefined,
          show_story: website.show_story ?? undefined,
          show_families: website.show_families ?? undefined,
          show_gallery: website.show_gallery ?? undefined,
          show_wedding_party: website.show_wedding_party ?? undefined
        }}
      />

      {/* Floating Upcoming Event Button */}
      {events && events.length > 0 && (
        <Link 
          href={`/wedding/${urlSlug}/event?guest=${guest.id}&index=0`}
          className="fixed bottom-32 right-6 z-30"
        >
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg rounded-full px-6 py-3 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            View Upcoming Event
          </Button>
        </Link>
      )}

      {/* Enhanced Footer with Logo - Add margin bottom for chat bar */}
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

      {/* Chat Bar Interface - Conditionally rendered */}
      {showChat && (
        <ChatBar 
          weddingId={website.wedding_id}
          guestId={guest.id}
          websiteSlug={urlSlug}
          weddingName={`${website.wedding.bride_name} & ${website.wedding.groom_name}'s wedding`}
          guestName={guest.first_name || guest.name.split(' ')[0]}
        />
      )}
    </div>
  );
}