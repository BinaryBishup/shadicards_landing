"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Event from "./Event";
import EventLoadingScreen from "./EventLoadingScreen";
import type { Wedding, WeddingWebsite, Guest, Event, EventInvitation } from "@/lib/supabase";

interface EventPageClientProps {
  initialWebsite: WeddingWebsite & { wedding: Wedding };
  initialGuest: Guest;
  initialEvents: { event: Event; invitation: EventInvitation }[];
  urlSlug: string;
}

export default function EventPageClient({ 
  initialWebsite, 
  initialGuest, 
  initialEvents,
  urlSlug 
}: EventPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [website] = useState(initialWebsite);
  const [guest] = useState(initialGuest);
  const [guestEvents] = useState(initialEvents);
  const [currentEventData, setCurrentEventData] = useState<{ event: Event; invitation: EventInvitation } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const eventIndex = parseInt(searchParams.get('index') || '0');
  const guestId = searchParams.get('guest');

  useEffect(() => {
    // Update current event data based on index
    const currentIndex = Math.min(Math.max(0, eventIndex), guestEvents.length - 1);
    setCurrentEventData(guestEvents[currentIndex]);
    setIsLoading(false);
  }, [eventIndex, guestEvents]);

  const handleNavigation = (newIndex: number) => {
    setIsLoading(true);
    // Show loading screen briefly for smooth transition
    setTimeout(() => {
      router.push(`/wedding/${urlSlug}/event?guest=${guestId}&index=${newIndex}`);
    }, 100);
  };

  if (isLoading || !currentEventData) {
    return <EventLoadingScreen eventName={currentEventData?.event.name || "Event"} />;
  }

  const allInvitedEvents = guestEvents.map(ge => ge.event);
  const currentEventIndex = allInvitedEvents.findIndex(e => e.id === currentEventData.event.id);

  return (
    <Event
      website={website}
      guest={guest}
      event={currentEventData.event}
      invitation={currentEventData.invitation}
      allEvents={allInvitedEvents}
      currentEventIndex={currentEventIndex}
      onNavigate={handleNavigation}
    />
  );
}