"use client";

import { useState, useRef, useEffect } from "react";
import { Send, X, Sparkles, Plus, Mic } from "lucide-react";
import Image from "next/image";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatBarProps {
  weddingName?: string;
  guestName?: string;
}

export default function ChatBar({ weddingName = "the wedding", guestName = "Guest" }: ChatBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hi ${guestName}! 👋 I'm ShadiCards AI, your wedding assistant. Ask me anything about ${weddingName} - venues, timings, dress code, or anything else!`,
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const drawerInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && drawerInputRef.current) {
      setTimeout(() => {
        drawerInputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  const predefinedResponses = [
    {
      keywords: ['venue', 'location', 'where', 'address'],
      response: "The wedding venue details have been shared with you. You can find the complete address in the events section above. Need directions? Click on 'Get Directions' in the venue card!"
    },
    {
      keywords: ['time', 'when', 'timing', 'schedule'],
      response: "All event timings are listed in the Events section. Each ceremony has its specific time mentioned. Don't forget to check the date and time for each event you're invited to!"
    },
    {
      keywords: ['dress', 'wear', 'outfit', 'attire', 'dress code'],
      response: "For traditional ceremonies, ethnic wear is preferred. For the reception, you can go with formal or indo-western attire. When in doubt, traditional is always a safe choice! 🎉"
    },
    {
      keywords: ['rsvp', 'confirm', 'attendance'],
      response: "You can update your RSVP status using the 'Update RSVP' button in the Quick Actions section. Let us know if you're bringing any additional guests!"
    },
    {
      keywords: ['gift', 'present', 'registry'],
      response: "Your presence is the best present! If you'd like to give something, blessings and good wishes are always appreciated. 💝"
    },
    {
      keywords: ['food', 'menu', 'dietary', 'meal'],
      response: "A variety of cuisines will be served! If you have specific dietary requirements, please update them in your profile so we can make arrangements."
    },
    {
      keywords: ['parking', 'car', 'vehicle'],
      response: "Parking arrangements have been made at the venue. Valet parking will be available. You'll see signs directing you to the parking area when you arrive."
    },
    {
      keywords: ['accommodation', 'hotel', 'stay'],
      response: "If you need accommodation, please let us know. We have some rooms blocked at nearby hotels and can help with the booking."
    }
  ];

  const getResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    for (const item of predefinedResponses) {
      if (item.keywords.some(keyword => lowerMessage.includes(keyword))) {
        return item.response;
      }
    }
    
    return "Thanks for your question! The couple will get back to you soon. Meanwhile, feel free to explore the wedding details above or ask me about venue, timings, dress code, RSVP, or any other wedding-related queries!";
  };

  const handleSend = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const quickQuestions = [
    "What's the venue?",
    "Dress code?",
    "Event timings?",
    "How do I RSVP?"
  ];

  return (
    <>
      {/* ChatGPT-style Bottom Input Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40">
        {/* Blurry backdrop effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/95 to-transparent backdrop-blur-sm pointer-events-none" />
        
        {/* Input Container */}
        <div className="relative container mx-auto max-w-3xl px-4 pb-4">
          <div 
            onClick={() => !isOpen && setIsOpen(true)}
            className="relative bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center gap-3 p-3">
              {/* Plus Button */}
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Plus className="w-5 h-5 text-gray-600" />
              </button>
              
              {/* Input Field */}
              <input
                ref={inputRef}
                type="text"
                placeholder="Ask anything about the wedding..."
                className="flex-1 py-2 text-gray-700 placeholder-gray-400 outline-none bg-transparent"
                readOnly
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(true);
                }}
              />
              
              {/* Right Actions */}
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Mic className="w-5 h-5 text-gray-600" />
                </button>
                <div className="w-8 h-8 bg-gradient-to-br from-rose-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Image
                    src="/Shadiards_logo.svg"
                    alt="AI"
                    width={20}
                    height={20}
                    className="brightness-0 invert"
                  />
                </div>
              </div>
            </div>
            
            {/* Branding Label */}
            <div className="absolute -top-8 left-0 flex items-center gap-2 text-xs text-gray-500">
              <span>ShadiCards AI</span>
              <Sparkles className="w-3 h-3 text-yellow-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Chat Drawer - Slides up from bottom */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Drawer */}
          <div className="fixed inset-x-0 bottom-0 z-50 animate-in slide-in-from-bottom duration-300">
            <div className="bg-white rounded-t-2xl shadow-2xl max-h-[85vh] flex flex-col">
              {/* Drawer Handle */}
              <div className="flex justify-center py-2">
                <div className="w-12 h-1 bg-gray-300 rounded-full" />
              </div>
              
              {/* Header */}
              <div className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur">
                    <Image
                      src="/Shadiards_logo.svg"
                      alt="ShadiCards AI"
                      width={24}
                      height={24}
                      className="brightness-0 invert"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold flex items-center gap-2">
                      ShadiCards AI
                      <Sparkles className="w-3 h-3 text-yellow-300" />
                    </h3>
                    <p className="text-xs text-white/80">Your wedding assistant</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-rose-50/50 to-pink-50/50 min-h-[300px] max-h-[50vh]">
                {messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex items-start gap-3 animate-in slide-in-from-bottom-2 duration-300 ${
                      message.sender === 'user' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    {/* Avatar */}
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.sender === 'user' 
                        ? 'bg-gradient-to-br from-blue-500 to-purple-500' 
                        : 'bg-gradient-to-br from-rose-500 to-pink-500'
                    }`}>
                      {message.sender === 'bot' && (
                        <Image
                          src="/Shadiards_logo.svg"
                          alt="AI"
                          width={20}
                          height={20}
                          className="brightness-0 invert"
                        />
                      )}
                    </div>
                    
                    {/* Message Bubble */}
                    <div className={`flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'} max-w-[80%]`}>
                      <div className={`px-4 py-2 rounded-2xl ${
                        message.sender === 'user'
                          ? 'bg-blue-500 text-white rounded-tr-sm'
                          : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-sm'
                      }`}>
                        <p className="text-sm">{message.text}</p>
                      </div>
                      <p className="text-xs text-gray-400 mt-1 px-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex items-center gap-3 animate-in slide-in-from-bottom-2 duration-300">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center">
                      <Image
                        src="/Shadiards_logo.svg"
                        alt="AI"
                        width={20}
                        height={20}
                        className="brightness-0 invert"
                      />
                    </div>
                    <div className="bg-white px-4 py-2 rounded-2xl rounded-tl-sm shadow-sm border border-gray-100">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions */}
              {messages.length === 1 && (
                <div className="px-4 py-2 bg-white border-t border-gray-100">
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {quickQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setInputMessage(question);
                          setTimeout(() => handleSend(), 100);
                        }}
                        className="text-sm bg-gray-100 hover:bg-gray-200 rounded-full px-4 py-2 whitespace-nowrap transition-colors"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Section at Bottom */}
              <div className="p-4 bg-white border-t border-gray-200">
                <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-3 py-2">
                  <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                    <Plus className="w-5 h-5 text-gray-600" />
                  </button>
                  
                  <input
                    ref={drawerInputRef}
                    type="text"
                    placeholder="Type your message..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    className="flex-1 py-2 text-gray-700 placeholder-gray-400 outline-none bg-transparent"
                  />
                  
                  <button
                    onClick={handleSend}
                    disabled={!inputMessage.trim()}
                    className={`p-2 rounded-lg transition-all ${
                      inputMessage.trim() 
                        ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:scale-105' 
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}