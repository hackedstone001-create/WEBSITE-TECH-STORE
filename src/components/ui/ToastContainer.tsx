'use client';

import React from 'react';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export const ToastContainer = () => {
  const { toasts } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto p-3.5 rounded-xl border backdrop-blur-md shadow-2xl flex items-center gap-3 text-xs font-semibold animate-in slide-in-from-bottom-3 duration-200 ${
            toast.type === 'error'
              ? 'bg-red-950/80 border-red-500/40 text-red-200'
              : toast.type === 'info'
              ? 'bg-[#141E30]/90 border-cyan-500/40 text-cyan-200'
              : 'bg-[#141E30]/90 border-emerald-500/40 text-emerald-200 shadow-glow-blue'
          }`}
        >
          {toast.type === 'error' ? (
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
          ) : toast.type === 'info' ? (
            <Info className="w-4 h-4 text-cyan-400 flex-shrink-0" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          )}
          <span className="flex-1 text-white">{toast.message}</span>
        </div>
      ))}
    </div>
  );
};
