import { User, Package } from "lucide-react";

export default function EmptyState({ message }) {
  return (
    <div className="bg-surface border border-border rounded-2xl p-8 text-center">
      <Package className="w-12 h-12 text-text-tertiary mx-auto mb-3" />
      <p className="text-text-secondary">{message || "لا توجد عناصر حالياً"}</p>
    </div>
  );
} 