"use client";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/router";
import Image from "next/image";
import Script from "next/script";

// Exchange rates (you might want to fetch these dynamically)
type CurrencyCode = "USD" | "NGN" | "GHS" | "ZAR" | "KES";

const EXCHANGE_RATES: Record<CurrencyCode, number> = {
  USD: 1,
  NGN: 1500, // Current rate USD to NGN
  GHS: 12.5, // Ghana Cedis
  ZAR: 19, // South African Rand
  KES: 145, // Kenyan Shilling
};

export default function Cart() {
  const { state, dispatch } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "processing" | "success" | "failed"
  >("idle");
  const router = useRouter();
  const [currency, setCurrency] = useState<CurrencyCode>("USD");

  // Convert USD price to selected currency
  const convertPrice = (usdPrice: number) => {
    const convertedAmount = usdPrice * EXCHANGE_RATES[currency];
    return currency === "USD" ? usdPrice : convertedAmount;
  };

  // Format price based on currency
  const formatPrice = (amount: number) => {
    const formatters = {
      USD: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }),
      NGN: new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      }),
      GHS: new Intl.NumberFormat("en-GH", {
        style: "currency",
        currency: "GHS",
      }),
      ZAR: new Intl.NumberFormat("en-ZA", {
        style: "currency",
        currency: "ZAR",
      }),
      KES: new Intl.NumberFormat("en-KE", {
        style: "currency",
        currency: "KES",
      }),
    };
    return formatters[currency].format(amount);
  };

  const redirectToWhatsApp = (paymentReference: string) => {
    // Format the message for WhatsApp
    const message = encodeURIComponent(
      `*New Sale!*\n\n` +
        `*Payment Reference:* ${paymentReference}\n` +
        `*Customer Email:* ${email}\n\n` +
        `*Order Details:*\n` +
        state.items
          .map(
            (item) => `- ${item.name} (${item.quantity}x) - $${item.price}\n`
          )
          .join("") +
        `\n*Total Amount:* $${state.total.toFixed(2)}`
    );

    // WhatsApp API URL (replace with your phone number)
    const whatsappUrl = `https://wa.me/2347071785772?text=${message}`;

    // Open WhatsApp in a new window
    window.open(whatsappUrl, "_blank");
  };

  const handlePaymentCallback = async (response: any) => {
    try {
      setPaymentStatus("processing");
      setIsLoading(true);

      if (response.status === "success") {
        dispatch({ type: "CLEAR_CART" });
        setPaymentStatus("success");
        setIsOpen(false);

        // Redirect to WhatsApp
        redirectToWhatsApp(response.reference);

        // Also redirect to success page
        router.push(`/order-success?ref=${response.reference}`);
      } else {
        setPaymentStatus("failed");
        setError("Payment was not successful");
      }
    } catch (err) {
      setPaymentStatus("failed");
      setError(
        err instanceof Error ? err.message : "Failed to process payment"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckout = () => {
    try {
      setError("");
      setIsLoading(true);
      setPaymentStatus("idle");

      if (!email) {
        setError("Please enter your email address");
        return;
      }

      if (!window.PaystackPop) {
        setError("Payment system is not ready. Please try again.");
        return;
      }

      const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
      if (!publicKey) {
        setError("Payment configuration is missing");
        return;
      }

      const reference = `ref_${Math.floor(Math.random() * 1000000000 + 1)}`;
      const convertedTotal = convertPrice(state.total);

      // Create handler configuration
      const config = {
        key: publicKey,
        email: email,
        amount: Math.round(convertedTotal * 100), // Convert to lowest currency unit
        currency: currency,
        ref: reference,
        callback: function (response: any) {
          handlePaymentCallback(response);
        },
        onClose: function () {
          setIsLoading(false);
          setPaymentStatus("idle");
          setError("Payment window was closed");
        },
      };

      const handler = window.PaystackPop.setup(config);
      handler.openIframe();
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Payment error:", err);
      setPaymentStatus("failed");
    } finally {
      setIsLoading(false);
    }
  };

  // Payment status UI
  const getStatusUI = () => {
    switch (paymentStatus) {
      case "processing":
        return (
          <div className="mb-4 p-3 bg-blue-100 text-blue-700 neo-brutalism-white">
            Verifying payment...
          </div>
        );
      case "success":
        return (
          <div className="mb-4 p-3 bg-green-100 text-green-700 neo-brutalism-white">
            Payment successful!
          </div>
        );
      case "failed":
        return (
          <div className="mb-4 p-3 bg-red-100 text-red-700 neo-brutalism-white">
            {error || "Payment failed"}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Script
        src="https://js.paystack.co/v1/inline.js"
        strategy="lazyOnload"
        onError={() => setError("Failed to load payment system")}
      />

      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 neo-brutalism-button bg-[#2B3FF3] text-white transition-transform duration-300"
      >
        Cart ({state.items.reduce((acc, item) => acc + item.quantity, 0)})
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-4 neo-brutalism-white">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black">Your Cart</h2>
              <button onClick={() => setIsOpen(false)} className="text-2xl">
                ×
              </button>
            </div>

            {state.items.length === 0 ? (
              <p className="text-center py-8">Your cart is empty</p>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {state.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-4 neo-brutalism-white"
                    >
                      <div className="relative w-20 h-20">
                        <Image
                          src={item.image}
                          alt={item.name}
                          layout="fill"
                          objectFit="cover"
                          className="neo-brutalism-image"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold">{item.name}</h3>
                        <p className="text-gray-600">
                          {formatPrice(convertPrice(item.price))}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            dispatch({
                              type: "UPDATE_QUANTITY",
                              payload: {
                                id: item.id,
                                quantity: Math.max(0, item.quantity - 1),
                              },
                            })
                          }
                          className="neo-brutalism-button px-3 py-1"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() =>
                            dispatch({
                              type: "UPDATE_QUANTITY",
                              payload: {
                                id: item.id,
                                quantity: item.quantity + 1,
                              },
                            })
                          }
                          className="neo-brutalism-button px-3 py-1"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() =>
                          dispatch({ type: "REMOVE_ITEM", payload: item.id })
                        }
                        className="text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                <div className="border-t-2 border-black pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-4">
                      <span className="font-bold">Currency:</span>
                      <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="neo-brutalism-white p-2 border-2 border-black"
                      >
                        <option value="USD">USD ($)</option>
                        <option value="NGN">NGN (₦)</option>
                        <option value="GHS">GHS (₵)</option>
                        <option value="ZAR">ZAR (R)</option>
                        <option value="KES">KES (KSh)</option>
                      </select>
                    </div>
                    <span className="text-2xl font-black">
                      {formatPrice(convertPrice(state.total))}
                    </span>
                  </div>

                  {getStatusUI()}

                  {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 neo-brutalism-white">
                      {error}
                    </div>
                  )}

                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 mb-4 border-2 border-black"
                    required
                  />

                  <button
                    onClick={handleCheckout}
                    disabled={isLoading}
                    className={`neo-brutalism-button bg-[#2B3FF3] text-white w-full ${
                      isLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isLoading ? "Processing..." : "Proceed to Payment"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
