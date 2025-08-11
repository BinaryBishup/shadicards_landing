"use client";

import { useState } from 'react';
import { Calendar, MapPin, Clock, Users, Check, X } from 'lucide-react';

interface EventCardProps {
  event: {
    id: string;
    name: string;
    date: string;
    time: string;
    venue: string;
    address?: string;
    rsvpStatus?: string;
  };
  guestId: string;
  onRSVPUpdate?: (status: string) => void;
}

export function EventCard({ event, guestId, onRSVPUpdate }: EventCardProps) {
  const [updating, setUpdating] = useState(false);

  const handleRSVP = async (status: 'yes' | 'no' | 'maybe') => {
    setUpdating(true);
    try {
      const response = await fetch('/api/chatbot/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guestId,
          eventId: event.id,
          status,
        }),
      });

      const data = await response.json();
      if (data.success && onRSVPUpdate) {
        onRSVPUpdate(data.message);
      }
    } catch (error) {
      console.error('RSVP error:', error);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-lg p-4 border border-rose-200 space-y-3">
      <div className="flex items-start justify-between">
        <h3 className="font-semibold text-gray-800">{event.name}</h3>
        {event.rsvpStatus && (
          <span className={`text-xs px-2 py-1 rounded-full ${
            event.rsvpStatus === 'yes' ? 'bg-green-100 text-green-700' :
            event.rsvpStatus === 'no' ? 'bg-red-100 text-red-700' :
            'bg-yellow-100 text-yellow-700'
          }`}>
            RSVP: {event.rsvpStatus}
          </span>
        )}
      </div>
      
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>{new Date(event.date).toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>{event.time}</span>
        </div>
        
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 mt-0.5" />
          <div>
            <p className="font-medium">{event.venue}</p>
            {event.address && <p className="text-xs text-gray-500">{event.address}</p>}
          </div>
        </div>
      </div>

      {!event.rsvpStatus || event.rsvpStatus === 'pending' ? (
        <div className="flex gap-2 pt-2">
          <button
            onClick={() => handleRSVP('yes')}
            disabled={updating}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-1"
          >
            <Check className="w-4 h-4" />
            Yes
          </button>
          <button
            onClick={() => handleRSVP('maybe')}
            disabled={updating}
            className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
          >
            Maybe
          </button>
          <button
            onClick={() => handleRSVP('no')}
            disabled={updating}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-1"
          >
            <X className="w-4 h-4" />
            No
          </button>
        </div>
      ) : (
        <button
          onClick={() => handleRSVP(event.rsvpStatus === 'yes' ? 'no' : 'yes')}
          disabled={updating}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
        >
          Change RSVP
        </button>
      )}
    </div>
  );
}

interface VenueMapProps {
  venue: {
    name: string;
    address: string;
    coordinates?: { lat: number; lng: number };
  };
}

export function VenueMap({ venue }: VenueMapProps) {
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.address)}`;

  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-rose-500" />
          {venue.name}
        </h3>
        <p className="text-sm text-gray-600">{venue.address}</p>
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
        >
          <MapPin className="w-4 h-4" />
          Get Directions
        </a>
      </div>
      {venue.coordinates && (
        <div className="h-48 bg-gray-100 relative">
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${venue.coordinates.lat},${venue.coordinates.lng}`}
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
}

interface RSVPFormProps {
  events: Array<{
    id: string;
    name: string;
    date: string;
  }>;
  guestId: string;
  onComplete?: (message: string) => void;
}

export function RSVPForm({ events, guestId, onComplete }: RSVPFormProps) {
  const [selectedEvents, setSelectedEvents] = useState<Record<string, 'yes' | 'no' | 'maybe'>>({});
  const [plusOnes, setPlusOnes] = useState<Record<string, number>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const promises = Object.entries(selectedEvents).map(([eventId, status]) =>
        fetch('/api/chatbot/rsvp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            guestId,
            eventId,
            status,
            plusOnes: plusOnes[eventId] || 0,
          }),
        })
      );

      await Promise.all(promises);
      
      if (onComplete) {
        onComplete('Thank you for updating your RSVP! We\'ve recorded your responses.');
      }
    } catch (error) {
      console.error('RSVP submission error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200 space-y-4">
      <h3 className="font-semibold text-gray-800">Update Your RSVP</h3>
      
      {events.map(event => (
        <div key={event.id} className="space-y-2 p-3 bg-gray-50 rounded-lg">
          <p className="font-medium text-sm">{event.name}</p>
          <p className="text-xs text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
          
          <div className="flex gap-2">
            {(['yes', 'no', 'maybe'] as const).map(status => (
              <button
                key={status}
                onClick={() => setSelectedEvents(prev => ({ ...prev, [event.id]: status }))}
                className={`flex-1 py-1 px-2 rounded text-xs font-medium transition-colors ${
                  selectedEvents[event.id] === status
                    ? status === 'yes' ? 'bg-green-500 text-white' :
                      status === 'no' ? 'bg-red-500 text-white' :
                      'bg-yellow-500 text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
          
          {selectedEvents[event.id] === 'yes' && (
            <div className="flex items-center gap-2 mt-2">
              <Users className="w-4 h-4 text-gray-500" />
              <input
                type="number"
                min="0"
                max="5"
                placeholder="Additional guests"
                value={plusOnes[event.id] || ''}
                onChange={(e) => setPlusOnes(prev => ({ 
                  ...prev, 
                  [event.id]: parseInt(e.target.value) || 0 
                }))}
                className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
              />
            </div>
          )}
        </div>
      ))}
      
      <button
        onClick={handleSubmit}
        disabled={submitting || Object.keys(selectedEvents).length === 0}
        className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white py-2 px-4 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? 'Updating...' : 'Submit RSVP'}
      </button>
    </div>
  );
}