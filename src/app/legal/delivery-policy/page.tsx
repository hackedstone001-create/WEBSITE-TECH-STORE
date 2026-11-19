import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Zap, Mail, ShieldCheck } from 'lucide-react';

export default function DeliveryPolicyPage() {
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
              Fulfillment Protocol
            </span>
          </div>
          <h1 className="text-3xl font-bold text-[#17151D] font-display">Digital Delivery Policy</h1>
          <p className="text-xs text-[#77717E] mt-1">Tech Store — Instant Automated Software Dispatch</p>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#17151D]">1. Instant Electronic Delivery (Under 60 Seconds)</h2>
          <p>
            All Windows retail licenses, Microsoft Office keys, antivirus serials, and developer software keys are fulfilled automatically by our license engine. The moment payment is verified via Razorpay:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
            <li>Your unique license key and official download links appear instantly on your screen in your dedicated order confirmation vault.</li>
            <li>A duplicate copy containing your license code, tax invoice, and step-by-step activation guide is dispatched to your provided email address.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#17151D]">2. AI Subscriptions & Direct Account Upgrades</h2>
          <p>
            For select managed AI subscriptions (such as private enterprise invitations or direct account tier upgrades):
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
            <li>Automated invitations are sent to your specified email within 5 to 30 minutes.</li>
            <li>Full instructions on how to accept the invitation and verify your premium status are included in the email.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#17151D]">3. What to Do If You Don&apos;t See Your Email</h2>
          <p>
            If your order email has not arrived within 2 minutes:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
            <li>Check your Spam, Junk, or Promotions folder for an email from Tech Store.</li>
            <li>Visit the <Link href="/track-order" className="text-[#8138F5] underline font-medium">Track Order</Link> page and enter your Order ID and email to instantly reveal your key.</li>
            <li>Message our WhatsApp concierge directly with your Order ID for real-time human assistance.</li>
          </ul>
        </section>

        <div className="pt-6 border-t border-[#E8E5ED] flex items-center justify-between text-xs text-[#77717E]">
          <span>Last revised: November 2026</span>
          <span className="flex items-center gap-1 text-[#16A36A]">
            <Zap className="w-4 h-4" /> 100% Automated Digital Dispatch
          </span>
        </div>
      </div>
    </div>
  );
}
