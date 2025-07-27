import { Button } from './button';
import heroImage from '@/assets/hero-steak.jpg';

interface HeroSectionProps {
  onMenuClick?: () => void;
  onBookClick?: () => void;
}

export const HeroSection = ({ onMenuClick, onBookClick }: HeroSectionProps) => {
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
          Enjoy Our{' '}
          <span className="text-primary bg-gradient-gold bg-clip-text text-transparent">
            Delicious
          </span>{' '}
          Meal
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Delicious meals, a warm atmosphere, and unforgettable moments! Every dish is a work of art crafted with love. At our restaurant, every bite brings joy and warmth.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            onClick={onMenuClick}
            className="bg-gradient-gold hover:shadow-gold transition-all duration-300"
          >
            View Menu
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={onBookClick}
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            Book a Table
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};