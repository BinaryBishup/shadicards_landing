"use client";

import Image from "next/image";
import { Heart, User, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Footer from "./Footer";
import Link from "next/link";
import { getTemplate } from "@/lib/template-registry";
import { mapDatabaseToTemplateData, getTemplateIdFromDatabase } from "@/lib/wedding-data-mapper";
import type { Guest, Wedding, WeddingWebsite as WeddingWebsiteType, Event } from "@/lib/supabase";
import { Calendar } from "../ui/calendar";

interface WeddingWebsiteProps {
  website: WeddingWebsiteType & { wedding: Wedding };
  guest: Guest;
  events?: Event[];
  urlSlug: string;
  onEditProfile?: () => void;
}

export default function WeddingWebsite({ website, guest, events = [], urlSlug, onEditProfile }: WeddingWebsiteProps) {
  // Get the template ID from the database
  console.log("🎨 TEMPLATE DEBUG - Raw template_id from database:", website.template_id);
  const templateId = getTemplateIdFromDatabase(website.template_id);
  console.log("🎨 TEMPLATE DEBUG - Resolved templateId:", templateId);
  const templateConfig = getTemplate(templateId);
  console.log("🎨 TEMPLATE DEBUG - Template config:", templateConfig);
  console.log("🎨 TEMPLATE DEBUG - Template name:", templateConfig.name);
  const TemplateComponent = templateConfig.component;

  // Map database data to template format
  console.log("Debug - Wedding data:", website.wedding);
  console.log("Debug - Website data:", website);
  console.log("Debug - Visibility toggles:", {
    show_hero: website.show_hero,
    show_about: website.show_about,
    show_story: website.show_story,
    show_families: website.show_families,
    show_gallery: website.show_gallery,
    show_wedding_party: website.show_wedding_party,
    show_chat: website.show_chat
  });
  const weddingData = mapDatabaseToTemplateData(website.wedding, website, events);
  console.log("Debug - Mapped gallery data:", weddingData.gallery);
  console.log("Debug - Mapped family data:", weddingData.family);
  console.log("Debug - Mapped wedding party data:", weddingData.weddingParty);
  

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
                      alt={`${guest.first_name} ${guest.last_name}`.trim()}
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
                    {`${guest.first_name} ${guest.last_name}`.trim()}
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
            {onEditProfile && (
              <div className="flex items-center">
                <Button 
                  onClick={onEditProfile}
                  className="bg-black hover:bg-gray-800 text-white gap-1 md:gap-2 shadow-md text-xs md:text-sm px-3 md:px-4"
                >
                  <Edit className="w-3 md:w-4 h-3 md:h-4" />
                  <span className="hidden sm:inline">Edit Profile</span>
                  <span className="sm:hidden">Edit</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Template Content */}
      <TemplateComponent
        data={weddingData}
        primaryColor={website.primary_color || "#ec4899"}
        secondaryColor={website.secondary_color || "#f97316"}
        visibility={{
          show_hero: website.show_hero !== false,  // Show if true or null
          show_about: website.show_about !== false,
          show_story: website.show_story !== false,
          show_families: website.show_families !== false,
          show_gallery: website.show_gallery !== false,
          show_wedding_party: website.show_wedding_party !== false,
          show_chat: website.show_chat === true  // Only show if explicitly true
        }}
      />


      {/* Add spacing for fixed footer */}
      <div className="mb-20"></div>

      {/* Footer with View Events and Help buttons */}
      <Footer 
        showViewEvents={events && events.length > 0}
        eventUrl={events && events.length > 0 ? `/wedding/${urlSlug}/event?guest=${guest.id}&index=0` : undefined}
        rsvpContact={website.wedding.rsvp_contact}
      />
    </div>
  );
}