import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
    Elements,
    PaymentElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { Button } from "./ui/button";
import { toast } from "sonner";

// Initialize Stripe with the publishable key
const stripePromise = loadStripe(
    "pk_test_51SV32cRwqd4INguR7I5BdatAcOTNQiw3D7dGp5Tsnz6KVTN7ZzTd4g0oOwYtoUo6nXawScKYxW7O3OgrbmPYVW3700W7Achjyp"
);

interface StripePaymentFormProps {
    amount: number;
    onSuccess: () => void;
}

function PaymentForm({ amount, onSuccess }: StripePaymentFormProps) {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);
        setMessage(null);

        try {
            const { error, paymentIntent } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    // Return URL where the customer should be redirected after the PaymentIntent is confirmed.
                    return_url: window.location.href,
                },
                redirect: "if_required",
            });

            if (error) {
                if (error.type === "card_error" || error.type === "validation_error") {
                    setMessage(error.message ?? "An unexpected error occurred.");
                } else {
                    setMessage("An unexpected error occurred.");
                }
                toast.error(error.message ?? "Payment failed");
            } else if (paymentIntent && paymentIntent.status === "succeeded") {
                onSuccess();
            } else {
                // Handle other statuses (e.g. processing, requires_action if redirect failed)
                setMessage(`Payment status: ${paymentIntent?.status}`);
                toast.warning(`Payment status: ${paymentIntent?.status}`);
            }
        } catch (err: any) {
            console.error("Payment error:", err);
            setMessage(err.message || "An unexpected error occurred.");
            toast.error(err.message || "An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <PaymentElement />
            {message && <div className="text-red-500 text-sm">{message}</div>}
            <Button
                disabled={isLoading || !stripe || !elements}
                className="w-full"
                size="lg"
            >
                {isLoading ? "Processing..." : `Pay $${amount.toFixed(2)}`}
            </Button>
        </form>
    );
}

export function StripePaymentForm({ amount, onSuccess }: StripePaymentFormProps) {
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
        fetch(`${apiUrl}/make-server-a8a8d287/create-payment-intent`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [amount]);

    const appearance = {
        theme: 'stripe' as const,
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div className="w-full">
            {clientSecret ? (
                <Elements options={options} stripe={stripePromise}>
                    <PaymentForm amount={amount} onSuccess={onSuccess} />
                </Elements>
            ) : (
                <div className="flex justify-center p-4">Loading payment details...</div>
            )}
        </div>
    );
}
