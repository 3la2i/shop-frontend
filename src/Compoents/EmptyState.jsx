import { User } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-center">
      <User className="w-12 h-12 text-slate-400 mx-auto mb-2" />
      <p className="text-slate-400">لا توجد عملاء حالياً</p>
    </div>
  );
} 