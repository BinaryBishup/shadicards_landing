"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Eye, EyeOff, Calendar, Users, Lock, Globe, 
  Palette, Settings, Share2, QrCode, Shield, 
  Smartphone, Monitor, Clock, Star, MousePointer
} from "lucide-react";

// Register GSAP plugins only on client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WebsiteControlSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [toggleStates, setToggleStates] = useState({
    gallery: true,
    family: false,
    venue: false
  });

  const features = [
    {
      title: "Indian Themes",
      subtitle: "Choose from 25+ designs for Mehendi, Sangeet, Wedding & more.",
      icon: <Monitor className="w-6 h-6" />,
      iconBg: "bg-black",
      stats: "25+ Templates"
    },
    {
      title: "Guest List",
      subtitle: "Give each guest a personal link. See RSVPs, meal choices & travel details all in one place.",
      icon: <Users className="w-6 h-6" />,
      iconBg: "bg-rose-500",
      stats: "Unlimited Guests"
    },
    {
      title: "Privacy Control",
      subtitle: "Protect pages and photo galleries with a password. Decide who sees what.",
      icon: <Shield className="w-6 h-6" />,
      iconBg: "bg-black",
      stats: "Security"
    },
    {
      title: "RSVP Tracker",
      subtitle: "Watch RSVPs and guest info update in real time for every event.",
      icon: <Settings className="w-6 h-6" />,
      iconBg: "bg-rose-500",
      stats: "Live Dashboard"
    },
    {
      title: "Today's Event",
      subtitle: "Only show today's ceremony page—Mehendi, Sangeet, Wedding, etc.",
      icon: <Calendar className="w-6 h-6" />,
      iconBg: "bg-black",
      stats: "Event Pages"
    },
    {
      title: "Your Website Address",
      subtitle: "Use youandme.shaadicards.in or connect your own domain in two clicks.",
      icon: <Globe className="w-6 h-6" />,
      iconBg: "bg-rose-500",
      stats: "Custom URL"
    }
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;

    const section = sectionRef.current;
    if (!section) return;

    // Ensure elements are visible
    const elements = section.querySelectorAll('.section-header, .feature-card, .card-visual');
    elements.forEach(el => {
      (el as HTMLElement).style.opacity = '1';
    });

    // Create animations after a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Create scroll trigger for main section entrance
        ScrollTrigger.create({
          trigger: section,
          start: "top 80%",
          onEnter: () => {
            // Animate header
            gsap.fromTo(".section-header", 
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
            );

            // Animate cards with stagger
            gsap.fromTo(".feature-card", 
              { y: 50, opacity: 0 },
              { 
                y: 0, 
                opacity: 1, 
                duration: 0.8, 
                stagger: 0.15, 
                ease: "power3.out",
                delay: 0.3
              }
            );
          },
          once: true
        });

        // Individual card animations on their own visibility
        gsap.utils.toArray(".feature-card").forEach((card: any, index) => {
          ScrollTrigger.create({
            trigger: card,
            start: "top 85%",
            onEnter: () => {
              const visual = card.querySelector('.card-visual');
              
              // Templates card animation
              if (index === 0) {
                const cursorTl = gsap.timeline({ delay: 0.5 });
                cursorTl.set(".cursor-pointer", { x: 0, y: 0, opacity: 0 })
                  .to(".cursor-pointer", { opacity: 1, duration: 0.3 })
                  .to(".cursor-pointer", { x: 30, y: 25, duration: 1, ease: "power2.inOut" })
                  .to(".cursor-pointer", { scale: 0.9, duration: 0.1 })
                  .to(".cursor-pointer", { scale: 1, duration: 0.1 })
                  .to(".template-1", { borderColor: "#f43f5e", duration: 0.2 }, "-=0.2")
                  .to(".template-1-overlay", { opacity: 0.1, duration: 0.2 }, "-=0.2")
                  .to(".template-1", { borderColor: "#e5e7eb", duration: 0.2 }, "+=0.5")
                  .to(".template-1-overlay", { opacity: 0, duration: 0.2 }, "-=0.2");
              }
              
              // Guest management animation
              if (index === 1) {
                // Fade in avatars
                gsap.fromTo(card.querySelectorAll(".guest-avatar"),
                  { opacity: 0, scale: 0 },
                  {
                    opacity: 1,
                    scale: 1,
                    duration: 0.5,
                    ease: "back.out(1.7)",
                    stagger: 0.05,
                    delay: 0.5
                  }
                );
                
                // Rotate only the wrapper
                const wrapper = card.querySelector(".guest-avatars-wrapper");
                if (wrapper) {
                  gsap.to(wrapper, {
                    rotation: 360,
                    duration: 20,
                    repeat: -1,
                    ease: "none",
                    delay: 1
                  });
                  
                  // Counter-rotate avatars
                  gsap.to(card.querySelectorAll(".guest-avatar"), {
                    rotation: -360,
                    duration: 20,
                    repeat: -1,
                    ease: "none",
                    delay: 1
                  });
                }
              }
              
              // Privacy toggles animation
              if (index === 2) {
                // Animate the appearance of toggle rows
                gsap.fromTo(card.querySelectorAll(".bg-white.rounded-lg"),
                  { opacity: 0, y: 10 },
                  {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.1,
                    delay: 0.5,
                    ease: "power2.out"
                  }
                );
                
                // Animate some toggles switching after appearance
                setTimeout(() => {
                  // Simulate toggle animations
                  const toggles = card.querySelectorAll('button span');
                  if (toggles[1]) {
                    gsap.to(toggles[1], {
                      x: 20,
                      duration: 0.3,
                      ease: "power2.inOut"
                    });
                  }
                  if (toggles[2]) {
                    gsap.to(toggles[2], {
                      x: 20,
                      duration: 0.3,
                      delay: 0.2,
                      ease: "power2.inOut"
                    });
                  }
                }, 1500);
              }
              
              // Analytics animation for RSVP Tracker
              if (index === 3) {
                const progressBars = card.querySelectorAll(".progress-bar");
                progressBars.forEach((bar: any, i: number) => {
                  const width = bar.getAttribute('data-width') || '75';
                  gsap.fromTo(bar, 
                    { width: '0%' },
                    { 
                      width: `${width}%`, 
                      duration: 1.5, 
                      ease: "power2.out",
                      delay: 0.5 + i * 0.2
                    }
                  );
                });
                
                // Simulate updates
                const progressTl = gsap.timeline({ delay: 3 });
                progressTl.to(".progress-bar-1", { width: "82%", duration: 1, ease: "power2.inOut" })
                  .to(".progress-bar-2", { width: "65%", duration: 1.2, ease: "power2.inOut" }, "-=0.5")
                  .to(".progress-bar-3", { width: "92%", duration: 0.8, ease: "power2.inOut" }, "-=0.8");
              }
              
              // Event cards animation for Today's Event
              if (index === 4) {
                gsap.fromTo(card.querySelectorAll(".event-card"),
                  { opacity: 0, scale: 0.8, y: 20 },
                  {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.6,
                    delay: 0.5,
                    stagger: 0.1,
                    ease: "back.out(1.7)"
                  }
                );
                
                // Highlight today's event
                setTimeout(() => {
                  const eventCards = card.querySelectorAll(".event-card");
                  if (eventCards[1]) {
                    gsap.to(eventCards[1], {
                      scale: 1.05,
                      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                      duration: 0.5,
                      ease: "power2.out"
                    });
                  }
                }, 1500);
              }
              
              // Custom URL animation
              if (index === 5) {
                // Animate URL container appearance
                gsap.fromTo(card.querySelector(".url-container"),
                  { opacity: 0, y: 10 },
                  {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: 0.5,
                    ease: "power2.out"
                  }
                );
                
                // Animate other elements
                gsap.fromTo(card.querySelectorAll(".text-gray-500, .text-gray-600"),
                  { opacity: 0 },
                  {
                    opacity: 1,
                    duration: 0.5,
                    delay: 1,
                    stagger: 0.2,
                    ease: "power2.out"
                  }
                );
                
                // Animate typing effect for the URL
                setTimeout(() => {
                  const urlText = card.querySelector(".font-mono");
                  if (urlText) {
                    const fullText = "youandme.shaadicards.in";
                    urlText.textContent = "";
                    
                    // Type out the URL character by character
                    [...fullText].forEach((char, i) => {
                      setTimeout(() => {
                        urlText.textContent += char;
                      }, i * 50);
                    });
                    
                    // Add blinking cursor effect
                    const cursor = document.createElement("span");
                    cursor.textContent = "|";
                    cursor.className = "inline-block ml-0.5 text-gray-400";
                    urlText.appendChild(cursor);
                    
                    gsap.to(cursor, {
                      opacity: 0,
                      duration: 0.5,
                      repeat: -1,
                      yoyo: true,
                      ease: "power2.inOut"
                    });
                    
                    // Remove cursor after typing
                    setTimeout(() => {
                      cursor.remove();
                    }, fullText.length * 50 + 2000);
                  }
                }, 1000);
                
                // Pulse animation for "Connect your domain" text
                setTimeout(() => {
                  gsap.to(card.querySelector(".mt-3"), {
                    scale: 1.05,
                    duration: 0.5,
                    repeat: 2,
                    yoyo: true,
                    ease: "power2.inOut"
                  });
                }, 2500);
              }
            },
            once: true
          });
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

  const handleToggle = (toggleName: 'gallery' | 'family' | 'venue') => {
    setToggleStates(prev => ({
      ...prev,
      [toggleName]: !prev[toggleName]
    }));
  };

  if (!isVisible) return null;

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-32 bg-[rgb(254.7,255,235)] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[rgb(254.7,255,235)] to-[rgb(252,250,230)]" />
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="section-header text-center mb-16" style={{ opacity: 1 }}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6">
            <span className="text-gray-900 font-normal">Make your wedding website your own</span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Create an Indian-style site in minutes. Pick a design, lock private pages, and track RSVPs live.
          </p>
        </div>

        {/* Feature Cards - 3x2 Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
              style={{ opacity: 1 }}
            >
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 ${feature.iconBg} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                    {feature.icon}
                  </div>
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {feature.stats}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.subtitle}
                </p>
              </div>
              
              {/* Visual representation */}
              <div className="card-visual relative h-48 bg-gray-50 rounded-xl overflow-hidden" style={{ opacity: 1 }}>
                {/* Templates with cursor animation */}
                {index === 0 && (
                  <div className="p-4 relative">
                    <div className="grid grid-cols-3 gap-2">
                      <div 
                        className={`template-1 bg-white border-2 border-gray-200 rounded-lg p-2 h-20 relative`}
                      >
                        <div className="w-full h-2 bg-gray-200 rounded mb-1" />
                        <div className="w-3/4 h-2 bg-gray-200 rounded mb-1" />
                        <div className="w-1/2 h-2 bg-gray-200 rounded" />
                        <div className={`template-1-overlay absolute inset-0 bg-rose-500 opacity-0 transition-opacity`} />
                      </div>
                      <div 
                        className={`bg-white border-2 border-gray-200 rounded-lg p-2 h-20`}
                      >
                        <div className="w-full h-2 bg-black rounded mb-1" />
                        <div className="w-2/3 h-2 bg-gray-200 rounded mb-1" />
                        <div className="w-3/4 h-2 bg-gray-200 rounded" />
                      </div>
                      <div 
                        className={`bg-white border-2 border-gray-200 rounded-lg p-2 h-20`}
                      >
                        <div className="w-full h-2 bg-rose-500 rounded mb-1" />
                        <div className="w-1/2 h-2 bg-gray-200 rounded mb-1" />
                        <div className="w-2/3 h-2 bg-gray-200 rounded" />
                      </div>
                    </div>
                    {/* Animated cursor */}
                    <div className="cursor-pointer absolute top-8 left-8 pointer-events-none opacity-100">
                      <MousePointer className="w-6 h-6 text-black fill-white" />
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-xs text-gray-500">Click to customize</p>
                    </div>
                  </div>
                )}
                
                {/* Guest Management with animated avatars */}
                {index === 1 && (
                  <div className="flex items-center justify-center h-full p-4">
                    <div className="relative w-36 h-36">
                      {/* Center group icon - fixed */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center z-20">
                        <Users className="w-8 h-8 text-black" />
                      </div>
                      
                      {/* Rotating wrapper for avatars */}
                      <div className="guest-avatars-wrapper absolute inset-0">
                        {[
                          { initials: "RS", bg: "bg-rose-100", text: "text-rose-700", border: "border-rose-200", angle: 0 },
                          { initials: "PP", bg: "bg-gray-900", text: "text-white", border: "border-gray-700", angle: 45 },
                          { initials: "AK", bg: "bg-rose-500", text: "text-white", border: "border-rose-400", angle: 90 },
                          { initials: "SG", bg: "bg-gray-100", text: "text-gray-700", border: "border-gray-300", angle: 135 },
                          { initials: "VM", bg: "bg-black", text: "text-white", border: "border-gray-800", angle: 180 },
                          { initials: "NJ", bg: "bg-rose-200", text: "text-rose-800", border: "border-rose-300", angle: 225 },
                          { initials: "RK", bg: "bg-gray-200", text: "text-gray-800", border: "border-gray-400", angle: 270 },
                          { initials: "DM", bg: "bg-rose-400", text: "text-white", border: "border-rose-500", angle: 315 }
                        ].map((guest, i) => {
                          const radius = 60;
                          const radian = (guest.angle * Math.PI) / 180;
                          const x = Math.cos(radian) * radius;
                          const y = Math.sin(radian) * radius;
                          
                          return (
                            <div 
                              key={i}
                              className={`guest-avatar absolute w-10 h-10 ${guest.bg} rounded-xl border-2 ${guest.border} flex items-center justify-center shadow-md`}
                              style={{ 
                                left: `calc(50% + ${x}px)`,
                                top: `calc(50% + ${y}px)`,
                                transform: 'translate(-50%, -50%)'
                              }}
                            >
                              <span className={`text-[10px] font-bold ${guest.text}`}>{guest.initials}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Privacy Control Card */}
                {index === 2 && (
                  <div className="p-4 space-y-3">
                    {/* Privacy Setting 1 */}
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
                      <div className="flex items-center gap-3">
                        <Eye className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">Gallery Access</span>
                      </div>
                      <button
                        onClick={() => handleToggle('gallery')}
                        className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none"
                        style={{ backgroundColor: toggleStates.gallery ? '#f43f5e' : '#e5e7eb' }}
                      >
                        <span
                          className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm"
                          style={{ transform: toggleStates.gallery ? 'translateX(20px)' : 'translateX(2px)' }}
                        />
                      </button>
                    </div>
                    
                    {/* Privacy Setting 2 */}
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
                      <div className="flex items-center gap-3">
                        <Lock className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">Guest List</span>
                      </div>
                      <button
                        onClick={() => handleToggle('family')}
                        className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none"
                        style={{ backgroundColor: toggleStates.family ? '#000000' : '#e5e7eb' }}
                      >
                        <span
                          className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm"
                          style={{ transform: toggleStates.family ? 'translateX(20px)' : 'translateX(2px)' }}
                        />
                      </button>
                    </div>
                    
                    {/* Privacy Setting 3 */}
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
                      <div className="flex items-center gap-3">
                        <Shield className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">Venue Info</span>
                      </div>
                      <button
                        onClick={() => handleToggle('venue')}
                        className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none"
                        style={{ backgroundColor: toggleStates.venue ? '#000000' : '#e5e7eb' }}
                      >
                        <span
                          className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm"
                          style={{ transform: toggleStates.venue ? 'translateX(20px)' : 'translateX(2px)' }}
                        />
                      </button>
                    </div>
                  </div>
                )}
                
                {/* RSVP Tracker - Analytics */}
                {index === 3 && (
                  <div className="space-y-3 p-2">
                    <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-gray-700">Wedding Day</span>
                        <span className="text-[10px] text-gray-500">342 confirmed</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="progress-bar progress-bar-1 h-full bg-rose-500 rounded-full transition-all"
                          data-width="75"
                          style={{ width: '0%' }}
                        />
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-gray-700">Sangeet Night</span>
                        <span className="text-[10px] text-gray-500">289 attending</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="progress-bar progress-bar-2 h-full bg-black rounded-full transition-all"
                          data-width="50"
                          style={{ width: '0%' }}
                        />
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-gray-700">Mehendi Function</span>
                        <span className="text-[10px] text-gray-500">156 RSVPs</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="progress-bar progress-bar-3 h-full bg-rose-500 rounded-full transition-all"
                          data-width="85"
                          style={{ width: '0%' }}
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Event Pages */}
                {index === 4 && (
                  <div className="grid grid-cols-2 gap-2 h-full p-2">
                    {[
                      { event: "Mehendi", date: "Feb 12", color: "bg-black" },
                      { event: "Sangeet", date: "Feb 13", color: "bg-rose-500" },
                      { event: "Wedding", date: "Feb 14", color: "bg-black" },
                      { event: "Reception", date: "Feb 15", color: "bg-rose-500" }
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="event-card bg-white rounded-lg p-3 shadow-md hover:shadow-lg transition-all"
                      >
                        <p className="text-xs font-medium text-gray-800 mb-1">{item.event}</p>
                        <p className="text-[10px] text-gray-500 mb-2">{item.date}</p>
                        <div className={`w-full h-8 ${item.color} rounded-lg`} />
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Custom URL */}
                {index === 5 && (
                  <div className="flex flex-col items-center justify-center h-full p-4">
                    <div className="url-container bg-white rounded-lg px-4 py-3 shadow-md border border-gray-200 mb-3">
                      <p className="text-sm font-mono text-gray-700">youandme.shaadicards.in</p>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <div className="w-8 h-px bg-gray-300" />
                      <span className="text-xs">or</span>
                      <div className="w-8 h-px bg-gray-300" />
                    </div>
                    <div className="mt-3">
                      <p className="text-xs text-gray-600">Connect your domain</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button 
            onClick={() => window.location.href = 'https://dashboard.shadicards.in/auth/login'}
            className="bg-rose-500 text-white py-3 px-8 rounded-full font-medium text-base hover:bg-rose-600 transition-colors shadow-lg hover:shadow-xl">
            Start Your Free Website
          </button>
          <p className="text-sm text-gray-500 mt-4">Free forever — premium upgrades available</p>
        </div>
      </div>
    </section>
  );
}