export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    </div>
  );
}