"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Leaf, Diamond, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

// Sample card designs - in production these would come from a database
const cardDesigns = {
  traditional: [
    { id: 1, image: "https://images.unsplash.com/photo-1619983081563-430f63602796?w=400&h=600&fit=crop", title: "Royal Peacock" },
    { id: 2, image: "https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?w=400&h=600&fit=crop", title: "Golden Mandala" },
    { id: 3, image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=400&h=600&fit=crop", title: "Lotus Divine" },
    { id: 4, image: "https://images.unsplash.com/photo-1619983081563-430f63602796?w=400&h=600&fit=crop", title: "Ganesha Blessings" },
    { id: 5, image: "https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?w=400&h=600&fit=crop", title: "Om Shanti" },
    { id: 6, image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=400&h=600&fit=crop", title: "Sacred Thread" },
  ],
  modern: [
    { id: 7, image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&h=600&fit=crop", title: "Minimalist Love" },
    { id: 8, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop", title: "Geometric Bliss" },
    { id: 9, image: "https://images.unsplash.com/photo-1594734535088-f1f4ca3f9086?w=400&h=600&fit=crop", title: "Watercolor Dreams" },
    { id: 10, image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&h=600&fit=crop", title: "Abstract Union" },
    { id: 11, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop", title: "Typography Art" },
    { id: 12, image: "https://images.unsplash.com/photo-1594734535088-f1f4ca3f9086?w=400&h=600&fit=crop", title: "Floral Cascade" },
  ],
  premium: [
    { id: 13, image: "https://images.unsplash.com/photo-1505932794465-147d1f1b2c97?w=400&h=600&fit=crop", title: "Gold Foil Elegance" },
    { id: 14, image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=600&fit=crop", title: "Laser Cut Marvel" },
    { id: 15, image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&h=600&fit=crop", title: "3D Embossed" },
    { id: 16, image: "https://images.unsplash.com/photo-1505932794465-147d1f1b2c97?w=400&h=600&fit=crop", title: "Crystal Studded" },
    { id: 17, image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=600&fit=crop", title: "Mirror Work" },
    { id: 18, image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&h=600&fit=crop", title: "Velvet Touch" },
  ],
};

const cardTypes = [
  {
    id: "paper",
    name: "Paper",
    subtitle: "800GSM Premium",
    image: "/paper_smart_card.jpg",
    features: ["Eco-friendly", "Premium texture", "Customizable"],
    price: "₹15/card",
  },
  {
    id: "pvc",
    name: "PVC",
    subtitle: "Waterproof & Durable",
    image: "/pvc_smart_card.jpg",
    features: ["Waterproof", "Long-lasting", "Vibrant colors"],
    price: "₹25/card",
  },
  {
    id: "wooden",
    name: "Wooden",
    subtitle: "Natural Elegance",
    image: "/wooden_smart_card.jpg",
    features: ["Sustainable", "Unique texture", "Premium feel"],
    price: "₹45/card",
  },
  {
    id: "metallic",
    name: "Metallic",
    subtitle: "Super Luxury",
    image: "/metal_smart_card.jpg",
    features: ["Premium metal", "Engraved details", "Lifetime keepsake"],
    price: "₹95/card",
  },
];

export default function CardCatalogSection() {
  const [selectedType, setSelectedType] = useState("paper");
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const typeButtonsRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const row3Ref = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Header animations
    const headerElements = headerRef.current?.querySelectorAll('.animate-item');
    if (headerElements) {
      gsap.fromTo(headerElements, 
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
          }
        }
      );
    }

    // Type buttons animation
    const typeButtons = typeButtonsRef.current?.querySelectorAll('.type-button');
    if (typeButtons) {
      gsap.fromTo(typeButtons,
        { opacity: 0, y: 20, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: typeButtonsRef.current,
            start: "top 80%",
          }
        }
      );
    }

    // CTA animation
    gsap.fromTo(ctaRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 90%",
        }
      }
    );

    // Row animations
    const animateRow = (element: HTMLDivElement | null, direction: number) => {
      if (!element) return;

      // Clone content for seamless loop
      const content = element.innerHTML;
      element.innerHTML = content + content + content;

      let xPos = 0;
      const animate = () => {
        xPos += direction * 0.5;
        
        const totalWidth = element.scrollWidth / 3; // Since we clone 3 times
        
        if (direction > 0 && xPos >= totalWidth) {
          xPos = 0;
        } else if (direction < 0 && xPos <= -totalWidth) {
          xPos = 0;
        }
        
        element.style.transform = `translateX(${xPos}px)`;
        requestAnimationFrame(animate);
      };
      
      requestAnimationFrame(animate);
    };

    // Start animations
    animateRow(row1Ref.current, -1); // Left
    animateRow(row2Ref.current, 1);  // Right
    animateRow(row3Ref.current, -1); // Left
  }, []);

  return (
    <section ref={sectionRef} className="relative py-0 bg-gray-900 overflow-hidden">
      {/* Full-width dark background with animated cards */}
      <div className="absolute inset-0">
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60 z-10" />
        
        {/* Row 1 - Moving Left */}
        <div className="absolute top-0 left-0 right-0 h-1/3 overflow-hidden">
          <div ref={row1Ref} className="flex gap-4 opacity-30">
            {cardDesigns.traditional.map((card) => (
              <div
                key={card.id}
                className="relative flex-shrink-0 w-56 h-80 rounded-xl overflow-hidden"
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Row 2 - Moving Right */}
        <div className="absolute top-1/3 left-0 right-0 h-1/3 overflow-hidden">
          <div ref={row2Ref} className="flex gap-4 opacity-30">
            {cardDesigns.modern.map((card) => (
              <div
                key={card.id}
                className="relative flex-shrink-0 w-56 h-80 rounded-xl overflow-hidden"
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Row 3 - Moving Left */}
        <div className="absolute top-2/3 left-0 right-0 h-1/3 overflow-hidden">
          <div ref={row3Ref} className="flex gap-4 opacity-30">
            {cardDesigns.premium.map((card) => (
              <div
                key={card.id}
                className="relative flex-shrink-0 w-56 h-80 rounded-xl overflow-hidden"
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Foreground content */}
      <div className="relative z-20 py-20 md:py-32">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <div ref={headerRef} className="text-center mb-16">
            <div className="animate-item inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Choose from 1000+ Designs</span>
            </div>
            
            <h2 className="animate-item text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-white">
              <span>Your perfect card,</span>{" "}
              <span className="text-gray-300">your way</span>
            </h2>
            
            <p className="animate-item text-lg text-gray-300 max-w-2xl mx-auto">
              From traditional to ultra-modern, find the perfect invitation that matches your style
            </p>
          </div>

          {/* Card Type Selector */}
          <div ref={typeButtonsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 max-w-5xl mx-auto">
            {cardTypes.map((type) => {
              const isSelected = selectedType === type.id;
              
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, { scale: 1.05, duration: 0.2 });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, { scale: 1, duration: 0.2 });
                  }}
                  className={cn(
                    "type-button relative p-4 md:p-6 rounded-2xl border-2 backdrop-blur-md transition-all duration-300",
                    isSelected
                      ? "bg-white/20 border-white/40 shadow-2xl"
                      : "bg-white/10 border-white/20 hover:border-white/30 hover:bg-white/15"
                  )}
                >
                  {isSelected && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                  
                  <div className="w-32 h-48 md:w-36 md:h-52 rounded-xl overflow-hidden mb-3 shadow-lg">
                    <img 
                      src={type.image} 
                      alt={`${type.name} card`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <h3 className="font-semibold text-white mb-1">{type.name}</h3>
                  <p className="text-xs text-gray-300 mb-3">{type.subtitle}</p>
                  
                  <div className="space-y-1">
                    {type.features.map((feature, idx) => (
                      <p key={idx} className="text-xs text-gray-400 flex items-center gap-1">
                        <span className="w-1 h-1 bg-gray-500 rounded-full" />
                        {feature}
                      </p>
                    ))}
                  </div>
                  
                  <p className="text-sm font-bold text-white mt-3">{type.price}</p>
                </button>
              );
            })}
          </div>

          {/* CTA Button */}
          <div ref={ctaRef} className="text-center">
            <button 
              onClick={() => window.location.href = 'https://dashboard.shadicards.in/auth/login'}
              className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-4 rounded-full font-medium text-lg shadow-2xl transform hover:-translate-y-1 transition-all duration-300 inline-flex items-center gap-2"
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, { scale: 1.05, y: -5, duration: 0.3 });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, { scale: 1, y: 0, duration: 0.3 });
              }}
            >
              <span>Browse All Designs</span>
              <Sparkles className="w-5 h-5" />
            </button>
            <p className="text-sm text-gray-400 mt-4">
              Can't find what you're looking for? Design your own from scratch!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}