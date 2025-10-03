"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Globe, Calendar, MessageSquare, CheckSquare, ArrowRight, Sparkles, Play } from "lucide-react";

export default function WorkspaceHeroSection() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const featureTexts = [
    "Create your wedding website",
    "Manage Guests",
    "Collect Guest Information",
    "Create Multiple Events",
    "Control Event Access",
    "Send WhatsApp Reminders"
  ];

  useEffect(() => {
    const currentText = featureTexts[currentFeatureIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing - add one character at a time
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          // Wait before deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting - remove one character at a time
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          // Move to next feature
          setIsDeleting(false);
          setCurrentFeatureIndex((prev) => (prev + 1) % featureTexts.length);
        }
      }
    }, isDeleting ? 30 : 80);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentFeatureIndex, featureTexts]);

  const features = [
    {
      id: "website",
      title: "Free Wedding Website",
      icon: <Globe className="w-6 h-6" />,
      description: "Create beautiful wedding websites at no cost.",
      image: "/dashboard/wedding_website.jpg"
    },
    {
      id: "whatsapp",
      title: "Automated Whatsapp Reminders",
      icon: <MessageSquare className="w-6 h-6" />,
      description: "Send automated reminders to your guests.",
      image: "/dashboard/whatsapp_reminders.jpg"
    },
    {
      id: "delivery",
      title: "Direct Cards Delivery to guests",
      icon: <Calendar className="w-6 h-6" />,
      description: "Deliver cards directly to your guests' doorstep.",
      image: "/dashboard/direct_delivery.jpg"
    },
    {
      id: "events",
      title: "Event Wise Pages",
      icon: <Calendar className="w-6 h-6" />,
      description: "Create separate pages for each wedding event.",
      image: "/dashboard/events.jpg"
    },
    {
      id: "guests",
      title: "Guest Data Collection",
      icon: <MessageSquare className="w-6 h-6" />,
      description: "Collect and manage guest information effortlessly.",
      image: "/dashboard/guests_data.jpg"
    },
    {
      id: "rsvp",
      title: "RSVP",
      icon: <CheckSquare className="w-6 h-6" />,
      description: "Track guest responses and attendance.",
      image: "/dashboard/rsvp.jpg"
    }
  ];

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phoneNumber = e.target.value.replace(/[^\d]/g, "");
    setPhoneNumber(phoneNumber);
    setPhoneError("");
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (phoneNumber.length < 10) {
      setPhoneError("Please enter a valid phone number");
      return;
    }

    // Redirect to dashboard login with prefilled number
    window.location.href = `https://dashboard.shadicards.in/auth/login?number=${countryCode}${phoneNumber}`;
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setShowPlayButton(true);
  };

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
      setShowPlayButton(false);
    }
  };

  return (
    <section className="min-h-screen pt-24 pb-16 bg-[rgb(254.7,255,235)] overflow-hidden">
      <div className="container mx-auto px-6 lg:px-6">
        {/* Two Column Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
          {/* Left Column - Text Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 text-sm font-semibold rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span>India's First Smart Wedding Cards</span>
            </div>

            {/* Dynamic Typing Title */}
            <style jsx>{`
              @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
              }
              .cursor-blink {
                animation: blink 1s step-end infinite;
              }
            `}</style>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="inline-block min-h-[70px] md:min-h-[80px] lg:min-h-[90px] align-top">
                {displayText}
                <span className="cursor-blink ml-1">|</span>
              </span>
              <br />
              <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                absolutely free
              </span>
            </h1>

            <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed max-w-xl">
              India's smartest wedding invitation platform. Create beautiful websites, manage guests, send smart cards, and automate your entire wedding planning process.
            </p>

            {/* Phone Input CTA - Reduced Size */}
            <form onSubmit={handlePhoneSubmit} className="max-w-xl">
              <div className="flex flex-col sm:flex-row items-stretch gap-2">
                <div className="flex-1 w-full">
                  <div className="flex items-center bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 focus-within:border-rose-500 transition-colors h-12">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="flex items-center px-3 py-2 text-sm font-semibold text-gray-700 bg-transparent focus:outline-none cursor-pointer"
                    >
                      <option value="+91">🇮🇳 +91</option>
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+61">🇦🇺 +61</option>
                      <option value="+971">🇦🇪 +971</option>
                      <option value="+65">🇸🇬 +65</option>
                      <option value="+60">🇲🇾 +60</option>
                    </select>
                    <div className="w-px h-6 bg-gray-300"></div>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      placeholder="Enter mobile number"
                      className="flex-1 px-3 py-2 text-sm focus:outline-none bg-transparent"
                      maxLength={15}
                      required
                    />
                  </div>
                  {phoneError && (
                    <p className="text-red-500 text-xs mt-1.5 ml-3">{phoneError}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white px-6 h-12 rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group whitespace-nowrap"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          </div>

          {/* Right Column - Video */}
          <div className="relative">
            <div className="relative w-full bg-white rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-gray-200">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  muted
                  playsInline
                  onEnded={handleVideoEnd}
                >
                  <source src="/introduction_video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Video Play Button - Shows after video ends */}
                {showPlayButton && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group">
                    <button
                      className="w-20 h-20 bg-rose-600 hover:bg-rose-700 rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-all"
                      onClick={handlePlayClick}
                    >
                      <Play className="w-10 h-10 text-white ml-1" fill="white" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Spacing */}
        <div className="h-12 md:h-20 lg:h-24"></div>
      </div>

      {/* Features Grid - Full Width on Mobile */}
      <div className="w-full lg:px-6 xl:px-12">
        {/* Heading Section */}
        <div className="bg-[rgb(254.7,255,235)] px-6 md:px-8 lg:px-16 xl:px-24 py-8 md:py-10 lg:py-12 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-normal text-gray-900 mb-4 md:mb-6 leading-tight">
              Create your perfect{" "}
              <span className="font-semibold text-rose-600">wedding experience</span>
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-gray-600 font-normal">
              Smart cards, beautiful websites, and seamless guest management
            </p>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="bg-[rgb(254.7,255,235)]">
          <div className="grid grid-cols-2 lg:grid-cols-3 lg:border-l border-t border-gray-400">
                {features.map((feature, index) => (
                  <div
                    key={feature.id}
                    className={`group bg-white overflow-hidden hover:shadow-lg transition-all duration-300 border-b border-t border-gray-400 lg:border-r lg:border-r-gray-400 flex flex-col ${
                      index % 2 === 0 ? 'border-r border-r-gray-400' : ''
                    }`}
                  >
                    {/* Feature Image - Mobile First */}
                    <div className="relative bg-white overflow-hidden px-2 md:px-6 lg:px-8 pt-2 md:pt-6 lg:pt-8 pb-2 md:pb-6 lg:pb-8 lg:hidden">
                      <div className="relative w-full rounded-lg overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100" style={{ aspectRatio: '16/9' }}>
                        <Image
                          src={feature.image}
                          alt={feature.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
                          unoptimized
                        />
                      </div>
                    </div>

                    {/* Feature Header - Mobile Only */}
                    <div className="px-2 pt-2 md:p-6 lg:p-8 pb-2 md:pb-4 lg:hidden">
                      <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2 mb-2">
                        {feature.title}
                        <ArrowRight className="w-3 h-3 text-gray-400 group-hover:text-rose-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                      </h3>
                    </div>

                    {/* Feature Description - Mobile Only */}
                    <div className="lg:hidden px-2 pb-3">
                      <p className="text-gray-600 text-xs leading-relaxed">
                        {feature.description}
                      </p>
                    </div>

                    {/* Feature Image - Desktop */}
                    <div className="hidden lg:block relative bg-white overflow-hidden px-4 md:px-6 lg:px-8 pb-4 md:pb-6 lg:pb-8 pt-4 md:pt-6 lg:pt-8">
                      <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100" style={{ aspectRatio: '16/10' }}>
                        <Image
                          src={feature.image}
                          alt={feature.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
                          unoptimized
                        />
                      </div>
                    </div>

                    {/* Feature Header - Desktop */}
                    <div className="hidden lg:block p-4 md:p-6 lg:p-8 pb-3 md:pb-4 lg:pt-0">
                      <h3 className="text-sm md:text-base lg:text-lg font-semibold text-gray-900 flex items-center gap-2 mb-2">
                        {feature.title}
                        <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-gray-400 group-hover:text-rose-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                      </h3>
                      <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}