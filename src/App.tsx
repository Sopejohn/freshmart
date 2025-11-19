import { useState } from "react";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { ProductGrid } from "./components/ProductGrid";
import { AboutSection } from "./components/AboutSection";
import { ContactSection } from "./components/ContactSection";
import {
  CheckoutForm,
  CheckoutFormData,
} from "./components/CheckoutForm";
import { LoginForm } from "./components/LoginForm";
import { Footer } from "./components/Footer";
import { CartItem } from "./components/Cart";
import { Product } from "./components/ProductCard";
import { toast, Toaster } from "sonner@2.0.3";
import { AboutPage } from "./components/pages/AboutPage";
import { PrivacyPage } from "./components/pages/PrivacyPage";
import { TermsPage } from "./components/pages/TermsPage";
import { HelpCenterPage } from "./components/pages/HelpCenterPage";
import { AdminDashboard } from "./components/admin/AdminDashboard";

interface User {
  email: string;
  name: string;
  role?: string;
}

type PageView =
  | "home"
  | "checkout"
  | "login"
  | "about"
  | "privacy"
  | "terms"
  | "help"
  | "admin";

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [currentPage, setCurrentPage] =
    useState<PageView>("home");
  const [user, setUser] = useState<User | null>(null);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find(
        (item) => item.id === product.id,
      );
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image,
        },
      ];
    });
    toast.success(`${product.name} added to cart!`);
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item,
      ),
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prev) =>
      prev.filter((item) => item.id !== id),
    );
    toast.success("Item removed from cart");
  };

  const handleCheckout = () => {
    if (!user) {
      toast.error("Please sign in to continue with checkout");
      setCurrentPage("login");
      return;
    }
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    setCurrentPage("checkout");
  };

  const handleCheckoutSubmit = (formData: CheckoutFormData) => {
    // Here you would typically send the order to your backend
    const orderTotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const finalTotal =
      orderTotal + 5.99 + orderTotal * 0.08 + formData.tip; // subtotal + shipping + tax + tip
    console.log("Order submitted:", {
      items: cartItems,
      customerInfo: formData,
      tip: formData.tip,
      total: finalTotal.toFixed(2),
    });
    toast.success(
      `Order placed successfully! Total: ${finalTotal.toFixed(2)}. You'll receive a confirmation email shortly.`,
    );
    setCartItems([]);
    setCurrentPage("home");
  };

  const handleBackToShopping = () => {
    setCurrentPage("home");
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    // If user is admin, redirect to admin dashboard
    if (userData.role === "admin") {
      setCurrentPage("admin");
    } else {
      setCurrentPage("home");
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCartItems([]); // Clear cart on logout
    setCurrentPage("home");
    toast.success("Successfully logged out");
  };

  const handleShowLogin = () => {
    setCurrentPage("login");
    setIsLoginMode(true);
  };

  const handleToggleLoginMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  const handlePageChange = (page: PageView) => {
    setCurrentPage(page);
  };

  // Show login page
  if (currentPage === "login") {
    return (
      <>
        <LoginForm
          onLogin={handleLogin}
          onToggleMode={handleToggleLoginMode}
          isLoginMode={isLoginMode}
        />
        <Toaster />
      </>
    );
  }

  // Show checkout page
  if (currentPage === "checkout") {
    return (
      <div className="min-h-screen">
        <CheckoutForm
          items={cartItems}
          onBack={handleBackToShopping}
          onSubmit={handleCheckoutSubmit}
        />
        <Toaster />
      </div>
    );
  }

  // Show about page
  if (currentPage === "about") {
    return (
      <div className="min-h-screen">
        <AboutPage onBack={handleBackToShopping} />
        <Toaster />
      </div>
    );
  }

  // Show privacy page
  if (currentPage === "privacy") {
    return (
      <div className="min-h-screen">
        <PrivacyPage onBack={handleBackToShopping} />
        <Toaster />
      </div>
    );
  }

  // Show terms page
  if (currentPage === "terms") {
    return (
      <div className="min-h-screen">
        <TermsPage onBack={handleBackToShopping} />
        <Toaster />
      </div>
    );
  }

  // Show help center page
  if (currentPage === "help") {
    return (
      <div className="min-h-screen">
        <HelpCenterPage onBack={handleBackToShopping} />
        <Toaster />
      </div>
    );
  }

  // Show admin dashboard
  if (currentPage === "admin") {
    return (
      <div className="min-h-screen">
        <AdminDashboard user={user!} onLogout={handleLogout} />
        <Toaster />
      </div>
    );
  }

  // Main app
  return (
    <div className="min-h-screen">
      <Header
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onCheckout={handleCheckout}
        user={user}
        onLogin={handleShowLogin}
        onLogout={handleLogout}
      />
      <main>
        <HeroSection />
        <div id="products">
          <ProductGrid onAddToCart={addToCart} />
        </div>
        <AboutSection />
        <ContactSection />
      </main>
      <Footer
        onNavigate={(page) => setCurrentPage(page as PageView)}
      />
      <Toaster />
    </div>
  );
}