'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Cpu,
  Sparkles,
  ArrowRight,
  MessageSquare,
  Image as ImageIcon,
  Video,
  PenTool,
  CheckCircle2,
  Code2,
  Palette,
  Briefcase,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { ProductCard } from '@/components/product/ProductCard';

export const AIToolsCollection = () => {
  const { products } = useStore();
  const [activeTab, setActiveTab] = useState<string>('all');

  // Exact 7 AI sub-categories from prompt:
  // - AI Chatbots
  // - AI Image Generation
  // - AI Video Generation
  // - AI Writing
  // - AI Productivity
  // - AI Design
  // - AI Development
  const aiSubcategories = [
    { id: 'all', label: 'All AI Tools', icon: Sparkles },
    { id: 'chatbots', label: 'AI Chatbots', icon: MessageSquare },
    { id: 'image', label: 'AI Image Generation', icon: ImageIcon },
    { id: 'video', label: 'AI Video Generation', icon: Video },
    { id: 'writing', label: 'AI Writing', icon: PenTool },
    { id: 'productivity', label: 'AI Productivity', icon: Briefcase },
    { id: 'design', label: 'AI Design', icon: Palette },
    { id: 'dev', label: 'AI Development', icon: Code2 },
  ];

  const aiProducts = useMemo(() => {
    return products.filter((p) => p.category === 'ai-tools');
  }, [products]);

  // Featured AI brand chips
  const aiBrands = [
    'ChatGPT Plus',
    'Claude Pro',
    'Gemini Advanced',
    'Midjourney Pro',
    'Canva Pro AI',
    'Leonardo AI',
    'Cursor AI Pro',
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#08080B] text-white relative overflow-hidden border-b border-purple-900/30">
      {/* Ambient Lighting */}
      <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-purple-950/40 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 hero-grid-pattern opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header strictly matching prompt headline */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/70 border border-purple-500/30 text-purple-300 text-xs font-semibold shadow-[0_0_15px_rgba(129,56,245,0.25)]">
              <Cpu className="w-3.5 h-3.5 text-purple-400" />
              <span>FRONTIER GENERATIVE PLATFORMS</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight font-display">
              Discover the Power of AI.
            </h2>

            <p className="text-base text-slate-300 leading-relaxed">
              Supercharge your creative output, writing, and software engineering with official unthrottled access to the world&apos;s leading frontier artificial intelligence suites.
            </p>
          </div>

          <Link
            href="/category/ai-tools"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs tracking-wide shadow-[0_0_20px_rgba(129,56,245,0.4)] transition-all group self-start lg:self-auto"
          >
            <span>Browse Full AI Catalog</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Featured Brands Marquee / Bar */}
        <div className="mb-10 p-4 sm:p-5 rounded-3xl bg-[#111116] border border-purple-500/25 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-300">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Supported Platforms:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {aiBrands.map((brand) => (
              <span
                key={brand}
                className="px-3 py-1 rounded-full text-xs font-medium bg-[#19151F] border border-purple-500/20 text-slate-200"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>

        {/* AI Subcategory Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {aiSubcategories.map((sub) => {
            const Icon = sub.icon;
            const isActive = activeTab === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => setActiveTab(sub.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(129,56,245,0.45)]'
                    : 'bg-[#111116] text-slate-300 hover:text-white hover:bg-purple-600/10 border border-purple-500/20'
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-purple-300" />
                <span>{sub.label}</span>
              </button>
            );
          })}
        </div>

        {/* Light Product Cards on Dark Stage */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {aiProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
