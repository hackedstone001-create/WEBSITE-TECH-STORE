'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Tag,
  Check,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { formatPrice } from '@/lib/utils';

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    discount,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput.trim()) return;

    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-[#E8E5ED] text-[#17151D] flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-5 border-b border-[#E8E5ED] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <h2 className="text-base font-bold text-[#17151D]">Shopping Cart</h2>
              <span className="text-xs bg-[#F5F5F7] text-[#77717E] px-2.5 py-0.5 rounded-full font-bold">
                {cart.reduce((sum, i) => sum + i.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-xl text-slate-400 hover:text-[#17151D] hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-[#17151D] mb-1 font-display">
                  Your cart is empty
                </h3>
                <p className="text-xs text-[#77717E] max-w-xs mb-6">
                  Explore genuine software licenses, Windows keys, and AI subscriptions.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-sm transition-colors"
                >
                  Browse Products
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="p-4 rounded-2xl bg-[#F5F5F7] border border-[#E8E5ED] flex gap-3.5 items-center relative group"
                >
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-[#E8E5ED] shrink-0 bg-[#111116]">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${item.product.slug}`}
                      onClick={() => setIsCartOpen(false)}
                      className="text-xs font-bold text-[#17151D] hover:text-purple-600 line-clamp-1 transition-colors"
                    >
                      {item.product.name}
                    </Link>
                    <div className="text-[11px] text-purple-600 font-semibold flex items-center gap-1 mt-0.5">
                      <Zap className="w-3 h-3" />
                      {item.product.licenseDuration}
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-extrabold text-[#17151D] font-display">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>

                      {/* Quantity Controller */}
                      <div className="flex items-center gap-1 bg-white border border-[#E8E5ED] rounded-xl p-0.5 shadow-sm">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="w-5 h-5 flex items-center justify-center text-slate-500 hover:text-purple-600 rounded"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold w-5 text-center text-[#17151D]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="w-5 h-5 flex items-center justify-center text-slate-500 hover:text-purple-600 rounded"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-slate-400 hover:text-red-500 p-1.5 transition-colors self-start"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#E8E5ED] bg-white space-y-4">
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Coupon: TECH10, SAVE20"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      className="w-full bg-[#F5F5F7] border border-[#E8E5ED] rounded-xl pl-8 pr-3 py-2 text-xs text-[#17151D] placeholder-slate-400 focus:outline-none focus:border-purple-600 font-mono"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#17151D] hover:bg-purple-600 text-white rounded-xl text-xs font-semibold transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {couponError && (
                  <p className="text-[11px] text-red-500 font-medium">{couponError}</p>
                )}
                {appliedCoupon && (
                  <div className="flex items-center justify-between text-xs text-purple-700 bg-purple-50 px-3 py-1.5 rounded-xl border border-purple-200">
                    <span className="flex items-center gap-1 font-semibold">
                      <Check className="w-3 h-3" /> Coupon &ldquo;{appliedCoupon.code}&rdquo; applied!
                    </span>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-red-500 hover:underline text-[11px] font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </form>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#77717E] pt-2 border-t border-slate-100">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#17151D] font-display">{formatPrice(subtotal)}</span>
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
                  <span>Total Amount</span>
                  <span className="font-display text-purple-600">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full py-4 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(129,56,245,0.4)] transition-all active:scale-95"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#77717E]">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                <span>Instant Automated License Key Delivery</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
