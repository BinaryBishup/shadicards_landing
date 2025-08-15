"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Header from "@/components/Header";
import { 
  UserPlus, Smartphone, Database, Zap, Users, BarChart3, 
  CheckCircle, MapPin, Phone, Mail, Calendar, Gift,
  ArrowRight, Check, Sparkles, Upload, Download, Shield
} from "lucide-react";

// Shuffle array function for random order
const shuffleArray = (array: any[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const guestCharacters = [
  // Left side characters (2) - rotated 90 degrees
  {
    id: 1,
    src: "/guests/1.svg",
    position: "left",
    className: "left-0 top-1/4 w-32 lg:w-48 transform rotate-90"
  },
  {
    id: 2,
    src: "/guests/2.svg",
    position: "left",
    className: "left-0 bottom-1/4 w-28 lg:w-44 transform rotate-90"
  },
  // Right side characters (2) - rotated -90 degrees
  {
    id: 10,
    src: "/guests/10.svg",
    position: "right",
    className: "right-0 top-1/4 w-32 lg:w-48 transform -rotate-90"
  },
  {
    id: 11,
    src: "/guests/11.svg",
    position: "right",
    className: "right-0 bottom-1/4 w-28 lg:w-44 transform -rotate-90"
  },
  // Bottom characters (3) - no rotation
  {
    id: 5,
    src: "/guests/5.svg",
    position: "bottom",
    className: "bottom-0 left-1/4 w-24 lg:w-36"
  },
  {
    id: 8,
    src: "/guests/8.svg",
    position: "bottom",
    className: "bottom-0 left-1/2 transform -translate-x-1/2 w-26 lg:w-40"
  },
  {
    id: 9,
    src: "/guests/9.svg",
    position: "bottom",
    className: "bottom-0 right-1/4 w-24 lg:w-36"
  },
  // Top characters (remaining 4) - rotated 180 degrees
  {
    id: 3,
    src: "/guests/3.svg",
    position: "top",
    className: "top-0 left-1/4 w-24 lg:w-36 transform rotate-180"
  },
  {
    id: 4,
    src: "/guests/4.svg",
    position: "top",
    className: "top-0 left-1/2 transform -translate-x-1/2 rotate-180 w-26 lg:w-40"
  },
  {
    id: 6,
    src: "/guests/6.svg",
    position: "top",
    className: "top-0 right-1/2 transform translate-x-1/2 rotate-180 w-24 lg:w-36"
  },
  {
    id: 7,
    src: "/guests/7.svg",
    position: "top",
    className: "top-0 right-1/4 w-24 lg:w-36 transform rotate-180"
  }
];

export default function GuestManagementPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const charactersRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (heroRef.current) {
      // Create randomized order for character animation
      const shuffledCharacters = shuffleArray(guestCharacters.map((char, index) => ({ ...char, originalIndex: index })));
      
      // Animate characters in random order with sliding effect
      shuffledCharacters.forEach(({ originalIndex, position }, index) => {
        const element = charactersRef.current[originalIndex];
        if (element) {
          let startX = 0, startY = 0;
          
          // Set initial positions based on character position
          switch (position) {
            case 'left':
              startX = -300;
              startY = 0;
              break;
            case 'top':
              startX = 0;
              startY = -300;
              break;
            case 'right':
              startX = 300;
              startY = 0;
              break;
            case 'bottom':
              startX = 0;
              startY = 300;
              break;
          }
          
          gsap.set(element, {
            x: startX,
            y: startY,
            opacity: 0,
            scale: 0.8,
          });

          gsap.to(element, {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            delay: index * 0.2,
          });

          // Add subtle floating animation after slide-in
          gsap.to(element, {
            y: "-8px",
            duration: 2 + Math.random() * 1,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: (index * 0.2) + 1,
          });
        }
      });

      // Animate mobile characters
      const mobileChars = [
        ".mobile-char-left-1", ".mobile-char-left-2",
        ".mobile-char-right-1", ".mobile-char-right-2",
        ".mobile-char-top-1", ".mobile-char-top-2",
        ".mobile-char-bottom-1", ".mobile-char-bottom-2"
      ];
      
      const shuffledMobileChars = shuffleArray(mobileChars);
      
      shuffledMobileChars.forEach((selector, index) => {
        const element = document.querySelector(selector);
        if (element) {
          let startX = 0, startY = 0;
          
          if (selector.includes("left")) {
            startX = -100;
          } else if (selector.includes("right")) {
            startX = 100;
          } else if (selector.includes("top")) {
            startY = -100;
          } else if (selector.includes("bottom")) {
            startY = 100;
          }
          
          gsap.set(element, {
            x: startX,
            y: startY,
            opacity: 0,
            scale: 0.8,
          });

          gsap.to(element, {
            x: 0,
            y: 0,
            opacity: 0.7,
            scale: 1,
            duration: 0.7,
            ease: "back.out(1.7)",
            delay: index * 0.2,
          });

          // Add floating animation
          gsap.to(element, {
            y: "-5px",
            duration: 2.5 + Math.random() * 1.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: (index * 0.2) + 1,
          });
        }
      });

      // Animate center content after a short delay
      gsap.fromTo(
        ".hero-content",
        {
          opacity: 0,
          y: 30,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          delay: 1.2, // Start after most characters have appeared
        }
      );
    }
  }, []);

  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Smart Guest Lists",
      description: "Organize guests by family, friends, colleagues, and events",
      details: "Intelligent categorization"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "One-Tap Registration",
      description: "Guests register instantly when they tap your smart card",
      details: "Zero friction experience"
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Complete Profiles",
      description: "Collect contact info, preferences, and dietary requirements",
      details: "Comprehensive guest data"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-time Updates",
      description: "All guest data syncs instantly across all devices",
      details: "Always up-to-date"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Guest Analytics",
      description: "Track RSVPs, attendance, and engagement metrics",
      details: "Data-driven insights"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Privacy First",
      description: "GDPR compliant with secure data encryption",
      details: "Guest privacy protected"
    }
  ];

  const managementFeatures = [
    {
      icon: <UserPlus className="w-6 h-6" />,
      title: "Easy Import/Export",
      description: "Import existing guest lists and export to any format"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "RSVP Tracking",
      description: "Real-time RSVP status with automated reminders"
    },
    {
      icon: <Gift className="w-6 h-6" />,
      title: "Event Assignment",
      description: "Assign guests to specific events and ceremonies"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Communication Hub",
      description: "Send updates and announcements to guest groups"
    }
  ];

  const benefits = [
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Save 20+ Hours",
      description: "Eliminate manual guest list management and data entry",
      impact: "Automated workflow"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "99% Accuracy",
      description: "Guests provide their own information directly",
      impact: "Error-free data"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Real-time Insights",
      description: "Know exactly who's coming and what they need",
      impact: "Perfect planning"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Private",
      description: "Enterprise-grade security with GDPR compliance",
      impact: "Peace of mind"
    }
  ];

  const stats = [
    { number: "10K+", label: "Couples Trust Us", icon: <Users className="w-6 h-6" /> },
    { number: "95%", label: "Guest Completion", icon: <CheckCircle className="w-6 h-6" /> },
    { number: "20+", label: "Hours Saved", icon: <Zap className="w-6 h-6" /> },
    { number: "99%", label: "Data Accuracy", icon: <Database className="w-6 h-6" /> }
  ];

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-[70vh] lg:h-[85vh] py-6 lg:py-12 bg-[rgb(254.7,255,235)] overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[rgb(254.7,255,235)] to-[rgb(252,250,230)]" />
          <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-100 rounded-full filter blur-3xl opacity-20" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-100 rounded-full filter blur-3xl opacity-20" />
        </div>

        {/* Guest Characters */}
        {guestCharacters.map((character, index) => (
          <div
            key={character.id}
            ref={(el) => {
              charactersRef.current[index] = el;
            }}
            className={`absolute ${character.className} hidden lg:block`}
          >
            <img
              src={character.src}
              alt={`Guest ${character.id}`}
              className="w-full h-auto drop-shadow-lg"
            />
          </div>
        ))}

        {/* Mobile Guest Characters */}
        <div className="lg:hidden absolute inset-0 pointer-events-none">
          {/* Corner characters - smaller */}
          <div className="absolute left-2 top-12 w-10 opacity-70 mobile-char-left-1">
            <img src="/guests/1.svg" alt="Guest" className="w-full h-auto transform rotate-90" />
          </div>
          <div className="absolute left-2 bottom-12 w-10 opacity-70 mobile-char-left-2">
            <img src="/guests/2.svg" alt="Guest" className="w-full h-auto transform rotate-90" />
          </div>
          <div className="absolute right-2 top-12 w-10 opacity-70 mobile-char-right-1">
            <img src="/guests/10.svg" alt="Guest" className="w-full h-auto transform -rotate-90" />
          </div>
          <div className="absolute right-2 bottom-12 w-10 opacity-70 mobile-char-right-2">
            <img src="/guests/11.svg" alt="Guest" className="w-full h-auto transform -rotate-90" />
          </div>
          
          {/* Top characters - larger */}
          <div className="absolute top-2 left-1/4 w-12 opacity-70 mobile-char-top-1">
            <img src="/guests/3.svg" alt="Guest" className="w-full h-auto transform rotate-180" />
          </div>
          <div className="absolute top-2 right-1/4 w-12 opacity-70 mobile-char-top-2">
            <img src="/guests/4.svg" alt="Guest" className="w-full h-auto transform rotate-180" />
          </div>
          
          {/* Bottom characters - larger */}
          <div className="absolute bottom-4 left-1/4 w-12 opacity-70 mobile-char-bottom-1">
            <img src="/guests/8.svg" alt="Guest" className="w-full h-auto" />
          </div>
          <div className="absolute bottom-4 right-1/4 w-12 opacity-70 mobile-char-bottom-2">
            <img src="/guests/9.svg" alt="Guest" className="w-full h-auto" />
          </div>
        </div>

        {/* Center Content */}
        <div className="relative z-10 container mx-auto px-6 h-full flex items-center justify-center">
          <div className="hero-content text-center max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-4 py-2 rounded-full text-sm font-medium mb-3">
              <Sparkles className="w-4 h-4" />
              <span>Smart Guest Management</span>
            </div>
            
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 lg:mb-3 leading-tight">
              GUESTS MANAGER
            </h1>
            
            <p className="text-xs lg:text-lg text-gray-600 mb-3 lg:mb-5 max-w-sm lg:max-w-2xl mx-auto leading-relaxed">
              <span className="lg:hidden">Automate guest management, from invite to check-in.</span>
              <span className="hidden lg:inline">Automate guest management, from invite to check-in. Smart technology that handles everything so you can focus on celebrating.</span>
            </p>
            
            <div className="flex flex-row gap-2 lg:gap-3 justify-center px-2 lg:px-0">
              <button className="group bg-rose-600 hover:bg-rose-700 text-white px-3 lg:px-8 py-2 lg:py-3 rounded-full font-medium text-xs lg:text-base transition-all shadow-lg hover:shadow-xl hover:scale-105 flex-1 lg:flex-none">
                <span className="hidden lg:inline">Start Managing Guests</span>
                <span className="lg:hidden">Start Managing</span>
                <ArrowRight className="w-3 lg:w-4 h-3 lg:h-4 ml-1 lg:ml-2 inline group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 px-3 lg:px-8 py-2 lg:py-3 rounded-full font-medium text-xs lg:text-base transition-all hover:bg-white flex-1 lg:flex-none">
                <span className="hidden lg:inline">See How It Works</span>
                <span className="lg:hidden">How It Works</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              How Guest Management Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three simple steps to complete guest management automation
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-rose-500 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Import or Add Guests</h3>
                <p className="text-gray-600">Upload your existing guest list or add guests manually to get started.</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Guests Self-Register</h3>
                <p className="text-gray-600">When guests tap their smart card, they complete their profiles automatically.</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Perfect Planning</h3>
                <p className="text-gray-600">Use complete guest data for seating, catering, and event coordination.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Powerful Management Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need for comprehensive guest management
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-rose-600 rounded-2xl flex items-center justify-center text-white mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <p className="text-sm text-rose-600 font-medium">{feature.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Management Tools */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Complete Management Suite
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              All the tools you need in one powerful platform
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {managementFeatures.map((feature, index) => (
              <div key={index} className="bg-gradient-to-b from-rose-50 to-rose-50/30 rounded-2xl p-6 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl flex items-center justify-center text-white mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-rose-50 to-rose-50/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Why Couples Love Our System
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real benefits that transform your wedding planning experience
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl flex items-center justify-center text-white mb-6">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 mb-4">{benefit.description}</p>
                <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
                  <CheckCircle className="w-4 h-4" />
                  {benefit.impact}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Proven Results
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Numbers that speak for themselves
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-rose-600 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 text-sm lg:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-rose-600 via-rose-700 to-rose-800">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
              Ready to Simplify Guest Management?
            </h2>
            <p className="text-xl text-rose-100 mb-8 max-w-2xl mx-auto">
              Join thousands of couples who've streamlined their wedding planning with smart guest management
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-rose-600 hover:text-rose-700 px-8 py-4 rounded-full font-medium text-lg transition-all shadow-lg hover:shadow-xl">
                Start Managing Guests
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-rose-600 px-8 py-4 rounded-full font-medium text-lg transition-all">
                Book a Demo
              </button>
            </div>
            
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-rose-100">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm">95% Completion Rate</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                <span className="text-sm">Instant Setup</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span className="text-sm">GDPR Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}