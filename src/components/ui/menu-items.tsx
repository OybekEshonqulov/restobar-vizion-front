import { Card, CardContent } from './card';
import { Button } from './button';
import { ArrowLeft } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
}

interface MenuItemsProps {
  category: string;
  onBack: () => void;
}

const menuData: Record<string, MenuItem[]> = {
  'Drinks': [
    {
      id: '1',
      name: 'Mojito',
      description: 'Fresh mint, lime, rum and soda water',
      price: '$12',
      image: '/api/placeholder/300/200'
    },
    {
      id: '2',
      name: 'Old Fashioned',
      description: 'Bourbon whiskey, sugar, bitters',
      price: '$15',
      image: '/api/placeholder/300/200'
    },
    {
      id: '3',
      name: 'Espresso Martini',
      description: 'Vodka, coffee liqueur, espresso',
      price: '$14',
      image: '/api/placeholder/300/200'
    },
    {
      id: '4',
      name: 'Margarita',
      description: 'Tequila, lime juice, orange liqueur',
      price: '$13',
      image: '/api/placeholder/300/200'
    }
  ],
  'Salads': [
    {
      id: '5',
      name: 'Caesar Salad',
      description: 'Romaine lettuce, croutons, parmesan, caesar dressing',
      price: '$18',
      image: '/api/placeholder/300/200'
    },
    {
      id: '6',
      name: 'Greek Salad',
      description: 'Tomatoes, cucumber, olives, feta cheese',
      price: '$16',
      image: '/api/placeholder/300/200'
    },
    {
      id: '7',
      name: 'Quinoa Bowl',
      description: 'Quinoa, avocado, chickpeas, mixed greens',
      price: '$19',
      image: '/api/placeholder/300/200'
    },
    {
      id: '8',
      name: 'Arugula Salad',
      description: 'Arugula, cherry tomatoes, pine nuts, balsamic',
      price: '$17',
      image: '/api/placeholder/300/200'
    }
  ],
  'Hookah': [
    {
      id: '9',
      name: 'Apple Mint',
      description: 'Fresh apple with cooling mint flavor',
      price: '$25',
      image: '/api/placeholder/300/200'
    },
    {
      id: '10',
      name: 'Strawberry Vanilla',
      description: 'Sweet strawberry with creamy vanilla',
      price: '$27',
      image: '/api/placeholder/300/200'
    },
    {
      id: '11',
      name: 'Lemon Mint',
      description: 'Zesty lemon with refreshing mint',
      price: '$26',
      image: '/api/placeholder/300/200'
    },
    {
      id: '12',
      name: 'Grape Berry',
      description: 'Mixed grape and berry flavors',
      price: '$28',
      image: '/api/placeholder/300/200'
    }
  ],
  'Steaks': [
    {
      id: '13',
      name: 'Ribeye Steak',
      description: 'Premium ribeye with garlic butter, 350g',
      price: '$45',
      image: '/api/placeholder/300/200'
    },
    {
      id: '14',
      name: 'Filet Mignon',
      description: 'Tender filet mignon with herb crust, 250g',
      price: '$52',
      image: '/api/placeholder/300/200'
    },
    {
      id: '15',
      name: 'New York Strip',
      description: 'Classic NY strip with chimichurri, 300g',
      price: '$48',
      image: '/api/placeholder/300/200'
    },
    {
      id: '16',
      name: 'T-Bone Steak',
      description: 'T-bone steak with roasted vegetables, 400g',
      price: '$55',
      image: '/api/placeholder/300/200'
    }
  ],
  'Plov': [
    {
      id: '17',
      name: 'Traditional Plov',
      description: 'Classic Uzbek plov with lamb and carrots',
      price: '$22',
      image: '/api/placeholder/300/200'
    },
    {
      id: '18',
      name: 'Chicken Plov',
      description: 'Tender chicken plov with aromatic spices',
      price: '$20',
      image: '/api/placeholder/300/200'
    },
    {
      id: '19',
      name: 'Beef Plov',
      description: 'Rich beef plov with traditional seasonings',
      price: '$24',
      image: '/api/placeholder/300/200'
    },
    {
      id: '20',
      name: 'Vegetarian Plov',
      description: 'Healthy vegetarian plov with mixed vegetables',
      price: '$18',
      image: '/api/placeholder/300/200'
    }
  ]
};

export const MenuItems = ({ category, onBack }: MenuItemsProps) => {
  const items = menuData[category] || [];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Categories
          </Button>
        </div>
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            {category} <span className="text-primary">Menu</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our delicious {category.toLowerCase()} selection
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <Card key={item.id} className="group hover:shadow-elegant transition-all duration-300 overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-[4/3] bg-muted bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }}></div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-foreground">{item.name}</h3>
                    <span className="text-lg font-bold text-primary">{item.price}</span>
                  </div>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                  <Button className="w-full mt-4" size="sm">
                    Add to Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};