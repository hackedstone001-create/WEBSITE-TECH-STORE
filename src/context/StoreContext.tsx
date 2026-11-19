'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, Order, Coupon, SupportTicket, Review, WebsiteSettings, AnnouncementSettings } from '@/types';
import { MOCK_PRODUCTS, MOCK_COUPONS, INITIAL_ORDERS, MOCK_REVIEWS } from '@/data/mockData';
import { generateOrderNumber, generateLicenseKey } from '@/lib/utils';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'customer' | 'admin';
}

interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface StoreContextType {
  // Website Settings & Announcement Bar
  websiteSettings: WebsiteSettings;
  updateAnnouncement: (updates: Partial<AnnouncementSettings>) => void;
  updateWebsiteSettings: (updates: Partial<WebsiteSettings>) => void;

  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductBySlug: (slug: string) => Product | undefined;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, duration?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  discount: number;
  total: number;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Orders
  orders: Order[];
  createOrder: (orderInput: {
    customerName: string;
    email: string;
    phone: string;
    paymentMethod: 'razorpay' | 'card' | 'upi' | 'sandbox_test';
    razorpayOrderId?: string;
    razorpayPaymentId?: string;
    notes?: string;
  }) => Promise<Order>;
  updateOrderStatus: (orderId: string, updates: Partial<Order>) => void;
  getOrderById: (orderId: string) => Order | undefined;

  // Auth
  user: UserProfile | null;
  login: (email: string, role?: 'customer' | 'admin', name?: string) => void;
  logout: () => void;
  isAdmin: boolean;
  setRole: (role: 'customer' | 'admin') => void;

  // Support
  supportTickets: SupportTicket[];
  createSupportTicket: (ticket: Omit<SupportTicket, 'id' | 'ticketNumber' | 'createdAt' | 'status' | 'messages'>, initialMessage: string) => void;

  // UI state
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  // State
  // Website Settings
  const [websiteSettings, setWebsiteSettings] = useState<WebsiteSettings>({
    businessName: 'Tech Store',
    tagline: 'YOUR TECH, OUR SOLUTION',
    supportEmail: 'support@techstore.in',
    whatsappNumber: '+919876543210',
    currency: 'INR',
    announcement: {
      text: 'Upgrade Your Digital Experience — Explore Our Latest Offers',
      enabled: true,
      link: '/products',
      badge: 'LIMITED TIME',
    },
  });

  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [user, setUser] = useState<UserProfile | null>({
    id: 'user-demo-1',
    name: 'Yash Vardhan',
    email: 'demo@techstore.io',
    phone: '+91 98765 43210',
    role: 'customer'
  });
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([
    {
      id: 'tick-101',
      ticketNumber: 'TKT-8419',
      customerName: 'Yash Vardhan',
      customerEmail: 'demo@techstore.io',
      orderNumber: 'TS-98241',
      subject: 'Guidance with Windows 11 Pro Clean Install',
      category: 'activation',
      priority: 'medium',
      status: 'resolved',
      createdAt: '2026-11-08T15:00:00Z',
      messages: [
        {
          sender: 'customer',
          text: 'Does this key work for a clean install from a USB flash drive or only direct upgrade?',
          timestamp: '2026-11-08T15:00:00Z'
        },
        {
          sender: 'support',
          text: 'Hi Yash! It works for both. You can enter the retail key directly during Windows setup or afterwards in Settings -> Activation. Let us know if you need any assistance!',
          timestamp: '2026-11-08T15:15:00Z'
        }
      ]
    }
  ]);

  // UI
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Load persisted data from localStorage on mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('techstore_cart');
      if (storedCart) setCart(JSON.parse(storedCart));

      const storedWishlist = localStorage.getItem('techstore_wishlist');
      if (storedWishlist) setWishlist(JSON.parse(storedWishlist));

      const storedOrders = localStorage.getItem('techstore_orders');
      if (storedOrders) setOrders(JSON.parse(storedOrders));

      const storedProducts = localStorage.getItem('techstore_products');
      if (storedProducts) setProducts(JSON.parse(storedProducts));

      const storedSettings = localStorage.getItem('techstore_settings');
      if (storedSettings) setWebsiteSettings(JSON.parse(storedSettings));

      const storedUser = localStorage.getItem('techstore_user');
      if (storedUser) setUser(JSON.parse(storedUser));
    } catch {
      // Local storage unavailable or SSR
    }
  }, []);

  // Save to localStorage when states change
  useEffect(() => {
    try {
      localStorage.setItem('techstore_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('techstore_wishlist', JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('techstore_orders', JSON.stringify(orders));
    } catch {}
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('techstore_products', JSON.stringify(products));
    } catch {}
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('techstore_settings', JSON.stringify(websiteSettings));
    } catch {}
  }, [websiteSettings]);

  const updateAnnouncement = (updates: Partial<AnnouncementSettings>) => {
    setWebsiteSettings((prev) => ({
      ...prev,
      announcement: {
        ...prev.announcement,
        ...updates,
      },
    }));
  };

  const updateWebsiteSettings = (updates: Partial<WebsiteSettings>) => {
    setWebsiteSettings((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('techstore_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('techstore_user');
      }
    } catch {}
  }, [user]);

  // Toast helper
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1, duration?: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        // Digital software licenses usually 1-5 quantity
        const newQty = existing.quantity + quantity;
        showToast(`Updated "${product.name}" quantity to ${newQty}`, 'info');
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: newQty } : item
        );
      }
      showToast(`Added "${product.name}" to cart`, 'success');
      return [
        ...prev,
        {
          product,
          quantity,
          selectedDuration: duration || product.licenseDuration,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Subtotal and Totals
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  let discount = 0;
  if (appliedCoupon && subtotal >= appliedCoupon.minOrderValue) {
    if (appliedCoupon.discountType === 'percentage') {
      discount = (subtotal * appliedCoupon.discountValue) / 100;
      if (appliedCoupon.maxDiscount && discount > appliedCoupon.maxDiscount) {
        discount = appliedCoupon.maxDiscount;
      }
    } else {
      discount = appliedCoupon.discountValue;
    }
  }

  const total = Math.max(0, subtotal - discount);

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const coupon = MOCK_COUPONS.find(
      (c) => c.code === cleanCode && c.isActive
    );

    if (!coupon) {
      return { success: false, message: 'Invalid or expired coupon code.' };
    }

    if (subtotal < coupon.minOrderValue) {
      return {
        success: false,
        message: `Minimum order value for ${coupon.code} is ₹${coupon.minOrderValue}.`,
      };
    }

    setAppliedCoupon(coupon);
    showToast(`Coupon ${coupon.code} applied successfully!`, 'success');
    return { success: true, message: `Coupon applied: ${coupon.description}` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to wishlist', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Products CRUD
  const addProduct = (newProd: Omit<Product, 'id'>) => {
    const product: Product = {
      ...newProd,
      id: `prod-${Date.now()}`,
    };
    setProducts((prev) => [product, ...prev]);
    showToast(`Product "${product.name}" created successfully`, 'success');
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    showToast('Product updated successfully', 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product deleted', 'info');
  };

  const getProductBySlug = (slug: string) => {
    return products.find((p) => p.slug === slug);
  };

  // Orders
  const createOrder = async (orderInput: {
    customerName: string;
    email: string;
    phone: string;
    paymentMethod: 'razorpay' | 'card' | 'upi' | 'sandbox_test';
    razorpayOrderId?: string;
    razorpayPaymentId?: string;
    notes?: string;
  }): Promise<Order> => {
    const orderNumber = generateOrderNumber();
    const orderItems = cart.map((item) => {
      const isAuto = item.product.deliveryType === 'instant_automated';
      return {
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        licenseDuration: item.selectedDuration || item.product.licenseDuration,
        deliveryType: item.product.deliveryType,
        licenseKey: isAuto ? generateLicenseKey(item.product.category) : undefined,
        downloadLink: isAuto ? `https://downloads.techstore.io/vault/${item.product.slug}` : undefined,
      };
    });

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      customerName: orderInput.customerName,
      email: orderInput.email,
      phone: orderInput.phone,
      items: orderItems,
      subtotal,
      discount,
      couponCode: appliedCoupon?.code,
      tax: 0,
      total,
      currency: 'INR',
      paymentMethod: orderInput.paymentMethod,
      paymentStatus: 'completed',
      fulfillmentStatus: 'fulfilled',
      razorpayOrderId: orderInput.razorpayOrderId || `rzp_ord_${Math.random().toString(36).substring(2, 9)}`,
      razorpayPaymentId: orderInput.razorpayPaymentId || `pay_${Math.random().toString(36).substring(2, 10)}`,
      createdAt: new Date().toISOString(),
      notes: orderInput.notes,
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, updates: Partial<Order>) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, ...updates } : o))
    );
    showToast('Order updated', 'success');
  };

  const getOrderById = (orderId: string) => {
    return orders.find(
      (o) => o.id === orderId || o.orderNumber === orderId
    );
  };

  // Auth
  const login = (email: string, role: 'customer' | 'admin' = 'customer', name?: string) => {
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name: name || (email.split('@')[0] ?? 'User'),
      email,
      role,
    };
    setUser(newUser);
    showToast(`Signed in as ${newUser.name} (${role})`, 'success');
  };

  const logout = () => {
    setUser(null);
    showToast('Signed out successfully', 'info');
  };

  const setRole = (role: 'customer' | 'admin') => {
    if (user) {
      setUser({ ...user, role });
      showToast(`Switched active mode to: ${role.toUpperCase()}`, 'info');
    }
  };

  // Support
  const createSupportTicket = (
    ticket: Omit<SupportTicket, 'id' | 'ticketNumber' | 'createdAt' | 'status' | 'messages'>,
    initialMessage: string
  ) => {
    const newTicket: SupportTicket = {
      ...ticket,
      id: `tick-${Date.now()}`,
      ticketNumber: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'open',
      createdAt: new Date().toISOString(),
      messages: [
        {
          sender: 'customer',
          text: initialMessage,
          timestamp: new Date().toISOString(),
        },
      ],
    };
    setSupportTickets((prev) => [newTicket, ...prev]);
    showToast(`Support Ticket #${newTicket.ticketNumber} created`, 'success');
  };

  return (
    <StoreContext.Provider
      value={{
        websiteSettings,
        updateAnnouncement,
        updateWebsiteSettings,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductBySlug,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        discount,
        total,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        wishlist,
        toggleWishlist,
        isInWishlist,
        orders,
        createOrder,
        updateOrderStatus,
        getOrderById,
        user,
        login,
        logout,
        isAdmin: user?.role === 'admin',
        setRole,
        supportTickets,
        createSupportTicket,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        toasts,
        showToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
