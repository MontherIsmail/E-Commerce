"use client";
import React, { useState, useEffect } from "react";
import createClient from "../../api";
import { Footer, Navbar } from "../../components";

const Cart = ({ data }: any) => {
  const { cartItems } = data;
  const calculateSubTotal = (cartItems: any) => {
    if (!cartItems || !Array.isArray(cartItems)) return 0;

    return cartItems.reduce((subtotal, item) => {
      const price = item.products?.productPrice || 0;
      return subtotal + item.quantity * price;
    }, 0);
  };
  const [subTotal, setSubtotal] = useState(0);

  useEffect(() => {
    if (data && data.cartItems) {
      const total = calculateSubTotal(data.cartItems);
      setSubtotal(total);
    }
  }, [data]);

  return (
    <>
      <div style={{ marginBottom: "70px" }}>
        <Navbar />
      </div>
      <h3 className="pl-8 pt-10 text-base font-bold text-xl text-gray-900 ">
        Shopping Cart
      </h3>
      <div className="lg:flex lg:justify-between lg:items-start">
        <div className="lg:flex-1 lg:p-20 p-10">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {cartItems.map((item: any) => (
                <li key={item.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      alt="Product Image Alt"
                      src={item.products.productUrlImgs[0]}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href={`/products/${item.id}`}>
                            {item.products.productName}
                          </a>
                        </h3>
                        <p className="ml-4 text-green-400">
                          ${item.products.productPrice}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{item.color}</p>
                      <p className="mt-1 text-sm text-gray-500">{item.size}</p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <p className="text-gray-500">Qty {item.quantity}</p>

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
              <p>${subTotal + (subTotal * 2) / 100 + 5}</p>
            </div>
            <div className="mt-6">
              <a
                href="/checkout"
                className="flex items-center justify-center border border-transparent bg-green-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700"
              >
                Checkout
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export async function getStaticProps() {
  const { getCart } = createClient("");
  const data = await getCart(1);

  return {
    props: { data },
  };
}

export default Cart;
