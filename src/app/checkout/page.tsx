'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  Lock,
  CreditCard,
  Zap,
  ShoppingBag,
  ArrowRight,
  CheckCircle2,
  Tag,
  AlertCircle,
  Sparkles,
  Info,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { formatPrice } from '@/lib/utils';

export default function CheckoutPage() {
  const router = useRouter();
  const {
    cart,
    subtotal,
    discount,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    createOrder,
    user,
    showToast,
  } = useStore();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [city, setCity] = useState('Mumbai');
  const [notes, setNotes] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [paymentMode, setPaymentMode] = useState<'razorpay' | 'sandbox_test'>('razorpay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20 bg-[#F5F5F7]">
        <div className="w-16 h-16 rounded-2xl bg-white border border-[#E8E5ED] shadow-sm flex items-center justify-center text-slate-400 mb-4">
          <ShoppingBag className="w-8 h-8 text-purple-600" />
        </div>
        <h1 className="text-2xl font-bold text-[#17151D] mb-2 font-display">Your Cart is Empty</h1>
        <p className="text-sm text-[#77717E] max-w-sm mb-6">
          Add software licenses, AI subscriptions, or Windows keys to proceed with checkout.
        </p>
        <Link
          href="/products"
          className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
        >
          Browse Catalogue
        </Link>
      </div>
    );
  }

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponCode('');
    }
  };

  const verifyAndComplete = async (verificationPayload: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }) => {
    try {
      const verifyRes = await fetch('/api/payment/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(verificationPayload),
      });

      const verifyData = await verifyRes.json();

      if (!verifyRes.ok || !verifyData.verified) {
        throw new Error(verifyData.error || 'Payment signature verification failed.');
      }

      // Create persistent verified order and generate digital licenses
      const createdOrder = await createOrder({
        customerName: name,
        email,
        phone,
        paymentMethod: paymentMode === 'razorpay' ? 'razorpay' : 'sandbox_test',
        razorpayOrderId: verificationPayload.razorpay_order_id,
        razorpayPaymentId: verificationPayload.razorpay_payment_id,
        notes: `Delivery Email: ${email}. City: ${city}. ${notes}`,
      });

      showToast('Payment verified! Digital licenses unlocked.', 'success');
      router.push(`/orders/${createdOrder.id}`);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to verify payment status.');
      setIsProcessing(false);
    }
  };

  const handleProcessPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setErrorMessage('Please fill in your full name, digital delivery email address, and phone number.');
      return;
    }

    setIsProcessing(true);

    try {
      // 1. Initialize Order with Backend Gateway API
      const createOrderRes = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: total,
          currency: 'INR',
          receipt: `rcpt_${Date.now()}`,
          notes: { customer_email: email, customer_name: name },
        }),
      });

      const orderData = await createOrderRes.json();

      if (!createOrderRes.ok || !orderData.success) {
        throw new Error(orderData.error || 'Failed to initialize payment gateway.');
      }

      // Check if Live Razorpay script is available in window
      if (orderData.isLiveGateway && typeof window !== 'undefined' && (window as any).Razorpay) {
        const options = {
          key: orderData.keyId,
          amount: orderData.amount,
          currency: orderData.currency,
          name: 'Tech Store',
          description: 'Digital Software & License Key Delivery',
          image: '/brand/tech-store-logo.png',
          order_id: orderData.orderId,
          prefill: {
            name,
            email,
            contact: phone,
          },
          theme: {
            color: '#8138F5',
          },
          handler: async function (response: any) {
            await verifyAndComplete({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
          },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
        setIsProcessing(false);
        return;
      }

      // Test Mode & Sandbox Simulator Flow (Server-Verified fallback)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockPaymentId = `pay_ts_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`;
      const mockSignature = `sig_verified_${Date.now().toString(36)}`;

      await verifyAndComplete({
        razorpay_order_id: orderData.orderId,
        razorpay_payment_id: mockPaymentId,
        razorpay_signature: mockSignature,
      });
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Payment processing failed. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen py-10 sm:py-14 bg-[#F5F5F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 border border-purple-200 text-purple-700 text-xs font-semibold mb-2">
            <Lock className="w-3.5 h-3.5 text-purple-600" />
            <span>256-Bit TLS Encrypted Checkout</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-[#17151D] tracking-tight font-display">
            Checkout & Immediate Digital Fulfillment
          </h1>
          <p className="text-xs sm:text-sm text-[#77717E] mt-1">
            Your license keys and credentials will be unlocked instantly on screen and archived in your dashboard upon payment.
          </p>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleProcessPayment} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Left Column: Customer & Payment Details */}
          <div className="lg:col-span-7 space-y-6">
            {/* Customer Information Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E5ED] shadow-sm space-y-4">
              <h2 className="text-base font-bold text-[#17151D] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-mono font-bold border border-purple-200">
                  1
                </span>
                Customer & Delivery Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-[#17151D] mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Yash Vardhan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#F5F5F7] border border-[#E8E5ED] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#17151D] placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#17151D] mb-1.5">
                    Email for Digital Delivery <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="yash@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#F5F5F7] border border-[#E8E5ED] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#17151D] placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#17151D] mb-1.5">
                    Phone / WhatsApp Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#F5F5F7] border border-[#E8E5ED] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#17151D] placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#17151D] mb-1.5">
                    City, State (Billing)
                  </label>
                  <input
                    type="text"
                    placeholder="Mumbai, Maharashtra"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#F5F5F7] border border-[#E8E5ED] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#17151D] placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#17151D] mb-1.5">
                  Order Notes / Specific Account Email (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Provide any specific account email or activation preferences..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#F5F5F7] border border-[#E8E5ED] rounded-xl p-3 text-xs sm:text-sm text-[#17151D] placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:bg-white transition-colors"
                />
              </div>
            </div>

            {/* Payment Method Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E5ED] shadow-sm space-y-4">
              <h2 className="text-base font-bold text-[#17151D] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-mono font-bold border border-purple-200">
                  2
                </span>
                Payment Method & Gateway
              </h2>

              <div className="space-y-3 pt-2">
                {/* Razorpay Gateway */}
                <label
                  onClick={() => setPaymentMode('razorpay')}
                  className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                    paymentMode === 'razorpay'
                      ? 'bg-purple-50/70 border-purple-600 shadow-sm'
                      : 'bg-[#F5F5F7] border-[#E8E5ED] hover:border-purple-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border border-purple-600 flex items-center justify-center">
                      {paymentMode === 'razorpay' && (
                        <div className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-[#17151D]">
                        Razorpay India (UPI, GPay, Cards, NetBanking)
                      </p>
                      <p className="text-[11px] text-[#77717E]">
                        Instant automated key dispatch via Razorpay gateway.
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-white border border-[#E8E5ED] text-purple-700 font-mono px-2 py-0.5 rounded font-bold shadow-xs">
                    UPI / CARDS
                  </span>
                </label>

                {/* Instant Sandbox Test Mode */}
                <label
                  onClick={() => setPaymentMode('sandbox_test')}
                  className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                    paymentMode === 'sandbox_test'
                      ? 'bg-purple-50/70 border-purple-600 shadow-sm'
                      : 'bg-[#F5F5F7] border-[#E8E5ED] hover:border-purple-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border border-purple-600 flex items-center justify-center">
                      {paymentMode === 'sandbox_test' && (
                        <div className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-xs sm:text-sm font-bold text-[#17151D]">
                          Server-Verified Test Gateway
                        </p>
                        <span className="text-[10px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded font-bold">
                          SANDBOX TEST
                        </span>
                      </div>
                      <p className="text-[11px] text-[#77717E]">
                        Simulate full payment verification and immediate license key dispatch without charges.
                      </p>
                    </div>
                  </div>
                </label>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F5F5F7] border border-[#E8E5ED] flex items-start gap-2.5 text-[11px] text-[#77717E]">
                <Info className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <span>
                  Payments are verified server-side with HMAC SHA256 signatures. Never store card data on client.
                </span>
              </div>
            </div>

            {errorMessage && (
              <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}
          </div>

          {/* Right Column: Order Items Summary & Pay Button */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E5ED] shadow-sm space-y-6">
              <h2 className="text-base font-bold text-[#17151D] flex items-center justify-between">
                <span>Order Summary</span>
                <span className="text-xs text-[#77717E] font-normal">
                  {cart.reduce((s, i) => s + i.quantity, 0)} item(s)
                </span>
              </h2>

              {/* Items List */}
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center justify-between gap-3 text-xs p-3 rounded-2xl bg-[#F5F5F7] border border-[#E8E5ED]"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-[#111116] shrink-0 border border-[#E8E5ED]">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-[#17151D] truncate max-w-[170px]">
                          {item.product.name}
                        </p>
                        <p className="text-[10px] text-purple-600 font-semibold">
                          Qty: {item.quantity} • {item.product.licenseDuration}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-[#17151D] shrink-0 font-display">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Coupon Form */}
              {appliedCoupon ? (
                <div className="p-3 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    <div>
                      <p className="font-bold text-purple-900">{appliedCoupon.code} Applied</p>
                      <p className="text-[10px] text-purple-700">{appliedCoupon.description}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="text-red-500 hover:underline text-[11px] font-semibold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon Code (e.g. TECH20)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      className="flex-1 bg-[#F5F5F7] border border-[#E8E5ED] rounded-xl px-3 py-2 text-xs text-[#17151D] uppercase font-mono placeholder-slate-400 focus:outline-none focus:border-purple-600"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="px-4 py-2 rounded-xl bg-[#17151D] hover:bg-purple-600 text-white text-xs font-semibold transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-[11px] text-red-500">{couponError}</p>
                  )}
                  <p className="text-[10px] text-[#77717E]">
                    Available codes: <span className="font-mono text-purple-600 font-bold">TECH20</span> (20% off), <span className="font-mono text-purple-600 font-bold">SAVE10</span>
                  </p>
                </div>
              )}

              {/* Price Calculation breakdown */}
              <div className="space-y-2 text-xs text-[#77717E] pt-4 border-t border-[#E8E5ED]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[#17151D] font-display font-semibold">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-purple-600 font-semibold">
                    <span>Discount</span>
                    <span className="font-display">-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Taxes (Included)</span>
                  <span className="text-[#17151D] font-semibold">₹0</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-[#17151D] pt-2 border-t border-[#E8E5ED]">
                  <span>Total Payable</span>
                  <span className="text-purple-600 font-display text-xl">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Pay Now Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(129,56,245,0.4)] transition-all duration-200 disabled:opacity-50 active:scale-95"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Verifying Secure Payment...</span>
                  </div>
                ) : (
                  <>
                    <span>Pay {formatPrice(total)} & Access Licenses</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#77717E]">
                <ShieldCheck className="w-4 h-4 text-purple-600" />
                <span>Instant Digital Dispatch • 100% Genuine Activation</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
