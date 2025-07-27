import { Navigation } from '@/components/ui/navigation';
import { Footer } from '@/components/ui/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Star, Gift, Crown, Zap, Users, Calendar, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const LoyaltyProgram = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [memberData, setMemberData] = useState({
    name: 'John Doe',
    points: 2850,
    tier: 'Gold',
    nextTierPoints: 5000,
    totalSpent: 850,
    visits: 12
  });

  const tiers = [
    {
      name: 'Bronze',
      icon: Trophy,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      minPoints: 0,
      benefits: [
        'Earn 1 point per $1 spent',
        'Birthday dessert on us',
        'Member-only promotions'
      ]
    },
    {
      name: 'Silver',
      icon: Star,
      color: 'text-gray-600',
      bgColor: 'bg-gray-100',
      minPoints: 1000,
      benefits: [
        'Earn 1.5 points per $1 spent',
        'Free appetizer on birthday',
        'Priority reservations',
        'Early access to new menu items'
      ]
    },
    {
      name: 'Gold',
      icon: Crown,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      minPoints: 2500,
      benefits: [
        'Earn 2 points per $1 spent',
        'Complimentary birthday meal',
        'VIP customer service',
        'Exclusive chef table events',
        'Free valet parking'
      ]
    },
    {
      name: 'Platinum',
      icon: Zap,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      minPoints: 5000,
      benefits: [
        'Earn 3 points per $1 spent',
        'Private dining room access',
        'Personal chef consultations',
        'Unlimited guest privileges',
        'Annual wine tasting events'
      ]
    }
  ];

  const rewards = [
    {
      id: 1,
      name: 'Free Appetizer',
      points: 500,
      description: 'Choose any appetizer from our menu',
      image: '🥗'
    },
    {
      id: 2,
      name: 'Dessert on the House',
      points: 750,
      description: 'Complimentary dessert of your choice',
      image: '🍰'
    },
    {
      id: 3,
      name: 'Main Course Discount',
      points: 1000,
      description: '25% off any main course',
      image: '🍽️'
    },
    {
      id: 4,
      name: 'Wine Pairing Experience',
      points: 1500,
      description: 'Curated wine pairing with your meal',
      image: '🍷'
    },
    {
      id: 5,
      name: 'Chef\'s Table Experience',
      points: 2500,
      description: 'Exclusive dining at our chef\'s table',
      image: '👨‍🍳'
    },
    {
      id: 6,
      name: 'Private Dining Event',
      points: 5000,
      description: 'Host your event in our private dining room',
      image: '🎉'
    }
  ];

  const handleEnroll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Please enter your email",
        variant: "destructive"
      });
      return;
    }

    setIsEnrolled(true);
    toast({
      title: "Welcome to Vizion Rewards!",
      description: "You've been enrolled successfully. Check your email for confirmation."
    });
  };

  const handleRedeem = (reward: any) => {
    if (memberData.points >= reward.points) {
      setMemberData(prev => ({
        ...prev,
        points: prev.points - reward.points
      }));
      toast({
        title: "Reward Redeemed!",
        description: `You've redeemed ${reward.name}. Show this confirmation to your server.`
      });
    } else {
      toast({
        title: "Insufficient Points",
        description: `You need ${reward.points - memberData.points} more points to redeem this reward.`,
        variant: "destructive"
      });
    }
  };

  const getCurrentTier = () => {
    return tiers.find(tier => tier.name === memberData.tier) || tiers[0];
  };

  const getNextTier = () => {
    const currentIndex = tiers.findIndex(tier => tier.name === memberData.tier);
    return currentIndex < tiers.length - 1 ? tiers[currentIndex + 1] : null;
  };

  const getProgressToNextTier = () => {
    const nextTier = getNextTier();
    if (!nextTier) return 100;
    
    const currentTier = getCurrentTier();
    const progress = ((memberData.points - currentTier.minPoints) / (nextTier.minPoints - currentTier.minPoints)) * 100;
    return Math.min(progress, 100);
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
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-foreground">
              Vizion <span className="text-primary">Rewards</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join our loyalty program and earn rewards with every visit. The more you dine, the more you save!
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {!isEnrolled ? (
          /* Enrollment Section */
          <div className="max-w-2xl mx-auto">
            <Card className="bg-card border-border">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl mb-4">Join Vizion Rewards Today!</CardTitle>
                <p className="text-muted-foreground">
                  Start earning points immediately and unlock exclusive benefits
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleEnroll} className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-gold hover:shadow-gold"
                  >
                    <Gift className="w-4 h-4 mr-2" />
                    Join Free & Start Earning
                  </Button>
                </form>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="p-4">
                    <Star className="w-8 h-8 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold">Earn Points</h3>
                    <p className="text-sm text-muted-foreground">1 point per $1 spent</p>
                  </div>
                  <div className="p-4">
                    <Gift className="w-8 h-8 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold">Redeem Rewards</h3>
                    <p className="text-sm text-muted-foreground">Free meals & experiences</p>
                  </div>
                  <div className="p-4">
                    <Crown className="w-8 h-8 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold">VIP Treatment</h3>
                    <p className="text-sm text-muted-foreground">Exclusive member benefits</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Member Dashboard */
          <div className="space-y-8">
            {/* Member Status */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="lg:col-span-2 bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Welcome back, {memberData.name}!
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">{memberData.points}</div>
                      <div className="text-sm text-muted-foreground">Available Points</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-foreground">{memberData.visits}</div>
                      <div className="text-sm text-muted-foreground">Total Visits</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-foreground">${memberData.totalSpent}</div>
                      <div className="text-sm text-muted-foreground">Total Spent</div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Progress to {getNextTier()?.name || 'Max Level'}</span>
                      <span className="text-sm text-muted-foreground">
                        {memberData.points} / {memberData.nextTierPoints} points
                      </span>
                    </div>
                    <Progress value={getProgressToNextTier()} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="w-5 h-5 text-primary" />
                    Current Tier
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className={`w-16 h-16 rounded-full ${getCurrentTier().bgColor} flex items-center justify-center mx-auto mb-4`}>
                      <getCurrentTier().icon className={`w-8 h-8 ${getCurrentTier().color}`} />
                    </div>
                    <Badge variant="secondary" className="text-lg px-4 py-2">
                      {memberData.tier} Member
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Available Rewards */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="w-5 h-5 text-primary" />
                  Available Rewards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rewards.map((reward) => (
                    <Card key={reward.id} className="bg-background border-border">
                      <CardContent className="p-6 text-center">
                        <div className="text-4xl mb-4">{reward.image}</div>
                        <h3 className="font-semibold text-foreground mb-2">{reward.name}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{reward.description}</p>
                        <div className="flex items-center justify-between mb-4">
                          <Badge variant="outline">{reward.points} points</Badge>
                          <span className={`text-sm ${memberData.points >= reward.points ? 'text-green-600' : 'text-red-600'}`}>
                            {memberData.points >= reward.points ? 'Available' : 'Need more points'}
                          </span>
                        </div>
                        <Button
                          onClick={() => handleRedeem(reward)}
                          disabled={memberData.points < reward.points}
                          className="w-full bg-gradient-gold hover:shadow-gold disabled:opacity-50"
                        >
                          Redeem Now
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Membership Tiers */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-primary" />
                  Membership Tiers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {tiers.map((tier) => (
                    <Card 
                      key={tier.name} 
                      className={`bg-background border-2 ${tier.name === memberData.tier ? 'border-primary' : 'border-border'}`}
                    >
                      <CardContent className="p-6 text-center">
                        <div className={`w-12 h-12 rounded-full ${tier.bgColor} flex items-center justify-center mx-auto mb-4`}>
                          <tier.icon className={`w-6 h-6 ${tier.color}`} />
                        </div>
                        <h3 className="font-bold text-lg mb-2">{tier.name}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{tier.minPoints}+ points</p>
                        <ul className="text-sm text-left space-y-2">
                          {tier.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                        {tier.name === memberData.tier && (
                          <Badge className="mt-4 bg-primary text-primary-foreground">
                            Current Tier
                          </Badge>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default LoyaltyProgram;