import { Navigation } from '@/components/ui/navigation';
import { Footer } from '@/components/ui/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Camera, Heart, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

// Import existing images
import heroImage from '@/assets/hero-steak.jpg';
import amenitiesImage from '@/assets/amenities-hero.jpg';
import drinksImage from '@/assets/drinks-category.jpg';
import hookahImage from '@/assets/hookah-category.jpg';
import plovImage from '@/assets/plov-category.jpg';
import steaksImage from '@/assets/steaks-category.jpg';
import saladsImage from '@/assets/salads-category.jpg';

const Gallery = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const galleryItems = [
    {
      id: 1,
      image: heroImage,
      title: 'Premium Steaks',
      category: 'food',
      description: 'Our signature premium cuts grilled to perfection'
    },
    {
      id: 2,
      image: amenitiesImage,
      title: 'Elegant Atmosphere',
      category: 'interior',
      description: 'Sophisticated dining experience in our main hall'
    },
    {
      id: 3,
      image: drinksImage,
      title: 'Craft Cocktails',
      category: 'drinks',
      description: 'Handcrafted cocktails by our expert mixologists'
    },
    {
      id: 4,
      image: hookahImage,
      title: 'Hookah Lounge',
      category: 'interior',
      description: 'Relax in our comfortable hookah lounge area'
    },
    {
      id: 5,
      image: plovImage,
      title: 'Traditional Plov',
      category: 'food',
      description: 'Authentic Uzbek plov prepared with traditional methods'
    },
    {
      id: 6,
      image: steaksImage,
      title: 'Grilled Specialties',
      category: 'food',
      description: 'Fresh from our charcoal grill'
    },
    {
      id: 7,
      image: saladsImage,
      title: 'Fresh Salads',
      category: 'food',
      description: 'Garden fresh ingredients in every bite'
    },
  ];

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'food', label: 'Food' },
    { id: 'drinks', label: 'Drinks' },
    { id: 'interior', label: 'Interior' },
  ];

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation onMenuClick={scrollToSection} />
      
      {/* Header Section */}
      <section className="pt-24 pb-12 bg-gradient-dark">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Camera className="w-5 h-5" />
              <span>{filteredItems.length} Photos</span>
            </div>
          </div>
          
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-foreground">
              Photo <span className="text-primary">Gallery</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the beauty of our restaurant through stunning photography showcasing our ambiance, cuisine, and hospitality
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={selectedCategory === category.id 
                  ? "bg-gradient-gold hover:shadow-gold" 
                  : "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                }
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <Card 
                key={item.id}
                className="group cursor-pointer bg-card border-border hover:border-primary transition-all duration-300 hover:shadow-elegant overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className="relative">
                    <div 
                      className="w-full h-64 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                      style={{ backgroundImage: `url(${item.image})` }}
                    >
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                          {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                        </Badge>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button size="sm" variant="ghost" className="bg-black/50 hover:bg-black/70 text-white">
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="bg-black/50 hover:bg-black/70 text-white">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;