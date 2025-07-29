"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Sparkles, Calendar, Users, Heart, MapPin, Camera, Clock, Check, X, HelpCircle, UserCheck, QrCode, Shield, Zap, ChevronRight, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const events = ["Wedding", "Reception", "Engagement"];

const guestList = [
  { id: 1, name: "Priya Sharma", initials: "PS", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya&backgroundColor=ffd5dc", type: "Bride's Friend", status: "confirmed", events: ["Wedding", "Reception"] },
  { id: 2, name: "Raj Kumar", initials: "RK", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=raj&backgroundColor=b6e3f4", type: "Groom's Relative", status: "confirmed", events: ["Wedding", "Reception", "Engagement"] },
  { id: 3, name: "Anita Patel", initials: "AP", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=anita&backgroundColor=ffdfbf", type: "Family Friend", status: "maybe", events: ["Wedding"] },
  { id: 4, name: "Vikram Singh", initials: "VS", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=vikram&backgroundColor=c0aede", type: "College Friend", status: "confirmed", events: ["Reception"] },
  { id: 5, name: "Neha Gupta", initials: "NG", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=neha&backgroundColor=ffd5dc", type: "Bride's Cousin", status: "confirmed", events: ["Wedding", "Reception", "Engagement"] },
  { id: 6, name: "Amit Verma", initials: "AV", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=amit&backgroundColor=d1d4f9", type: "Work Colleague", status: "declined", events: ["Reception"] },
  { id: 7, name: "Sanjana Roy", initials: "SR", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sanjana&backgroundColor=ffd5dc", type: "Bride's Friend", status: "confirmed", events: ["Wedding", "Reception"] },
  { id: 8, name: "Karan Malhotra", initials: "KM", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=karan&backgroundColor=b6e3f4", type: "Groom's Brother", status: "confirmed", events: ["Wedding", "Reception", "Engagement"] },
  { id: 9, name: "Deepika Jain", initials: "DJ", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=deepika&backgroundColor=ffdfbf", type: "Dance Team", status: "maybe", events: ["Reception"] },
  { id: 10, name: "Rohit Kapoor", initials: "RK", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rohit&backgroundColor=c0aede", type: "Family", status: "confirmed", events: ["Wedding", "Reception", "Engagement"] },
  { id: 11, name: "Megha Shah", initials: "MS", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=megha&backgroundColor=ffd5dc", type: "Bride's Sister", status: "confirmed", events: ["Wedding", "Reception", "Engagement"] },
  { id: 12, name: "Arjun Nair", initials: "AN", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=arjun&backgroundColor=d1d4f9", type: "Entertainment", status: "declined", events: ["Reception"] }
];

export default function NewHeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const guestFlowRef = useRef<HTMLDivElement>(null);
  const [currentVerifyingGuest, setCurrentVerifyingGuest] = useState<number | null>(null);
  const [verifiedGuests, setVerifiedGuests] = useState<number[]>([]);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [verificationText, setVerificationText] = useState("Verifying...");
  
  const verificationTexts = [
    "Verifying...",
    "Sending Reminder...",
    "Sharing Pictures...",
    "Confirming RSVP...",
    "Updating Guest List...",
    "Syncing Details..."
  ];

  useEffect(() => {
    if (!animationStarted) {
      setAnimationStarted(true);
      startGuestFlow();
      startCardVerification();
      startTextRotation();
    }
  }, [animationStarted]);

  const startGuestFlow = () => {
    const container = guestFlowRef.current;
    if (!container) return;

    // Clone the guest list for infinite scroll
    const originalGuests = container.innerHTML;
    container.innerHTML = originalGuests + originalGuests; // Double the content

    const guestElements = container.querySelectorAll('.guest-item');
    const totalWidth = guestElements.length * 150; // Each guest takes 150px space

    // Set initial positions with staggered entrance
    guestElements.forEach((guest, index) => {
      gsap.set(guest, {
        x: -totalWidth / 2 + (index * 150),
        opacity: 0,
        scale: 0.8,
      });
      
      // Staggered entrance animation
      gsap.to(guest, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        delay: index * 0.1,
        ease: "back.out(1.7)"
      });
    });

    // Animate the entire container (right to left)
    gsap.to(guestElements, {
      x: "+=" + totalWidth / 2,
      duration: 40,
      ease: "none",
      repeat: -1,
      stagger: 0,
      onUpdate: function() {
        // Check each guest's position relative to the card
        guestElements.forEach((guest) => {
          const rect = guest.getBoundingClientRect();
          const cardRect = cardRef.current?.getBoundingClientRect();
          
          if (cardRect) {
            const guestCenter = rect.left + rect.width / 2;
            const cardCenter = cardRect.left + cardRect.width / 2;
            const distance = Math.abs(guestCenter - cardCenter);
            
            const element = guest as HTMLElement;
            
            if (distance < 100) {
              element.classList.add('verifying');
              // Add pulse effect when verifying
              gsap.to(element.querySelector('.guest-avatar'), {
                scale: 1.15,
                duration: 0.3,
                ease: "power2.out"
              });
            } else if (guestCenter > cardCenter) {
              element.classList.remove('verifying');
              element.classList.add('verified');
              // Return to normal scale
              gsap.to(element.querySelector('.guest-avatar'), {
                scale: 1,
                duration: 0.3,
                ease: "power2.in"
              });
            } else {
              element.classList.remove('verifying', 'verified');
            }
          }
        });
      }
    });
  };

  const startCardVerification = () => {
    // Cycle through all guests for card verification animation
    let guestIndex = 0;
    
    const verifyGuest = () => {
      if (guestIndex < guestList.length) {
        const currentGuest = guestList[guestIndex];
        setCurrentVerifyingGuest(currentGuest.id);
        
        // Animate card
        gsap.timeline()
          .to(cardRef.current, {
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out"
          })
          .to(cardRef.current, {
            scale: 1,
            duration: 0.3,
            ease: "power2.in"
          })
          .call(() => {
            setVerifiedGuests(prev => [...prev, currentGuest.id]);
            setCurrentVerifyingGuest(null);
            guestIndex++;
            setTimeout(verifyGuest, 1500);
          });
      } else {
        // Reset and start over
        guestIndex = 0;
        setTimeout(() => {
          setVerifiedGuests([]);
          verifyGuest();
        }, 3000);
      }
    };
    
    setTimeout(verifyGuest, 2000);
  };

  const startTextRotation = () => {
    let textIndex = 0;
    
    const rotateText = () => {
      setVerificationText(verificationTexts[textIndex]);
      textIndex = (textIndex + 1) % verificationTexts.length;
    };
    
    // Initial rotation
    rotateText();
    
    // Continue rotating every 2 seconds
    setInterval(rotateText, 2000);
  };

  return (
    <section ref={sectionRef} className="relative bg-[rgb(254.7,255,235)] overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgb(254.7,255,235)] to-[rgb(252,250,230)]" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-100 rounded-full filter blur-3xl opacity-20" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-100 rounded-full filter blur-3xl opacity-20" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-12 lg:py-16 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>India's First Smart Wedding Cards</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-6">
            <span className="font-normal">Your Wedding,</span>
            <br />
            <span className="text-gray-600">Digitally Perfect</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Smart cards that manage RSVPs, share live updates, and create unforgettable digital experiences for your guests
          </p>
        </div>

        {/* Guest Flow Animation - Full Width */}
        <div className="relative h-[400px] flex items-center mb-16">
          <div className="absolute inset-0 -mx-[100vw] left-[50%] right-[50%] w-[200vw]">
          {/* Central Smart Card - Vertical */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div ref={cardRef} className="relative">
              {/* Card Shadow */}
              <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-pink-400 blur-2xl opacity-20" />
              
              {/* Portrait Identity Card Style */}
              <div className="relative rounded-2xl shadow-2xl overflow-hidden w-[220px] h-[320px] sm:w-[280px] sm:h-[400px]">
                {/* Dark Card Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src="/card_background.jpg"
                    alt="Card Background"
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 sm:p-8">
                  {/* Couple Image */}
                  <div className="mb-4 sm:mb-6 mt-8">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-3 border-yellow-500 shadow-2xl ring-4 ring-yellow-500/20">
                      <Image
                        src="/couple_image.jpg"
                        alt="Couple"
                        width={128}
                        height={128}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  
                  {/* Lottie Animation */}
                  <div className="flex flex-col items-center justify-center mb-6 sm:mb-8">
                    <DotLottieReact
                      src="https://lottie.host/72cdc41d-a470-4c13-ae83-c9e8bfc2f262/HN98NoUCYf.lottie"
                      loop
                      autoplay
                      className="w-16 h-16 sm:w-20 sm:h-20 mb-3 sm:mb-4"
                    />
                    <p className="text-xs sm:text-sm text-gray-400 font-light tracking-wider animate-pulse">{verificationText}</p>
                  </div>
                  
                  {/* Couple Details */}
                  <div className="text-center mt-auto mb-8">
                    <h3 className="text-yellow-400 font-bold text-2xl sm:text-3xl mb-2 tracking-wide">Priya & Arjun</h3>
                    <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-2" />
                    <p className="text-yellow-500/80 text-xs sm:text-sm tracking-widest uppercase">December 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

            {/* Guest Flow */}
            <div ref={guestFlowRef} className="absolute inset-0 flex items-center overflow-hidden">
            {guestList.map((guest, index) => (
              <div
                key={guest.id}
                className="guest-item absolute flex flex-col items-center"
              >
                <div className="guest-avatar-container relative">
                  {/* Guest Avatar */}
                  <div className="w-16 h-16 rounded-full bg-white shadow-lg overflow-hidden border-2 border-gray-200 guest-avatar cursor-pointer">
                    <img 
                      src={guest.avatar} 
                      alt={guest.name}
                      className="w-full h-full object-cover transition-all duration-300"
                    />
                  </div>
                  
                  {/* Guest Info - Only shown when verified */}
                  <div className="guest-info">
                    {/* Status Indicator */}
                    <div className="status-indicator absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center opacity-0">
                      {guest.status === 'confirmed' && <Check className="w-3 h-3 text-green-500" />}
                      {guest.status === 'maybe' && <HelpCircle className="w-3 h-3 text-yellow-500" />}
                      {guest.status === 'declined' && <X className="w-3 h-3 text-red-500" />}
                    </div>
                    
                    {/* Name and Events below avatar */}
                    <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 text-center">
                      <p className="text-xs font-semibold text-gray-900 whitespace-nowrap">{guest.name}</p>
                      {guest.events.length > 0 && (
                        <div className="flex flex-wrap gap-0.5 justify-center mt-1 max-w-[120px]">
                          {guest.events.map((event, idx) => (
                            <span 
                              key={idx} 
                              className={`text-[10px] px-1.5 py-0.5 rounded-full transition-all duration-300 ${
                                event === 'Wedding' ? 'bg-rose-100 text-rose-700' :
                                event === 'Reception' ? 'bg-purple-100 text-purple-700' :
                                'bg-amber-100 text-amber-700'
                              }`}
                            >
                              {event}
                            </span>
                          ))
                        }
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>

        {/* Phone CTA Section - Custom Combined Input */}
        <div className="max-w-md mx-auto">
          <div className="space-y-3">
            {/* Combined Country & Phone Input */}
            <div className="relative bg-white rounded-full shadow-lg border border-gray-200 overflow-hidden">
              <div className="flex items-center h-14">
                {/* Country Selector */}
                <button
                  onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                  className="flex items-center gap-2 px-4 h-full hover:bg-gray-50 transition-colors border-r border-gray-200"
                >
                  <span className="text-lg">
                    {countryCode === '+91' && '🇮🇳'}
                    {countryCode === '+1' && '🇺🇸'}
                    {countryCode === '+44' && '🇬🇧'}
                    {countryCode === '+971' && '🇦🇪'}
                  </span>
                  <span className="text-gray-900 font-medium">{countryCode}</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
                
                {/* Phone Input */}
                <input
                  type="tel"
                  placeholder="Enter mobile number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="flex-1 px-4 h-full outline-none text-gray-900 placeholder:text-gray-400"
                />
              </div>
              
              {/* Country Dropdown */}
              {showCountryDropdown && (
                <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50">
                  <button
                    onClick={() => { setCountryCode('+91'); setShowCountryDropdown(false); }}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors w-full text-left"
                  >
                    <span className="text-xl">🇮🇳</span>
                    <span className="text-gray-900">India (+91)</span>
                  </button>
                  <button
                    onClick={() => { setCountryCode('+1'); setShowCountryDropdown(false); }}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors w-full text-left"
                  >
                    <span className="text-xl">🇺🇸</span>
                    <span className="text-gray-900">USA (+1)</span>
                  </button>
                  <button
                    onClick={() => { setCountryCode('+44'); setShowCountryDropdown(false); }}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors w-full text-left"
                  >
                    <span className="text-xl">🇬🇧</span>
                    <span className="text-gray-900">UK (+44)</span>
                  </button>
                  <button
                    onClick={() => { setCountryCode('+971'); setShowCountryDropdown(false); }}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors w-full text-left"
                  >
                    <span className="text-xl">🇦🇪</span>
                    <span className="text-gray-900">UAE (+971)</span>
                  </button>
                </div>
              )}
            </div>
            
            {/* Submit Button */}
            <button 
              disabled={!phoneNumber || phoneNumber.length < 10}
              className="w-full bg-rose-500 text-white py-4 rounded-full font-medium text-base hover:bg-rose-600 transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Let's Get Started
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>

      <style jsx>{`
        .guest-item {
          transition: all 0.3s ease;
        }
        
        .guest-item:hover .guest-avatar {
          transform: scale(1.1);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }
        
        .guest-info {
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .guest-item:not(.verified) .guest-info {
          display: none;
        }
        
        .guest-item.verifying .guest-avatar {
          transform: scale(1.1);
          border-color: #f43f5e;
          box-shadow: 0 0 20px rgba(244, 63, 94, 0.4);
        }
        
        .guest-item.verifying .guest-info {
          opacity: 1;
        }
        
        .guest-item.verified .guest-avatar {
          filter: none;
          border-color: #10b981;
        }
        
        .guest-item.verified .guest-avatar img {
          filter: none;
        }
        
        .guest-item:not(.verified) .guest-avatar img {
          filter: grayscale(100%);
          opacity: 0.8;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .guest-item,
          .guest-avatar {
            transition: none !important;
            animation: none !important;
          }
        }
        
        .guest-item.verified .status-indicator {
          opacity: 1;
        }
        
        .guest-item.verified .guest-info {
          opacity: 1;
        }
      `}</style>
    </section>
  );
}