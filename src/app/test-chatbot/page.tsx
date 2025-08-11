"use client";

import { useState, useEffect } from 'react';
import ChatBar from '@/components/wedding/ChatBar';
import { createClient } from '@/utils/supabase/client';

export default function TestChatbotPage() {
  const [testData, setTestData] = useState<{
    weddingId: string;
    guestId: string;
    weddingName: string;
    guestName: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTestData();
  }, []);

  const fetchTestData = async () => {
    try {
      const supabase = createClient();
      
      // Fetch a sample wedding
      const { data: wedding, error: weddingError } = await supabase
        .from('weddings')
        .select('*')
        .limit(1)
        .single();

      if (weddingError) {
        throw new Error('No wedding found in database');
      }

      // Fetch a sample guest for this wedding
      const { data: guest, error: guestError } = await supabase
        .from('guests')
        .select('*')
        .eq('wedding_id', wedding.id)
        .limit(1)
        .single();

      if (guestError) {
        throw new Error('No guest found for this wedding');
      }

      setTestData({
        weddingId: wedding.id,
        guestId: guest.id,
        weddingName: `${wedding.bride_name} & ${wedding.groom_name}'s Wedding`,
        guestName: guest.name || guest.first_name || 'Guest',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load test data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading test data...</p>
        </div>
      </div>
    );
  }

  if (error || !testData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4">
            <p className="font-semibold">Error Loading Test Data</p>
            <p className="text-sm mt-2">{error || 'No data available'}</p>
          </div>
          <p className="text-gray-600 text-sm">
            Make sure you have at least one wedding with guests in your database.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800">ShadiCards AI Chatbot Test</h1>
          <p className="text-sm text-gray-600 mt-1">Testing with real wedding and guest data</p>
        </div>
      </div>

      {/* Test Info Panel */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-20">
          <h2 className="text-lg font-semibold mb-4">Test Configuration</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Wedding</p>
              <p className="font-medium">{testData.weddingName}</p>
              <p className="text-xs text-gray-400 mt-1">ID: {testData.weddingId}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Guest</p>
              <p className="font-medium">{testData.guestName}</p>
              <p className="text-xs text-gray-400 mt-1">ID: {testData.guestId}</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-2">Test Scenarios</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Ask about venue details and get directions</li>
              <li>• Inquire about events you're invited to</li>
              <li>• Check and update RSVP status</li>
              <li>• Ask about the couple's story</li>
              <li>• Get information about dress code</li>
              <li>• Ask about family members</li>
              <li>• Inquire about accommodation options</li>
            </ul>
          </div>

          <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-medium text-yellow-900 mb-2">Features Implemented</h3>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>✓ Context-aware responses based on guest and wedding data</li>
              <li>✓ GPT-powered intelligent conversation</li>
              <li>✓ Real-time RSVP updates</li>
              <li>✓ Event-specific information</li>
              <li>✓ Smart suggestions based on conversation context</li>
              <li>✓ Persistent chat history in Supabase</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Chatbot Component */}
      <ChatBar
        weddingId={testData.weddingId}
        guestId={testData.guestId}
        weddingName={testData.weddingName}
        guestName={testData.guestName}
      />
    </div>
  );
}