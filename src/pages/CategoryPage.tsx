import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useParams } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CategoryPage = () => {
  const { category } = useParams();
  
  // Convert URL format to database format
  const categoryMap: Record<string, string> = {
    "smartphones": "smartphones",
    "laptops": "laptops",
    "tablets": "tablets",
    "smartwatches": "smartwatches",
    "laptop-accessories": "laptop accessories",
    "phone-accessories": "phone accessories",
    "tablet-accessories": "tablet accessories",
  };

  const dbCategory = categoryMap[category || ""];

  const { data: products, isLoading } = useQuery({
    queryKey: ["products", dbCategory],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("category", dbCategory)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!dbCategory,
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="py-12 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="container mx-auto px-4 lg:px-8">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 capitalize">{dbCategory}</h1>
            <p className="text-xl text-muted-foreground">
              Browse our collection of {dbCategory}
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4 lg:px-8">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="h-96 rounded-lg bg-muted animate-pulse" />
                ))}
              </div>
            ) : products && products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
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
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  No products found in this category.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;
