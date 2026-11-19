'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowUpDown, ArrowRight } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { ProductCard } from '@/components/product/ProductCard';

export const FeaturedProducts = () => {
  const { products } = useStore();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popularity' | 'price-asc' | 'price-desc' | 'newest'>('popularity');

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'ai-tools', label: 'AI Tools' },
    { id: 'software', label: 'Software' },
    { id: 'windows-keys', label: 'Windows Keys' },
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
      case 'newest':
        result = [...result].reverse();
        break;
      case 'popularity':
      default:
        result = [...result].sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
        break;
    }

    return result;
  }, [products, activeCategory, sortBy]);

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple/10 border border-purple/20 text-purple text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Verified Digital Catalog
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Trending Products
            </h2>
            <p className="mt-2 text-sm text-muted">
              Instant license delivery, lifetime genuine support, and 100% money-back guarantee.
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="text-xs text-muted flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5" /> Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="glass-panel text-xs text-white px-3 py-2 rounded-xl border border-white/10 focus:outline-none focus:border-primary cursor-pointer font-medium"
            >
              <option value="popularity" className="bg-[#101827]">Popularity & Reviews</option>
              <option value="price-asc" className="bg-[#101827]">Price: Low to High</option>
              <option value="price-desc" className="bg-[#101827]">Price: High to Low</option>
              <option value="newest" className="bg-[#101827]">Newest Releases</option>
            </select>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-primary to-purple text-white shadow-glow-blue'
                  : 'bg-white/5 text-muted hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {cat.label}
              <span className="ml-2 text-[11px] opacity-70">
                (
                {cat.id === 'all'
                  ? products.length
                  : products.filter((p) => p.category === cat.id).length}
                )
              </span>
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl glass-panel text-white hover:text-primary font-bold text-sm border border-white/10 hover:border-primary/50 transition-all shadow-lg hover:shadow-glow-blue"
          >
            Explore Complete {products.length}+ Product Catalog
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
