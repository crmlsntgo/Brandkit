import Navbar from '@/components/Navbar';
import BrandKitGenerator from '@/components/BrandKitGenerator';
import FeaturesSection from '@/components/FeaturesSection';
import FaqSection from '@/components/FaqSection';
import SiteFooter from '@/components/SiteFooter';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <BrandKitGenerator />
        <FeaturesSection />
        <FaqSection />
      </main>
      <SiteFooter />
    </>
  );
}
