import { AlertCircle, CheckCircle, X } from "lucide-react";
import { useState, useRef, useCallback } from "react";

export function Toast({ toasts, remove }) {
  return (
    <div className="fixed bottom-4 right-4 left-4 z-50 space-y-2 md:left-auto md:max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`px-4 py-3 rounded-lg shadow-lg flex items-start gap-3 animate-in slide-in-from-bottom-4 duration-300 backdrop-blur-sm border ${
            toast.variant === "destructive"
              ? "bg-danger/10 border-danger/30 text-danger"
              : "bg-accent/10 border-accent/30 text-accent"
          }`}
        >
          <div className="flex-shrink-0 mt-0.5">
            {toast.variant === "destructive" ? (
              <AlertCircle className="w-4 h-4" />
            ) : (
              <CheckCircle className="w-4 h-4" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm">{toast.title}</div>
            <div className="text-xs opacity-90 mt-0.5">{toast.description}</div>
          </div>
          <button
            onClick={() => remove(toast.id)}
            className="flex-shrink-0 p-1 hover:bg-white/10 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}

export function useToast() {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);
  const remove = useCallback((id) => setToasts((t) => t.filter((toast) => toast.id !== id)), []);
  const toast = useCallback(
    (opts) => {
      const id = ++idRef.current;
      setToasts((t) => [...t, { id, ...opts }]);
      setTimeout(() => remove(id), 3000);
    },
    [remove],
  );
  return { toast, toasts, remove };
} 