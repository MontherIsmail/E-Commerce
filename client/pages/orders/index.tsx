import React from "react";
import { Footer, Navbar } from "../../components";

const orders = [
  {
    datePlaced: "January 22, 2021",
    orderNumber: "WU88191111",
    totalAmount: "$238.00",
    products: [
      {
        id: 1,
        name: "Throwback Hip Bag",
        href: "#",
        color: "Salmon",
        status: "Delivered Jan 25, 2021	",
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
        name: "Throwback Hip Bag",
        href: "#",
        color: "Salmon",
        status: "Delivered Jan 25, 2021	",
        size: "xl",
        price: "$90.00",
        quantity: 1,
        imageSrc:
          "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg",
        imageAlt:
          "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
      },
    ],
  },
  {
    datePlaced: "January 22, 2021",
    orderNumber: "WU88191111",
    totalAmount: "$238.00",
    products: [
      {
        id: 1,
        name: "Throwback Hip Bag",
        href: "#",
        color: "Salmon",
        status: "Delivered Jan 25, 2021	",
        size: "xl",
        price: "$90.00",
        quantity: 1,
        imageSrc:
          "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-03.jpg",
        imageAlt:
          "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
      },
    ],
  },
];

const Orders = () => {
  return (
    <>
    <Navbar />
      <div className="p-8">
        <h3 className=" pt-10 font-bold text-3xl text-gray-900">
          Order history
        </h3>
        <p className="pt-1 mb-10 text-gray-400">
          Check the status of recent orders, manage returns, and download
          invoices.
        </p>
        {orders.map((order) => (
          <>
            <div className="bg-gray-100 p-8 lg:flex lg:justify-between lg:items-center sm-flex-col">
              <div className="lg:flex lg:justify-between lg:items-center sm-flex-col lg:w-2/5">
                <div className="mb-3 flex justify-between items-center lg:flex-col lg:items-start lg:border-none border-b border-gray-300">
                  <p className="mb-2">Date placed</p>
                  <p className="text-gray-600">{order.datePlaced}</p>
                </div>
                <div className="mb-3 flex justify-between items-center lg:flex-col lg:items-start lg:border-none border-b border-gray-300">
                  <p className="mb-2">Order number</p>
                  <p className="text-gray-600">{order.orderNumber}</p>
                </div>
                <div className="mb-3 flex justify-between items-center lg:flex-col lg:items-start lg:border-none border-b border-gray-300">
                  <p className="mb-2">Total amount</p>
                  <p className="text-gray-600">{order.totalAmount}</p>
                </div>
              </div>
              <button className="bg-white lg:py-3 py-2 lg:w-32 w-full border">
                View Invoice
              </button>
            </div>
            <div className="hidden lg:flex lg:justify-between lg:items:center border-b border-gray-300 py-5">
              <p className="text-gray-400">Product</p>
              <p className="text-gray-400">Price</p>
              <p className="text-gray-400">Status</p>
              <p className="text-gray-400">Info</p>
            </div>
            {order.products.map((product: any) => (
              <div className="flex justify-between items-center py-10">
                <div className="flex justify-between items-center lg:w-1/5 w-1/2">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      alt={product.imageAlt}
                      src={product.imageSrc}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <p className="text-gray-900 pl-3">{product.name}</p>
                </div>
                <p className="text-gray-400 lg:w-1/6 text-center">
                  {product.price}
                </p>
                <p className="hidden lg:flex text-gray-400 lg:w-1/5 text-center">
                  {product.status}
                </p>
                <button className=" bg-white text-green-500 lg:py-3 py-2 lg:w-32 border">
                  View
                </button>
              </div>
            ))}
          </>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Orders;
