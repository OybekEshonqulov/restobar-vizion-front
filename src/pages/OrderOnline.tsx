import { Navigation } from '@/components/ui/navigation';
import { Footer } from '@/components/ui/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Plus, Minus, ShoppingCart, Clock, Star, Utensils } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

// Import images
import steaksImage from '@/assets/steaks-category.jpg';
import plovImage from '@/assets/plov-category.jpg';
import saladsImage from '@/assets/salads-category.jpg';
import drinksImage from '@/assets/drinks-category.jpg';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  prepTime: string;
  isPopular?: boolean;
  isSpicy?: boolean;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const OrderOnline = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: 'Premium Ribeye Steak',
      description: 'Juicy 300g ribeye steak grilled to perfection, served with roasted vegetables',
      price: 45.99,
      image: steaksImage,
      category: 'steaks',
      rating: 4.9,
      prepTime: '25-30 min',
      isPopular: true
    },
    {
      id: 2,
      name: 'Traditional Uzbek Plov',
      description: 'Authentic plov with tender lamb, carrots, and aromatic spices',
      price: 18.99,
      image: plovImage,
      category: 'main',
      rating: 4.8,
      prepTime: '20-25 min',
      isPopular: true
    },
    {
      id: 3,
      name: 'Caesar Salad',
      description: 'Fresh romaine lettuce, parmesan cheese, croutons, and our signature dressing',
      price: 12.99,
      image: saladsImage,
      category: 'salads',
      rating: 4.6,
      prepTime: '10-15 min'
    },
    {
      id: 4,
      name: 'Craft Beer Selection',
      description: 'Local craft beer on tap, ask your server for today\'s selection',
      price: 6.99,
      image: drinksImage,
      category: 'drinks',
      rating: 4.5,
      prepTime: '2-5 min'
    },
    {
      id: 5,
      name: 'Grilled Salmon',
      description: 'Fresh Atlantic salmon fillet with lemon butter sauce and seasonal vegetables',
      price: 28.99,
      image: steaksImage,
      category: 'main',
      rating: 4.7,
      prepTime: '20-25 min'
    },
    {
      id: 6,
      name: 'Mediterranean Salad',
      description: 'Mixed greens, olives, feta cheese, tomatoes, and olive oil dressing',
      price: 14.99,
      image: saladsImage,
      category: 'salads',
      rating: 4.4,
      prepTime: '10-15 min'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'steaks', label: 'Steaks' },
    { id: 'main', label: 'Main Dishes' },
    { id: 'salads', label: 'Salads' },
    { id: 'drinks', label: 'Drinks' },
  ];

  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const addToCart = (item: MenuItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
    
    toast({
      title: "Added to cart!",
      description: `${item.name} has been added to your cart.`
    });
  };

  const removeFromCart = (itemId: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === itemId);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(cartItem =>
          cartItem.id === itemId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      } else {
        return prevCart.filter(cartItem => cartItem.id !== itemId);
      }
    });
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

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
      <section className="pt-24 pb-8 bg-gradient-dark">
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
            <Button
              variant="outline"
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground relative"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Cart ({getTotalItems()})
              {getTotalItems() > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground">
                  {getTotalItems()}
                </Badge>
              )}
            </Button>
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-foreground">
              Order <span className="text-primary">Online</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Enjoy our delicious meals from the comfort of your home. Fast delivery and pickup available!
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4">
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

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Menu Items */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredItems.map((item) => (
                <Card key={item.id} className="group bg-card border-border hover:border-primary transition-all duration-300 hover:shadow-elegant">
                  <CardContent className="p-0">
                    <div className="relative">
                      <div 
                        className="w-full h-48 bg-cover bg-center"
                        style={{ backgroundImage: `url(${item.image})` }}
                      >
                        <div className="absolute inset-0 bg-black/40"></div>
                        
                        {/* Badges */}
                        <div className="absolute top-4 left-4 flex gap-2">
                          {item.isPopular && (
                            <Badge className="bg-primary text-primary-foreground">
                              Popular
                            </Badge>
                          )}
                          {item.isSpicy && (
                            <Badge variant="destructive">Spicy</Badge>
                          )}
                        </div>
                        
                        {/* Rating */}
                        <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/50 px-2 py-1 rounded">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-white text-sm">{item.rating}</span>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-bold text-foreground">{item.name}</h3>
                          <span className="text-2xl font-bold text-primary">${item.price}</span>
                        </div>
                        
                        <p className="text-muted-foreground mb-4">{item.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {item.prepTime}
                            </div>
                            <div className="flex items-center gap-1">
                              <Utensils className="w-4 h-4" />
                              {item.category}
                            </div>
                          </div>
                          
                          <Button
                            onClick={() => addToCart(item)}
                            className="bg-gradient-gold hover:shadow-gold"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Cart Sidebar */}
          <div className={`lg:block ${isCartOpen ? 'block' : 'hidden lg:block'}`}>
            <Card className="sticky top-24 bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Your Order
                </CardTitle>
              </CardHeader>
              <CardContent>
                {cart.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">Your cart is empty</p>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-foreground">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => addToCart(item)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="space-y-2 mb-6">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>${getTotalPrice().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delivery:</span>
                        <span>$4.99</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total:</span>
                        <span className="text-primary">${(getTotalPrice() + 4.99).toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full bg-gradient-gold hover:shadow-gold"
                      onClick={() => {
                        toast({
                          title: "Order Placed!",
                          description: "Your order has been placed successfully. You'll receive a confirmation email shortly."
                        });
                        setCart([]);
                      }}
                    >
                      Place Order
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OrderOnline;