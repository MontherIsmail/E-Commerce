import React from "react";
import { Footer, Navbar } from "../../components";
import createClient from "../../api";

const Orders = ({ data }: any) => {
  const { orders } = data;
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
        {orders?.map((order: any) => (
          <>
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
          </>
        ))}
      </div>
      <Footer />
    </>
  );
};

export async function getStaticProps() {
  const { getOrders } = createClient("");
  const data = await getOrders(1);

  return {
    props: { data },
  };
}

export default Orders;
