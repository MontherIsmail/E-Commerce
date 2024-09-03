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
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import withAuth from "../../hoc/withAuth";
import { useAuth } from "../../context/AuthContext";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

const CheckoutForm = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { id } = user;
  const getCartItems = async () => {
    const { getCart } = createClient("");
    const data = await getCart(id);
    const { cartItems } = data;
    setCartItems(cartItems);
  };
  useEffect(() => {
    getCartItems();
  }, []);
  const calculateSubTotal = (cartItems: any) => {
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
    const products = cartItems;
    const userId = id;
    // Create PaymentIntent as soon as the page loads
    fetch("https://e-commerce-1-fdtm.onrender.com/api/v1/payment/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, userId, products }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          console.error("No clientSecret received");
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, [amount]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      setLoading(true);
      console.log("stripe", stripe);

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
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: `${error}`,
        });
        console.error(error);
      } else if (paymentIntent.status === "succeeded") {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Payment succeeded",
          showConfirmButton: false,
          timer: 1500,
        });
        router.push("/orders");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: `${error}`,
      });
    }
  };

  return (
    <form style={{ marginTop: "70px" }} onSubmit={handleSubmit}>
      <div className="lg:flex lg:justify-between lg:items-start">
        <div className="p-10 lg:w-1/2">
          <h3 className="text-lg font-medium">Contact Information</h3>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email
          </label>
          <div className="mt-2 mb-5">
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="block w-full border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
            />
          </div>
          <label
            htmlFor="phonenumber"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Phone Number
          </label>
          <div className="mt-2 mb-5">
            <input
              id="phonenumber"
              name="phonenumber"
              type="tel"
              required
              autoComplete="tel"
              className="block w-full border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
            />
          </div>
          <h3 className="text-lg font-medium mb-3">Payment details</h3>

          <div className="mb-4">
            <label
              htmlFor="card"
              className="block text-sm font-medium text-gray-700"
            >
              Card Information
            </label>
            <CardElement className="mt-1 p-3 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full" />
          </div>
          <button
            className="bg-green-500 text-white py-2 px-4 w-full hover:bg-green-600 disabled:bg-gray-400"
            type="submit"
            disabled={!stripe || loading}
          >
            Pay
          </button>
        </div>
        <div className="flex-1">
          <div className=" lg:p-20 p-10">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {cartItems?.map((product: any) => (
                  <li key={product.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        alt="Product Image"
                        src={product.products.productUrlImgs[0]}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href={product.href}>
                              {product.products.productName}
                            </a>
                          </h3>
                          <p className="ml-4 text-green-400">
                            ${product.products.productPrice}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {product.color}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          {product.size}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="text-gray-500">Qty {product.quantity}</p>

                        <div className="flex">
                          <button
                            type="button"
                            className="font-medium text-red-600 hover:text-red-400"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="lg:flex-1 lg:pl-15 lg:p-20 p-5 lg:mt-20 bg-gray-50">
            <div className="text-base font-medium px-4 py-6 text-gray-900">
              <p>Order summary</p>
            </div>
            <div className="border-t border-gray-200 px-4 py-3 sm:px-6">
              <div className="flex justify-between mt-0.5 text-sm text-gray-500">
                <p>Subtotal</p>
                <p>${subTotal}</p>
              </div>
            </div>
            <div className="border-t border-gray-200 px-4 py-3 sm:px-6">
              <div className="flex justify-between mt-0.5 text-sm text-gray-500">
                <p>Shipping estimate</p>
                <p>$5.00</p>
              </div>
            </div>
            <div className="border-t border-gray-200 px-4 py-3 sm:px-6">
              <div className="flex justify-between mt-0.5 text-sm text-gray-500">
                <p>Tax estimate</p>
                <p>${(subTotal * 2) / 100}</p>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Order total</p>
                <p>${amount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
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
