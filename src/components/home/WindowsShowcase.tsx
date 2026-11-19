'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { KeyRound, ShieldCheck, Zap, CheckCircle2, ArrowRight, Laptop, Lock, RefreshCw } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { ProductCard } from '@/components/product/ProductCard';

export const WindowsShowcase = () => {
  const { products } = useStore();

  // Find Windows products
  const windowsProducts = products.filter(
    (p) => p.category === 'windows-keys' || p.slug.includes('windows')
  ).slice(0, 4);

  return (
    <section className="py-20 sm:py-28 bg-[#08080B] text-white relative overflow-hidden border-b border-purple-900/30">
      {/* Ambient Purple Architectural Lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-purple-600/15 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-[400px] h-[400px] bg-purple-900/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 hero-grid-pattern opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/70 border border-purple-500/30 text-purple-300 text-xs font-semibold shadow-[0_0_15px_rgba(129,56,245,0.25)]">
              <KeyRound className="w-3.5 h-3.5 text-purple-400" />
              <span>PERMANENT OS LICENSING</span>
            </div>

            {/* Exact Headline from Prompt */}
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight font-display">
              Power Your PC.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-300 to-purple-500">
                Unlock Its Potential.
              </span>
            </h2>

            <p className="text-base text-slate-300 leading-relaxed">
              Genuine Windows retail activation keys with permanent digital entitlement. Full access to Windows Update, BitLocker encryption, Remote Desktop, and Windows Sandbox.
            </p>
          </div>

          {/* Quick Specifications Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:w-auto">
            <div className="p-4 rounded-2xl bg-[#111116] border border-purple-500/20">
              <div className="text-purple-400 text-lg font-bold">Lifetime</div>
              <div className="text-xs text-slate-400 mt-0.5">Permanent Bind</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#111116] border border-purple-500/20">
              <div className="text-white text-lg font-bold">Official</div>
              <div className="text-xs text-slate-400 mt-0.5">Direct Microsoft Servers</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#111116] border border-purple-500/20 col-span-2 sm:col-span-1">
              <div className="text-purple-400 text-lg font-bold">&lt; 60s</div>
              <div className="text-xs text-slate-400 mt-0.5">Instant Key Dispatch</div>
            </div>
          </div>
        </div>

        {/* Activation & System Compatibility Banner */}
        <div className="mb-12 p-6 rounded-3xl bg-[#111116]/90 border border-purple-500/30 backdrop-blur-md grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">How Activation Works</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Go to Windows Settings → System → Activation → Change Product Key. Enter your 25-digit key and click Activate.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shrink-0">
              <Laptop className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Supported Devices & Specs</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Compatible with any 64-bit PC or laptop. Supports clean installs from USB or direct upgrades from Home to Pro.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Reinstallation Rights</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Retail keys permit reinstallations on the same machine even after hardware formatting or drive replacements.
              </p>
            </div>
          </div>
        </div>

        {/* Light Product Cards on Premium Dark Background (Prompt Spec) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {windowsProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Windows Footer Link */}
        <div className="mt-12 text-center">
          <Link
            href="/category/windows-keys"
            className="inline-flex items-center gap-2 text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors group"
          >
            <span>View All Windows Editions & Office Combos</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};
