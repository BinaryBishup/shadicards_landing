"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import EventUnified from "./EventUnified";
import EventLoadingScreen from "./EventLoadingScreen";
import type { Weddings, Guest, Event as SupabaseEvent, EventInvitation } from "@/lib/supabase";

interface EventPageClientUnifiedProps {
  initialWedding: Weddings;
  initialGuest: Guest;
  initialEvents: { event: SupabaseEvent; invitation: EventInvitation }[];
  urlSlug: string;
}

export default function EventPageClientUnified({ 
  initialWedding, 
  initialGuest, 
  initialEvents,
  urlSlug 
}: EventPageClientUnifiedProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [wedding] = useState(initialWedding);
  const [guest] = useState(initialGuest);
  const [guestEvents] = useState(initialEvents);
  const [currentEventData, setCurrentEventData] = useState<{ event: SupabaseEvent; invitation: EventInvitation } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  const eventIndex = parseInt(searchParams.get('index') || '0');
  const guestId = searchParams.get('guest');

  useEffect(() => {
    // Show loading screen for initial load
    if (isInitialLoad) {
      setTimeout(() => {
        const currentIndex = Math.min(Math.max(0, eventIndex), guestEvents.length - 1);
        setCurrentEventData(guestEvents[currentIndex]);
        setIsLoading(false);
        setIsInitialLoad(false);
      }, 500); // Brief delay to show loading animation
    } else {
      // For subsequent navigation, update immediately
      const currentIndex = Math.min(Math.max(0, eventIndex), guestEvents.length - 1);
      setCurrentEventData(guestEvents[currentIndex]);
      setIsLoading(false);
    }
  }, [eventIndex, guestEvents, isInitialLoad]);

  const handleNavigation = (newIndex: number) => {
    setIsLoading(true);
    // Show loading screen briefly for smooth transition
    setTimeout(() => {
      router.push(`/wedding/${urlSlug}/event?guest=${guestId}&index=${newIndex}`);
    }, 100);
  };

  if (isLoading || !currentEventData) {
    return <EventLoadingScreen eventName={currentEventData?.event.name || guestEvents[eventIndex]?.event.name || "Event"} />;
  }

  const allInvitedEvents = guestEvents.map(ge => ge.event);
  const currentEventIndex = allInvitedEvents.findIndex(e => e.id === currentEventData.event.id);

  return (
    <EventUnified
      wedding={wedding}
      guest={guest}
      event={currentEventData.event}
      invitation={currentEventData.invitation}
      allEvents={allInvitedEvents}
      currentEventIndex={currentEventIndex}
      onNavigate={handleNavigation}
    />
  );
}