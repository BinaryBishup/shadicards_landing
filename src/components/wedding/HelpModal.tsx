"use client";

import { useState } from "react";
import { X, HelpCircle, CreditCard, Calendar, Camera, Gift, MapPin, Users, ChevronRight, QrCode, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HelpCard {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: string;
  steps?: string[];
}

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  rsvpContact?: string | null;
}

const helpCards: HelpCard[] = [
  {
    id: "smartcard",
    title: "How to use your SmartCard",
    icon: <CreditCard className="w-5 h-5" />,
    content: "Your SmartCard provides seamless access to all wedding events with two convenient methods:",
    steps: [
      "QR Code: Display your unique QR code on your phone for quick scanning at event check-ins",
      "NFC Technology: If your phone supports NFC, simply tap it on the NFC reader at the venue",
      "Keep your SmartCard accessible on your phone for instant check-in at all events"
    ]
  },
  {
    id: "rsvp",
    title: "What are my RSVP statuses?",
    icon: <Calendar className="w-5 h-5" />,
    content: "Understanding your RSVP status helps the couple plan better:",
    steps: [
      "Attending: You've confirmed your attendance for this event",
      "Not Attending: You've indicated you cannot make it to this event",
      "Maybe: You're unsure and will confirm later",
      "Pending: You haven't responded yet - please update your status soon"
    ]
  },
  {
    id: "pictures",
    title: "How to access event pictures",
    icon: <Camera className="w-5 h-5" />,
    content: "Access and share beautiful memories from the wedding events:",
    steps: [
      "Navigate to the Gallery section on the wedding website",
      "Browse photos organized by event",
      "Download high-resolution images directly to your device",
      "Share your favorite moments with family and friends"
    ]
  },
  {
    id: "nfc",
    title: "Check if your phone has NFC",
    icon: <Smartphone className="w-5 h-5" />,
    content: "NFC enables contactless check-in at events. Here's how to check:",
    steps: [
      "iPhone: All models from iPhone 7 onwards have NFC",
      "Android: Go to Settings > Connected devices > Connection preferences",
      "Look for 'NFC' option - if present, your phone supports it",
      "Enable NFC for quick tap-to-check-in at venues"
    ]
  },
  {
    id: "venue",
    title: "Getting to the venues",
    icon: <MapPin className="w-5 h-5" />,
    content: "Find your way to all wedding venues easily:",
    steps: [
      "Click on any event to view its venue details",
      "Tap 'Get Directions' to open navigation in your maps app",
      "Save venue addresses in advance for offline access",
      "Check parking information in the venue details section"
    ]
  },
  {
    id: "gifts",
    title: "Gift registry information",
    icon: <Gift className="w-5 h-5" />,
    content: "Find the perfect gift for the happy couple:",
    steps: [
      "Visit the Registry section on the wedding website",
      "Browse curated gift options and wishlists",
      "Select items based on your preference and budget",
      "Follow the links to purchase directly from retailers"
    ]
  },
  {
    id: "guests",
    title: "Guest list and seating",
    icon: <Users className="w-5 h-5" />,
    content: "Information about fellow guests and seating arrangements:",
    steps: [
      "Check your assigned table number in the event details",
      "View seating arrangements for dinner events",
      "Find contact information for other guests (if shared)",
      "Connect with family and friends attending the same events"
    ]
  },
  {
    id: "qrcode",
    title: "Using your QR code",
    icon: <QrCode className="w-5 h-5" />,
    content: "Your QR code is your digital pass to all events:",
    steps: [
      "Access your QR code from the main wedding page",
      "Screenshot it for offline access",
      "Present it at event check-in counters",
      "Each QR code is unique and linked to your RSVP status"
    ]
  }
];

export default function HelpModal({ isOpen, onClose, rsvpContact }: HelpModalProps) {
  const [selectedCard, setSelectedCard] = useState<HelpCard | null>(null);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-x-4 top-[50%] translate-y-[-50%] z-50 max-w-2xl mx-auto animate-in zoom-in-95 duration-200">
        <div className="bg-white rounded-2xl shadow-2xl max-h-[80vh] overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Help & Support</h2>
                  <p className="text-sm text-white/80">Quick answers to common questions</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(80vh-80px)]">
            {/* RSVP Contact Info */}
            {rsvpContact && (
              <div className="mx-6 mt-4 p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-lg border border-rose-200">
                <p className="text-sm font-medium text-gray-700">
                  <span className="text-rose-600">Need immediate assistance?</span>
                  <br />
                  Contact us at: <a href={`tel:${rsvpContact}`} className="font-semibold text-rose-700 hover:text-rose-800">{rsvpContact}</a>
                </p>
              </div>
            )}
            
            {!selectedCard ? (
              /* Card Grid */
              <div className="p-6 grid gap-4 sm:grid-cols-2">
                {helpCards.map((card) => (
                  <button
                    key={card.id}
                    onClick={() => setSelectedCard(card)}
                    className="text-left p-4 bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl border border-rose-200 hover:border-rose-300 hover:shadow-lg transition-all group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center text-rose-600 group-hover:scale-110 transition-transform">
                          {card.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{card.title}</h3>
                          <p className="text-sm text-gray-600 line-clamp-2">{card.content}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-rose-600 transition-colors mt-2" />
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              /* Selected Card Detail */
              <div className="p-6">
                <button
                  onClick={() => setSelectedCard(null)}
                  className="mb-4 text-sm text-rose-600 hover:text-rose-700 font-medium"
                >
                  ← Back to all topics
                </button>
                
                <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-6 border border-rose-200">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center text-rose-600">
                      {selectedCard.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{selectedCard.title}</h3>
                      <p className="text-gray-700">{selectedCard.content}</p>
                    </div>
                  </div>
                  
                  {selectedCard.steps && (
                    <div className="mt-6 space-y-3">
                      <h4 className="font-semibold text-gray-900 mb-3">Steps:</h4>
                      {selectedCard.steps.map((step, index) => (
                        <div key={index} className="flex gap-3">
                          <div className="w-7 h-7 bg-rose-600 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                            {index + 1}
                          </div>
                          <p className="text-gray-700 text-sm pt-1">{step}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}