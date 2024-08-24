"use client";
import React, { useState, useEffect } from "react";
import createClient from "../../api";
import { Footer, Navbar } from "../../components";
import Swal from "sweetalert2";
import withAuth from '../../hoc/withAuth';

const Cart = ({ data }: any) => {
  const [subTotal, setSubtotal] = useState(0);
  const [cartItems, setCartItems] = useState(data.cartItems || []);
  const calculateSubTotal = (cartItems: any) => {
    if (!cartItems || !Array.isArray(cartItems)) return 0;

    return cartItems.reduce((subtotal, item) => {
      const price = item.products?.productPrice || 0;
      return subtotal + item.quantity * price;
    }, 0);
  };

  useEffect(() => {
    if (data && data.cartItems) {
      const total = calculateSubTotal(data.cartItems);
      setSubtotal(total);
    }
  }, [data]);

  const deleteFromCart = async (id: any) => {
    try {
      const { deleteCartItem } = createClient("");
      await deleteCartItem(id);
      const updatedCartItems = cartItems.filter((item: any) => item.id !== id);
      setCartItems(updatedCartItems);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: `${error}`,
      });
    }
  };

  const deleteItemSweet = (id: any) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton:
          "text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800",
        cancelButton:
          "focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteFromCart(id);
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Item has been deleted.",
            icon: "success",
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "The item is safe :)",
            icon: "error",
          });
        }
      });
  };
  const deleteAllFromCart = async (userId: any) => {
    try {
      const { resetCart } = createClient("");
      await resetCart(userId);
      setCartItems([]);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: `${error}`,
      });
    }
  };

  const resetCartSweet = (userId: any) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton:
          "text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800",
        cancelButton:
          "focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, reset cart!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteAllFromCart(userId);
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "All Items Deleted",
            icon: "success",
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "The items are safe :)",
            icon: "error",
          });
        }
      });
  };

  return (
    <>
      <div style={{ marginBottom: "70px" }}>
        <Navbar />
      </div>
      <h3 className="pl-8 pt-10 text-base font-bold text-xl text-gray-900 ">
        Shopping Cart
      </h3>
      {cartItems[0] ? (
        <div className="lg:flex lg:justify-between lg:items-start">
          <div className="lg:flex-1 lg:p-20 p-10">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {cartItems?.map((item: any) => (
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
                        <p className="mt-1 text-sm text-gray-500">
                          {item.color}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.size}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="text-gray-500">Qty {item.quantity}</p>

                        <div className="flex">
                          <button
                            type="button"
                            onClick={() => deleteItemSweet(item.id)}
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
          <div className="lg:flex-1 lg:pl-15 lg:p-20 p-5 px-5  bg-gray-50">
            <button
              type="button"
              onClick={() => resetCartSweet(1)}
              className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium text-sm px-5 py-2.5 w-full text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
            >
              Reset Cart
            </button>
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
      ) : (
        <div className="flex justify-center items-center flex-col">
          <h2 className="text-boldtext-4xl font-medium text-gray-900 dark:text-white mb-5 mt-10">
            No Items in Cart!
          </h2>
          <p>Go to Products page to add items</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/products"
              className="lg:mb-10 mb-60 bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gay-600"
            >
              Products Page
            </a>
          </div>
        </div>
      )}
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

export default withAuth(Cart);
