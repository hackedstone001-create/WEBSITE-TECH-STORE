import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Zap, Laptop, Headphones, CheckCircle2, ArrowRight, Sparkles, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen py-16 bg-[#F5F5F7]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Banner */}
        <div className="rounded-3xl bg-[#08080B] text-white p-8 sm:p-12 mb-12 border border-purple-500/20 shadow-2xl relative overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="relative z-10 max-w-xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C4A2FF] bg-purple-900/40 border border-purple-500/30 px-3.5 py-1 rounded-full inline-block">
              Official Brand Story
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display">
              Tech Store
            </h1>
            <p className="text-sm sm:text-base text-purple-300 font-mono tracking-wider font-semibold">
              YOUR TECH, OUR SOLUTION
            </p>
            <p className="text-xs sm:text-sm text-[#77717E] leading-relaxed">
              India’s dedicated online digital marketplace built to eliminate the friction in acquiring genuine Windows licenses, Microsoft Office suites, and frontier AI tools.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden border border-purple-500/30 shadow-[0_0_35px_rgba(129,56,245,0.3)] bg-[#08080B] p-2 flex items-center justify-center">
              <Image
                src="/brand/tech-store-logo.png"
                alt="Tech Store — Official Logo"
                width={160}
                height={160}
                className="w-full h-full object-contain"
                priority
              />
            </div>
          </div>

          {/* Background Glow */}
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#8138F5]/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-[#A855F7]/15 blur-3xl pointer-events-none" />
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="rounded-3xl bg-white p-7 border border-[#E8E5ED] shadow-sm space-y-3.5 hover:border-purple-200 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#8138F5] border border-purple-100 flex items-center justify-center font-bold">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#17151D]">Instant Digital Dispatch</h3>
            <p className="text-xs sm:text-sm text-[#77717E] leading-relaxed">
              No waiting for physical packages or delays. Our automated license engine delivers genuine product keys and activation walkthroughs directly to your email within seconds.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-7 border border-[#E8E5ED] shadow-sm space-y-3.5 hover:border-purple-200 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#16A36A] border border-emerald-100 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#17151D]">Authentic & Guaranteed</h3>
            <p className="text-xs sm:text-sm text-[#77717E] leading-relaxed">
              Every digital key and subscription access method is verified to activate directly with official software servers, backed by a comprehensive 48-hour activation warranty.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-7 border border-[#E8E5ED] shadow-sm space-y-3.5 hover:border-purple-200 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#8138F5] border border-purple-100 flex items-center justify-center font-bold">
              <Headphones className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#17151D]">Dedicated Human Concierge</h3>
            <p className="text-xs sm:text-sm text-[#77717E] leading-relaxed">
              Get direct assistance whenever you need it. Our team is available on WhatsApp and our help desk to assist with clean installations, upgrades, and activation queries.
            </p>
          </div>
        </div>

        {/* Values & Commitment */}
        <div className="rounded-3xl bg-white p-8 sm:p-10 border border-[#E8E5ED] shadow-sm space-y-6 mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-[#17151D] font-display">
            Our Commitments to Every Customer
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-[#77717E]">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#16A36A] shrink-0 mt-0.5" />
              <span>Transparent INR pricing with zero hidden surcharges or surprise conversion fees.</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#16A36A] shrink-0 mt-0.5" />
              <span>Official Microsoft ISO and vendor direct download links with every Windows order.</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#16A36A] shrink-0 mt-0.5" />
              <span>Permanent lifetime validity on all lifetime retail and OEM license purchases.</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#16A36A] shrink-0 mt-0.5" />
              <span>Fast resolution guarantee with replacement or refund if any technical issue arises.</span>
            </div>
          </div>
        </div>

        {/* Guarantee Banner */}
        <div className="rounded-3xl bg-white p-8 sm:p-10 border border-purple-200 text-center space-y-4 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-purple-50 text-[#8138F5] flex items-center justify-center mx-auto">
            <Award className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-[#17151D] font-display">
            100% Activation Guarantee
          </h2>
          <p className="text-xs sm:text-sm text-[#77717E] max-w-xl mx-auto leading-relaxed">
            If any license key or digital credential purchased from Tech Store fails validation and cannot be resolved by our engineering support team within 24 hours, you receive an immediate replacement or full refund.
          </p>
          <div className="pt-2">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#8138F5] hover:bg-[#7025e0] text-white text-xs font-bold uppercase tracking-wider shadow-[0_4px_14px_rgba(129,56,245,0.35)] transition-all active:scale-95"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
