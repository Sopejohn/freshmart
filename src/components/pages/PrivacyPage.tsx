import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";

interface PrivacyPageProps {
  onBack: () => void;
}

export function PrivacyPage({ onBack }: PrivacyPageProps) {
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

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl md:text-5xl mb-6">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: November 14, 2024</p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl mb-4">1. Information We Collect</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                At FreshMart, we collect information that you provide directly to us when you create 
                an account, place an order, or contact our customer service team.
              </p>
              <p>This information may include:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name and contact information (email, phone number, delivery address)</li>
                <li>Account credentials (email and password)</li>
                <li>Payment information (processed securely through our payment partners)</li>
                <li>Order history and preferences</li>
                <li>Communications with our customer service team</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl mb-4">2. How We Use Your Information</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Process and fulfill your orders</li>
                <li>Communicate with you about your orders and account</li>
                <li>Provide customer support</li>
                <li>Send you promotional emails (you can opt out at any time)</li>
                <li>Improve our services and user experience</li>
                <li>Prevent fraud and ensure security</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl mb-4">3. Information Sharing</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We do not sell your personal information to third parties. We may share your 
                information with:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Delivery partners to fulfill your orders</li>
                <li>Payment processors to handle transactions securely</li>
                <li>Service providers who help us operate our business</li>
                <li>Law enforcement when required by law</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl mb-4">4. Data Security</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We implement appropriate security measures to protect your personal information. 
                This includes encryption, secure servers, and regular security assessments. However, 
                no method of transmission over the internet is 100% secure.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl mb-4">5. Your Rights</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your account and data</li>
                <li>Opt out of marketing communications</li>
                <li>Export your data</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl mb-4">6. Cookies</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We use cookies and similar technologies to improve your experience on our website, 
                analyze usage patterns, and deliver personalized content. You can control cookies 
                through your browser settings.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl mb-4">7. Changes to This Policy</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We may update this privacy policy from time to time. We will notify you of any 
                significant changes by email or through a notice on our website.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl mb-4">8. Contact Us</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                If you have any questions about this privacy policy or how we handle your data, 
                please contact us at:
              </p>
              <p>
                Email: privacy@freshmart.com<br />
                Phone: 1-800-FRESHMART<br />
                Address: 123 Main Street, Lagos, Nigeria
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
