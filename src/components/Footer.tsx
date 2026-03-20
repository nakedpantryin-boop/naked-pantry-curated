import { Facebook, Instagram, Twitter, Mail, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-emerald text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold mb-4">The Naked Pantry</h3>
            <p className="text-primary-foreground/80 mb-6 leading-relaxed">
              The trusted marketplace for clean-label, curated pantry staples and healthy snacks for the conscious consumer.
            </p>
            <div className="flex space-x-3">
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground/80 hover:text-gold hover:bg-emerald-light rounded-full"
                asChild
              >
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Instagram className="w-5 h-5" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground/80 hover:text-gold hover:bg-emerald-light rounded-full"
                asChild
              >
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <Facebook className="w-5 h-5" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground/80 hover:text-gold hover:bg-emerald-light rounded-full"
                asChild
              >
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <Twitter className="w-5 h-5" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground/80 hover:text-gold hover:bg-emerald-light rounded-full"
                asChild
              >
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <Youtube className="w-5 h-5" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground/80 hover:text-gold hover:bg-emerald-light rounded-full"
                asChild
              >
                <a href="mailto:hello@thenakedpantry.com" aria-label="Email">
                  <Mail className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-3 text-primary-foreground/80">
              <li><a href="/" className="hover:text-primary-foreground transition-colors">Healthy Snacks</a></li>
              <li><a href="/" className="hover:text-primary-foreground transition-colors">Pantry Staples</a></li>
              <li><a href="/" className="hover:text-primary-foreground transition-colors">Superfoods</a></li>
              <li><a href="/" className="hover:text-primary-foreground transition-colors">Kid Friendly</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-primary-foreground/80">
              <li><a href="/about" className="hover:text-primary-foreground transition-colors">About Us</a></li>
              <li><a href="/contact" className="hover:text-primary-foreground transition-colors">Contact Us</a></li>
              <li><a href="/" className="hover:text-primary-foreground transition-colors">Our Standards</a></li>
              <li><a href="/" className="hover:text-primary-foreground transition-colors">Careers</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-3 text-primary-foreground/80">
              <li><a href="/" className="hover:text-primary-foreground transition-colors">Help Center</a></li>
              <li><a href="/" className="hover:text-primary-foreground transition-colors">Shipping Info</a></li>
              <li><a href="/" className="hover:text-primary-foreground transition-colors">Returns & Refunds</a></li>
              <li><a href="/privacy" className="hover:text-primary-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-primary-foreground transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-emerald-light mt-12 pt-8 text-center text-primary-foreground/80">
          <p>&copy; {new Date().getFullYear()} The Naked Pantry. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
