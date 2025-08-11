"use client";

import { useState, useRef, useEffect } from "react";
import { Send, X, Sparkles, Plus, Mic, MapPin, Calendar, Users, Globe, ExternalLink, ChevronDown } from "lucide-react";
import Image from "next/image";
import ReactMarkdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMapMarkerAlt, 
  faCalendarAlt, 
  faUsers, 
  faHeart,
  faClock,
  faEnvelope,
  faCheckCircle,
  faTshirt,
  faCamera,
  faUtensils,
  faHotel,
  faGift,
  faQuestionCircle,
  faInfoCircle,
  faCreditCard,
  faQrcode,
  faCalendarCheck,
  faMapPin,
  faGlobe,
  faMobileAlt
} from '@fortawesome/free-solid-svg-icons';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  metadata?: {
    showMap?: boolean;
    venueAddress?: string;
    showEventButton?: boolean;
    eventIndex?: number;
    showWebsiteButton?: boolean;
  };
}

interface ChatBarProps {
  weddingId?: string;
  guestId?: string;
  websiteSlug?: string;
  weddingName?: string;
  guestName?: string;
}

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'हिंदी (Hindi)', flag: '🇮🇳' },
  { code: 'bn', name: 'বাংলা (Bengali)', flag: '🇮🇳' },
  { code: 'te', name: 'తెలుగు (Telugu)', flag: '🇮🇳' },
  { code: 'mr', name: 'मराठी (Marathi)', flag: '🇮🇳' },
  { code: 'ta', name: 'தமிழ் (Tamil)', flag: '🇮🇳' },
  { code: 'gu', name: 'ગુજરાતી (Gujarati)', flag: '🇮🇳' },
  { code: 'kn', name: 'ಕನ್ನಡ (Kannada)', flag: '🇮🇳' },
  { code: 'ml', name: 'മലയാളം (Malayalam)', flag: '🇮🇳' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ (Punjabi)', flag: '🇮🇳' },
  { code: 'or', name: 'ଓଡ଼ିଆ (Odia)', flag: '🇮🇳' },
  { code: 'as', name: 'অসমীয়া (Assamese)', flag: '🇮🇳' },
  { code: 'ur', name: 'اردو (Urdu)', flag: '🇮🇳' }
];

export default function ChatBar({ weddingId, guestId, websiteSlug, weddingName = "the wedding", guestName = "Guest" }: ChatBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hi ${guestName}! I'm ShadiCards AI, your personalized wedding assistant. I can help you with venue directions, event timings, RSVP management, and answer any questions about ${weddingName}!\n\n**About ShadiCards SmartCard:**\nYour digital SmartCard is your all-in-one wedding companion with two convenient access methods:\n\n**QR Code**: Display your unique QR code for instant check-in\n**NFC Technology**: Simply tap your phone on NFC readers for contactless check-in\n\nKey features include:\n• Real-time RSVP management\n• Event schedules and navigation\n• Direct access to couple's gallery\n• Instant updates and notifications\n\nAsk me anything about the wedding, venues, or how to use your SmartCard!`,
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
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

  const sendMessageToAPI = async (message: string) => {
    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          guestId: guestId || null,
          weddingId: weddingId || null,
          websiteSlug: websiteSlug || null,
          sessionId,
          language: selectedLanguage,
        }),
      });

      if (!response.ok) {
        console.error('API response not ok:', response.status, response.statusText);
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Failed to get response: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error sending message:', error);
      return {
        response: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
        suggestions: [],
      };
    }
  };

  const handleSend = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const messageToSend = inputMessage;
    setInputMessage("");
    setIsTyping(true);
    setIsLoading(true);

    try {
      const apiResponse = await sendMessageToAPI(messageToSend);
      
      // Update session ID and IDs if this is the first message
      if (!sessionId && apiResponse.sessionId) {
        setSessionId(apiResponse.sessionId);
      }
      
      // Store the actual wedding/guest IDs if they were resolved
      if (apiResponse.weddingId && !weddingId) {
        // We can store this for future requests
      }
      if (apiResponse.guestId && !guestId) {
        // We can store this for future requests
      }

      // Update suggestions
      if (apiResponse.suggestions) {
        setSuggestions(apiResponse.suggestions);
      }

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: apiResponse.response,
        sender: 'bot',
        timestamp: new Date(),
        metadata: apiResponse.responseMetadata
      };
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error in handleSend:', error);
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I apologize, but I'm having trouble processing your request. Please try again.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = async (suggestion: string) => {
    // Add user message immediately
    const userMessage: Message = {
      id: Date.now().toString(),
      text: suggestion,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    setIsLoading(true);

    try {
      const apiResponse = await sendMessageToAPI(suggestion);
      
      // Update session ID if this is the first message
      if (!sessionId && apiResponse.sessionId) {
        setSessionId(apiResponse.sessionId);
      }

      // Update suggestions
      if (apiResponse.suggestions) {
        setSuggestions(apiResponse.suggestions);
      }

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: apiResponse.response,
        sender: 'bot',
        timestamp: new Date(),
        metadata: apiResponse.responseMetadata
      };
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error in handleSuggestionClick:', error);
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I apologize, but I'm having trouble processing your request. Please try again.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
      setIsLoading(false);
    }
  };

  const quickQuestions = [
    { icon: faCalendarAlt, text: "What events am I invited to?" },
    { icon: faMapMarkerAlt, text: "Show venue details" },
    { icon: faCheckCircle, text: "What's my RSVP status?" },
    { icon: faHeart, text: "Tell me about the couple" },
    { icon: faQrcode, text: "How to use QR code & NFC?" },
    { icon: faMobileAlt, text: "Check if my phone has NFC" }
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
              <div className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-4 py-3">
                <div className="flex items-center justify-between mb-2">
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
                
                {/* Language Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                    className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg text-sm transition-colors"
                  >
                    <Globe className="w-4 h-4" />
                    <span>{languages.find(l => l.code === selectedLanguage)?.name.split(' ')[0] || 'English'}</span>
                    <ChevronDown className={`w-3 h-3 transition-transform ${showLanguageDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {showLanguageDropdown && (
                    <div className="absolute top-full mt-1 left-0 right-0 bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto z-50 min-w-[200px]">
                      {languages.map(lang => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setSelectedLanguage(lang.code);
                            setShowLanguageDropdown(false);
                          }}
                          className={`w-full text-left px-3 py-2 hover:bg-gray-100 text-gray-700 text-sm flex items-center gap-2 ${
                            selectedLanguage === lang.code ? 'bg-rose-50 text-rose-600' : ''
                          }`}
                        >
                          <span className="text-lg">{lang.flag}</span>
                          <span>{lang.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
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
                        {message.sender === 'bot' ? (
                          <div className="text-sm prose prose-sm max-w-none">
                            <ReactMarkdown 
                              components={{
                                h2: ({children}) => <h2 className="text-lg font-bold mb-2 text-gray-900">{children}</h2>,
                                h3: ({children}) => <h3 className="text-base font-semibold mb-1 text-gray-800">{children}</h3>,
                                p: ({children}) => <p className="mb-2 text-gray-700">{children}</p>,
                                ul: ({children}) => <ul className="list-disc list-inside mb-2">{children}</ul>,
                                li: ({children}) => <li className="mb-1">{children}</li>,
                                strong: ({children}) => <strong className="font-semibold">{children}</strong>,
                                em: ({children}) => <em className="italic">{children}</em>,
                              }}
                            >
                              {message.text}
                            </ReactMarkdown>
                            
                            {/* Map iframe for venue queries */}
                            {message.metadata?.showMap && message.metadata?.venueAddress && (
                              <div className="mt-3 space-y-2">
                                <iframe
                                  width="100%"
                                  height="200"
                                  className="rounded-lg border border-gray-200"
                                  src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(message.metadata.venueAddress)}`}
                                  allowFullScreen
                                />
                                <a 
                                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(message.metadata.venueAddress)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                                >
                                  <MapPin className="w-4 h-4" />
                                  Open in Maps
                                </a>
                              </div>
                            )}
                            
                            {/* Event details button with RSVP */}
                            {message.metadata?.showEventButton && message.metadata?.eventIndex !== undefined && (
                              <div className="mt-3 space-y-2">
                                <a 
                                  href={`/wedding/${websiteSlug}/event?guest=${guestId}&index=${message.metadata.eventIndex}`}
                                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg hover:from-rose-600 hover:to-pink-600 transition-colors text-sm"
                                >
                                  <FontAwesomeIcon icon={faCalendarCheck} className="w-4 h-4" />
                                  View Event & Update RSVP
                                </a>
                              </div>
                            )}
                            
                            {/* Wedding Website button */}
                            {message.metadata?.showWebsiteButton && (
                              <div className="mt-3">
                                <a 
                                  href={`/wedding/${websiteSlug}${guestId ? `?guest=${guestId}` : ''}`}
                                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors text-sm"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                  Visit Wedding Website
                                </a>
                              </div>
                            )}
                          </div>
                        ) : (
                          <p className="text-sm">{message.text}</p>
                        )}
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

              {/* Quick Actions and Suggestions */}
              <div className="px-4 py-2 bg-white border-t border-gray-100">
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {messages.length === 1 ? (
                    quickQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(question.text)}
                        className="text-sm bg-gradient-to-r from-rose-50 to-pink-50 hover:from-rose-100 hover:to-pink-100 border border-rose-200 rounded-full px-4 py-2 whitespace-nowrap transition-all flex items-center gap-2"
                      >
                        <FontAwesomeIcon icon={question.icon} className="w-3 h-3" />
                        {question.text}
                      </button>
                    ))
                  ) : suggestions.length > 0 ? (
                    suggestions.map((suggestion, index) => {
                      let icon = faQuestionCircle;
                      const lowerSuggestion = suggestion.toLowerCase();
                      if (lowerSuggestion.includes('venue') || lowerSuggestion.includes('location') || lowerSuggestion.includes('direction')) icon = faMapMarkerAlt;
                      else if (lowerSuggestion.includes('event') || lowerSuggestion.includes('schedule')) icon = faCalendarAlt;
                      else if (lowerSuggestion.includes('rsvp')) icon = faCheckCircle;
                      else if (lowerSuggestion.includes('couple') || lowerSuggestion.includes('bride') || lowerSuggestion.includes('groom')) icon = faHeart;
                      else if (lowerSuggestion.includes('dress') || lowerSuggestion.includes('wear')) icon = faTshirt;
                      else if (lowerSuggestion.includes('photo') || lowerSuggestion.includes('gallery')) icon = faCamera;
                      else if (lowerSuggestion.includes('food') || lowerSuggestion.includes('menu')) icon = faUtensils;
                      else if (lowerSuggestion.includes('accommodation') || lowerSuggestion.includes('hotel')) icon = faHotel;
                      else if (lowerSuggestion.includes('gift')) icon = faGift;
                      else if (lowerSuggestion.includes('smartcard') || lowerSuggestion.includes('qr')) icon = faQrcode;
                      
                      return (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-sm bg-gradient-to-r from-rose-50 to-pink-50 hover:from-rose-100 hover:to-pink-100 border border-rose-200 rounded-full px-4 py-2 whitespace-nowrap transition-all flex items-center gap-2"
                        >
                          <FontAwesomeIcon icon={icon} className="w-3 h-3" />
                          {suggestion}
                        </button>
                      );
                    })
                  ) : null}
                </div>
              </div>

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
                    disabled={!inputMessage.trim() || isLoading}
                    className={`p-2 rounded-lg transition-all ${
                      inputMessage.trim() && !isLoading
                        ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:scale-105' 
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
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