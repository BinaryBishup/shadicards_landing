"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Camera, Scan, Download, Users, Sparkles, 
  Shield, Zap, Share2, Search, Image, 
  ScanFace, CloudUpload, Wand2, GalleryVertical
} from "lucide-react";

// Register GSAP plugins only on client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function EventPictureSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const section = sectionRef.current;
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
            gsap.fromTo(".picture-header", 
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
            );

            // Animate demo container
            gsap.fromTo(".demo-container", 
              { y: 50, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: "power3.out" }
            );
          },
          once: true
        });

        // Demo animation trigger
        ScrollTrigger.create({
          trigger: ".demo-container",
          start: "top 70%",
          onEnter: () => {
            // Start the face scanning animation
            startScanAnimation();
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

  const startScanAnimation = () => {
    // Animate photo grid appearance
    gsap.fromTo(".photo-item",
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: {
          grid: [3, 4],
          from: "random",
          amount: 1
        },
        ease: "back.out(1.7)",
        delay: 0.5
      }
    );

    // Animate scan line
    const scanLine = gsap.timeline({ repeat: 2, delay: 1.5 });
    scanLine.fromTo(".scan-line",
      { y: -10, opacity: 0 },
      { y: 300, opacity: 1, duration: 2, ease: "none" }
    );

    // Animate face detection boxes
    setTimeout(() => {
      gsap.to(".face-box", {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        stagger: 0.1,
        ease: "back.out(1.7)"
      });

      // Highlight matched faces
      setTimeout(() => {
        gsap.to(".matched-face", {
          borderColor: "#10b981",
          backgroundColor: "rgba(16, 185, 129, 0.1)",
          duration: 0.5,
          stagger: 0.1
        });

        // Show collection animation
        setTimeout(() => {
          gsap.to(".matched-photo", {
            x: 0,
            y: 0,
            scale: 0.8,
            duration: 1,
            ease: "power2.inOut"
          });

          gsap.to(".collection-preview", {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            delay: 0.8,
            ease: "back.out(1.7)"
          });
        }, 1000);
      }, 1500);
    }, 3000);
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
        {/* Section Header */}
        <div className="picture-header text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Photo Distribution</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6">
            <span className="font-normal">Every guest gets their photos</span>
            <br />
            <span className="text-gray-600">instantly with AI magic</span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Upload event photos once. Our AI identifies faces and creates personal galleries 
            for each guest. No more WhatsApp chaos or missed memories.
          </p>
        </div>

        {/* Interactive Demo */}
        <div className="demo-container max-w-6xl mx-auto mb-20">
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-gray-100">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Left: Photo Grid with Face Detection */}
              <div className="relative">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  AI scans all event photos
                </h3>
                
                <div className="relative bg-gray-50 rounded-2xl p-6 overflow-hidden">
                  {/* Photo Grid */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 0, hasBox: true, boxPos: { top: '25%', left: '30%' }, matched: false, img: '/event_pictures/picture1.jpg' },
                      { id: 1, hasBox: false, boxPos: null, matched: false, img: '/event_pictures/picture2.jpg' },
                      { id: 2, hasBox: true, boxPos: { top: '35%', left: '40%' }, matched: true, img: '/event_pictures/match1.jpg' },
                      { id: 3, hasBox: true, boxPos: { top: '20%', left: '45%' }, matched: false, img: '/event_pictures/picture3.jpg' },
                      { id: 4, hasBox: false, boxPos: null, matched: false, img: '/event_pictures/picture4.jpg' },
                      { id: 5, hasBox: true, boxPos: { top: '40%', left: '35%' }, matched: true, img: '/event_pictures/match2.jpg' },
                      { id: 6, hasBox: true, boxPos: { top: '30%', left: '25%' }, matched: false, img: '/event_pictures/picture5.jpg' },
                      { id: 7, hasBox: false, boxPos: null, matched: false, img: '/event_pictures/picture1.jpg' },
                      { id: 8, hasBox: true, boxPos: { top: '45%', left: '50%' }, matched: true, img: '/event_pictures/match3.jpg' },
                      { id: 9, hasBox: true, boxPos: { top: '25%', left: '40%' }, matched: false, img: '/event_pictures/picture2.jpg' },
                      { id: 10, hasBox: true, boxPos: { top: '35%', left: '30%' }, matched: true, img: '/event_pictures/match4.jpg' },
                      { id: 11, hasBox: true, boxPos: { top: '40%', left: '45%' }, matched: false, img: '/event_pictures/picture3.jpg' }
                    ].map((photo) => (
                      <div
                        key={photo.id}
                        className={`photo-item relative aspect-square bg-gray-200 rounded-lg overflow-hidden ${
                          photo.matched ? 'matched-photo' : ''
                        }`}
                      >
                        {/* Real wedding image */}
                        <img 
                          src={photo.img} 
                          alt={`Wedding photo ${photo.id + 1}`}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        
                        {/* Face detection boxes */}
                        {photo.hasBox && photo.boxPos && (
                          <div
                            className={`face-box absolute w-1/3 h-1/3 border-2 rounded-lg opacity-0 scale-0 ${
                              photo.matched
                                ? 'matched-face border-rose-500' 
                                : 'border-gray-400'
                            }`}
                            style={photo.boxPos}
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Scan Line */}
                  <div className="scan-line absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent opacity-0" />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">2,450</p>
                    <p className="text-sm text-gray-600">Total Photos</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-rose-500">342</p>
                    <p className="text-sm text-gray-600">Faces Detected</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">186</p>
                    <p className="text-sm text-gray-600">Unique Guests</p>
                  </div>
                </div>
              </div>

              {/* Right: Guest Access */}
              <div className="relative">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Guests scan & download instantly
                </h3>

                {/* Face Scan UI */}
                <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                  <div className="relative mx-auto w-48 h-48 mb-6">
                    {/* Scanning circle */}
                    <div className="absolute inset-0 rounded-full border-4 border-dashed border-gray-300 animate-spin-slow" />
                    <div className="absolute inset-2 rounded-full overflow-hidden">
                      {/* Guest face image */}
                      <img 
                        src="/event_pictures/match2.jpg" 
                        alt="Guest face scan"
                        className="w-full h-full object-cover"
                      />
                      {/* Scanning overlay */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-500/20 to-transparent animate-pulse" />
                    </div>
                    {/* Scan icon overlay */}
                    <div className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-lg">
                      <Scan className="w-6 h-6 text-rose-600" />
                    </div>
                  </div>
                  
                  <p className="text-center text-gray-600 mb-2">Scanning face...</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-rose-500 h-2 rounded-full transition-all duration-500" style={{ width: '75%' }} />
                  </div>
                </div>

                {/* Collection Preview */}
                <div className="collection-preview opacity-0 scale-95">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-rose-500 rounded-lg flex items-center justify-center text-white font-bold">
                        PS
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Priya Sharma</p>
                        <p className="text-sm text-gray-600">127 photos found!</p>
                      </div>
                    </div>
                    
                    {/* Mini photo grid */}
                    <div className="grid grid-cols-4 gap-1 mb-3">
                      {[
                        '/event_pictures/match1.jpg',
                        '/event_pictures/match2.jpg',
                        '/event_pictures/match3.jpg',
                        '/event_pictures/match4.jpg',
                        '/event_pictures/match5.jpg',
                        '/event_pictures/match6.jpg',
                        '/event_pictures/match7.jpg',
                        '/event_pictures/match1.jpg'
                      ].map((src, i) => (
                        <img 
                          key={i} 
                          src={src} 
                          alt={`Guest photo ${i + 1}`}
                          className="aspect-square rounded object-cover" 
                        />
                      ))}
                    </div>

                    <button className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      Download All Photos
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How it Works */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold text-gray-900 text-center mb-12">
            How it works
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Upload Photos",
                description: "Upload all event photos to ShadiCards after your wedding",
                icon: <CloudUpload className="w-6 h-6" />
              },
              {
                step: "2",
                title: "AI Processing",
                description: "Our AI detects and groups faces across all photos automatically",
                icon: <Wand2 className="w-6 h-6" />
              },
              {
                step: "3",
                title: "Guest Access",
                description: "Guests scan their face and instantly get all their photos",
                icon: <GalleryVertical className="w-6 h-6" />
              }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-rose-600">
                  {item.icon}
                </div>
                <div className="text-4xl font-bold text-gray-200 mb-2">{item.step}</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button 
            onClick={() => window.location.href = 'https://dashboard.shadicards.in/auth/login'}
            className="bg-rose-500 text-white py-4 px-10 rounded-full font-medium text-base hover:bg-rose-600 transition-colors shadow-lg hover:shadow-xl">
            Enable AI Photo Distribution
          </button>
          <p className="text-sm text-gray-500 mt-4">Available with Premium plans</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </section>
  );
}