import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart, Package } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const handleAddToCart = () => {
    toast.success("Added to cart!");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-8 w-32 bg-muted rounded mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="aspect-square bg-muted rounded-lg" />
              <div className="space-y-4">
                <div className="h-8 w-3/4 bg-muted rounded" />
                <div className="h-4 w-1/4 bg-muted rounded" />
                <div className="h-32 bg-muted rounded" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 lg:px-8 py-12">
          <p className="text-center text-lg">Product not found</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 lg:px-8 py-12">
        <Button variant="ghost" asChild className="mb-8">
          <Link to="/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="aspect-square overflow-hidden rounded-lg bg-muted">
            <img
              src={product.image_url || ""}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-4">
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                {product.category}
              </span>
            </div>

            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

            <div className="mb-6">
              <span className="text-4xl font-bold text-primary">
                KSh {Number(product.price).toLocaleString()}
              </span>
            </div>

            <p className="text-lg text-muted-foreground mb-6">
              {product.description}
            </p>

            <div className="flex items-center gap-2 mb-8 text-sm">
              <Package className="h-5 w-5 text-muted-foreground" />
              <span>
                {product.stock > 0 ? (
                  <span className="text-green-600 font-medium">
                    {product.stock} in stock
                  </span>
                ) : (
                  <span className="text-destructive font-medium">Out of stock</span>
                )}
              </span>
            </div>

            <div className="space-y-4">
              <Button
                size="lg"
                className="w-full"
                disabled={product.stock === 0}
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>

            {/* Additional Info */}
            <div className="mt-12 space-y-4 border-t pt-8">
              <h3 className="font-semibold text-lg">Product Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Category:</span>
                  <p className="font-medium">{product.category}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Availability:</span>
                  <p className="font-medium">
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
