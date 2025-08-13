'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SmartLink {
  id: string;
  guest_id: string;
  wedding_id: string;
  override_url: string | null;
  tap_count: number;
  created_at: string;
  updated_at: string;
  guest?: {
    name: string;
    email: string;
    phone: string;
  };
}

interface CommonUrl {
  label: string;
  url: string;
  icon?: string;
}

const COMMON_URLS: CommonUrl[] = [
  { label: 'Instagram', url: 'https://instagram.com/', icon: '📸' },
  { label: 'Google Maps Location', url: 'https://maps.google.com/', icon: '📍' },
  { label: 'WhatsApp Group', url: 'https://chat.whatsapp.com/', icon: '💬' },
  { label: 'Facebook Page', url: 'https://facebook.com/', icon: '📘' },
  { label: 'Website', url: 'https://', icon: '🌐' },
  { label: 'YouTube Video', url: 'https://youtube.com/', icon: '🎥' },
];

interface SmartLinkManagerProps {
  weddingId: string;
}

export default function SmartLinkManager({ weddingId }: SmartLinkManagerProps) {
  const [smartLinks, setSmartLinks] = useState<SmartLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [editingUrl, setEditingUrl] = useState<{ linkId: string; url: string } | null>(null);

  useEffect(() => {
    fetchSmartLinks();
  }, [weddingId]);

  const fetchSmartLinks = async () => {
    try {
      const { data, error } = await supabase
        .from('smart_links')
        .select(`
          *,
          guest:guest_id (
            name,
            email,
            phone
          )
        `)
        .eq('wedding_id', weddingId)
        .order('updated_at', { ascending: false });

      if (error) {
        console.error('Error fetching smart links:', error);
        return;
      }

      setSmartLinks(data || []);
    } catch (error) {
      console.error('Error fetching smart links:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOverrideUrl = async (linkId: string, newUrl: string | null) => {
    setUpdating(linkId);
    try {
      const { error } = await supabase
        .from('smart_links')
        .update({ 
          override_url: newUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', linkId);

      if (error) {
        console.error('Error updating override URL:', error);
        return;
      }

      // Refresh the list
      await fetchSmartLinks();
    } catch (error) {
      console.error('Error updating override URL:', error);
    } finally {
      setUpdating(null);
      setEditingUrl(null);
    }
  };

  const createSmartLink = async (guestId: string) => {
    try {
      const { error } = await supabase
        .from('smart_links')
        .insert({
          guest_id: guestId,
          wedding_id: weddingId,
          override_url: null,
          tap_count: 0
        });

      if (error) {
        console.error('Error creating smart link:', error);
        return;
      }

      await fetchSmartLinks();
    } catch (error) {
      console.error('Error creating smart link:', error);
    }
  };

  const generateTapUrl = (guestId: string) => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/tap/${guestId}/${weddingId}`;
    }
    return `/tap/${guestId}/${weddingId}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="w-6 h-6 border-2 border-rose-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Smart Card Management</h2>
          <p className="text-gray-600">Manage guest smart card taps and redirect settings</p>
        </div>
      </div>

      <div className="grid gap-6">
        {smartLinks.map((link) => (
          <Card key={link.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{link.guest?.name || 'Unknown Guest'}</span>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">
                    {link.tap_count} tap{link.tap_count !== 1 ? 's' : ''}
                  </Badge>
                </div>
              </CardTitle>
              <CardDescription>
                {link.guest?.email} • {link.guest?.phone}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label>Current Redirect Setting</Label>
                  {editingUrl?.linkId === link.id ? (
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <Input
                          value={editingUrl.url}
                          onChange={(e) => setEditingUrl({ linkId: link.id, url: e.target.value })}
                          placeholder="Enter custom URL (e.g., https://instagram.com/username)"
                          className="font-mono text-sm"
                        />
                        <Button
                          onClick={() => updateOverrideUrl(link.id, editingUrl.url || null)}
                          disabled={updating === link.id}
                          size="sm"
                        >
                          Save
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setEditingUrl(null)}
                          size="sm"
                        >
                          Cancel
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {COMMON_URLS.map((commonUrl) => (
                          <Button
                            key={commonUrl.label}
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingUrl({ linkId: link.id, url: commonUrl.url })}
                            className="text-xs justify-start"
                          >
                            <span className="mr-1">{commonUrl.icon}</span>
                            {commonUrl.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="flex-1 text-sm">
                          {link.override_url ? (
                            <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">
                              {link.override_url}
                            </span>
                          ) : (
                            <span className="text-gray-500">Default (First Event)</span>
                          )}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingUrl({ linkId: link.id, url: link.override_url || '' })}
                          disabled={updating === link.id}
                        >
                          {link.override_url ? 'Edit URL' : 'Set URL'}
                        </Button>
                        {link.override_url && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateOverrideUrl(link.id, null)}
                            disabled={updating === link.id}
                            className="text-red-600 hover:text-red-700"
                          >
                            Clear
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <Label>Smart Card URL</Label>
                  <div className="flex gap-2">
                    <Input
                      readOnly
                      value={generateTapUrl(link.guest_id)}
                      className="font-mono text-xs"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText(generateTapUrl(link.guest_id));
                      }}
                    >
                      Copy
                    </Button>
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                Created: {new Date(link.created_at).toLocaleDateString()}
                {link.updated_at !== link.created_at && (
                  <span> • Last updated: {new Date(link.updated_at).toLocaleDateString()}</span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {smartLinks.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500 mb-4">No smart card links found</p>
            <p className="text-sm text-gray-400">
              Smart card links will be automatically created when guests tap their cards
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}