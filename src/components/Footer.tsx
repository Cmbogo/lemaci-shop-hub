import { Link } from "react-router-dom";
import { Phone, Mail } from "lucide-react";
import logo from "@/assets/lemaci-logo.png";

const Footer = () => {
  return (
    <footer className="border-t bg-muted/50 mt-20">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img src={logo} alt="Lemaci" className="h-10 w-10" />
              <span className="text-xl font-bold text-primary">Lemaci</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4 max-w-md">
              Your trusted source for premium electronics and accessories. Quality products at competitive prices.
            </p>
            <div className="space-y-2">
              <a href="tel:0713929274" className="flex items-center text-sm hover:text-primary transition-colors">
                <Phone className="h-4 w-4 mr-2" />
                071 392 9274
              </a>
              <a href="mailto:cicilymbogo820@gmail.com" className="flex items-center text-sm hover:text-primary transition-colors">
                <Mail className="h-4 w-4 mr-2" />
                cicilymbogo820@gmail.com
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/category/smartphones" className="hover:text-primary transition-colors">
                  Smartphones
                </Link>
              </li>
              <li>
                <Link to="/category/laptops" className="hover:text-primary transition-colors">
                  Laptops
                </Link>
              </li>
              <li>
                <Link to="/category/tablets" className="hover:text-primary transition-colors">
                  Tablets
                </Link>
              </li>
            </ul>
          </div>

          {/* Accessories */}
          <div>
            <h3 className="font-semibold mb-4">Accessories</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/category/laptop-accessories" className="hover:text-primary transition-colors">
                  Laptop Accessories
                </Link>
              </li>
              <li>
                <Link to="/category/phone-accessories" className="hover:text-primary transition-colors">
                  Phone Accessories
                </Link>
              </li>
              <li>
                <Link to="/category/tablet-accessories" className="hover:text-primary transition-colors">
                  Tablet Accessories
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Lemaci. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
