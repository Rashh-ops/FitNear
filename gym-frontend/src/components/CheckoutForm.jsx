import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";

export default function CheckoutForm({ fees }) {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handlePay = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // 1. Create PaymentIntent on backend
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/payment/pay`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: fees }),
      });

      const { clientSecret } = await res.json();

      // 2. Confirm payment with card details
      const cardElement = elements.getElement(CardElement);
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });

      if (result.error) {
        setErrorMessage(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        setSuccessMessage("✅ Payment Successful with 10% discount!");
      }
    } catch (err) {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Stripe CardElement styling
  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#32325d",
        "::placeholder": { color: "#a0aec0" },
      },
      invalid: {
        color: "#e53e3e",
      },
    },
  };

  return (
    <form onSubmit={handlePay} className="space-y-4 p-4 border rounded-md shadow">
      <label className="block font-medium">Enter Card Details</label>
      <CardElement options={cardElementOptions} className="p-2 border rounded" />

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        {loading ? "Processing..." : `Pay ₹${fees} (10% off applied)`}
      </button>

      {errorMessage && <p className="text-red-600">{errorMessage}</p>}
      {successMessage && <p className="text-green-600">{successMessage}</p>}
    </form>
  );
}
