"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, type: ToastType = "info") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2800);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              "pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-[12px] bg-[#0B1220] text-white text-xs font-medium shadow-[0_4px_12px_-2px_rgba(11,18,32,0.18)] border border-[rgba(255,255,255,0.10)] transition-all duration-200 animate-in fade-in slide-in-from-bottom-2",
              t.type === "success" && "border-l-4 border-l-[#16A34A]",
              t.type === "error" && "border-l-4 border-l-[#DC2626]",
              t.type === "info" && "border-l-4 border-l-[#B8F34A]"
            )}
          >
            <div className="flex items-center gap-2.5">
              {t.type === "success" && <CheckCircle2 className="h-4 w-4 text-[#16A34A] shrink-0" />}
              {t.type === "error" && <AlertCircle className="h-4 w-4 text-[#DC2626] shrink-0" />}
              {t.type === "info" && <Info className="h-4 w-4 text-[#B8F34A] shrink-0" />}
              <span>{t.message}</span>
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="p-1 hover:text-[#A8B3C7] rounded"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    return {
      toast: (msg: string) => console.log("Toast fallback:", msg),
    };
  }
  return ctx;
}
