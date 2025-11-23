export default function LoadingSpinner({ message = "جاري التحميل..." }) {
  return (
    <div className="text-text text-center py-8">
      <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-primary mb-2"></div>
      <div className="text-text-secondary">{message}</div>
    </div>
  );
} 