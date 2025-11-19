import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";

interface TermsPageProps {
  onBack: () => void;
}

export function TermsPage({ onBack }: TermsPageProps) {
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
        <h1 className="text-4xl md:text-5xl mb-6">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last updated: November 14, 2024</p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl mb-4">1. Acceptance of Terms</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                By accessing and using FreshMart's website and services, you accept and agree to be 
                bound by these Terms of Service. If you do not agree to these terms, please do not 
                use our services.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl mb-4">2. Account Registration</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                To place orders, you must create an account with accurate information. You are 
                responsible for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized use</li>
                <li>Providing accurate and current information</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl mb-4">3. Orders and Payments</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                When you place an order through FreshMart:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>All orders are subject to acceptance and availability</li>
                <li>Prices are subject to change without notice</li>
                <li>Payment is processed at the time of order placement</li>
                <li>We reserve the right to refuse or cancel any order</li>
                <li>You will receive an order confirmation via email</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl mb-4">4. Delivery</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Delivery terms and conditions:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Delivery times are estimates and not guaranteed</li>
                <li>You must provide accurate delivery information</li>
                <li>Someone must be available to receive the order</li>
                <li>We are not responsible for delays beyond our control</li>
                <li>Delivery fees apply as stated at checkout</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl mb-4">5. Returns and Refunds</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Due to the nature of our food products:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>All sales are final once delivered</li>
                <li>Refunds may be issued for incorrect or damaged orders</li>
                <li>Quality issues must be reported within 24 hours of delivery</li>
                <li>Refunds are processed to the original payment method</li>
                <li>Contact customer service for any concerns</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl mb-4">6. Food Safety</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                All our food is prepared following strict food safety standards. However:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>It is your responsibility to store food properly upon delivery</li>
                <li>Inform us of any allergies or dietary restrictions</li>
                <li>We cannot guarantee cross-contamination prevention</li>
                <li>Consume products within recommended timeframes</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl mb-4">7. User Conduct</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use our services for any illegal purpose</li>
                <li>Provide false or misleading information</li>
                <li>Interfere with the proper functioning of our website</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Abuse or harass our staff or delivery personnel</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl mb-4">8. Intellectual Property</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                All content on FreshMart, including text, graphics, logos, and images, is our 
                property or licensed to us and is protected by copyright and trademark laws.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl mb-4">9. Limitation of Liability</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                FreshMart shall not be liable for any indirect, incidental, special, or consequential 
                damages arising from your use of our services. Our total liability shall not exceed 
                the amount paid for the specific order in question.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl mb-4">10. Changes to Terms</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We reserve the right to modify these terms at any time. Continued use of our services 
                after changes constitutes acceptance of the new terms.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl mb-4">11. Contact Information</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                For questions about these Terms of Service, contact us at:
              </p>
              <p>
                Email: legal@freshmart.com<br />
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
