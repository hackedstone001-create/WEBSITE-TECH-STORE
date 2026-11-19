'use client';

import React from 'react';
import { Lock, Zap, Headphones, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const WhyChooseUs = () => {
  const features = [
    {
      title: 'Secure Payments',
      description: 'End-to-end encrypted checkout via Razorpay, UPI, cards, and net banking. Zero storage of raw card details with cryptographic server-side HMAC verification.',
      icon: Lock,
      color: 'from-blue-600 to-indigo-600',
      badge: '256-Bit SSL Secured'
    },
    {
      title: 'Digital Delivery',
      description: 'Zero waiting for shipping trucks. Instant digital access with automated serial generation on screen and instant dispatch to your customer dashboard & email.',
      icon: Zap,
      color: 'from-purple-600 to-pink-600',
      badge: 'Under 10 Seconds'
    },
    {
      title: 'Customer Support',
      description: 'Round-the-clock technical guidance via WhatsApp direct concierge, live support ticketing, and remote teamviewer activation help whenever needed.',
      icon: Headphones,
      color: 'from-cyan-500 to-blue-600',
      badge: '24/7 Live Desk'
    },
    {
      title: 'Transparent Licensing',
      description: 'Every product clearly specifies duration, bindability, and device compatibility. No fake promises, transparent terms, and 100% money-back guarantee.',
      icon: ShieldCheck,
      color: 'from-emerald-500 to-teal-600',
      badge: '100% Genuine'
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-[#090d18]/40 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            Trusted By 12,000+ Developers & Creatives
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
            Why Choose Tech Store?
          </h2>
          <p className="mt-4 text-sm sm:text-base text-muted">
            We operate transparently with enterprise-grade security and genuine licensing so you can focus on building and creating.
          </p>
        </div>

        {/* 4 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div
                key={index}
                className="rounded-3xl glass-panel p-6 border border-white/10 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${feat.color} p-0.5 shadow-lg mb-6`}
                  >
                    <div className="w-full h-full bg-[#0d1424] rounded-[14px] flex items-center justify-center text-white">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                    {feat.badge}
                  </span>

                  <h3 className="text-lg font-bold text-white mt-3 mb-2">
                    {feat.title}
                  </h3>

                  <p className="text-xs text-muted leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-cyan-300">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Guaranteed Fulfillment</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
