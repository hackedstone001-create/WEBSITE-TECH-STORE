'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Package, AlertCircle, ArrowRight, ShieldCheck, KeyRound } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function TrackOrderPage() {
  const router = useRouter();
  const { orders } = useStore();
  const [orderQuery, setOrderQuery] = useState('');
  const [emailQuery, setEmailQuery] = useState('');
  const [error, setError] = useState('');

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanOrder = orderQuery.trim().toUpperCase();
    const cleanEmail = emailQuery.trim().toLowerCase();

    const found = orders.find(
      (o) =>
        (o.orderNumber.toUpperCase() === cleanOrder || o.id === cleanOrder) &&
        (!cleanEmail || o.email.toLowerCase() === cleanEmail)
    );

    if (found) {
      router.push(`/orders/${found.id}`);
    } else {
      setError('No matching order found. Please verify your Order ID and Email address.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-16 px-4 bg-[#F5F5F7]">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-[#E8E5ED] shadow-[0_10px_30px_rgba(8,8,11,0.04)] text-center space-y-6">
        <div className="w-14 h-14 rounded-2xl bg-purple-50 text-[#8138F5] border border-purple-100 flex items-center justify-center mx-auto shadow-sm">
          <KeyRound className="w-7 h-7" />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-[#17151D] font-display">Live Order & Key Lookup</h1>
          <p className="text-xs text-[#77717E] mt-1.5 leading-relaxed">
            Enter your Order ID (e.g. <span className="font-mono font-semibold text-purple-700">TS-98241</span>) and delivery email to instantly access your digital software licenses and activation guides.
          </p>
        </div>

        <form onSubmit={handleTrack} className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-semibold text-[#17151D] mb-1">
              Order ID / Number
            </label>
            <input
              type="text"
              required
              placeholder="e.g. TS-98241"
              value={orderQuery}
              onChange={(e) => setOrderQuery(e.target.value)}
              className="w-full bg-[#F5F5F7] border border-[#E8E5ED] rounded-xl px-3.5 py-2.5 text-xs text-[#17151D] uppercase font-mono placeholder-[#77717E] focus:outline-none focus:border-[#8138F5] focus:bg-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#17151D] mb-1">
              Delivery Email Address
            </label>
            <input
              type="email"
              required
              placeholder="alex@example.com"
              value={emailQuery}
              onChange={(e) => setEmailQuery(e.target.value)}
              className="w-full bg-[#F5F5F7] border border-[#E8E5ED] rounded-xl px-3.5 py-2.5 text-xs text-[#17151D] placeholder-[#77717E] focus:outline-none focus:border-[#8138F5] focus:bg-white transition-colors"
            />
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-[#DC4545] text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#DC4545] shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-[#8138F5] hover:bg-[#7025e0] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(129,56,245,0.35)] transition-all active:scale-95"
          >
            <span>Track & Unlock License</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 border-t border-[#E8E5ED] flex items-center justify-center gap-2 text-[11px] text-[#77717E]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#16A36A]" />
          <span>Instant Key Vault with 256-bit secure lookup</span>
        </div>
      </div>
    </div>
  );
}
