import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Lock } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
              Privacy & Data Security
            </span>
          </div>
          <h1 className="text-3xl font-bold text-[#17151D] font-display">Privacy Policy</h1>
          <p className="text-xs text-[#77717E] mt-1">Tech Store — Protecting Customer Privacy & Order Data</p>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#17151D]">1. Information We Collect</h2>
          <p>
            To fulfill your digital software purchase and provide customer support, we collect only necessary details: full name, delivery email address, and optional phone/WhatsApp number for instant activation guidance. We do not require or collect physical delivery addresses or sensitive personal identification numbers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#17151D]">2. Payment Data & Financial Security</h2>
          <p>
            All financial transactions are conducted directly through PCI-DSS Level 1 certified Indian payment aggregators such as Razorpay. Tech Store never stores, logs, or has access to your credit card credentials, debit card CVV, UPI MPIN, or bank passwords.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#17151D]">3. Data Retention & Digital Vault</h2>
          <p>
            Your order history and digital license keys are encrypted and preserved in your private customer account so you can retrieve your purchased license codes anytime. You may request data deletion or an account wipe at any time by contacting our support team.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#17151D]">4. Zero Third-Party Selling</h2>
          <p>
            We strictly enforce a zero-spam policy. Tech Store does not sell, rent, trade, or distribute your email address or personal details to advertisers, data brokers, or third-party marketing agencies.
          </p>
        </section>

        <div className="pt-6 border-t border-[#E8E5ED] flex items-center justify-between text-xs text-[#77717E]">
          <span>Last revised: November 2026</span>
          <span className="flex items-center gap-1 text-[#16A36A]">
            <Lock className="w-4 h-4" /> 256-Bit TLS End-to-End Encryption
          </span>
        </div>
      </div>
    </div>
  );
}
