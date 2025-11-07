import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import logo from "@/assets/lemaci-logo.png";
import SearchDialog from "@/components/SearchDialog";

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Smartphones", path: "/category/smartphones" },
    { name: "Laptops", path: "/category/laptops" },
    { name: "Tablets", path: "/category/tablets" },
    { name: "Laptop Accessories", path: "/category/laptop-accessories" },
    { name: "Phone Accessories", path: "/category/phone-accessories" },
    { name: "Tablet Accessories", path: "/category/tablet-accessories" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <img src={logo} alt="Lemaci Logo" className="h-10 w-10" />
            <span className="text-xl font-bold text-primary">Lemaci</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Contact Info, Search & Cart */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="text-sm">
              <div className="font-medium">071 392 9274</div>
              <div className="text-muted-foreground text-xs">cicilymbogo820@gmail.com</div>
            </div>
            <SearchDialog />
            <Button size="icon" variant="outline" className="relative">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile Search & Menu */}
          <div className="flex md:hidden items-center gap-2">
            <SearchDialog />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-4 py-2 border-t mt-2 pt-4">
                <div className="text-sm font-medium">071 392 9274</div>
                <div className="text-xs text-muted-foreground">cicilymbogo820@gmail.com</div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
