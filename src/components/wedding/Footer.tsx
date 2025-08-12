"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, HelpCircle, Home } from "lucide-react";
import HelpModal from "./HelpModal";
import EventLoadingScreen from "./EventLoadingScreen";

interface FooterProps {
  showViewEvents?: boolean;
  eventUrl?: string;
  isEventPage?: boolean;
  showAllEvents?: boolean;
  weddingUrl?: string;
  onAllEventsClick?: () => void;
}

export default function Footer({ 
  showViewEvents = true, 
  eventUrl, 
  isEventPage = false,
  showAllEvents = false,
  weddingUrl = "/",
  onAllEventsClick
}: FooterProps) {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isLoadingEvents, setIsLoadingEvents] = useState(false);

  const handleViewEventsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsLoadingEvents(true);
    // Navigate after a short delay to show the loading screen
    setTimeout(() => {
      window.location.href = e.currentTarget.href;
    }, 100);
  };

  return (
    <>
      {/* Fixed Bottom Footer - Conditional Styling */}
      <div className={`fixed bottom-0 left-0 right-0 z-40 ${
        isEventPage 
          ? "backdrop-blur-md bg-black/40 border-t border-white/10" 
          : "bg-white border-t border-gray-200"
      }`}>
        <div className="container mx-auto max-w-4xl px-4 py-3">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex items-center justify-center gap-3">
            
            {/* All Events Button (for event page) */}
            {isEventPage && showAllEvents && (
              onAllEventsClick ? (
                <button 
                  onClick={onAllEventsClick}
                  className="flex items-center gap-2 bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 backdrop-blur-md px-4 py-2 rounded-full transition-all text-white font-medium shadow-lg border border-white/20"
                >
                  <Home className="w-4 h-4" />
                  <span className="text-sm">All Events</span>
                </button>
              ) : (
                <Link 
                  href={weddingUrl}
                  className="flex items-center gap-2 bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 backdrop-blur-md px-4 py-2 rounded-full transition-all text-white font-medium shadow-lg border border-white/20"
                >
                  <Home className="w-4 h-4" />
                  <span className="text-sm">All Events</span>
                </Link>
              )
            )}
            
            {/* View Events Button (for wedding page) */}
            {!isEventPage && showViewEvents && eventUrl && (
              <Link 
                href={eventUrl}
                onClick={handleViewEventsClick}
                className="flex items-center gap-2 px-6 py-2.5 bg-black text-white rounded-full hover:bg-gray-800 transition-all text-sm font-medium"
              >
                <Calendar className="w-4 h-4" />
                <span>View Events</span>
              </Link>
            )}
            
            {/* Help Button - Different styles for event vs wedding page */}
            <button
              onClick={() => setIsHelpOpen(true)}
              className={`flex items-center gap-2 rounded-full transition-all font-medium ${
                isEventPage
                  ? "bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 backdrop-blur-md px-4 py-2 text-white shadow-lg border border-white/20"
                  : "px-6 py-2.5 bg-white text-black hover:bg-gray-50 border-2 border-black text-sm"
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span className={isEventPage ? "text-sm" : ""}>Help</span>
            </button>
            </div>
            {/* Footer text below buttons */}
            <div className={`flex items-center gap-1 text-xs ${
              isEventPage ? "text-white/60" : "text-gray-500"
            }`}>
              <span>Made with love by</span>
              <Image
                src="/Shadiards_logo.svg"
                alt="ShadiCards"
                width={60}
                height={18}
                className={isEventPage ? "opacity-60 brightness-0 invert" : "opacity-70"}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Help Modal */}
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
      
      {/* Loading Screen Overlay */}
      {isLoadingEvents && (
        <div className="fixed inset-0 z-50">
          <EventLoadingScreen eventName="Your Events" />
        </div>
      )}
    </>
  );
}