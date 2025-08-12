"use client";

import { useState, useEffect } from "react";
import { User, Phone, Mail, MapPin, Users, Calendar, Check, Save, X, ChevronDown } from "lucide-react";

interface GuestEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  guestData?: {
    name: string;
    email?: string;
    phone?: string;
    relation?: string;
    attendingEvents?: string[];
    guestsCount?: number;
    dietaryPreferences?: string;
    specialRequests?: string;
    address?: string;
  };
  availableEvents?: string[];
  onSave?: (data: any) => void;
}

export default function GuestEditModal({ 
  isOpen,
  onClose,
  guestData = {
    name: "Guest Name",
    email: "",
    phone: "",
    relation: "",
    attendingEvents: [],
    guestsCount: 1,
    dietaryPreferences: "",
    specialRequests: "",
    address: ""
  },
  availableEvents = ["Wedding Ceremony", "Reception", "Mehendi", "Sangeet", "Haldi"],
  onSave
}: GuestEditModalProps) {
  const [formData, setFormData] = useState(guestData);
  const [selectedEvents, setSelectedEvents] = useState<string[]>(guestData.attendingEvents || []);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData(guestData);
      setSelectedEvents(guestData.attendingEvents || []);
    }
  }, [isOpen, guestData]);

  if (!isOpen) return null;

  const relationOptions = [
    "Bride's Family",
    "Groom's Family", 
    "Bride's Friend",
    "Groom's Friend",
    "Colleague",
    "Family Friend",
    "Other"
  ];

  const dietaryOptions = [
    "Vegetarian",
    "Non-Vegetarian",
    "Vegan",
    "Jain",
    "Gluten-Free",
    "No Preferences"
  ];

  const handleEventToggle = (event: string) => {
    setSelectedEvents(prev => 
      prev.includes(event) 
        ? prev.filter(e => e !== event)
        : [...prev, event]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const updatedData = {
        ...formData,
        attendingEvents: selectedEvents
      };
      
      if (onSave) {
        onSave(updatedData);
      }
      
      setShowSuccess(true);
      setIsLoading(false);
      
      // Hide success message and close modal after success
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 1500);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="bg-black p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Update Your Profile</h2>
              <p className="text-white/80 text-sm mt-1">Help us personalize your experience</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Success Banner */}
        {showSuccess && (
          <div className="bg-green-50 border-b border-green-200 px-6 py-3">
            <div className="flex items-center gap-2 text-green-700">
              <Check className="w-5 h-5" />
              <span className="font-medium">Profile updated successfully!</span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-800 font-medium">
                <User className="w-5 h-5" />
                <span>Personal Information</span>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Relation
                  </label>
                  <div className="relative">
                    <select 
                      value={formData.relation}
                      onChange={(e) => setFormData({...formData, relation: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent appearance-none transition-all"
                    >
                      <option value="">Select relation</option>
                      {relationOptions.map(option => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Mail className="w-4 h-4 inline mr-1" />
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="your@email.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Phone className="w-4 h-4 inline mr-1" />
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Address
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  placeholder="Your address"
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none"
                />
              </div>
            </div>

            {/* Event Attendance */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-800 font-medium">
                <Calendar className="w-5 h-5" />
                <span>Event Attendance</span>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Which events will you attend?
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {availableEvents.map(event => (
                    <button
                      key={event}
                      type="button"
                      onClick={() => handleEventToggle(event)}
                      className={`p-3 rounded-lg border-2 transition-all transform hover:scale-105 ${
                        selectedEvents.includes(event)
                          ? "border-black bg-gray-100 text-black"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{event}</span>
                        {selectedEvents.includes(event) && (
                          <Check className="w-4 h-4 ml-2" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Users className="w-4 h-4 inline mr-1" />
                  Number of Guests (including you)
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={formData.guestsCount}
                  onChange={(e) => setFormData({...formData, guestsCount: parseInt(e.target.value)})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Preferences */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-800 font-medium">
                <span className="text-xl">🍽️</span>
                <span>Preferences & Requests</span>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dietary Preferences
                </label>
                <div className="relative">
                  <select 
                    value={formData.dietaryPreferences}
                    onChange={(e) => setFormData({...formData, dietaryPreferences: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent appearance-none transition-all"
                  >
                    <option value="">Select preference</option>
                    {dietaryOptions.map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Special Requests or Notes
                </label>
                <textarea
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
                  placeholder="Any special requirements or messages for the couple..."
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-black hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-full transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>Save Profile</span>
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-full hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}