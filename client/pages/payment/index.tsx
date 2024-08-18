import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");

  const order = {
    datePlaced: "January 22, 2021",
    orderNumber: "WU88191111",
    products: [
      {
        id: 1,
        name: "Throwback Hip Bag",
        href: "#",
        color: "Salmon",
        status: "Delivered Jan 25, 2021	",
        size: "xl",
        price: 90.00,
        quantity: 1,
        imageSrc:
          "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
        imageAlt:
          "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
      },
      {
        id: 2,
        name: "Throwback Hip Bag",
        href: "#",
        color: "Salmon",
        status: "Delivered Jan 25, 2021	",
        size: "xl",
        price: 90.00,
        quantity: 5,
        imageSrc:
          "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg",
        imageAlt:
          "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
      },
    ],
  };

  const totalAmount = order.products.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);
  useEffect(() => {
    const amount = totalAmount * 10;
    const { products } = order;
    const userId = 1;
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:5000/api/v1/payment/create-payment-intent", {
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
  }, [totalAmount]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

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
      console.error(error);
    } else if (paymentIntent.status === "succeeded") {
      console.log("Payment succeeded!", "monther", paymentIntent);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
            disabled={!stripe}
          >
            Pay
          </button>
        </div>
        <div className="flex-1">
          <div className=" lg:p-20 p-10">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {order.products.map((product) => (
                  <li key={product.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        alt={product.imageAlt}
                        src={product.imageSrc}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href={product.href}>{product.name}</a>
                          </h3>
                          <p className="ml-4 text-green-400">{product.price}</p>
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
                <p>{totalAmount}</p>
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
                <p>$112.32</p>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Order total</p>
                <p>{totalAmount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

const PaymentPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default PaymentPage;
