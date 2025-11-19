import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ArrowLeft, HelpCircle, Package, CreditCard, Truck, Phone, Mail, MessageCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

interface HelpCenterPageProps {
  onBack: () => void;
}

export function HelpCenterPage({ onBack }: HelpCenterPageProps) {
  const faqs = [
    {
      question: "How do I place an order?",
      answer: "Simply browse our menu, add items to your cart, and proceed to checkout. You'll need to create an account or sign in to complete your order."
    },
    {
      question: "What are the delivery hours?",
      answer: "We deliver 7 days a week from 10 AM to 10 PM. Orders placed after 9 PM will be delivered the next day."
    },
    {
      question: "Is there a minimum order amount?",
      answer: "Yes, the minimum order amount is $15. Free delivery is available for orders over $50."
    },
    {
      question: "How long does delivery take?",
      answer: "Most deliveries arrive within 30-45 minutes. During peak hours, it may take up to 60 minutes."
    },
    {
      question: "Can I track my order?",
      answer: "Yes! Once your order is confirmed, you'll receive updates via email and can track your delivery in real-time."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, and digital payment methods including Apple Pay and Google Pay."
    },
    {
      question: "Do you cater for dietary restrictions?",
      answer: "Yes, please indicate any allergies or dietary restrictions in the order notes. However, we cannot guarantee zero cross-contamination."
    },
    {
      question: "What if my order is incorrect?",
      answer: "Contact us immediately at support@freshmart.com or call 1-800-FRESHMART. We'll make it right with a replacement or refund."
    },
    {
      question: "Can I cancel or modify my order?",
      answer: "Orders can be cancelled or modified within 5 minutes of placement. After that, please contact customer service."
    },
    {
      question: "Do you offer catering services?",
      answer: "Yes! For large orders or events, please contact us at least 48 hours in advance at catering@freshmart.com."
    }
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "1-800-FRESHMART",
      details: "Available 7 days a week, 9 AM - 9 PM"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "support@freshmart.com",
      details: "Response within 24 hours"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with us now",
      details: "Average response time: 2 minutes"
    }
  ];

  const topicCards = [
    {
      icon: Package,
      title: "Orders",
      description: "Track, modify, or cancel orders"
    },
    {
      icon: Truck,
      title: "Delivery",
      description: "Delivery areas, times, and fees"
    },
    {
      icon: CreditCard,
      title: "Payments",
      description: "Payment methods and billing"
    },
    {
      icon: HelpCircle,
      title: "Account",
      description: "Manage your account settings"
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

      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl mb-4">How Can We Help You?</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions or get in touch with our support team
          </p>
        </div>
      </section>

      {/* Quick Topics */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl text-center mb-12">Browse by Topic</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topicCards.map((topic, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <topic.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{topic.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{topic.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl text-center mb-12">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-background rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4">Still Need Help?</h2>
            <p className="text-lg text-muted-foreground">Our support team is here for you</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {contactMethods.map((method, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <method.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl mb-2">{method.title}</h3>
                  <p className="text-primary mb-1">{method.description}</p>
                  <p className="text-sm text-muted-foreground">{method.details}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
