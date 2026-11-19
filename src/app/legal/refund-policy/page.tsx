import React from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, RefreshCw } from 'lucide-react';

export default function RefundPolicyPage() {
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
              Customer Protection
            </span>
          </div>
          <h1 className="text-3xl font-bold text-[#17151D] font-display">Refund & Replacement Policy</h1>
          <p className="text-xs text-[#77717E] mt-1">Tech Store — Clear, Fair & Guaranteed Terms</p>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#17151D]">1. 100% Activation Guarantee</h2>
          <p>
            We stand behind every digital product we provide. If an issued software license key or subscription credential fails to activate or displays an invalid license status, our support team will promptly verify the issue and provide a working replacement key immediately.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#17151D]">2. Refund Eligibility Criteria</h2>
          <p>
            You are entitled to a full 100% refund under any of the following verified conditions:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
            <li>A product key cannot be activated on a compatible operating system within 48 hours of purchase, and our support team is unable to resolve it.</li>
            <li>Accidental duplicate payment or multiple charges for the same order due to a gateway timeout.</li>
            <li>In the rare event that an item is out of stock after your payment was captured and cannot be delivered within 2 hours.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#17151D]">3. Non-Refundable Scenarios</h2>
          <p>
            Due to the immutable nature of digital software keys:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
            <li>Keys that have been successfully activated and linked to the customer&apos;s personal device or Microsoft account cannot be returned or refunded.</li>
            <li>Ordering an incompatible edition (e.g. purchasing Windows 11 Home when you require Windows 11 Pro) after the key has been viewed or used.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#17151D]">4. Refund Processing Timeline</h2>
          <p>
            Once approved by our support team, refunds are initiated immediately via Razorpay. Depending on your bank or payment method (UPI, Debit Card, Credit Card, NetBanking), funds typically reflect in your account within 3 to 5 business days.
          </p>
        </section>

        <div className="pt-6 border-t border-[#E8E5ED] flex items-center justify-between text-xs text-[#77717E]">
          <span>Last revised: November 2026</span>
          <span className="flex items-center gap-1 text-[#16A36A]">
            <CheckCircle2 className="w-4 h-4" /> 100% Money-Back Activation Assurance
          </span>
        </div>
      </div>
    </div>
  );
}
