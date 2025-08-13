export default function TapRedirectLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-rose-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg">Redirecting to your event...</p>
        <p className="text-gray-500 text-sm mt-2">Please wait while we process your smart card tap</p>
      </div>
    </div>
  );
}