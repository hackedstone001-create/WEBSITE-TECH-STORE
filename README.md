# TECH STORE — Premium Futuristic Digital Marketplace

A complete, production-ready, futuristic e-commerce platform for genuine digital software, frontier AI subscriptions, Windows retail licenses, and developer kits.

---

## 🚀 Key Features

### 1. 3D Web & Futuristic Design System
- **Dark Futuristic Aesthetic**: Primary background `#080B14`, secondary `#101827`, card surface `#141E30`, primary blue `#5865F2`, and purple accent `#A855F7`.
- **Three.js Interactive 3D Hero Scene**: Floating futuristic laptop with holographic HUD canvas texture, rotating cyber-rings, tumbling software crystal nodes, glowing particle nebula, and smooth mouse-reactive tilt.
- **Glassmorphism & Micro-Interactions**: Backdrop blur panels, glowing neon borders, 3D card elevation, and smooth transitions.

### 2. Digital Product Catalog & Details
- **Multi-Category Architecture**:
  - **AI Tools**: ChatGPT Plus, Claude 3.5 Sonnet, Cursor AI Pro, Midjourney Pro, Perplexity Pro.
  - **Software**: Adobe Creative Cloud All Apps, JetBrains All Products Pack, DaVinci Resolve Studio 19, Internet Download Manager (IDM).
  - **Windows Keys**: Windows 11 Pro Genuine Retail, Windows 10 Pro, Microsoft Office 2021 Pro Plus (Account Bindable).
  - **Digital Products**: Cyberpunk UI Kit (Figma + React), 10,000+ Creator LUTs & SFX Master Bundle, SaaS Boilerplate (Next.js + Supabase).
- **Dedicated Product Pages (`/products/[slug]`)**:
  - Hardware & platform compatibility badges (Windows 11/10, macOS, Linux, Web).
  - License duration selector.
  - Delivery mode badges (Instant Automated Key vs Account Upgrade).
  - Step-by-step activation guide protocols.
  - Package inclusions & transparent refund policy.
  - Verified customer reviews & related products.
  - "Add to Cart" and "Buy Now" actions.

### 3. Shopping Cart & Checkout Architecture
- **Persistent Cart Drawer**: Add, remove, update quantities, persist in `localStorage`.
- **Coupon Engine**: Live coupon validation with percentage and fixed discounts (`TECH20`, `WELCOME10`, `SAVE500`).
- **Checkout Page (`/checkout`)**: Customer details, city, delivery notes, summary breakdown.
- **Razorpay Payment Gateway Integration**:
  - `/api/payment/create-order`: Server-side order initialization.
  - `/api/payment/verify`: Cryptographic HMAC-SHA256 signature verification preventing client-side tampering.
  - **Test Sandbox Simulator Mode**: Instant server-verified test checkout when live credentials are not set.

### 4. License Vault & Order Confirmation (`/orders/[id]`)
- Confetti celebration on completion.
- Instant automated generation of authentic formatted license keys.
- 1-click copy-to-clipboard functionality.
- Direct high-speed download links.
- Printable tax invoice format.

### 5. Customer Dashboard (`/dashboard`)
- **Overview**: Order metrics, active keys count, wishlist counter.
- **My Orders**: Complete order history with fulfillment status.
- **License Vault**: All purchased keys organized in one secure vault.
- **Downloads**: Direct software installer links.
- **Installation Guides**: Visual step-by-step guides for clean OS installations and software bindings.
- **Wishlist**: Quick view and move-to-cart.
- **Support Tickets**: Interactive ticketing system with creation modal.
- **Profile Settings**: Personal contact details and security preferences.

### 6. Admin Control Panel (`/admin`)
- Role-protected superadmin console.
- **Sales Analytics**: Gross revenue, total orders, average order value, category distribution charts.
- **Product Management**: Full CRUD (Add new product modal, delete, toggle stock status).
- **Order Management**: Search, filter by status, update fulfillment status (Fulfilled, Processing, Pending), inspect order payload.
- **Customer Directory**: Customer spending and order metrics.
- **Coupon Engine**: Create new promo vouchers and toggle status.
- **FAQ Management**: Storefront knowledge base.

---

## 🛠️ Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **3D Visuals**: Three.js
- **Icons**: Lucide React
- **Celebration**: Canvas Confetti
- **Payments**: Razorpay Node SDK + Webhook signature verification
- **Database**: PostgreSQL / Supabase (`supabase/schema.sql` with Row-Level Security)

---

## ⚙️ Environment Configuration

Create a `.env.local` file or configure your deployment environment:

```env
# SUPABASE DATABASE & AUTH
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# RAZORPAY PAYMENT GATEWAY
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret_key

# STORE METADATA
NEXT_PUBLIC_APP_NAME="TECH STORE"
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUPPORT_EMAIL=support@techstore.io
NEXT_PUBLIC_WHATSAPP_NUMBER=+919876543210
```

> **Note**: If Razorpay credentials are not provided, the application runs seamlessly in **Test Sandbox Mode**, providing fully simulated, server-verified order creation and license key generation!

---

## 🏃 Running Locally

```bash
# Install dependencies
npm install

# Start the local development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit `http://localhost:3000` to experience Tech Store.
# TECH-STORE-WEBSITE
# TECH-STORE-WEBSITE
# TECH-STORE-WEBSITE
# TECH-STORE-WEBSITE
