'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { ProductCard } from '@/components/product/ProductCard';

export const RecentlyAdded = () => {
  const { products } = useStore();

  // Pick recent items or reversed list
  const recentProducts = [...products].reverse().slice(0, 4);

  return (
    <section className="py-20 sm:py-24 bg-white relative border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold mb-3">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span>FRESH RELEASES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight font-display">
              Recently Added Licenses
            </h2>
            <p className="mt-3 text-base text-slate-500 leading-relaxed">
              Explore the newest software versions, upgraded enterprise quotas, and recently provisioned authentic digital bundles.
            </p>
          </div>

          <Link
            href="/products?sort=newest"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 group self-start md:self-auto"
          >
            <span>View All New Releases</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {recentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
