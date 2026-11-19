import { HeroSection } from '@/components/home/HeroSection';
import { TrustIndicators } from '@/components/home/TrustIndicators';
import { CategorySection } from '@/components/home/CategorySection';
import { BestSellingProducts } from '@/components/home/BestSellingProducts';
import { WindowsShowcase } from '@/components/home/WindowsShowcase';
import { AIToolsCollection } from '@/components/home/AIToolsCollection';
import { SpecialOffers } from '@/components/home/SpecialOffers';
import { HowItWorks } from '@/components/home/HowItWorks';
import { Testimonials } from '@/components/home/Testimonials';
import { FAQSection } from '@/components/home/FAQSection';
import { FinalCTA } from '@/components/home/FinalCTA';

export default function HomePage() {
  return (
    <div className="flex flex-col w-full bg-white">
      {/* Section B: Hero (with official logo, 3D scene, purple lighting) */}
      <HeroSection />

      {/* Section C: Trust Indicators (Secure Payments, Digital Delivery, Dedicated Support, Easy Ordering) */}
      <TrustIndicators />

      {/* Section D: Product Categories (8 Premium Cards) */}
      <CategorySection />

      {/* Section E: Best Sellers (Dynamic database-backed product grid) */}
      <BestSellingProducts />

      {/* Section F: Windows Showcase ("Power Your PC. Unlock Its Potential." - Dark promotional with light cards) */}
      <WindowsShowcase />

      {/* Section G: AI Tools Showcase ("Discover the Power of AI." - 7 subcategories) */}
      <AIToolsCollection />

      {/* Section H: Promotional Bundles (AI, Productivity, Software, Seasonal) */}
      <SpecialOffers />

      {/* Section I: How It Works (6-step transparent workflow) */}
      <HowItWorks />

      {/* Section J: Customer Reviews (Verified reviews with ratings & products) */}
      <Testimonials />

      {/* Section K: FAQ (8 comprehensive topics) */}
      <FAQSection />

      {/* Section L: Final CTA ("Ready to Upgrade Your Digital Experience?") */}
      <FinalCTA />
    </div>
  );
}
