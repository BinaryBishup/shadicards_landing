import Header from "@/components/Header";
import { 
  Globe, Palette, Smartphone, Zap, Users, Calendar, Camera, 
  Heart, MapPin, Gift, Music, Star, Eye, Settings,
  ArrowRight, Check, Sparkles, Layout, Share2, Lock
} from "lucide-react";

export default function WeddingWebsitePage() {
  const features = [
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Beautiful Themes",
      description: "Choose from stunning, professionally designed templates",
      details: "15+ themes, all mobile-optimized"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile Perfect",
      description: "Looks amazing on every device and screen size",
      details: "Responsive design guaranteed"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Optimized for speed and performance worldwide",
      details: "Loads in under 2 seconds"
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Password Protected",
      description: "Keep your website private for invited guests only",
      details: "Optional password protection"
    },
    {
      icon: <Share2 className="w-8 h-8" />,
      title: "Easy Sharing",
      description: "Share your website with a simple, beautiful link",
      details: "Custom domain available"
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: "Full Control",
      description: "Show or hide sections based on your preferences",
      details: "Complete customization"
    }
  ];

  const sections = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Love Story",
      description: "Share your journey with timeline and photos",
      essential: true
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Events Schedule",
      description: "All your wedding events with times and venues",
      essential: true
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Our Families",
      description: "Introduce families and wedding party members",
      essential: false
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Venue Information",
      description: "Locations with maps and directions",
      essential: true
    },
    {
      icon: <Camera className="w-6 h-6" />,
      title: "Photo Gallery",
      description: "Pre-wedding photos and memories",
      essential: false
    },
    {
      icon: <Gift className="w-6 h-6" />,
      title: "Gift Registry",
      description: "Wishlist and registry information",
      essential: false
    },
    {
      icon: <Music className="w-6 h-6" />,
      title: "Song Requests",
      description: "Let guests request their favorite songs",
      essential: false
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Guest Messages",
      description: "Collect wishes and blessings from loved ones",
      essential: false
    }
  ];

  const themes = [
    {
      name: "Classic Elegance",
      description: "Timeless design with sophisticated typography",
      colors: ["#8B5A5A", "#D4B5A0", "#F5F5DC"],
      style: "Traditional"
    },
    {
      name: "Modern Romance",
      description: "Clean lines with romantic color palettes", 
      colors: ["#FF6B8A", "#FF8FA3", "#FFE5E5"],
      style: "Contemporary"
    },
    {
      name: "Garden Party",
      description: "Nature-inspired with floral elements",
      colors: ["#7FB069", "#A7D0CD", "#F2E9E4"],
      style: "Natural"
    },
    {
      name: "Royal Grandeur",
      description: "Luxurious design with rich colors and gold accents",
      colors: ["#4A154B", "#D4AF37", "#FFE4B5"],
      style: "Luxury"
    }
  ];

  const stats = [
    { number: "50,000+", label: "Websites Created", icon: <Globe className="w-6 h-6" /> },
    { number: "99.9%", label: "Uptime Guaranteed", icon: <Zap className="w-6 h-6" /> },
    { number: "24/7", label: "Support Available", icon: <Heart className="w-6 h-6" /> },
    { number: "15+", label: "Beautiful Themes", icon: <Palette className="w-6 h-6" /> }
  ];

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 bg-gradient-to-br from-rose-50 via-white to-rose-50/30 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(251,113,133,0.1),transparent_70%)]" />
          <div className="absolute top-0 right-0 w-72 h-72 bg-rose-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
          <div className="absolute -bottom-8 left-0 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{animationDelay: '2s'}} />
        </div>
        
        <div className="relative container mx-auto px-6">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-rose-200 text-rose-700 px-5 py-2.5 rounded-full text-sm font-medium mb-8 shadow-sm">
              <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
              <span>Beautiful Wedding Websites</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-light text-gray-900 mb-6 tracking-tight">
              <span className="block font-extralight">Your Love Story</span>
              <span className="block text-rose-600 font-medium bg-gradient-to-r from-rose-600 to-rose-700 bg-clip-text text-transparent">Beautifully Told</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              Create a stunning wedding website in minutes. Share your story, manage RSVPs, 
              and give guests everything they need—all in one beautiful place.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button className="group bg-rose-600 hover:bg-rose-700 text-white px-10 py-4 rounded-full font-medium text-lg transition-all shadow-lg hover:shadow-xl hover:scale-105">
                Create Your Website
                <ArrowRight className="w-5 h-5 ml-2 inline group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border-2 border-rose-200 hover:border-rose-300 bg-white/50 backdrop-blur-sm text-gray-700 hover:text-gray-900 px-10 py-4 rounded-full font-medium text-lg transition-all hover:shadow-lg hover:scale-105">
                View Examples
              </button>
            </div>
            
            {/* Feature highlights */}
            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-rose-600" />
                <span>Live in 5 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-rose-600" />
                <span>Mobile optimized</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-rose-600" />
                <span>No coding required</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-rose-50/30 to-transparent" />
        
        <div className="relative container mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-block bg-rose-100 text-rose-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              Everything Included
            </div>
            <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-6 tracking-tight">
              Professional Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Everything you need to create the perfect wedding website
            </p>
          </div>
          
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-rose-200 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-rose-600 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-rose-600 transition-colors">{feature.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>
                <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-700 px-3 py-1.5 rounded-full text-sm font-medium">
                  <div className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
                  {feature.details}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Website Sections */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-block bg-rose-100 text-rose-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              Website Sections
            </div>
            <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-6 tracking-tight">
              Everything Included
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Every section you need to create the perfect wedding website
            </p>
          </div>
          
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sections.map((section, index) => (
              <div key={index} className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-rose-200 hover:-translate-y-1">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    {section.icon}
                  </div>
                  {section.essential && (
                    <span className="bg-gradient-to-r from-rose-500 to-rose-600 text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-sm">
                      Essential
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-rose-600 transition-colors">{section.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{section.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Themes Showcase */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-50/50 via-transparent to-rose-50/50" />
        
        <div className="relative container mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-block bg-rose-100 text-rose-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              Beautiful Themes
            </div>
            <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-6 tracking-tight">
              Stunning Designs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Choose from professionally designed themes that match your wedding style
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {themes.map((theme, index) => (
              <div key={index} className="group relative bg-white rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-rose-200 hover:-translate-y-2">
                <div 
                  className="absolute inset-0 opacity-5 group-hover:opacity-15 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${theme.colors[0]}, ${theme.colors[1]}, ${theme.colors[2]})`
                  }}
                />
                
                <div className="relative">
                  <div className="flex gap-2 mb-6">
                    {theme.colors.map((color, idx) => (
                      <div 
                        key={idx}
                        className="w-8 h-8 rounded-full border-2 border-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                        style={{ backgroundColor: color, transitionDelay: `${idx * 100}ms` }}
                      />
                    ))}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-rose-600 transition-colors">{theme.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{theme.description}</p>
                  <div className="inline-flex items-center gap-2 bg-gray-100 group-hover:bg-rose-50 text-gray-700 group-hover:text-rose-700 text-xs px-3 py-2 rounded-full font-medium transition-all duration-300">
                    <div className="w-1.5 h-1.5 bg-current rounded-full" />
                    {theme.style}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <button className="group bg-rose-600 hover:bg-rose-700 text-white px-10 py-4 rounded-full font-medium transition-all shadow-lg hover:shadow-xl hover:scale-105">
              View All Themes
              <Eye className="w-4 h-4 ml-2 inline group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-br from-rose-50 via-rose-50/30 to-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}} />
        </div>
        
        <div className="relative container mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-block bg-white/80 backdrop-blur-sm border border-rose-200 text-rose-700 px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-sm">
              Proven Success
            </div>
            <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-6 tracking-tight">
              Trusted Worldwide
            </h2>
          </div>
          
          <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="group text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-rose-500 to-rose-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2 group-hover:text-rose-600 transition-colors">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/30 to-transparent" />
        
        <div className="relative container mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-block bg-rose-100 text-rose-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              Quick Setup
            </div>
            <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-6 tracking-tight">
              Simple to Create
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Get your wedding website online in just a few minutes
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="group text-center">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-rose-500 to-rose-600 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <span className="text-3xl font-bold text-white">1</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-rose-200 rounded-full animate-pulse" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-rose-600 transition-colors">Choose Theme</h3>
                <p className="text-gray-600 leading-relaxed">Select from our collection of beautiful, professionally designed themes that match your style.</p>
              </div>
              
              <div className="group text-center">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-rose-600 to-rose-700 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <span className="text-3xl font-bold text-white">2</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-rose-300 rounded-full animate-pulse" style={{animationDelay: '1s'}} />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-rose-600 transition-colors">Add Your Content</h3>
                <p className="text-gray-600 leading-relaxed">Upload photos, write your story, and add all your wedding details with our easy editor.</p>
              </div>
              
              <div className="group text-center">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-rose-700 to-rose-800 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <span className="text-3xl font-bold text-white">3</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-rose-400 rounded-full animate-pulse" style={{animationDelay: '2s'}} />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-rose-600 transition-colors">Share & Celebrate</h3>
                <p className="text-gray-600 leading-relaxed">Your website is live! Share with guests and start collecting RSVPs instantly.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 bg-gradient-to-br from-rose-600 via-rose-700 to-rose-800 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        </div>
        
        <div className="relative container mx-auto px-6 text-center">
          <div className="max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white px-5 py-2.5 rounded-full text-sm font-medium mb-8">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span>Ready to Start?</span>
            </div>
            
            <h2 className="text-6xl md:text-7xl font-light text-white mb-8 tracking-tight">
              <span className="block">Start Your Website</span>
              <span className="block font-medium">Today</span>
            </h2>
            <p className="text-xl md:text-2xl text-rose-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of couples who chose ShadiCards for their perfect wedding website
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <button className="group bg-white text-rose-600 hover:text-rose-700 px-12 py-5 rounded-full font-medium text-lg transition-all shadow-2xl hover:shadow-3xl hover:scale-105">
                Create Website Now
                <ArrowRight className="w-5 h-5 ml-2 inline group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border-2 border-white/50 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-rose-600 px-12 py-5 rounded-full font-medium text-lg transition-all hover:scale-105">
                See Live Examples
              </button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 text-rose-100">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Check className="w-5 h-5" />
                <span className="text-sm font-medium">No Technical Skills Needed</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Zap className="w-5 h-5" />
                <span className="text-sm font-medium">Live in 5 Minutes</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Heart className="w-5 h-5" />
                <span className="text-sm font-medium">Beautiful Results</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}