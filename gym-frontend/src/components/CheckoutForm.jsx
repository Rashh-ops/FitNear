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
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/payment/pay`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: fees }),
        }
      );

      const { clientSecret } = await res.json();

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

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#111827", // near-black like macOS
        "::placeholder": { color: "#9CA3AF" }, // subtle gray
      },
      invalid: {
        color: "#DC2626", // red-600
      },
    },
  };

  return (
    <form
      onSubmit={handlePay}
      className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg shadow-gray-200/70 p-6 space-y-5"
    >
      <h3 className="text-lg font-semibold text-gray-800">
        Enter Card Details
      </h3>

      <div className="p-3 border rounded-xl bg-gray-50">
        <CardElement options={cardElementOptions} />
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-black text-white py-2.5 rounded-xl font-medium 
                   hover:scale-[1.02] active:scale-[0.98] transition-transform 
                   disabled:opacity-50"
      >
        {loading ? "Processing..." : `Pay ₹${fees} (10% off applied)`}
      </button>

      {errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}
      {successMessage && (
        <p className="text-green-600 text-sm">{successMessage}</p>
      )}
    </form>
  );
}
