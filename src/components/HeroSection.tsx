"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Image from 'next/image';
import { Sparkles, Calendar, Users, Heart, MapPin, Camera, Clock } from 'lucide-react';

const weddingGuests = [
  { name: "Rahul Sharma", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rahul&backgroundColor=b6e3f4", events: ["wedding", "reception", "engagement"], status: "confirmed" },
  { name: "Priya Patel", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya&backgroundColor=ffd5dc", events: ["wedding", "reception"], status: "pending" },
  { name: "Amit Kumar", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=amit&backgroundColor=c0aede", events: ["wedding"], status: "confirmed" },
  { name: "Sneha Gupta", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sneha&backgroundColor=ffdfbf", events: ["wedding", "reception", "engagement"], status: "confirmed" },
  { name: "Vikram Singh", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=vikram&backgroundColor=d1d4f9", events: ["reception"], status: "pending" },
  { name: "Anjali Mehta", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=anjali&backgroundColor=ffd5dc", events: ["wedding", "engagement"], status: "confirmed" },
  { name: "Rohit Verma", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rohit&backgroundColor=c0aede", events: ["wedding", "reception"], status: "confirmed" },
  { name: "Neha Kapoor", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=neha&backgroundColor=ffd5dc", events: ["wedding"], status: "pending" },
  { name: "Karan Malhotra", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=karan&backgroundColor=b6e3f4", events: ["wedding", "reception", "engagement"], status: "confirmed" },
  { name: "Pooja Reddy", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=pooja&backgroundColor=ffdfbf", events: ["engagement", "reception"], status: "confirmed" },
  { name: "Arjun Nair", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=arjun&backgroundColor=d1d4f9", events: ["wedding", "reception"], status: "confirmed" },
  { name: "Divya Joshi", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=divya&backgroundColor=ffd5dc", events: ["wedding"], status: "pending" },
  { name: "Siddharth Rao", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=siddharth&backgroundColor=c0aede", events: ["wedding", "reception", "engagement"], status: "confirmed" },
  { name: "Meera Iyer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=meera&backgroundColor=ffdfbf", events: ["reception"], status: "confirmed" },
  { name: "Aditya Sharma", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=aditya&backgroundColor=b6e3f4", events: ["wedding", "engagement"], status: "confirmed" },
  { name: "Kavita Desai", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=kavita&backgroundColor=ffd5dc", events: ["wedding", "reception", "engagement"], status: "confirmed" },
  { name: "Ravi Menon", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ravi&backgroundColor=d1d4f9", events: ["wedding"], status: "pending" },
  { name: "Anita Rao", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=anita&backgroundColor=ffdfbf", events: ["reception", "engagement"], status: "confirmed" },
  { name: "Suresh Patil", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=suresh&backgroundColor=c0aede", events: ["wedding", "reception"], status: "confirmed" },
  { name: "Rekha Nair", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rekha&backgroundColor=ffd5dc", events: ["wedding", "engagement"], status: "confirmed" },
];

const eventColors = {
  wedding: "bg-rose-100 text-rose-700 border-rose-200",
  reception: "bg-purple-100 text-purple-700 border-purple-200",
  engagement: "bg-blue-100 text-blue-700 border-blue-200"
};

const GuestCard = ({ guest, isOrganized = false, delay = 0 }: { 
  guest: typeof weddingGuests[0], 
  isOrganized?: boolean,
  delay?: number
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative group flex-shrink-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <div className={`w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 ${!isOrganized ? 'bg-gray-200 border-gray-300 opacity-60 grayscale' : 'bg-gradient-to-br from-rose-100 to-pink-100 border-rose-300'} rounded-xl border-2 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl overflow-hidden`}>
          <img 
            src={guest.avatar} 
            alt={guest.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        {isOrganized && guest.status === 'confirmed' && (
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-scaleIn" style={{ animationDelay: `${delay}ms` }}>
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
        
        {isOrganized && guest.status === 'pending' && (
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
            <Clock className="w-3 h-3 text-white" />
          </div>
        )}
      </div>
      
      <div className="mt-2 text-center">
        <p className="text-xs md:text-sm text-gray-700 font-medium whitespace-nowrap">
          {guest.name}
        </p>
        
        {isOrganized && (
          <div className="mt-1 flex flex-wrap gap-1 justify-center max-w-[80px] md:max-w-[100px]">
            {guest.events.map((event, idx) => (
              <span
                key={idx}
                className={`text-[10px] md:text-xs px-2 py-0.5 rounded-full border ${eventColors[event as keyof typeof eventColors]} font-medium transition-all duration-300 ${isHovered ? 'scale-105' : ''}`}
              >
                {event}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Animated stat counter component
const AnimatedStat = ({ value, label, icon }: { value: number, label: string, icon: React.ReactNode }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let start = 0;
        const end = value;
        const duration = 2000;
        const increment = end / (duration / 16);
        
        const counter = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCount(end);
            clearInterval(counter);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
        
        observer.disconnect();
      }
    });
    
    if (countRef.current) {
      observer.observe(countRef.current);
    }
    
    return () => observer.disconnect();
  }, [value]);
  
  return (
    <div ref={countRef} className="text-center">
      <div className="flex items-center justify-center gap-2 mb-1">
        {icon}
        <span className="text-2xl font-bold text-gray-900">{count}</span>
      </div>
      <p className="text-xs text-gray-600">{label}</p>
    </div>
  );
};

export default function HeroSection() {
  const leftCarouselRef = useRef<HTMLDivElement>(null);
  const rightCarouselRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [managingText, setManagingText] = useState("Managing guests");
  const [showNotification, setShowNotification] = useState(false);
  
  // Floating elements animation
  useEffect(() => {
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((el, index) => {
      gsap.to(el, {
        y: -20,
        duration: 2 + index * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.2
      });
    });
  }, []);
  
  useEffect(() => {
    const texts = ["Managing guests", "Tracking RSVPs", "Sending updates", "Creating memories"];
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % texts.length;
      setManagingText(texts[index]);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  // Show notification after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 5000);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!leftCarouselRef.current || !rightCarouselRef.current) return;

    const animateCarousel = (carousel: HTMLDivElement, speed: number = 0.8) => {
      const guestCount = weddingGuests.length;
      const gap = 24;
      const cardWidth = 100;
      const totalWidth = guestCount * (cardWidth + gap);
      
      // Clone elements for seamless loop
      const originalHTML = carousel.innerHTML;
      carousel.innerHTML = originalHTML + originalHTML + originalHTML;
      
      let xPos = -totalWidth * 2;
      
      const animate = () => {
        xPos += speed;
        
        if (xPos >= 0) {
          xPos = -totalWidth;
        }
        
        if (carousel) {
          carousel.style.transform = `translateX(${xPos}px)`;
        }
        
        requestAnimationFrame(animate);
      };
      
      requestAnimationFrame(animate);
    };

    animateCarousel(leftCarouselRef.current, 0.8);
    animateCarousel(rightCarouselRef.current, 0.8);
  }, []);

  return (
    <section className="hero-section relative min-h-screen bg-[rgb(254.7,255,235)] overflow-hidden mb-12 md:mb-16">
      <div className="absolute inset-0 bg-gradient-to-b from-[rgb(254.7,255,235)] to-[rgb(252,250,230)]" />
      
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-element absolute top-20 left-10 w-20 h-20 bg-rose-200 rounded-full opacity-20 blur-xl" />
        <div className="floating-element absolute top-40 right-20 w-32 h-32 bg-yellow-200 rounded-full opacity-20 blur-xl" />
        <div className="floating-element absolute bottom-20 left-1/4 w-24 h-24 bg-orange-200 rounded-full opacity-20 blur-xl" />
        <div className="floating-element absolute bottom-40 right-1/3 w-28 h-28 bg-pink-200 rounded-full opacity-20 blur-xl" />
      </div>
      
      {/* Notification Toast */}
      <div className={`fixed top-4 right-4 z-50 transition-all duration-500 ${showNotification ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
        <div className="bg-white rounded-lg shadow-xl p-4 flex items-center gap-3 max-w-sm">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <Heart className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Priya just confirmed!</p>
            <p className="text-xs text-gray-600">She'll attend all 3 events</p>
          </div>
        </div>
      </div>
      
      {/* Heading with badge */}
      <div className="relative z-10 container mx-auto px-6 pt-20 md:pt-16 pb-4">
        <div className="text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-4 py-2 rounded-full text-sm font-medium mb-6 md:mb-3 animate-fadeInDown">
            <Sparkles className="w-4 h-4" />
            <span>India's #1 Wedding Management Platform</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-light mb-6 md:mb-4 leading-tight">
            <span className="text-gray-400 inline-block animate-fadeInLeft">Manage guests,</span>{' '}
            <span className="text-gray-900 font-normal inline-block animate-fadeInRight">celebrate love</span>
          </h1>
          
          {/* Stats */}
          <div className="flex justify-center gap-8 md:gap-12 mt-10 md:mt-8 animate-fadeInUp">
            <AnimatedStat value={50000} label="Happy Couples" icon={<Heart className="w-4 h-4 text-rose-500" />} />
            <AnimatedStat value={2500000} label="Guests Managed" icon={<Users className="w-4 h-4 text-blue-500" />} />
            <AnimatedStat value={98} label="% Satisfaction" icon={<Sparkles className="w-4 h-4 text-yellow-500" />} />
          </div>
        </div>
      </div>
      
      {/* Guest Cards Carousel - Split into two sections */}
      <div className="absolute top-[65%] md:top-[70%] left-0 right-0 -translate-y-1/2 h-32 sm:h-36 md:h-48 lg:h-56 flex items-center">
        {/* Left side - Unorganized */}
        <div className="absolute left-0 w-1/2 h-full overflow-hidden">
          <div className="relative h-full flex items-start">
            <div ref={leftCarouselRef} className="flex gap-3 md:gap-6 will-change-transform items-start pt-2 md:pt-4">
              {weddingGuests.map((guest, index) => (
                <GuestCard key={index} guest={guest} isOrganized={false} />
              ))}
            </div>
            {/* Fade overlay on right edge */}
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[rgb(254.7,255,235)] to-transparent pointer-events-none" />
          </div>
        </div>
        
        {/* Right side - Organized */}
        <div className="absolute right-0 w-1/2 h-full overflow-hidden">
          <div className="relative h-full flex items-start">
            {/* Fade overlay on left edge */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[rgb(254.7,255,235)] to-transparent pointer-events-none z-10" />
            <div ref={rightCarouselRef} className="flex gap-3 md:gap-6 will-change-transform items-start pt-2 md:pt-4">
              {weddingGuests.map((guest, index) => (
                <GuestCard key={index} guest={guest} isOrganized={true} delay={index * 100} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Centered Wedding Card Interface */}
      <div ref={cardRef} className="absolute left-1/2 top-[65%] md:top-[70%] -translate-x-1/2 -translate-y-1/2 z-20 animate-scaleIn">
        <div className="relative">
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl p-4 md:p-5 w-[280px] sm:w-[320px] md:w-[360px] transform hover:scale-105 transition-transform duration-300">
            <div className="text-center">
              {/* Couple Image with pulse effect */}
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-2 md:mb-3 relative">
                <div className="absolute inset-0 bg-rose-400 rounded-full animate-ping opacity-20"></div>
                <Image
                  src="/couple_image.jpg"
                  alt="Priya & Arjun"
                  width={96}
                  height={96}
                  className="w-full h-full rounded-full object-cover shadow-lg relative z-10"
                />
              </div>

              <h3 className="text-xl md:text-2xl lg:text-3xl font-light text-gray-800 mb-2 md:mb-3">Priya & Arjun</h3>
              
              {/* Quick stats */}
              <div className="flex justify-center gap-6 mb-4">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Calendar className="w-4 h-4 text-rose-500" />
                  <span>Dec 14, 2024</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-rose-500" />
                  <span>Delhi</span>
                </div>
              </div>
              
              <div className="w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 mx-auto mb-2 md:mb-3">
                <DotLottieReact
                  src="https://lottie.host/72cdc41d-a470-4c13-ae83-c9e8bfc2f262/HN98NoUCYf.lottie"
                  loop
                  autoplay
                />
              </div>
              
              <div className="h-8 mb-3 md:mb-4 relative overflow-hidden">
                <div
                  key={managingText}
                  className="absolute inset-0 flex items-center justify-center animate-slideUp"
                >
                  <p className="text-base md:text-lg lg:text-xl text-gray-600">
                    {managingText}...
                  </p>
                </div>
              </div>
              
              {/* Progress indicator */}
              <div className="flex justify-center gap-1 mb-4">
                {['Managing guests', 'Tracking RSVPs', 'Sending updates', 'Creating memories'].map((text, idx) => (
                  <div 
                    key={idx} 
                    className={`h-1 rounded-full transition-all duration-300 ${
                      managingText === text ? 'w-8 bg-rose-500' : 'w-2 bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              <button className="w-full bg-rose-500 text-white py-2.5 rounded-full font-medium text-sm md:text-base hover:bg-rose-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Let's Get Started
              </button>
            </div>
          </div>
          
          {/* WhatsApp style live updates */}
          <div className="absolute -top-2 -right-2 md:-top-3 md:-right-3 bg-green-500 text-white text-xs px-2 py-1 md:px-3 md:py-1.5 rounded-full shadow-lg flex items-center gap-1 md:gap-1.5 animate-bounceIn">
            <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.693.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            <div className="relative">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full animate-pulse"></div>
              <div className="absolute inset-0 w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full animate-ping"></div>
            </div>
            <span className="font-medium text-[10px] md:text-xs">Live</span>
          </div>
          
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes fadeInDown {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes fadeInUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes fadeInLeft {
          from {
            transform: translateX(-20px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes fadeInRight {
          from {
            transform: translateX(20px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes bounceIn {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
        }
        
        .animate-fadeInDown {
          animation: fadeInDown 0.8s ease-out;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out backwards;
        }
        
        .animate-fadeInLeft {
          animation: fadeInLeft 0.8s ease-out;
        }
        
        .animate-fadeInRight {
          animation: fadeInRight 0.8s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.8s ease-out;
        }
        
        .animate-bounceIn {
          animation: bounceIn 0.5s ease-out;
        }
      `}</style>
    </section>
  );
}