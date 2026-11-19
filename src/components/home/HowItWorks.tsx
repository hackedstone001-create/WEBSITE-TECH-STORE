'use client';

import React from 'react';
import {
  Search,
  CheckCircle,
  ShoppingCart,
  CreditCard,
  Zap,
  Headphones,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const HowItWorks = () => {
  // Exactly 6 steps from prompt:
  // 1. Explore products.
  // 2. Select a suitable plan.
  // 3. Add to cart.
  // 4. Complete payment.
  // 5. Receive your digital product.
  // 6. Get activation assistance if needed.
  const steps = [
    {
      step: '01',
      title: 'Explore Products',
      description: 'Browse our curated catalogue of genuine Windows keys, productivity suites, and AI subscriptions.',
      icon: Search,
    },
    {
      step: '02',
      title: 'Select a Suitable Plan',
      description: 'Choose your desired duration, edition, device seats, or subscription tier with clear INR pricing.',
      icon: CheckCircle,
    },
    {
      step: '03',
      title: 'Add to Cart',
      description: 'Review your selection, apply valid promo coupons, and preview transparent checkout totals.',
      icon: ShoppingCart,
    },
    {
      step: '04',
      title: 'Complete Payment',
      description: 'Pay securely via Razorpay with UPI, credit/debit card, or net banking with 256-bit encryption.',
      icon: CreditCard,
    },
    {
      step: '05',
      title: 'Receive Digital Product',
      description: 'Your license key and official setup guides are instantly assigned to your screen and account dashboard.',
      icon: Zap,
    },
    {
      step: '06',
      title: 'Get Activation Assistance',
      description: 'Need help activating? Reach our licensing specialists directly via WhatsApp or support ticket.',
      icon: Headphones,
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-white relative border-b border-[#E8E5ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-100 border border-purple-200 text-purple-700 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>TRANSPARENT WORKFLOW</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17151D] tracking-tight font-display">
            How It Works
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#77717E] leading-relaxed">
            From product selection to verified digital activation in six transparent, secure steps.
          </p>
        </div>

        {/* 6 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="group relative bg-[#F5F5F7] rounded-3xl p-6 sm:p-7 border border-[#E8E5ED] hover:border-purple-300 hover:bg-white hover:shadow-[0_20px_35px_-10px_rgba(129,56,245,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Step Number Badge & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="w-10 h-10 rounded-xl bg-purple-600/10 border border-purple-200 text-purple-700 font-mono font-bold text-xs flex items-center justify-center">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white text-purple-600 border border-[#E8E5ED] flex items-center justify-center shadow-sm group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-[#17151D] mb-2 font-display group-hover:text-purple-600 transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#77717E] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center text-[11px] font-semibold text-purple-600">
                  <span>Step {idx + 1} of 6</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
