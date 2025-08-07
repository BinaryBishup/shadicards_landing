'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Loader2, User, Phone, Mail, MapPin, Utensils, 
  Upload, Save, ArrowLeft, Check, Camera, Globe, ChevronDown 
} from 'lucide-react'
import Link from 'next/link'

// Country codes with flags
const countryCodes = [
  { code: '+1', country: 'US', flag: '🇺🇸' },
  { code: '+91', country: 'IN', flag: '🇮🇳' },
  { code: '+44', country: 'GB', flag: '🇬🇧' },
  { code: '+61', country: 'AU', flag: '🇦🇺' },
  { code: '+971', country: 'AE', flag: '🇦🇪' },
  { code: '+65', country: 'SG', flag: '🇸🇬' },
  { code: '+86', country: 'CN', flag: '🇨🇳' },
  { code: '+81', country: 'JP', flag: '🇯🇵' },
  { code: '+49', country: 'DE', flag: '🇩🇪' },
  { code: '+33', country: 'FR', flag: '🇫🇷' },
]

interface GuestData {
  id: string
  first_name: string
  last_name: string
  email: string
  whatsapp: string
  side: string
  relationship: string
  address: string
  dietary_preferences: string
  notes: string
  profile_image: string
  preferred_language: string
}

export default function EditProfilePage({
  params,
  searchParams
}: {
  params: Promise<{ url: string }>
  searchParams: Promise<{ guest?: string }>
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [guestData, setGuestData] = useState<GuestData | null>(null)
  const [profileImage, setProfileImage] = useState<string>('')
  const [uploadingImage, setUploadingImage] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [weddingUrl, setWeddingUrl] = useState('')
  const [guestId, setGuestId] = useState('')
  const [selectedCountryCode, setSelectedCountryCode] = useState('+91')
  const [phoneNumber, setPhoneNumber] = useState('')

  useEffect(() => {
    const loadData = async () => {
      const { url } = await params
      const { guest } = await searchParams
      
      setWeddingUrl(url)
      setGuestId(guest || '')
      
      if (!guest) {
        setErrorMessage('Guest ID is required')
        setLoading(false)
        return
      }

      const supabase = createClient()
      
      // Fetch guest data
      const { data, error } = await supabase
        .from('guests')
        .select('*')
        .eq('id', guest)
        .single()

      if (error || !data) {
        setErrorMessage('Guest not found')
        setLoading(false)
        return
      }

      setGuestData(data)
      setProfileImage(data.profile_image || '')
      
      // Parse WhatsApp number
      if (data.whatsapp) {
        const countryCode = countryCodes.find(cc => data.whatsapp.startsWith(cc.code))
        if (countryCode) {
          setSelectedCountryCode(countryCode.code)
          setPhoneNumber(data.whatsapp.substring(countryCode.code.length))
        } else {
          setPhoneNumber(data.whatsapp)
        }
      }
      
      setLoading(false)
    }

    loadData()
  }, [params, searchParams])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    
    // Convert to base64 for demo purposes
    const reader = new FileReader()
    reader.onloadend = () => {
      setProfileImage(reader.result as string)
      setUploadingImage(false)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSaving(true)
    setErrorMessage('')
    setSuccessMessage('')

    const formData = new FormData(e.currentTarget)
    const supabase = createClient()

    const { error } = await supabase
      .from('guests')
      .update({
        first_name: formData.get('first_name'),
        last_name: formData.get('last_name'),
        email: formData.get('email'),
        whatsapp: selectedCountryCode + phoneNumber,
        address: formData.get('address'),
        dietary_preferences: formData.get('dietary_preferences'),
        notes: formData.get('notes'),
        preferred_language: formData.get('preferred_language'),
        profile_image: profileImage,
        updated_at: new Date().toISOString()
      })
      .eq('id', guestId)

    if (error) {
      setErrorMessage('Failed to update profile. Please try again.')
      setSaving(false)
      return
    }

    setSuccessMessage('Profile updated successfully!')
    setSaving(false)
    
    // Redirect back after 2 seconds
    setTimeout(() => {
      router.push(`/wedding/${weddingUrl}?guest=${guestId}`)
    }, 2000)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-gray-900" />
      </div>
    )
  }

  if (!guestData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <Alert className="border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">
                {errorMessage || 'Unable to load guest data'}
              </AlertDescription>
            </Alert>
            <Link href="/" className="mt-4 inline-block">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go to Homepage
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href={`/wedding/${weddingUrl}?guest=${guestId}`}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">
              Edit Profile
            </h1>
            <div className="w-16"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Profile Picture Section */}
            <div className="lg:col-span-1">
              <Card className="bg-white shadow-lg">
                <CardContent className="pt-8">
                  <div className="flex flex-col items-center">
                    {/* Avatar */}
                    <div className="relative group">
                      <Avatar className="w-32 h-32 ring-4 ring-white/20">
                        <AvatarImage src={profileImage} alt={guestData.first_name} />
                        <AvatarFallback className="bg-gradient-to-br from-gray-700 to-gray-900 text-white text-3xl">
                          {guestData.first_name?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      
                      {/* Upload Overlay */}
                      <Label htmlFor="image-upload" className="cursor-pointer">
                        <div className="absolute inset-0 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Camera className="w-8 h-8 text-white" />
                        </div>
                        <Input 
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          disabled={uploadingImage}
                        />
                      </Label>
                    </div>
                    
                    {/* Name Display */}
                    <h2 className="mt-4 text-xl font-semibold text-gray-900">
                      {guestData.first_name} {guestData.last_name}
                    </h2>
                    
                    {/* Side Badge */}
                    <div className="mt-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        guestData.side?.toLowerCase() === 'bride' 
                          ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30' 
                          : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      }`}>
                        {guestData.side?.toLowerCase() === 'bride' ? "Bride's Side" : "Groom's Side"}
                      </span>
                    </div>

                    {/* Upload Button */}
                    <Label htmlFor="image-upload-2" className="mt-6 cursor-pointer w-full">
                      <div className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                        <Upload className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {uploadingImage ? 'Uploading...' : 'Change Photo'}
                        </span>
                      </div>
                      <Input 
                        id="image-upload-2"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={uploadingImage}
                      />
                    </Label>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Form Section */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Personal Information */}
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-gray-900">Personal Information</CardTitle>
                  <CardDescription className="text-gray-600">
                    Update your details for the wedding
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  {/* Name Fields */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first_name" className="text-gray-700 text-sm font-medium">
                        First Name
                      </Label>
                      <Input 
                        id="first_name"
                        name="first_name"
                        defaultValue={guestData.first_name}
                        required
                        className="border-gray-200 focus:border-gray-400 focus:ring-gray-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last_name" className="text-gray-700 text-sm font-medium">
                        Last Name
                      </Label>
                      <Input 
                        id="last_name"
                        name="last_name"
                        defaultValue={guestData.last_name}
                        className="border-gray-200 focus:border-gray-400 focus:ring-gray-400"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700 text-sm font-medium">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input 
                        id="email"
                        name="email"
                        type="email"
                        defaultValue={guestData.email}
                        className="pl-10 border-gray-200 focus:border-gray-400 focus:ring-gray-400"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  {/* WhatsApp with Country Code */}
                  <div className="space-y-2">
                    <Label className="text-gray-700 text-sm font-medium">
                      WhatsApp Number
                    </Label>
                    <div className="flex gap-2">
                      {/* Country Code Selector */}
                      <Select value={selectedCountryCode} onValueChange={setSelectedCountryCode}>
                        <SelectTrigger className="w-[120px] border-gray-200">
                          <SelectValue>
                            {countryCodes.find(cc => cc.code === selectedCountryCode)?.flag} {selectedCountryCode}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {countryCodes.map((country) => (
                            <SelectItem 
                              key={country.code} 
                              value={country.code}
                            >
                              <span className="flex items-center gap-2">
                                <span>{country.flag}</span>
                                <span>{country.code}</span>
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      {/* Phone Number Input */}
                      <div className="relative flex-1">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input 
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="pl-10 border-gray-200 focus:border-gray-400 focus:ring-gray-400"
                          placeholder="1234567890"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-gray-700 text-sm font-medium">
                      Address
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Textarea 
                        id="address"
                        name="address"
                        rows={3}
                        defaultValue={guestData.address}
                        className="pl-10 border-gray-200 text-gray-900 focus:border-gray-400 focus:ring-gray-400 resize-none bg-white"
                        placeholder="Enter your address"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Preferences */}
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-gray-900">Preferences</CardTitle>
                  <CardDescription className="text-gray-600">
                    Help us make your experience better
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  {/* Dietary Preferences */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dietary_preferences" className="text-gray-700 text-sm font-medium">
                        Dietary Preferences
                      </Label>
                      <Select name="dietary_preferences" defaultValue={guestData.dietary_preferences || 'none'}>
                        <SelectTrigger className="border-gray-200 bg-white text-gray-900">
                          <SelectValue placeholder="Select preference" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="none">No Restrictions</SelectItem>
                          <SelectItem value="vegetarian">Vegetarian</SelectItem>
                          <SelectItem value="vegan">Vegan</SelectItem>
                          <SelectItem value="jain">Jain</SelectItem>
                          <SelectItem value="gluten-free">Gluten Free</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Language */}
                    <div className="space-y-2">
                      <Label htmlFor="preferred_language" className="text-gray-700 text-sm font-medium">
                        Preferred Language
                      </Label>
                      <Select name="preferred_language" defaultValue={guestData.preferred_language || 'english'}>
                        <SelectTrigger className="border-gray-200 bg-white text-gray-900">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="hindi">Hindi</SelectItem>
                          <SelectItem value="gujarati">Gujarati</SelectItem>
                          <SelectItem value="punjabi">Punjabi</SelectItem>
                          <SelectItem value="marathi">Marathi</SelectItem>
                          <SelectItem value="tamil">Tamil</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="space-y-2">
                    <Label htmlFor="notes" className="text-gray-700 text-sm font-medium">
                      Special Requests or Notes
                    </Label>
                    <Textarea 
                      id="notes"
                      name="notes"
                      rows={3}
                      defaultValue={guestData.notes}
                      className="border-gray-200 text-gray-900 focus:border-gray-400 focus:ring-gray-400 resize-none bg-white"
                      placeholder="Any special requirements or messages"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Success/Error Messages */}
              {successMessage && (
                <Alert className="border-green-500/20 bg-green-500/10">
                  <Check className="h-4 w-4 text-green-400" />
                  <AlertDescription className="text-green-400">
                    {successMessage}
                  </AlertDescription>
                </Alert>
              )}
              
              {errorMessage && (
                <Alert className="border-red-500/20 bg-red-500/10">
                  <AlertDescription className="text-red-400">
                    {errorMessage}
                  </AlertDescription>
                </Alert>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end gap-4">
                <Link href={`/wedding/${weddingUrl}?guest=${guestId}`}>
                  <Button 
                    type="button" 
                    variant="outline"
                  >
                    Cancel
                  </Button>
                </Link>
                <Button 
                  type="submit" 
                  disabled={saving}
                  className="bg-gray-900 text-white hover:bg-gray-800 font-medium px-8"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}