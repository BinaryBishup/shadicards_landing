import Header from "@/components/Header";
import { 
  Camera, Share2, Download, Zap, Users, Shield, 
  CheckCircle, Calendar, Heart, MapPin, Smartphone, Cloud,
  ArrowRight, Check, Sparkles, Upload, Link, Globe
} from "lucide-react";

export default function EventPicturesPage() {
  const features = [
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Instant Photo Sharing",
      description: "Upload and share photos instantly during events",
      details: "Real-time gallery updates"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Smart Distribution",
      description: "Automatically share photos with the right guests",
      details: "Privacy-aware sharing"
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: "Easy Downloads",
      description: "Guests can download photos in any quality they want",
      details: "Original, HD, or mobile sizes"
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: "Unlimited Storage",
      description: "Store thousands of photos with automatic backup",
      details: "Secure cloud storage"
    },
    {
      icon: <Share2 className="w-8 h-8" />,
      title: "Multi-Platform Sharing",
      description: "Share to WhatsApp, social media, or direct download",
      details: "One-click sharing anywhere"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Privacy Protected",
      description: "Control who sees which photos with smart privacy settings",
      details: "Your memories, your control"
    }
  ];

  const distributionMethods = [
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Smart Card Access",
      description: "Guests tap their card to instantly access event photos",
      benefits: ["No app installation", "Works on any phone", "Instant access"],
      usage: "94% of guests use this method"
    },
    {
      icon: <Share2 className="w-6 h-6" />,
      title: "WhatsApp Broadcasting",
      description: "Automatically send photo albums via WhatsApp",
      benefits: ["Mass distribution", "Direct to phone", "Easy sharing"],
      usage: "87% open rate within 1 hour"
    },
    {
      icon: <Link className="w-6 h-6" />,
      title: "Wedding Website Gallery",
      description: "Beautiful gallery integrated with your wedding website",
      benefits: ["Professional presentation", "Easy browsing", "Guest comments"],
      usage: "Average 15 minutes viewing time"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Direct Link Sharing",
      description: "Simple links that work anywhere, anytime",
      benefits: ["Universal compatibility", "No registration required", "Permanent access"],
      usage: "Perfect for social media sharing"
    }
  ];

  const photoFeatures = [
    {
      title: "AI-Powered Organization",
      description: "Automatically organize photos by event, time, and people",
      benefit: "Smart albums created instantly",
      icon: <Zap className="w-5 h-5" />
    },
    {
      title: "Face Recognition Grouping",
      description: "Group photos by people so guests can find themselves easily",
      benefit: "Personal photo collections",
      icon: <Users className="w-5 h-5" />
    },
    {
      title: "Quality Enhancement",
      description: "Automatic photo enhancement and multiple size options",
      benefit: "Professional looking photos",
      icon: <Camera className="w-5 h-5" />
    },
    {
      title: "Real-time Upload",
      description: "Photographers and guests can upload photos instantly during events",
      benefit: "Live photo sharing",
      icon: <Upload className="w-5 h-5" />
    }
  ];

  const useCases = [
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "During Events",
      description: "Share photos as they happen",
      example: "Professional photographer uploads ceremony photos, guests see them instantly on their phones during cocktail hour",
      timing: "Real-time sharing"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Guest Contributions",
      description: "Collect photos from all guests",
      example: "Create a shared album where all guests can contribute their candid moments and unique perspectives",
      timing: "Throughout the event"
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "Post-Event Sharing",
      description: "Complete collection after events",
      example: "Send professionally edited gallery to all guests with personalized selections based on their presence in photos",
      timing: "Within 48 hours"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Multi-Location Events",
      description: "Coordinate across venues",
      example: "Automatically organize photos from Mehndi, Sangeet, and Wedding venues into separate albums with cross-event highlights",
      timing: "Event-specific organization"
    }
  ];

  const benefits = [
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Never Miss a Memory",
      description: "Every photo is safely stored and easily accessible forever",
      impact: "100% photo preservation"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Gratification",
      description: "Guests see and share memories while the celebration is still fresh",
      impact: "90% same-day sharing"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Maximum Participation",
      description: "Every guest can contribute and access photos easily",
      impact: "3x more photos collected"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Privacy & Security",
      description: "Your photos are secure with granular privacy controls",
      impact: "Enterprise-grade security"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Photos Per Wedding", icon: <Camera className="w-6 h-6" /> },
    { number: "98%", label: "Guest Satisfaction", icon: <Heart className="w-6 h-6" /> },
    { number: "3x", label: "More Photos Collected", icon: <Upload className="w-6 h-6" /> },
    { number: "99.9%", label: "Uptime Guarantee", icon: <Cloud className="w-6 h-6" /> }
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
              <span>Smart Photo Distribution</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-8">
              <span className="font-normal">Every Memory</span>
              <br />
              <span className="text-rose-600 font-medium">Shared Instantly</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Never lose a wedding photo again. Automatically collect, organize, and distribute 
              all event photos to the right guests with intelligent sharing and instant access.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-4 rounded-full font-medium text-lg transition-all shadow-lg hover:shadow-xl">
                Start Sharing Photos
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </button>
              <button className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 px-8 py-4 rounded-full font-medium text-lg transition-all">
                See Gallery Demo
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
              How Photo Distribution Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From capture to sharing - completely automated
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-rose-500 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Photos Captured</h3>
                <p className="text-gray-600">Photographers and guests capture memories throughout your events.</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-rose-600 to-rose-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">AI Organization</h3>
                <p className="text-gray-600">Smart algorithms instantly organize, enhance, and categorize all photos.</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-rose-700 to-rose-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Instant Sharing</h3>
                <p className="text-gray-600">Photos are automatically shared with guests through multiple channels.</p>
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
              Powerful Photo Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need for professional photo management
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

      {/* Distribution Methods */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Multiple Sharing Channels
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Reach every guest through their preferred method
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            {distributionMethods.map((method, index) => (
              <div key={index} className="bg-gradient-to-br from-rose-50 to-rose-50/30 rounded-2xl p-8 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                    {method.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{method.title}</h3>
                    <p className="text-gray-600 mb-4">{method.description}</p>
                    <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-sm font-medium">
                      <CheckCircle className="w-4 h-4" />
                      {method.usage}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {method.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-rose-600" />
                      <span className="text-sm text-gray-700">{benefit}</span>
                    </div>
                  ))}
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
              AI-Powered Photo Management
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Smart technology that makes photo organization effortless
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {photoFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-rose-600 rounded-lg flex-shrink-0 flex items-center justify-center text-white">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 mb-3">{feature.description}</p>
                    <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-sm font-medium">
                      <Zap className="w-4 h-4" />
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
              Real scenarios where smart photo distribution shines
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
                    <span className="inline-block bg-rose-100 text-rose-700 px-2 py-1 rounded-full text-xs font-medium mt-2">
                      {useCase.timing}
                    </span>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 border-l-4 border-orange-500">
                  <p className="text-gray-700 text-sm leading-relaxed">{useCase.example}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-rose-50 to-rose-50/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Why Couples Love It
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The benefits go far beyond just storing photos
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl flex items-center justify-center text-white mb-6">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 mb-4">{benefit.description}</p>
                <div className="inline-flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                  <Camera className="w-4 h-4" />
                  {benefit.impact}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Incredible Results
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
              Capture Every Precious Moment
            </h2>
            <p className="text-xl text-rose-100 mb-8 max-w-2xl mx-auto">
              Never lose a wedding photo again. Smart distribution ensures every memory reaches every guest instantly.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-rose-600 hover:text-rose-700 px-8 py-4 rounded-full font-medium text-lg transition-all shadow-lg hover:shadow-xl">
                Start Photo Sharing
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-rose-600 px-8 py-4 rounded-full font-medium text-lg transition-all">
                View Sample Gallery
              </button>
            </div>
            
            <div className="mt-12 flex items-center justify-center gap-8 text-rose-100">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5" />
                <span className="text-sm">Unlimited Storage</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                <span className="text-sm">Instant Sharing</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span className="text-sm">Privacy Protected</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}