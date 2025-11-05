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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Announcements Carousel */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
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
                      className={`bg-gradient-to-r ${announcement.bgColor} rounded-lg p-12 text-center text-white`}
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
