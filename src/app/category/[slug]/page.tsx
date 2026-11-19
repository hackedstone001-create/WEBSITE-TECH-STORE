'use client';

import React, { useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Sparkles, AlertCircle, ArrowLeft } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { ProductCard } from '@/components/product/ProductCard';

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { products } = useStore();

  const categoryMeta: Record<
    string,
    { title: string; subtitle: string; description: string; badge: string }
  > = {
    'windows-keys': {
      title: 'Windows Keys & OS Licenses',
      subtitle: 'Official Microsoft Windows 11 & Windows 10 genuine retail licenses',
      description: 'Instant online Microsoft server activation. Transferable, permanent, and bindable to your personal Microsoft account with lifetime guarantee.',
      badge: 'Permanent Retail Keys',
    },
    'microsoft-office': {
      title: 'Microsoft Office Suites',
      subtitle: 'Office 2024 Pro Plus, 365, and Home & Business suites',
      description: 'Equip your workstation with Microsoft’s full productivity suite including Word, Excel, PowerPoint, Outlook, and OneNote with permanent entitlement.',
      badge: 'Genuine Productivity',
    },
    'antivirus-security': {
      title: 'Antivirus & Security Software',
      subtitle: 'Total endpoint protection, VPNs, and ransomware defense licenses',
      description: 'Keep your digital devices safe from cyber threats, malware, and intrusions with certified security software licenses.',
      badge: 'Certified Security',
    },
    'ai-tools': {
      title: 'AI Tools & Frontier Subscriptions',
      subtitle: 'Frontier AI models, intelligent coding IDEs, and generative platforms',
      description: 'Supercharge your daily workflow with official ChatGPT Plus, Claude Pro, Cursor AI Pro, and Midjourney access with guaranteed uptime.',
      badge: 'Frontier AI Intelligence',
    },
    'video-editing': {
      title: 'Video Editing & Post-Production Software',
      subtitle: 'Industry-standard 4K video editing, color grading, and VFX tools',
      description: 'Get full commercial licenses for top video production suites including DaVinci Resolve Studio and creative software.',
      badge: '4K Creative Studio',
    },
    'design-productivity': {
      title: 'Design & Productivity Tools',
      subtitle: 'Vector illustration, cloud design platforms, and high-performance workflow utilities',
      description: 'Industry-leading applications for graphics, UI/UX design, motion graphics, and system optimization.',
      badge: 'Design Suites',
    },
    'development-tools': {
      title: 'Development Tools & IDEs',
      subtitle: 'Enterprise IDEs, compiler toolchains, and AI-assisted programming environments',
      description: 'Equip your engineering team with JetBrains All Products, VS Code Pro tooling, and advanced software developer subscriptions.',
      badge: 'Engineers & Developers',
    },
    'digital-products': {
      title: 'Digital Products & Specialized Bundles',
      subtitle: 'Curated software packages, developer kits, and digital tools',
      description: 'Specialized bundles, developer assets, utility packs, and curated software combinations at discounted bundle prices.',
      badge: 'Curated Software Kits',
    },
    software: {
      title: 'Professional Software & Utilities',
      subtitle: 'Essential Mac and Windows software applications and productivity utilities',
      description: 'Official licenses for creative suites, system utilities, and professional virtualization tools with instant automated dispatch.',
      badge: 'Commercial Software',
    },
  };

  const currentMeta = categoryMeta[slug] || {
    title: slug ? slug.replace(/-/g, ' ').toUpperCase() : 'CATEGORY',
    subtitle: 'Digital Products & Software',
    description: 'Explore verified licenses and tools at Tech Store.',
    badge: 'Verified Digital',
  };

  const categoryProducts = useMemo(() => {
    return products.filter((p) => {
      if (p.category === slug) return true;
      if (slug === 'software' && (
        p.category === 'software' ||
        p.category === 'microsoft-office' ||
        p.category === 'antivirus-security' ||
        p.category === 'video-editing' ||
        p.category === 'design-productivity' ||
        p.category === 'development-tools'
      )) return true;
      return false;
    });
  }, [products, slug]);

  return (
    <div className="min-h-screen py-10 sm:py-14 bg-[#F5F5F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#77717E] mb-8">
          <Link href="/" className="hover:text-purple-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/products" className="hover:text-purple-600 transition-colors">
            Catalogue
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[#17151D] font-semibold capitalize">
            {currentMeta.title}
          </span>
        </nav>

        {/* Category Hero Banner */}
        <div className="rounded-3xl bg-white p-8 sm:p-12 border border-[#E8E5ED] relative overflow-hidden mb-12 shadow-[0_4px_20px_rgba(23,21,29,0.04)]">
          <div className="max-w-3xl relative z-10 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 border border-purple-200 px-3 py-1 rounded-full inline-block">
              {currentMeta.badge}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#17151D] tracking-tight font-display">
              {currentMeta.title}
            </h1>
            <p className="text-base sm:text-lg text-purple-600 font-semibold">
              {currentMeta.subtitle}
            </p>
            <p className="text-xs sm:text-sm text-[#77717E] leading-relaxed max-w-2xl pt-1">
              {currentMeta.description}
            </p>
          </div>
        </div>

        {/* Product Count Header */}
        <div className="flex items-center justify-between text-xs text-[#77717E] mb-6">
          <span>
            Showing <strong className="text-purple-600">{categoryProducts.length}</strong> verified products in this category
          </span>
          <Link href="/products" className="text-purple-600 hover:text-purple-700 font-semibold flex items-center gap-1">
            <span>View All Categories</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Products Grid */}
        {categoryProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E8E5ED] max-w-md mx-auto shadow-sm my-8">
            <AlertCircle className="w-12 h-12 text-purple-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#17151D] mb-1">No products currently in this category</h3>
            <p className="text-xs text-[#77717E] mb-6">
              New licenses are added daily. Check our main catalogue for available products.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-semibold hover:bg-purple-500 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Browse All Products</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
