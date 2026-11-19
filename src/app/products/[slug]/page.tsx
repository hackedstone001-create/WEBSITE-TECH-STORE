'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  Zap,
  ShoppingBag,
  ArrowRight,
  Heart,
  Laptop,
  CheckCircle2,
  Clock,
  Sparkles,
  HelpCircle,
  AlertCircle,
  FileText,
  Star,
  ChevronRight,
  Lock,
  MessageSquare,
  RefreshCw,
  Info,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { formatPrice } from '@/lib/utils';
import { ProductCard } from '@/components/product/ProductCard';
import { MOCK_REVIEWS } from '@/data/mockData';

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const { products, addToCart, toggleWishlist, isInWishlist, showToast } = useStore();
  const [activeTab, setActiveTab] = useState<'features' | 'activation' | 'specs' | 'reviews'>('features');
  const [selectedVariant, setSelectedVariant] = useState<string>('standard');
  const [isAdded, setIsAdded] = useState(false);

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20 bg-[#F5F5F7]">
        <div className="w-16 h-16 rounded-2xl bg-white border border-[#E8E5ED] shadow-sm flex items-center justify-center text-slate-400 mb-4">
          <AlertCircle className="w-8 h-8 text-purple-600" />
        </div>
        <h1 className="text-2xl font-bold text-[#17151D] mb-2 font-display">Product Not Found</h1>
        <p className="text-sm text-[#77717E] max-w-md mb-6">
          The requested license or product may have been relocated or updated in our catalog.
        </p>
        <Link
          href="/products"
          className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
        >
          Return to Catalogue
        </Link>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const productReviews = MOCK_REVIEWS.filter(
    (r) => r.productId === product.id
  );

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    showToast(`Added ${product.name} to cart`, 'success');
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleBuyNow = () => {
    addToCart(product, 1);
    router.push('/checkout');
  };

  const isSubscription = product.licenseDuration?.toLowerCase().includes('month') || product.licenseDuration?.toLowerCase().includes('year');

  return (
    <div className="min-h-screen py-10 sm:py-14 bg-[#F5F5F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-[#77717E] mb-8 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-purple-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/products" className="hover:text-purple-600 transition-colors">
            Store Catalogue
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link
            href={`/category/${product.category}`}
            className="hover:text-purple-600 transition-colors capitalize"
          >
            {product.categoryName}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[#17151D] font-semibold truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>

        {/* Main Product Presentation Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-16">
          {/* Left Visual Gallery & Specs */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[16/11] rounded-3xl overflow-hidden bg-[#111116] border border-[#E8E5ED] shadow-[0_8px_30px_rgba(23,21,29,0.06)] group">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

              {/* Floating Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                {product.badge && (
                  <span className="text-xs font-bold uppercase tracking-wider bg-[#08080B]/90 backdrop-blur-md text-purple-300 border border-purple-500/30 px-3 py-1 rounded-xl shadow-sm">
                    {product.badge}
                  </span>
                )}
                {product.discountPercent && product.discountPercent > 0 && (
                  <span className="text-xs font-bold bg-purple-600 text-white px-3 py-1 rounded-xl shadow-[0_0_12px_rgba(129,56,245,0.4)]">
                    Save {product.discountPercent}%
                  </span>
                )}
              </div>

              {/* Delivery method pill */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-[#E8E5ED] shadow-sm text-xs z-10">
                <div className="flex items-center gap-2 text-[#17151D] font-bold">
                  <Zap className="w-4 h-4 text-purple-600" />
                  <span>
                    {product.deliveryType === 'instant_automated'
                      ? 'Instant Key Vault Delivery (< 60s)'
                      : product.deliveryType === 'account_credential'
                      ? 'Managed Email Upgrade'
                      : 'Concierge Verification Dispatch'}
                  </span>
                </div>
                <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {product.inStock ? 'In Stock' : 'Pre-Order'}
                </span>
              </div>
            </div>

            {/* Device Compatibility Box */}
            <div className="p-5 rounded-2xl bg-white border border-[#E8E5ED] shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-[#77717E] block mb-2.5">
                Supported Platforms & Device Compatibility:
              </span>
              <div className="flex flex-wrap gap-2">
                {product.deviceCompatibility?.map((dev, i) => (
                  <span
                    key={i}
                    className="text-xs font-semibold text-[#17151D] bg-[#F5F5F7] border border-[#E8E5ED] px-3 py-1 rounded-xl flex items-center gap-1.5"
                  >
                    <Laptop className="w-3.5 h-3.5 text-purple-600" />
                    {dev}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Buy Box */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
                  {product.categoryName}
                </span>
                <span className="text-slate-300">•</span>
                <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-[#17151D]">{product.rating}</span>
                  <span className="text-[#77717E] font-normal">({product.reviewCount} customer reviews)</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#17151D] tracking-tight font-display">
                {product.name}
              </h1>

              <p className="text-sm sm:text-base text-[#77717E] font-medium mt-2 leading-relaxed">
                {product.tagline}
              </p>
            </div>

            {/* Price Box */}
            <div className="p-6 rounded-3xl bg-white border border-[#E8E5ED] shadow-sm space-y-4">
              <div className="flex items-baseline justify-between">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-black text-[#17151D] tracking-tight font-display">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-base text-[#77717E] line-through font-medium">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                {product.discountPercent && product.discountPercent > 0 && (
                  <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
                    Save {formatPrice(product.originalPrice! - product.price)}
                  </span>
                )}
              </div>

              {/* License Duration & Renewal Terms */}
              <div className="pt-3 border-t border-[#E8E5ED] space-y-2 text-xs">
                <div className="flex items-center justify-between text-[#77717E]">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5 text-purple-600" /> License Term:
                  </span>
                  <span className="font-bold text-[#17151D]">{product.licenseDuration}</span>
                </div>

                {isSubscription ? (
                  <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-200/80 text-[11px] text-purple-900 leading-relaxed flex items-start gap-2">
                    <Info className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Subscription Terms:</strong> Active for the selected duration with manual renewal option before expiration. No unnotified recurring card charges.
                    </span>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-200/80 text-[11px] text-purple-900 leading-relaxed flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Lifetime License:</strong> Permanent activation bound directly to your Microsoft or vendor account with lifetime reinstallation rights.
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className="py-4 px-6 rounded-2xl bg-white hover:bg-slate-100 border border-[#E8E5ED] text-[#17151D] font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4 text-purple-600" />
                  <span>{isAdded ? 'Added to Cart' : 'Add to Cart'}</span>
                </button>
                <button
                  onClick={handleBuyNow}
                  className="py-4 px-6 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(129,56,245,0.45)] hover:shadow-[0_0_35px_rgba(168,85,247,0.7)] transition-all active:scale-95"
                >
                  <span>Buy Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Wishlist toggle */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-full py-3 rounded-2xl border text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
                  isWishlisted
                    ? 'bg-red-50 border-red-200 text-red-600'
                    : 'bg-white border-[#E8E5ED] text-[#77717E] hover:bg-slate-50'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current text-red-500' : ''}`} />
                <span>{isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
              </button>
            </div>

            {/* Guarantees Strip */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#E8E5ED] text-center text-[11px] text-[#77717E]">
              <div className="p-2 rounded-xl bg-white border border-[#E8E5ED]">
                <Zap className="w-4 h-4 text-purple-600 mx-auto mb-1" />
                <span className="font-semibold text-[#17151D] block">Instant Vault</span>
                <span>Automated key</span>
              </div>
              <div className="p-2 rounded-xl bg-white border border-[#E8E5ED]">
                <ShieldCheck className="w-4 h-4 text-purple-600 mx-auto mb-1" />
                <span className="font-semibold text-[#17151D] block">100% Genuine</span>
                <span>Direct activation</span>
              </div>
              <div className="p-2 rounded-xl bg-white border border-[#E8E5ED]">
                <Lock className="w-4 h-4 text-purple-600 mx-auto mb-1" />
                <span className="font-semibold text-[#17151D] block">Secure Pay</span>
                <span>Razorpay 256-bit</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <div className="bg-white rounded-3xl border border-[#E8E5ED] shadow-sm overflow-hidden mb-16">
          {/* Tab Navigation */}
          <div className="flex border-b border-[#E8E5ED] overflow-x-auto bg-[#F5F5F7]">
            <button
              onClick={() => setActiveTab('features')}
              className={`px-6 py-4 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${
                activeTab === 'features'
                  ? 'border-purple-600 text-purple-600 bg-white'
                  : 'border-transparent text-[#77717E] hover:text-[#17151D]'
              }`}
            >
              Features & Description
            </button>
            <button
              onClick={() => setActiveTab('activation')}
              className={`px-6 py-4 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${
                activeTab === 'activation'
                  ? 'border-purple-600 text-purple-600 bg-white'
                  : 'border-transparent text-[#77717E] hover:text-[#17151D]'
              }`}
            >
              Activation Instructions
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`px-6 py-4 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${
                activeTab === 'specs'
                  ? 'border-purple-600 text-purple-600 bg-white'
                  : 'border-transparent text-[#77717E] hover:text-[#17151D]'
              }`}
            >
              What&apos;s Included & Specs
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-6 py-4 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${
                activeTab === 'reviews'
                  ? 'border-purple-600 text-purple-600 bg-white'
                  : 'border-transparent text-[#77717E] hover:text-[#17151D]'
              }`}
            >
              Customer Reviews ({productReviews.length})
            </button>
          </div>

          {/* Tab Content Panes */}
          <div className="p-6 sm:p-10">
            {activeTab === 'features' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-[#17151D] mb-3 font-display">Product Overview</h3>
                  <p className="text-sm text-[#77717E] leading-relaxed">
                    {product.fullDescription || product.description}
                  </p>
                </div>

                {product.features && product.features.length > 0 && (
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-[#17151D] mb-4">
                      Key Highlights & Capabilities:
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {product.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#17151D]">
                          <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'activation' && (
              <div className="space-y-6 max-w-2xl">
                <div>
                  <h3 className="text-lg font-bold text-[#17151D] mb-2 font-display">
                    Step-by-Step Activation Guide
                  </h3>
                  <p className="text-xs sm:text-sm text-[#77717E]">
                    Follow these verified steps to activate your digital software or subscription.
                  </p>
                </div>

                <div className="space-y-3.5">
                  {product.activationSteps?.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F5F5F7] border border-[#E8E5ED]">
                      <span className="w-6 h-6 rounded-lg bg-purple-600 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <p className="text-xs sm:text-sm text-[#17151D] leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 text-xs text-purple-900">
                  <strong>Need help?</strong> If you encounter any issue during setup, open a ticket from your dashboard or contact our WhatsApp support desk with your Order ID.
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-[#17151D] mb-3 font-display">What&apos;s Included in Your Purchase</h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#17151D]">
                    {product.whatsIncluded?.map((inc, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-purple-600" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-[#E8E5ED]">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[#17151D] mb-2">
                    Refund & Warranty Terms:
                  </h4>
                  <p className="text-xs text-[#77717E] leading-relaxed">
                    {product.refundPolicy || 'Guaranteed replacement or full refund within 48 hours if product key fails activation and cannot be resolved.'}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-[#17151D] font-display">Customer Feedback</h3>
                  <span className="text-xs text-[#77717E]">{productReviews.length} verified ratings</span>
                </div>

                {productReviews.length === 0 ? (
                  <p className="text-xs text-[#77717E]">
                    No reviews yet for this product. Be the first to review after purchase!
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {productReviews.map((rev) => (
                      <div key={rev.id} className="p-5 rounded-2xl bg-[#F5F5F7] border border-[#E8E5ED] space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-[#17151D]">{rev.authorName}</span>
                          <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" /> Verified
                          </span>
                        </div>
                        <div className="flex text-amber-400 text-xs">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                          ))}
                        </div>
                        <h5 className="font-bold text-xs text-[#17151D]">&quot;{rev.title}&quot;</h5>
                        <p className="text-xs text-[#77717E] italic">&quot;{rev.comment}&quot;</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-[#17151D] font-display">
              Related Digital Licenses & Software
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
