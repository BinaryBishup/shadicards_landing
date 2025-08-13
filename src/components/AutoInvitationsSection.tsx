"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import WhatsAppChat from "./WhatsAppChat";
import { generateDemoMessages } from "@/lib/chatMessages";
import { MessageCircle, ChevronRight, MapPin, Users, Languages, Clock, ChevronDown } from "lucide-react";

export default function AutoInvitationsSection() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [language, setLanguage] = useState("en");
  const [messages, setMessages] = useState<any[]>([]);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const [demoStarted, setDemoStarted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const languages = [
    { value: "en", label: "English", script: "English" },
    { value: "hi", label: "Hindi", script: "हिन्दी" },
    { value: "ta", label: "Tamil", script: "தமிழ்" },
    { value: "te", label: "Telugu", script: "తెలుగు" },
    { value: "mr", label: "Marathi", script: "मराठी" },
    { value: "gu", label: "Gujarati", script: "ગુજરાતી" },
    { value: "bn", label: "Bengali", script: "বাংলা" },
    { value: "pa", label: "Punjabi", script: "ਪੰਜਾਬੀ" },
  ];

  const updateDemo = () => {
    // Clear any existing timeouts
    timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    timeoutsRef.current = [];
    
    const demoMessages = generateDemoMessages(language);
    setMessages([]);
    
    let currentDelay = 0;
    
    demoMessages.forEach((message, index) => {
      // Add the actual message
      const messageTimeout = setTimeout(() => {
        setMessages(prev => [...prev, message]);
      }, currentDelay);
      timeoutsRef.current.push(messageTimeout);
      
      currentDelay += 2000; // 2 seconds between messages
      
      // Add typing indicator for next AI message (if there is one)
      if (index < demoMessages.length - 1 && demoMessages[index + 1].sender === "bot") {
        const typingTimeout = setTimeout(() => {
          setMessages(prev => [...prev, { 
            id: `typing-${index}`, 
            text: "", 
            sender: "ai" as const, 
            timestamp: "", 
            isTyping: true 
          }]);
        }, currentDelay - 1500);
        timeoutsRef.current.push(typingTimeout);
        
        // Remove typing indicator when next message appears
        const removeTypingTimeout = setTimeout(() => {
          setMessages(prev => prev.filter(msg => msg.id !== `typing-${index}`));
        }, currentDelay - 100);
        timeoutsRef.current.push(removeTypingTimeout);
      }
    });
  };

  // Start demo on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !demoStarted) {
          setDemoStarted(true);
          updateDemo();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    };
  }, [demoStarted]);

  // Update demo when language changes
  useEffect(() => {
    if (demoStarted) {
      updateDemo();
    }
  }, [language, demoStarted]);

  return (
    <>
      <section ref={sectionRef} className="relative overflow-hidden rounded-t-[2.5rem] rounded-b-[2.5rem]">
        {/* Background layers */}
        <div className="absolute inset-0">
          {/* Dark background for top section */}
          <div className="absolute inset-0 bg-[#1a1a1a]" />
          
          {/* Green background that extends upward */}
          <div className="absolute inset-x-0 bottom-0 h-[45%] lg:h-[50%] bg-[#014f46]">
            {/* Curved transition */}
            <svg className="absolute inset-x-0 -top-24 h-24 w-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path 
                d="M0,120 C300,120 300,40 600,40 C900,40 900,120 1200,120 L1200,120 L0,120 Z" 
                fill="#014f46"
              />
            </svg>
          </div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 py-16 lg:py-24">
          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8 items-center max-w-7xl mx-auto">
            {/* Left Column - Heading, CTA and Features */}
            <div className="space-y-8">
              {/* Header */}
              <div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6">
                  <span className="text-gray-100 font-normal">AI That Speaks</span> <span className="font-medium">Your Language</span>
                </h2>
                <p className="text-lg md:text-xl text-gray-400 max-w-3xl">
                  WhatsApp AI that collects addresses, manages RSVPs, and answers queries in 8+ Indian languages
                </p>
              </div>

              {/* CTA Card */}
              <div className="bg-[#262626] backdrop-blur rounded-2xl p-6 shadow-lg border border-gray-800 max-w-md">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-rose-500 rounded-xl flex items-center justify-center text-white">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Try AI Assistant</h3>
                    <p className="text-sm text-gray-400">Get instant demo on WhatsApp</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="phone" className="text-gray-300 mb-2 block">
                      Your WhatsApp Number
                    </Label>
                    <div className="flex gap-2">
                      <Select value={countryCode} onValueChange={setCountryCode}>
                        <SelectTrigger className="bg-[#1a1a1a] border-gray-700 text-white w-[100px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#262626] border-gray-700">
                          <SelectItem value="+91" className="text-white hover:bg-[#1a1a1a]">
                            <span className="flex items-center gap-2">
                              <span>🇮🇳</span> +91
                            </span>
                          </SelectItem>
                          <SelectItem value="+1" className="text-white hover:bg-[#1a1a1a]">
                            <span className="flex items-center gap-2">
                              <span>🇺🇸</span> +1
                            </span>
                          </SelectItem>
                          <SelectItem value="+44" className="text-white hover:bg-[#1a1a1a]">
                            <span className="flex items-center gap-2">
                              <span>🇬🇧</span> +44
                            </span>
                          </SelectItem>
                          <SelectItem value="+971" className="text-white hover:bg-[#1a1a1a]">
                            <span className="flex items-center gap-2">
                              <span>🇦🇪</span> +971
                            </span>
                          </SelectItem>
                          <SelectItem value="+61" className="text-white hover:bg-[#1a1a1a]">
                            <span className="flex items-center gap-2">
                              <span>🇦🇺</span> +61
                            </span>
                          </SelectItem>
                          <SelectItem value="+65" className="text-white hover:bg-[#1a1a1a]">
                            <span className="flex items-center gap-2">
                              <span>🇸🇬</span> +65
                            </span>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="98765 43210"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500 flex-1"
                      />
                    </div>
                  </div>

                  <Button 
                    disabled={!phoneNumber || phoneNumber.length < 10}
                    className="w-full bg-rose-500 hover:bg-rose-600 text-white py-5"
                  >
                    Experience Live Demo
                    <ChevronRight className="ml-2 w-5 h-5" />
                  </Button>

                  <p className="text-xs text-gray-400 text-center">
                    Free demo • No spam • Your data is safe
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column - Mobile Preview with Language Selector */}
            <div className="flex flex-col items-center">
              {/* WhatsApp Preview */}
              <div className="mb-6">
                <WhatsAppChat 
                  messages={messages}
                  language={language}
                />
              </div>
              
              {/* Language Selector Below Phone */}
              <div className="w-64">
                <div className="bg-white rounded-2xl px-4 py-3 shadow-lg border border-gray-200">
                  <Label className="text-gray-600 text-xs font-medium mb-2 block">Demo Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="bg-gray-50 border-gray-300 text-gray-900 h-11 text-sm px-4 w-full font-medium rounded-xl hover:bg-gray-100 transition-colors focus:ring-2 focus:ring-rose-500 focus:border-rose-500">
                      <div className="flex items-center justify-between w-full">
                        <span>{languages.find(l => l.value === language)?.label || 'Select Language'}</span>
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      </div>
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200 shadow-xl rounded-xl overflow-hidden">
                      {languages.map((lang) => (
                        <SelectItem 
                          key={lang.value} 
                          value={lang.value}
                          className="text-gray-900 hover:bg-gray-50 focus:bg-gray-50 cursor-pointer py-3 px-4 transition-colors"
                        >
                          <div className="flex items-center justify-between w-full">
                            <span className="font-medium">{lang.label}</span>
                            <span className="text-gray-500 text-sm ml-3">{lang.script}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
          
          {/* Features Section - Full Width */}
          <div className="mt-16 w-full relative z-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="group">
                <div className="relative bg-[#262626] backdrop-blur rounded-xl p-4 border border-gray-800 hover:border-gray-700 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-rose-500 flex items-center justify-center mb-3">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-sm font-medium text-gray-200 mb-1">Collects Addresses</h4>
                  <p className="text-xl font-bold text-rose-400">Auto</p>
                </div>
              </div>
              
              <div className="group">
                <div className="relative bg-[#262626] backdrop-blur rounded-xl p-4 border border-gray-800 hover:border-gray-700 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center mb-3">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-sm font-medium text-gray-200 mb-1">Manages RSVPs</h4>
                  <p className="text-xl font-bold text-white">100%</p>
                </div>
              </div>
              
              <div className="group">
                <div className="relative bg-[#262626] backdrop-blur rounded-xl p-4 border border-gray-800 hover:border-gray-700 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-rose-500 flex items-center justify-center mb-3">
                    <Languages className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-sm font-medium text-gray-200 mb-1">Languages</h4>
                  <p className="text-xl font-bold text-rose-400">8+</p>
                </div>
              </div>
              
              <div className="group">
                <div className="relative bg-[#262626] backdrop-blur rounded-xl p-4 border border-gray-800 hover:border-gray-700 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center mb-3">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-sm font-medium text-gray-200 mb-1">Available</h4>
                  <p className="text-xl font-bold text-white">24/7</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Happy Couples Slider */}
          <div className="mt-24 relative z-10">
            <div className="container mx-auto px-6 mb-8">
              <p className="text-white text-center text-lg">Used by 1000s of happy couples to organize their dream weddings</p>
            </div>
            <div className="relative overflow-hidden">
              <div className="flex animate-scroll-clients items-center">
                {/* First set */}
                {[...Array(2)].map((_, setIndex) => (
                  <div key={setIndex} className="flex items-center">
                    {[
                      { names: 'Rahul & Priya', male: 'rahul', female: 'priya' },
                      { names: 'Amit & Sneha', male: 'amit', female: 'sneha' },
                      { names: 'Vikram & Anjali', male: 'vikram', female: 'anjali' },
                      { names: 'Karan & Neha', male: 'karan', female: 'neha' },
                      { names: 'Arjun & Meera', male: 'arjun', female: 'meera' },
                      { names: 'Siddharth & Kavita', male: 'siddharth', female: 'kavita' },
                      { names: 'Ravi & Anita', male: 'ravi', female: 'anita' },
                    ].map((couple, index) => (
                      <div key={`${setIndex}-${index}`} className="flex items-center gap-3 px-8 whitespace-nowrap group">
                        <div className="flex -space-x-3">
                          <div className="w-12 h-12 rounded-full overflow-hidden border-3 border-white bg-white">
                            <img 
                              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${couple.male}&backgroundColor=b6e3f4`} 
                              alt={couple.male} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="w-12 h-12 rounded-full overflow-hidden border-3 border-white bg-white">
                            <img 
                              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${couple.female}&backgroundColor=ffd5dc`} 
                              alt={couple.female} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <span className="text-white text-lg font-medium group-hover:text-rose-300 transition-colors">{couple.names}</span>
                        {index < 6 && <span className="text-white/30 mx-6">•</span>}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <p className="text-sm text-gray-300 text-center mt-12 pb-8 px-6">
            * Includes religion-specific templates for Hindu, Muslim, Christian, Sikh, Jain, and Buddhist weddings
          </p>
        </div>
      </section>
    </>
  );
}