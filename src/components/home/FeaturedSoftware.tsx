'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  Zap,
  ArrowRight,
  Sparkles,
  Laptop,
  Code2,
  Lock,
  Layers,
  Cpu
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { formatPrice } from '@/lib/utils';

export const FeaturedSoftware = () => {
  const { products, addToCart } = useStore();

  // Find Windows 11 Pro and Cursor AI / JetBrains for spotlight
  const win11 = products.find((p) => p.slug.includes('windows-11-pro')) || products[0];
  const cursorPro = products.find((p) => p.slug.includes('cursor-ai-pro')) || products[1];

  return (
    <section className="py-20 sm:py-24 bg-white relative border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>EDITORIAL SPOTLIGHT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight font-display">
            Featured Flagship Software
          </h2>
          <p className="mt-3 text-base text-slate-500 leading-relaxed">
            Engineered for performance, security, and limitless scale. Official licenses with permanent digital entitlement.
          </p>
        </div>

        {/* Feature Showcase Grid - 2 Big Architectural Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          {/* Showcase 1: Windows 11 Pro Enterprise */}
          <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-navy-900 to-slate-950 p-8 sm:p-10 text-white overflow-hidden shadow-xl flex flex-col justify-between border border-slate-800">
            {/* Ambient blue background highlight */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-semibold border border-blue-500/30">
                  FLAGSHIP OPERATING SYSTEM
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  OEM / RETAIL 2026
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
                Windows 11 Pro Workstation
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                The gold standard for enterprise workstation security, developer virtualization, and high-performance computing. Permanent activation bound to your Microsoft account.
              </p>

              {/* Spec Grid */}
              <div className="grid grid-cols-2 gap-3.5 mb-8">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[11px] text-slate-400 font-medium">Activation Method</div>
                  <div className="text-sm font-semibold text-white mt-0.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                    Permanent Online
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[11px] text-slate-400 font-medium">Security Standard</div>
                  <div className="text-sm font-semibold text-white mt-0.5 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-emerald-400" />
                    BitLocker 256-bit
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[11px] text-slate-400 font-medium">Virtualization</div>
                  <div className="text-sm font-semibold text-white mt-0.5 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-purple-400" />
                    Hyper-V & Sandbox
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[11px] text-slate-400 font-medium">Hardware Transfer</div>
                  <div className="text-sm font-semibold text-white mt-0.5 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    Transferable License
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-4 relative z-10">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-bold text-white font-display">
                    {win11 ? formatPrice(win11.price) : '₹1,299'}
                  </span>
                  <span className="text-sm text-slate-400 line-through">
                    {win11 ? formatPrice(win11.originalPrice || 4999) : '₹4,999'}
                  </span>
                </div>
                <div className="text-[11px] text-emerald-400 font-medium mt-0.5">
                  Instant License Key via Email & Dashboard
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                {win11 && (
                  <button
                    onClick={() => addToCart(win11)}
                    className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs tracking-wide shadow-lg shadow-blue-600/30 transition-all active:scale-95"
                  >
                    Add to Cart
                  </button>
                )}
                <Link
                  href={win11 ? `/products/${win11.slug}` : '/products'}
                  className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs transition-colors"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>

          {/* Showcase 2: Cursor AI Pro & Developer Toolchain */}
          <div className="relative rounded-3xl bg-slate-900 p-8 sm:p-10 text-white overflow-hidden shadow-xl flex flex-col justify-between border border-slate-800">
            {/* Ambient cyan highlight */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-semibold border border-indigo-500/30">
                  DEVELOPER AI SUITE
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  CLAUDE 3.5 & GPT-4o
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
                Cursor AI Pro (Developer IDE)
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                The next-generation code editor built for engineers. Multi-file refactoring, autonomous agent workflows, and seamless codebase indexing with Sonnet 3.5.
              </p>

              {/* Spec Grid */}
              <div className="grid grid-cols-2 gap-3.5 mb-8">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[11px] text-slate-400 font-medium">Model Access</div>
                  <div className="text-sm font-semibold text-white mt-0.5 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                    Claude 3.5 Sonnet & GPT-4o
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[11px] text-slate-400 font-medium">Fast Requests</div>
                  <div className="text-sm font-semibold text-white mt-0.5 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    500 Fast Premium / Mo
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[11px] text-slate-400 font-medium">Workspace Index</div>
                  <div className="text-sm font-semibold text-white mt-0.5 flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-blue-400" />
                    Full Repository Context
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[11px] text-slate-400 font-medium">Compatibility</div>
                  <div className="text-sm font-semibold text-white mt-0.5 flex items-center gap-1.5">
                    <Laptop className="w-3.5 h-3.5 text-emerald-400" />
                    macOS, Windows, Linux
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-4 relative z-10">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-bold text-white font-display">
                    {cursorPro ? formatPrice(cursorPro.price) : '₹1,899'}
                  </span>
                  <span className="text-sm text-slate-400 line-through">
                    {cursorPro ? formatPrice(cursorPro.originalPrice || 2499) : '₹2,499'}
                  </span>
                </div>
                <div className="text-[11px] text-indigo-300 font-medium mt-0.5">
                  Direct Account Activation · 30-Day Guarantee
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                {cursorPro && (
                  <button
                    onClick={() => addToCart(cursorPro)}
                    className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs tracking-wide shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
                  >
                    Add to Cart
                  </button>
                )}
                <Link
                  href={cursorPro ? `/products/${cursorPro.slug}` : '/products'}
                  className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs transition-colors"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
