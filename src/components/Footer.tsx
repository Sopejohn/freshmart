import { Separator } from "./ui/separator";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

interface FooterProps {
  onNavigate?: (page: string) => void;
}

const footerLinks = {
  Shop: [
    { name: "Rice Dishes", page: null },
    { name: "Traditional Meals", page: null },
    { name: "Soups", page: null },
    { name: "Drinks", page: null }
  ],
  Company: [
    { name: "About", page: "about" },
    { name: "Careers", page: null },
    { name: "Sustainability", page: null },
    { name: "Blog", page: null }
  ],
  Support: [
    { name: "Help Center", page: "help" },
    { name: "Delivery Info", page: null },
    { name: "Returns", page: null },
    { name: "Contact", page: null }
  ],
  Legal: [
    { name: "Privacy", page: "privacy" },
    { name: "Terms", page: "terms" },
    { name: "Food Safety", page: null },
    { name: "Policies", page: null }
  ]
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" }
];

export function Footer({ onNavigate }: FooterProps) {
  const handleLinkClick = (e: React.MouseEvent, page: string | null) => {
    if (page && onNavigate) {
      e.preventDefault();
      onNavigate(page);
    }
  };

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg"></div>
              <span className="font-bold text-xl">FreshMart</span>
            </div>
            <p className="text-muted-foreground max-w-md">
              Your trusted partner for authentic Nigerian cuisine delivered daily. 
              Bringing the rich flavors of Nigeria directly to your doorstep.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h3 className="font-semibold">{category}</h3>
              <ul className="space-y-2">
                {links.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.page ? `#${link.page}` : "#"} 
                      onClick={(e) => handleLinkClick(e, link.page)}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-muted-foreground text-sm">
            © 2024 FreshMart. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-muted-foreground">
            <a 
              href="#privacy" 
              onClick={(e) => handleLinkClick(e, "privacy")}
              className="hover:text-primary transition-colors"
            >
              Privacy Policy
            </a>
            <a 
              href="#terms" 
              onClick={(e) => handleLinkClick(e, "terms")}
              className="hover:text-primary transition-colors"
            >
              Terms of Service
            </a>
            <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}