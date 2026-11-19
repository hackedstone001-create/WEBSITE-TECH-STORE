'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  ShoppingBag,
  Heart,
  Search,
  User,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Sliders,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export const Navbar = () => {
  const pathname = usePathname();
  const {
    cart,
    wishlist,
    setIsCartOpen,
    setIsSearchOpen,
    user,
    logout,
    setRole,
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Center links strictly matching prompt:
  // Home, All Products, Windows, Software, AI Tools, Offers, About Us
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'All Products', href: '/products' },
    { name: 'Windows', href: '/category/windows-keys' },
    { name: 'Software', href: '/category/software' },
    { name: 'AI Tools', href: '/category/ai-tools' },
    { name: 'Offers', href: '/products?filter=offers' },
    { name: 'About Us', href: '/about' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#08080B]/95 backdrop-blur-md border-b border-purple-500/20 text-white shadow-[0_4px_25px_rgba(0,0,0,0.4)]'
          : 'bg-[#08080B]/85 backdrop-blur-sm border-b border-white/10 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left: Official Tech Store Logo Asset */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-11 h-11 rounded-xl bg-black border border-purple-500/30 overflow-hidden flex items-center justify-center p-0.5 shadow-[0_0_20px_rgba(129,56,245,0.35)] transition-all duration-300 group-hover:scale-105 group-hover:border-purple-400">
              <Image
                src="/brand/tech-store-logo.png"
                alt="Tech Store Logo"
                width={44}
                height={44}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight leading-none text-white">
                TECH <span className="text-purple-400 font-black">STORE</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest font-semibold mt-1 text-slate-400 group-hover:text-purple-300 transition-colors">
                YOUR TECH, OUR SOLUTION
              </span>
            </div>
          </Link>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all duration-150 ${
                    isActive
                      ? 'text-white bg-purple-600/30 border border-purple-500/40 shadow-[0_0_15px_rgba(129,56,245,0.25)] font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right: Search, Wishlist, Account, Shopping Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2"
              title="Search products (Cmd+K)"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
              <span className="hidden xl:inline text-[11px] px-2 py-0.5 rounded border text-slate-400 bg-white/5 border-white/10">
                ⌘K
              </span>
            </button>

            {/* Wishlist */}
            <Link
              href="/dashboard/wishlist"
              className="relative p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-all"
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-purple-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-[0_0_8px_rgba(129,56,245,0.6)]">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Shopping Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-all"
              title="Shopping Cart"
              aria-label="Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalCartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-purple-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-[0_0_8px_rgba(129,56,245,0.6)]">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Account Menu */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 py-1.5 px-3 rounded-xl border transition-all text-xs font-semibold bg-white/10 hover:bg-white/15 border-purple-500/30 text-white hover:border-purple-400"
              >
                <div className="w-6 h-6 rounded-lg bg-purple-600 flex items-center justify-center text-[11px] font-bold text-white shadow-sm">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className="hidden sm:inline max-w-[85px] truncate">
                  {user?.name || 'Account'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-[#111116] rounded-2xl shadow-2xl border border-purple-500/20 p-2 z-50 text-slate-200 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2 border-b border-white/10 mb-1">
                    <p className="text-[11px] text-slate-400 font-medium">Signed in as</p>
                    <p className="text-xs font-bold text-white truncate">
                      {user?.email || 'Guest User'}
                    </p>
                    <span className="inline-block mt-1 text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800/40">
                      {user?.role === 'admin' ? 'Administrator' : 'Customer Account'}
                    </span>
                  </div>

                  <Link
                    href="/dashboard"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-purple-600/20 rounded-lg transition-colors font-medium"
                  >
                    <User className="w-4 h-4 text-purple-400" />
                    Customer Dashboard
                  </Link>

                  <Link
                    href="/dashboard/orders"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-purple-600/20 rounded-lg transition-colors font-medium"
                  >
                    <ShoppingBag className="w-4 h-4 text-slate-400" />
                    My Licenses & Orders
                  </Link>

                  <Link
                    href="/admin"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs text-purple-300 hover:bg-purple-600/20 rounded-lg transition-colors font-semibold"
                  >
                    <Sliders className="w-4 h-4 text-purple-400" />
                    Admin Control Panel
                  </Link>

                  {/* Role toggle simulator */}
                  <div className="border-t border-white/10 my-1 pt-1">
                    <div className="px-3 py-1 text-[11px] text-slate-400 flex items-center justify-between">
                      <span>Role Mode:</span>
                      <div className="flex gap-1">
                        <button
                          onClick={() => setRole('customer')}
                          className={`px-1.5 py-0.5 text-[10px] rounded font-medium ${
                            user?.role === 'customer'
                              ? 'bg-purple-600 text-white font-bold'
                              : 'bg-white/10 text-slate-400 hover:bg-white/15'
                          }`}
                        >
                          User
                        </button>
                        <button
                          onClick={() => setRole('admin')}
                          className={`px-1.5 py-0.5 text-[10px] rounded font-medium ${
                            user?.role === 'admin'
                              ? 'bg-purple-600 text-white font-bold'
                              : 'bg-white/10 text-slate-400 hover:bg-white/15'
                          }`}
                        >
                          Admin
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      logout();
                      setUserDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 rounded-lg transition-colors text-left font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-2 pb-6 space-y-2 border-b border-purple-500/20 bg-[#08080B] text-white animate-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3.5 py-2.5 rounded-xl text-sm font-semibold ${
                pathname === link.href
                  ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(129,56,245,0.4)]'
                  : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold rounded-xl bg-white/5 text-slate-200"
            >
              <User className="w-4 h-4 text-purple-400" />
              Customer Dashboard
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold rounded-xl bg-purple-900/40 text-purple-300 border border-purple-500/30"
            >
              <Sliders className="w-4 h-4 text-purple-400" />
              Admin Control Panel
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
