import { useState } from 'react';
import { Button } from './button';
import { Menu, X } from 'lucide-react';
import logoSvg from '@/assets/logo.svg';

interface NavigationProps {
  onMenuClick?: (section: string) => void;
}

export const Navigation = ({ onMenuClick }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Home', href: '#home' },
    { name: 'Menu', href: '#menu' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleMenuClick = (href: string) => {
    const section = href.replace('#', '');
    onMenuClick?.(section);
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
                onClick={() => handleMenuClick(item.href)}
                className="text-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </button>
            ))}
            <Button variant="default" size="sm">
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
                  onClick={() => handleMenuClick(item.href)}
                  className="text-foreground hover:text-primary transition-colors text-left"
                >
                  {item.name}
                </button>
              ))}
              <Button variant="default" size="sm" className="w-fit">
                Book Table
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};