export default function LoadingSpinner({ message = "جاري التحميل..." }) {
  return (
    <div className="text-white text-center py-8">
      <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-white mb-2"></div>
      <div>{message}</div>
    </div>
  );
} 