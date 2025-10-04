"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Search,
  Building2,
  CheckCircle2,
  Circle,
  CircleDot,
  Calendar,
  Filter,
  Download,
  Clock,
  Wrench,
  Sparkles,
  Users
} from "lucide-react";
import { RoomManagementDialog, type Guest, type Room } from "./RoomManagementDialog";

function RoomCard({ room, onClick }: { room: Room; onClick: () => void }) {
  const statusColors = {
    vacant: 'border-gray-300 bg-gray-50 hover:bg-gray-100',
    occupied: 'border-green-300 bg-green-50 hover:bg-green-100',
    partial: 'border-amber-300 bg-amber-50 hover:bg-amber-100',
    reserved: 'border-cyan-300 bg-cyan-50 hover:bg-cyan-100',
    cleaning: 'border-blue-300 bg-blue-50 hover:bg-blue-100',
    maintenance: 'border-red-300 bg-red-50 hover:bg-red-100',
  };

  const statusBadge = {
    vacant: 'bg-gray-500',
    occupied: 'bg-green-600',
    partial: 'bg-amber-500',
    reserved: 'bg-cyan-500',
    cleaning: 'bg-blue-500',
    maintenance: 'bg-red-500',
  };

  const iconColors = {
    reserved: 'text-cyan-600',
    maintenance: 'text-red-600',
    cleaning: 'text-blue-600',
  };

  return (
    <div
      onClick={onClick}
      className={`p-3 rounded-lg border-2 cursor-pointer transition-all hover:shadow-lg hover:scale-105 ${statusColors[room.status]} ${room.suite ? 'col-span-2' : ''}`}
    >
      <div className="flex justify-between items-start mb-2">
        <span className="font-medium text-gray-900">{room.number}</span>
        <div className="flex gap-1">
          {room.status === 'reserved' && <Clock className={`w-3 h-3 ${iconColors.reserved}`} />}
          {room.status === 'maintenance' && <Wrench className={`w-3 h-3 ${iconColors.maintenance}`} />}
          {room.status === 'cleaning' && <Sparkles className={`w-3 h-3 ${iconColors.cleaning}`} />}
        </div>
      </div>

      <div className="w-full h-1.5 bg-gray-200 rounded-full mb-2">
        <div
          className={`h-full rounded-full ${statusBadge[room.status]} transition-all`}
          style={{ width: `${(room.occupied / room.capacity) * 100}%` }}
        />
      </div>

      <div className="flex justify-between items-center">
        <Badge className={`text-[10px] ${statusBadge[room.status]} text-white border-0`}>
          {room.status}
        </Badge>
        <span className="text-xs text-gray-600">
          {room.occupied}/{room.capacity}
        </span>
      </div>

      {room.remarks && (
        <div className="mt-2 text-[10px] text-gray-600 truncate">
          📝 {room.remarks}
        </div>
      )}
    </div>
  );
}

export default function RoomManagementClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWing, setSelectedWing] = useState('Wing A');
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  // Mock guests data
  const [allGuests, setAllGuests] = useState<Guest[]>([
    { id: 'g1', name: 'Rahul Sharma', type: 'Individual' },
    { id: 'g2', name: 'Kumar Family', type: 'Family' },
    { id: 'g3', name: 'Arjun Mehta', type: 'Individual' },
    { id: 'g4', name: 'Neha Kumar', type: 'VIP' },
    { id: 'g5', name: 'Anjali Gupta', type: 'Individual' },
    { id: 'g6', name: 'Mrs. Kapoor', type: 'Elderly' },
    { id: 'g7', name: 'Rajiv & Sonia', type: 'VIP' },
    { id: 'g8', name: 'Suresh Family', type: 'Family' },
    { id: 'g9', name: 'Priya Desai', type: 'Individual' },
    { id: 'g10', name: 'Vikram Singh', type: 'VIP' },
    { id: 'g11', name: 'Sharma Family', type: 'Family' },
    { id: 'g12', name: 'Deepak Patel', type: 'Individual' },
  ]);

  // Mock rooms data
  const [rooms, setRooms] = useState<Room[]>([
    { id: '1', number: '501', capacity: 2, occupied: 2, status: 'occupied', guests: ['g1', 'g9'], remarks: 'Window facing' },
    { id: '2', number: '502', capacity: 3, occupied: 0, status: 'vacant' },
    { id: '3', number: '503', capacity: 2, occupied: 1, status: 'partial', guests: ['g3'] },
    { id: '4', number: '504', capacity: 4, occupied: 4, status: 'occupied', suite: true, guests: ['g2', 'g8'], hamper: 'deluxe', remarks: 'Presidential suite' },
    { id: '5', number: '505', capacity: 2, occupied: 0, status: 'cleaning' },
    { id: '6', number: '506', capacity: 2, occupied: 2, status: 'occupied', guests: ['g4', 'g10'], hamper: 'vip' },
    { id: '7', number: '401', capacity: 2, occupied: 2, status: 'occupied', guests: ['g5', 'g12'] },
    { id: '8', number: '402', capacity: 3, occupied: 0, status: 'vacant' },
    { id: '9', number: '403', capacity: 2, occupied: 0, status: 'reserved', remarks: 'Late check-in expected' },
    { id: '10', number: '404', capacity: 4, occupied: 3, status: 'partial', suite: true, guests: ['g11'] },
    { id: '11', number: '405', capacity: 2, occupied: 0, status: 'maintenance', remarks: 'AC repair scheduled' },
    { id: '12', number: '406', capacity: 2, occupied: 1, status: 'partial', guests: ['g6'], hamper: 'standard', remarks: 'Ground floor preferred' },
  ]);

  const stats = {
    total: rooms.length,
    occupied: rooms.filter(r => r.status === 'occupied').length,
    vacant: rooms.filter(r => r.status === 'vacant').length,
    partial: rooms.filter(r => r.status === 'partial').length,
  };

  const filteredRooms = rooms.filter(room => {
    const query = searchQuery.toLowerCase();
    // Search by room number
    if (room.number.includes(query)) return true;
    // Search by remarks
    if (room.remarks?.toLowerCase().includes(query)) return true;
    // Search by guest names
    if (room.guests?.some(guestId => {
      const guest = allGuests.find(g => g.id === guestId);
      return guest?.name.toLowerCase().includes(query);
    })) return true;
    return false;
  });

  const handleAddGuest = (roomId: string, guestId: string) => {
    setRooms(prevRooms =>
      prevRooms.map(room => {
        if (room.id === roomId) {
          const newGuests = [...(room.guests || []), guestId];
          const newOccupied = newGuests.length;
          let newStatus = room.status;

          if (newOccupied === 0) newStatus = 'vacant';
          else if (newOccupied >= room.capacity) newStatus = 'occupied';
          else newStatus = 'partial';

          return { ...room, guests: newGuests, occupied: newOccupied, status: newStatus };
        }
        return room;
      })
    );
    // Update selected room
    setSelectedRoom(prev => prev ? { ...prev, guests: [...(prev.guests || []), guestId], occupied: (prev.occupied || 0) + 1 } : null);
  };

  const handleRemoveGuest = (roomId: string, guestId: string) => {
    setRooms(prevRooms =>
      prevRooms.map(room => {
        if (room.id === roomId) {
          const newGuests = (room.guests || []).filter(id => id !== guestId);
          const newOccupied = newGuests.length;
          let newStatus = room.status;

          if (newOccupied === 0 && room.status !== 'cleaning' && room.status !== 'maintenance' && room.status !== 'reserved') {
            newStatus = 'vacant';
          } else if (newOccupied > 0 && newOccupied < room.capacity) {
            newStatus = 'partial';
          }

          return { ...room, guests: newGuests, occupied: newOccupied, status: newStatus };
        }
        return room;
      })
    );
    // Update selected room
    setSelectedRoom(prev => prev ? {
      ...prev,
      guests: (prev.guests || []).filter(id => id !== guestId),
      occupied: Math.max(0, (prev.occupied || 0) - 1)
    } : null);
  };

  const handleUpdateRemarks = (roomId: string, remarks: string) => {
    setRooms(prevRooms =>
      prevRooms.map(room => room.id === roomId ? { ...room, remarks } : room)
    );
    setSelectedRoom(prev => prev ? { ...prev, remarks } : null);
  };

  const handleUpdateHamper = (roomId: string, hamper: string) => {
    setRooms(prevRooms =>
      prevRooms.map(room => room.id === roomId ? { ...room, hamper } : room)
    );
    setSelectedRoom(prev => prev ? { ...prev, hamper } : null);
  };

  const handleRoomClick = (room: Room) => {
    setSelectedRoom(room);
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold">Event Room Management</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage guest allocations and room assignments</p>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-muted">
              <Building2 className="w-3 h-3 mr-1" />
              {stats.total} Total
            </Badge>
            <Badge className="bg-green-600 hover:bg-green-700 text-white border-0">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              {stats.occupied}
            </Badge>
            <Badge className="bg-gray-500 hover:bg-gray-600 text-white border-0">
              <Circle className="w-3 h-3 mr-1" />
              {stats.vacant}
            </Badge>
            <Badge className="bg-amber-500 hover:bg-amber-600 text-white border-0">
              <CircleDot className="w-3 h-3 mr-1" />
              {stats.partial}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Event Dates
          </Button>

          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search rooms, guests, or remarks..."
              className="pl-9"
            />
          </div>

          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>

          <Button variant="outline">
            <Users className="w-4 h-4 mr-2" />
            Guests ({allGuests.length})
          </Button>

          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-64 bg-card border-r border-border p-4 overflow-y-auto">
          <h3 className="text-lg font-semibold mb-4">Buildings & Wings</h3>
          <div className="space-y-2">
            {['Wing A', 'Wing B', 'Wing C'].map((wing) => (
              <Card
                key={wing}
                className={`p-4 cursor-pointer transition-all ${
                  selectedWing === wing
                    ? 'bg-rose-50 border-rose-300'
                    : 'border-border hover:bg-accent/10'
                }`}
                onClick={() => setSelectedWing(wing)}
              >
                <div className="font-medium">{wing}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  {Math.floor(rooms.length / 3)} rooms
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Center - Room Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">{selectedWing} · Floor 5</h2>
            <div className="h-1 w-20 bg-rose-500 rounded-full mb-4" />
          </div>

          <div className="grid grid-cols-6 gap-3 mb-8">
            {filteredRooms.slice(0, 6).map((room) => (
              <RoomCard key={room.id} room={room} onClick={() => handleRoomClick(room)} />
            ))}
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">{selectedWing} · Floor 4</h2>
            <div className="h-1 w-20 bg-rose-500 rounded-full mb-4" />
          </div>

          <div className="grid grid-cols-6 gap-3">
            {filteredRooms.slice(6, 12).map((room) => (
              <RoomCard key={room.id} room={room} onClick={() => handleRoomClick(room)} />
            ))}
          </div>
        </div>
      </div>

      {/* Room Management Dialog */}
      <RoomManagementDialog
        room={selectedRoom}
        isOpen={!!selectedRoom}
        onClose={() => setSelectedRoom(null)}
        allGuests={allGuests}
        onAddGuest={handleAddGuest}
        onRemoveGuest={handleRemoveGuest}
        onUpdateRemarks={handleUpdateRemarks}
        onUpdateHamper={handleUpdateHamper}
      />

      {/* Legend */}
      <div className="bg-card border-t border-border p-4">
        <div className="flex flex-wrap items-center gap-4 justify-center">
          <span className="text-sm text-muted-foreground mr-2">Status Legend:</span>
          {[
            { label: 'Vacant', color: 'bg-gray-500' },
            { label: 'Occupied', color: 'bg-green-600' },
            { label: 'Partial', color: 'bg-amber-500' },
            { label: 'Reserved', color: 'bg-cyan-500' },
            { label: 'Cleaning', color: 'bg-blue-500' },
            { label: 'Maintenance', color: 'bg-red-500' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${item.color}`} />
              <span className="text-sm">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
