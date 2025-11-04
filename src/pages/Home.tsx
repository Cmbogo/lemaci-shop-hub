import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Home = () => {
  const { data: featuredProducts, isLoading } = useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("featured", true)
        .limit(3);

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container mx-auto px-4 lg:px-8 py-20 lg:py-32">
            <div className="max-w-3xl">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Welcome to Lemaci
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Discover premium electronics and accessories that enhance your lifestyle. Quality products, competitive prices, exceptional service.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild className="shadow-lg">
                  <Link to="/products">
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Fast Delivery</h3>
                <p className="text-sm text-muted-foreground">
                  Quick and reliable shipping to get your products to you on time
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6">
                <div className="h-16 w-16 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Quality Guaranteed</h3>
                <p className="text-sm text-muted-foreground">
                  All products are carefully selected and quality-tested
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Truck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Easy Returns</h3>
                <p className="text-sm text-muted-foreground">
                  Hassle-free returns within 30 days of purchase
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
                <p className="text-muted-foreground">
                  Check out our most popular items
                </p>
              </div>
              <Button variant="outline" asChild>
                <Link to="/products">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-96 rounded-lg bg-muted animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProducts?.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    description={product.description || ""}
                    price={Number(product.price)}
                    image_url={product.image_url || ""}
                    category={product.category || ""}
                    stock={product.stock || 0}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Upgrade Your Tech?
            </h2>
            <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
              Browse our full collection of premium electronics and accessories
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/products">
                Explore Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
