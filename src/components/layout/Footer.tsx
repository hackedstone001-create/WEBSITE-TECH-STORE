'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  Zap,
  Headphones,
  MessageSquare,
  Mail,
  Lock,
  ArrowRight,
  CheckCircle2,
  Phone,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export const Footer = () => {
  const { websiteSettings } = useStore();
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const whatsappNumber = websiteSettings?.whatsappNumber || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+919876543210';
  const supportEmail = websiteSettings?.supportEmail || process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support@techstore.in';
  const businessName = websiteSettings?.businessName || 'Tech Store';
  const tagline = websiteSettings?.tagline || 'YOUR TECH, OUR SOLUTION';

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail && newsletterEmail.includes('@')) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <>
      <footer className="w-full bg-[#08080B] text-white border-t border-purple-900/30 relative overflow-hidden">
        {/* Trust Indicators Bar */}
        <div className="border-b border-white/5 py-8 bg-[#111116]/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shadow-[0_0_15px_rgba(129,56,245,0.2)]">
                <Zap className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-semibold text-white">Digital Delivery</h4>
                <p className="text-xs text-slate-400">Automated key dispatch post-payment</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shadow-[0_0_15px_rgba(129,56,245,0.2)]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-semibold text-white">Genuine Licenses</h4>
                <p className="text-xs text-slate-400">Authentic digital software & plans</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shadow-[0_0_15px_rgba(129,56,245,0.2)]">
                <Lock className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-semibold text-white">Secure Payments</h4>
                <p className="text-xs text-slate-400">256-Bit SSL & Razorpay India</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shadow-[0_0_15px_rgba(129,56,245,0.2)]">
                <Headphones className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-semibold text-white">Dedicated Support</h4>
                <p className="text-xs text-slate-400">WhatsApp & ticket assistance</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Brand Column */}
            <div className="lg:col-span-2 space-y-4">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative w-12 h-12 rounded-xl bg-black border border-purple-500/40 p-1 flex items-center justify-center shadow-[0_0_20px_rgba(129,56,245,0.4)]">
                  <Image
                    src="/brand/tech-store-logo.png"
                    alt="Tech Store"
                    width={48}
                    height={48}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-xl tracking-tight text-white leading-none">
                    TECH <span className="text-purple-400 font-black">STORE</span>
                  </span>
                  <span className="text-[10px] uppercase tracking-widest font-semibold mt-1 text-purple-300">
                    {tagline}
                  </span>
                </div>
              </Link>
              <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                India’s premier online digital products store. Genuine software licenses, Windows activation keys, professional developer tools, and cutting-edge AI subscriptions with instant automated dispatch and dedicated support.
              </p>

              {/* Direct Support Contact Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setShowWhatsAppModal(true)}
                  className="px-3.5 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 text-xs font-semibold flex items-center gap-2 transition-colors shadow-sm"
                >
                  <MessageSquare className="w-4 h-4 text-purple-400" />
                  WhatsApp Support
                </button>
                <a
                  href={`mailto:${supportEmail}`}
                  className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-semibold flex items-center gap-2 transition-colors"
                >
                  <Mail className="w-4 h-4 text-purple-400" />
                  {supportEmail}
                </a>
              </div>

              {/* Newsletter Subscription */}
              <div className="pt-4 max-w-sm">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Stay Updated with Exclusive Tech Offers
                </h5>
                {newsletterSubscribed ? (
                  <div className="flex items-center gap-2 text-xs text-purple-300 bg-purple-950/40 p-2.5 rounded-xl border border-purple-800/40">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>Thank you for subscribing! You’ll receive updates on upcoming deals.</span>
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="flex-1 bg-[#19151F] border border-purple-500/30 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-all shadow-[0_0_15px_rgba(129,56,245,0.4)]"
                    >
                      Subscribe
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Product Categories */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
                Product Categories
              </h4>
              <ul className="space-y-2.5 text-xs font-medium text-slate-400">
                <li>
                  <Link href="/category/windows-keys" className="hover:text-purple-300 transition-colors">
                    Windows Keys
                  </Link>
                </li>
                <li>
                  <Link href="/category/software" className="hover:text-purple-300 transition-colors">
                    Microsoft Office
                  </Link>
                </li>
                <li>
                  <Link href="/category/software" className="hover:text-purple-300 transition-colors">
                    Antivirus & Security
                  </Link>
                </li>
                <li>
                  <Link href="/category/ai-tools" className="hover:text-purple-300 transition-colors">
                    AI Tools & Subscriptions
                  </Link>
                </li>
                <li>
                  <Link href="/category/software" className="hover:text-purple-300 transition-colors">
                    Video Editing Software
                  </Link>
                </li>
                <li>
                  <Link href="/category/software" className="hover:text-purple-300 transition-colors">
                    Design & Productivity
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=developer" className="hover:text-purple-300 transition-colors">
                    Development Tools
                  </Link>
                </li>
                <li>
                  <Link href="/category/digital-products" className="hover:text-purple-300 transition-colors">
                    Digital Products
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
                Customer Support
              </h4>
              <ul className="space-y-2.5 text-xs font-medium text-slate-400">
                <li>
                  <Link href="/track-order" className="hover:text-purple-300 transition-colors">
                    Track Order & Delivery
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/orders" className="hover:text-purple-300 transition-colors">
                    My Account & Licenses
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-purple-300 transition-colors">
                    Frequently Asked Questions
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-purple-300 transition-colors">
                    About Tech Store
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => setShowWhatsAppModal(true)}
                    className="hover:text-purple-300 transition-colors text-left"
                  >
                    Direct WhatsApp Desk
                  </button>
                </li>
                <li>
                  <Link href="/admin" className="text-purple-400 hover:text-purple-300 transition-colors font-semibold">
                    Admin Control Panel
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal & Governance */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
                Legal & Policies
              </h4>
              <ul className="space-y-2.5 text-xs font-medium text-slate-400">
                <li>
                  <Link href="/legal/terms" className="hover:text-purple-300 transition-colors">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/legal/privacy-policy" className="hover:text-purple-300 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/legal/refund-policy" className="hover:text-purple-300 transition-colors">
                    Refund & Cancellation Policy
                  </Link>
                </li>
                <li>
                  <Link href="/legal/delivery-policy" className="hover:text-purple-300 transition-colors">
                    Digital Delivery Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div>
              © {new Date().getFullYear()} {businessName}. All rights reserved. {tagline}.
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <span>Secure Razorpay Gateway</span>
              <span>·</span>
              <span>Instant Digital Delivery</span>
              <span>·</span>
              <span>Dedicated Indian Support</span>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Modal */}
      {showWhatsAppModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#111116] text-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-purple-500/30 relative">
            <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-300 mb-4 shadow-[0_0_20px_rgba(129,56,245,0.3)]">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Chat on WhatsApp</h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Have questions regarding Windows activation, software licensing compatibility, or AI subscription plans? Our team is ready to assist you directly.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20Tech%20Store%2C%20I%20have%20an%20inquiry%20regarding%20a%20digital%20product.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs text-center shadow-[0_0_20px_rgba(129,56,245,0.4)] flex items-center justify-center gap-2 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                Open WhatsApp ({whatsappNumber})
              </a>
              <button
                onClick={() => setShowWhatsAppModal(false)}
                className="w-full py-2.5 text-xs text-slate-400 hover:text-white font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
