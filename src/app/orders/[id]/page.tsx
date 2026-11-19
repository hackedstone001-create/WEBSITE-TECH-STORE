'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  CheckCircle2,
  Copy,
  Check,
  Download,
  Key,
  ShieldCheck,
  FileText,
  Printer,
  ArrowRight,
  ExternalLink,
  Laptop,
  AlertCircle,
  HelpCircle,
  Sparkles,
  MessageSquare,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStore } from '@/context/StoreContext';
import { formatPrice, formatDate } from '@/lib/utils';

export default function OrderSuccessPage() {
  const params = useParams();
  const orderId = params?.id as string;
  const { getOrderById, showToast, websiteSettings } = useStore();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const order = getOrderById(orderId);
  const whatsappNumber = websiteSettings?.whatsappNumber || '+919876543210';

  useEffect(() => {
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#8138F5', '#A855F7', '#C4A2FF', '#16A36A'],
      });
    } catch {}
  }, []);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(text);
    showToast(`${label} copied to clipboard!`, 'success');
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  if (!order) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20 bg-[#F5F5F7]">
        <AlertCircle className="w-12 h-12 text-purple-600 mb-4" />
        <h1 className="text-2xl font-bold text-[#17151D] mb-2 font-display">Order Not Located</h1>
        <p className="text-sm text-[#77717E] max-w-sm mb-6">
          Unable to find order #{orderId}. If you just placed an order, please check your customer dashboard.
        </p>
        <Link
          href="/dashboard/orders"
          className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
        >
          View All Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 sm:py-14 bg-[#F5F5F7]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Celebration Header Banner */}
        <div className="rounded-3xl bg-white p-8 sm:p-10 border border-purple-200 text-center relative overflow-hidden mb-8 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-purple-50 text-purple-600 border border-purple-200 flex items-center justify-center mx-auto mb-4 shadow-sm">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-purple-700 bg-purple-50 border border-purple-200 px-3 py-1 rounded-full inline-block mb-2">
            Payment Verified & Dispatched
          </span>

          <h1 className="text-2xl sm:text-4xl font-black text-[#17151D] tracking-tight font-display">
            Order #{order.orderNumber} Completed!
          </h1>

          <p className="text-sm text-[#77717E] mt-2 max-w-md mx-auto">
            Thank you, <strong className="text-[#17151D]">{order.customerName}</strong>. Your genuine digital licenses and authenticated keys are unlocked below.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-xs text-[#77717E]">
            <div className="p-2.5 rounded-xl bg-[#F5F5F7] border border-[#E8E5ED] font-mono">
              <span className="text-slate-400">Order ID: </span>
              <span className="text-purple-600 font-bold">{order.orderNumber}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#F5F5F7] border border-[#E8E5ED]">
              <span className="text-slate-400">Date: </span>
              <span className="text-[#17151D] font-medium">{formatDate(order.createdAt)}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#F5F5F7] border border-[#E8E5ED]">
              <span className="text-slate-400">Total Paid: </span>
              <span className="text-purple-700 font-mono font-bold">
                {formatPrice(order.total)}
              </span>
            </div>
          </div>
        </div>

        {/* Digital Licenses Vault */}
        <div className="space-y-6 mb-10">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#17151D] flex items-center gap-2 font-display">
              <Key className="w-5 h-5 text-purple-600" />
              Digital License Vault & Inclusions
            </h2>
            <div className="flex items-center gap-2">
              <a
                href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20Tech%20Store%2C%20I%20need%20activation%20help%20with%20Order%20%23${order.orderNumber}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Help</span>
              </a>
              <button
                onClick={handlePrintInvoice}
                className="text-xs font-semibold text-[#17151D] hover:text-purple-600 flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#E8E5ED] shadow-sm transition-colors"
              >
                <Printer className="w-3.5 h-3.5 text-purple-600" />
                <span>Print Tax Invoice</span>
              </button>
            </div>
          </div>

          {order.items.map((item, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-white p-6 sm:p-7 border border-[#E8E5ED] shadow-sm space-y-4 hover:border-purple-300 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8E5ED] pb-4">
                <div>
                  <h3 className="text-base font-bold text-[#17151D] font-display">
                    {item.productName}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-[#77717E] mt-1">
                    <span className="text-purple-600 font-semibold">
                      {item.licenseDuration}
                    </span>
                    <span>•</span>
                    <span>Qty: {item.quantity}</span>
                  </div>
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 border border-purple-200 px-2.5 py-1 rounded-xl self-start sm:self-auto">
                  {item.deliveryType === 'instant_automated'
                    ? 'Instant Automated Key'
                    : 'Account Credential Upgrade'}
                </span>
              </div>

              {/* License Key Box */}
              {item.licenseKey && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#17151D] flex items-center justify-between">
                    <span>Genuine Activation Serial Key:</span>
                    <span className="text-[10px] text-[#77717E]">Keep confidential</span>
                  </label>
                  <div className="p-4 rounded-2xl bg-[#08080B] border border-purple-500/30 flex items-center justify-between gap-3 text-white shadow-inner">
                    <span className="font-mono font-bold text-sm sm:text-base text-purple-300 tracking-wider truncate">
                      {item.licenseKey}
                    </span>
                    <button
                      onClick={() =>
                        copyToClipboard(item.licenseKey!, item.productName)
                      }
                      className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0 shadow-[0_0_12px_rgba(129,56,245,0.4)]"
                    >
                      {copiedKey === item.licenseKey ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" /> Copy Key
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Download Link */}
              {item.downloadLink && (
                <div className="pt-2">
                  <a
                    href={item.downloadLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F5F5F7] hover:bg-purple-50 border border-[#E8E5ED] hover:border-purple-200 text-[#17151D] text-xs font-semibold transition-colors"
                  >
                    <Download className="w-4 h-4 text-purple-600" />
                    Official Software Download Link
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </div>
              )}

              {/* Instructions */}
              <div className="pt-2 text-xs text-[#77717E] leading-relaxed">
                <p className="font-bold text-[#17151D] mb-1">
                  Activation Protocol:
                </p>
                <p>
                  Copy the license key above, open your installed application or operating system activation panel, and enter the serial key to activate permanently with official vendor servers.
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Customer Dashboard Navigation */}
        <div className="bg-white rounded-3xl p-6 border border-[#E8E5ED] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-[#17151D]">
              Permanent Customer Vault Access
            </h4>
            <p className="text-xs text-[#77717E] mt-0.5">
              All your active licenses, invoices, and download files remain permanently accessible in your Customer Dashboard.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/dashboard/orders"
              className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-[0_0_15px_rgba(129,56,245,0.35)] transition-all"
            >
              Go to Customer Vault
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
