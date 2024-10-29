export default function LoadingIndicator() {
  return (
    <div className="flex gap-4">
      <div className="w-8 h-8 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
      <p className="text-lg text-gray-600">Loading...</p>
    </div>
  );
}
