"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import WeddingWebsite from "@/components/wedding/WeddingWebsite";
import LoadingScreen from "@/components/wedding/LoadingScreen";
import { supabase } from "@/lib/supabase";
import type { Weddings, Guest, Event } from "@/lib/supabase";

// Fixed preview wedding and guest IDs
const PREVIEW_WEDDING_ID = "6688e8a6-a583-4813-a0e2-2dc99e3253b0";
const PREVIEW_GUEST_ID = "70722662-c94b-4bd4-ab35-29bc0b59f3d4";

export default function PreviewContent() {
  const searchParams = useSearchParams();
  const templateParam = searchParams?.get("template") || "template001";

  const [loading, setLoading] = useState(true);
  const [wedding, setWedding] = useState<Weddings | null>(null);
  const [guest, setGuest] = useState<Guest | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPreviewData();
  }, [templateParam]);

  const loadPreviewData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load wedding data
      const { data: weddingData, error: weddingError } = await supabase
        .from("weddings")
        .select("*")
        .eq("id", PREVIEW_WEDDING_ID)
        .single();

      if (weddingError || !weddingData) {
        throw new Error("Preview wedding not found");
      }

      // Load wedding website settings
      const { data: websiteSettings, error: websiteError } = await supabase
        .from("wedding_website")
        .select("*")
        .eq("wedding_id", PREVIEW_WEDDING_ID)
        .single();

      // Merge website settings and override template_id
      if (websiteSettings) {
        Object.assign(weddingData, websiteSettings);
      }

      // Override template with the one from query parameter
      weddingData.template_id = templateParam;

      setWedding(weddingData);

      // Load guest data
      const { data: guestData, error: guestError } = await supabase
        .from("guests")
        .select("*")
        .eq("id", PREVIEW_GUEST_ID)
        .eq("wedding_id", PREVIEW_WEDDING_ID)
        .single();

      if (guestError || !guestData) {
        console.warn("Preview guest not found:", guestError);
      } else {
        setGuest(guestData);
      }

      // Load events
      const { data: eventsData, error: eventsError } = await supabase
        .from("events")
        .select("*")
        .eq("wedding_id", PREVIEW_WEDDING_ID)
        .order("event_date", { ascending: true });

      if (eventsError) {
        console.warn("Error loading events:", eventsError);
      } else {
        setEvents(eventsData || []);
      }

    } catch (err) {
      console.error("Error loading preview data:", err);
      setError(err instanceof Error ? err.message : "Failed to load preview data");
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return <LoadingScreen guestName={guest?.first_name || guest?.last_name} />;
  }

  // Error state
  if (error || !wedding) {
    return (
      <div className="min-h-screen bg-[rgb(254.7,255,235)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Preview Not Available</h1>
          <p className="text-gray-600">{error || "Unable to load preview."}</p>
        </div>
      </div>
    );
  }

  // Create a compatible website object
  const websiteData = {
    id: wedding.id,
    wedding_id: wedding.id,
    url_slug: wedding.id,
    status: wedding.status,
    is_password_protected: false, // Always false for preview
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
    show_events: wedding.show_events,
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
      {guest ? (
        <WeddingWebsite
          website={websiteData}
          guest={guest}
          events={events}
          urlSlug={PREVIEW_WEDDING_ID}
          onEditProfile={() => {
            // Locked in preview mode - show alert
            alert("Edit Profile is locked in preview mode. This is a demo template.");
          }}
          isPreviewMode={true}
        />
      ) : (
        <div className="min-h-screen bg-[rgb(254.7,255,235)] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Preview Not Available</h1>
            <p className="text-gray-600">Unable to load preview guest data.</p>
          </div>
        </div>
      )}
    </>
  );
}
