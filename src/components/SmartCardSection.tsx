"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Calendar as CalendarIcon, MapPin, Users, Clock, Instagram, Camera, Heart, 
  Sparkles, MessageCircle, Smartphone, Zap, Shield, QrCode,
  Music, Gift, BarChart3, Phone, Settings, Eye, ChevronDown,
  Link2, X, UserCheck, Timer, Wand2, Check, User, UserPlus, Crown
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

// Register GSAP plugins only on client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmartCardSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const [currentFeature, setCurrentFeature] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [viewMode, setViewMode] = useState<'preview' | 'settings'>('preview');
  const [selectedLinkType, setSelectedLinkType] = useState('location');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>(['all']);
  const [automationEnabled, setAutomationEnabled] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [currentGuest, setCurrentGuest] = useState(0);
  const animationCompleted = useRef(false);

  const guests = [
    {
      name: "Priya Sharma",
      type: "Bride's Friend",
      avatar: "👩",
      relation: "friend",
      events: [0, 1, 3] // Mehendi, Instagram, Photos
    },
    {
      name: "Raj Kumar", 
      type: "Groom's Relative",
      avatar: "👨",
      relation: "family",
      events: [2, 4, 5] // Venue, Sangeet, Registry
    }
  ];

  const features = [
    {
      icon: <CalendarIcon className="w-6 h-6" />,
      title: "Mehendi Ceremony",
      type: "event",
      content: {
        title: "Today's Event",
        time: "4:00 PM - 8:00 PM",
        venue: "Garden Area, Hotel Paradise",
        details: "Traditional Mehendi celebration",
        color: "from-green-500 to-emerald-500"
      },
      taps: 245
    },
    {
      icon: <Instagram className="w-6 h-6" />,
      title: "Wedding Instagram",
      type: "social",
      content: {
        handle: "@priyaandarju2024",
        hashtag: "#PriyaArjunForever",
        posts: "156 posts",
        followers: "2.4K followers",
        color: "from-rose-500 to-rose-700"
      },
      taps: 892
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Wedding Venue",
      type: "location",
      content: {
        venue: "The Grand Palace",
        address: "123 Wedding Street, Delhi",
        maps: "Get directions with one tap",
        distance: "12 km from airport",
        color: "from-blue-500 to-cyan-500"
      },
      taps: 567
    },
    {
      icon: <Camera className="w-6 h-6" />,
      title: "Event Photos",
      type: "photos",
      content: {
        albums: "6 Albums",
        photos: "2,450+ Photos",
        access: "Download all photos",
        sharing: "Share with family",
        color: "from-rose-500 to-rose-800"
      },
      taps: 1203
    },
    {
      icon: <Music className="w-6 h-6" />,
      title: "Sangeet Night",
      type: "event",
      content: {
        title: "Musical Evening",
        time: "7:00 PM onwards",
        venue: "Banquet Hall A",
        details: "Dance performances & DJ",
        color: "from-orange-500 to-red-500"
      },
      taps: 189
    },
    {
      icon: <Gift className="w-6 h-6" />,
      title: "Gift Registry",
      type: "registry",
      content: {
        store: "Wedding Registry",
        items: "View wishlist",
        message: "Your presence is our present",
        link: "See registry details",
        color: "from-yellow-500 to-amber-500"
      },
      taps: 98
    },
    {
      icon: <Link2 className="w-6 h-6" />,
      title: "Custom Link",
      type: "custom",
      content: {
        title: "Custom Content",
        url: "Add your custom URL",
        description: "Share any link you want",
        buttonText: "Open Link",
        color: "from-rose-700 to-rose-900"
      },
      taps: 45
    }
  ];

  const timeSlots = [
    "Morning (6AM - 12PM)",
    "Afternoon (12PM - 6PM)", 
    "Evening (6PM - 10PM)",
    "Night (10PM - 6AM)"
  ];

  const userGroups = [
    { id: 'all', name: 'All Guests', icon: <Users className="w-5 h-5" /> },
    { id: 'family', name: 'Family Only', icon: <Heart className="w-5 h-5" /> },
    { id: 'friends', name: 'Friends Only', icon: <UserPlus className="w-5 h-5" /> },
    { id: 'vip', name: 'VIP Guests', icon: <Crown className="w-5 h-5" /> },
    { id: 'custom', name: 'Custom Group', icon: <User className="w-5 h-5" /> },
    { id: 'bride', name: 'Bride Side', icon: <Heart className="w-5 h-5" /> }
  ];


  useEffect(() => {
    if (typeof window === "undefined") return;

    const section = sectionRef.current;
    if (!section) return;

    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Section entrance animation
        ScrollTrigger.create({
          trigger: section,
          start: "top 70%",
          onEnter: () => {
            if (!animationCompleted.current) {
              animationCompleted.current = true;
              
              // Animate header
              gsap.fromTo(".smart-header", 
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
              );

              // Animate phone
              gsap.fromTo(phoneRef.current, 
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: "power3.out" }
              );

              // Animate card
              gsap.fromTo(cardRef.current, 
                { x: 100, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.8, delay: 0.5, ease: "power3.out" }
              );

              // Start the tap sequence after entrance
              setTimeout(() => {
                startTapSequence();
              }, 1500);
            }
          },
          once: true
        });

      }, section);

      return () => {
        ctx.revert();
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const startTapSequence = () => {
    let tapCount = 0;
    let guestIndex = 0;
    
    const performTap = () => {
      const currentGuestData = guests[guestIndex];
      const eventIndex = tapCount % currentGuestData.events.length;
      const featureIndex = currentGuestData.events[eventIndex];
      
      if (!currentGuestData.events[eventIndex]) {
        // Switch to next guest
        guestIndex = (guestIndex + 1) % guests.length;
        tapCount = 0;
        setCurrentGuest(guestIndex);
        setTimeout(performTap, 1500);
        return;
      }

      // Animate card to phone
      const tl = gsap.timeline({
        onComplete: () => {
          tapCount++;
          // Continue with current guest or switch to next
          if (tapCount < currentGuestData.events.length) {
            setTimeout(performTap, 2500);
          } else {
            // Switch to next guest
            guestIndex = (guestIndex + 1) % guests.length;
            tapCount = 0;
            setCurrentGuest(guestIndex);
            setTimeout(performTap, 2000);
          }
        }
      });

      // Move card to phone
      tl.to(cardRef.current, {
        x: -80,
        y: -100,
        scale: 0.9,
        rotation: 15,
        duration: 0.6,
        ease: "power2.inOut"
      })
      .to(phoneRef.current, {
        scale: 1.02,
        duration: 0.2
      }, "-=0.2")
      .call(() => {
        setShowContent(true);
        setCurrentFeature(featureIndex);
        setCurrentGuest(guestIndex);
      })
      .to(phoneRef.current, {
        scale: 1,
        duration: 0.2
      })
      .to(cardRef.current, {
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 0.6,
        ease: "power2.inOut"
      });
    };

    // Start first tap
    performTap();
  };

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-32 bg-[rgb(254.7,255,235)] overflow-hidden">
      {/* Background pattern similar to hero - yellowish */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgb(254.7,255,235)] to-[rgb(252,250,230)]" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-100 rounded-full filter blur-3xl opacity-20" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-100 rounded-full filter blur-3xl opacity-20" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="smart-header text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Smart Control Cards</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6">
            <span className="font-normal">Take Control</span>
            <br />
            <span className="text-gray-600">Of Your Digital Experience</span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Control what content to show, choose who sees it, schedule when it appears, 
            and automate your personalized digital experience with smart wedding cards.
          </p>
        </div>

        {/* Main Demo */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Phone and Card Demo */}
            <div className="relative order-1 lg:order-1">
              <div className="relative mx-auto w-[320px]">
                {/* Phone */}
                <div 
                  ref={phoneRef}
                  className="relative bg-white rounded-[3rem] p-2 shadow-2xl"
                >
                  <div className="bg-gray-900 rounded-[2.8rem] p-3">
                    <div className="bg-black rounded-[2.5rem] overflow-hidden">
                      <div className="relative h-[600px]">
                        {/* Status bar */}
                        <div className="bg-black text-white px-6 py-3 flex justify-between items-center text-xs">
                          <span>9:41 AM</span>
                          <div className="flex gap-1">
                            <div className="w-4 h-3 bg-white rounded-sm"></div>
                            <div className="w-1 h-3 bg-white rounded-sm"></div>
                          </div>
                        </div>

                        {/* Phone content */}
                        <div className="p-6 bg-white h-full">
                          {!showContent ? (
                            // Home screen
                            <div className="flex flex-col items-center justify-center h-full">
                              <div className="grid grid-cols-4 gap-4 mb-auto mt-8">
                                {['Photos', 'Calendar', 'Maps', 'Instagram'].map((app, i) => (
                                  <div key={i} className="w-14 h-14 bg-gray-100 rounded-2xl" />
                                ))}
                              </div>
                              
                              <div className="mb-8">
                                <div className="relative">
                                  <div className="w-32 h-32 rounded-full border-2 border-gray-200 animate-pulse" />
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <Smartphone className="w-12 h-12 text-gray-400" />
                                  </div>
                                </div>
                                <p className="text-center text-gray-500 mt-4">Ready to scan</p>
                              </div>
                            </div>
                          ) : (
                            // Feature content
                            <div className="animate-fadeIn">
                              {/* Guest info banner */}
                              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-3 mb-4 -mx-2">
                                <div className="flex items-center gap-3">
                                  <span className="text-2xl">{guests[currentGuest].avatar}</span>
                                  <div className="flex-1">
                                    <p className="text-sm font-semibold text-gray-900">{guests[currentGuest].name}</p>
                                    <p className="text-xs text-gray-600">{guests[currentGuest].type} viewing</p>
                                  </div>
                                  <div className="px-2 py-1 bg-white rounded-full text-xs font-medium text-gray-700">
                                    {guests[currentGuest].relation === 'friend' ? 'Bride Side' : 'Groom Side'}
                                  </div>
                                </div>
                              </div>

                              <div className={`h-28 bg-gradient-to-br ${features[currentFeature].content.color} rounded-2xl mb-4 flex items-center justify-center text-white`}>
                                <div className="scale-125">
                                  {features[currentFeature].icon}
                                </div>
                              </div>

                              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                {features[currentFeature].title}
                              </h3>

                              {/* Dynamic content based on type */}
                              <div className="space-y-3">
                                {features[currentFeature].type === 'event' && (
                                  <>
                                    <div className="bg-gray-50 rounded-xl p-4">
                                      <p className="text-sm text-gray-500 mb-1">{features[currentFeature].content.title}</p>
                                      <p className="font-medium text-gray-900">{features[currentFeature].content.time}</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4">
                                      <p className="text-sm text-gray-500 mb-1">Venue</p>
                                      <p className="font-medium text-gray-900">{features[currentFeature].content.venue}</p>
                                    </div>
                                  </>
                                )}

                                {features[currentFeature].type === 'social' && (
                                  <>
                                    <div className="bg-gradient-to-r from-rose-50 to-rose-100 rounded-xl p-4">
                                      <p className="font-medium text-gray-900 text-lg">{features[currentFeature].content.handle}</p>
                                      <p className="text-sm text-gray-600">{features[currentFeature].content.posts}</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4">
                                      <p className="text-sm text-rose-600">{features[currentFeature].content.hashtag}</p>
                                      <p className="text-xs text-gray-500 mt-1">{features[currentFeature].content.followers}</p>
                                    </div>
                                  </>
                                )}

                                {features[currentFeature].type === 'location' && (
                                  <div className="bg-blue-50 rounded-xl p-4">
                                    <div className="flex items-start gap-3">
                                      <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                                      <div>
                                        <p className="font-medium text-gray-900">{features[currentFeature].content.venue}</p>
                                        <p className="text-sm text-gray-600">{features[currentFeature].content.address}</p>
                                        <p className="text-xs text-blue-600 mt-2">{features[currentFeature].content.maps}</p>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {features[currentFeature].type === 'photos' && (
                                  <>
                                    <div className="grid grid-cols-3 gap-2">
                                      {[...Array(6)].map((_, i) => (
                                        <div key={i} className="aspect-square bg-gray-200 rounded-lg" />
                                      ))}
                                    </div>
                                    <div className="bg-rose-50 rounded-xl p-3 text-center">
                                      <p className="text-sm text-gray-900">{features[currentFeature].content.photos}</p>
                                      <p className="text-xs text-gray-600">{features[currentFeature].content.albums}</p>
                                    </div>
                                  </>
                                )}

                                {features[currentFeature].type === 'registry' && (
                                  <div className="bg-yellow-50 rounded-xl p-4">
                                    <Gift className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
                                    <p className="text-center text-gray-900 font-medium">{features[currentFeature].content.message}</p>
                                    <p className="text-center text-sm text-yellow-600 mt-2">{features[currentFeature].content.link}</p>
                                  </div>
                                )}

                                {features[currentFeature].type === 'custom' && (
                                  <div className="bg-gradient-to-r from-rose-50 to-rose-100 rounded-xl p-4">
                                    <div className="flex items-center gap-3 mb-3">
                                      <Link2 className="w-5 h-5 text-rose-600" />
                                      <p className="font-medium text-gray-900">{features[currentFeature].content.title}</p>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2">{features[currentFeature].content.description}</p>
                                    <p className="text-xs text-rose-600">{features[currentFeature].content.url}</p>
                                  </div>
                                )}
                              </div>

                              {/* Action button */}
                              <button className="w-full bg-gray-900 text-white py-3 rounded-xl font-medium mt-4">
                                Open in App
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Smart Card */}
                <div
                  ref={cardRef}
                  className="absolute -bottom-8 -right-12"
                >
                  <div className="group">
                    <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-rose-600 blur-xl opacity-30" />
                    <div className="relative w-56 h-36 bg-gradient-to-br from-gray-900 to-black rounded-2xl p-5 shadow-2xl">
                      <div className="flex justify-between items-start h-full">
                        <div>
                          <p className="text-gray-400 text-xs font-medium tracking-wider">SMART WEDDING CARD</p>
                        {showContent && (
                          <div className="absolute -top-16 left-0 right-0">
                            <div className="bg-white rounded-lg shadow-xl px-4 py-3 border-2 border-rose-500 animate-bounce">
                              <div className="flex items-center gap-2">
                                <span className="text-xl">{guests[currentGuest].avatar}</span>
                                <div>
                                  <p className="text-sm font-bold text-gray-900">{guests[currentGuest].name}</p>
                                  <p className="text-xs text-gray-600">{guests[currentGuest].type}</p>
                                </div>
                              </div>
                            </div>
                            <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-0 h-0 border-l-[8px] border-l-transparent border-t-[8px] border-t-rose-500 border-r-[8px] border-r-transparent"></div>
                          </div>
                        )}
                          <p className="text-white font-bold text-lg mt-2">Priya & Arjun</p>
                          <p className="text-gray-500 text-sm">December 2024</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Heart className="w-6 h-6 text-rose-500" />
                          <QrCode className="w-8 h-8 text-gray-600" />
                        </div>
                      </div>
                      <div className="absolute bottom-3 left-5">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-6 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded" />
                          <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center">
                            <div className="w-4 h-4 rounded-full border border-gray-500" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features and Analytics */}
            <div className="space-y-8 order-2 lg:order-2">
              {/* View Toggle */}
              <div className="flex justify-center mb-6">
                <div className="bg-white rounded-full p-1 shadow-lg border border-gray-100 inline-flex">
                  <button
                    onClick={() => setViewMode('preview')}
                    className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                      viewMode === 'preview' 
                        ? 'bg-rose-500 text-white shadow-md' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Eye className="w-4 h-4" />
                    Preview
                  </button>
                  <button
                    onClick={() => setViewMode('settings')}
                    className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                      viewMode === 'settings' 
                        ? 'bg-gray-900 text-white shadow-md' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>
                </div>
              </div>

              {viewMode === 'preview' ? (
                <>
                  <div>
                    <h3 className="text-3xl font-light text-gray-900 mb-6">
                      Control Every 
                      <span className="text-rose-600 font-normal"> Experience</span>
                    </h3>
                    <p className="text-gray-600 mb-8">
                      Decide what content to display, target specific guests, schedule appearances, 
                      and automate your card's behavior for the perfect personalized experience.
                    </p>
                  </div>

                  {/* Control Dashboard */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="text-lg font-semibold text-gray-900">Guest-Based Content Control</h4>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-gray-600">Active</span>
                      </div>
                    </div>

                    {/* Guest Tabs */}
                    <div className="flex gap-2 mb-4 p-1 bg-gray-100 rounded-lg">
                      {guests.map((guest, idx) => (
                        <button
                          key={idx}
                          className={cn(
                            "flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all",
                            currentGuest === idx 
                              ? "bg-white shadow-sm text-gray-900" 
                              : "text-gray-600 hover:text-gray-900"
                          )}
                        >
                          <span className="mr-2">{guest.avatar}</span>
                          {guest.name.split(' ')[0]}
                        </button>
                      ))}
                    </div>

                    <div className="space-y-3">
                      <p className="text-xs text-gray-500 mb-2">Content visible to {guests[currentGuest].name}:</p>
                      {features.map((feature, index) => {
                        const isAccessible = guests[currentGuest].events.includes(index);
                        return (
                          <div 
                            key={index} 
                            className={`flex items-center justify-between p-3 rounded-lg transition-all duration-300 ${
                              currentFeature === index && showContent && isAccessible
                                ? 'bg-rose-50 border-2 border-rose-500' 
                                : isAccessible
                                  ? 'bg-gray-50 border-2 border-transparent'
                                  : 'bg-gray-100 border-2 border-transparent opacity-50'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                                currentFeature === index && showContent && isAccessible
                                  ? 'bg-rose-500 text-white'
                                  : isAccessible
                                    ? 'bg-white text-gray-600'
                                    : 'bg-gray-200 text-gray-400'
                              }`}>
                                {feature.icon}
                              </div>
                              <div>
                                <p className={`font-medium text-sm ${isAccessible ? 'text-gray-900' : 'text-gray-500'}`}>
                                  {feature.title}
                                </p>
                                <p className="text-xs text-gray-500">{feature.type}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {!isAccessible && (
                                <span className="text-xs bg-gray-200 px-2 py-1 rounded-full text-gray-600">Hidden</span>
                              )}
                              {isAccessible && (
                                <Check className="w-4 h-4 text-green-600" />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold text-gray-900">6</p>
                          <p className="text-xs text-gray-500">Active Links</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-rose-600">4</p>
                          <p className="text-xs text-gray-500">User Groups</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-gray-900">24/7</p>
                          <p className="text-xs text-gray-500">Automated</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                /* Settings View */
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Content Control Center</h3>
                    <p className="text-sm text-gray-600 mb-6">Control what content to show, who sees it, and when</p>

                    {/* Link Type Selection */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-3">Content Type</label>
                      <div className="relative">
                        <button 
                          onClick={() => setDropdownOpen(!dropdownOpen)}
                          className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
                        >
                          <span className="flex items-center gap-2">
                            {selectedLinkType === 'location' && <MapPin className="w-4 h-4 text-gray-600" />}
                            {selectedLinkType === 'event' && <CalendarIcon className="w-4 h-4 text-gray-600" />}
                            {selectedLinkType === 'social' && <Instagram className="w-4 h-4 text-gray-600" />}
                            {selectedLinkType === 'photos' && <Camera className="w-4 h-4 text-gray-600" />}
                            {selectedLinkType === 'message' && <MessageCircle className="w-4 h-4 text-gray-600" />}
                            {selectedLinkType === 'registry' && <Gift className="w-4 h-4 text-gray-600" />}
                            {selectedLinkType === 'custom' && <Link2 className="w-4 h-4 text-gray-600" />}
                            {features.find(f => f.type === selectedLinkType)?.title || 'Select content type'}
                          </span>
                          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {dropdownOpen && (
                          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                            {features.map((feature, idx) => (
                              <button
                                key={idx}
                                onClick={() => {
                                  setSelectedLinkType(feature.type);
                                  setDropdownOpen(false);
                                  if (viewMode === 'settings') {
                                    setCurrentFeature(idx);
                                    setShowContent(true);
                                  }
                                }}
                                className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 transition-colors"
                              >
                                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                                  {feature.icon}
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-900">{feature.title}</p>
                                  <p className="text-xs text-gray-500">{feature.type}</p>
                                </div>
                                {selectedLinkType === feature.type && (
                                  <Check className="w-4 h-4 text-rose-500" />
                                )}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* User Targeting */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        <UserCheck className="w-4 h-4 inline mr-2" />
                        Who Can See This
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {userGroups.map((group) => (
                          <button
                            key={group.id}
                            onClick={() => {
                              if (selectedUsers.includes(group.id)) {
                                setSelectedUsers(selectedUsers.filter(u => u !== group.id));
                              } else {
                                setSelectedUsers([...selectedUsers, group.id]);
                              }
                            }}
                            className={cn(
                              "flex flex-col items-center gap-2 p-4 rounded-lg transition-all",
                              selectedUsers.includes(group.id)
                                ? "bg-rose-500 text-white shadow-lg scale-105"
                                : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                            )}
                          >
                            <div className={cn(
                              "p-2 rounded-full",
                              selectedUsers.includes(group.id)
                                ? "bg-white/20"
                                : "bg-gray-200"
                            )}>
                              {group.icon}
                            </div>
                            <span className="text-xs font-medium text-center">{group.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Schedule Settings */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        <Timer className="w-4 h-4 inline mr-2" />
                        When to Show
                      </label>
                      <div className="space-y-4">
                        {/* Date Selection */}
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">Start Date</label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !startDate && "text-muted-foreground"
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {startDate ? format(startDate, "PPP") : "Pick a date"}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={startDate}
                                  onSelect={setStartDate}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">End Date</label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !endDate && "text-muted-foreground"
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {endDate ? format(endDate, "PPP") : "Pick a date"}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={endDate}
                                  onSelect={setEndDate}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                        </div>

                        {/* Time Slot Selection */}
                        <div>
                          <label className="block text-xs text-gray-500 mb-2">Time Slot</label>
                          <div className="grid grid-cols-2 gap-2">
                            {timeSlots.map((slot) => (
                              <button
                                key={slot}
                                onClick={() => setSelectedTimeSlot(slot === selectedTimeSlot ? '' : slot)}
                                className={cn(
                                  "p-3 text-xs rounded-lg transition-all",
                                  selectedTimeSlot === slot
                                    ? "bg-rose-500 text-white shadow-md"
                                    : "bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200"
                                )}
                              >
                                {slot}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Automation */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        <Wand2 className="w-4 h-4 inline mr-2" />
                        Automation
                      </label>
                      <div className="bg-gradient-to-r from-rose-50 to-rose-100 rounded-lg p-4">
                        <label className="flex items-center justify-between cursor-pointer">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                              <Zap className="w-5 h-5 text-rose-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">Smart Automation</p>
                              <p className="text-xs text-gray-600">Automatically change content based on event schedule</p>
                            </div>
                          </div>
                          <button
                            onClick={() => setAutomationEnabled(!automationEnabled)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              automationEnabled ? 'bg-rose-600' : 'bg-gray-300'
                            }`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              automationEnabled ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </button>
                        </label>
                        {automationEnabled && (
                          <div className="mt-3 pt-3 border-t border-rose-200">
                            <p className="text-xs text-gray-600">
                              Content will automatically update based on your wedding timeline
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <button 
            onClick={() => window.location.href = 'https://dashboard.shadicards.in/auth/login'}
            className="bg-rose-500 text-white py-4 px-10 rounded-full font-medium text-base hover:bg-rose-600 transition-colors shadow-lg hover:shadow-xl">
            Order Smart Cards
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </section>
  );
}