"use client";

import { Footer, Navbar } from "../../components";

const products = [
  {
    id: 1,
    name: "Throwback Hip Bag",
    href: "#",
    color: "Salmon",
    size: "xl",
    price: "$90.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt:
      "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  },
  {
    id: 2,
    name: "Medium Stuff Satchel",
    href: "#",
    color: "Blue",
    size: "xl",
    price: "$32.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg",
    imageAlt:
      "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
  },
  {
    id: 1,
    name: "Throwback Hip Bag",
    href: "#",
    color: "Salmon",
    size: "xl",
    price: "$90.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-03.jpg",
    imageAlt:
      "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  },
  {
    id: 2,
    name: "Medium Stuff Satchel",
    href: "#",
    color: "Blue",
    size: "xl",
    price: "$32.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-04.jpg",
    imageAlt:
      "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
  },
  {
    id: 3,
    name: "Throwback Hip Bag",
    href: "#",
    color: "Salmon",
    size: "xl",
    price: "$90.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt:
      "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  },
  // More products...
];

const Cart = () => {
  return (
    <>
      <div style={{marginBottom: "70px"}}>
        <Navbar />
      </div>
      <h3 className="pl-8 pt-10 text-base font-bold text-xl text-gray-900 ">
        Shopping Cart
      </h3>
      <div className="lg:flex lg:justify-between lg:items-start">
        <div className="lg:flex-1 lg:p-20 p-10">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {products.map((product) => (
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
              <p>$262.00</p>
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
              <p>$112.32</p>
            </div>
            <div className="mt-6">
              <a
                href="#"
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

export default Cart;
