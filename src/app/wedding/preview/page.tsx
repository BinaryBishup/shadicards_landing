import { Suspense } from 'react';
import PreviewContent from './PreviewContent';

export const metadata = {
  title: 'Wedding Template Preview | ShadiCards',
  description: 'Preview beautiful wedding templates',
};

export default function PreviewPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading preview...</p>
        </div>
      </div>
    }>
      <PreviewContent />
    </Suspense>
  );
}
