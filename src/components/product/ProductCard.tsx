'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Check, Zap, Star, ArrowRight, Eye, ShieldCheck } from 'lucide-react';
import { Product } from '@/types';
import { useStore } from '@/context/StoreContext';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, compact = false }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [isAdded, setIsAdded] = useState(false);
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div className="group relative bg-white rounded-3xl border border-[#E8E5ED] hover:border-purple-300 shadow-[0_4px_16px_-4px_rgba(23,21,29,0.04)] hover:shadow-[0_20px_35px_-10px_rgba(129,56,245,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* Product Artwork Container */}
      <div className="relative w-full aspect-[16/10] bg-[#111116] border-b border-[#E8E5ED] overflow-hidden">
        <Link href={`/products/${product.slug}`} className="block w-full h-full relative">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
        </Link>

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start pointer-events-none z-10">
          {product.badge && (
            <span className="text-[10px] font-bold tracking-wider uppercase bg-[#08080B]/90 backdrop-blur-md text-purple-300 border border-purple-500/30 px-2.5 py-0.5 rounded-full shadow-sm">
              {product.badge}
            </span>
          )}
          {product.discountPercent && product.discountPercent > 0 && (
            <span className="text-[10px] font-bold bg-purple-600 text-white px-2 py-0.5 rounded-full shadow-[0_0_10px_rgba(129,56,245,0.4)]">
              {product.discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-200 shadow-sm z-10 ${
            isWishlisted
              ? 'bg-red-50 text-red-600 border border-red-200'
              : 'bg-white/90 text-slate-400 hover:text-purple-600 hover:bg-white border border-slate-200/80'
          }`}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          aria-label="Wishlist"
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current text-red-500' : ''}`} />
        </button>

        {/* License Duration Overlay */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-900 bg-white/95 backdrop-blur-md px-2 py-0.5 rounded-md border border-slate-200/80 shadow-sm">
            <Zap className="w-3 h-3 text-purple-600" />
            {product.licenseDuration}
          </span>
          <span className="text-[10px] font-semibold text-purple-700 bg-purple-50 backdrop-blur-md px-2 py-0.5 rounded-md border border-purple-200 shadow-sm">
            {product.deliveryType === 'instant_automated' ? 'Instant Vault' : 'Official Key'}
          </span>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-purple-600 uppercase tracking-wider text-[11px]">
              {product.categoryName}
            </span>
            <div className="flex items-center gap-1 text-[11px] font-medium text-[#77717E]">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-[#17151D]">{product.rating}</span>
              <span className="text-slate-400">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <Link
            href={`/products/${product.slug}`}
            className="block text-[#17151D] group-hover:text-purple-600 font-bold text-base leading-snug line-clamp-1 transition-colors"
          >
            {product.name}
          </Link>

          {/* Short description */}
          <p className="text-xs text-[#77717E] line-clamp-2 leading-relaxed mt-1.5 mb-3">
            {product.description}
          </p>

          {/* Device Compatibility Chips */}
          {product.deviceCompatibility && product.deviceCompatibility.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {product.deviceCompatibility.slice(0, 3).map((device) => (
                <span
                  key={device}
                  className="text-[10px] font-medium text-[#77717E] bg-[#F5F5F7] px-2 py-0.5 rounded-md border border-[#E8E5ED]"
                >
                  {device}
                </span>
              ))}
              {product.deviceCompatibility.length > 3 && (
                <span className="text-[10px] text-slate-400 px-1 py-0.5">
                  +{product.deviceCompatibility.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Bottom Price & Dual Actions (View Details & Add to Cart) */}
        <div className="pt-3 border-t border-[#E8E5ED] space-y-3">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-extrabold text-[#17151D] tracking-tight font-display">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-[#77717E] line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[10px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              In Stock
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              href={`/products/${product.slug}`}
              className="py-2.5 px-3 rounded-xl border border-[#E8E5ED] hover:border-purple-300 text-xs font-semibold text-[#17151D] hover:text-purple-600 hover:bg-purple-50 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-[#77717E]" />
              <span>Details</span>
            </Link>

            <button
              onClick={handleAddToCart}
              className={`py-2.5 px-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-all duration-200 active:scale-95 shadow-sm ${
                isAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_12px_rgba(129,56,245,0.35)]'
              }`}
              title="Add to shopping cart"
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
