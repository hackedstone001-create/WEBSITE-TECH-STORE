'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, ShieldCheck, Zap } from 'lucide-react';

export const FinalCTA = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#08080B] text-white relative overflow-hidden border-b border-purple-900/30">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-purple-600/20 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute inset-0 hero-grid-pattern opacity-30 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        {/* Brand Icon Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#111116] border border-purple-500/30 text-xs font-medium text-slate-200 shadow-[0_0_20px_rgba(129,56,245,0.25)]">
          <div className="relative w-5 h-5 rounded-full overflow-hidden bg-black flex items-center justify-center">
            <Image
              src="/brand/tech-store-logo.png"
              alt="Tech Store"
              width={20}
              height={20}
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-purple-300 font-bold uppercase tracking-wider text-[11px]">
            TECH STORE
          </span>
          <span className="text-purple-800">|</span>
          <span className="text-slate-300 text-[11px]">YOUR TECH, OUR SOLUTION</span>
        </div>

        {/* Exact Headline from Prompt */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight font-display max-w-3xl mx-auto">
          Ready to Upgrade Your Digital Experience?
        </h2>

        {/* Supporting description */}
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
          Join thousands of satisfied Indian developers, creators, and professionals. Get genuine Windows keys and AI tools with automated instant dispatch.
        </p>

        {/* Button strictly matching prompt */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/products"
            className="w-full sm:w-auto px-10 py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2.5 shadow-[0_0_35px_rgba(129,56,245,0.55)] hover:shadow-[0_0_50px_rgba(168,85,247,0.8)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group"
          >
            <span>Explore All Products</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Trust Badges under CTA */}
        <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-purple-400" /> Instant Digital Delivery
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-purple-400" /> 100% Genuine Activation
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-500" /> 24/7 Dedicated Support
          </span>
        </div>
      </div>
    </section>
  );
};
