import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { ArrowLeft, Plus, Edit, Trash2, Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { toast } from "sonner@2.0.3";

interface MenuManagementPageProps {
  onBack: () => void;
  onLogout: () => void;
  user: { email: string; name: string };
}

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  available: boolean;
}

export function MenuManagementPage({ onBack, onLogout }: MenuManagementPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: "1",
      name: "Jollof Rice",
      description: "Classic Nigerian party rice with rich tomato flavor",
      price: 18.99,
      category: "main",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe",
      available: true
    },
    {
      id: "2",
      name: "Pounded Yam & Egusi",
      description: "Traditional pounded yam served with rich egusi soup",
      price: 24.99,
      category: "main",
      image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26",
      available: true
    },
    {
      id: "3",
      name: "Suya Platter",
      description: "Spicy grilled meat skewers with authentic Nigerian spices",
      price: 22.99,
      category: "main",
      image: "https://images.unsplash.com/photo-1529042410759-befb1204b468",
      available: true
    },
    {
      id: "4",
      name: "Pepper Soup",
      description: "Aromatic and spicy Nigerian pepper soup",
      price: 15.99,
      category: "soup",
      image: "https://images.unsplash.com/photo-1547592166-23ac45744acd",
      available: true
    },
    {
      id: "5",
      name: "Zobo Drink",
      description: "Refreshing hibiscus tea drink",
      price: 5.99,
      category: "drink",
      image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc",
      available: true
    }
  ]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "main",
    image: "",
    available: true
  });

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "main", label: "Main Dishes" },
    { value: "soup", label: "Soups" },
    { value: "drink", label: "Drinks" },
    { value: "side", label: "Sides" }
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.description || !formData.price) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (editingItem) {
      // Update existing item
      setMenuItems(prev => prev.map(item => 
        item.id === editingItem.id 
          ? { ...item, ...formData, price: parseFloat(formData.price) }
          : item
      ));
      toast.success("Menu item updated successfully!");
    } else {
      // Add new item
      const newItem: MenuItem = {
        id: Date.now().toString(),
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        image: formData.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
        available: formData.available
      };
      setMenuItems(prev => [...prev, newItem]);
      toast.success("Menu item added successfully!");
    }

    // Reset form
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "main",
      image: "",
      available: true
    });
    setEditingItem(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      category: item.category,
      image: item.image,
      available: item.available
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
    toast.success("Menu item deleted successfully!");
  };

  const toggleAvailability = (id: string) => {
    setMenuItems(prev => prev.map(item =>
      item.id === id ? { ...item, available: !item.available } : item
    ));
  };

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/20 to-amber-50/20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-orange-100 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={onBack}
                className="hover:bg-orange-50 hover:text-orange-600"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-2xl bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  Menu Management
                </h1>
                <p className="text-sm text-muted-foreground">Add, edit, and manage menu items 🍽️</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={onLogout}
              className="border-orange-200 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-300"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setEditingItem(null);
                setFormData({
                  name: "",
                  description: "",
                  price: "",
                  category: "main",
                  image: "",
                  available: true
                });
              }}>
                <Plus className="h-4 w-4 mr-2" />
                Add Menu Item
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingItem ? "Edit Menu Item" : "Add New Menu Item"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Item Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="e.g., Jollof Rice"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Describe the dish..."
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Price ($) *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="main">Main Dishes</SelectItem>
                        <SelectItem value="soup">Soups</SelectItem>
                        <SelectItem value="drink">Drinks</SelectItem>
                        <SelectItem value="side">Sides</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="image">Image URL (Optional)</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => handleInputChange("image", e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="available"
                    checked={formData.available}
                    onChange={(e) => handleInputChange("available", e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor="available">Available for ordering</Label>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSubmit}>
                    {editingItem ? "Update Item" : "Add Item"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Menu Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <Card 
              key={item.id} 
              className={`group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${
                !item.available ? "opacity-60 grayscale" : ""
              }`}
            >
              <CardHeader className="p-0 relative">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                {!item.available && (
                  <div className="absolute top-3 right-3">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Unavailable
                    </span>
                  </div>
                )}
              </CardHeader>
              <CardContent className="pt-4">
                <div className="mb-3">
                  <h3 className="text-lg mb-1 group-hover:text-orange-600 transition-colors">{item.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-2xl bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                    ${item.price}
                  </p>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.category === 'main' ? 'bg-orange-100 text-orange-700' :
                    item.category === 'soup' ? 'bg-yellow-100 text-yellow-700' :
                    item.category === 'drink' ? 'bg-blue-100 text-blue-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {categories.find(c => c.value === item.category)?.label || item.category}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={item.available}
                      onChange={() => toggleAvailability(item.id)}
                      className="rounded accent-orange-600"
                    />
                    <span className="text-sm text-slate-600">Available</span>
                  </div>
                  <div className="flex space-x-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleEdit(item)}
                      className="hover:bg-orange-50 hover:text-orange-600"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDelete(item.id)}
                      className="hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <Card className="p-12 text-center border-0 shadow-lg">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-orange-600" />
              </div>
              <p className="text-muted-foreground">No menu items found matching your criteria.</p>
              <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters or search term.</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}