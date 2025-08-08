"use client";

import { useState } from "react";
import Image from "next/image";
import { User, Camera, Phone, Mail, MapPin, Users, Calendar, Check, Sparkles, Save, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface GuestProfileEditProps {
  guestData?: {
    name: string;
    email?: string;
    phone?: string;
    avatar?: string;
    relation?: string;
    attendingEvents?: string[];
    guestsCount?: number;
    dietaryPreferences?: string;
    specialRequests?: string;
    address?: string;
  };
  availableEvents?: string[];
  onSave?: (data: any) => void;
  onCancel?: () => void;
}

export default function GuestProfileEdit({ 
  guestData = {
    name: "Guest Name",
    email: "",
    phone: "",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=guest&backgroundColor=ffd5dc",
    relation: "",
    attendingEvents: [],
    guestsCount: 1,
    dietaryPreferences: "",
    specialRequests: "",
    address: ""
  },
  availableEvents = ["Wedding Ceremony", "Reception", "Mehendi", "Sangeet", "Haldi"],
  onSave,
  onCancel
}: GuestProfileEditProps) {
  const [formData, setFormData] = useState(guestData);
  const [selectedEvents, setSelectedEvents] = useState<string[]>(guestData.attendingEvents || []);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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
      
      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[rgb(254.7,255,235)] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgb(254.7,255,235)] to-[rgb(252,250,230)]" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full filter blur-3xl opacity-20" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-100 rounded-full filter blur-3xl opacity-20" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <User className="w-4 h-4" />
            <span>Guest Profile</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-2">
            Update Your Profile
          </h1>
          <p className="text-gray-600">Help the couple know more about you and your preferences</p>
        </div>

        {/* Profile Card */}
        <Card className="backdrop-blur-sm bg-white/90 border-gray-200 shadow-xl">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-normal text-gray-900">
                  Guest Information
                </CardTitle>
                <CardDescription className="mt-1">
                  Update your details for a personalized wedding experience
                </CardDescription>
              </div>
              {showSuccess && (
                <Badge className="bg-green-100 text-green-700 border-green-300">
                  <Check className="w-3 h-3 mr-1" />
                  Saved Successfully
                </Badge>
              )}
            </div>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Picture Section */}
              <div className="flex items-center gap-6 pb-6 border-b border-gray-200">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-200 bg-white">
                    <img 
                      src={formData.avatar} 
                      alt={formData.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-medium text-gray-900">{formData.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">Guest Profile</p>
                </div>
              </div>

              {/* Personal Information */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                  <User className="w-5 h-5 text-gray-600" />
                  Personal Information
                </h4>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="bg-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="relation">Relation</Label>
                    <Select 
                      value={formData.relation}
                      onValueChange={(value) => setFormData({...formData, relation: value})}
                    >
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select your relation" />
                      </SelectTrigger>
                      <SelectContent>
                        {relationOptions.map(option => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      <Mail className="w-4 h-4 inline mr-1" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="your@email.com"
                      className="bg-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      <Phone className="w-4 h-4 inline mr-1" />
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+91 98765 43210"
                      className="bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Address
                  </Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    placeholder="Your address"
                    className="bg-white min-h-[80px]"
                  />
                </div>
              </div>

              {/* Event Attendance */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  Event Attendance
                </h4>
                
                <div className="space-y-3">
                  <Label>Which events will you attend?</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {availableEvents.map(event => (
                      <button
                        key={event}
                        type="button"
                        onClick={() => handleEventToggle(event)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          selectedEvents.includes(event)
                            ? "border-rose-400 bg-rose-50 text-rose-700"
                            : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{event}</span>
                          {selectedEvents.includes(event) && (
                            <Check className="w-4 h-4" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guests">
                    <Users className="w-4 h-4 inline mr-1" />
                    Number of Guests (including you)
                  </Label>
                  <Input
                    id="guests"
                    type="number"
                    min="1"
                    max="10"
                    value={formData.guestsCount}
                    onChange={(e) => setFormData({...formData, guestsCount: parseInt(e.target.value)})}
                    className="bg-white"
                  />
                </div>
              </div>

              {/* Preferences */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-gray-600" />
                  Preferences & Requests
                </h4>
                
                <div className="space-y-2">
                  <Label htmlFor="dietary">Dietary Preferences</Label>
                  <Select 
                    value={formData.dietaryPreferences}
                    onValueChange={(value) => setFormData({...formData, dietaryPreferences: value})}
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select dietary preference" />
                    </SelectTrigger>
                    <SelectContent>
                      {dietaryOptions.map(option => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requests">Special Requests or Notes</Label>
                  <Textarea
                    id="requests"
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
                    placeholder="Any special requirements or messages for the couple..."
                    className="bg-white min-h-[100px]"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t border-gray-200">
                <Button 
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full h-12"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Saving...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Save className="w-5 h-5" />
                      <span>Save Profile</span>
                    </div>
                  )}
                </Button>
                
                {onCancel && (
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    className="px-8 h-12 rounded-full"
                  >
                    <X className="w-5 h-5 mr-2" />
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Profile powered by{" "}
            <span className="font-medium text-gray-700">ShadiCards</span>
          </p>
        </div>
      </div>
    </div>
  );
}