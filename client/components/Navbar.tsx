"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import logo from "../assets/logo.png";
import ProfileMenu from "./ProfileMenu";
import createClient from "../api";
import { useAuth } from "../context/AuthContext";

const navigation = [
  { name: "Products", href: "/products" },
  { name: "Men", href: "products" },
  { name: "Women", href: "products" },
  { name: "About Us", href: "/about" },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const { logout } = useAuth();

  const getCartItems = async () => {
    const { getCart } = createClient("");
    const data = await getCart(1);
    return setCartItems(data.cartItems);
  };

  useEffect(() => {
    getCartItems();
    console.log('cart items from nav', cartItems);
  }, []);

  const cartItemCount = cartItems ? cartItems.length : 0;
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <Image alt="" src={logo} className="h-8 w-auto" />
          </a>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="lg:flex lg:flex-1 lg:justify-end flex justify-between">
          {true ? (
            <>
              <div className="ml-4 flow-root lg:ml-6 mr-5">
                <a href="/cart" className="group -m-2 flex items-center p-2">
                  <ShoppingBagIcon
                    aria-hidden="true"
                    className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                    {cartItemCount}
                  </span>
                  <span className="sr-only">items in cart, view bag</span>
                </a>
              </div>
              <div className="hidden lg:flex lg:gap-x-12">
                <ProfileMenu />
              </div>
            </>
          ) : (
            <div className="hidden lg:flex lg:gap-x-12">
              <a
                href="/login"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Log in <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          )}

          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>
      {/********************************************************* */}

      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Image alt="" src={logo} className="h-8 w-auto" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                {false ? (
                  <a
                    href="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                ) : (
                  <>
                    <a
                      href="/profile"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Profile
                    </a>
                    <a
                      href="/login"
                      onClick={() => logout()}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Log out
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Navbar;
