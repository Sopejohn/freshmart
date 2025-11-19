import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Plus } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-2 hover:border-primary/20">
      <div className="relative overflow-hidden">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {!product.inStock && (
          <Badge className="absolute top-3 right-3 bg-destructive shadow-lg">
            Out of Stock
          </Badge>
        )}
        <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground shadow-md">
          {product.category}
        </Badge>
        {/* Gradient overlay for better text readability on images */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <CardHeader className="pb-3 pt-4">
        <CardTitle className="text-xl group-hover:text-primary transition-colors">{product.name}</CardTitle>
        <CardDescription className="text-sm line-clamp-2 leading-relaxed">
          {product.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-3">
        <div className="flex items-center justify-between">
          <span className="text-3xl text-primary">
            ${product.price.toFixed(2)}
          </span>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button 
          onClick={() => onAddToCart(product)}
          disabled={!product.inStock}
          className="w-full shadow-md hover:shadow-lg transition-all"
          size="lg"
        >
          <Plus className="h-5 w-5 mr-2" />
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </CardFooter>
    </Card>
  );
}
