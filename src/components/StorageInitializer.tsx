"use client";

import { useEffect } from 'react';
import { ensureStorageBucket } from '@/lib/storage-utils';

/**
 * Component to initialize storage bucket on app startup
 * Add this to your root layout or main app component
 */
export default function StorageInitializer() {
  useEffect(() => {
    // Initialize storage bucket when app loads
    ensureStorageBucket().catch(error => {
      console.error('Failed to initialize storage bucket:', error);
    });
  }, []);

  // This component doesn't render anything
  return null;
}