import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import createClient from "../../api";
import { Footer, Navbar } from "../../components";
import { CartItemSkeleton } from "../../components/Skeletons";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import withAuth from "../../hoc/withAuth";
import { useAuth } from "../../context/AuthContext";
import { API_CONFIG } from "../../config/api";
import type { CartItem } from "../../types";

// Dynamic base path based on environment
const getBasePath = () => {
  return process.env.NODE_ENV === 'production' ? '/ecommerce' : '';
};

const basePath = getBasePath();

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

const CheckoutForm = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingItems, setLoadingItems] = useState(true);
  const { user } = useAuth();
  const getCartItems = async () => {
    try {
      setLoadingItems(true);
      if (!user?.id) return;
      const { getCart } = createClient("");
      // Add minimum delay to show skeleton loaders
      await new Promise((resolve) => setTimeout(resolve, 800));
      const data = await getCart(user.id);
      const { cartItems } = data;
      setCartItems(cartItems);
    } catch (error: any) {
      console.error("Error fetching cart items:", error);
      toast.error("Failed to load cart items. Please try again.");
    } finally {
      setLoadingItems(false);
    }
  };
  useEffect(() => {
    getCartItems();
  }, [user?.id]);
  const calculateSubTotal = (cartItems: CartItem[]) => {
    if (!cartItems || !Array.isArray(cartItems)) return 0;

    return cartItems.reduce((subtotal, item) => {
      const price = item.products?.productPrice || 0;
      return subtotal + item.quantity * price;
    }, 0);
  };
  const [subTotal, setSubtotal] = useState(0);
  useEffect(() => {
    if (cartItems) {
      const total = calculateSubTotal(cartItems);
      setSubtotal(total);
    }
  }, [cartItems]);

  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState("");

  const amount = subTotal + (subTotal * 2) / 100 + 5;
  useEffect(() => {
    if (!user?.id) return;
    const products = cartItems;
    const userId = user.id;
    // Create PaymentIntent as soon as the page loads
    fetch(`${API_CONFIG.BASE_URL}/payment/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ amount, userId, products }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          console.error("No clientSecret received");
          toast.error("Failed to initialize payment. Please try again.");
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        toast.error("Failed to connect to payment service. Please try again.");
      });
  }, [amount]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      setLoading(true);

      if (!stripe || !elements) return;

      const cardElement: any = elements.getElement(CardElement);

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
          },
        }
      );

      if (error) {
        toast.error(error.message || "Payment could not be processed");
        console.error(error);
      } else if (paymentIntent.status === "succeeded") {
        toast.success("Payment succeeded! Redirecting to orders...");
        router.push(`${basePath}/orders`);
      }
    } catch (error: any) {
      toast.error(error?.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-2">Complete your order securely</p>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          {/* Left Column - Checkout Form */}
          <div className="lg:col-span-1">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Contact Information
                  </h2>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phonenumber" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      id="phonenumber"
                      name="phonenumber"
                      type="tel"
                      required
                      autoComplete="tel"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Information Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    Payment Information
                  </h2>
                </div>
                <div className="p-6">
                  <div className="mb-6">
                    <label htmlFor="card" className="block text-sm font-medium text-gray-700 mb-2">
                      Card Details
                    </label>
                    <div className="p-4 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-green-500 focus-within:border-green-500">
                      <CardElement 
                        options={{
                          style: {
                            base: {
                              fontSize: '16px',
                              color: '#374151',
                              '::placeholder': {
                                color: '#9CA3AF',
                              },
                            },
                          },
                        }}
                      />
                    </div>
                  </div>
                  
                  {/* Security Badge */}
                  <div className="flex items-center justify-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="text-sm font-medium text-green-700">Your payment information is secure and encrypted</span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                type="submit"
                disabled={!stripe || loading}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Complete Order - ${amount.toFixed(2)}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1 lg:pl-8">
            <div className="sticky top-8">
              {/* Order Items */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Order Items ({cartItems.length})
                  </h3>
                </div>
                <div className="p-6">
                  {loadingItems ? (
                    <div className="space-y-4">
                      {Array.from({ length: 3 }).map((_, index) => (
                        <CartItemSkeleton key={index} />
                      ))}
                    </div>
                  ) : cartItems && cartItems.length > 0 ? (
                    <div className="space-y-4">
                      {cartItems.map((product: any) => (
                        <div key={product.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200">
                            <img
                              alt="Product Image"
                              src={product.products.productUrlImgs[0]}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 truncate">
                              {product.products.productName}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {product.color} • {product.size}
                            </p>
                            <p className="text-sm text-gray-500">
                              Qty: {product.quantity}
                            </p>
                          </div>
                          <div className="text-sm font-semibold text-gray-900">
                            ${(product.products.productPrice * product.quantity).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      <h3 className="text-lg font-medium text-gray-700 mb-2">No Items in Cart</h3>
                      <p className="text-gray-500">Add items to your cart before checking out.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Order Summary
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center py-2">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-700">Subtotal</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">${subTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                      <span className="text-sm font-medium text-gray-700">Shipping</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">$5.00</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-700">Tax (2%)</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">${((subTotal * 2) / 100).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 my-4"></div>
                  <div className="flex justify-between items-center py-3 bg-gray-50 rounded-lg px-4">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                      <span className="text-lg font-bold text-gray-900">Total</span>
                    </div>
                    <span className="text-xl font-bold text-gray-900">${amount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Checkout = () => {
  return (
    <>
      <Navbar />
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
      <Footer />
    </>
  );
};

export default withAuth(Checkout);
