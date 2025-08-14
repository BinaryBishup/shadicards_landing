import Header from "@/components/Header";
import { 
  UserPlus, Smartphone, Database, Zap, Users, BarChart3, 
  CheckCircle, MapPin, Phone, Mail, Calendar, Gift,
  ArrowRight, Check, Sparkles, Upload, Download, Shield
} from "lucide-react";

export default function GuestDataCollectionPage() {
  const features = [
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Smart Card Integration",
      description: "Guests automatically register when they tap your smart card",
      details: "Zero friction, instant capture"
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Complete Profiles",
      description: "Collect contact info, dietary preferences, and more",
      details: "Comprehensive guest database"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-time Sync",
      description: "All data syncs instantly to your dashboard",
      details: "Live updates, always accurate"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Smart Analytics",
      description: "Track guest engagement and response rates",
      details: "Data-driven insights"
    },
    {
      icon: <Upload className="w-8 h-8" />,
      title: "Easy Import/Export",
      description: "Import existing lists, export to any format",
      details: "CSV, Excel, Google Sheets"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Privacy Protected",
      description: "GDPR compliant with secure data handling",
      details: "Your guests' privacy matters"
    }
  ];

  const dataTypes = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Basic Information",
      description: "Name, phone, email automatically captured",
      fields: ["Full Name", "Phone Number", "Email Address", "Plus One Details"]
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Location Data",
      description: "Address and location preferences",
      fields: ["Home Address", "City/State", "Travel Needs", "Accommodation"]
    },
    {
      icon: <Gift className="w-6 h-6" />,
      title: "Preferences",
      description: "Dietary, accessibility, and special needs",
      fields: ["Dietary Requirements", "Allergies", "Accessibility Needs", "Special Requests"]
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Event Preferences",
      description: "RSVP status and event attendance",
      fields: ["RSVP Status", "Event Attendance", "Meal Choices", "Song Requests"]
    }
  ];

  const automationFeatures = [
    {
      title: "Smart Card Tap Registration",
      description: "When guests tap your smart card, they're automatically prompted to complete their profile",
      benefit: "No manual data entry required"
    },
    {
      title: "Progressive Data Collection",
      description: "Collect basic info first, then gather additional details over time",
      benefit: "Higher completion rates"
    },
    {
      title: "Duplicate Prevention",
      description: "Smart system prevents duplicate entries and merges similar records",
      benefit: "Clean, organized database"
    },
    {
      title: "Auto-Reminders",
      description: "Gentle reminders for guests who haven't completed their profiles",
      benefit: "Maximum data collection"
    }
  ];

  const benefits = [
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Seamless Guest Experience",
      description: "Guests love how easy it is - one tap and they're registered",
      impact: "95% completion rate"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Perfect Planning",
      description: "Know exactly who's coming, what they need, and how to reach them",
      impact: "Save 20+ hours"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Real-time Updates",
      description: "Changes sync instantly across all your planning tools",
      impact: "Always up-to-date"
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "Universal Export",
      description: "Export to any format for caterers, venues, or other vendors",
      impact: "Works with any system"
    }
  ];

  const stats = [
    { number: "98%", label: "Data Accuracy", icon: <CheckCircle className="w-6 h-6" /> },
    { number: "95%", label: "Completion Rate", icon: <Users className="w-6 h-6" /> },
    { number: "20+", label: "Hours Saved", icon: <Zap className="w-6 h-6" /> },
    { number: "GDPR", label: "Compliant", icon: <Shield className="w-6 h-6" /> }
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
              <span>Automated Data Collection</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-8">
              <span className="font-normal">Guest Information</span>
              <br />
              <span className="text-rose-600 font-medium">Collected Automatically</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Say goodbye to manual RSVPs and incomplete guest lists. Our smart cards automatically 
              collect comprehensive guest information the moment they tap - no forms, no hassle.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-4 rounded-full font-medium text-lg transition-all shadow-lg hover:shadow-xl">
                Start Collecting Data
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </button>
              <button className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 px-8 py-4 rounded-full font-medium text-lg transition-all">
                See How It Works
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
              How Auto Collection Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three simple steps to complete guest data collection
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-rose-500 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Guest Taps Card</h3>
                <p className="text-gray-600">Your guest receives and taps their personalized smart card with their phone.</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-rose-600 to-rose-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Profile Completion</h3>
                <p className="text-gray-600">Smart system guides them through a quick profile completion with pre-filled data.</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-rose-700 to-rose-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Data Syncs Instantly</h3>
                <p className="text-gray-600">All information appears in your dashboard immediately, ready for planning.</p>
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
              Powerful Data Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need for comprehensive guest data management
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

      {/* Data Types Collected */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Complete Guest Profiles
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Collect all the information you need for perfect event planning
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dataTypes.map((dataType, index) => (
              <div key={index} className="bg-gradient-to-b from-gray-50 to-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl flex items-center justify-center text-white mb-4">
                  {dataType.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{dataType.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{dataType.description}</p>
                
                <div className="space-y-2">
                  {dataType.fields.map((field, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check className="w-3 h-3 text-rose-600" />
                      <span className="text-xs text-gray-700">{field}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Automation Features */}
      <section className="py-20 bg-gradient-to-b from-rose-50 to-rose-50/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Smart Automation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Intelligent features that work behind the scenes
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {automationFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-rose-600 rounded-lg flex-shrink-0 flex items-center justify-center">
                    <span className="text-white font-bold">{index + 1}</span>
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

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Why Couples Love It
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The benefits go far beyond just collecting information
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-gradient-to-br from-rose-50 to-rose-50/30 rounded-2xl p-8">
                <div className="w-14 h-14 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl flex items-center justify-center text-white mb-6">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 mb-4">{benefit.description}</p>
                <div className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-medium">
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
              Proven Results
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
              Stop Chasing Guest Information
            </h2>
            <p className="text-xl text-rose-100 mb-8 max-w-2xl mx-auto">
              Let our smart cards do the work for you. Complete guest data collection, automatically.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-rose-600 hover:text-rose-700 px-8 py-4 rounded-full font-medium text-lg transition-all shadow-lg hover:shadow-xl">
                Start Auto-Collection
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-rose-600 px-8 py-4 rounded-full font-medium text-lg transition-all">
                See Demo
              </button>
            </div>
            
            <div className="mt-12 flex items-center justify-center gap-8 text-rose-100">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm">95% Completion Rate</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                <span className="text-sm">Instant Setup</span>
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