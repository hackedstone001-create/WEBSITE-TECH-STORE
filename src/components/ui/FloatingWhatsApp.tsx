'use client';

import React, { useState } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export const FloatingWhatsApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('Windows Activation Assistance');
  const [customMsg, setCustomMsg] = useState('');
  const { websiteSettings } = useStore();

  const rawNumber = websiteSettings?.whatsappNumber || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+919876543210';
  const cleanNumber = rawNumber.replace(/[^0-9]/g, '');

  const topics = [
    'Windows Activation Assistance',
    'AI Subscription Inquiry',
    'Order Verification & Key Status',
    'General License Inquiry',
  ];

  const handleSendMessage = () => {
    const message = customMsg.trim() || `Hello Tech Store, I need assistance regarding: ${selectedTopic}.`;
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#16A36A] hover:bg-[#15803d] text-white shadow-[0_8px_25px_rgba(22,163,106,0.4)] hover:shadow-[0_10px_35px_rgba(22,163,106,0.6)] transition-all duration-300 hover:scale-105 active:scale-95"
          title="Direct WhatsApp Support"
          aria-label="Direct WhatsApp Support"
        >
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full" />
          <MessageSquare className="w-7 h-7" />
        </button>
      )}

      {/* Pop-out WhatsApp Quick Connect Card */}
      {isOpen && (
        <div className="w-80 sm:w-96 rounded-3xl bg-white shadow-2xl border border-[#E8E5ED] overflow-hidden text-[#17151D] animate-in slide-in-from-bottom-5 duration-200">
          {/* Card Header */}
          <div className="bg-[#08080B] text-white p-4 flex items-center justify-between border-b border-purple-500/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold shadow-sm">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight">Tech Store Concierge</h4>
                <p className="text-[11px] text-emerald-400 flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online • WhatsApp Direct
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Topics & Input */}
          <div className="p-4 space-y-3 text-xs">
            <p className="text-[#77717E] text-[11px]">
              Select your inquiry topic or write a message to connect with a specialist:
            </p>

            <div className="space-y-1.5">
              {topics.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTopic(t)}
                  className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all ${
                    selectedTopic === t
                      ? 'bg-purple-50 border-purple-400 text-purple-900 font-bold'
                      : 'bg-[#F5F5F7] border-[#E8E5ED] text-[#17151D] hover:bg-slate-200/60'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div>
              <textarea
                rows={2}
                placeholder="Optional: Add your Order ID or message..."
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                className="w-full bg-[#F5F5F7] border border-[#E8E5ED] rounded-xl p-2.5 text-xs text-[#17151D] placeholder-slate-400 focus:outline-none focus:border-purple-600"
              />
            </div>

            <button
              onClick={handleSendMessage}
              className="w-full py-3 px-4 rounded-xl bg-[#16A36A] hover:bg-[#15803d] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(22,163,106,0.3)] transition-all active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Launch WhatsApp Chat</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
