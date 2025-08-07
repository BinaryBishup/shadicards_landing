'use client'

import { useState } from 'react'
import { QrCode, MessageCircle, Calendar, MapPin, Users, Heart, Phone, Camera, Download, Wifi, CreditCard, Star, Gift, Image, Clock } from 'lucide-react'

interface RestrictedAccessProps {
  brideName: string
  groomName: string
  weddingDate: string
  coupleImage?: string
  rsvpContact?: string
}

export default function RestrictedAccess({ 
  brideName, 
  groomName, 
  weddingDate,
  coupleImage,
  rsvpContact 
}: RestrictedAccessProps) {
  const coupleNames = `${brideName} & ${groomName}`
  const [activeTab, setActiveTab] = useState<'smartcard' | 'whatsapp'>('smartcard')
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFEF5] to-white">
      {/* Hero Section with Couple Info */}
      <section className="relative py-16 px-4 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-300 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Couple Header */}
          <div className="text-center mb-16">
            {/* Couple Image with Animation */}
            {coupleImage && (
              <div className="mb-8 flex justify-center">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-2xl opacity-30 group-hover:opacity-40 transition-opacity"></div>
                  <div className="relative w-56 h-56 lg:w-72 lg:h-72 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                    <img
                      src={coupleImage}
                      alt={coupleNames}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-full p-3 shadow-lg">
                    <Heart className="w-8 h-8 text-pink-500 fill-pink-500 animate-pulse" />
                  </div>
                </div>
              </div>
            )}
            
            {/* Couple Names with Animation */}
            <h1 className="text-6xl lg:text-8xl mb-4 animate-fadeIn" style={{ 
              fontFamily: 'var(--font-dancing)', 
              color: '#6B7C6F', 
              fontWeight: 400 
            }}>
              {coupleNames}
            </h1>
            
            {/* Wedding Date */}
            <div className="flex items-center justify-center gap-3 text-xl lg:text-2xl text-gray-600" style={{ 
              fontFamily: 'var(--font-playfair)', 
              fontStyle: 'italic' 
            }}>
              <Calendar className="w-6 h-6 text-purple-500" />
              {new Date(weddingDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
            
            {/* Tagline */}
            <p className="mt-4 text-lg text-gray-500" style={{ fontFamily: 'var(--font-playfair)' }}>
              Join us in celebrating our special day
            </p>
          </div>
          
          {/* Access Required Notice */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-amber-600" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800">
                Restricted Access
              </h2>
            </div>
            <p className="text-center text-gray-700 text-lg">
              Please use your <span className="font-semibold text-purple-600">Smart Wedding Card</span> or <span className="font-semibold text-green-600">WhatsApp Invitation Link</span> to access this wedding website
            </p>
          </div>
          
          {/* Access Your Invitation Section */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-16">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-8 text-white">
              <h2 className="text-3xl lg:text-4xl text-center mb-2" style={{ 
                fontFamily: 'var(--font-dancing)', 
                fontWeight: 400 
              }}>
                How to Access Your Invitation
              </h2>
              <p className="text-center text-white/90">Choose your preferred method to view all wedding details</p>
            </div>
            
            {/* Tabs */}
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab('smartcard')}
                className={`flex-1 py-4 px-6 font-medium transition-colors ${
                  activeTab === 'smartcard' 
                    ? 'bg-purple-50 text-purple-600 border-b-2 border-purple-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  <span>Smart Wedding Card</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('whatsapp')}
                className={`flex-1 py-4 px-6 font-medium transition-colors ${
                  activeTab === 'whatsapp' 
                    ? 'bg-green-50 text-green-600 border-b-2 border-green-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  <span>WhatsApp Invitation</span>
                </div>
              </button>
            </div>
            
            {/* Tab Content */}
            <div className="p-8 lg:p-12">
              {activeTab === 'smartcard' ? (
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Smart Card Options */}
                  <div className="space-y-6">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Use Your Smart Card</h3>
                    
                    {/* Scan Option */}
                    <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-xl">
                      <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <QrCode className="w-7 h-7 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">Scan QR Code</h4>
                        <p className="text-gray-600 text-sm">Use your phone camera to scan the QR code on your invitation card</p>
                      </div>
                    </div>
                    
                    {/* Tap Option */}
                    <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl">
                      <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Wifi className="w-7 h-7 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">Tap to View</h4>
                        <p className="text-gray-600 text-sm">Simply tap your NFC-enabled card on your phone to instantly access</p>
                      </div>
                    </div>
                    
                    {/* Download Photos Feature */}
                    <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl">
                      <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Download className="w-7 h-7 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">Download Event Photos</h4>
                        <p className="text-gray-600 text-sm">Access and download your personal event pictures using the smart card</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Smart Card Benefits */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
                    <h4 className="text-xl font-semibold text-gray-800 mb-4">Smart Card Benefits</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                        <span className="text-gray-700">Instant access with one tap</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Image className="w-5 h-5 text-purple-600" />
                        <span className="text-gray-700">View & download event photos</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Gift className="w-5 h-5 text-pink-600" />
                        <span className="text-gray-700">Personalized guest experience</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-blue-600" />
                        <span className="text-gray-700">Real-time event updates</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="max-w-2xl mx-auto text-center">
                  <div className="mb-8">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageCircle className="w-12 h-12 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">WhatsApp Invitation</h3>
                    <p className="text-gray-600">Check your WhatsApp messages for your personalized invitation link. Click on the link to access all wedding details, RSVP, and more.</p>
                  </div>
                  
                  <div className="bg-green-50 rounded-xl p-6">
                    <p className="text-sm text-gray-600 mb-2">Haven\'t received your invitation?</p>
                    <p className="font-semibold text-gray-800">Contact us at {rsvpContact || 'the number provided'}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Features Section */}
          <div className="mb-16">
            <h3 className="text-3xl lg:text-4xl text-center mb-12" style={{ 
              fontFamily: 'var(--font-dancing)', 
              color: '#8B9A8C', 
              fontWeight: 400 
            }}>
              What\'s Included in Your Access
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Feature Cards */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Event Schedule</h4>
                <p className="text-gray-600 text-sm">View all ceremonies and events you\'re invited to</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-pink-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Venue Navigation</h4>
                <p className="text-gray-600 text-sm">Get directions and venue details for each event</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">RSVP Management</h4>
                <p className="text-gray-600 text-sm">Confirm your attendance and guest count</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Camera className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Photo Gallery</h4>
                <p className="text-gray-600 text-sm">Access and download your event memories</p>
              </div>
            </div>
          </div>
          
          {/* Contact Section */}
          {rsvpContact && (
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-8 text-white text-center">
              <Phone className="w-12 h-12 mx-auto mb-4 text-white" />
              <h3 className="text-2xl font-semibold mb-2">Need Assistance?</h3>
              <p className="mb-4">Our wedding coordinator is here to help</p>
              <a 
                href={`tel:${rsvpContact}`}
                className="inline-flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                <Phone className="w-5 h-5" />
                {rsvpContact}
              </a>
            </div>
          )}
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-500 text-sm" style={{ fontFamily: 'var(--font-playfair)' }}>
            We can\'t wait to celebrate with you! Use your Smart Card or WhatsApp invitation to unlock your personalized wedding experience.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-gray-400">
            <Heart className="w-4 h-4 fill-current" />
            <span className="text-sm">Made with ShadiCards</span>
          </div>
        </div>
      </footer>
    </div>
  )
}