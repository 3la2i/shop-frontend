import { useState, useRef, useCallback } from "react";

// Toast Component
export function Toast({ toasts, remove }) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`px-4 py-2 rounded shadow text-white ${toast.variant === "destructive" ? "bg-red-600" : "bg-slate-800"}`}
        >
          <div className="font-bold">{toast.title}</div>
          <div>{toast.description}</div>
          <button onClick={() => remove(toast.id)} className="absolute top-1 right-2 text-xs">×</button>
        </div>
      ))}
    </div>
  );
}

// Toast Hook
export function useToast() {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);
  const remove = useCallback((id) => setToasts((t) => t.filter((toast) => toast.id !== id)), []);
  const toast = useCallback((opts) => {
    const id = ++idRef.current;
    setToasts((t) => [...t, { id, ...opts }]);
    setTimeout(() => remove(id), 3000);
  }, [remove]);
  return { toast, toasts, remove };
} 