"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import createClient from "../../api";
import Swal from "sweetalert2";
import { Footer, Navbar } from "../../components";
import { CartItemSkeleton } from "../../components/Skeletons";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { toast } from "react-toastify";
import withAuth from "../../hoc/withAuth";
import type { CartItem } from "../../types";

const Cart = () => {
  const [subTotal, setSubtotal] = useState(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { refreshCart } = useCart();
  const calculateSubTotal = (cartItems: CartItem[]) => {
    if (!cartItems || !Array.isArray(cartItems)) return 0;

    return cartItems.reduce((subtotal, item) => {
      const price = item.products?.productPrice || 0;
      return subtotal + item.quantity * price;
    }, 0);
  };

  const getCartItems = async () => {
    try {
      setLoading(true);
      if (!user?.id) return;
      const { getCart } = createClient("");
      // Add minimum delay to show skeleton loaders
      await new Promise((resolve) => setTimeout(resolve, 800));
      const data = await getCart(user.id);
      setCartItems(data.cartItems || []);
    } catch (error: any) {
      console.error("Error fetching cart items:", error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCartItems();
  }, [user?.id]);

  useEffect(() => {
    if (cartItems?.length > 0) {
      const total = calculateSubTotal(cartItems);
      setSubtotal(total);
    }
  }, [cartItems]);

  const deleteFromCart = async (id: string) => {
    try {
      const { deleteCartItem } = createClient("");
      await deleteCartItem(id);
      const updatedCartItems = cartItems.filter((item: any) => item.id !== id);
      setCartItems(updatedCartItems);
      await refreshCart(); // Refresh cart count in navbar
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong. Please try again.");
    }
  };

  const deleteItemSweet = async (id: string) => {
    const result = await Swal.fire({
      title: "Remove this item?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, remove",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      focusCancel: true,
    });

    if (result.isConfirmed) {
      await deleteFromCart(id);
      toast.success("Item removed from cart");
    }
  };
  const deleteAllFromCart = async (userId: string) => {
    try {
      const { resetCart } = createClient("");
      await resetCart(userId);
      setCartItems([]);
      await refreshCart(); // Refresh cart count in navbar
    } catch (error: any) {
      toast.error(error?.message || "Failed to reset cart. Please try again.");
    }
  };

  const resetCartSweet = async (userId: string) => {
    const result = await Swal.fire({
      title: "Clear entire cart?",
      text: "All items will be removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, clear",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      focusCancel: true,
    });

    if (result.isConfirmed && userId) {
      await deleteAllFromCart(userId);
      toast.success("Cart cleared successfully");
    }
  };

  return (
    <>
      <div style={{ marginBottom: "70px" }}>
        <Navbar />
      </div>
      <h3 className="pl-8 pt-10 text-base font-bold text-xl text-gray-900 ">
        Shopping Cart
      </h3>
      {loading ? (
        <div className="lg:flex lg:justify-between lg:items-start">
          <div className="lg:flex-1 lg:p-20 p-10">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {Array.from({ length: 3 }).map((_, index) => (
                  <CartItemSkeleton key={index} />
                ))}
              </ul>
            </div>
          </div>
          <div className="lg:flex-1 lg:pl-15 lg:p-20 p-5 lg:mt-20 bg-gray-50">
            <div className="animate-pulse space-y-4">
              <div className="h-6 bg-gray-300 rounded w-32"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-12 bg-gray-300 rounded w-full mt-6"></div>
            </div>
          </div>
        </div>
      ) : cartItems && cartItems.length > 0 ? (
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
                            <Link href={`/product/${item.products.id}`}>
                              {item.products.productName}
                            </Link>
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
          <div className="lg:flex-1 lg:pl-15 lg:p-20 p-5 px-5 bg-gray-50">
            {/* Reset Cart Button */}
            <button
              type="button"
              onClick={() => user?.id && resetCartSweet(user.id)}
              className="w-full mb-6 px-4 py-2.5 text-sm font-medium text-red-700 bg-white border border-red-300 rounded-lg hover:bg-red-50 hover:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200"
            >
              <svg className="w-4 h-4 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Clear Cart
            </button>

            {/* Order Summary Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Order Summary
                </h3>
                <p className="text-sm text-gray-600 mt-1">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>
              </div>

              {/* Order Details */}
              <div className="p-6 space-y-4">
                {/* Subtotal */}
                <div className="flex justify-between items-center py-2">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">Subtotal</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">${subTotal.toFixed(2)}</span>
                </div>

                {/* Shipping */}
                <div className="flex justify-between items-center py-2">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">Shipping</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">$5.00</span>
                </div>

                {/* Tax */}
                <div className="flex justify-between items-center py-2">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">Tax (2%)</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">${((subTotal * 2) / 100).toFixed(2)}</span>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 my-4"></div>

                {/* Total */}
                <div className="flex justify-between items-center py-3 bg-gray-50 rounded-lg px-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    <span className="text-lg font-bold text-gray-900">Total</span>
                  </div>
                  <span className="text-xl font-bold text-gray-900">${(subTotal + (subTotal * 2) / 100 + 5).toFixed(2)}</span>
                </div>

                {/* Checkout Button */}
                <div className="pt-4">
                  <Link
                    href="/checkout"
                    className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                    </svg>
                    Proceed to Checkout
                  </Link>
                </div>

                {/* Security Badge */}
                <div className="pt-4 text-center">
                  <div className="inline-flex items-center px-3 py-2 bg-green-50 text-green-700 rounded-lg text-xs font-medium">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Secure Checkout
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-4 min-h-[60vh]">
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
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          <h2 className="text-3xl font-bold text-gray-700 mb-3">
            Your Cart is Empty
          </h2>
          <p className="text-gray-500 text-center max-w-md mb-8">
            Looks like you haven't added anything to your cart yet. Start shopping to find amazing products!
          </p>
            <Link
              href="/products"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg transform hover:scale-105"
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
          </Link>
        </div>
      )}
      <Footer />
    </>
  );
};

export default withAuth(Cart);
