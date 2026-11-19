import type { Metadata, Viewport } from 'next';
import './globals.css';
import { StoreProvider } from '@/context/StoreContext';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { SearchModal } from '@/components/search/SearchModal';
import { ToastContainer } from '@/components/ui/ToastContainer';
import { FloatingWhatsApp } from '@/components/ui/FloatingWhatsApp';

export const metadata: Metadata = {
  title: {
    default: 'Tech Store — Your Tech, Our Solution | Digital Software & AI Subscriptions',
    template: '%s | Tech Store',
  },
  description: 'Tech Store is India’s premier digital products store for genuine software licenses, Windows activation keys, Microsoft Office, developer tools, and official AI subscriptions with instant automated dispatch.',
  keywords: [
    'Tech Store',
    'Windows 11 Pro Key',
    'Windows 10 Pro Key',
    'Microsoft Office 2024',
    'ChatGPT Plus Subscription',
    'Claude Pro',
    'Canva Pro',
    'Midjourney Pro',
    'Digital Software Store India',
    'Software Activation Keys'
  ],
  authors: [{ name: 'Tech Store' }],
  icons: {
    icon: [
      { url: '/brand/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/brand/favicon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/brand/favicon-192.png', sizes: '192x192', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'Tech Store — Your Tech, Our Solution',
    description: 'Discover powerful software, Windows licenses, and next-generation AI tools at affordable prices.',
    siteName: 'Tech Store',
    locale: 'en_IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#08080B',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#F5F5F7] text-[#17151D] min-h-screen flex flex-col font-sans antialiased selection:bg-purple-600 selection:text-white">
        <StoreProvider>
          <AnnouncementBar />
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <CartDrawer />
          <SearchModal />
          <ToastContainer />
          <FloatingWhatsApp />
        </StoreProvider>
      </body>
    </html>
  );
}
