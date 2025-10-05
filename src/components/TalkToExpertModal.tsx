"use client";

import { useState } from "react";
import { X, Phone, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

interface TalkToExpertModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TalkToExpertModal({ isOpen, onClose }: TalkToExpertModalProps) {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage(null);

    try {
      const fullPhoneNumber = `${countryCode}${phoneNumber.replace(/\s+/g, '')}`;

      const { error } = await supabase.from('leads').insert({
        phone_number: fullPhoneNumber,
        country_code: countryCode,
        callback_requested: true,
        message_sent: false,
      });

      if (error) {
        console.error('Supabase error:', error);
        setStatusMessage({
          type: 'error',
          text: 'Failed to submit request. Please try again.',
        });
      } else {
        setStatusMessage({
          type: 'success',
          text: 'Request submitted! Our expert will call you back soon.',
        });
        setName('');
        setPhoneNumber('');
        setTimeout(() => {
          onClose();
          setStatusMessage(null);
        }, 2000);
      }
    } catch (error) {
      setStatusMessage({
        type: 'error',
        text: 'Failed to submit request. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Talk to Our Wedding Expert
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="name" className="text-gray-700 mb-2 block">
              Your Name
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="phone" className="text-gray-700 mb-2 block">
              Your WhatsApp Number
            </Label>
            <div className="flex gap-2">
              <Select value={countryCode} onValueChange={setCountryCode}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="+91">
                    <span className="flex items-center gap-2">
                      <span>🇮🇳</span> +91
                    </span>
                  </SelectItem>
                  <SelectItem value="+1">
                    <span className="flex items-center gap-2">
                      <span>🇺🇸</span> +1
                    </span>
                  </SelectItem>
                  <SelectItem value="+44">
                    <span className="flex items-center gap-2">
                      <span>🇬🇧</span> +44
                    </span>
                  </SelectItem>
                  <SelectItem value="+971">
                    <span className="flex items-center gap-2">
                      <span>🇦🇪</span> +971
                    </span>
                  </SelectItem>
                  <SelectItem value="+61">
                    <span className="flex items-center gap-2">
                      <span>🇦🇺</span> +61
                    </span>
                  </SelectItem>
                  <SelectItem value="+65">
                    <span className="flex items-center gap-2">
                      <span>🇸🇬</span> +65
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
              <div className="relative flex-1">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="98765 43210"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  minLength={10}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {statusMessage && (
            <div className={`text-sm text-center p-3 rounded-lg ${
              statusMessage.type === 'success'
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {statusMessage.text}
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading || !phoneNumber || phoneNumber.length < 10}
            className="w-full bg-rose-500 hover:bg-rose-600 text-white py-3"
          >
            {isLoading ? 'Submitting...' : 'Request Callback'}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            Our expert will call you back within 24 hours
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
