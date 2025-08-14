import Header from "@/components/Header";
import { 
  Smartphone, QrCode, Nfc, Zap, Users, Calendar, MapPin, 
  Heart, Camera, Instagram, Gift, Clock, Shield, Sparkles,
  ArrowRight, Check, Star
} from "lucide-react";

export default function SmartCardPage() {
  const features = [
    {
      icon: <QrCode className="w-8 h-8" />,
      title: "QR Code Access",
      description: "Guests scan to instantly access wedding content",
      details: "No apps needed, works on all phones"
    },
    {
      icon: <Nfc className="w-8 h-8" />,
      title: "NFC Technology", 
      description: "Just tap to connect - seamless interaction",
      details: "Works with modern smartphones"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Guest Targeting",
      description: "Show different content to different people",
      details: "Family, friends, VIP sections"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Time-based Control",
      description: "Schedule when content appears",
      details: "Perfect for multi-day events"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Smart Automation",
      description: "Automatically update based on event timeline",
      details: "Set it once, works perfectly"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Private",
      description: "Your data is protected and encrypted",
      details: "Enterprise-grade security"
    }
  ];

  const cardTypes = [
    {
      name: "Paper Smart Card",
      description: "Eco-friendly option with QR code",
      features: ["QR Code Access", "Custom Design", "Waterproof"],
      ideal: "Budget-conscious couples"
    },
    {
      name: "PVC Smart Card",
      description: "Durable plastic card with premium finish",
      features: ["QR Code + NFC", "Premium Finish", "Long-lasting"],
      ideal: "Most popular choice"
    },
    {
      name: "Wooden Smart Card",
      description: "Unique wooden texture with smart technology",
      features: ["NFC Enabled", "Natural Wood", "Eco-Premium"],
      ideal: "Nature lovers"
    },
    {
      name: "Metal Smart Card",
      description: "Luxury metal card with engraved details",
      features: ["NFC + QR Code", "Metal Finish", "Ultra Premium"],
      ideal: "Luxury weddings"
    }
  ];

  const useCases = [
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Event Information",
      description: "Share venue details, timings, and directions instantly"
    },
    {
      icon: <Camera className="w-6 h-6" />,
      title: "Photo Gallery",
      description: "Give guests access to event photos and albums"
    },
    {
      icon: <Instagram className="w-6 h-6" />,
      title: "Social Media",
      description: "Connect guests to wedding hashtags and social profiles"
    },
    {
      icon: <Gift className="w-6 h-6" />,
      title: "Gift Registry",
      description: "Share wishlist and registry information easily"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Interactive Maps",
      description: "Provide directions to venues and nearby facilities"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Personal Messages",
      description: "Share love stories, thanks, and special moments"
    }
  ];

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 bg-[rgb(254.7,255,235)] overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[rgb(254.7,255,235)] to-[rgb(252,250,230)]" />
          <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-100 rounded-full filter blur-3xl opacity-20" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-100 rounded-full filter blur-3xl opacity-20" />
        </div>
        
        <div className="relative container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* Left Column - Text Content */}
            <div className="text-left">
              <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                <span>Smart Wedding Technology</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                SMART CARDS FOR UNFORGETTABLE WEDDINGS
              </h1>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                  </div>
                  <p className="text-gray-700 text-lg">
                    Transform traditional invitations into smart, interactive experiences that adapt to your guests and timeline
                  </p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                  </div>
                  <p className="text-gray-700 text-lg">
                    NFC & QR technology works instantly on all phones - no apps needed
                  </p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                  </div>
                  <p className="text-gray-700 text-lg">
                    Schedule content, target guests, and automate your entire wedding communication
                  </p>
                </div>
              </div>
              
              <div className="mb-8">
                <p className="text-2xl font-bold text-gray-900 mb-2">
                  GET YOUR SMART CARDS READY FOR YOUR SPECIAL DAY!
                </p>
              </div>
              
              <button className="group bg-rose-600 hover:bg-rose-700 text-white px-10 py-4 rounded-full font-medium text-lg transition-all shadow-lg hover:shadow-xl hover:scale-105">
                Order Smart Cards Now
                <ArrowRight className="w-5 h-5 ml-2 inline group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="mt-8 flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                </div>
                
                <div className="text-sm text-gray-600">
                  @shaadicards
                </div>
              </div>
            </div>
            
            {/* Right Column - Card Visual */}
            <div className="relative flex items-center justify-center">
              <div className="relative">
                {/* Floating annotations */}
                <div className="absolute -top-8 -left-12 bg-white rounded-2xl shadow-lg p-4 max-w-[200px] animate-float">
                  <p className="text-sm text-gray-700">
                    Works on every smartphone instantly
                  </p>
                  <div className="absolute bottom-0 left-8 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white transform translate-y-full"></div>
                </div>
                
                <div className="absolute -top-12 -right-8 bg-white rounded-2xl shadow-lg p-4 max-w-[180px] animate-float" style={{animationDelay: '1s'}}>
                  <p className="text-sm text-gray-700">
                    Personalized content for each guest
                  </p>
                  <div className="absolute bottom-0 right-8 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white transform translate-y-full"></div>
                </div>
                
                <div className="absolute -bottom-8 -left-16 bg-white rounded-2xl shadow-lg p-4 max-w-[180px] animate-float" style={{animationDelay: '2s'}}>
                  <p className="text-sm text-gray-700">
                    Schedule when content appears
                  </p>
                  <div className="absolute top-4 right-0 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[8px] border-l-white transform translate-x-full"></div>
                </div>
                
                {/* Main Card */}
                <div className="relative transform hover:scale-105 transition-transform duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-pink-400 blur-2xl opacity-30"></div>
                  <div className="relative bg-gray-900 rounded-3xl p-1 shadow-2xl">
                    <div className="bg-gradient-to-br from-gray-800 to-black rounded-3xl p-8 w-[320px] h-[200px] flex flex-col justify-between">
                      {/* Card Chip */}
                      <div className="flex justify-between items-start">
                        <div className="w-12 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-md"></div>
                        <div className="flex items-center gap-1">
                          <Nfc className="w-6 h-6 text-white/60" />
                          <div className="w-8 h-8 bg-white/10 rounded-md flex items-center justify-center">
                            <QrCode className="w-5 h-5 text-white/60" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Card Details */}
                      <div>
                        <p className="text-white/60 text-xs mb-1">SMART WEDDING CARD</p>
                        <p className="text-white text-xl font-light tracking-wider">Your Names Here</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]">
                  <div className="absolute top-0 right-0 w-3 h-3 bg-rose-500 rounded-full"></div>
                  <div className="absolute bottom-0 left-0 w-3 h-3 bg-rose-500 rounded-full"></div>
                  <div className="absolute top-1/2 right-0 w-3 h-3 bg-rose-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              How Smart Cards Work
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple technology that creates extraordinary experiences
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-rose-500 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Guest Receives Card</h3>
                <p className="text-gray-600">Beautiful physical card with embedded smart technology arrives with your invitation.</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Tap or Scan</h3>
                <p className="text-gray-600">Guests tap the card (NFC) or scan the QR code with their phone - no apps required.</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Magic Happens</h3>
                <p className="text-gray-600">Personalized content appears instantly - tailored to each guest and moment in time.</p>
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
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to create memorable digital experiences
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

      {/* Card Types */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Choose Your Style
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From eco-friendly paper to luxury metal - find the perfect match for your wedding
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cardTypes.map((card, index) => (
              <div key={index} className="group relative bg-gradient-to-b from-gray-50 to-gray-100 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-b from-rose-500/10 to-rose-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl mb-4"></div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{card.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{card.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    {card.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <p className="text-xs text-rose-600 font-medium">{card.ideal}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-gradient-to-b from-rose-50 to-rose-50/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Endless Possibilities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Share anything that matters to your wedding celebration
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-rose-600 rounded-lg flex items-center justify-center text-white mb-4">
                  {useCase.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{useCase.title}</h3>
                <p className="text-gray-600">{useCase.description}</p>
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
              Ready to Go Smart?
            </h2>
            <p className="text-xl text-rose-100 mb-8 max-w-2xl mx-auto">
              Join thousands of couples who've revolutionized their wedding experience with smart cards
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-rose-600 hover:text-rose-700 px-8 py-4 rounded-full font-medium text-lg transition-all shadow-lg hover:shadow-xl">
                Start Your Order
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-rose-600 px-8 py-4 rounded-full font-medium text-lg transition-all">
                Talk to Expert
              </button>
            </div>
            
            <div className="mt-12 flex items-center justify-center gap-8 text-rose-100">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-current" />
                <span className="text-sm">4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span className="text-sm">10,000+ Happy Couples</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span className="text-sm">Secure & Private</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}