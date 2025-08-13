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
}

export default function WeddingWebsite({ website, guest, events = [], urlSlug }: WeddingWebsiteProps) {
  // Get the template ID from the database
  const templateId = getTemplateIdFromDatabase(website.template_id);
  const templateConfig = getTemplate(templateId);
  const TemplateComponent = templateConfig.component;

  // Map database data to template format
  const weddingData = mapDatabaseToTemplateData(website.wedding, website, events);
  

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


      {/* Add spacing for fixed footer */}
      <div className="mb-20"></div>

      {/* Footer with View Events and Help buttons */}
      <Footer 
        showViewEvents={events && events.length > 0}
        eventUrl={events && events.length > 0 ? `/wedding/${urlSlug}/event?guest=${guest.id}&index=0` : undefined}
      />
    </div>
  );
}