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

  const announcements = [
    {
      title: "Black Friday Sale!",
      description: "Get up to 50% off on selected items",
      bgColor: "from-primary to-primary/80",
    },
    {
      title: "New Arrivals",
      description: "Check out the latest smartphones and laptops",
      bgColor: "from-secondary to-secondary/80",
    },
    {
      title: "Free Delivery",
      description: "On orders above KSh 10,000",
      bgColor: "from-primary/80 to-secondary/80",
    },
  ];

  const featuredWatches = [
    { id: 1, image: oraimoWatch1, alt: "Oraimo Watch Nova AM", price: 3999 },
    { id: 2, image: oraimoWatch2, alt: "Oraimo Watch 2R", price: 4499 },
    { id: 3, image: oraimoWatch3, alt: "Oraimo Watch ER", price: 3799 },
    { id: 4, image: oraimoWatch4, alt: "Oraimo Watch 2R", price: 4299 },
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
        {/* Announcements Carousel */}
        <section className="py-8 bg-muted/30 relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${oraimoWatch1})` }}
          />
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <Carousel
              plugins={[
                Autoplay({
                  delay: 4000,
                }),
              ]}
              className="w-full"
            >
              <CarouselContent>
                {announcements.map((announcement, index) => (
                  <CarouselItem key={index}>
                    <div
                      className={`bg-gradient-to-r ${announcement.bgColor} rounded-lg p-12 text-center text-white backdrop-blur-sm`}
                    >
                      <h2 className="text-3xl lg:text-4xl font-bold mb-2">
                        {announcement.title}
                      </h2>
                      <p className="text-lg lg:text-xl text-white/90">
                        {announcement.description}
                      </p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
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

        {/* Featured Phones */}
        <section className="py-12 bg-muted/30">
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
