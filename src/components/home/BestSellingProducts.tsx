'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Flame, ArrowUpDown, ArrowRight } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { ProductCard } from '@/components/product/ProductCard';

export const BestSellingProducts = () => {
  const { products } = useStore();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popularity' | 'price-asc' | 'price-desc'>('popularity');

  const categories = [
    { id: 'all', label: 'All Best Sellers' },
    { id: 'windows-keys', label: 'Windows Keys' },
    { id: 'ai-tools', label: 'AI Tools' },
    { id: 'software', label: 'Software & Office' },
    { id: 'digital-products', label: 'Digital Products' },
  ];

  const filteredAndSortedProducts = useMemo(() => {
    let result = products.filter((p) => {
      if (activeCategory === 'all') return true;
      return p.category === activeCategory;
    });

    switch (sortBy) {
      case 'price-asc':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'popularity':
      default:
        result = [...result].sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
        break;
    }

    return result.slice(0, 8);
  }, [products, activeCategory, sortBy]);

  return (
    <section className="py-20 sm:py-24 bg-white border-b border-[#E8E5ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 border border-purple-200 text-purple-700 text-xs font-semibold mb-3">
              <Flame className="w-3.5 h-3.5 text-purple-600" />
              <span>MARKETPLACE LEADERS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17151D] tracking-tight font-display">
              Best-Selling Digital Products
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#77717E] max-w-xl">
              Authentic software keys, Windows retail licenses, and AI subscriptions backed by genuine verified customer reviews.
            </p>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="text-xs font-medium text-[#77717E] flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-purple-600" /> Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="text-xs text-[#17151D] bg-[#F5F5F7] px-3.5 py-2 rounded-xl border border-[#E8E5ED] shadow-sm focus:outline-none focus:border-purple-400 font-semibold cursor-pointer"
            >
              <option value="popularity">Most Popular & Highly Rated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(129,56,245,0.35)]'
                  : 'bg-[#F5F5F7] text-[#77717E] hover:text-[#17151D] hover:bg-slate-200/70 border border-[#E8E5ED]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Explore All CTA link */}
        <div className="mt-14 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#F5F5F7] hover:bg-purple-600 hover:text-white text-[#17151D] text-sm font-semibold border border-[#E8E5ED] hover:border-purple-600 transition-all duration-200 shadow-sm"
          >
            <span>Explore Complete Store Catalogue</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};
