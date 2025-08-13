"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import RestrictedAccess from "@/components/wedding/RestrictedAccess";
import PasswordProtection from "@/components/wedding/PasswordProtection";
import GuestEditModal from "@/components/wedding/GuestEditModal";
import WeddingWebsiteUnified from "@/components/wedding/WeddingWebsiteUnified";
import LoadingScreen from "@/components/wedding/LoadingScreen";
import { 
  getWeddingByUrl,
  validateGuestAccess,
  checkWebsiteAccess,
  verifyWebsitePassword,
  getGuestWithInvitations,
  updateGuestProfile,
  getWeddingEvents,
  updateWeddingViewCount
} from "@/lib/wedding-helpers-unified";
import type { Weddings, Guest, Event } from "@/lib/supabase";

interface WeddingPageContentProps {
  url: string;
  guestId?: string;
}

export default function WeddingPageContentUnified({ url, guestId }: WeddingPageContentProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [wedding, setWedding] = useState<Weddings | null>(null);
  const [guest, setGuest] = useState<Guest | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [accessStatus, setAccessStatus] = useState<any>(null);
  const [passwordVerified, setPasswordVerified] = useState(false);
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadWeddingData();
  }, [url, guestId]);

  const loadWeddingData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch wedding data from unified table
      const weddingData = await getWeddingByUrl(url);
      
      if (!weddingData) {
        setError("Wedding website not found");
        setLoading(false);
        return;
      }

      setWedding(weddingData);

      // Update view count
      updateWeddingViewCount(weddingData.id);

      // Check website access permissions
      const access = checkWebsiteAccess(weddingData, guestId, passwordVerified);
      setAccessStatus(access);

      // If guest ID is provided, validate guest access
      if (guestId && weddingData.id) {
        const guestData = await validateGuestAccess(weddingData.id, guestId);
        
        if (guestData) {
          setGuest(guestData);
          
          // Load guest's event invitations
          const guestWithInvitations = await getGuestWithInvitations(guestId);
          if (guestWithInvitations?.event_invitations) {
            const guestEvents = guestWithInvitations.event_invitations
              .map((inv: any) => inv.event)
              .filter(Boolean);
            setEvents(guestEvents);
          }
        } else {
          // Invalid guest ID
          setAccessStatus({
            hasAccess: false,
            reason: 'invalid_guest',
            message: 'Invalid guest access. Please use the link sent to you.'
          });
        }
      }

      // Load all events for the wedding (if public access)
      if (!guestId && weddingData.id && access.hasAccess) {
        const eventsData = await getWeddingEvents(weddingData.id);
        setEvents(eventsData);
      }

    } catch (err) {
      console.error('Error loading wedding data:', err);
      setError('Failed to load wedding page');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = (password: string) => {
    if (!wedding) return;
    
    const isValid = verifyWebsitePassword(wedding, password);
    
    if (isValid) {
      setPasswordVerified(true);
      setAccessStatus({
        hasAccess: true,
        reason: 'password_verified',
        message: 'Password verified successfully'
      });
      
      // Reload events with access
      if (wedding.id) {
        getWeddingEvents(wedding.id).then(eventsData => {
          setEvents(eventsData);
        });
      }
    }
  };

  const handleProfileSave = async (profileData: any) => {
    if (!guest) return;
    
    const result = await updateGuestProfile(guest.id, profileData);
    
    if (result.success && result.data) {
      setGuest(result.data as Guest);
      setShowProfileEdit(false);
    }
  };

  // Loading state
  if (loading) {
    return <LoadingScreen />;
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{error}</h1>
          <p className="text-gray-600">Please check the URL and try again.</p>
        </div>
      </div>
    );
  }

  // No wedding found
  if (!wedding) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Wedding Not Found</h1>
          <p className="text-gray-600">The wedding page you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  // Access denied states
  if (!accessStatus?.hasAccess) {
    // Password protection
    if (accessStatus?.requiresPassword) {
      return (
        <PasswordProtection
          coupleName={`${wedding.bride_name} & ${wedding.groom_name}`}
          coupleImage={wedding.couple_picture || undefined}
          weddingDate={wedding.wedding_date || undefined}
          onPasswordSubmit={handlePasswordSubmit}
        />
      );
    }

    // Other restricted access
    return (
      <RestrictedAccess
        coupleName={`${wedding.bride_name} & ${wedding.groom_name}`}
        coupleImage={wedding.couple_picture || undefined}
        weddingDate={wedding.wedding_date || undefined}
      />
    );
  }

  // Main wedding website view
  return (
    <>
      <WeddingWebsiteUnified
        wedding={wedding}
        guest={guest}
        events={events}
        onEditProfile={() => setShowProfileEdit(true)}
        urlSlug={url}
      />

      {/* Guest Profile Edit Modal */}
      {guest && (
        <GuestEditModal
          isOpen={showProfileEdit}
          onClose={() => setShowProfileEdit(false)}
          guestData={{
            name: guest.name,
            phone: guest.whatsapp || '',
            address: guest.address || '',
            profile_image: guest.profile_image || ''
          }}
          onSave={handleProfileSave}
        />
      )}
    </>
  );
}