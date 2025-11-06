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
import oraimoWatch1 from "@/assets/oraimo-watch-1.jpg";
import oraimoWatch2 from "@/assets/oraimo-watch-2.jpg";
import oraimoWatch3 from "@/assets/oraimo-watch-3.jpg";
import oraimoWatch4 from "@/assets/oraimo-watch-4.jpg";
import phone1 from "@/assets/phone-1.jpg";
import phone2 from "@/assets/phone-2.jpg";
import phone3 from "@/assets/phone-3.jpg";
import heroBg from "@/assets/hero-bg.png";
import laptop1 from "@/assets/laptop-1.jpg";
import laptop2 from "@/assets/laptop-2.jpg";
import laptop3 from "@/assets/laptop-3.jpg";
import laptop4 from "@/assets/laptop-4.jpg";
import tablet1 from "@/assets/tablet-1.jpg";
import tablet2 from "@/assets/tablet-2.webp";
import tablet3 from "@/assets/tablet-3.jpg";
import tablet4 from "@/assets/tablet-4.jpg";

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

  const featuredLaptops = [
    { id: 1, image: laptop1, alt: "HP Laptop 250 G7", price: 35999 },
    { id: 2, image: laptop2, alt: "HP Laptop 15s", price: 42999 },
    { id: 3, image: laptop3, alt: "HP ProBook 440 G8", price: 48999 },
    { id: 4, image: laptop4, alt: "HP 15s Lite", price: 38999 },
  ];

  const featuredWatches = [
    { id: 1, image: oraimoWatch1, alt: "Oraimo Watch Nova AM", price: 3999 },
    { id: 2, image: oraimoWatch2, alt: "Oraimo Watch 2R", price: 4499 },
    { id: 3, image: oraimoWatch3, alt: "Oraimo Watch ER", price: 3799 },
    { id: 4, image: oraimoWatch4, alt: "Oraimo Watch 2R", price: 4299 },
  ];

  const featuredTablets = [
    { id: 1, image: tablet1, alt: "Xtigi Kids Tablet", price: 8999 },
    { id: 2, image: tablet2, alt: "Modio Kids Tablet", price: 9499 },
    { id: 3, image: tablet3, alt: "Droipad Tablet", price: 11999 },
    { id: 4, image: tablet4, alt: "Megapad Tablet", price: 13499 },
  ];

  const featuredPhones = [
    { id: 1, image: phone1, alt: "Redmi 15C", price: 12999 },
    { id: 2, image: phone2, alt: "Redmi Note 14", price: 18999 },
    { id: 3, image: phone3, alt: "Redmi 14C", price: 15499 },
  ];

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
                        src={laptop.image}
                        alt={laptop.alt}
                        className="w-full h-auto object-cover max-h-48"
                      />
                      <div className="p-3">
                        <p className="text-sm font-medium line-clamp-1 mb-1">{laptop.alt}</p>
                        <p className="text-lg font-bold text-primary">KSh {laptop.price.toLocaleString()}</p>
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
                        src={watch.image}
                        alt={watch.alt}
                        className="w-full h-auto object-cover max-h-48"
                      />
                      <div className="p-3">
                        <p className="text-sm font-medium line-clamp-1 mb-1">{watch.alt}</p>
                        <p className="text-lg font-bold text-primary">KSh {watch.price.toLocaleString()}</p>
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
                        src={tablet.image}
                        alt={tablet.alt}
                        className="w-full h-auto object-cover max-h-48"
                      />
                      <div className="p-3">
                        <p className="text-sm font-medium line-clamp-1 mb-1">{tablet.alt}</p>
                        <p className="text-lg font-bold text-primary">KSh {tablet.price.toLocaleString()}</p>
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

        {/* Featured Phones */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">Featured Phones</h2>
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
                    className="pl-1 md:pl-2 basis-1/2 sm:basis-1/3 lg:basis-1/3"
                  >
                    <div className="rounded-lg overflow-hidden bg-card border border-border hover:shadow-lg transition-shadow">
                      <img
                        src={phone.image}
                        alt={phone.alt}
                        className="w-full h-auto object-cover max-h-48"
                      />
                      <div className="p-3">
                        <p className="text-sm font-medium line-clamp-1 mb-1">{phone.alt}</p>
                        <p className="text-lg font-bold text-primary">KSh {phone.price.toLocaleString()}</p>
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
