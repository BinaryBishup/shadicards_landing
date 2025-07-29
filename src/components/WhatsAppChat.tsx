"use client";

import { useEffect, useRef } from "react";
import { Check, CheckCheck, ChevronLeft, MoreVertical, Heart } from "lucide-react";
import gsap from "gsap";

interface Message {
  id: string;
  text: string;
  sender: "ai" | "guest";
  timestamp: string;
  status?: "sent" | "delivered" | "read";
  isTyping?: boolean;
  hasImage?: boolean;
}

interface WhatsAppChatProps {
  messages: Message[];
  language: string;
}

export default function WhatsAppChat({ messages, language }: WhatsAppChatProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    messages.forEach((message, index) => {
      const element = messageRefs.current[message.id];
      if (element && !element.classList.contains("animated")) {
        element.classList.add("animated");
        gsap.fromTo(
          element,
          {
            opacity: 0,
            y: 20,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            delay: index * 0.1,
            ease: "power2.out",
          }
        );
      }
    });

    // Only scroll within the chat container, not the entire page
    const chatContainer = messagesEndRef.current?.parentElement;
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);


  return (
    <div className="w-full max-w-[266px]"> {/* Reduced by 30% from 380px */}
      {/* iPhone-like frame */}
      <div className="relative bg-black rounded-[2.1rem] p-1.5 shadow-2xl"> {/* Scaled down proportionally */}
        {/* Notch */}
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-b-2xl z-10"></div>
        
        <div className="bg-white rounded-[1.75rem] overflow-hidden">
          {/* WhatsApp Header */}
          <div className="bg-[#075E54] text-white px-3 pt-6 pb-2 flex items-center gap-2">
            <ChevronLeft className="w-5 h-5" />
            <div className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center flex-shrink-0">
              <div className="flex -space-x-0.5">
                <Heart className="w-3 h-3 text-white fill-white" />
                <Heart className="w-3 h-3 text-white fill-white" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm truncate">ShadiCards AI</h3>
              <p className="text-[10px] opacity-90">online</p>
            </div>
            <MoreVertical className="w-4 h-4 flex-shrink-0" />
          </div>

          {/* Chat Messages */}
          <div 
            className={`h-[420px] overflow-y-auto p-3 space-y-2`}
            style={{
              backgroundColor: '#e5ddd5',
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4cfc7' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                ref={(el) => {
                  if (el) messageRefs.current[message.id] = el;
                }}
                className={`flex ${message.sender === "ai" ? "justify-start" : "justify-end"}`}
              >
                {message.isTyping ? (
                  <div className="bg-white rounded-lg rounded-bl-none px-3 py-2 max-w-[80%] shadow-sm">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`px-2.5 py-1.5 max-w-[80%] shadow-sm ${
                      message.sender === "ai"
                        ? "bg-white text-gray-900 rounded-lg rounded-bl-none"
                        : "bg-[#dcf8c6] text-gray-900 rounded-lg rounded-br-none"
                    }`}
                  >
                    {message.hasImage && message.sender === "ai" && (
                      <div className="mb-1.5 -mx-2.5 -mt-1.5">
                        <img 
                          src="https://images.unsplash.com/photo-1606800052052-a08af7148866?w=300&h=200&fit=crop"
                          alt="Wedding invitation"
                          className="w-full h-24 object-cover rounded-t-lg"
                        />
                      </div>
                    )}
                    <p className="text-xs leading-relaxed whitespace-pre-wrap">{message.text}</p>
                    <div className="flex items-center justify-end gap-0.5 mt-0.5">
                      <span className="text-[9px] text-gray-500">{message.timestamp}</span>
                      {message.sender === "guest" && (
                        <span className="text-blue-500">
                          {message.status === "read" ? (
                            <CheckCheck className="w-3 h-3" />
                          ) : (
                            <Check className="w-3 h-3 text-gray-400" />
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="bg-[#f0f0f0] px-3 py-2 flex items-center gap-2">
            <div className="flex-1 bg-white rounded-full px-3 py-1.5 flex items-center">
              <span className="text-gray-400 text-xs">Type a message</span>
            </div>
            <div className="w-8 h-8 bg-[#075E54] rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" width="20" height="20" className="text-white fill-current">
                <path d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}