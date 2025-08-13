import { Suspense } from 'react';
import EditPageContent from './EditPageContent';

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ guest?: string }>;
}

export default async function EditPage(props: PageProps) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  
  return (
    <Suspense fallback={<EditLoadingScreen />}>
      <EditPageContent weddingId={params.id} guestId={searchParams.guest} />
    </Suspense>
  );
}

function EditLoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-rose-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading your details...</p>
      </div>
    </div>
  );
}