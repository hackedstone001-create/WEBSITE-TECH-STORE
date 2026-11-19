'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sliders,
  ShoppingBag,
  Package,
  Users,
  Tag,
  DollarSign,
  TrendingUp,
  Search,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  Clock,
  ShieldAlert,
  ArrowRight,
  Filter,
  Eye,
  Key,
  HelpCircle,
  Lock,
  Layers,
  Sparkles,
  Check,
  Settings,
  MessageSquare,
  Mail,
  BellRing,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { formatPrice, formatDate } from '@/lib/utils';
import { Product, Order, Coupon, ProductCategory, DeliveryType } from '@/types';
import { MOCK_COUPONS, MOCK_FAQS } from '@/data/mockData';

type AdminTab = 'overview' | 'products' | 'orders' | 'customers' | 'coupons' | 'settings' | 'faqs';

export default function AdminDashboardPage() {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    user,
    setRole,
    showToast,
    websiteSettings,
    updateAnnouncement,
    updateWebsiteSettings,
  } = useStore();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Filter & Search states
  const [productSearch, setProductSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<'all' | 'completed' | 'pending'>('all');

  // New product modal state
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdTagline, setNewProdTagline] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<ProductCategory>('windows-keys');
  const [newProdPrice, setNewProdPrice] = useState('1499');
  const [newProdOriginalPrice, setNewProdOriginalPrice] = useState('2499');
  const [newProdDuration, setNewProdDuration] = useState('Lifetime Retail Key');
  const [newProdDelivery, setNewProdDelivery] = useState<DeliveryType>('instant_automated');
  const [newProdImage, setNewProdImage] = useState('https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1200&q=80');
  const [newProdDesc, setNewProdDesc] = useState('');

  // Selected Order details modal
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Coupons state in admin
  const [coupons, setCoupons] = useState<Coupon[]>(MOCK_COUPONS);
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState('15');

  // CMS Settings local states
  const [announcementText, setAnnouncementText] = useState(websiteSettings?.announcement?.text || 'Upgrade Your Digital Experience — Explore Our Latest Offers');
  const [announcementLink, setAnnouncementLink] = useState(websiteSettings?.announcement?.link || '/products');
  const [announcementBadge, setAnnouncementBadge] = useState(websiteSettings?.announcement?.badge || 'LIMITED TIME');
  const [announcementEnabled, setAnnouncementEnabled] = useState(websiteSettings?.announcement?.enabled ?? true);
  const [whatsappNumber, setWhatsappNumber] = useState(websiteSettings?.whatsappNumber || '+919876543210');
  const [supportEmail, setSupportEmail] = useState(websiteSettings?.supportEmail || 'support@techstore.in');
  const [tagline, setTagline] = useState(websiteSettings?.tagline || 'YOUR TECH, OUR SOLUTION');

  // Authorization check
  const isAdmin = user?.role === 'admin';

  if (!isAdmin) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 py-20 bg-[#F5F5F7]">
        <div className="w-16 h-16 rounded-2xl bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center mb-4 shadow-sm">
          <Lock className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-[#17151D] mb-2 font-display">
          Administrator Access Required
        </h1>
        <p className="text-sm text-[#77717E] max-w-md mb-6 leading-relaxed">
          The Admin Control Panel is strictly protected. For evaluation and developer testing, you can toggle into the Administrator role with a single click.
        </p>
        <button
          onClick={() => {
            setRole('admin');
            showToast('Switched to Administrator role', 'success');
          }}
          className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(129,56,245,0.4)] transition-all"
        >
          Enable Admin Access (Demo Mode)
        </button>
      </div>
    );
  }

  // Analytics derivations
  const totalGrossRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const fulfilledOrdersCount = orders.filter((o) => o.paymentStatus === 'completed').length;
  const averageOrderValue = orders.length > 0 ? Math.round(totalGrossRevenue / orders.length) : 0;

  // Customers unique set
  const customersList = Array.from(
    new Set(orders.map((o) => o.email))
  ).map((email) => {
    const custOrders = orders.filter((o) => o.email === email);
    const lastOrder = custOrders[custOrders.length - 1];
    const totalSpent = custOrders.reduce((sum, o) => sum + o.total, 0);
    return {
      name: lastOrder.customerName,
      email,
      phone: lastOrder.phone,
      orderCount: custOrders.length,
      totalSpent,
      lastActive: lastOrder.createdAt,
    };
  });

  const handleSaveCMS = (e: React.FormEvent) => {
    e.preventDefault();
    updateAnnouncement({
      text: announcementText,
      link: announcementLink,
      badge: announcementBadge,
      enabled: announcementEnabled,
    });
    updateWebsiteSettings({
      whatsappNumber,
      supportEmail,
      tagline,
    });
    showToast('Website and Announcement CMS settings updated successfully!', 'success');
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim() || !newProdPrice) return;

    const priceNum = parseFloat(newProdPrice);
    const origPriceNum = parseFloat(newProdOriginalPrice) || priceNum * 1.3;

    addProduct({
      slug: newProdName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      name: newProdName,
      tagline: newProdTagline || 'Authentic digital product key',
      description: newProdDesc || 'Official software license with instant automated activation.',
      fullDescription: newProdDesc || 'Genuine activation license backed by Tech Store warranty.',
      category: newProdCategory,
      categoryName: newProdCategory.replace(/-/g, ' ').toUpperCase(),
      price: priceNum,
      originalPrice: origPriceNum,
      discountPercent: Math.round(((origPriceNum - priceNum) / origPriceNum) * 100),
      licenseDuration: newProdDuration,
      deliveryType: newProdDelivery,
      deviceCompatibility: ['Windows 11', 'Windows 10', 'macOS'],
      features: ['Genuine vendor server activation', 'Instant license generation', 'Lifetime support'],
      whatsIncluded: ['Digital license serial key', 'Official ISO download links', 'Step-by-step guide'],
      activationSteps: ['Copy the key', 'Open Settings -> Activation', 'Enter product key'],
      refundPolicy: 'Full refund within 48 hours if license fails verification.',
      rating: 5.0,
      reviewCount: 1,
      inStock: true,
      image: newProdImage,
    });

    setShowAddProductModal(false);
    setNewProdName('');
    setNewProdTagline('');
    setNewProdDesc('');
    showToast(`Product "${newProdName}" added successfully!`, 'success');
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim() || !newCouponDiscount) return;

    const newC: Coupon = {
      id: `coup-${Date.now()}`,
      code: newCouponCode.toUpperCase().trim(),
      description: `${newCouponDiscount}% Discount on entire digital order`,
      discountType: 'percentage',
      discountValue: parseFloat(newCouponDiscount),
      minOrderValue: 999,
      validUntil: '2026-12-31',
      isActive: true,
      usageCount: 0,
    };

    setCoupons([newC, ...coupons]);
    setNewCouponCode('');
    showToast(`Coupon ${newC.code} created!`, 'success');
  };

  return (
    <div className="min-h-screen py-10 sm:py-14 bg-[#F5F5F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Admin Header Banner */}
        <div className="rounded-3xl bg-white p-6 sm:p-8 border border-[#E8E5ED] mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 border border-purple-200 flex items-center justify-center text-xl font-bold shrink-0 shadow-sm">
              <Sliders className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-[#17151D] font-display">
                  Admin Control Panel
                </h1>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                  Superadmin Authorized
                </span>
              </div>
              <p className="text-xs text-[#77717E] mt-1">
                Manage digital catalog, announcements, Razorpay transactions, and license key inventories.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setRole('customer')}
              className="px-3.5 py-2 rounded-xl bg-[#F5F5F7] hover:bg-slate-200 text-xs font-semibold text-[#17151D] border border-[#E8E5ED] transition-colors"
            >
              Exit to Customer Mode
            </button>
            <button
              onClick={() => setShowAddProductModal(true)}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(129,56,245,0.35)] transition-all"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 border-b border-[#E8E5ED] pb-4 mb-8 overflow-x-auto scrollbar-none text-xs font-semibold">
          {[
            { id: 'overview', label: 'Sales Analytics', icon: TrendingUp },
            { id: 'products', label: `Products (${products.length})`, icon: Package },
            { id: 'orders', label: `Orders (${orders.length})`, icon: ShoppingBag },
            { id: 'customers', label: `Customers (${customersList.length})`, icon: Users },
            { id: 'coupons', label: `Coupons (${coupons.length})`, icon: Tag },
            { id: 'settings', label: 'Website CMS & Settings', icon: Settings },
            { id: 'faqs', label: 'FAQ Database', icon: HelpCircle },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(129,56,245,0.35)] font-bold'
                    : 'bg-white text-[#77717E] hover:text-[#17151D] hover:bg-purple-50 border border-[#E8E5ED]'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* 1. SALES ANALYTICS & OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-150">
            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-3xl bg-white border border-[#E8E5ED] shadow-sm">
                <span className="text-xs text-[#77717E] font-bold uppercase tracking-wider">Gross Revenue</span>
                <p className="text-2xl font-black font-display text-emerald-600 mt-1">
                  {formatPrice(totalGrossRevenue)}
                </p>
                <p className="text-[11px] text-[#77717E] mt-1">+18.4% this month</p>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-[#E8E5ED] shadow-sm">
                <span className="text-xs text-[#77717E] font-bold uppercase tracking-wider">Total Orders</span>
                <p className="text-2xl font-black font-display text-[#17151D] mt-1">
                  {orders.length}
                </p>
                <p className="text-[11px] text-purple-600 font-semibold mt-1">
                  {fulfilledOrdersCount} Fulfilled (100%)
                </p>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-[#E8E5ED] shadow-sm">
                <span className="text-xs text-[#77717E] font-bold uppercase tracking-wider">Average Order Value</span>
                <p className="text-2xl font-black font-display text-[#17151D] mt-1">
                  {formatPrice(averageOrderValue)}
                </p>
                <p className="text-[11px] text-[#77717E] mt-1">Digital items</p>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-[#E8E5ED] shadow-sm">
                <span className="text-xs text-[#77717E] font-bold uppercase tracking-wider">Active Products</span>
                <p className="text-2xl font-black font-display text-purple-600 mt-1">
                  {products.length}
                </p>
                <p className="text-[11px] text-[#77717E] mt-1">Across 8 categories</p>
              </div>
            </div>

            {/* Category Performance Matrix */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E5ED] shadow-sm space-y-4">
              <h3 className="text-base font-bold text-[#17151D] font-display">Category Distribution</h3>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
                {[
                  { cat: 'Windows Keys', count: products.filter((p) => p.category === 'windows-keys').length, share: '38%', color: 'bg-purple-600' },
                  { cat: 'AI Tools', count: products.filter((p) => p.category === 'ai-tools').length, share: '32%', color: 'bg-purple-500' },
                  { cat: 'Software Suites', count: products.filter((p) => p.category === 'software').length, share: '21%', color: 'bg-purple-400' },
                  { cat: 'Digital Products', count: products.filter((p) => p.category === 'digital-products').length, share: '9%', color: 'bg-emerald-600' },
                ].map((c, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-[#F5F5F7] border border-[#E8E5ED] space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-[#17151D]">{c.cat}</span>
                      <span className="font-mono text-[#77717E]">{c.share}</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                      <div className={`h-full ${c.color}`} style={{ width: c.share }} />
                    </div>
                    <span className="text-[10px] text-[#77717E]">{c.count} Active SKUs</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. PRODUCT MANAGEMENT TAB */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E5ED] shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <h3 className="text-base font-bold text-[#17151D] font-display">All Product SKUs ({products.length})</h3>
              <input
                type="text"
                placeholder="Search products..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="bg-[#F5F5F7] border border-[#E8E5ED] rounded-xl px-3.5 py-2 text-xs text-[#17151D] w-full sm:w-64 focus:outline-none focus:border-purple-600"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E8E5ED] text-[#77717E] uppercase tracking-wider text-[10px]">
                    <th className="pb-3 font-bold">Product</th>
                    <th className="pb-3 font-bold">Category</th>
                    <th className="pb-3 font-bold">Price</th>
                    <th className="pb-3 font-bold">Term</th>
                    <th className="pb-3 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E5ED]">
                  {products
                    .filter((p) => p.name.toLowerCase().includes(productSearch.toLowerCase()))
                    .map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50">
                        <td className="py-3 font-bold text-[#17151D] flex items-center gap-2">
                          <img src={p.image} alt={p.name} className="w-8 h-8 rounded-lg object-cover" />
                          <span>{p.name}</span>
                        </td>
                        <td className="py-3 text-[#77717E]">{p.categoryName}</td>
                        <td className="py-3 font-bold text-[#17151D]">{formatPrice(p.price)}</td>
                        <td className="py-3 text-[#77717E]">{p.licenseDuration}</td>
                        <td className="py-3 text-right">
                          <button
                            onClick={() => {
                              deleteProduct(p.id);
                              showToast(`Deleted ${p.name}`, 'info');
                            }}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                            title="Delete SKU"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. ORDER MANAGEMENT TAB */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E5ED] shadow-sm space-y-6">
            <h3 className="text-base font-bold text-[#17151D] font-display">Customer Orders ({orders.length})</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E8E5ED] text-[#77717E] uppercase tracking-wider text-[10px]">
                    <th className="pb-3 font-bold">Order ID</th>
                    <th className="pb-3 font-bold">Customer</th>
                    <th className="pb-3 font-bold">Date</th>
                    <th className="pb-3 font-bold">Amount</th>
                    <th className="pb-3 font-bold">Status</th>
                    <th className="pb-3 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E5ED]">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-slate-50">
                      <td className="py-3 font-mono font-bold text-purple-600">{o.orderNumber}</td>
                      <td className="py-3 text-[#17151D] font-medium">{o.customerName}</td>
                      <td className="py-3 text-[#77717E]">{formatDate(o.createdAt)}</td>
                      <td className="py-3 font-bold text-[#17151D]">{formatPrice(o.total)}</td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-emerald-50 text-emerald-700">
                          {o.paymentStatus}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => setSelectedOrder(o)}
                          className="px-3 py-1 rounded-lg bg-[#F5F5F7] hover:bg-purple-50 text-purple-600 font-semibold"
                        >
                          Inspect Keys
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. CUSTOMERS TAB */}
        {activeTab === 'customers' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E5ED] shadow-sm space-y-6">
            <h3 className="text-base font-bold text-[#17151D] font-display">Customer Profiles ({customersList.length})</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E8E5ED] text-[#77717E] uppercase tracking-wider text-[10px]">
                    <th className="pb-3 font-bold">Customer</th>
                    <th className="pb-3 font-bold">Email</th>
                    <th className="pb-3 font-bold">Phone</th>
                    <th className="pb-3 font-bold">Orders</th>
                    <th className="pb-3 font-bold">Total Spent</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E5ED]">
                  {customersList.map((c, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="py-3 font-bold text-[#17151D]">{c.name}</td>
                      <td className="py-3 text-[#77717E]">{c.email}</td>
                      <td className="py-3 text-[#77717E]">{c.phone}</td>
                      <td className="py-3 font-semibold text-purple-600">{c.orderCount}</td>
                      <td className="py-3 font-bold text-[#17151D]">{formatPrice(c.totalSpent)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 5. COUPONS TAB */}
        {activeTab === 'coupons' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E5ED] shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h3 className="text-base font-bold text-[#17151D] font-display">Manage Promo Coupons</h3>
              <form onSubmit={handleCreateCoupon} className="flex gap-2 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="CODE (e.g. FLASH30)"
                  value={newCouponCode}
                  onChange={(e) => setNewCouponCode(e.target.value.toUpperCase())}
                  className="bg-[#F5F5F7] border border-[#E8E5ED] rounded-xl px-3 py-1.5 text-xs text-[#17151D] uppercase font-mono"
                />
                <input
                  type="number"
                  placeholder="% Off"
                  value={newCouponDiscount}
                  onChange={(e) => setNewCouponDiscount(e.target.value)}
                  className="w-16 bg-[#F5F5F7] border border-[#E8E5ED] rounded-xl px-2 py-1.5 text-xs text-[#17151D]"
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-purple-600 text-white text-xs font-semibold hover:bg-purple-500"
                >
                  Create
                </button>
              </form>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {coupons.map((c) => (
                <div key={c.id} className="p-4 rounded-2xl bg-[#F5F5F7] border border-[#E8E5ED] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-sm text-purple-600">{c.code}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-purple-100 text-purple-700">
                      {c.discountValue}% OFF
                    </span>
                  </div>
                  <p className="text-xs text-[#77717E]">{c.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. WEBSITE CMS & SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E5ED] shadow-sm space-y-6 max-w-2xl">
            <h3 className="text-base font-bold text-[#17151D] font-display">Website Settings & Announcement CMS</h3>
            <form onSubmit={handleSaveCMS} className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-purple-900 text-sm">Announcement Bar (Section A)</span>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={announcementEnabled}
                      onChange={(e) => setAnnouncementEnabled(e.target.checked)}
                      className="accent-purple-600 w-4 h-4 cursor-pointer"
                    />
                    <span className="font-semibold text-purple-900">Show on Site</span>
                  </label>
                </div>

                <div>
                  <label className="block text-[#17151D] font-semibold mb-1">Announcement Text</label>
                  <input
                    type="text"
                    value={announcementText}
                    onChange={(e) => setAnnouncementText(e.target.value)}
                    className="w-full bg-white border border-[#E8E5ED] rounded-xl p-2.5 text-xs text-[#17151D]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#17151D] font-semibold mb-1">Badge Text</label>
                    <input
                      type="text"
                      value={announcementBadge}
                      onChange={(e) => setAnnouncementBadge(e.target.value)}
                      className="w-full bg-white border border-[#E8E5ED] rounded-xl p-2.5 text-xs text-[#17151D]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#17151D] font-semibold mb-1">Destination URL</label>
                    <input
                      type="text"
                      value={announcementLink}
                      onChange={(e) => setAnnouncementLink(e.target.value)}
                      className="w-full bg-white border border-[#E8E5ED] rounded-xl p-2.5 text-xs text-[#17151D]"
                    />
                  </div>
                </div>
              </div>

              {/* Business Settings */}
              <div className="space-y-3 pt-2">
                <span className="font-bold text-[#17151D] text-sm block">Business Contact & Identity</span>

                <div>
                  <label className="block text-[#17151D] font-semibold mb-1">Official Tagline</label>
                  <input
                    type="text"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    className="w-full bg-[#F5F5F7] border border-[#E8E5ED] rounded-xl p-2.5 text-xs text-[#17151D]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#17151D] font-semibold mb-1">WhatsApp Concierge Number</label>
                    <input
                      type="text"
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      className="w-full bg-[#F5F5F7] border border-[#E8E5ED] rounded-xl p-2.5 text-xs text-[#17151D]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#17151D] font-semibold mb-1">Support Email</label>
                    <input
                      type="email"
                      value={supportEmail}
                      onChange={(e) => setSupportEmail(e.target.value)}
                      className="w-full bg-[#F5F5F7] border border-[#E8E5ED] rounded-xl p-2.5 text-xs text-[#17151D]"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase"
                >
                  Save CMS Settings
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 7. FAQ DATABASE TAB */}
        {activeTab === 'faqs' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E5ED] shadow-sm space-y-4">
            <h3 className="text-base font-bold text-[#17151D] font-display">FAQ Database Entries ({MOCK_FAQS.length})</h3>
            <div className="space-y-3">
              {MOCK_FAQS.map((faq) => (
                <div key={faq.id} className="p-4 rounded-2xl bg-[#F5F5F7] border border-[#E8E5ED] space-y-1 text-xs">
                  <span className="text-[10px] font-bold uppercase text-purple-600">{faq.category}</span>
                  <p className="font-bold text-[#17151D]">{faq.question}</p>
                  <p className="text-[#77717E]">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white max-w-lg w-full rounded-3xl p-6 sm:p-8 border border-[#E8E5ED] shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-[#17151D] mb-4 font-display">Add Digital Product SKU</h3>
            <form onSubmit={handleCreateProduct} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-[#17151D] mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Windows 11 Enterprise"
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  className="w-full bg-[#F5F5F7] border border-[#E8E5ED] rounded-xl p-2.5 text-xs text-[#17151D]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#17151D] mb-1">Category</label>
                <select
                  value={newProdCategory}
                  onChange={(e: any) => setNewProdCategory(e.target.value)}
                  className="w-full bg-[#F5F5F7] border border-[#E8E5ED] rounded-xl p-2.5 text-xs text-[#17151D]"
                >
                  <option value="windows-keys">Windows Keys</option>
                  <option value="microsoft-office">Microsoft Office</option>
                  <option value="antivirus-security">Antivirus & Security</option>
                  <option value="ai-tools">AI Tools</option>
                  <option value="video-editing">Video Editing Software</option>
                  <option value="design-productivity">Design & Productivity</option>
                  <option value="development-tools">Development Tools</option>
                  <option value="digital-products">Digital Products</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#17151D] mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(e.target.value)}
                    className="w-full bg-[#F5F5F7] border border-[#E8E5ED] rounded-xl p-2.5 text-xs text-[#17151D]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#17151D] mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    value={newProdOriginalPrice}
                    onChange={(e) => setNewProdOriginalPrice(e.target.value)}
                    className="w-full bg-[#F5F5F7] border border-[#E8E5ED] rounded-xl p-2.5 text-xs text-[#17151D]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#17151D] mb-1">License Term</label>
                <input
                  type="text"
                  value={newProdDuration}
                  onChange={(e) => setNewProdDuration(e.target.value)}
                  className="w-full bg-[#F5F5F7] border border-[#E8E5ED] rounded-xl p-2.5 text-xs text-[#17151D]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#17151D] mb-1">Delivery Protocol</label>
                <select
                  value={newProdDelivery}
                  onChange={(e: any) => setNewProdDelivery(e.target.value)}
                  className="w-full bg-[#F5F5F7] border border-[#E8E5ED] rounded-xl p-2.5 text-xs text-[#17151D]"
                >
                  <option value="instant_automated">Instant Automated Key</option>
                  <option value="account_credential">Account Credential Upgrade</option>
                  <option value="manual_activation">Manual Activation Support</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#17151D] mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={newProdDesc}
                  onChange={(e) => setNewProdDesc(e.target.value)}
                  className="w-full bg-[#F5F5F7] border border-[#E8E5ED] rounded-xl p-2.5 text-xs text-[#17151D]"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase"
                >
                  Publish Product
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="px-5 py-3 rounded-xl bg-[#F5F5F7] text-[#77717E] font-semibold text-xs"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Inspect Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white max-w-lg w-full rounded-3xl p-6 sm:p-8 border border-[#E8E5ED] shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#17151D] font-display">
                  Order Details: #{selectedOrder.orderNumber}
                </h3>
                <p className="text-xs text-[#77717E]">{selectedOrder.customerName} ({selectedOrder.email})</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-xs text-slate-400 hover:text-[#17151D] p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 pt-2 border-t border-[#E8E5ED]">
              {selectedOrder.items.map((item, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-[#F5F5F7] border border-[#E8E5ED] text-xs">
                  <p className="font-bold text-[#17151D]">{item.productName}</p>
                  <p className="text-[10px] text-purple-600 font-semibold">Term: {item.licenseDuration}</p>
                  {item.licenseKey && (
                    <div className="mt-2 p-2.5 rounded-xl bg-[#08080B] font-mono text-purple-300 text-xs select-all">
                      KEY: {item.licenseKey}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-2 text-xs text-[#77717E] border-t border-[#E8E5ED] space-y-1">
              <p>Payment ID: <span className="font-mono text-[#17151D]">{selectedOrder.razorpayPaymentId || 'Verified'}</span></p>
              <p>Payment Status: <span className="text-emerald-700 font-bold">{selectedOrder.paymentStatus}</span></p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-full py-2.5 rounded-xl bg-[#F5F5F7] text-[#17151D] text-xs font-semibold hover:bg-slate-200 transition-colors"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
