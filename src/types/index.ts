export type ProductCategory = 
  | 'windows-keys' 
  | 'microsoft-office' 
  | 'antivirus-security' 
  | 'ai-tools' 
  | 'video-editing' 
  | 'design-productivity' 
  | 'development-tools' 
  | 'digital-products' 
  | 'software'; // legacy compatibility alias

export type DeliveryType = 'instant_automated' | 'manual_activation' | 'account_credential';

export interface AnnouncementSettings {
  text: string;
  enabled: boolean;
  link: string;
  badge?: string;
}

export interface WebsiteSettings {
  businessName: string;
  tagline: string;
  supportEmail: string;
  whatsappNumber: string;
  announcement: AnnouncementSettings;
  currency: string;
  gstNumber?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  fullDescription: string;
  category: ProductCategory;
  categoryName: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  licenseDuration: string; // e.g. "Lifetime", "1 Year Subscription", "1 PC / Permanent"
  deliveryType: DeliveryType;
  deviceCompatibility: string[]; // e.g. ["Windows 11", "Windows 10", "macOS", "Web"]
  features: string[];
  whatsIncluded: string[];
  activationSteps: string[];
  refundPolicy: string;
  rating: number;
  reviewCount: number;
  isTrending?: boolean;
  isFeatured?: boolean;
  inStock: boolean;
  image: string;
  iconName?: string;
  badge?: string;
  version?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedDuration?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  licenseDuration: string;
  deliveryType: DeliveryType;
  licenseKey?: string;
  downloadLink?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  billingAddress?: {
    street?: string;
    city?: string;
    state?: string;
    country: string;
    postalCode?: string;
  };
  items: OrderItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  tax: number;
  total: number;
  currency: string;
  paymentMethod: 'razorpay' | 'card' | 'upi' | 'sandbox_test';
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  fulfillmentStatus: 'fulfilled' | 'processing' | 'pending';
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  createdAt: string;
  notes?: string;
}

export interface Coupon {
  id: string;
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
  validUntil: string;
  isActive: boolean;
  usageCount: number;
}

export interface Review {
  id: string;
  productId: string;
  productName?: string;
  authorName: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  isVerifiedPurchase: boolean;
  isApproved: boolean;
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  customerName: string;
  customerEmail: string;
  orderNumber?: string;
  subject: string;
  category: 'activation' | 'billing' | 'download' | 'general';
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  createdAt: string;
  messages: {
    sender: 'customer' | 'support';
    text: string;
    timestamp: string;
  }[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'delivery' | 'licensing' | 'support' | 'payments';
}
