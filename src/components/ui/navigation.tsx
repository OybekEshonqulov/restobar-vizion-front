import { useState } from 'react';
import { Button } from './button';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import logoSvg from '@/assets/logo.svg';

interface NavigationProps {
  onMenuClick?: (section: string) => void;
}

export const Navigation = ({ onMenuClick }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: 'Home', href: '/', isRoute: true },
    { name: 'Menu', href: '#menu', isRoute: false },
    { name: 'Gallery', href: '/gallery', isRoute: true },
    { name: 'Order Online', href: '/order', isRoute: true },
    { name: 'Rewards', href: '/loyalty', isRoute: true },
    { name: 'About', href: '#about', isRoute: false },
    { name: 'Contact', href: '/contact', isRoute: true },
  ];

  const handleMenuClick = (item: { name: string; href: string; isRoute: boolean }) => {
    if (item.isRoute) {
      navigate(item.href);
    } else {
      const section = item.href.replace('#', '');
      onMenuClick?.(section);
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img src={logoSvg} alt="AGORA Restobar" className="h-12 w-auto" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleMenuClick(item)}
                className={`text-foreground hover:text-primary transition-colors ${
                  (item.isRoute && location.pathname === item.href) || 
                  (!item.isRoute && location.pathname === '/' && item.href === '#home')
                    ? 'text-primary font-semibold' 
                    : ''
                }`}
              >
                {item.name}
              </button>
            ))}
            <Button 
              variant="default" 
              size="sm"
              onClick={() => {
                if (location.pathname === '/') {
                  onMenuClick?.('contact');
                } else {
                  navigate('/#contact');
                }
              }}
            >
              Book Table
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleMenuClick(item)}
                  className={`text-foreground hover:text-primary transition-colors text-left ${
                    (item.isRoute && location.pathname === item.href) || 
                    (!item.isRoute && location.pathname === '/' && item.href === '#home')
                      ? 'text-primary font-semibold' 
                      : ''
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <Button 
                variant="default" 
                size="sm" 
                className="w-fit"
                onClick={() => {
                  if (location.pathname === '/') {
                    onMenuClick?.('contact');
                  } else {
                    navigate('/#contact');
                  }
                  setIsMenuOpen(false);
                }}
              >
                Book Table
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};