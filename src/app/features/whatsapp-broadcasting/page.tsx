import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  MessageSquare, Send, Users, Zap, Clock, Target, 
  CheckCircle, Calendar, Camera, MapPin, Gift, Heart,
  ArrowRight, Check, Sparkles, Smartphone, Globe, Shield
} from "lucide-react";

export default function WhatsAppBroadcastingPage() {
  const features = [
    {
      icon: <Send className="w-8 h-8" />,
      title: "Mass Broadcasting",
      description: "Send messages to hundreds of guests simultaneously",
      details: "Reach everyone instantly"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Smart Targeting",
      description: "Send different messages to different guest groups",
      details: "Family, friends, VIP segments"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Scheduled Messages",
      description: "Schedule reminders and updates in advance",
      details: "Set it and forget it"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Rich Media Support",
      description: "Send photos, videos, location pins, and links",
      details: "More than just text"
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Delivery Tracking",
      description: "See who received, read, and responded to messages",
      details: "Complete visibility"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Multi-Language",
      description: "Send messages in multiple languages automatically",
      details: "Reach international guests"
    }
  ];

  const messageTypes = [
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Event Reminders",
      description: "Mehndi tomorrow at 6 PM! Don't forget to wear yellow 💛",
      timing: "1 day before each event",
      engagement: "98% open rate"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Location Updates",
      description: "Venue changed! New location: Grand Ballroom with parking info 📍",
      timing: "As needed",
      engagement: "Instant awareness"
    },
    {
      icon: <Camera className="w-6 h-6" />,
      title: "Photo Sharing",
      description: "Beautiful moments from today's ceremony! 📸✨ [Photo gallery link]",
      timing: "Real-time during events",
      engagement: "90% click-through"
    },
    {
      icon: <Gift className="w-6 h-6" />,
      title: "Gift Registry",
      description: "Still looking for the perfect gift? Check our updated registry! 🎁",
      timing: "2 weeks before wedding",
      engagement: "75% conversion"
    }
  ];

  const broadcastFeatures = [
    {
      title: "Guest Segmentation",
      description: "Create smart groups based on relationship, location, or RSVP status",
      benefit: "Personalized communication",
      icon: <Users className="w-5 h-5" />
    },
    {
      title: "Template Library",
      description: "Pre-written messages for every wedding occasion in multiple languages",
      benefit: "Save time, professional tone",
      icon: <MessageSquare className="w-5 h-5" />
    },
    {
      title: "Auto-Responses",
      description: "Smart replies handle common questions about venue, timing, and dress code",
      benefit: "24/7 guest support",
      icon: <Zap className="w-5 h-5" />
    },
    {
      title: "Bulk Media Sharing",
      description: "Send photos and videos to all guests with automatic compression",
      benefit: "Instant memory sharing",
      icon: <Camera className="w-5 h-5" />
    }
  ];

  const useCases = [
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Pre-Wedding Updates",
      description: "Share venue details, dress codes, and schedule changes",
      example: "\"Mehndi ceremony starts at 6 PM tomorrow. Venue: Garden Terrace, Level 2. Parking available on B1. Can't wait to celebrate with you! 🎉\""
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Day-of Coordination",
      description: "Real-time updates and coordination during events",
      example: "\"Ceremony is starting in 15 minutes! Please take your seats. Photography begins after the vows. Phone cameras welcome! 📸\""
    },
    {
      icon: <Camera className="w-6 h-6" />,
      title: "Memory Sharing",
      description: "Instantly share photos and videos with all guests",
      example: "\"The most beautiful moments from today's ceremony! ✨ View all photos: [link] Feel free to download and share your favorites! 💕\""
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Thank You Messages",
      description: "Express gratitude and share final memories",
      example: "\"Thank you for making our wedding day magical! Your presence, wishes, and dance moves made it unforgettable. Love, [Names] 💖\""
    }
  ];

  const stats = [
    { number: "99.2%", label: "Message Delivery", icon: <Send className="w-6 h-6" /> },
    { number: "92%", label: "Open Rate", icon: <MessageSquare className="w-6 h-6" /> },
    { number: "500+", label: "Guests Per Broadcast", icon: <Users className="w-6 h-6" /> },
    { number: "24/7", label: "Automated Support", icon: <Zap className="w-6 h-6" /> }
  ];

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-rose-50 via-white to-rose-50/30 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              <span>WhatsApp Broadcasting</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-8">
              <span className="font-normal">Reach All Guests</span>
              <br />
              <span className="text-rose-600 font-medium">Instantly on WhatsApp</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Keep everyone informed with smart WhatsApp broadcasting. Send event reminders, 
              share photos, coordinate logistics, and create magical moments - all from one dashboard.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-4 rounded-full font-medium text-lg transition-all shadow-lg hover:shadow-xl">
                Start Broadcasting
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </button>
              <button className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 px-8 py-4 rounded-full font-medium text-lg transition-all">
                See Live Demo
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
              How Broadcasting Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful communication made simple
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-rose-500 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Create Message</h3>
                <p className="text-gray-600">Write your message or choose from our template library with photos and media.</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-rose-600 to-rose-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Select Recipients</h3>
                <p className="text-gray-600">Choose guest groups or send to everyone - family, friends, or custom segments.</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-rose-700 to-rose-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Send or Schedule</h3>
                <p className="text-gray-600">Send immediately or schedule for later - all messages delivered reliably.</p>
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
              Broadcasting Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional tools for seamless guest communication
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

      {/* Message Types */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Smart Message Types
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Pre-designed templates for every wedding moment
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            {messageTypes.map((messageType, index) => (
              <div key={index} className="bg-gradient-to-br from-rose-50 to-rose-50/30 rounded-2xl p-8 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                    {messageType.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{messageType.title}</h3>
                    <div className="flex gap-4 text-sm text-gray-600 mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {messageType.timing}
                      </span>
                      <span className="flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        {messageType.engagement}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 border-l-4 border-rose-500">
                  <p className="text-gray-700 italic">"{messageType.description}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="py-20 bg-gradient-to-b from-rose-50 to-rose-50/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Advanced Broadcasting
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional features that make communication effortless
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {broadcastFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-rose-600 rounded-lg flex-shrink-0 flex items-center justify-center text-white">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 mb-3">{feature.description}</p>
                    <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-sm font-medium">
                      <CheckCircle className="w-4 h-4" />
                      {feature.benefit}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Perfect for Every Moment
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real examples of how couples use WhatsApp broadcasting
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl flex items-center justify-center text-white">
                    {useCase.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{useCase.title}</h3>
                    <p className="text-gray-600 text-sm">{useCase.description}</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 border-l-4 border-rose-500">
                  <p className="text-gray-700 text-sm leading-relaxed">{useCase.example}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-rose-50 to-rose-50/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Proven Performance
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-rose-600 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
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
              Connect With Every Guest
            </h2>
            <p className="text-xl text-rose-100 mb-8 max-w-2xl mx-auto">
              Make your wedding communication seamless, personal, and memorable with smart WhatsApp broadcasting.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-rose-600 hover:text-sky-700 px-8 py-4 rounded-full font-medium text-lg transition-all shadow-lg hover:shadow-xl">
                Start Broadcasting
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-rose-600 px-8 py-4 rounded-full font-medium text-lg transition-all">
                View Templates
              </button>
            </div>
            
            <div className="mt-12 flex items-center justify-center gap-8 text-rose-100">
              <div className="flex items-center gap-2">
                <Send className="w-5 h-5" />
                <span className="text-sm">99.2% Delivery Rate</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span className="text-sm">Unlimited Recipients</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span className="text-sm">Spam-Free Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
