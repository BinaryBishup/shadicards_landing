import { Suspense } from 'react';
import WeddingPageContent from './WeddingPageContent';

interface PageProps {
  params: Promise<{ url: string }>;
  searchParams: Promise<{ guest?: string }>;
}

export default async function WeddingPage(props: PageProps) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  
  return (
    <Suspense fallback={<LoadingScreen />}>
      <WeddingPageContent url={params.url} guestId={searchParams.guest} />
    </Suspense>
  );
}

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-[rgb(254.7,255,235)] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-rose-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading wedding page...</p>
      </div>
    </div>
  );
}