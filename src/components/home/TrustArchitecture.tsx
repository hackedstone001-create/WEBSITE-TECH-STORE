'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Zap,
  Lock,
  Headphones,
  CheckCircle2,
  KeyRound,
  Download,
  Star,
  ExternalLink
} from 'lucide-react';

export const TrustArchitecture = () => {
  const steps = [
    {
      step: '01',
      title: 'Select Software License',
      description: 'Choose your desired genuine license, edition (Home, Pro, Enterprise), or AI subscription duration.',
      icon: KeyRound,
    },
    {
      step: '02',
      title: 'Encrypted Checkout',
      description: 'Complete purchase securely through Razorpay, UPI, credit/debit cards, or net banking with 256-bit SSL.',
      icon: Lock,
    },
    {
      step: '03',
      title: 'Instant Automated Vault',
      description: 'Your verified license key, account credentials, and official download ISO links arrive in < 30 seconds.',
      icon: Zap,
    },
    {
      step: '04',
      title: 'Guaranteed Activation',
      description: 'Activate directly on Microsoft, OpenAI, or vendor servers. Backed by our lifetime activation warranty.',
      icon: ShieldCheck,
    },
  ];

  const testimonials = [
    {
      name: 'Aditya Vardhan',
      role: 'Principal DevOps Architect',
      company: 'CloudMatrix Technologies',
      content: 'Purchased 15 Windows 11 Pro retail licenses for our development workstations. Keys activated instantly through Microsoft servers with no issues. Outstanding reliability.',
      rating: 5,
      product: 'Windows 11 Pro Retail'
    },
    {
      name: 'Sarah Chen',
      role: 'Creative Director',
      company: 'Studio Monochrome',
      content: 'The Adobe Creative Cloud and DaVinci Resolve bundle saved us nearly 40% on studio tooling. Instant delivery and seamless setup instructions.',
      rating: 5,
      product: 'Creative Studio Bundle'
    },
    {
      name: 'Rohan Mehta',
      role: 'Full-Stack Developer',
      company: 'Fintech Velocity',
      content: 'Getting Cursor AI Pro and JetBrains through Tech Store was effortless. Direct activation on my existing account within 2 minutes of checkout.',
      rating: 5,
      product: 'Cursor AI Pro'
    }
  ];

  return (
    <section className="py-20 sm:py-24 bg-slate-50/70 relative border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Step-by-Step Delivery Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>TRANSPARENT FULFILLMENT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight font-display">
            How Digital Delivery Works
          </h2>
          <p className="mt-3 text-base text-slate-500 leading-relaxed">
            From checkout to official vendor activation in less than two minutes. Zero friction, zero ambiguity.
          </p>
        </div>

        {/* 4 Process Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-20">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-[0_2px_8px_rgba(15,23,42,0.03)] hover:shadow-[0_16px_32px_-8px_rgba(15,23,42,0.08)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    {item.step}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Security & Authenticity Trust Banner */}
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden mb-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/15 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-semibold border border-blue-500/30">
                100% MONEY-BACK AUTHENTICITY ASSURANCE
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Authentic Licenses. Direct Activation. Zero Risk.
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                Every software license sold on Tech Store is sourced through certified reseller channels, OEM partners, and enterprise agreements. If your key or credentials fail activation within 48 hours, we guarantee an instant replacement or a full 100% refund.
              </p>
              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-slate-300 font-medium">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Microsoft Authorized Reseller Standards
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 256-bit TLS Encrypted Razorpay Checkout
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 24/7 Human WhatsApp & Ticket Support
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4">
              <Link
                href="/about"
                className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs tracking-wide text-center shadow-lg shadow-blue-600/25 transition-all"
              >
                Learn About Our Verification
              </Link>
              <Link
                href="/track-order"
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs tracking-wide text-center transition-all"
              >
                Live Order & Key Lookup
              </Link>
            </div>
          </div>
        </div>

        {/* Verified Customer Reviews */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-800 text-xs font-semibold mb-3">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>VERIFIED CUSTOMER TESTIMONIALS</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-display">
            Trusted by Over 25,000 Professionals
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic mb-6">
                  &ldquo;{t.content}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="text-sm font-bold text-slate-900">{t.name}</div>
                <div className="text-xs text-slate-500">{t.role} · {t.company}</div>
                <div className="mt-2 inline-block text-[11px] font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  Purchased: {t.product}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
