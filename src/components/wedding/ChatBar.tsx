"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, X, Sparkles, ChevronUp } from "lucide-react";
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
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
    "RSVP"
  ];

  return (
    <>
      {/* Bottom Chat Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg">
        <div className="container mx-auto max-w-7xl px-4">
          <div 
            onClick={() => !isOpen && setIsOpen(true)}
            className={`py-3 transition-all ${!isOpen ? 'cursor-pointer hover:bg-gray-50' : ''}`}
          >
            {!isOpen ? (
              // Collapsed State - Chat Input Preview
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 flex-1">
                  <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center shadow-md">
                    <Image
                      src="/Shadiards_logo.svg"
                      alt="ShadiCards AI"
                      width={24}
                      height={24}
                      className="brightness-0 invert"
                    />
                  </div>
                  <div className="flex-1 flex items-center gap-3">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        ShadiCards AI
                        <Sparkles className="w-3 h-3 text-yellow-500" />
                      </span>
                      <span className="text-sm text-gray-700">Ask me anything about the wedding...</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <MessageCircle className="w-5 h-5" />
                  <ChevronUp className="w-5 h-5" />
                </div>
              </div>
            ) : (
              // Expanded State - Input Field
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center shadow-md">
                  <Image
                    src="/Shadiards_logo.svg"
                    alt="ShadiCards AI"
                    width={24}
                    height={24}
                    className="brightness-0 invert"
                  />
                </div>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type your message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  className="flex-1 px-4 py-2 bg-gray-100 rounded-full outline-none focus:bg-white focus:ring-2 focus:ring-rose-400 transition-all"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputMessage.trim()}
                  className="p-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
                >
                  <Send className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="absolute inset-x-4 top-4 bottom-20 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-2xl">
            <div className="bg-white rounded-2xl shadow-2xl h-full flex flex-col animate-in slide-in-from-bottom-5 duration-300">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-rose-500 to-pink-500 text-white p-4 rounded-t-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur">
                    <Image
                      src="/Shadiards_logo.svg"
                      alt="ShadiCards AI"
                      width={28}
                      height={28}
                      className="brightness-0 invert"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      ShadiCards AI
                      <Sparkles className="w-4 h-4 text-yellow-300" />
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

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-rose-50 to-pink-50">
                {messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex items-start gap-2 animate-in slide-in-from-bottom-2 duration-300 ${
                      message.sender === 'user' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
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
                    <div className={`max-w-[75%] ${
                      message.sender === 'user' ? 'text-right' : ''
                    }`}>
                      <div className={`inline-block p-3 rounded-2xl ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-tr-none'
                          : 'bg-white text-gray-800 shadow-md rounded-tl-none'
                      }`}>
                        <p className="text-sm">{message.text}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 px-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex items-center gap-2 animate-in slide-in-from-bottom-2 duration-300">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center">
                      <Image
                        src="/Shadiards_logo.svg"
                        alt="AI"
                        width={20}
                        height={20}
                        className="brightness-0 invert"
                      />
                    </div>
                    <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-md">
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

              {/* Quick Questions */}
              {messages.length === 1 && (
                <div className="px-4 pb-2 bg-white">
                  <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setInputMessage(question);
                          handleSend();
                        }}
                        className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1 hover:bg-rose-50 hover:border-rose-300 transition-colors"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}