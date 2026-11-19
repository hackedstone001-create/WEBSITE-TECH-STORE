'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  Filter,
  ArrowUpDown,
  Sparkles,
  SlidersHorizontal,
  X,
  RefreshCw,
  PackageOpen,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { ProductCard } from '@/components/product/ProductCard';
import { formatPrice } from '@/lib/utils';

export default function ProductsPage() {
  const { products } = useStore();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProductType, setSelectedProductType] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [sortBy, setSortBy] = useState<
    'featured' | 'newest' | 'price-asc' | 'price-desc' | 'best-selling' | 'highest-rated'
  >('featured');
  const [visibleCount, setVisibleCount] = useState<number>(12);

  // Official 8 categories + All
  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'windows-keys', label: 'Windows Keys' },
    { id: 'microsoft-office', label: 'Microsoft Office' },
    { id: 'antivirus-security', label: 'Antivirus & Security' },
    { id: 'ai-tools', label: 'AI Tools' },
    { id: 'video-editing', label: 'Video Editing Software' },
    { id: 'design-productivity', label: 'Design & Productivity' },
    { id: 'development-tools', label: 'Development Tools' },
    { id: 'digital-products', label: 'Digital Products' },
    { id: 'software', label: 'Creative & Utilities' },
  ];

  // Exact 6 product types from prompt:
  // 1. One-time license
  // 2. Subscription
  // 3. Digital download
  // 4. Software key
  // 5. Manually activated product
  // 6. Product bundle
  const productTypes = [
    { id: 'all', label: 'All Product Types' },
    { id: 'one-time', label: 'One-Time License' },
    { id: 'subscription', label: 'Subscription' },
    { id: 'download', label: 'Digital Download' },
    { id: 'key', label: 'Software Key' },
    { id: 'manual', label: 'Manually Activated' },
    { id: 'bundle', label: 'Product Bundle' },
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        const matchesCategory =
          selectedCategory === 'all' ||
          p.category === selectedCategory ||
          (selectedCategory === 'software' && (
            p.category === 'software' ||
            p.category === 'microsoft-office' ||
            p.category === 'antivirus-security' ||
            p.category === 'video-editing' ||
            p.category === 'design-productivity' ||
            p.category === 'development-tools'
          ));

        // Product Type filter
        let matchesType = true;
        if (selectedProductType === 'one-time') {
          matchesType = p.licenseDuration?.toLowerCase().includes('lifetime') || p.licenseDuration?.toLowerCase().includes('permanent');
        } else if (selectedProductType === 'subscription') {
          matchesType = p.licenseDuration?.toLowerCase().includes('subscription') || p.licenseDuration?.toLowerCase().includes('month') || p.licenseDuration?.toLowerCase().includes('year');
        } else if (selectedProductType === 'download') {
          matchesType = p.deliveryType === 'instant_automated';
        } else if (selectedProductType === 'key') {
          matchesType = p.category === 'windows-keys' || p.deliveryType === 'instant_automated';
        } else if (selectedProductType === 'manual') {
          matchesType = p.deliveryType === 'manual_activation' || p.deliveryType === 'account_credential';
        } else if (selectedProductType === 'bundle') {
          matchesType = p.category === 'digital-products' || p.name.toLowerCase().includes('bundle') || p.name.toLowerCase().includes('pack');
        }

        // Price filter
        const matchesPrice = p.price <= maxPrice;

        // Search query
        const matchesSearch =
          !search.trim() ||
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.tagline.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase()) ||
          p.categoryName.toLowerCase().includes(search.toLowerCase());

        return matchesCategory && matchesType && matchesPrice && matchesSearch;
      })
      .sort((a, b) => {
        // Sorting strictly matching prompt options:
        // - Featured
        // - Newest
        // - Price low to high
        // - Price high to low
        // - Best selling
        // - Highest rated
        switch (sortBy) {
          case 'newest':
            return b.id.localeCompare(a.id);
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'best-selling':
            return (b.reviewCount || 0) - (a.reviewCount || 0);
          case 'highest-rated':
            return (b.rating || 0) - (a.rating || 0);
          case 'featured':
          default:
            return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
        }
      });
  }, [products, search, selectedCategory, selectedProductType, maxPrice, sortBy]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  const resetFilters = () => {
    setSearch('');
    setSelectedCategory('all');
    setSelectedProductType('all');
    setMaxPrice(10000);
    setSortBy('featured');
  };

  return (
    <div className="min-h-screen py-10 sm:py-14 bg-[#F5F5F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header strictly matching prompt page heading */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 border border-purple-200 text-purple-700 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>GENUINE DIGITAL MARKETPLACE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#17151D] tracking-tight font-display">
            Explore Our Digital Store
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#77717E] leading-relaxed">
            Browse genuine Windows retail licenses, official AI subscriptions, developer suites, and downloadable creative tools with instant automated key dispatch.
          </p>
        </div>

        {/* Filter Controls Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E5ED] shadow-[0_4px_20px_-4px_rgba(23,21,29,0.04)] mb-8 space-y-6">
          {/* Top Row: Search & Sorter */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="lg:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products by title, category, feature, or tool..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#F5F5F7] border border-[#E8E5ED] rounded-2xl pl-11 pr-10 py-3 text-xs sm:text-sm text-[#17151D] placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:bg-white transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Product Type Filter */}
            <div className="lg:col-span-3">
              <select
                value={selectedProductType}
                onChange={(e) => setSelectedProductType(e.target.value)}
                className="w-full bg-[#F5F5F7] border border-[#E8E5ED] rounded-2xl px-4 py-3 text-xs sm:text-sm text-[#17151D] focus:outline-none focus:border-purple-600 cursor-pointer font-medium"
              >
                {productTypes.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sorting Select */}
            <div className="lg:col-span-3">
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="w-full bg-[#F5F5F7] border border-[#E8E5ED] rounded-2xl px-4 py-3 text-xs sm:text-sm text-[#17151D] focus:outline-none focus:border-purple-600 cursor-pointer font-semibold"
              >
                <option value="featured">Sort: Featured</option>
                <option value="newest">Sort: Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="best-selling">Sort: Best Selling</option>
                <option value="highest-rated">Sort: Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Category Tabs Pill Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-2 border-t border-[#E8E5ED]">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === c.id
                    ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(129,56,245,0.35)]'
                    : 'bg-[#F5F5F7] text-[#77717E] hover:text-[#17151D] hover:bg-slate-200/80 border border-[#E8E5ED]'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Bottom Bar: Price Slider & Count */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-3 border-t border-[#E8E5ED] text-xs text-[#77717E]">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="font-semibold text-[#17151D] shrink-0">Max Price:</span>
              <input
                type="range"
                min="500"
                max="10000"
                step="250"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-36 accent-purple-600 cursor-pointer"
              />
              <span className="font-bold text-purple-600 font-mono">
                {formatPrice(maxPrice)}
              </span>
            </div>

            {/* Product Count & Reset */}
            <div className="flex items-center justify-between w-full sm:w-auto gap-4">
              <span className="font-medium text-[#17151D]">
                Showing <strong className="text-purple-600">{displayedProducts.length}</strong> of{' '}
                {filteredProducts.length} products
              </span>

              {(search || selectedCategory !== 'all' || selectedProductType !== 'all' || maxPrice < 10000) && (
                <button
                  onClick={resetFilters}
                  className="text-purple-600 hover:text-purple-700 font-semibold flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E8E5ED] max-w-lg mx-auto shadow-sm my-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <PackageOpen className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-[#17151D] mb-1">No products match your criteria</h3>
            <p className="text-xs text-[#77717E] mb-6">
              Try adjusting your search terms, removing filters, or raising the maximum price threshold.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-semibold hover:bg-purple-500 transition-colors shadow-sm"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          /* Products Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Load More / Pagination */}
        {visibleCount < filteredProducts.length && (
          <div className="mt-14 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 8)}
              className="px-8 py-3.5 rounded-2xl bg-white hover:bg-purple-600 hover:text-white text-[#17151D] text-xs font-bold border border-[#E8E5ED] hover:border-purple-600 transition-all duration-200 shadow-sm active:scale-95"
            >
              Load More Products ({filteredProducts.length - visibleCount} Remaining)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
