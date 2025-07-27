import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import logoSvg from '@/assets/logo.svg';

export const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <img src={logoSvg} alt="AGORA Restobar" className="h-12 w-auto" />
            <p className="text-muted-foreground text-sm leading-relaxed">
              Experience the finest dining in the heart of the city. We serve exquisite dishes crafted with passion and the freshest ingredients.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Contact</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span>123 Restaurant Street, Tashkent, Uzbekistan</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary" />
                <span>+998 90 123 45 67</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary" />
                <span>info@agorarestobar.uz</span>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Hours</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center space-x-3">
                <Clock className="h-4 w-4 text-primary" />
                <div>
                  <div>Mon - Thu: 11:00 - 23:00</div>
                  <div>Fri - Sun: 11:00 - 01:00</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
            <div className="space-y-2 text-sm">
              <div>
                <a href="#home" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </a>
              </div>
              <div>
                <a href="#menu" className="text-muted-foreground hover:text-primary transition-colors">
                  Menu
                </a>
              </div>
              <div>
                <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </a>
              </div>
              <div>
                <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 AGORA Restobar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};