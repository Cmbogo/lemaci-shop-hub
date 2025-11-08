import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

// Import brand images
import hpLaptop from "@/assets/brands/hp-laptop.jpg";
import lenovoLaptop from "@/assets/brands/lenovo-laptop.jpg";
import dellLaptop from "@/assets/brands/dell-laptop.jpg";
import asusLaptop from "@/assets/brands/asus-laptop.jpg";
import acerLaptop from "@/assets/brands/acer-laptop.jpg";
import macbook from "@/assets/brands/macbook.jpg";
import samsungPhone from "@/assets/brands/samsung-phone.jpg";
import redmiPhone from "@/assets/brands/redmi-phone.jpg";
import airpods from "@/assets/brands/airpods.jpg";
import ipad from "@/assets/brands/ipad.jpg";

// Map subcategories to their brand images
const subcategoryImages: Record<string, string> = {
  hp: hpLaptop,
  lenovo: lenovoLaptop,
  dell: dellLaptop,
  asus: asusLaptop,
  acer: acerLaptop,
  macbook: macbook,
  samsung: samsungPhone,
  redmi: redmiPhone,
  airpods: airpods,
  ipad: ipad,
};

// Map URL-friendly names to display names
const subcategoryDisplayNames: Record<string, string> = {
  hp: "HP",
  lenovo: "Lenovo",
  dell: "Dell",
  asus: "Asus",
  acer: "Acer",
  macbook: "MacBook",
  samsung: "Samsung",
  redmi: "Redmi",
  itel: "Itel",
  tecno: "Tecno",
  realme: "Realme",
  nokia: "Nokia",
  airpods: "AirPods",
  earphones: "Earphones",
  neckbands: "Neckbands",
  "phone-covers": "Phone Covers",
  chargers: "Chargers",
  "power-banks": "Power Banks",
  mifi: "MiFi",
  "laptop-power-bank": "Laptop Power Bank",
  ssd: "SSD",
  hdd: "HDD",
  mouse: "Mouse",
  "laptop-bag": "Laptop Bag",
  ipad: "iPad",
  "samsung-tab": "Samsung Tab",
  "lenovo-tab": "Lenovo Tab",
  "amazon-fire": "Amazon Fire",
  "huawei-tab": "Huawei Tab",
  "stylus-pen": "Stylus Pen",
  "keyboard-case": "Keyboard Case",
  "tablet-cover": "Tablet Cover",
};

const SubcategoryPage = () => {
  const { category, subcategory } = useParams();

  const { data: products, isLoading } = useQuery({
    queryKey: ["products", category, subcategory],
    queryFn: async () => {
      // For now, we'll filter by category since we don't have a subcategory field
      // You may need to add a subcategory/brand field to your products table
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("category", category);

      if (error) throw error;
      return data;
    },
  });

  const displayName = subcategoryDisplayNames[subcategory || ""] || subcategory;
  const heroImage = subcategoryImages[subcategory || ""];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        {heroImage && (
          <section className="relative h-[300px] bg-muted overflow-hidden">
            <img
              src={heroImage}
              alt={displayName}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-background/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                  {displayName}
                </h1>
                <p className="text-lg text-foreground/80">
                  Browse our collection of {displayName} products
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Products Grid */}
        <section className="container mx-auto px-4 py-12">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-square w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : products && products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">
                No products found in this subcategory yet.
              </p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SubcategoryPage;
