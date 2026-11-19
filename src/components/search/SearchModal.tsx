'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, X, ArrowRight, Tag, Sparkles, ChevronRight, Zap } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { formatPrice } from '@/lib/utils';

export const SearchModal = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    products,
  } = useStore();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredProducts = products.filter((p) => {
    const matchesCat =
      selectedCategory === 'all' || p.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCat;
    const matchesQuery =
      p.name.toLowerCase().includes(query) ||
      p.tagline.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.features.some((f) => f.toLowerCase().includes(query));
    return matchesCat && matchesQuery;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-150">
      <div
        onClick={() => setIsSearchOpen(false)}
        className="fixed inset-0"
      />

      <div className="relative w-full max-w-2xl bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden z-10 flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-blue-600 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search AI subscriptions, Windows retail keys, software..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none text-sm sm:text-base font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="px-2 py-1 text-xs text-slate-400 bg-slate-100 border border-slate-200 rounded-lg hover:text-slate-800"
          >
            ESC
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="p-3 border-b border-slate-100 flex gap-2 overflow-x-auto text-xs scrollbar-none bg-slate-50/60">
          {[
            { id: 'all', label: 'All Products' },
            { id: 'ai-tools', label: 'AI Tools' },
            { id: 'software', label: 'Software' },
            { id: 'windows-keys', label: 'Windows Keys' },
            { id: 'digital-products', label: 'Digital Assets' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {filteredProducts.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-sm">
              No software or licenses match &ldquo;{searchQuery}&rdquo;.
            </div>
          ) : (
            filteredProducts.map((p) => (
              <Link
                key={p.id}
                href={`/products/${p.slug}`}
                onClick={() => setIsSearchOpen(false)}
                className="p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all flex items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-12 h-12 rounded-lg object-cover border border-slate-200 bg-slate-50 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-blue-600 truncate transition-colors">
                      {p.name}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate flex items-center gap-1.5 mt-0.5">
                      <span className="text-blue-600 font-medium">{p.categoryName}</span>
                      <span>•</span>
                      <span>{p.licenseDuration}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <div className="text-xs sm:text-sm font-bold text-slate-900 font-display">
                      {formatPrice(p.price)}
                    </div>
                    {p.originalPrice && (
                      <div className="text-[10px] text-slate-400 line-through">
                        {formatPrice(p.originalPrice)}
                      </div>
                    )}
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Modal Footer Quick Tip */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 px-4">
          <div className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-blue-600" />
            <span>Search by product name, Windows edition, AI model, or license type</span>
          </div>
          <span className="font-mono">Press ↵ to select</span>
        </div>
      </div>
    </div>
  );
};
