"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import RestrictedAccess from "@/components/wedding/RestrictedAccess";
import PasswordProtection from "@/components/wedding/PasswordProtection";
import GuestEditModal from "@/components/wedding/GuestEditModal";
import WeddingWebsite from "@/components/wedding/WeddingWebsite";
import LoadingScreen from "@/components/wedding/LoadingScreen";
import { 
  getWeddingWebsiteByUrl, 
  validateGuestAccess, 
  checkWebsiteAccess,
  verifyWebsitePassword,
  getGuestWithInvitations,
  updateGuestProfile
} from "@/lib/wedding-helpers";
import { supabase } from "@/lib/supabase";
import type { Wedding, WeddingWebsite as WeddingWebsiteType, Guest, Event } from "@/lib/supabase";

interface WeddingPageContentProps {
  url: string;
  guestId?: string;
}

export default function WeddingPageContent({ url, guestId }: WeddingPageContentProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [website, setWebsite] = useState<(WeddingWebsiteType & { wedding: Wedding }) | null>(null);
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

      // Fetch wedding website configuration
      const websiteData = await getWeddingWebsiteByUrl(url);
      
      if (!websiteData) {
        setError("Wedding website not found");
        setLoading(false);
        return;
      }

      setWebsite(websiteData);

      // Check website access permissions
      const access = checkWebsiteAccess(websiteData, guestId, passwordVerified);
      setAccessStatus(access);

      // If guest ID is provided, validate guest access
      if (guestId && websiteData.wedding?.id) {
        const guestData = await validateGuestAccess(websiteData.wedding.id, guestId);
        
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
      if (!guestId && websiteData.wedding?.id && access.hasAccess) {
        const { data: eventsData } = await supabase
          .from('events')
          .select('*')
          .eq('wedding_id', websiteData.wedding.id)
          .order('event_date', { ascending: true });
        
        if (eventsData) {
          setEvents(eventsData);
        }
      }

    } catch (err) {
      console.error('Error loading wedding data:', err);
      setError('Failed to load wedding page');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (password: string) => {
    if (!website) return;
    
    const isValid = verifyWebsitePassword(website, password);
    
    if (isValid) {
      setPasswordVerified(true);
      setAccessStatus({
        hasAccess: true,
        reason: 'password_verified',
        message: 'Password verified successfully'
      });
      
      // Reload data with access
      if (website.wedding?.id) {
        const { data: eventsData } = await supabase
          .from('events')
          .select('*')
          .eq('wedding_id', website.wedding.id)
          .order('event_date', { ascending: true });
        
        if (eventsData) {
          setEvents(eventsData);
        }
      }
    } else {
      // Password incorrect - handled by the component
      return false;
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

  // Loading state with improved experience
  if (loading) {
    return <LoadingScreen guestName={guest?.first_name || guest?.name} />;
  }

  // Error state
  if (error || !website) {
    return (
      <div className="min-h-screen bg-[rgb(254.7,255,235)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Page Not Found</h1>
          <p className="text-gray-600">{error || "The wedding page you're looking for doesn't exist."}</p>
        </div>
      </div>
    );
  }

  // Profile edit modal is now rendered alongside the main content, not as a separate view

  // Check access and show appropriate component
  if (!accessStatus?.hasAccess && !passwordVerified) {
    // Handle different access denial reasons
    switch (accessStatus?.reason) {
      case 'restricted':
      case 'invalid_guest':
        return (
          <RestrictedAccess
            coupleName={`${website.wedding.bride_name} & ${website.wedding.groom_name}`}
            coupleImage={website.wedding.couple_picture || undefined}
            weddingDate={website.wedding.wedding_date || undefined}
          />
        );
      
      case 'password':
      case 'hidden':
        return (
          <PasswordProtection
            coupleName={`${website.wedding.bride_name} & ${website.wedding.groom_name}`}
            coupleImage={website.wedding.couple_picture || undefined}
            weddingDate={website.wedding.wedding_date || undefined}
            isHidden={accessStatus.reason === 'hidden'}
            onPasswordSubmit={handlePasswordSubmit}
          />
        );
      
      case 'inactive':
      case 'draft':
        return (
          <div className="min-h-screen bg-[rgb(254.7,255,235)] flex items-center justify-center">
            <div className="text-center p-8 max-w-md">
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">Website Unavailable</h1>
              <p className="text-gray-600">{accessStatus.message}</p>
            </div>
          </div>
        );
      
      default:
        return (
          <RestrictedAccess
            coupleName={`${website.wedding.bride_name} & ${website.wedding.groom_name}`}
            coupleImage={website.wedding.couple_picture || undefined}
            weddingDate={website.wedding.wedding_date || undefined}
          />
        );
    }
  }

  // Show wedding website for authenticated guest
  if (guest) {
    return (
      <>
        <WeddingWebsite 
          website={website}
          guest={guest}
          events={events}
          onEditProfile={() => setShowProfileEdit(true)}
          urlSlug={url}
        />
        
        {/* Guest Edit Modal */}
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
        
      </>
    );
  }

  // Show public wedding website (if no guest parameter and website is public)
  return (
    <div className="min-h-screen bg-[rgb(254.7,255,235)]">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="text-center">
          <h1 className="text-4xl font-light text-gray-900 mb-4">
            {website.wedding.bride_name} & {website.wedding.groom_name}
          </h1>
          <p className="text-gray-600 mb-8">
            Welcome to our wedding website
          </p>
          
          {/* Basic public information */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <p className="text-lg text-gray-700 mb-4">
              Join us in celebrating our special day
            </p>
            {website.wedding.wedding_date && (
              <p className="text-xl text-rose-600 font-medium">
                {new Date(website.wedding.wedding_date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            )}
            {website.wedding.venue_name && (
              <p className="text-gray-600 mt-2">
                {website.wedding.venue_name}
              </p>
            )}
          </div>
          
          <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-sm text-amber-800">
              For full access to wedding details, RSVP, and more, please use the personalized link sent to you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}