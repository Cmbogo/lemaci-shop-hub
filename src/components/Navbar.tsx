import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import logo from "@/assets/lemaci-logo.png";
import SearchDialog from "@/components/SearchDialog";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    {
      name: "Smartphones",
      path: "/category/smartphones",
      subcategories: [
        { name: "Samsung", path: "/category/smartphones/samsung" },
        { name: "Redmi", path: "/category/smartphones/redmi" },
        { name: "Itel", path: "/category/smartphones/itel" },
        { name: "Tecno", path: "/category/smartphones/tecno" },
        { name: "Realme", path: "/category/smartphones/realme" },
        { name: "Nokia", path: "/category/smartphones/nokia" },
      ],
    },
    {
      name: "Laptops",
      path: "/category/laptops",
      subcategories: [
        { name: "HP", path: "/category/laptops/hp" },
        { name: "Lenovo", path: "/category/laptops/lenovo" },
        { name: "Dell", path: "/category/laptops/dell" },
        { name: "Asus", path: "/category/laptops/asus" },
        { name: "Acer", path: "/category/laptops/acer" },
        { name: "MacBook", path: "/category/laptops/macbook" },
      ],
    },
    {
      name: "Tablets",
      path: "/category/tablets",
      subcategories: [
        { name: "iPad", path: "/category/tablets/ipad" },
        { name: "Samsung Tab", path: "/category/tablets/samsung-tab" },
        { name: "Lenovo Tab", path: "/category/tablets/lenovo-tab" },
        { name: "Amazon Fire", path: "/category/tablets/amazon-fire" },
        { name: "Huawei Tab", path: "/category/tablets/huawei-tab" },
      ],
    },
    {
      name: "Accessories",
      path: "/category/accessories",
      subcategories: [
        { name: "AirPods", path: "/category/accessories/airpods" },
        { name: "Earphones", path: "/category/accessories/earphones" },
        { name: "Neckbands", path: "/category/accessories/neckbands" },
        { name: "Phone Covers", path: "/category/accessories/phone-covers" },
        { name: "Chargers", path: "/category/accessories/chargers" },
        { name: "Power Banks", path: "/category/accessories/power-banks" },
        { name: "MiFi", path: "/category/accessories/mifi" },
      ],
    },
    {
      name: "Laptop Accessories",
      path: "/category/laptop-accessories",
      subcategories: [
        { name: "Laptop Power Bank", path: "/category/laptop-accessories/power-bank" },
        { name: "Charger", path: "/category/laptop-accessories/charger" },
        { name: "SSD", path: "/category/laptop-accessories/ssd" },
        { name: "HDD", path: "/category/laptop-accessories/hdd" },
        { name: "Mouse", path: "/category/laptop-accessories/mouse" },
        { name: "Laptop Bag", path: "/category/laptop-accessories/bag" },
      ],
    },
    {
      name: "Tablet Accessories",
      path: "/category/tablet-accessories",
      subcategories: [
        { name: "Stylus Pen", path: "/category/tablet-accessories/stylus-pen" },
        { name: "Keyboard Case", path: "/category/tablet-accessories/keyboard-case" },
        { name: "Tablet Cover", path: "/category/tablet-accessories/cover" },
        { name: "Charger", path: "/category/tablet-accessories/charger" },
      ],
    },
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
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.path}>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-muted data-[state=open]:bg-muted">
                    {item.name}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[200px] p-2">
                      {item.subcategories?.map((sub) => (
                        <Link
                          key={sub.path}
                          to={sub.path}
                          className="block px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

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
                <div key={item.path}>
                  <div className="px-4 py-2 text-sm font-semibold text-foreground">
                    {item.name}
                  </div>
                  <div className="pl-6 space-y-1">
                    {item.subcategories?.map((sub) => (
                      <Link
                        key={sub.path}
                        to={sub.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-2 rounded-md text-sm transition-colors text-muted-foreground hover:bg-muted hover:text-foreground"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
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
