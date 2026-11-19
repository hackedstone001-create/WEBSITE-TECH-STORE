'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  KeyRound,
  FileSpreadsheet,
  ShieldCheck,
  Cpu,
  Video,
  Palette,
  Code2,
  Package,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export const CategorySection = () => {
  const { products } = useStore();

  // Exactly the 8 required categories from prompt:
  // 1. Windows Keys
  // 2. Microsoft Office
  // 3. Antivirus & Security
  // 4. AI Tools
  // 5. Video Editing Software
  // 6. Design & Productivity
  // 7. Development Tools
  // 8. Digital Products
  const categories = [
    {
      id: 'windows-keys',
      title: 'Windows Keys',
      description: 'Genuine Windows 11 & 10 retail licenses with lifetime permanent activation.',
      icon: KeyRound,
      badge: 'Permanent Retail',
      href: '/category/windows-keys',
      image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80',
      gradient: 'from-purple-900/80 to-[#08080B]',
    },
    {
      id: 'microsoft-office',
      title: 'Microsoft Office',
      description: 'Complete productivity suites including Office 2024 Pro Plus, 365, and Home & Business.',
      icon: FileSpreadsheet,
      badge: 'Work & Home',
      href: '/category/microsoft-office',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
      gradient: 'from-purple-950/80 to-[#08080B]',
    },
    {
      id: 'antivirus-security',
      title: 'Antivirus & Security',
      description: 'Total endpoint protection, premium VPNs, and ransomware defense licenses.',
      icon: ShieldCheck,
      badge: 'Total Security',
      href: '/category/antivirus-security',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
      gradient: 'from-purple-900/80 to-[#08080B]',
    },
    {
      id: 'ai-tools',
      title: 'AI Tools',
      description: 'Official subscriptions for frontier AI models, Canvas workspaces, and generative tools.',
      icon: Cpu,
      badge: 'Frontier Intelligence',
      href: '/category/ai-tools',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
      gradient: 'from-purple-950/80 to-[#08080B]',
    },
    {
      id: 'video-editing',
      title: 'Video Editing Software',
      description: 'Commercial 4K post-production, VFX tools, and industry-standard creative software.',
      icon: Video,
      badge: '4K Creative Studio',
      href: '/category/video-editing',
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
      gradient: 'from-purple-900/80 to-[#08080B]',
    },
    {
      id: 'design-productivity',
      title: 'Design & Productivity',
      description: 'Vector illustration, cloud design platforms, and high-performance workflow utilities.',
      icon: Palette,
      badge: 'Design Suite',
      href: '/category/design-productivity',
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80',
      gradient: 'from-purple-900/80 to-[#08080B]',
    },
    {
      id: 'development-tools',
      title: 'Development Tools',
      description: 'Enterprise IDEs, AI coding assistants, and compiler toolchains for engineers.',
      icon: Code2,
      badge: 'Engineers & Devs',
      href: '/category/development-tools',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      gradient: 'from-purple-950/80 to-[#08080B]',
    },
    {
      id: 'digital-products',
      title: 'Digital Products',
      description: 'Specialized bundles, developer assets, utility packs, and curated software kits.',
      icon: Package,
      badge: 'Curated Kits',
      href: '/category/digital-products',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      gradient: 'from-purple-900/80 to-[#08080B]',
    },
  ];

  return (
    <section id="categories" className="py-20 sm:py-24 bg-[#F5F5F7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 border border-purple-200 text-purple-700 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>OFFICIAL CATALOGUE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17151D] tracking-tight font-display">
              Browse by Category
            </h2>
            <p className="text-sm sm:text-base text-[#77717E] max-w-xl">
              Select your required digital licensing category for instant dispatch and verified activation.
            </p>
          </div>

          <Link
            href="/products"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-purple-600 hover:text-purple-700 group transition-colors"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 8 Premium Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                className="group relative bg-white rounded-3xl border border-[#E8E5ED] overflow-hidden hover:border-purple-300 transition-all duration-300 hover:shadow-[0_20px_35px_-10px_rgba(129,56,245,0.15)] hover:-translate-y-1.5 flex flex-col justify-between"
              >
                {/* Visual Artwork Container */}
                <div className="relative h-44 w-full overflow-hidden bg-[#111116]">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover opacity-60 transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${cat.gradient} opacity-85`} />

                  {/* Badge */}
                  <div className="absolute top-3.5 left-3.5">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-purple-300 border border-purple-500/30">
                      {cat.badge}
                    </span>
                  </div>

                  {/* Icon Emblem */}
                  <div className="absolute bottom-3.5 left-3.5 w-10 h-10 rounded-xl bg-purple-600/90 text-white flex items-center justify-center shadow-lg backdrop-blur-sm group-hover:bg-purple-500 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg text-[#17151D] group-hover:text-purple-600 transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-[#77717E] leading-relaxed line-clamp-2">
                      {cat.description}
                    </p>
                  </div>

                  <Link
                    href={cat.href}
                    className="inline-flex items-center justify-between w-full py-2.5 px-4 rounded-xl bg-[#F5F5F7] group-hover:bg-purple-600 group-hover:text-white text-[#17151D] text-xs font-semibold transition-all duration-200"
                  >
                    <span>Explore Products</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
