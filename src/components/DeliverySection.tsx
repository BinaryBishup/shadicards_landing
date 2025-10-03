"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Truck, MapPin, Clock, Package, Navigation, Users, Check, Route, Zap, DollarSign, IndianRupee, Phone, AlertCircle, Shield } from "lucide-react";
import Image from "next/image";

// Register GSAP plugins only on client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function DeliverySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const truckRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'delivery' | 'routes'>('delivery');
  const [activeCard, setActiveCard] = useState(1); // For mobile carousel
  const mapAnimationTriggered = useRef(false);

  // Guest data for direct delivery
  const roadGuests = [
    { id: 1, name: "Priya Sharma", initials: "PS", side: "top", position: 15, bg: "bg-rose-100", text: "text-rose-700" },
    { id: 2, name: "Raj Kumar", initials: "RK", side: "bottom", position: 25, bg: "bg-gray-900", text: "text-white" },
    { id: 3, name: "Anita Patel", initials: "AP", side: "top", position: 35, bg: "bg-rose-500", text: "text-white" },
    { id: 4, name: "Vikram Singh", initials: "VS", side: "bottom", position: 45, bg: "bg-gray-100", text: "text-gray-700" },
    { id: 5, name: "Neha Gupta", initials: "NG", side: "top", position: 55, bg: "bg-black", text: "text-white" },
    { id: 6, name: "Amit Verma", initials: "AV", side: "bottom", position: 65, bg: "bg-rose-200", text: "text-rose-800" },
    { id: 7, name: "Deepa Joshi", initials: "DJ", side: "top", position: 75, bg: "bg-gray-200", text: "text-gray-800" },
    { id: 8, name: "Karan Mehta", initials: "KM", side: "bottom", position: 85, bg: "bg-rose-400", text: "text-white" }
  ];

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check for mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const section = sectionRef.current;
    const truck = truckRef.current;
    if (!section) return;

    // Create animations after DOM is ready
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Section entrance animation
        ScrollTrigger.create({
          trigger: section,
          start: "top 80%",
          onEnter: () => {
            // Animate header
            gsap.fromTo(".delivery-header", 
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
            );
          },
          once: true
        });

        // Direct Delivery Section Animation
        ScrollTrigger.create({
          trigger: ".direct-delivery-section",
          start: "top 80%",
          onEnter: () => {
            gsap.fromTo(".direct-delivery-section", 
              { y: 50, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
            );

            // Animate guests appearing
            gsap.fromTo(".road-guest",
              { scale: 0, opacity: 0 },
              {
                scale: 1,
                opacity: 1,
                duration: 0.5,
                stagger: 0.1,
                ease: "back.out(1.7)",
                delay: 0.5
              }
            );
          },
          once: true
        });

        // Truck animation - scroll-triggered movement from left to right
        if (truck) {
          // Set initial position - completely off-screen to the left, already centered vertically via CSS
          gsap.set(truck, { x: "-150%" });
          
          ScrollTrigger.create({
            trigger: ".truck-container",
            start: "top bottom", // Start when container enters viewport
            end: "bottom top",   // End when container leaves viewport
            scrub: 1,           // Smooth scrubbing, 1 second catch-up time
            onUpdate: (self) => {
              // Calculate truck position based on scroll progress
              const progress = self.progress;
              const containerWidth = truck.parentElement?.offsetWidth ?? 0;
              const truckWidth = truck.offsetWidth;
              
              // Move truck from left to right based on scroll progress
              const xPosition = -(containerWidth / 2 + truckWidth / 2) + (progress * containerWidth);
              gsap.set(truck, { x: xPosition });
              
              // Check which guests the truck has passed
              const rect = truck.getBoundingClientRect();
              const truckCenter = rect.left + rect.width / 2;
              
              roadGuests.forEach((guest) => {
                const guestEl = document.querySelector(`#guest-${guest.id}`);
                if (guestEl && !guestEl.classList.contains('delivered')) {
                  const guestRect = guestEl.getBoundingClientRect();
                  const guestCenter = guestRect.left + guestRect.width / 2;
                  
                  if (truckCenter > guestCenter) {
                    guestEl.classList.add('delivered');
                    // Add checkmark
                    const checkmark = guestEl.querySelector('.checkmark');
                    if (checkmark) {
                      gsap.to(checkmark, {
                        scale: 1,
                        opacity: 1,
                        duration: 0.3,
                        ease: "back.out(1.7)"
                      });
                    }
                  }
                }
              });
            }
          });
        }

        // Self Delivery Section Animation
        ScrollTrigger.create({
          trigger: ".self-delivery-section",
          start: "top 80%",
          onEnter: () => {
            gsap.fromTo(".self-delivery-section", 
              { y: 50, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
            );
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
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Animate map when Smart Routes tab is opened
  useEffect(() => {
    if (activeTab === 'routes' && !mapAnimationTriggered.current) {
      mapAnimationTriggered.current = true;
      
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        // Animate delivery points appearing
        gsap.fromTo(".delivery-point",
          { 
            scale: 0, 
            opacity: 0
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: "back.out(1.7)",
            delay: 0.3
          }
        );

        // Animate the optimized route path
        const routePath = document.querySelector('.optimized-route') as SVGPathElement;
        if (routePath) {
          const length = routePath.getTotalLength();
          routePath.style.strokeDasharray = `${length}`;
          routePath.style.strokeDashoffset = `${length}`;
          
          gsap.to(routePath, {
            strokeDashoffset: 0,
            duration: 3,
            ease: "power2.inOut",
            delay: 1.5,
            onUpdate: function() {
              // Add a pulsing effect to the current position
              const progress = this.progress();
              const currentLength = length * (1 - progress);
              const point = routePath.getPointAtLength(length - currentLength);
              
              // Create a temporary circle for the animation
              const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
              circle.setAttribute("cx", String(point.x));
              circle.setAttribute("cy", String(point.y));
              circle.setAttribute("r", "6");
              circle.setAttribute("fill", "#10b981");
              circle.setAttribute("opacity", "0.8");
              circle.classList.add("route-pulse");
              
              routePath.parentElement?.appendChild(circle);
              
              // Animate the circle
              gsap.to(circle, {
                r: 12,
                opacity: 0,
                duration: 0.6,
                ease: "power2.out",
                onComplete: () => circle.remove()
              });
            }
          });
        }

        // Animate route stats
        gsap.fromTo(".route-stats", 
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)", delay: 2 }
        );
      }, 100);
    }
  }, [activeTab]);

  return (
    <section ref={sectionRef} className="relative py-16 lg:py-24 bg-black overflow-hidden rounded-t-[2.5rem] rounded-b-[2.5rem]">
      {/* Background pattern - subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900 rounded-t-[2.5rem] rounded-b-[2.5rem]" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header - Reduced size */}
        <div className="delivery-header text-center mb-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6">
            <span className="text-gray-100 font-normal">Delivery Perfected</span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            White-glove service or DIY routes. Every card delivered with care.
          </p>
          
          {/* Tab Navigation */}
          <div className="inline-flex bg-gray-800/50 rounded-full p-1 backdrop-blur">
            <button
              onClick={() => setActiveTab('delivery')}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === 'delivery'
                  ? 'bg-white text-gray-900 shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              ShadiCards Delivery
            </button>
            <button
              onClick={() => setActiveTab('routes')}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === 'routes'
                  ? 'bg-white text-gray-900 shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              DIY Smart Routes
            </button>
          </div>
        </div>

        {/* ShadiCards Delivery Tab Content */}
        {activeTab === 'delivery' && (
          <div className="direct-delivery-section">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-light text-gray-100 mb-3">
                Premium White-Glove Service
              </h3>
              <p className="text-base text-gray-500 max-w-2xl mx-auto">
                We handle everything - from pickup to delivery confirmation
              </p>
            </div>

          {/* Key Features - Compact cards */}
          <div className="grid grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
            <div className="bg-white/5 backdrop-blur rounded-xl p-4 border border-gray-800">
              <div className="text-2xl font-semibold text-white mb-1">3-5</div>
              <div className="text-xs text-gray-500">Days Delivery</div>
            </div>
            <div className="bg-rose-500/10 backdrop-blur rounded-xl p-4 border border-rose-900/50">
              <div className="text-2xl font-semibold text-rose-400 mb-1">Live</div>
              <div className="text-xs text-gray-500">Tracking</div>
            </div>
            <div className="bg-white/5 backdrop-blur rounded-xl p-4 border border-gray-800">
              <div className="text-2xl font-semibold text-white mb-1">98%</div>
              <div className="text-xs text-gray-500">On-time</div>
            </div>
          </div>

          {/* Truck Animation Container - Reduced height */}
          <div className="truck-container relative h-64 bg-white/5 backdrop-blur rounded-2xl overflow-hidden border border-gray-800 shadow-xl">
            
            {/* Road with dashed lines */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-16">
              {/* Road surface */}
              <div className="absolute inset-0 bg-gray-800/20"></div>
              {/* Center dashed line */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5">
                <div className="h-full w-full" style={{
                  backgroundImage: 'repeating-linear-gradient(to right, rgba(255,255,255,0.3) 0px, rgba(255,255,255,0.3) 15px, transparent 15px, transparent 30px)'
                }}></div>
              </div>
            </div>

            {/* Guests on both sides of road */}
            {roadGuests.map((guest) => (
              <div
                key={guest.id}
                id={`guest-${guest.id}`}
                className="road-guest absolute"
                style={{
                  [guest.side]: guest.side === 'top' ? '20%' : 'auto',
                  bottom: guest.side === 'bottom' ? '20%' : 'auto',
                  left: `${guest.position}%`,
                  transform: 'translateX(-50%)'
                }}
              >
                <div className="relative">
                  <div className={`w-10 h-10 ${guest.bg} rounded-lg flex items-center justify-center shadow-md transition-all duration-300 hover:scale-105 border border-gray-700`}>
                    <span className={`text-xs font-semibold ${guest.text}`}>{guest.initials}</span>
                  </div>
                  <div className="checkmark absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center opacity-0 scale-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>
            ))}

            {/* Truck - Centered in the card */}
            <div ref={truckRef} className="absolute top-1/2 left-1/2 w-32 h-24" style={{ transform: 'translate(-50%, -50%)' }}>
              <Image
                src="/shadicards_truck.svg"
                alt="Delivery Truck"
                width={128}
                height={96}
                className="w-full h-full object-contain"
              />
            </div>

          </div>

          </div>
        )}

        {/* DIY Smart Routes Tab Content */}
        {activeTab === 'routes' && (
          <div className="self-delivery-section">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-light text-gray-100 mb-3">
                AI-Powered Route Planning
              </h3>
              <p className="text-base text-gray-500 max-w-2xl mx-auto">
                Upload your guest list and get the most efficient delivery route instantly
              </p>
            </div>

          {/* Map and Comparison Cards Container */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Map Section - Left Side */}
              <div className="delivery-map-container bg-white/5 backdrop-blur rounded-2xl p-6 shadow-xl border border-gray-800">
                <h4 className="text-xl font-light text-white mb-4">Optimized Delivery Route</h4>
                
                {/* Map SVG */}
                <div className="relative w-full h-[500px] bg-gray-900/50 rounded-xl overflow-hidden">
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 500">
                    {/* Grid Pattern for Map Effect */}
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#374151" strokeWidth="0.5" opacity="0.3"/>
                      </pattern>
                    </defs>
                    <rect width="400" height="500" fill="url(#grid)" />
                    
                    {/* Starting Point (Center) */}
                    <g className="delivery-point" data-point-type="start">
                      <circle cx="200" cy="250" r="12" fill="#f43f5e" stroke="#1f2937" strokeWidth="2"/>
                      <text x="200" y="255" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">START</text>
                      <text x="200" y="275" textAnchor="middle" fill="#9ca3af" fontSize="11">Your Location</text>
                    </g>
                    
                    {/* Guest Locations with Avatars */}
                    {[
                      { x: 120, y: 150, initials: "PS", name: "Priya Sharma", location: "Connaught Place", bg: "#fecaca", text: "#991b1b" },
                      { x: 280, y: 120, initials: "RK", name: "Raj Kumar", location: "Karol Bagh", bg: "#111827", text: "#ffffff" },
                      { x: 320, y: 220, initials: "AP", name: "Anita Patel", location: "Vasant Kunj", bg: "#f43f5e", text: "#ffffff" },
                      { x: 300, y: 350, initials: "VS", name: "Vikram Singh", location: "Greater Kailash", bg: "#f3f4f6", text: "#374151" },
                      { x: 180, y: 380, initials: "NG", name: "Neha Gupta", location: "Dwarka", bg: "#000000", text: "#ffffff" },
                      { x: 80, y: 300, initials: "AV", name: "Amit Verma", location: "Rohini", bg: "#fecdd3", text: "#881337" }
                    ].map((guest, i) => (
                      <g key={i} className="delivery-point guest-location group" data-point-type="guest">
                        {/* Avatar background */}
                        <rect 
                          x={guest.x - 16} 
                          y={guest.y - 16} 
                          width="32" 
                          height="32" 
                          rx="8" 
                          fill={guest.bg} 
                          stroke="#1f2937" 
                          strokeWidth="2"
                          className="transition-all duration-300 group-hover:rx-[12px]"
                        />
                        {/* Initials */}
                        <text 
                          x={guest.x} 
                          y={guest.y + 1} 
                          textAnchor="middle" 
                          fill={guest.text} 
                          fontSize="12" 
                          fontWeight="bold"
                          className="pointer-events-none"
                        >
                          {guest.initials}
                        </text>
                        {/* Hover tooltip */}
                        <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                          <rect 
                            x={guest.x - 60} 
                            y={guest.y - 50} 
                            width="120" 
                            height="32" 
                            rx="6" 
                            fill="#1f2937" 
                            opacity="0.95"
                          />
                          <text x={guest.x} y={guest.y - 38} textAnchor="middle" fill="white" fontSize="11" fontWeight="500">
                            {guest.name}
                          </text>
                          <text x={guest.x} y={guest.y - 24} textAnchor="middle" fill="#9ca3af" fontSize="10">
                            {guest.location}
                          </text>
                        </g>
                      </g>
                    ))}
                    
                    {/* Optimized Route Path */}
                    <path 
                      className="optimized-route" 
                      d="M200,250 Q150,200 120,150 Q200,100 280,120 Q300,170 320,220 Q310,285 300,350 Q240,365 180,380 Q130,340 80,300 Q140,275 200,250"
                      fill="none" 
                      stroke="#10b981" 
                      strokeWidth="3" 
                      strokeDasharray="8,4"
                      opacity="0.8"
                    />
                    
                    {/* Route Direction Arrows */}
                    <defs>
                      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
                      </marker>
                    </defs>
                    
                    {/* Total Distance and Time */}
                    <g className="route-stats">
                      <rect x="10" y="450" width="120" height="40" rx="8" fill="#1f2937" opacity="0.9"/>
                      <text x="20" y="470" fill="#10b981" fontSize="12" fontWeight="bold">Optimized: 45km</text>
                      <text x="20" y="485" fill="#9ca3af" fontSize="11">Est. time: 4 hours</text>
                    </g>
                  </svg>
                  
                  {/* Map Legend */}
                  <div className="absolute bottom-4 right-4 bg-gray-900/90 rounded-lg p-3 text-xs">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-rose-500 rounded-full"></div>
                      <span className="text-gray-300">Start/End Point</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-gray-300">Delivery Points</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comparison Cards - Right Side (Stacked Vertically) */}
              <div className="space-y-4">
                <h4 className="text-xl md:text-2xl font-light text-white mb-4">Route Comparison</h4>
                
                {/* Traditional Method */}
                <div className="relative rounded-xl overflow-hidden transition-all duration-300">
                  <div className="bg-gray-900/90 p-5 border border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <h5 className="text-lg font-medium text-white">Traditional Method</h5>
                      <span className="text-xs text-red-400 font-medium">Inefficient</span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-red-500">3</p>
                        <p className="text-xs text-gray-400">Days</p>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-red-500">150</p>
                        <p className="text-xs text-gray-400">km</p>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-red-500">50+</p>
                        <p className="text-xs text-gray-400">Calls</p>
                      </div>
                    </div>
                    
                    {/* Issues with traditional method */}
                    <div className="space-y-2 pt-4 border-t border-gray-700">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-gray-300">Call each guest for address</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-gray-300">Multiple visits to same area</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-gray-300">Random, inefficient routes</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Optimized Method */}
                <div className="relative rounded-xl overflow-hidden transition-all duration-300">
                  <div className="bg-gray-900/90 p-5 border border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <h5 className="text-lg font-medium text-white">Smart Route</h5>
                      <span className="text-xs text-green-400 font-medium animate-pulse">90% faster</span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-green-500">4</p>
                        <p className="text-xs text-gray-400">Hours</p>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-green-500">45</p>
                        <p className="text-xs text-gray-400">km</p>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-green-500">0</p>
                        <p className="text-xs text-gray-400">Calls</p>
                      </div>
                    </div>
                    
                    {/* Benefits with ShadiCards */}
                    <div className="space-y-2 pt-4 border-t border-gray-700">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-300">Upload guest list once</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-300">AI-optimized routing</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-300">No address hunting</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        )}

        {/* Common CTA Button */}
        <div className="text-center mt-12 mb-16">
          <button 
            onClick={() => window.location.href = 'https://dashboard.shadicards.in/auth/login'}
            className="bg-rose-500 text-white py-4 px-10 rounded-full font-medium text-base hover:bg-rose-600 transition-colors shadow-lg hover:shadow-xl">
            {activeTab === 'delivery' ? 'Schedule Premium Delivery' : 'Plan My Route'}
          </button>
        </div>

        {/* Dynamic Features Section */}
        <div className="mt-16">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-light text-white text-center mb-10">
              Why Choose <span className="font-medium">{activeTab === 'delivery' ? 'ShadiCards Delivery' : 'Smart Routes'}</span>?
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(activeTab === 'delivery' ? [
                {
                  icon: Truck,
                  title: "Express",
                  stat: "3-5 Days",
                  color: "rose"
                },
                {
                  icon: Shield,
                  title: "Insured",
                  stat: "100%",
                  color: "black"
                },
                {
                  icon: MapPin,
                  title: "Coverage",
                  stat: "Pan India",
                  color: "rose"
                },
                {
                  icon: Check,
                  title: "Success",
                  stat: "98%",
                  color: "black"
                }
              ] : [
                {
                  icon: Clock,
                  title: "90% Faster",
                  stat: "4 hrs",
                  color: "rose"
                },
                {
                  icon: Route,
                  title: "Optimized",
                  stat: "45 km",
                  color: "black"
                },
                {
                  icon: IndianRupee,
                  title: "Save Fuel",
                  stat: "₹500",
                  color: "rose"
                },
                {
                  icon: Users,
                  title: "No Calls",
                  stat: "0",
                  color: "black"
                }
              ]).map((feature, index) => (
                <div key={index} className="group">
                  <div className="relative bg-white/5 backdrop-blur rounded-xl p-4 border border-gray-800 hover:border-gray-700 transition-all duration-300">
                    {/* Icon */}
                    <div className={`w-10 h-10 rounded-lg ${
                      feature.color === 'rose' ? 'bg-rose-500' : 'bg-black'
                    } flex items-center justify-center mb-3`}>
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    
                    {/* Content */}
                    <h4 className="text-sm font-medium text-gray-200 mb-1">{feature.title}</h4>
                    
                    {/* Stat */}
                    <p className={`text-xl font-bold ${
                      feature.color === 'rose' ? 'text-rose-400' : 'text-white'
                    }`}>{feature.stat}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}