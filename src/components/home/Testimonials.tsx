'use client';

import React from 'react';
import { Star, ShieldCheck, Quote, Sparkles, CheckCircle2 } from 'lucide-react';
import { MOCK_REVIEWS } from '@/data/mockData';

export const Testimonials = () => {
  return (
    <section className="py-20 sm:py-24 bg-[#F5F5F7] relative border-b border-[#E8E5ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 border border-purple-200 text-purple-700 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>AUTHENTIC EXPERIENCES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17151D] tracking-tight font-display">
            Verified Customer Reviews
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#77717E] leading-relaxed">
            Transparent feedback from verified customers who purchased software licenses and AI subscriptions.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_REVIEWS.filter(r => r.isApproved !== false).map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-3xl p-6 border border-[#E8E5ED] hover:border-purple-300 shadow-[0_4px_16px_-4px_rgba(23,21,29,0.04)] hover:shadow-[0_20px_35px_-10px_rgba(129,56,245,0.1)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Rating & Verified Buyer Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400 text-sm">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>

                  {review.isVerifiedPurchase && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full font-bold">
                      <ShieldCheck className="w-3 h-3 text-purple-600" /> Verified Buyer
                    </span>
                  )}
                </div>

                {/* Review Title */}
                <h4 className="text-sm font-bold text-[#17151D] mb-2 line-clamp-1">
                  &quot;{review.title}&quot;
                </h4>

                {/* Review Comment */}
                <p className="text-xs text-[#77717E] leading-relaxed italic mb-6">
                  &quot;{review.comment}&quot;
                </p>
              </div>

              {/* Customer Name, Product & Date */}
              <div className="pt-4 border-t border-[#E8E5ED] flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-[#17151D]">{review.authorName}</p>
                  <p className="text-[11px] text-purple-600 font-semibold line-clamp-1">
                    {review.productName}
                  </p>
                  {review.date && (
                    <p className="text-[10px] text-[#77717E] mt-0.5">
                      {new Date(review.date).toLocaleDateString('en-IN', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  )}
                </div>
                <Quote className="w-6 h-6 text-purple-200" />
              </div>
            </div>
          ))}
        </div>

        {/* Real Customer Verification Note */}
        <div className="mt-12 text-center text-xs text-[#77717E] flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-purple-600" />
          <span>All reviews are submitted by verified purchasers and moderated by Tech Store administrators.</span>
        </div>
      </div>
    </section>
  );
};
