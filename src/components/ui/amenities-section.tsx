import { Card, CardContent } from './card';
import { Gamepad2, Coffee, Mic, Wine, UtensilsCrossed } from 'lucide-react';
import amenitiesImage from '@/assets/amenities-hero.jpg';

interface AmenityCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const AmenityCard = ({ icon, title, description }: AmenityCardProps) => (
  <Card className="group cursor-pointer bg-card/80 backdrop-blur-sm border-border hover:border-primary transition-all duration-300 hover:shadow-elegant">
    <CardContent className="p-6 text-center">
      <div className="mb-4 flex justify-center">
        <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold mb-2 text-foreground">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

export const AmenitiesSection = () => {
  const amenities = [
    {
      icon: <Gamepad2 size={24} />,
      title: 'PlayStation Gaming',
      description: 'Latest PlayStation consoles with comfortable gaming area'
    },
    {
      icon: <Coffee size={24} />,
      title: 'Hookah Lounge',
      description: 'Premium hookah experience with exotic flavors'
    },
    {
      icon: <Mic size={24} />,
      title: 'Karaoke Stage',
      description: 'Private karaoke rooms and main stage performances'
    },
    {
      icon: <Wine size={24} />,
      title: 'Premium Bar',
      description: 'Craft cocktails and extensive wine selection'
    },
    {
      icon: <UtensilsCrossed size={24} />,
      title: 'Fine Dining',
      description: 'Gourmet cuisine with international and local dishes'
    }
  ];

  return (
    <section className="py-20 bg-muted/50 relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: `url(${amenitiesImage})` }}
      ></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Experience <span className="text-primary">AGORA</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            More than just a restaurant - discover our premium amenities and entertainment options
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {amenities.map((amenity, index) => (
            <AmenityCard
              key={amenity.title}
              icon={amenity.icon}
              title={amenity.title}
              description={amenity.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};