"use client";

import { useState, useEffect } from "react";
import WeddingWebsite from "@/components/wedding/WeddingWebsite";
import LoadingScreen from "@/components/wedding/LoadingScreen";
import PasswordProtection from "@/components/wedding/PasswordProtection";
import { supabase } from "@/lib/supabase";
import type { Weddings, Guest, Event } from "@/lib/supabase";

interface WeddingPageContentProps {
  weddingId: string;
  guestId?: string;
}

export default function WeddingPageContent({ weddingId, guestId }: WeddingPageContentProps) {
  const [loading, setLoading] = useState(true);
  const [wedding, setWedding] = useState<Weddings | null>(null);
  const [guest, setGuest] = useState<Guest | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

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

      // Load wedding website settings (visibility toggles, etc.)
      const { data: websiteSettings } = await supabase
        .from("wedding_website")
        .select("*")
        .eq("wedding_id", weddingId)
        .single();

      // Merge website settings into wedding data
      if (websiteSettings) {
        Object.assign(weddingData, websiteSettings);
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

  const handlePasswordSubmit = (password: string) => {
    if (!wedding) return;

    if (password === wedding.password) {
      setIsPasswordVerified(true);
      setPasswordError(null);
    } else {
      setPasswordError("Incorrect password. Please try again.");
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

  // Check if website is inactive or draft
  if (wedding.status === 'inactive' || wedding.status === 'draft') {
    const isHidden = wedding.status === 'inactive';
    return (
      <PasswordProtection
        coupleName={`${wedding.bride_first_name} & ${wedding.groom_first_name}`}
        coupleImage={wedding.couple_picture || '/couple_image.jpg'}
        weddingDate={wedding.wedding_date || ''}
        isHidden={isHidden}
        onPasswordSubmit={handlePasswordSubmit}
        passwordError={passwordError}
      />
    );
  }

  // Check if password protected
  if (wedding.is_password_protected && !isPasswordVerified) {
    return (
      <PasswordProtection
        coupleName={`${wedding.bride_first_name} & ${wedding.groom_first_name}`}
        coupleImage={wedding.couple_picture || '/couple_image.jpg'}
        weddingDate={wedding.wedding_date || ''}
        isHidden={false}
        onPasswordSubmit={handlePasswordSubmit}
        passwordError={passwordError}
      />
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
    show_families: wedding.show_families,
    show_wedding_party: wedding.show_wedding_party,
    show_chat: wedding.show_chat,
    story_items: wedding.story_items,
    gallery_images: wedding.gallery_images,
    bride_families: wedding.bride_families,
    groom_families: wedding.groom_families,
    bride_friends: wedding.bride_friends,
    groom_friends: wedding.groom_friends,
    meta_title: wedding.meta_title,
    meta_description: wedding.meta_description,
    og_image: wedding.og_image,
    view_count: wedding.view_count,
    last_viewed_at: wedding.last_viewed_at,
    wedding: {
      id: wedding.id,
      bride_first_name: wedding.bride_first_name,
      bride_last_name: wedding.bride_last_name,
      groom_first_name: wedding.groom_first_name,
      groom_last_name: wedding.groom_last_name,
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
          onEditProfile={() => window.location.href = `/wedding/${wedding.id}/edit?guest=${guest.id}`}
        />
      )}

      {!guest && (
        <div className="min-h-screen bg-[rgb(254.7,255,235)] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{wedding.bride_first_name} & {wedding.groom_first_name}</h1>
            <p className="text-gray-600 mb-6">Please provide your guest ID to access the wedding page.</p>
            <p className="text-sm text-gray-500">URL format: /wedding/{wedding.id}?guest=YOUR_GUEST_ID</p>
          </div>
        </div>
      )}

    </>
  );
}