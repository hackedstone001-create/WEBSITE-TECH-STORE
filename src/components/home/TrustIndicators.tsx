'use client';

import React from 'react';
import { Lock, Zap, Headphones, ShoppingCart, CheckCircle2 } from 'lucide-react';

export const TrustIndicators = () => {
  const indicators = [
    {
      title: 'Secure Payments',
      description: 'Encrypted checkout powered by Razorpay with UPI, cards, and netbanking.',
      icon: Lock,
      highlight: '256-Bit SSL Secured',
    },
    {
      title: 'Digital Delivery',
      description: 'Automated digital dispatch straight to your screen and dashboard.',
      icon: Zap,
      highlight: 'Instant Key Assignment',
    },
    {
      title: 'Dedicated Support',
      description: 'Direct assistance via WhatsApp and support tickets for quick setup.',
      icon: Headphones,
      highlight: 'Expert Activation Help',
    },
    {
      title: 'Easy Ordering',
      description: 'Streamlined purchasing process with clear pricing and zero hidden fees.',
      icon: ShoppingCart,
      highlight: 'Transparent INR Pricing',
    },
  ];

  return (
    <section className="relative z-20 -mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-[0_12px_36px_-8px_rgba(23,21,29,0.08)] border border-[#E8E5ED] p-6 sm:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          {indicators.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`flex items-start gap-4 ${
                  idx > 0 ? 'pt-6 sm:pt-0 sm:pl-6' : ''
                } group`}
              >
                <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0 group-hover:scale-105 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 shadow-sm">
                  <Icon className="w-5 h-5 transition-transform duration-300 group-hover:rotate-3" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-sm sm:text-base text-[#17151D] tracking-tight">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[#77717E] leading-relaxed">
                    {item.description}
                  </p>
                  <div className="pt-1 flex items-center gap-1 text-[11px] font-semibold text-purple-600">
                    <CheckCircle2 className="w-3 h-3 text-purple-600" />
                    <span>{item.highlight}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
