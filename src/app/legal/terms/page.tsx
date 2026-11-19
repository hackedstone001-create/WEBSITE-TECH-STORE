import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen py-16 px-4 bg-[#F5F5F7]">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-[#E8E5ED] shadow-[0_10px_30px_rgba(8,8,11,0.03)] space-y-8 text-sm text-[#77717E] leading-relaxed">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8138F5] hover:text-[#7025e0] mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Store
          </Link>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-[#8138F5] bg-purple-50 border border-purple-200 px-3 py-0.5 rounded-full uppercase tracking-wider">
              Legal Documentation
            </span>
          </div>
          <h1 className="text-3xl font-bold text-[#17151D] font-display">Terms of Service</h1>
          <p className="text-xs text-[#77717E] mt-1">Tech Store — Official Digital Goods Merchant Agreement</p>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#17151D]">1. Nature of Products & Digital Delivery</h2>
          <p>
            Tech Store operates exclusively as an online digital goods store offering retail software activation keys, operating system licenses, and access credentials for digital services. All products are delivered purely digitally via immediate on-screen access in your order vault and email delivery. No physical media (CDs, DVDs, USB drives) will be dispatched.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#17151D]">2. License Entitlement & Official Activation</h2>
          <p>
            Product keys are provided to unlock genuine software versions. Perpetual licenses (such as Windows 11 Pro Lifetime Retail or Office 2024 Pro Plus) validate directly with the software manufacturer’s official activation servers. For subscription products, services remain active for the duration of the plan selected at checkout.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#17151D]">3. Customer Responsibilities</h2>
          <p>
            Customers are responsible for ensuring their hardware meets the minimum system requirements before placing an order. Customers must provide a valid email address and WhatsApp contact number during checkout for receipt of license keys and activation guides.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#17151D]">4. Activation Assistance & 48-Hour Warranty</h2>
          <p>
            All keys are backed by our 48-hour activation warranty. If you encounter any technical error during official product activation, our customer concierge team is available to assist you. If an issue cannot be resolved, an immediate replacement or full refund will be provided.
          </p>
        </section>

        <div className="pt-6 border-t border-[#E8E5ED] flex items-center justify-between text-xs text-[#77717E]">
          <span>Last revised: November 2026</span>
          <span className="flex items-center gap-1 text-[#16A36A]">
            <ShieldCheck className="w-4 h-4" /> Tech Store Verified Policy
          </span>
        </div>
      </div>
    </div>
  );
}
