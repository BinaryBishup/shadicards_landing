"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  Users, Calendar, MessageSquare, CheckSquare, HelpCircle,
  Camera, Palette, Bell, BarChart3, Database, Mail,
  UserCheck, Check
} from "lucide-react";

export default function WorkspaceHeroSection() {
  const [selectedFeatures, setSelectedFeatures] = useState<Set<string>>(new Set(["guests"]));
  const [lastSelected, setLastSelected] = useState("guests");

  const workspaceFeatures = [
    {
      id: "guests",
      title: "Guests",
      icon: <Users className="w-6 h-6" />,
      dashboardImage: "/dashboard/wedding_details.png",
      description: "Manage your complete guest list"
    },
    {
      id: "invitations",
      title: "Invitations",
      icon: <Mail className="w-6 h-6" />,
      dashboardImage: "/dashboard/wedding_website.png",
      description: "Send personalized digital invites"
    },
    {
      id: "rsvp",
      title: "RSVP",
      icon: <CheckSquare className="w-6 h-6" />,
      dashboardImage: "/dashboard/wedding_events.png",
      description: "Track guest confirmations"
    },
    {
      id: "whatsapp",
      title: "WhatsApp",
      icon: <MessageSquare className="w-6 h-6" />,
      dashboardImage: "/dashboard/wedding_details.png",
      description: "Broadcast updates to guests"
    },
    {
      id: "queries",
      title: "Guest Queries",
      icon: <HelpCircle className="w-6 h-6" />,
      dashboardImage: "/dashboard/wedding_website.png",
      description: "Answer guest questions"
    },
    {
      id: "events",
      title: "Events",
      icon: <Calendar className="w-6 h-6" />,
      dashboardImage: "/dashboard/wedding_events.png",
      description: "Manage all ceremonies"
    },
    {
      id: "gallery",
      title: "Gallery",
      icon: <Camera className="w-6 h-6" />,
      dashboardImage: "/dashboard/wedding_details.png",
      description: "Share photos & videos"
    },
    {
      id: "themes",
      title: "Themes",
      icon: <Palette className="w-6 h-6" />,
      dashboardImage: "/dashboard/wedding_website.png",
      description: "Customize card designs"
    },
    {
      id: "checkins",
      title: "Check-ins",
      icon: <UserCheck className="w-6 h-6" />,
      dashboardImage: "/dashboard/wedding_events.png",
      description: "Digital arrival tracking"
    },
    {
      id: "analytics",
      title: "Analytics",
      icon: <BarChart3 className="w-6 h-6" />,
      dashboardImage: "/dashboard/wedding_details.png",
      description: "Track engagement metrics"
    },
    {
      id: "notifications",
      title: "Notifications",
      icon: <Bell className="w-6 h-6" />,
      dashboardImage: "/dashboard/wedding_website.png",
      description: "Send instant updates"
    },
    {
      id: "database",
      title: "Database",
      icon: <Database className="w-6 h-6" />,
      dashboardImage: "/dashboard/wedding_events.png",
      description: "Centralized data management"
    }
  ];

  const toggleFeature = (featureId: string) => {
    const newSelected = new Set(selectedFeatures);
    if (newSelected.has(featureId)) {
      newSelected.delete(featureId);
    } else {
      newSelected.add(featureId);
      setLastSelected(featureId);
    }
    setSelectedFeatures(newSelected);
  };

  const getCurrentDashboardImage = () => {
    const feature = workspaceFeatures.find(f => f.id === lastSelected);
    return feature?.dashboardImage || "/dashboard/wedding_details.png";
  };

  return (
    <section className="min-h-screen py-16 bg-[rgb(254.7,255,235)] overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header Text */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4">
            Stop the Chaos
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-2">
            All your wedding planning, guest management, and smart cards. One unified platform.
          </p>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto">
            A single dashboard for managing every aspect of your wedding—together.
          </p>
        </div>

        {/* Main Interface - Responsive Layout */}
        <div className="max-w-7xl mx-auto relative">
          {/* Mobile Layout - Stacked */}
          <div className="lg:hidden">
            {/* Dashboard Preview */}
            <div className="mb-8">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
                {/* Browser Header */}
                <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-sm text-gray-600 font-medium ml-2">Wedding Dashboard</span>
                  </div>
                </div>
                
                {/* Dashboard Content */}
                <div className="relative h-full bg-gray-50">
                  <Image
                    src={getCurrentDashboardImage()}
                    alt="Dashboard Preview"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                  
                  {/* Bottom Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4">
                    <div className="text-white">
                      <p className="text-xs uppercase tracking-wide opacity-80 mb-1">Currently viewing</p>
                      <h3 className="text-xl font-bold mb-1">
                        {workspaceFeatures.find(f => f.id === lastSelected)?.title}
                      </h3>
                      <p className="text-sm opacity-90">
                        {workspaceFeatures.find(f => f.id === lastSelected)?.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Setup Card for Mobile - Below Dashboard */}
            <div className="px-4">
              <div className="bg-white/30 backdrop-blur-2xl rounded-2xl shadow-2xl p-5 border border-white/40">
                {/* Tag and Heading */}
                <div className="mb-5 text-center">
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-rose-600 bg-rose-50/80 rounded-full mb-3">
                    ✨ Your Wedding Command Center
                  </span>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    Set up your Wedding Hub
                  </h2>
                  <p className="text-sm text-gray-600">
                    Start with what you need, customize as you go.
                  </p>
                </div>

                {/* Feature Grid - 3x4 */}
                <div className="grid grid-cols-3 gap-2.5 mb-5">
                  {workspaceFeatures.map((feature) => (
                    <button
                      key={feature.id}
                      onClick={() => toggleFeature(feature.id)}
                      className={`relative group p-3 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${
                        selectedFeatures.has(feature.id)
                          ? 'border-rose-400 bg-white'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      {/* Checkbox */}
                      <div className={`absolute top-2 right-2 w-4 h-4 rounded border-2 transition-all duration-200 ${
                        selectedFeatures.has(feature.id)
                          ? 'bg-rose-500 border-rose-500'
                          : 'bg-white/80 border-gray-300'
                      }`}>
                        {selectedFeatures.has(feature.id) && (
                          <Check className="w-2.5 h-2.5 text-white absolute top-0 left-0" strokeWidth={3} />
                        )}
                      </div>

                      {/* Icon and Label */}
                      <div className="flex flex-col items-center gap-1.5">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                          selectedFeatures.has(feature.id)
                            ? 'bg-rose-500 text-white'
                            : 'bg-gray-100/80 text-gray-600'
                        }`}>
                          <div className="scale-90">{feature.icon}</div>
                        </div>
                        <span className={`text-xs font-medium ${
                          selectedFeatures.has(feature.id)
                            ? 'text-gray-900'
                            : 'text-gray-700'
                        }`}>
                          {feature.title}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Stats Footer */}
                <div className="grid grid-cols-3 gap-4 pb-4 border-b border-gray-200/50">
                  <div className="text-center">
                    <p className="text-xl font-bold text-gray-900">{selectedFeatures.size}</p>
                    <p className="text-xs text-gray-600">Features Active</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-gray-900">∞</p>
                    <p className="text-xs text-gray-600">Guests</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-gray-900">24/7</p>
                    <p className="text-xs text-gray-600">Support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Layout - Overlapped */}
          <div className="hidden lg:block relative">
            {/* Dashboard Preview - Main Background */}
            <div className="relative mx-auto" style={{ maxWidth: '1100px' }}>
              <div className="relative w-full">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
                  {/* Browser Header */}
                  <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <span className="text-sm text-gray-600 font-medium ml-2">Wedding Dashboard</span>
                    </div>
                  </div>
                  
                  {/* Dashboard Content */}
                  <div className="relative h-full bg-gray-50">
                    <Image
                      src={getCurrentDashboardImage()}
                      alt="Dashboard Preview"
                      fill
                      className="object-cover object-top"
                      priority
                    />
                    
                    {/* Bottom Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-8">
                      <div className="text-white">
                        <p className="text-sm uppercase tracking-wide opacity-80 mb-2">Currently viewing</p>
                        <h3 className="text-3xl font-bold mb-2">
                          {workspaceFeatures.find(f => f.id === lastSelected)?.title}
                        </h3>
                        <p className="text-base opacity-90">
                          {workspaceFeatures.find(f => f.id === lastSelected)?.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Glass Effect Feature Selection Card - Overlapping for Desktop */}
            <div className="absolute bottom-4 right-10 z-10" style={{ maxWidth: '420px' }}>
              <div className="bg-white/20 backdrop-blur-3xl rounded-2xl shadow-2xl p-5 border border-white/30">
                {/* Tag and Heading */}
                <div className="mb-5 text-center">
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-rose-600 bg-rose-50/80 rounded-full mb-3">
                    ✨ Your Wedding Command Center
                  </span>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    Set up your Wedding Hub
                  </h2>
                  <p className="text-sm text-gray-600">
                    Start with what you need, customize as you go.
                  </p>
                </div>

                {/* Feature Grid - 3x4 */}
                <div className="grid grid-cols-3 gap-2.5 mb-5">
                  {workspaceFeatures.map((feature) => (
                    <button
                      key={feature.id}
                      onClick={() => toggleFeature(feature.id)}
                      className={`relative group p-3 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${
                        selectedFeatures.has(feature.id)
                          ? 'border-rose-400 bg-white'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      {/* Checkbox */}
                      <div className={`absolute top-2 right-2 w-4 h-4 rounded border-2 transition-all duration-200 ${
                        selectedFeatures.has(feature.id)
                          ? 'bg-rose-500 border-rose-500'
                          : 'bg-white/80 border-gray-300'
                      }`}>
                        {selectedFeatures.has(feature.id) && (
                          <Check className="w-2.5 h-2.5 text-white absolute top-0 left-0" strokeWidth={3} />
                        )}
                      </div>

                      {/* Icon and Label */}
                      <div className="flex flex-col items-center gap-1.5">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                          selectedFeatures.has(feature.id)
                            ? 'bg-rose-500 text-white'
                            : 'bg-gray-100/80 text-gray-600'
                        }`}>
                          <div className="scale-90">{feature.icon}</div>
                        </div>
                        <span className={`text-xs font-medium ${
                          selectedFeatures.has(feature.id)
                            ? 'text-gray-900'
                            : 'text-gray-700'
                        }`}>
                          {feature.title}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Stats Footer */}
                <div className="grid grid-cols-3 gap-4 pb-4 border-b border-gray-200/50">
                  <div className="text-center">
                    <p className="text-xl font-bold text-gray-900">{selectedFeatures.size}</p>
                    <p className="text-xs text-gray-600">Features Active</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-gray-900">∞</p>
                    <p className="text-xs text-gray-600">Guests</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-gray-900">24/7</p>
                    <p className="text-xs text-gray-600">Support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}