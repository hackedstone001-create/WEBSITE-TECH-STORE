'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  User,
  ShoppingBag,
  Key,
  Download,
  BookOpen,
  Heart,
  Headphones,
  Settings,
  LogOut,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Plus,
  Send,
  Sparkles,
  Layers,
  FileText,
  Printer,
  Calendar,
  CreditCard,
  Zap,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { formatPrice, formatDate } from '@/lib/utils';
import { ProductCard } from '@/components/product/ProductCard';

type DashboardTab =
  | 'overview'
  | 'orders'
  | 'products'
  | 'licenses'
  | 'subscriptions'
  | 'downloads'
  | 'invoices'
  | 'wishlist'
  | 'support'
  | 'profile';

export default function CustomerDashboardPage() {
  const {
    user,
    logout,
    orders,
    wishlist,
    products,
    supportTickets,
    createSupportTicket,
    showToast,
  } = useStore();

  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // New ticket state
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState<'activation' | 'billing' | 'download' | 'general'>('activation');
  const [ticketMessage, setTicketMessage] = useState('');

  // Profile edit state
  const [profileName, setProfileName] = useState(user?.name || 'Yash Vardhan');
  const [profilePhone, setProfilePhone] = useState(user?.phone || '+91 98765 43210');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(text);
    showToast('Key copied to clipboard!', 'success');
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketMessage.trim()) return;

    createSupportTicket(
      {
        customerName: user?.name || 'Customer',
        customerEmail: user?.email || 'customer@example.com',
        subject: ticketSubject,
        category: ticketCategory,
        priority: 'medium',
      },
      ticketMessage
    );

    setShowNewTicketModal(false);
    setTicketSubject('');
    setTicketMessage('');
    setActiveTab('support');
  };

  // Collect all purchased items across orders
  const allPurchasedItems = orders.flatMap((o) =>
    o.items.map((item) => ({
      ...item,
      orderNumber: o.orderNumber,
      orderDate: o.createdAt,
      orderId: o.id,
      paymentMethod: o.paymentMethod,
    }))
  );

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  // Filter subscriptions
  const subscriptionItems = allPurchasedItems.filter(
    (i) => i.licenseDuration.toLowerCase().includes('month') || i.licenseDuration.toLowerCase().includes('year')
  );

  return (
    <div className="min-h-screen py-10 sm:py-14 bg-[#F5F5F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* User Hero Banner */}
        <div className="rounded-3xl bg-white p-6 sm:p-8 border border-[#E8E5ED] mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-purple-600 text-white flex items-center justify-center text-xl font-bold shrink-0 shadow-[0_0_20px_rgba(129,56,245,0.4)]">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-[#17151D] font-display">
                  {user?.name || 'Customer Dashboard'}
                </h1>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                  Verified Member
                </span>
              </div>
              <p className="text-xs text-[#77717E] mt-1">
                {user?.email || 'customer@example.com'} • {orders.length} Orders Placed
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowNewTicketModal(true)}
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-2 shadow-[0_0_15px_rgba(129,56,245,0.35)] transition-all"
            >
              <Headphones className="w-4 h-4" />
              New Support Ticket
            </button>
            <button
              onClick={logout}
              className="px-3.5 py-2.5 rounded-xl bg-[#F5F5F7] hover:bg-slate-200 text-[#17151D] border border-[#E8E5ED] text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Dashboard Main Grid: Sidebar + Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 10 Navigation Sections Sidebar */}
          <div className="lg:col-span-3 bg-white rounded-3xl p-3 border border-[#E8E5ED] shadow-sm space-y-1">
            {[
              { id: 'overview', label: 'Overview', icon: Layers },
              { id: 'orders', label: 'My Orders', icon: ShoppingBag, count: orders.length },
              { id: 'products', label: 'My Products', icon: ShieldCheck, count: allPurchasedItems.length },
              { id: 'licenses', label: 'License Keys', icon: Key, count: allPurchasedItems.filter((i) => i.licenseKey).length },
              { id: 'subscriptions', label: 'Subscriptions', icon: Calendar, count: subscriptionItems.length },
              { id: 'downloads', label: 'Downloads', icon: Download },
              { id: 'invoices', label: 'Invoices', icon: FileText, count: orders.length },
              { id: 'wishlist', label: 'Wishlist', icon: Heart, count: wishlist.length },
              { id: 'support', label: 'Support Tickets', icon: Headphones, count: supportTickets.length },
              { id: 'profile', label: 'Profile Settings', icon: Settings },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as DashboardTab)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(129,56,245,0.35)] font-bold'
                      : 'text-[#77717E] hover:text-[#17151D] hover:bg-purple-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && item.count > 0 && (
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-[#F5F5F7] text-purple-700 font-bold border border-[#E8E5ED]'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-9 space-y-6">
            {/* 1. OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-6 animate-in fade-in duration-150">
                {/* Metric Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-5 rounded-3xl bg-white border border-[#E8E5ED] shadow-sm">
                    <p className="text-xs text-[#77717E] uppercase font-bold tracking-wider">Total Orders</p>
                    <p className="text-2xl font-black font-display text-[#17151D] mt-1">
                      {orders.length}
                    </p>
                    <p className="text-[11px] text-emerald-600 font-semibold mt-1">100% Verified</p>
                  </div>

                  <div className="p-5 rounded-3xl bg-white border border-[#E8E5ED] shadow-sm">
                    <p className="text-xs text-[#77717E] uppercase font-bold tracking-wider">Active Keys</p>
                    <p className="text-2xl font-black font-display text-purple-600 mt-1">
                      {allPurchasedItems.filter((i) => i.licenseKey).length}
                    </p>
                    <p className="text-[11px] text-[#77717E] mt-1">Permanent Retail/OEM</p>
                  </div>

                  <div className="p-5 rounded-3xl bg-white border border-[#E8E5ED] shadow-sm">
                    <p className="text-xs text-[#77717E] uppercase font-bold tracking-wider">Subscriptions</p>
                    <p className="text-2xl font-black font-display text-[#17151D] mt-1">
                      {subscriptionItems.length}
                    </p>
                    <p className="text-[11px] text-[#77717E] mt-1">Frontier AI & Cloud</p>
                  </div>
                </div>

                {/* Recent Orders Overview */}
                <div className="bg-white rounded-3xl p-6 border border-[#E8E5ED] shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-[#17151D] font-display">Recent Orders</h3>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-xs font-semibold text-purple-600 hover:underline"
                    >
                      View All
                    </button>
                  </div>

                  <div className="space-y-3">
                    {orders.slice(0, 3).map((o) => (
                      <div
                        key={o.id}
                        className="p-4 rounded-2xl bg-[#F5F5F7] border border-[#E8E5ED] flex items-center justify-between gap-4 text-xs"
                      >
                        <div>
                          <p className="font-bold text-[#17151D] font-mono">{o.orderNumber}</p>
                          <p className="text-[#77717E] text-[11px]">{formatDate(o.createdAt)} • {o.items.length} item(s)</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-[#17151D] font-display">{formatPrice(o.total)}</p>
                          <Link
                            href={`/orders/${o.id}`}
                            className="text-[11px] text-purple-600 font-semibold hover:underline"
                          >
                            View Order & Keys →
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 2. MY ORDERS TAB */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E5ED] shadow-sm space-y-6">
                <h3 className="text-lg font-bold text-[#17151D] font-display">My Orders History</h3>
                <div className="space-y-4">
                  {orders.map((o) => (
                    <div
                      key={o.id}
                      className="p-5 rounded-2xl bg-[#F5F5F7] border border-[#E8E5ED] space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8E5ED] pb-3 text-xs">
                        <div>
                          <span className="font-mono font-bold text-[#17151D] text-sm">#{o.orderNumber}</span>
                          <span className="text-[#77717E] ml-2">• {formatDate(o.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {o.paymentStatus}
                          </span>
                          <span className="font-bold text-sm text-[#17151D] font-display">{formatPrice(o.total)}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {o.items.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-[#17151D]">{item.productName} ({item.licenseDuration})</span>
                            <span className="text-[#77717E]">Qty: {item.quantity}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 flex items-center justify-between text-xs">
                        <Link
                          href={`/orders/${o.id}`}
                          className="px-3.5 py-1.5 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-500 transition-colors"
                        >
                          View License Keys
                        </Link>
                        <button
                          onClick={() => window.print()}
                          className="text-[#77717E] hover:text-[#17151D] flex items-center gap-1 text-[11px]"
                        >
                          <Printer className="w-3.5 h-3.5" /> Print Receipt
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. MY PRODUCTS TAB */}
            {activeTab === 'products' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E5ED] shadow-sm space-y-6">
                <h3 className="text-lg font-bold text-[#17151D] font-display">My Purchased Products</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {allPurchasedItems.map((item, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-[#F5F5F7] border border-[#E8E5ED] space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
                        {item.licenseDuration}
                      </span>
                      <h4 className="font-bold text-sm text-[#17151D]">{item.productName}</h4>
                      <p className="text-xs text-[#77717E]">Purchased under Order #{item.orderNumber}</p>
                      {item.downloadLink && (
                        <a
                          href={item.downloadLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-600 hover:underline pt-1"
                        >
                          <Download className="w-3.5 h-3.5" /> Download Software
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. LICENSE KEYS VAULT TAB */}
            {activeTab === 'licenses' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E5ED] shadow-sm space-y-6">
                <h3 className="text-lg font-bold text-[#17151D] font-display">Delivered License Keys Vault</h3>
                <div className="space-y-4">
                  {allPurchasedItems.filter((i) => i.licenseKey).map((item, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-[#F5F5F7] border border-[#E8E5ED] space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[#17151D]">{item.productName}</span>
                        <span className="text-purple-600 font-semibold">{item.licenseDuration}</span>
                      </div>
                      <div className="p-3.5 rounded-xl bg-[#08080B] text-white flex items-center justify-between gap-3">
                        <span className="font-mono text-sm font-bold text-purple-300 tracking-wider truncate">
                          {item.licenseKey}
                        </span>
                        <button
                          onClick={() => copyToClipboard(item.licenseKey!)}
                          className="px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1"
                        >
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. SUBSCRIPTIONS TAB */}
            {activeTab === 'subscriptions' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E5ED] shadow-sm space-y-6">
                <h3 className="text-lg font-bold text-[#17151D] font-display">Active Subscriptions</h3>
                {subscriptionItems.length === 0 ? (
                  <p className="text-xs text-[#77717E]">No active subscriptions found.</p>
                ) : (
                  <div className="space-y-4">
                    {subscriptionItems.map((sub, idx) => (
                      <div key={idx} className="p-5 rounded-2xl bg-[#F5F5F7] border border-[#E8E5ED] flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-sm text-[#17151D]">{sub.productName}</h4>
                          <p className="text-xs text-[#77717E] mt-0.5">Term: {sub.licenseDuration} • Status: Active</p>
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Active
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 6. DOWNLOADS TAB */}
            {activeTab === 'downloads' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E5ED] shadow-sm space-y-6">
                <h3 className="text-lg font-bold text-[#17151D] font-display">Software Downloads</h3>
                <div className="space-y-3">
                  {allPurchasedItems.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-[#F5F5F7] border border-[#E8E5ED] flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-[#17151D]">{item.productName}</p>
                        <p className="text-[#77717E]">{item.downloadLink ? 'Official installer verified' : 'Cloud / Web Activated'}</p>
                      </div>
                      {item.downloadLink ? (
                        <a
                          href={item.downloadLink}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-500 flex items-center gap-1.5"
                        >
                          <Download className="w-3.5 h-3.5" /> Download
                        </a>
                      ) : (
                        <span className="text-[#77717E] font-medium">Web Provision</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. INVOICES TAB */}
            {activeTab === 'invoices' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E5ED] shadow-sm space-y-6">
                <h3 className="text-lg font-bold text-[#17151D] font-display">Official Tax Invoices</h3>
                <div className="space-y-3">
                  {orders.map((o) => (
                    <div key={o.id} className="p-4 rounded-2xl bg-[#F5F5F7] border border-[#E8E5ED] flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-[#17151D]">Invoice #{o.orderNumber}</p>
                        <p className="text-[#77717E]">{formatDate(o.createdAt)} • Total: {formatPrice(o.total)}</p>
                      </div>
                      <Link
                        href={`/orders/${o.id}`}
                        className="px-4 py-2 rounded-xl bg-white border border-[#E8E5ED] text-[#17151D] hover:text-purple-600 font-semibold flex items-center gap-1.5"
                      >
                        <FileText className="w-3.5 h-3.5 text-purple-600" /> View Invoice
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 8. WISHLIST TAB */}
            {activeTab === 'wishlist' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E5ED] shadow-sm space-y-6">
                <h3 className="text-lg font-bold text-[#17151D] font-display">My Wishlist</h3>
                {wishlistedProducts.length === 0 ? (
                  <p className="text-xs text-[#77717E]">Your wishlist is currently empty.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistedProducts.map((p) => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 9. SUPPORT TICKETS TAB */}
            {activeTab === 'support' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E5ED] shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-[#17151D] font-display">Support Tickets Desk</h3>
                  <button
                    onClick={() => setShowNewTicketModal(true)}
                    className="px-3.5 py-1.5 rounded-xl bg-purple-600 text-white text-xs font-semibold hover:bg-purple-500"
                  >
                    + Create Ticket
                  </button>
                </div>

                <div className="space-y-4">
                  {supportTickets.map((t) => (
                    <div key={t.id} className="p-5 rounded-2xl bg-[#F5F5F7] border border-[#E8E5ED] space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[#17151D]">{t.subject}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-purple-100 text-purple-700">
                          {t.status}
                        </span>
                      </div>
                      <p className="text-xs text-[#77717E]">{t.messages?.[0]?.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 10. PROFILE SETTINGS TAB */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E5ED] shadow-sm space-y-6 max-w-xl">
                <h3 className="text-lg font-bold text-[#17151D] font-display">Profile & Account Settings</h3>
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold text-[#17151D] mb-1">Full Name</label>
                    <input
                      type="text"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="w-full bg-[#F5F5F7] border border-[#E8E5ED] rounded-xl p-3 text-sm text-[#17151D]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#17151D] mb-1">Email Address</label>
                    <input
                      type="email"
                      disabled
                      value={user?.email || 'customer@example.com'}
                      className="w-full bg-slate-100 border border-[#E8E5ED] rounded-xl p-3 text-sm text-slate-500 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#17151D] mb-1">WhatsApp / Phone</label>
                    <input
                      type="text"
                      value={profilePhone}
                      onChange={(e) => setProfilePhone(e.target.value)}
                      className="w-full bg-[#F5F5F7] border border-[#E8E5ED] rounded-xl p-3 text-sm text-[#17151D]"
                    />
                  </div>
                  <button
                    onClick={() => showToast('Profile settings saved successfully', 'success')}
                    className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* New Support Ticket Modal */}
      {showNewTicketModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-[#E8E5ED]">
            <h3 className="text-lg font-bold text-[#17151D] mb-4 font-display">Open Support Ticket</h3>
            <form onSubmit={handleCreateTicket} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#17151D] mb-1">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Windows Activation error code 0x800..."
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  className="w-full bg-[#F5F5F7] border border-[#E8E5ED] rounded-xl p-3 text-sm text-[#17151D]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#17151D] mb-1">Category</label>
                <select
                  value={ticketCategory}
                  onChange={(e: any) => setTicketCategory(e.target.value)}
                  className="w-full bg-[#F5F5F7] border border-[#E8E5ED] rounded-xl p-3 text-sm text-[#17151D]"
                >
                  <option value="activation">Activation & License Help</option>
                  <option value="download">Download / ISO Link Issue</option>
                  <option value="billing">Billing & Invoices</option>
                  <option value="general">General Inquiries</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#17151D] mb-1">Detailed Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your issue with exact details or error codes..."
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  className="w-full bg-[#F5F5F7] border border-[#E8E5ED] rounded-xl p-3 text-sm text-[#17151D]"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase"
                >
                  Submit Ticket
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewTicketModal(false)}
                  className="px-5 py-3 rounded-xl bg-[#F5F5F7] text-[#77717E] font-semibold text-xs"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
