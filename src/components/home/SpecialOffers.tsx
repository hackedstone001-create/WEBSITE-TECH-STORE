'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Tag, Clock, ArrowRight, CheckCircle2, ShoppingBag, Sparkles, Percent } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { formatPrice } from '@/lib/utils';

export const SpecialOffers = () => {
  const { addToCart, products, showToast } = useStore();
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 42, seconds: 18 });

  // Countdown timer simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Bundles strictly covering:
  // - AI Tool Bundles
  // - Productivity Bundles
  // - Software Bundles
  // - Seasonal Offers
  const bundles = [
    {
      id: 'bundle-ai-frontier',
      category: 'AI Tool Bundle',
      title: 'Frontier AI Powerhouse Pack',
      badge: 'Save 40%',
      targetSlug: 'chatgpt-plus-subscription',
      originalTotal: 5898,
      bundlePrice: 3499,
      description: 'The definitive artificial intelligence bundle. Full ChatGPT Plus with Canvas alongside Midjourney Pro for high-speed generative art.',
      items: [
        'ChatGPT Plus (GPT-4o & Canvas Workspace)',
        'Midjourney Pro (Fast GPU & Stealth Mode)',
        'Prompt Master Guide & Setup Assistance',
      ],
    },
    {
      id: 'bundle-office-pro',
      category: 'Productivity Bundle',
      title: 'Windows 11 Pro + Office 2024 Suite',
      badge: 'Save 50%',
      targetSlug: 'windows-11-pro-retail',
      originalTotal: 6998,
      bundlePrice: 2899,
      description: 'Equip your workstation with Microsoft’s latest operating system and standalone Office 2024 Pro Plus lifetime permanent suite.',
      items: [
        'Windows 11 Pro Retail License (Lifetime / 1 PC)',
        'Office 2024 Pro Plus Lifetime (Word, Excel, PowerPoint)',
        'Official Microsoft Server Activation',
      ],
    },
    {
      id: 'bundle-dev-stack',
      category: 'Software & Dev Bundle',
      title: 'Full-Stack Developer Suite',
      badge: 'Save 45%',
      targetSlug: 'cursor-ai-pro',
      originalTotal: 7298,
      bundlePrice: 3999,
      description: 'Designed for engineering velocity. Windows 11 Pro workstation license with Cursor AI Pro coding environment.',
      items: [
        'Windows 11 Pro Workstation Key',
        'Cursor AI Pro (1 Month Developer Subscription)',
        'Instant Automated License Dispatch',
      ],
    },
  ];

  const handleClaimBundle = (bundle: typeof bundles[0]) => {
    const prod = products.find((p) => p.slug === bundle.targetSlug) || products[0];
    if (prod) {
      addToCart(prod);
      showToast(`Bundle "${bundle.title}" added to cart!`, 'success');
    }
  };

  return (
    <section className="py-20 sm:py-24 bg-[#F5F5F7] relative border-b border-[#E8E5ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Countdown Timer */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 border border-purple-200 text-purple-700 text-xs font-semibold">
              <Tag className="w-3.5 h-3.5 text-purple-600" />
              <span>LIMITED-TIME PROMOTIONAL BUNDLES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17151D] tracking-tight font-display">
              Curated Software & AI Bundles
            </h2>
            <p className="text-sm sm:text-base text-[#77717E] max-w-xl">
              Combine essential operating systems, productivity suites, and generative AI models at discounted package rates.
            </p>
          </div>

          {/* Live Timer Pill */}
          <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#08080B] text-white border border-purple-500/30 shadow-md">
            <div className="flex items-center gap-1.5 text-purple-400 text-xs font-semibold uppercase tracking-wider">
              <Clock className="w-4 h-4 text-purple-400 animate-pulse" />
              <span>Offer Ends In:</span>
            </div>
            <div className="flex items-center gap-1 text-sm font-mono font-bold text-white">
              <span className="px-2 py-0.5 rounded bg-purple-950/80 border border-purple-800/40">
                {String(timeLeft.hours).padStart(2, '0')}h
              </span>
              <span>:</span>
              <span className="px-2 py-0.5 rounded bg-purple-950/80 border border-purple-800/40">
                {String(timeLeft.minutes).padStart(2, '0')}m
              </span>
              <span>:</span>
              <span className="px-2 py-0.5 rounded bg-purple-950/80 border border-purple-800/40 text-purple-300">
                {String(timeLeft.seconds).padStart(2, '0')}s
              </span>
            </div>
          </div>
        </div>

        {/* 3 Prominent Bundle Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {bundles.map((bundle) => (
            <div
              key={bundle.id}
              className="bg-white rounded-3xl border border-[#E8E5ED] hover:border-purple-300 p-6 sm:p-8 flex flex-col justify-between shadow-[0_4px_16px_-4px_rgba(23,21,29,0.04)] hover:shadow-[0_20px_35px_-10px_rgba(129,56,245,0.12)] hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                {/* Category & Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-100">
                    {bundle.category}
                  </span>
                  <span className="text-xs font-extrabold text-white bg-purple-600 px-3 py-1 rounded-full shadow-[0_0_12px_rgba(129,56,245,0.35)]">
                    {bundle.badge}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="font-extrabold text-xl text-[#17151D] mb-2 leading-tight font-display">
                  {bundle.title}
                </h3>
                <p className="text-xs text-[#77717E] leading-relaxed mb-6">
                  {bundle.description}
                </p>

                {/* Items Included List */}
                <div className="space-y-2.5 mb-8 p-4 rounded-2xl bg-[#F5F5F7] border border-[#E8E5ED]">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#17151D] block mb-2">
                    Package Includes:
                  </span>
                  {bundle.items.map((item) => (
                    <div key={item} className="flex items-start gap-2 text-xs text-[#17151D]">
                      <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & Action */}
              <div className="pt-4 border-t border-[#E8E5ED] flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-[#17151D] font-display">
                      {formatPrice(bundle.bundlePrice)}
                    </span>
                    <span className="text-xs text-[#77717E] line-through">
                      {formatPrice(bundle.originalTotal)}
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-600 font-semibold">
                    Instant Automated Dispatch
                  </span>
                </div>

                <button
                  onClick={() => handleClaimBundle(bundle)}
                  className="px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center gap-2 shadow-[0_0_15px_rgba(129,56,245,0.4)] transition-all active:scale-95 shrink-0"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Claim Bundle</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
