"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import WeddingWebsite from "@/components/wedding/WeddingWebsite";
import LoadingScreen from "@/components/wedding/LoadingScreen";
import GuestDetailsModal from "@/components/wedding/GuestDetailsModal";
import { supabase } from "@/lib/supabase";
import type { Weddings, Guest, Event } from "@/lib/supabase";

interface WeddingPageContentProps {
  weddingId: string;
  guestId?: string;
}

export default function WeddingPageContent({ weddingId, guestId }: WeddingPageContentProps) {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [wedding, setWedding] = useState<Weddings | null>(null);
  const [guest, setGuest] = useState<Guest | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if edit=true parameter is present
  const editParam = searchParams?.get('edit');
  
  useEffect(() => {
    if (editParam === 'true' && guest) {
      setShowGuestModal(true);
    }
  }, [editParam, guest]);

  useEffect(() => {
    loadWeddingData();
  }, [weddingId, guestId]);

  const loadWeddingData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load wedding data directly by ID
      const { data: weddingData, error: weddingError } = await supabase
        .from("weddings")
        .select("*")
        .eq("id", weddingId)
        .single();

      if (weddingError || !weddingData) {
        throw new Error("Wedding not found");
      }

      setWedding(weddingData);

      // Load guest data if guestId is provided
      if (guestId) {
        const { data: guestData, error: guestError } = await supabase
          .from("guests")
          .select("*")
          .eq("id", guestId)
          .eq("wedding_id", weddingId)
          .single();

        if (guestError || !guestData) {
          console.warn("Guest not found:", guestError);
          // Don't throw error, just continue without guest
        } else {
          setGuest(guestData);
        }
      }

      // Load events for this wedding
      const { data: eventsData, error: eventsError } = await supabase
        .from("events")
        .select("*")
        .eq("wedding_id", weddingId)
        .order("event_date", { ascending: true });

      if (eventsError) {
        console.warn("Error loading events:", eventsError);
      } else {
        setEvents(eventsData || []);
      }

    } catch (err) {
      console.error("Error loading wedding data:", err);
      setError(err instanceof Error ? err.message : "Failed to load wedding data");
    } finally {
      setLoading(false);
    }
  };

  // Loading state with improved experience
  if (loading) {
    return <LoadingScreen guestName={guest?.first_name || guest?.last_name} />;
  }

  // Error state
  if (error || !wedding) {
    return (
      <div className="min-h-screen bg-[rgb(254.7,255,235)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Wedding Not Found</h1>
          <p className="text-gray-600">{error || "The wedding you're looking for doesn't exist."}</p>
        </div>
      </div>
    );
  }

  // Create a compatible website object for WeddingWebsite component
  const websiteData = {
    id: wedding.id,
    wedding_id: wedding.id,
    url_slug: wedding.id,
    status: wedding.status,
    is_password_protected: wedding.is_password_protected,
    password: wedding.password,
    visibility: wedding.visibility,
    template_id: wedding.template_id,
    primary_color: wedding.primary_color,
    secondary_color: wedding.secondary_color,
    show_hero: wedding.show_hero,
    show_about: wedding.show_about,
    show_story: wedding.show_story,
    show_gallery: wedding.show_gallery,
    show_events: wedding.show_events,
    show_families: wedding.show_families,
    show_wedding_party: wedding.show_wedding_party,
    show_chat: wedding.show_chat,
    story_items: wedding.story_items,
    gallery_images: wedding.gallery_images,
    bride_families: wedding.bride_families,
    groom_families: wedding.groom_families,
    bridesmaids: wedding.bridesmaids,
    groomsmen: wedding.groomsmen,
    meta_title: wedding.meta_title,
    meta_description: wedding.meta_description,
    og_image: wedding.og_image,
    view_count: wedding.view_count,
    last_viewed_at: wedding.last_viewed_at,
    wedding: {
      id: wedding.id,
      bride_name: wedding.bride_name,
      groom_name: wedding.groom_name,
      wedding_date: wedding.wedding_date,
      venue_name: wedding.venue_name,
      venue_address: wedding.venue_address,
      phone_number: wedding.phone_number,
      email: wedding.email,
      is_active: wedding.is_active,
      couple_picture: wedding.couple_picture,
      bride_photo_url: wedding.bride_photo_url,
      groom_photo_url: wedding.groom_photo_url,
      about_bride: wedding.about_bride,
      about_groom: wedding.about_groom,
      rsvp_contact: wedding.rsvp_contact,
      user_id: wedding.user_id,
    }
  };

  return (
    <>
      {guest && (
        <WeddingWebsite 
          website={websiteData}
          guest={guest}
          events={events}
          urlSlug={wedding.id}
          onEditProfile={() => setShowGuestModal(true)}
        />
      )}

      {!guest && (
        <div className="min-h-screen bg-[rgb(254.7,255,235)] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{wedding.bride_name} & {wedding.groom_name}</h1>
            <p className="text-gray-600 mb-6">Please provide your guest ID to access the wedding page.</p>
            <p className="text-sm text-gray-500">URL format: /wedding/{wedding.id}?guest=YOUR_GUEST_ID</p>
          </div>
        </div>
      )}

      {/* Guest Details Modal */}
      {guest && showGuestModal && (
        <GuestDetailsModal
          isOpen={showGuestModal}
          onClose={() => setShowGuestModal(false)}
          weddingId={wedding.id}
          guestId={guest.id}
        />
      )}
    </>
  );
}