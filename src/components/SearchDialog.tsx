import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const SearchDialog = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["search-products", searchQuery],
    queryFn: async () => {
      if (!searchQuery.trim()) return [];
      
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .or(`name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%,category.ilike.%${searchQuery}%`)
        .limit(10);

      if (error) throw error;
      return data;
    },
    enabled: searchQuery.length > 0,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Search className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Search Products</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Search by name, description, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
            autoFocus
          />
          
          <div className="max-h-[400px] overflow-y-auto space-y-2">
            {isLoading && <p className="text-sm text-muted-foreground">Searching...</p>}
            
            {!isLoading && searchQuery && searchResults?.length === 0 && (
              <p className="text-sm text-muted-foreground">No products found</p>
            )}
            
            {!isLoading && searchResults && searchResults.length > 0 && (
              <div className="space-y-2">
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    to={`/products/${product.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-4 p-3 rounded-lg border hover:bg-muted transition-colors"
                  >
                    <img
                      src={product.image_url || ""}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{product.name}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {product.description}
                      </p>
                      <p className="text-sm font-bold text-primary mt-1">
                        KSh {Number(product.price).toLocaleString()}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
