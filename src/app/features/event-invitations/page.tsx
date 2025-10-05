import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Calendar, Users, Target, Zap, Clock, UserCheck, 
  CheckCircle, MapPin, Gift, Heart, Music, Camera,
  ArrowRight, Check, Sparkles, Send, Filter, Layers
} from "lucide-react";

export default function EventInvitationsPage() {
  const features = [
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Multi-Event Management",
      description: "Create separate invitations for each wedding event",
      details: "Mehndi, Sangeet, Wedding, Reception"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Smart Guest Targeting",
      description: "Invite specific guests to specific events automatically",
      details: "Family-only, friends-only, or VIP events"
    },
    {
      icon: <UserCheck className="w-8 h-8" />,
      title: "Individual RSVPs",
      description: "Separate RSVP tracking for each event and guest",
      details: "Complete attendance visibility"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Automated Scheduling",
      description: "Send invitations at optimal times for each event",
      details: "Smart timing algorithms"
    },
    {
      icon: <Send className="w-8 h-8" />,
      title: "Multi-Channel Delivery",
      description: "WhatsApp, Email, SMS, and Smart Card integration",
      details: "Reach guests everywhere"
    },
    {
      icon: <Filter className="w-8 h-8" />,
      title: "Advanced Filtering",
      description: "Create dynamic guest lists based on relationships and preferences",
      details: "Intelligent segmentation"
    }
  ];

  const eventTypes = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Engagement Ceremony",
      description: "Intimate celebration with close family",
      guestTypes: ["Immediate Family", "Close Relatives", "Best Friends"],
      timing: "6-8 weeks before wedding",
      customization: "Traditional themes, family-focused content"
    },
    {
      icon: <Music className="w-6 h-6" />,
      title: "Mehndi & Sangeet",
      description: "Fun celebrations with music and dance",
      guestTypes: ["Friends", "Cousins", "Extended Family", "Wedding Party"],
      timing: "2-3 days before wedding", 
      customization: "Colorful designs, music playlists, dress codes"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Wedding Ceremony",
      description: "The main event with all loved ones",
      guestTypes: ["All Invited Guests", "VIP Seating", "General Seating"],
      timing: "3-4 weeks before",
      customization: "Sacred themes, ceremony details, traditions"
    },
    {
      icon: <Gift className="w-6 h-6" />,
      title: "Reception Party",
      description: "Evening celebration and dinner",
      guestTypes: ["Adult Guests", "Family Friends", "Colleagues", "Extended Network"],
      timing: "Same day or next day",
      customization: "Elegant designs, dinner menus, entertainment"
    }
  ];

  const targetingOptions = [
    {
      title: "Relationship-Based",
      description: "Automatically categorize guests by their relationship to the couple",
      options: ["Immediate Family", "Extended Family", "Close Friends", "Colleagues", "Family Friends"],
      icon: <Users className="w-5 h-5" />
    },
    {
      title: "Location-Based",
      description: "Group guests by their geographic location for logistics",
      options: ["Local Guests", "Out-of-Town", "International", "Accommodation Needed"],
      icon: <MapPin className="w-5 h-5" />
    },
    {
      title: "Age-Based",
      description: "Create age-appropriate invitations and event experiences",
      options: ["Adults Only", "Family Friendly", "Kids Welcome", "Senior Guests"],
      icon: <UserCheck className="w-5 h-5" />
    },
    {
      title: "Custom Groups",
      description: "Create your own categories for specific events or needs",
      options: ["VIP Guests", "Wedding Party", "Photography Participants", "Special Dietary"],
      icon: <Target className="w-5 h-5" />
    }
  ];

  const automationFeatures = [
    {
      title: "Smart Event Sequencing",
      description: "Automatically send invitations in the right order with optimal timing",
      benefit: "Perfect guest journey",
      example: "Engagement invite → Save the date → Mehndi details → Wedding invitation → Reception info"
    },
    {
      title: "Dynamic Guest Lists",
      description: "Guest lists update automatically based on RSVPs and preferences",
      benefit: "Always accurate attendance",
      example: "If someone declines wedding, they're automatically removed from reception list"
    },
    {
      title: "Contextual Reminders",
      description: "Send event-specific reminders with relevant details",
      benefit: "Higher attendance rates",
      example: "Mehndi reminder includes henna artist timing, Sangeet reminder includes playlist"
    },
    {
      title: "Cross-Event Coordination",
      description: "Coordinate logistics across multiple events automatically",
      benefit: "Seamless experience",
      example: "Hotel guests get all event locations, local guests get parking details"
    }
  ];

  const benefits = [
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Perfect Guest Experience",
      description: "Each guest gets exactly the invitations they need for events they're invited to",
      impact: "98% guest satisfaction"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Effortless Management",
      description: "Set up once, and all invitations are sent automatically with perfect timing",
      impact: "Save 30+ hours"
    },
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: "Accurate Planning",
      description: "Know exactly who's coming to which events for perfect planning",
      impact: "Zero surprises"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Personal Touch",
      description: "Each invitation feels personal and relevant to the specific event",
      impact: "Memorable experiences"
    }
  ];

  const stats = [
    { number: "15+", label: "Event Types", icon: <Calendar className="w-6 h-6" /> },
    { number: "96%", label: "Response Rate", icon: <UserCheck className="w-6 h-6" /> },
    { number: "50+", label: "Targeting Options", icon: <Target className="w-6 h-6" /> },
    { number: "24/7", label: "Auto-Management", icon: <Zap className="w-6 h-6" /> }
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
              <span>Smart Event Invitations</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-8">
              <span className="font-normal">Every Event Gets</span>
              <br />
              <span className="text-rose-600 font-medium">Perfect Invitations</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Automatically create and send targeted invitations for each wedding event. 
              Smart guest targeting ensures everyone gets invited to the right celebrations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-4 rounded-full font-medium text-lg transition-all shadow-lg hover:shadow-xl">
                Create Event Invites
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </button>
              <button className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 px-8 py-4 rounded-full font-medium text-lg transition-all">
                View Examples
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
              How Event Invitations Work
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Intelligent automation for every celebration
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-rose-500 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Define Your Events</h3>
                <p className="text-gray-600">Set up all your wedding events with dates, venues, and guest requirements.</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-rose-600 to-rose-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Smart Targeting</h3>
                <p className="text-gray-600">AI automatically assigns guests to appropriate events based on relationships and preferences.</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-rose-700 to-rose-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Auto-Send Invites</h3>
                <p className="text-gray-600">Invitations are sent automatically at optimal times with perfect personalization.</p>
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
              Advanced Invitation Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional tools for perfect event management
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

      {/* Event Types */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Perfect for Every Event
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tailored invitations for each celebration in your wedding journey
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
            {eventTypes.map((eventType, index) => (
              <div key={index} className="bg-gradient-to-br from-rose-50 to-rose-50/30 rounded-2xl p-8 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                    {eventType.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{eventType.title}</h3>
                    <p className="text-gray-600 mb-4">{eventType.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {eventType.timing}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Guest Types:</h4>
                    <div className="flex flex-wrap gap-2">
                      {eventType.guestTypes.map((guestType, idx) => (
                        <span key={idx} className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-sm">
                          {guestType}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Customization:</h4>
                    <p className="text-sm text-gray-600">{eventType.customization}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Targeting Options */}
      <section className="py-20 bg-gradient-to-b from-rose-50 to-rose-50/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Smart Guest Targeting
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Intelligent categorization ensures perfect guest experiences
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {targetingOptions.map((option, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-rose-600 rounded-lg flex items-center justify-center text-white mb-4">
                  {option.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{option.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{option.description}</p>
                
                <div className="space-y-2">
                  {option.options.map((opt, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check className="w-3 h-3 text-rose-600" />
                      <span className="text-xs text-gray-700">{opt}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Automation Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Intelligent Automation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Let AI handle the complex coordination while you focus on celebrating
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-8">
            {automationFeatures.map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-rose-50 to-rose-50/30 rounded-2xl p-8">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-rose-600 rounded-lg flex-shrink-0 flex items-center justify-center">
                    <span className="text-white font-bold">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 mb-3">{feature.description}</p>
                    <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-3 py-2 rounded-full text-sm font-medium mb-4">
                      <CheckCircle className="w-4 h-4" />
                      {feature.benefit}
                    </div>
                    <div className="bg-white rounded-lg p-4 border-l-4 border-rose-500">
                      <p className="text-gray-700 text-sm italic">{feature.example}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Why Couples Choose Event-Wise Invitations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The smart way to manage complex wedding celebrations
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
                <div className="inline-flex items-center gap-2 bg-violet-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                  <Zap className="w-4 h-4" />
                  {benefit.impact}
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
              Proven Success
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
              Perfect Events Start Here
            </h2>
            <p className="text-xl text-rose-100 mb-8 max-w-2xl mx-auto">
              Create intelligent, targeted invitations that ensure every guest gets the perfect event experience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-rose-600 hover:text-rose-700 px-8 py-4 rounded-full font-medium text-lg transition-all shadow-lg hover:shadow-xl">
                Create Event Invites
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-rose-600 px-8 py-4 rounded-full font-medium text-lg transition-all">
                See Templates
              </button>
            </div>
            
            <div className="mt-12 flex items-center justify-center gap-8 text-rose-100">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                <span className="text-sm">Smart Targeting</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                <span className="text-sm">Full Automation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm">Perfect Results</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
