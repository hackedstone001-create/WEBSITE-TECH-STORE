'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, HelpCircle, MessageSquare, ShieldCheck, Mail, Sparkles } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

interface FAQ {
  id: string;
  topic: string;
  question: string;
  answer: string;
}

export const FAQSection = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [activeTopic, setActiveTopic] = useState<string>('all');
  const { websiteSettings } = useStore();

  const whatsappNumber = websiteSettings?.whatsappNumber || '+919876543210';
  const supportEmail = websiteSettings?.supportEmail || 'support@techstore.in';

  // Exactly the 8 topics required by prompt:
  // - Digital delivery
  // - Windows activation
  // - Software licenses
  // - AI subscriptions
  // - Validity
  // - Payment
  // - Refund eligibility
  // - Customer support
  const faqs: FAQ[] = [
    {
      id: 'faq-1',
      topic: 'Digital Delivery',
      question: 'How and when will I receive my digital product?',
      answer: 'Delivery is 100% digital and instantaneous. Immediately after payment completion via Razorpay, your order is confirmed and your license key, official download links, and setup guides appear on your confirmation screen and in your Customer Dashboard. A backup receipt with license details is also sent to your email in under 60 seconds.',
    },
    {
      id: 'faq-2',
      topic: 'Windows Activation',
      question: 'How do I activate Windows with my purchased retail key?',
      answer: 'Activation is straightforward: Navigate to Windows Settings → System → Activation → select "Change Product Key", enter the 25-character key you received, and click Activate. The key binds with Microsoft activation servers. It supports clean installations from official Microsoft USB media as well as in-place upgrades from Windows Home to Pro.',
    },
    {
      id: 'faq-3',
      topic: 'Software Licenses',
      question: 'Are Tech Store software licenses genuine and authentic?',
      answer: 'Yes, 100%. All keys are genuine retail and commercial licenses. They activate directly against the software vendor’s official servers (Microsoft, Adobe, JetBrains, etc.), qualify for standard vendor security patches and updates, and include lifetime activation assurance.',
    },
    {
      id: 'faq-4',
      topic: 'AI Subscriptions',
      question: 'How do AI subscriptions (ChatGPT Plus, Midjourney, Claude) work?',
      answer: 'Depending on the AI tool, you receive either an official invite link to activate on your existing email account or dedicated private workspace credentials. All AI subscriptions include guaranteed active access for the chosen billing duration (1 month, 3 months, or annual) with unthrottled quotas and full Canvas/GPT-4o feature access.',
    },
    {
      id: 'faq-5',
      topic: 'Validity',
      question: 'What is the validity period of the licenses and subscriptions?',
      answer: 'Windows retail keys and standalone Microsoft Office licenses are permanent lifetime licenses with no recurring fees. For AI tools and subscription software, validity corresponds to the exact duration selected during checkout (e.g., 1 Month, 3 Months, or 1 Year) with clear manual or automatic renewal options.',
    },
    {
      id: 'faq-6',
      topic: 'Payment',
      question: 'Which payment methods are accepted and is checkout secure?',
      answer: 'We accept all major Indian payment methods through Razorpay: UPI (Google Pay, PhonePe, Paytm, BHIM), Credit/Debit Cards (Visa, Mastercard, RuPay), and Netbanking across 50+ banks. All transactions are protected with 256-bit TLS encryption. Tech Store never stores your payment card credentials.',
    },
    {
      id: 'faq-7',
      topic: 'Refund Eligibility',
      question: 'What is the refund and replacement policy for digital goods?',
      answer: 'If any digital license key fails activation and our dedicated support team is unable to resolve it within 24 hours, you receive an immediate replacement or full 100% refund. We verify key validity directly to protect your investment.',
    },
    {
      id: 'faq-8',
      topic: 'Customer Support',
      question: 'How can I get activation assistance if I face an issue?',
      answer: 'Our dedicated support team is available via direct WhatsApp chat, our built-in Customer Dashboard ticket desk, and email. We guide you step-by-step through any setup or compatibility troubleshooting.',
    },
  ];

  const topics = [
    { id: 'all', label: 'All Topics' },
    { id: 'Digital Delivery', label: 'Digital Delivery' },
    { id: 'Windows Activation', label: 'Windows Activation' },
    { id: 'Software Licenses', label: 'Software Licenses' },
    { id: 'AI Subscriptions', label: 'AI Subscriptions' },
    { id: 'Validity', label: 'Validity' },
    { id: 'Payment', label: 'Payment' },
    { id: 'Refund Eligibility', label: 'Refund Eligibility' },
    { id: 'Customer Support', label: 'Customer Support' },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    if (activeTopic === 'all') return true;
    return faq.topic === activeTopic;
  });

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-20 sm:py-24 bg-white relative border-b border-[#E8E5ED]" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-100 border border-purple-200 text-purple-700 text-xs font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-purple-600" />
            <span>KNOWLEDGE BASE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17151D] tracking-tight font-display">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#77717E] max-w-xl mx-auto leading-relaxed">
            Transparent answers regarding digital delivery, Windows activation, subscription validity, payments, and support.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 justify-center flex-wrap mb-10 text-xs">
          {topics.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTopic(t.id)}
              className={`px-3.5 py-1.5 rounded-xl font-medium transition-all duration-200 ${
                activeTopic === t.id
                  ? 'bg-purple-600 text-white font-semibold shadow-[0_0_12px_rgba(129,56,245,0.3)]'
                  : 'bg-[#F5F5F7] text-[#77717E] hover:text-[#17151D] hover:bg-slate-200/70 border border-[#E8E5ED]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-[#F5F5F7] rounded-2xl border border-[#E8E5ED] hover:border-purple-300 transition-all overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-purple-100 text-purple-700 border border-purple-200 shrink-0">
                      {faq.topic}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-[#17151D]">
                      {faq.question}
                    </span>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-purple-600 text-white' : 'bg-white text-slate-400 border border-[#E8E5ED]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-xs sm:text-sm text-[#77717E] leading-relaxed border-t border-slate-200/60 pt-4 bg-white">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Strip */}
        <div className="mt-14 p-6 rounded-3xl bg-[#08080B] text-white border border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_12px_36px_rgba(0,0,0,0.3)]">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold text-white font-display">
              Have a specific question not listed here?
            </h4>
            <p className="text-xs text-slate-300">
              Our licensing specialists can check hardware compatibility or guide your order.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20Tech%20Store%2C%20I%20have%20a%20question%20regarding%20a%20license.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-2 shadow-[0_0_15px_rgba(129,56,245,0.4)] transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Desk</span>
            </a>
            <a
              href={`mailto:${supportEmail}`}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-semibold border border-white/10 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Email Support</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
