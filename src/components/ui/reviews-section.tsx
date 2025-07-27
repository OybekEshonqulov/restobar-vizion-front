import { Card, CardContent } from './card';
import { Star, Quote } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
}

export const ReviewsSection = () => {
  const reviews: Review[] = [
    {
      id: 1,
      name: 'Sarah Johnson',
      rating: 5,
      comment: 'Absolutely amazing experience! The steaks were perfectly cooked and the atmosphere was elegant. Will definitely be coming back!',
      date: '2 days ago',
      avatar: '👩‍💼'
    },
    {
      id: 2,
      name: 'Michael Chen',
      rating: 5,
      comment: 'The traditional plov was authentic and delicious. Service was outstanding and the hookah lounge is a great addition.',
      date: '1 week ago',
      avatar: '👨‍💻'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      rating: 4,
      comment: 'Great food and ambiance. The cocktails are expertly crafted. Perfect place for a special dinner!',
      date: '2 weeks ago',
      avatar: '👩‍🎨'
    },
    {
      id: 4,
      name: 'David Wilson',
      rating: 5,
      comment: 'Outstanding dining experience from start to finish. The staff went above and beyond to make our anniversary special.',
      date: '3 weeks ago',
      avatar: '👨‍🔬'
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      rating: 5,
      comment: 'The best restaurant in the city! Fresh ingredients, innovative dishes, and impeccable service. Highly recommend!',
      date: '1 month ago',
      avatar: '👩‍⚕️'
    },
    {
      id: 6,
      name: 'Alex Petrov',
      rating: 4,
      comment: 'Love the modern take on traditional dishes. The presentation is beautiful and flavors are incredible.',
      date: '1 month ago',
      avatar: '👨‍🍳'
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            What Our <span className="text-primary">Customers Say</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Don't just take our word for it - hear from our valued guests
          </p>
          
          {/* Average Rating Display */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-1">
              {renderStars(Math.round(averageRating))}
            </div>
            <span className="text-2xl font-bold text-primary">{averageRating.toFixed(1)}</span>
            <span className="text-muted-foreground">({reviews.length} reviews)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <Card 
              key={review.id}
              className="group bg-card border-border hover:border-primary transition-all duration-300 hover:shadow-elegant"
            >
              <CardContent className="p-6">
                {/* Quote Icon */}
                <div className="mb-4">
                  <Quote className="w-8 h-8 text-primary/50" />
                </div>

                {/* Review Content */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{review.comment}"
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {renderStars(review.rating)}
                </div>

                {/* Reviewer Info */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-2xl">
                    {review.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{review.name}</h4>
                    <p className="text-sm text-muted-foreground">{review.date}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Had a great experience? We'd love to hear from you!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://google.com/maps"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Leave a Google Review
            </a>
            <a
              href="https://tripadvisor.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-md hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Review on TripAdvisor
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};