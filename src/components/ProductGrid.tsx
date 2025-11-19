import { useState } from "react";
import { ProductCard, Product } from "./ProductCard";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Search } from "lucide-react";
import poundedYamImage from "figma:asset/cbf991e087782d59a8d43db7ea974dae59f7b0bf.png";
import zoboDrinkImage from "figma:asset/6c5d4b4969e4b45f77cf851756a992b80c436ef9.png";
import kunuDrinkImage from "figma:asset/d2ed77efdef7c8f9c8fc000c2ef1ee87baeaaf7f.png";
import suyaImage from "figma:asset/c1f22cabbc3674144e7139e3f04fd7e666e4fe1a.png";
import pepperSoupImage from "figma:asset/d0e99c9968dc459e8853b07b41ad757cdbfae30f.png";
import friedPlantainImage from "figma:asset/909eba90501e3367a19ebe67e9c774d678b642a1.png";
import egusiSoupImage from "figma:asset/88ecc20f6a65df3a0470a219e8246a9a2746d8bd.png";
import palmWineImage from "figma:asset/9d703f5baf9a13b79a543ecf614184ac6a82caff.png";
import furaDaNonoImage from "figma:asset/639109041bce6c17202a3ced074ed4816d232306.png";

// Sample Nigerian dishes and drinks data
const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Jollof Rice",
    description: "Traditional Nigerian jollof rice with rich tomato base, spices, and vegetables. A beloved West African staple.",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1664993101841-036f189719b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqb2xsb2YlMjByaWNlJTIwbmlnZXJpYW58ZW58MXx8fHwxNzYzMTA3NjY5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Rice Dishes",
    inStock: true
  },
  {
    id: "2",
    name: "Pounded Yam & Egusi",
    description: "Authentic pounded yam served with rich egusi soup made with ground melon seeds and vegetables.",
    price: 18.99,
    image: poundedYamImage,
    category: "Traditional Meals",
    inStock: true
  },
  {
    id: "3",
    name: "Suya Platter",
    description: "Spiced grilled beef skewers seasoned with ground peanuts, chili peppers, and traditional spices.",
    price: 15.49,
    image: suyaImage,
    category: "Grilled",
    inStock: true
  },
  {
    id: "4",
    name: "Pepper Soup",
    description: "Spicy and aromatic Nigerian pepper soup with assorted meat, perfect for warming the soul.",
    price: 13.99,
    image: pepperSoupImage,
    category: "Soups",
    inStock: true
  },
  {
    id: "5",
    name: "Fried Plantain (Dodo)",
    description: "Sweet fried plantain slices, golden and caramelized to perfection. A popular Nigerian side dish.",
    price: 8.99,
    image: friedPlantainImage,
    category: "Sides",
    inStock: true
  },
  {
    id: "6",
    name: "Egusi Soup",
    description: "Traditional Nigerian soup made with ground melon seeds, leafy vegetables, and assorted meat.",
    price: 16.99,
    image: egusiSoupImage,
    category: "Soups",
    inStock: true
  },
  {
    id: "7",
    name: "Zobo Drink",
    description: "Refreshing hibiscus drink infused with natural spices, ginger, and fruits. A healthy Nigerian beverage.",
    price: 4.99,
    image: zoboDrinkImage,
    category: "Drinks",
    inStock: true
  },
  {
    id: "8",
    name: "Kunu Drink",
    description: "Traditional Nigerian millet-based drink, creamy and nutritious with a hint of ginger and spices.",
    price: 3.99,
    image: kunuDrinkImage,
    category: "Drinks",
    inStock: true
  },
  {
    id: "9",
    name: "Palm Wine",
    description: "Traditional fermented palm sap wine, naturally sweet with a unique taste. An authentic African drink.",
    price: 6.99,
    image: palmWineImage,
    category: "Drinks",
    inStock: true
  },
  {
    id: "10",
    name: "Fura da Nono",
    description: "Traditional Hausa drink made with millet balls (fura) and fresh cow milk (nono). Creamy and nutritious.",
    price: 5.49,
    image: furaDaNonoImage,
    category: "Drinks",
    inStock: true
  }
];

interface ProductGridProps {
  onAddToCart: (product: Product) => void;
}

export function ProductGrid({ onAddToCart }: ProductGridProps) {
  const [products] = useState<Product[]>(sampleProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="products" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl">
            Authentic <span className="text-primary">Nigerian Food & Drinks</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the rich flavors of Nigeria with our traditional dishes and refreshing drinks, prepared with authentic recipes and delivered fresh to your door.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search Nigerian food & drinks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="md:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
}