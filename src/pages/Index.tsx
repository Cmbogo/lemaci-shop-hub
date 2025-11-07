import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import heroBg from "@/assets/hero-bg.png";

const Index = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["all-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const featuredLaptops = products?.filter(p => p.category === 'laptops') || [];
  const featuredWatches = products?.filter(p => p.category === 'smartwatches') || [];
  const featuredTablets = products?.filter(p => p.category === 'tablets') || [];
  const featuredPhones = products?.filter(p => p.category === 'smartphones' || p.category === 'phones') || [];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden min-h-[400px] flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroBg})` }}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="text-center text-white">
              <h1 className="text-4xl lg:text-6xl font-bold mb-4">
                Welcome to Lemaci
              </h1>
              <p className="text-lg lg:text-2xl text-white/90">
                Your trusted tech destination
              </p>
            </div>
          </div>
        </section>

        {/* Featured Laptops */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">Featured Laptops</h2>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 3000,
                }),
              ]}
              className="w-full"
            >
              <CarouselContent className="-ml-1 md:-ml-2">
                {featuredLaptops.map((laptop) => (
                  <CarouselItem
                    key={laptop.id}
                    className="pl-1 md:pl-2 basis-1/2 sm:basis-1/3 lg:basis-1/4"
                  >
                    <div className="rounded-lg overflow-hidden bg-card border border-border hover:shadow-lg transition-shadow">
                      <img
                        src={laptop.image_url}
                        alt={laptop.name}
                        className="w-full h-auto object-cover max-h-48"
                      />
                      <div className="p-3">
                        <p className="text-sm font-medium line-clamp-1 mb-1">{laptop.name}</p>
                        <p className="text-lg font-bold text-primary">KSh {Number(laptop.price).toLocaleString()}</p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </Carousel>
          </div>
        </section>

        {/* Featured Smartwatches */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">Featured Smartwatches</h2>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 3000,
                }),
              ]}
              className="w-full"
            >
              <CarouselContent className="-ml-1 md:-ml-2">
                {featuredWatches.map((watch) => (
                  <CarouselItem
                    key={watch.id}
                    className="pl-1 md:pl-2 basis-1/2 sm:basis-1/3 lg:basis-1/4"
                  >
                    <div className="rounded-lg overflow-hidden bg-card border border-border hover:shadow-lg transition-shadow">
                      <img
                        src={watch.image_url}
                        alt={watch.name}
                        className="w-full h-auto object-cover max-h-48"
                      />
                      <div className="p-3">
                        <p className="text-sm font-medium line-clamp-1 mb-1">{watch.name}</p>
                        <p className="text-lg font-bold text-primary">KSh {Number(watch.price).toLocaleString()}</p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </Carousel>
          </div>
        </section>

        {/* Featured Tablets */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">Featured Tablets</h2>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 3000,
                }),
              ]}
              className="w-full"
            >
              <CarouselContent className="-ml-1 md:-ml-2">
                {featuredTablets.map((tablet) => (
                  <CarouselItem
                    key={tablet.id}
                    className="pl-1 md:pl-2 basis-1/2 sm:basis-1/3 lg:basis-1/4"
                  >
                    <div className="rounded-lg overflow-hidden bg-card border border-border hover:shadow-lg transition-shadow">
                      <img
                        src={tablet.image_url}
                        alt={tablet.name}
                        className="w-full h-auto object-cover max-h-48"
                      />
                      <div className="p-3">
                        <p className="text-sm font-medium line-clamp-1 mb-1">{tablet.name}</p>
                        <p className="text-lg font-bold text-primary">KSh {Number(tablet.price).toLocaleString()}</p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </Carousel>
          </div>
        </section>

        {/* Featured Smartphones */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">Featured Smartphones</h2>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 3000,
                }),
              ]}
              className="w-full"
            >
              <CarouselContent className="-ml-1 md:-ml-2">
                {featuredPhones.map((phone) => (
                  <CarouselItem
                    key={phone.id}
                    className="pl-1 md:pl-2 basis-1/2 sm:basis-1/3 lg:basis-1/4"
                  >
                    <div className="rounded-lg overflow-hidden bg-card border border-border hover:shadow-lg transition-shadow">
                      <div className="aspect-square overflow-hidden bg-muted flex items-center justify-center p-4">
                        <img
                          src={phone.image_url}
                          alt={phone.name}
                          className="w-auto h-full object-contain max-h-48"
                        />
                      </div>
                      <div className="p-3">
                        <p className="text-sm font-medium line-clamp-1 mb-1">{phone.name}</p>
                        <p className="text-lg font-bold text-primary">KSh {Number(phone.price).toLocaleString()}</p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </Carousel>
          </div>
        </section>

        {/* Products by Category */}
        {isLoading ? (
          <section className="py-12">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="h-96 rounded-lg bg-muted animate-pulse" />
            </div>
          </section>
        ) : (
          <>
            {["Laptop Accessories", "Smartphones", "Phones"].map((category) => {
              const categoryProducts = products?.filter(
                (p) => p.category?.toLowerCase() === category.toLowerCase()
              );

              if (!categoryProducts || categoryProducts.length === 0) return null;

              return (
                <section key={category} className="py-12">
                  <div className="container mx-auto px-4 lg:px-8">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-8">{category}</h2>
                    <Carousel
                      opts={{
                        align: "start",
                        loop: true,
                      }}
                      plugins={[
                        Autoplay({
                          delay: 3000,
                        }),
                      ]}
                      className="w-full"
                    >
                      <CarouselContent className="-ml-2 md:-ml-4">
                        {categoryProducts.map((product) => (
                          <CarouselItem
                            key={product.id}
                            className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                          >
                            <ProductCard
                              id={product.id}
                              name={product.name}
                              description={product.description || ""}
                              price={Number(product.price)}
                              image_url={product.image_url || ""}
                              category={product.category || ""}
                              stock={product.stock || 0}
                            />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="left-0" />
                      <CarouselNext className="right-0" />
                    </Carousel>
                  </div>
                </section>
              );
            })}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
