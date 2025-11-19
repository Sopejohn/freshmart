import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { ArrowLeft, Award, Users, Heart, Leaf } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface AboutPageProps {
  onBack: () => void;
}

export function AboutPage({ onBack }: AboutPageProps) {
  const values = [
    {
      icon: Heart,
      title: "Passion for Food",
      description: "We're passionate about bringing authentic Nigerian cuisine to food lovers everywhere."
    },
    {
      icon: Users,
      title: "Community First",
      description: "Supporting local Nigerian chefs and connecting diaspora communities through food."
    },
    {
      icon: Award,
      title: "Quality Assured",
      description: "Every dish is prepared with authentic recipes and the freshest ingredients."
    },
    {
      icon: Leaf,
      title: "Sustainability",
      description: "We source responsibly and minimize waste to protect our environment."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b sticky top-0 bg-background z-10">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6">
            About <span className="text-primary">FreshMart</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your gateway to authentic Nigerian cuisine, delivered fresh to your doorstep
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  FreshMart was founded in 2024 with a simple mission: to make authentic Nigerian 
                  cuisine accessible to everyone, wherever they are. We started with a passion for 
                  traditional recipes and a dream to share the rich flavors of Nigeria with the world.
                </p>
                <p>
                  Today, we work with experienced Nigerian chefs who bring generations of culinary 
                  expertise to every dish. From the vibrant flavors of Jollof Rice to the comforting 
                  warmth of Pepper Soup, each meal is prepared with love and authenticity.
                </p>
                <p>
                  We believe food is more than sustenance—it's culture, memory, and connection. 
                  Whether you're Nigerian living abroad missing the taste of home, or someone 
                  discovering Nigerian cuisine for the first time, FreshMart is here to serve you.
                </p>
              </div>
            </div>
            <div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1509100226070-1744f3cd5642?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdlcmlhbiUyMGNoZWYlMjBjb29raW5nfGVufDF8fHx8MTc1ODA2MzYwNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Nigerian chef cooking"
                className="w-full h-96 md:h-[500px] object-cover rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do at FreshMart
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl text-primary mb-2">5000+</div>
              <div className="text-muted-foreground">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Authentic Dishes</div>
            </div>
            <div>
              <div className="text-4xl text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Customer Support</div>
            </div>
            <div>
              <div className="text-4xl text-primary mb-2">100%</div>
              <div className="text-muted-foreground">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
