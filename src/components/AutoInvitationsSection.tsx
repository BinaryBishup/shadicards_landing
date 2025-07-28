"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

interface ChatMessage {
  id: number;
  type: 'sent' | 'received' | 'typing-sent' | 'typing-received';
  text?: string;
  component?: React.ReactNode;
  timestamp: string;
  delay: number;
  typingDuration?: number;
}

const InvitationMessage = () => (
  <div className="space-y-2">
    <div className="relative w-full h-32 rounded-lg overflow-hidden">
      <Image
        src="/couple_image.jpg"
        alt="Priya & Arjun"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-2 left-2 text-white">
        <h3 className="text-base font-semibold">Priya & Arjun</h3>
        <p className="text-xs opacity-90">are getting married!</p>
      </div>
    </div>
    
    <div className="space-y-1.5">
      <p className="text-xs">Dear Aaryan,</p>
      <p className="text-xs leading-relaxed">
        You're cordially invited to celebrate our wedding! 💍
      </p>
      <div className="bg-rose-50 p-2 rounded-lg space-y-0.5">
        <p className="text-xs font-semibold text-rose-700">📅 Save the Dates:</p>
        <p className="text-[10px] text-rose-600">• Mehendi: Feb 12, 2025</p>
        <p className="text-[10px] text-rose-600">• Sangeet: Feb 13, 2025</p>
        <p className="text-[10px] text-rose-600">• Wedding: Feb 14, 2025</p>
      </div>
      <p className="text-xs">📍 Venue: The Taj Palace, Mumbai</p>
    </div>
    
    <div className="space-y-1.5 pt-1">
      <button className="w-full bg-green-500 text-white py-2 rounded-lg font-medium text-xs hover:bg-green-600 transition-colors">
        ✓ Yes, I'll Attend
      </button>
      <button className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-lg font-medium text-xs hover:bg-gray-50 transition-colors">
        📍 Add My Location for Card Delivery
      </button>
    </div>
  </div>
);

const chatMessages: ChatMessage[] = [
  {
    id: 1,
    type: 'typing-sent',
    text: '',
    timestamp: '10:30 AM',
    delay: 300,
    typingDuration: 800
  },
  {
    id: 2,
    type: 'sent',
    component: <InvitationMessage />,
    timestamp: '10:30 AM',
    delay: 300
  },
  {
    id: 3,
    type: 'typing-received',
    text: 'OMG! So happy for you both! 🎉',
    timestamp: '10:32 AM',
    delay: 1500,
    typingDuration: 1000
  },
  {
    id: 4,
    type: 'received',
    text: 'OMG! So happy for you both! 🎉',
    timestamp: '10:32 AM',
    delay: 1500
  },
  {
    id: 5,
    type: 'typing-received',
    text: 'Yes, I\'ll definitely attend all events!',
    timestamp: '10:32 AM',
    delay: 2000,
    typingDuration: 800
  },
  {
    id: 6,
    type: 'received',
    text: 'Yes, I\'ll definitely attend all events!',
    timestamp: '10:32 AM',
    delay: 2000
  },
  {
    id: 7,
    type: 'typing-sent',
    text: '',
    timestamp: '10:33 AM',
    delay: 2800,
    typingDuration: 800
  },
  {
    id: 8,
    type: 'sent',
    text: '🤖 Wonderful! I\'ve marked your attendance. Please share your address for the physical invitation card.',
    timestamp: '10:33 AM',
    delay: 2800
  },
  {
    id: 9,
    type: 'typing-received',
    text: '📍 Sharing my location...',
    timestamp: '10:34 AM',
    delay: 3800,
    typingDuration: 600
  },
  {
    id: 10,
    type: 'received',
    text: '📍 Sharing my location...',
    timestamp: '10:34 AM',
    delay: 3800
  },
  {
    id: 11,
    type: 'typing-sent',
    text: '',
    timestamp: '10:34 AM',
    delay: 4600,
    typingDuration: 1000
  },
  {
    id: 12,
    type: 'sent',
    text: '✅ Perfect! Your wedding card will be delivered to:\n\n📮 123 Park Street, Andheri West\nMumbai - 400053\n\nYou\'ll receive a tracking update soon!',
    timestamp: '10:34 AM',
    delay: 4600
  },
  {
    id: 13,
    type: 'typing-sent',
    text: '',
    timestamp: '10:35 AM',
    delay: 5800,
    typingDuration: 800
  },
  {
    id: 14,
    type: 'sent',
    text: '🎊 We\'re excited to celebrate with you! I\'ll send you reminders and updates as we get closer to the events.',
    timestamp: '10:35 AM',
    delay: 5800
  }
];

const floatingApps = [
  { name: 'WhatsApp', icon: '💬', color: 'bg-green-500', position: { top: '10%', left: '5%' } },
  { name: 'Messages', icon: '💬', color: 'bg-blue-500', position: { top: '20%', right: '5%' } },
  { name: 'Instagram', icon: '📸', color: 'bg-gradient-to-br from-purple-500 to-pink-500', position: { top: '40%', left: '3%' } },
  { name: 'Gmail', icon: '📧', color: 'bg-red-500', position: { bottom: '30%', right: '3%' } },
  { name: 'Telegram', icon: '✈️', color: 'bg-sky-500', position: { bottom: '40%', left: '5%' } },
  { name: 'Facebook', icon: '👤', color: 'bg-blue-600', position: { bottom: '20%', right: '8%' } },
];

export default function AutoInvitationsSection() {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [currentlyTyping, setCurrentlyTyping] = useState<number | null>(null);
  const [userTypingText, setUserTypingText] = useState('');
  const [currentUserMessage, setCurrentUserMessage] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasStarted]);

  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    const showMessages = async () => {
      for (const message of chatMessages) {
        await new Promise(resolve => setTimeout(resolve, message.delay - (visibleMessages.length > 0 ? chatMessages[visibleMessages[visibleMessages.length - 1] - 1].delay : 0)));
        
        if (message.type === 'typing-sent') {
          setCurrentlyTyping(message.id);
          setVisibleMessages(prev => [...prev, message.id]);
          await new Promise(resolve => setTimeout(resolve, message.typingDuration || 800));
          setVisibleMessages(prev => prev.filter(id => id !== message.id));
          setCurrentlyTyping(null);
        } else if (message.type === 'typing-received' && message.text) {
          // Type the message character by character in the input
          const messageText = message.text;
          let charIndex = 0;
          setCurrentUserMessage('');
          
          const typeChar = () => {
            if (charIndex < messageText.length) {
              setCurrentUserMessage(messageText.substring(0, charIndex + 1));
              charIndex++;
            }
          };
          
          // Clear any existing interval
          if (typingIntervalRef.current) {
            clearInterval(typingIntervalRef.current);
          }
          
          typingIntervalRef.current = setInterval(typeChar, 50);
          await new Promise(resolve => setTimeout(resolve, message.typingDuration || 1000));
          
          // Clear the typing interval and reset the input
          if (typingIntervalRef.current) {
            clearInterval(typingIntervalRef.current);
            typingIntervalRef.current = null;
          }
          setCurrentUserMessage('');
        } else {
          setVisibleMessages(prev => [...prev, message.id]);
        }
      }
      
      // Reset and loop
      setTimeout(() => {
        setVisibleMessages([]);
        setCurrentlyTyping(null);
        setUserTypingText('');
        setCurrentUserMessage('');
        showMessages();
      }, 3000);
    };

    showMessages();
  }, [hasStarted]);

  return (
    <section ref={sectionRef} className="auto-invitations-section relative bg-[rgb(254.7,255,235)] overflow-hidden">
      <div className="w-full">
        <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-t-[3rem] py-12 lg:py-20 overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }} />
          </div>

          <div className="relative z-10 container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              {/* Left side - Text content */}
              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
                  <span className="block md:inline">Send automated messages,</span>
                  <span className="block md:inline"><br className="hidden md:block" /> reminders with smart AI followups</span>
                </h2>

                <p className="text-base md:text-lg text-gray-400 mb-8 max-w-lg mx-auto lg:mx-0">
                  Collect guest information automatically for<br />
                  smart wedding card delivery
                </p>

                <div className="flex flex-col sm:flex-row gap-3 items-center justify-center lg:justify-start">
                  <div className="relative w-full sm:w-auto">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      <span className="text-2xl">🇮🇳</span>
                      <span className="text-gray-600">+91</span>
                    </div>
                    <input 
                      type="tel" 
                      placeholder="Enter your number"
                      className="pl-20 pr-4 py-3 rounded-full border border-gray-300 bg-white text-black focus:outline-none focus:border-rose-500 w-full sm:w-64"
                    />
                  </div>
                  <button className="px-8 py-3 rounded-full bg-rose-500 text-white font-medium hover:bg-rose-600 transition-colors">
                    See in action
                  </button>
                </div>
              </div>

              {/* Right side - Phone mockup */}
              <div className="relative">
                {/* Floating app icons */}
                {floatingApps.map((app, index) => (
                  <div
                    key={app.name}
                    className={`absolute w-12 h-12 ${app.color} rounded-xl flex items-center justify-center text-white text-xl shadow-lg animate-float`}
                    style={{
                      ...app.position,
                      animationDelay: `${index * 0.2}s`
                    }}
                  >
                    {app.icon}
                  </div>
                ))}

                {/* Phone frame */}
                <div className="relative w-[320px] md:w-[380px] h-[640px] md:h-[760px] bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
                  <div className="w-full h-full bg-[#0a1014] rounded-[2.5rem] overflow-hidden relative">
                    {/* WhatsApp header */}
                    <div className="bg-[#1f2c34] px-4 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button className="text-gray-400">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white font-bold">
                            S
                          </div>
                          <div className="text-left">
                            <div className="flex items-center gap-1">
                              <p className="text-white font-medium">ShadiCards</p>
                              <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                              </svg>
                            </div>
                            <p className="text-xs text-gray-400">Wedding Assistant</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <button className="text-gray-400">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </button>
                        <button className="text-gray-400">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </button>
                        <button className="text-gray-400">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Chat messages with WhatsApp background */}
                    <div 
                      className="flex-1 p-4 pb-6 space-y-2 overflow-y-hidden relative"
                      style={{ 
                        height: 'calc(100% - 120px)',
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23192229' fill-opacity='0.08'%3E%3Cpath d='M0 20h20v20H0zM20 0h20v20H20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundColor: '#0a1014'
                      }}
                    >
                      <div 
                        className="space-y-2 transition-transform duration-500 ease-in-out"
                        style={{
                          transform: visibleMessages.length > 3 ? `translateY(-${(visibleMessages.length - 3) * 70}px)` : 'translateY(0)'
                        }}
                      >
                        {chatMessages.filter(msg => visibleMessages.includes(msg.id)).map((message) => {
                          const isTyping = message.type === 'typing-sent' || message.type === 'typing-received';
                          const isSent = message.type === 'sent' || message.type === 'typing-sent';
                          
                          return (
                            <div
                              key={message.id}
                              className={`flex ${isSent ? 'justify-start' : 'justify-end'} animate-slideIn`}
                            >
                              {isTyping ? (
                                <div className={`rounded-lg ${
                                  isSent ? 'bg-[#005c4b] rounded-tl-none' : 'bg-[#202c33] rounded-tr-none'
                                } px-4 py-3`}>
                                  <div className="flex gap-1">
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                  </div>
                                </div>
                              ) : (
                                <div
                                  className={`max-w-[85%] rounded-lg ${
                                    isSent
                                      ? 'bg-[#005c4b] text-white rounded-tl-none'
                                      : 'bg-[#202c33] text-white rounded-tr-none'
                                  }`}
                                >
                                  {message.component ? (
                                    <div className="p-3">
                                      {message.component}
                                    </div>
                                  ) : (
                                    <div className="px-4 py-2">
                                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                                    </div>
                                  )}
                                  <p className={`text-[10px] px-4 pb-1 text-right ${
                                    isSent ? 'text-white/60' : 'text-gray-400'
                                  }`}>
                                    {message.timestamp}
                                    {isSent && (
                                      <span className="ml-1">✓✓</span>
                                    )}
                                  </p>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* WhatsApp Input area */}
                    <div className="absolute bottom-0 left-0 right-0 bg-[#1f2c34] px-4 py-2 flex items-center gap-3">
                      <button className="text-gray-400">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                      <div className="flex-1 bg-[#2a3942] rounded-full px-4 py-2 flex items-center">
                        <span className="text-sm text-gray-400">
                          {currentUserMessage || 'Type a message'}
                        </span>
                      </div>
                      <button className="text-gray-400">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                      </button>
                      <button className="text-gray-400">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Client slider - outside the main container */}
      <div className="w-full bg-[#014f46] pt-24 pb-12 relative overflow-hidden rounded-b-[3rem] -mt-16">
        <div className="container mx-auto px-6">
          <p className="text-white text-center mb-8 text-lg">Used by 1000s of happy couples to organize their dream weddings</p>
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll-clients items-center justify-center">
              {/* First set */}
              {[
                { names: 'Rahul & Priya', male: 'rahul', female: 'priya' },
                { names: 'Amit & Sneha', male: 'amit', female: 'sneha' },
                { names: 'Vikram & Anjali', male: 'vikram', female: 'anjali' },
                { names: 'Karan & Neha', male: 'karan', female: 'neha' },
                { names: 'Arjun & Meera', male: 'arjun', female: 'meera' },
                { names: 'Siddharth & Kavita', male: 'siddharth', female: 'kavita' },
                { names: 'Ravi & Anita', male: 'ravi', female: 'anita' },
              ].map((couple, index) => (
                <div key={index} className="flex items-center gap-3 px-8 whitespace-nowrap group">
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
              {/* Duplicate for seamless loop */}
              {[
                { names: 'Rahul & Priya', male: 'rahul', female: 'priya' },
                { names: 'Amit & Sneha', male: 'amit', female: 'sneha' },
                { names: 'Vikram & Anjali', male: 'vikram', female: 'anjali' },
                { names: 'Karan & Neha', male: 'karan', female: 'neha' },
                { names: 'Arjun & Meera', male: 'arjun', female: 'meera' },
                { names: 'Siddharth & Kavita', male: 'siddharth', female: 'kavita' },
                { names: 'Ravi & Anita', male: 'ravi', female: 'anita' },
              ].map((couple, index) => (
                <div key={`dup-${index}`} className="flex items-center gap-3 px-8 whitespace-nowrap group">
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
          </div>
        </div>
      </div>
    </section>
  );
}