"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Plus, UserPlus, Package, Search } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export interface Guest {
  id: string;
  name: string;
  type: 'Family' | 'VIP' | 'Elderly' | 'Individual';
}

export interface Room {
  id: string;
  number: string;
  capacity: number;
  occupied: number;
  status: 'vacant' | 'occupied' | 'partial' | 'reserved' | 'cleaning' | 'maintenance';
  guests?: string[];
  suite?: boolean;
  remarks?: string;
  hamper?: string;
}

interface RoomManagementDialogProps {
  room: Room | null;
  isOpen: boolean;
  onClose: () => void;
  allGuests: Guest[];
  onAddGuest: (roomId: string, guestId: string) => void;
  onRemoveGuest: (roomId: string, guestId: string) => void;
  onUpdateRemarks: (roomId: string, remarks: string) => void;
  onUpdateHamper: (roomId: string, hamper: string) => void;
}

export function RoomManagementDialog({
  room,
  isOpen,
  onClose,
  allGuests,
  onAddGuest,
  onRemoveGuest,
  onUpdateRemarks,
  onUpdateHamper,
}: RoomManagementDialogProps) {
  const [searchGuest, setSearchGuest] = useState('');
  const [remarks, setRemarks] = useState(room?.remarks || '');
  const [hamper, setHamper] = useState(room?.hamper || '');

  useEffect(() => {
    if (room) {
      setRemarks(room.remarks || '');
      setHamper(room.hamper || '');
    }
  }, [room]);

  if (!room) return null;

  const roomGuestIds = room.guests || [];
  const assignedGuests = allGuests.filter(g => roomGuestIds.includes(g.id));
  const availableGuests = allGuests.filter(g => !roomGuestIds.includes(g.id));
  const filteredAvailableGuests = availableGuests.filter(g =>
    g.name.toLowerCase().includes(searchGuest.toLowerCase())
  );

  const handleSaveRemarks = () => {
    onUpdateRemarks(room.id, remarks);
  };

  const handleSaveHamper = () => {
    onUpdateHamper(room.id, hamper);
  };

  const statusColors = {
    vacant: 'bg-gray-500',
    occupied: 'bg-green-600',
    partial: 'bg-amber-500',
    reserved: 'bg-cyan-500',
    cleaning: 'bg-blue-500',
    maintenance: 'bg-red-500',
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl">Room {room.number}</DialogTitle>
              <div className="flex items-center gap-3 mt-2">
                <Badge className={`${statusColors[room.status]} text-white border-0`}>
                  {room.status}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Capacity: {room.occupied}/{room.capacity}
                </span>
                {room.suite && (
                  <Badge variant="outline" className="text-xs">Suite</Badge>
                )}
              </div>
            </div>
          </div>
        </DialogHeader>

        <Separator />

        <div className="grid grid-cols-2 gap-6 px-6 py-4 overflow-hidden">
          {/* Left Side - Current Guests */}
          <div className="flex flex-col">
            <div className="mb-4">
              <h3 className="font-medium mb-1 text-lg">Current Guests</h3>
              <p className="text-sm text-muted-foreground">
                {assignedGuests.length} of {room.capacity} spots filled
              </p>
            </div>

            <ScrollArea className="flex-1 h-[300px] rounded-md border p-4">
              {assignedGuests.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                  <UserPlus className="w-8 h-8 mb-2 opacity-50" />
                  <p className="text-sm">No guests assigned yet</p>
                  <p className="text-xs mt-1">Add guests from the list →</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {assignedGuests.map((guest) => (
                    <div
                      key={guest.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                    >
                      <div>
                        <p className="font-medium">{guest.name}</p>
                        <Badge variant="outline" className="text-xs mt-1">
                          {guest.type}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemoveGuest(room.id, guest.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>

            {/* Remarks Section */}
            <div className="mt-4">
              <Label htmlFor="remarks">Remarks / Notes</Label>
              <Textarea
                id="remarks"
                placeholder="Add any special notes or requirements for this room..."
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                onBlur={handleSaveRemarks}
                className="mt-2 min-h-[80px]"
              />
            </div>

            {/* Hamper Section */}
            <div className="mt-4">
              <Label htmlFor="hamper" className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                Room Hamper
              </Label>
              <Select value={hamper} onValueChange={(value) => {
                setHamper(value);
                onUpdateHamper(room.id, value);
              }}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select hamper type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Hamper</SelectItem>
                  <SelectItem value="standard">Standard Hamper</SelectItem>
                  <SelectItem value="premium">Premium Hamper</SelectItem>
                  <SelectItem value="deluxe">Deluxe Hamper</SelectItem>
                  <SelectItem value="vip">VIP Hamper</SelectItem>
                  <SelectItem value="custom">Custom Hamper</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Right Side - Available Guests */}
          <div className="flex flex-col">
            <div className="mb-4">
              <h3 className="font-medium mb-3 text-lg">Add Guests</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search guests..."
                  value={searchGuest}
                  onChange={(e) => setSearchGuest(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <ScrollArea className="flex-1 h-[300px] rounded-md border p-4">
              {filteredAvailableGuests.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                  <Search className="w-8 h-8 mb-2 opacity-50" />
                  <p className="text-sm">
                    {searchGuest ? 'No guests found' : 'All guests are assigned'}
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredAvailableGuests.map((guest) => (
                    <div
                      key={guest.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-card hover:bg-accent/10 transition-colors border border-border"
                    >
                      <div>
                        <p className="font-medium">{guest.name}</p>
                        <Badge variant="outline" className="text-xs mt-1">
                          {guest.type}
                        </Badge>
                      </div>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => onAddGuest(room.id, guest.id)}
                        disabled={room.occupied >= room.capacity}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>

            {room.occupied >= room.capacity && (
              <p className="text-sm text-amber-500 mt-2">
                Room is at full capacity
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
