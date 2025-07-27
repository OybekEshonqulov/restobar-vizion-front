import { Card, CardContent } from './card';
import { Button } from './button';
import { Badge } from './badge';
import { Clock, Star, ChefHat, Flame } from 'lucide-react';
import steaksImage from '@/assets/steaks-category.jpg';
import plovImage from '@/assets/plov-category.jpg';
import saladsImage from '@/assets/salads-category.jpg';

interface Special {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  day: string;
  isChefChoice: boolean;
  isLimited: boolean;
  prepTime: string;
  rating: number;
}

export const DailySpecials = () => {
  const today = new Date().toLocaleLowerCase().slice(0, 3); // Get current day abbreviation
  
  const specials: Special[] = [
    {
      id: 1,
      name: 'Chef\'s Premium Wagyu Steak',
      description: 'Locally sourced Wagyu beef, grilled to perfection with truffle butter and seasonal vegetables',
      price: 89.99,
      originalPrice: 110.99,
      image: steaksImage,
      day: 'mon',
      isChefChoice: true,
      isLimited: true,
      prepTime: '35-40 min',
      rating: 4.9
    },
    {
      id: 2,
      name: 'Royal Uzbek Plov Experience',
      description: 'Traditional plov prepared in a cast iron kazan with premium lamb, saffron, and handpicked spices',
      price: 32.99,
      originalPrice: 42.99,
      image: plovImage,
      day: 'tue',
      isChefChoice: true,
      isLimited: false,
      prepTime: '25-30 min',
      rating: 4.8
    },
    {
      id: 3,
      name: 'Mediterranean Seafood Delight',
      description: 'Fresh catch of the day with grilled vegetables, olive tapenade, and lemon herb dressing',
      price: 45.99,
      originalPrice: 58.99,
      image: saladsImage,
      day: 'wed',
      isChefChoice: false,
      isLimited: true,
      prepTime: '20-25 min',
      rating: 4.7
    }
  ];

  const getTodaySpecial = () => {
    const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const currentDay = days[new Date().getDay()];
    return specials.find(special => special.day === currentDay) || specials[0];
  };

  const todaySpecial = getTodaySpecial();

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const getDayName = (dayAbbr: string) => {
    const dayMap: { [key: string]: string } = {
      'mon': 'Monday',
      'tue': 'Tuesday', 
      'wed': 'Wednesday',
      'thu': 'Thursday',
      'fri': 'Friday',
      'sat': 'Saturday',
      'sun': 'Sunday'
    };
    return dayMap[dayAbbr] || 'Today';
  };

  return (
    <section className="py-20 bg-gradient-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Chef's <span className="text-primary">Daily Specials</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Handcrafted dishes featuring the finest seasonal ingredients, available for a limited time
          </p>
        </div>

        {/* Today's Featured Special */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="bg-card border-2 border-primary shadow-elegant overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Image */}
              <div className="relative h-64 lg:h-auto">
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${todaySpecial.image})` }}
                >
                  <div className="absolute inset-0 bg-black/40"></div>
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <Badge className="bg-primary text-primary-foreground">
                      Today's Special
                    </Badge>
                    {todaySpecial.isChefChoice && (
                      <Badge variant="secondary" className="bg-yellow-600 text-white">
                        <ChefHat className="w-3 h-3 mr-1" />
                        Chef's Choice
                      </Badge>
                    )}
                    {todaySpecial.isLimited && (
                      <Badge variant="destructive">
                        <Flame className="w-3 h-3 mr-1" />
                        Limited Time
                      </Badge>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/50 px-3 py-1 rounded">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white font-medium">{todaySpecial.rating}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <CardContent className="p-8 flex flex-col justify-center">
                <div className="mb-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                    {todaySpecial.name}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {todaySpecial.description}
                  </p>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl font-bold text-primary">
                    ${todaySpecial.price}
                  </span>
                  {todaySpecial.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through">
                      ${todaySpecial.originalPrice}
                    </span>
                  )}
                  {todaySpecial.originalPrice && (
                    <Badge variant="destructive" className="text-sm">
                      Save ${(todaySpecial.originalPrice - todaySpecial.price).toFixed(2)}
                    </Badge>
                  )}
                </div>

                {/* Details */}
                <div className="flex items-center gap-6 mb-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {todaySpecial.prepTime}
                  </div>
                  <div className="flex items-center gap-1">
                    {renderStars(todaySpecial.rating)}
                    <span className="ml-1">({Math.floor(Math.random() * 50) + 20} reviews)</span>
                  </div>
                </div>

                {/* Action Button */}
                <Button 
                  size="lg"
                  className="bg-gradient-gold hover:shadow-gold"
                >
                  Order Today's Special
                </Button>
              </CardContent>
            </div>
          </Card>
        </div>

        {/* All Specials Grid */}
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-foreground">
            Weekly Specials Calendar
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {specials.map((special) => (
              <Card 
                key={special.id}
                className={`group bg-card border-border hover:border-primary transition-all duration-300 hover:shadow-elegant ${
                  special.id === todaySpecial.id ? 'ring-2 ring-primary' : ''
                }`}
              >
                <CardContent className="p-0">
                  <div className="relative">
                    <div 
                      className="w-full h-48 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                      style={{ backgroundImage: `url(${special.image})` }}
                    >
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>
                      
                      {/* Day Badge */}
                      <div className="absolute top-4 left-4">
                        <Badge 
                          className={`${
                            special.id === todaySpecial.id 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-black/50 text-white'
                          }`}
                        >
                          {getDayName(special.day)}
                        </Badge>
                      </div>

                      {/* Special Badges */}
                      <div className="absolute top-4 right-4 flex flex-col gap-1">
                        {special.isChefChoice && (
                          <Badge variant="secondary" className="bg-yellow-600 text-white text-xs">
                            <ChefHat className="w-3 h-3 mr-1" />
                            Chef's
                          </Badge>
                        )}
                        {special.isLimited && (
                          <Badge variant="destructive" className="text-xs">
                            Limited
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h4 className="text-lg font-bold text-foreground mb-2">{special.name}</h4>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {special.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-primary">${special.price}</span>
                          {special.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              ${special.originalPrice}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{special.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">
            Don't miss out on our exclusive daily specials. Limited quantities available!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              View Full Menu
            </Button>
            <Button className="bg-gradient-gold hover:shadow-gold">
              Make Reservation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};