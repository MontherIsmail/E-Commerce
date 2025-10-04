import React, { useEffect, useState } from "react";
import { Footer, Navbar } from "../../components";
import { OrderSkeleton } from "../../components/Skeletons";
import createClient from "../../api";
import { useAuth } from "../../context/AuthContext";
import withAuth from "../../hoc/withAuth";
import type { Order } from "../../types";

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const getCartItems = async () => {
    try {
      setLoading(true);
      if (!user?.id) return;
      const { getOrders } = createClient("");
      // Add minimum delay to show skeleton loaders
      await new Promise((resolve) => setTimeout(resolve, 800));
      const data = await getOrders(user.id);
      const orders = (data as any).orders || data.data?.orders || [];
      setOrders(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCartItems();
  }, [user?.id]);
  return (
    <>
      <Navbar />
      <div className="p-8" style={{ minHeight: '70vh' }}>
        <h3 className=" pt-10 font-bold text-3xl text-gray-900">
          Order history
        </h3>
        <p className="pt-1 mb-10 text-gray-400">
          Check the status of recent orders, manage returns, and download
          invoices.
        </p>
        {loading ? (
          <div>
            {Array.from({ length: 2 }).map((_, index) => (
              <OrderSkeleton key={index} />
            ))}
          </div>
        ) : orders && orders.length > 0 ? (
          orders.map((order: any) => (
          <div key={order.id}>
            <div className="bg-gray-100 p-8 lg:flex lg:justify-between lg:items-center sm-flex-col">
              <div className="lg:flex lg:justify-between lg:items-center sm-flex-col lg:w-2/5">
                <div className="mb-3 flex justify-between items-center lg:flex-col lg:items-start lg:border-none border-b border-gray-300">
                  <p className="mb-2">Date placed</p>
                  <p className="text-gray-600">
                    {order.createdAt.split("T")[0]}
                  </p>
                </div>
                <div className="mb-3 flex justify-between items-center lg:flex-col lg:items-start lg:border-none border-b border-gray-300">
                  <p className="mb-2">Order number</p>
                  <p className="text-gray-600">{order.id}</p>
                </div>
                <div className="mb-3 flex justify-between items-center lg:flex-col lg:items-start lg:border-none border-b border-gray-300">
                  <p className="mb-2">Total amount</p>
                  <p className="text-gray-600">${order.amount}</p>
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
            {order?.items?.map((item: any) => (
              <div className="flex justify-between items-center py-10">
                <div className="flex justify-between items-center lg:w-1/5 w-1/2">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      alt="Product Image"
                      src={item.products.productUrlImgs[0]}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <p className="text-gray-900 pl-3">
                    {item.products.productName}
                  </p>
                </div>
                <p className="text-gray-400 lg:w-1/6 text-center">
                  ${item.products.productPrice}
                </p>
                <p className="hidden lg:flex text-gray-400 lg:w-1/5 text-center">
                  Succeed
                </p>
                <button className=" bg-white text-green-500 lg:py-3 py-2 lg:w-32 border">
                  View
                </button>
              </div>
            ))}
          </div>
        ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-4 min-h-[50vh]">
            <svg
              className="w-32 h-32 text-gray-300 mb-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
            <h2 className="text-3xl font-bold text-gray-700 mb-3">
              No Orders Yet
            </h2>
            <p className="text-gray-500 text-center max-w-md mb-8">
              You haven't placed any orders yet. Start shopping to see your order history here!
            </p>
            <a
              href="/products"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg transform hover:scale-105"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              Start Shopping
            </a>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default withAuth(Orders);
