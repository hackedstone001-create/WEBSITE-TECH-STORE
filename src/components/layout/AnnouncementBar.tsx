'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, X } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export const AnnouncementBar = () => {
  const { websiteSettings } = useStore();
  const [isDismissed, setIsDismissed] = useState(false);

  const announcement = websiteSettings?.announcement;

  if (!announcement || !announcement.enabled || isDismissed) {
    return null;
  }

  return (
    <div className="relative z-50 bg-[#08080B] text-white border-b border-purple-500/20 py-2 px-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-xs sm:text-sm">
        {/* Empty left spacer on desktop for balance */}
        <div className="hidden sm:block w-8" />

        {/* Center announcement text & link */}
        <div className="flex-1 flex items-center justify-center gap-2.5 text-center">
          {announcement.badge && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-600/30 text-purple-300 border border-purple-500/30 shadow-[0_0_12px_rgba(129,56,245,0.3)]">
              <Sparkles className="w-3 h-3 text-purple-300" />
              {announcement.badge}
            </span>
          )}
          <span className="text-slate-200 font-medium">
            {announcement.text}
          </span>
          {announcement.link && (
            <Link
              href={announcement.link}
              className="inline-flex items-center gap-1 font-semibold text-purple-400 hover:text-purple-300 transition-colors ml-1 group underline-offset-4 hover:underline"
            >
              <span>Explore</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          )}
        </div>

        {/* Dismiss button */}
        <button
          onClick={() => setIsDismissed(true)}
          className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
