import { Card, CardContent } from './card';
import { MenuItems } from './menu-items';
import { useState } from 'react';
import drinksImage from '@/assets/drinks-category.jpg';
import hookahImage from '@/assets/hookah-category.jpg';
import plovImage from '@/assets/plov-category.jpg';
import steaksImage from '@/assets/steaks-category.jpg';
import saladsImage from '@/assets/salads-category.jpg';
import newsImage from '@/assets/news-category.jpg';

interface CategoryCardProps {
  title: string;
  image: string;
  onClick?: () => void;
}

const CategoryCard = ({ title, image, onClick }: CategoryCardProps) => (
  <Card 
    className="group cursor-pointer bg-card border-border hover:border-primary transition-all duration-300 hover:shadow-elegant overflow-hidden"
    onClick={onClick}
  >
    <CardContent className="p-0 relative h-80">
      <div 
        className="w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <h3 className="text-2xl font-bold text-foreground mb-2">{title}</h3>
          <p className="text-primary font-medium">View Menu →</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export const MenuCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { title: 'Drinks', image: drinksImage },
    { title: 'Hookah', image: hookahImage },
    { title: 'Plov', image: plovImage },
    { title: 'Steaks', image: steaksImage },
    { title: 'Salads', image: saladsImage },
    { title: 'News', image: newsImage },
  ];

  if (selectedCategory) {
    return (
      <MenuItems 
        category={selectedCategory} 
        onBack={() => setSelectedCategory(null)} 
      />
    );
  }

  return (
    <section id="menu" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Menu <span className="text-primary">Categories</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our carefully curated selection of dishes and beverages
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.title}
              title={category.title}
              image={category.image}
              onClick={() => setSelectedCategory(category.title)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};