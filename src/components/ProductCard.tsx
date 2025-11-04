import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  stock: number;
}

const ProductCard = ({ id, name, description, price, image_url, category, stock }: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg border-border">
      <Link to={`/products/${id}`}>
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={image_url}
            alt={name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <div className="mb-2">
          <span className="text-xs font-medium text-primary uppercase tracking-wider">
            {category}
          </span>
        </div>
        <Link to={`/products/${id}`}>
          <h3 className="text-lg font-semibold mb-2 line-clamp-1 group-hover:text-primary transition-colors">
            {name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{description}</p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-primary">KSh {price.toLocaleString()}</span>
            <p className="text-xs text-muted-foreground">{stock} in stock</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" disabled={stock === 0}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          {stock > 0 ? "Add to Cart" : "Out of Stock"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
