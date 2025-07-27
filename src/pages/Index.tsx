import { Navigation } from '@/components/ui/navigation';
import { HeroSection } from '@/components/ui/hero-section';
import { AmenitiesSection } from '@/components/ui/amenities-section';
import { MenuCategories } from '@/components/ui/menu-categories';
import { AboutSection } from '@/components/ui/about-section';
import { BookingSection } from '@/components/ui/booking-section';
import { Footer } from '@/components/ui/footer';

const Index = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation onMenuClick={scrollToSection} />
      <HeroSection 
        onMenuClick={() => scrollToSection('menu')}
        onBookClick={() => scrollToSection('contact')}
      />
      <AmenitiesSection />
      <MenuCategories />
      <AboutSection />
      <BookingSection />
      <Footer />
    </div>
  );
};

export default Index;
