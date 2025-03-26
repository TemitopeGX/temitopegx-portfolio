"use client";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/router";
import Image from "next/image";
import Script from "next/script";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faTrash,
  faCreditCard,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

// Exchange rates (you might want to fetch these dynamically)
type CurrencyCode = "USD" | "NGN" | "GHS" | "ZAR" | "KES";

const EXCHANGE_RATES: Record<CurrencyCode, number> = {
  USD: 1,
  NGN: 1, // Remove the multiplication since prices are already in NGN
  GHS: 12.5,
  ZAR: 19,
  KES: 145,
};

const CURRENCY_LABELS: Record<CurrencyCode, string> = {
  USD: "USD ($)",
  NGN: "NGN (₦)",
  GHS: "GHS (₵)",
  ZAR: "ZAR (R)",
  KES: "KES (KSh)",
};

// Type guard function
function isCurrencyCode(value: string): value is CurrencyCode {
  return Object.keys(EXCHANGE_RATES).includes(value);
}

export default function Cart() {
  const { state, dispatch, isOpen, setIsOpen } = useCart();
  const router = useRouter();
  const [currency, setCurrency] = useState<CurrencyCode>("NGN");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "processing" | "success" | "failed"
  >("idle");

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (isCurrencyCode(value)) {
      setCurrency(value);
    } else {
      console.error("Invalid currency code:", value);
    }
  };

  // Convert USD price to selected currency
  const convertPrice = (price: number) => {
    // If currency is NGN, return the price as is
    if (currency === "NGN") {
      return price;
    }
    // For other currencies, convert from NGN to the target currency
    return price / EXCHANGE_RATES[currency];
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
        minimumFractionDigits: 0, // Remove decimal places for Naira
        maximumFractionDigits: 0,
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

  const loadPaystackScript = async () => {
    if (!window.PaystackPop) {
      const script = document.createElement("script");
      script.src = "https://js.paystack.co/v1/inline.js";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      await new Promise((resolve) => (script.onload = resolve));
    }
  };

  const handleCheckout = async () => {
    try {
      await loadPaystackScript();
      setError("");
      setIsLoading(true);
      setPaymentStatus("idle");

      if (!email) {
        setError("Please enter your email address");
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

      {/* Floating Cart Button */}
      {/* <button
        onClick={toggleCart}
        className="fixed bottom-4 right-4 z-50 bg-neon-green text-dark p-4 rounded-full shadow-lg hover:bg-neon-green/90 transition-colors"
      >
        <FontAwesomeIcon icon={faShoppingCart} className="text-xl" />
        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">
            {cartItems.length}
          </span>
        )}
      </button> */}

      {isOpen && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="bg-dark-200 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative">
            <div className="p-6 border-b border-neon-green/10 flex justify-between items-center sticky top-0 bg-dark-200 z-10">
              <h2 className="text-2xl font-bold text-white">Your Cart</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 bg-dark-300 rounded-lg flex items-center justify-center text-gray-400 hover:bg-dark-400 transition-colors"
              >
                ×
              </button>
            </div>

            {state.items.length === 0 ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-dark-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faShoppingCart}
                    className="text-2xl text-gray-400"
                  />
                </div>
                <p className="text-gray-400">Your cart is empty</p>
              </div>
            ) : (
              <div className="p-6">
                <div className="space-y-4 mb-6">
                  {state.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-4 bg-dark-300 rounded-xl border border-neon-green/10"
                    >
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          layout="fill"
                          objectFit="cover"
                          className="bg-dark-400"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-white truncate">
                          {item.name}
                        </h3>
                        <p className="text-neon-green">
                          {formatPrice(convertPrice(item.price))}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
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
                          className="w-8 h-8 bg-dark-400 rounded-lg flex items-center justify-center text-white hover:bg-dark-500 transition-colors"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-white">
                          {item.quantity}
                        </span>
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
                          className="w-8 h-8 bg-dark-400 rounded-lg flex items-center justify-center text-white hover:bg-dark-500 transition-colors"
                        >
                          +
                        </button>
                        <button
                          onClick={() =>
                            dispatch({ type: "REMOVE_ITEM", payload: item.id })
                          }
                          className="w-8 h-8 bg-red-500/10 text-red-500 rounded-lg flex items-center justify-center hover:bg-red-500/20 transition-colors ml-2"
                        >
                          <FontAwesomeIcon icon={faTrash} className="text-sm" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-dark-300 rounded-xl p-6 space-y-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <span className="text-gray-400">Currency:</span>
                      <select
                        value={currency}
                        onChange={handleCurrencyChange}
                        className="bg-dark-400 text-white px-4 py-2 rounded-lg border border-neon-green/10 focus:outline-none focus:border-neon-green/30 transition-colors"
                      >
                        {Object.entries(CURRENCY_LABELS).map(
                          ([code, label]) => (
                            <option key={code} value={code}>
                              {label}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400 mb-1">Total Amount</p>
                      <p className="text-2xl font-bold text-neon-green">
                        {formatPrice(convertPrice(state.total))}
                      </p>
                    </div>
                  </div>

                  {getStatusUI()}
                  {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm">
                      {error}
                    </div>
                  )}

                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-dark-400 border border-neon-green/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-neon-green/30 transition-colors"
                    required
                  />

                  <button
                    onClick={handleCheckout}
                    disabled={isLoading}
                    className="w-full bg-neon-green text-dark font-semibold px-6 py-4 rounded-xl hover:bg-neon-green/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <FontAwesomeIcon
                          icon={faSpinner}
                          className="animate-spin"
                        />
                        Processing...
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faCreditCard} />
                        Proceed to Payment
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
