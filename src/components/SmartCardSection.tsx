"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Calendar, MapPin, Users, Clock, Instagram, Camera, Heart, 
  Sparkles, MessageCircle, Smartphone, Zap, Shield, QrCode,
  Music, Gift, BarChart3, Phone, Settings, Eye, ChevronDown,
  Link2, X
} from "lucide-react";

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
  const animationCompleted = useRef(false);

  const features = [
    {
      icon: <Calendar className="w-6 h-6" />,
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
        color: "from-purple-500 to-pink-500"
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
        color: "from-rose-500 to-pink-500"
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
    }
  ];

  const linkCategories = [
    { title: "Event Details", types: ["Event Details & Schedule", "Location & Maps"] },
    { title: "Social & Media", types: ["Wedding Instagram", "Event Photos", "Thank You Message"] },
    { title: "Custom", types: ["Custom Link"] }
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
    
    const performTap = () => {
      if (tapCount >= features.length) {
        // Animation sequence complete
        return;
      }

      // Animate card to phone
      const tl = gsap.timeline({
        onComplete: () => {
          tapCount++;
          if (tapCount < features.length) {
            setTimeout(performTap, 2000); // Wait 2 seconds before next tap
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
        setCurrentFeature(tapCount);
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
            <span>NFC + QR Smart Cards</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6">
            <span className="font-normal">One Tap</span>
            <br />
            <span className="text-gray-600">Endless Connections</span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Track every interaction, share dynamic content, and give your guests 
            a personalized digital experience with smart wedding cards.
          </p>
        </div>

        {/* Main Demo */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Phone and Card Demo */}
            <div className="relative order-2 lg:order-1">
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
                              <div className={`h-32 bg-gradient-to-br ${features[currentFeature].content.color} rounded-2xl mb-6 flex items-center justify-center text-white`}>
                                <div className="scale-150">
                                  {features[currentFeature].icon}
                                </div>
                              </div>

                              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
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
                                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
                                      <p className="font-medium text-gray-900 text-lg">{features[currentFeature].content.handle}</p>
                                      <p className="text-sm text-gray-600">{features[currentFeature].content.posts}</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4">
                                      <p className="text-sm text-purple-600">{features[currentFeature].content.hashtag}</p>
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
                    <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-pink-400 blur-xl opacity-30" />
                    <div className="relative w-56 h-36 bg-gradient-to-br from-gray-900 to-black rounded-2xl p-5 shadow-2xl">
                      <div className="flex justify-between items-start h-full">
                        <div>
                          <p className="text-gray-400 text-xs font-medium tracking-wider">SMART WEDDING CARD</p>
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
            <div className="space-y-8 order-1 lg:order-2">
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
                      Track Every 
                      <span className="text-rose-600 font-normal"> Interaction</span>
                    </h3>
                    <p className="text-gray-600 mb-8">
                      Know exactly who tapped, when they tapped, and what they viewed. 
                      Get real-time analytics for every smart card interaction.
                    </p>
                  </div>

                  {/* Analytics Dashboard */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="text-lg font-semibold text-gray-900">Live Analytics</h4>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-gray-600">Real-time</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {features.map((feature, index) => (
                        <div 
                          key={index} 
                          className={`flex items-center justify-between p-3 rounded-lg transition-all duration-300 ${
                            currentFeature === index && showContent
                              ? 'bg-rose-50 border-2 border-rose-500' 
                              : 'bg-gray-50 border-2 border-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                              currentFeature === index && showContent
                                ? 'bg-rose-500 text-white'
                                : 'bg-white text-gray-600'
                            }`}>
                              {feature.icon}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 text-sm">{feature.title}</p>
                              <p className="text-xs text-gray-500">{feature.type}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">{feature.taps}</p>
                            <p className="text-xs text-gray-500">taps</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold text-gray-900">3,289</p>
                          <p className="text-xs text-gray-500">Total Taps</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-rose-600">342</p>
                          <p className="text-xs text-gray-500">Unique Guests</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-gray-900">18</p>
                          <p className="text-xs text-gray-500">Avg. Daily</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                /* Settings View */
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Link Configuration</h3>
                    <p className="text-sm text-gray-600 mb-6">Configure your NFC/QR link settings</p>

                    {/* Link Type Selection */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-3">Link Type</label>
                      <div className="relative">
                        <button className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-left flex items-center justify-between hover:bg-gray-100 transition-colors">
                          <span className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-600" />
                            Location & Maps
                          </span>
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>

                    {/* Link Categories */}
                    <div className="space-y-4 mb-6">
                      {linkCategories.map((category, idx) => (
                        <div key={idx}>
                          <h5 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                            {category.title}
                          </h5>
                          <div className="space-y-2">
                            {category.types.map((type, i) => (
                              <label key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                                <input type="radio" name="linkType" className="text-rose-500" />
                                <span className="flex items-center gap-2 text-sm text-gray-700">
                                  {type === "Event Details & Schedule" && <Calendar className="w-4 h-4" />}
                                  {type === "Location & Maps" && <MapPin className="w-4 h-4" />}
                                  {type === "Wedding Instagram" && <Instagram className="w-4 h-4" />}
                                  {type === "Event Photos" && <Camera className="w-4 h-4" />}
                                  {type === "Thank You Message" && <MessageCircle className="w-4 h-4" />}
                                  {type === "Custom Link" && <Link2 className="w-4 h-4" />}
                                  {type}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Additional Settings */}
                    <div className="space-y-4 border-t border-gray-200 pt-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                        <input 
                          type="text" 
                          placeholder="Enter title for this link"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Link Owner</label>
                        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500">
                          <option>Mutual</option>
                          <option>Bride</option>
                          <option>Groom</option>
                        </select>
                        <p className="text-xs text-gray-500 mt-1">Who can share this link</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">End Time (Optional)</label>
                        <input 
                          type="time" 
                          defaultValue="12:30"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                        />
                      </div>
                    </div>

                    <div className="mt-6 flex gap-3">
                      <button className="flex-1 bg-rose-500 text-white py-2 rounded-lg font-medium hover:bg-rose-600 transition-colors">
                        Save Configuration
                      </button>
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <button className="bg-rose-500 text-white py-4 px-10 rounded-full font-medium text-base hover:bg-rose-600 transition-colors shadow-lg hover:shadow-xl">
            Order Smart Cards
          </button>
          <p className="text-sm text-gray-500 mt-4">Starting at ₹99 per card • Analytics included</p>
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