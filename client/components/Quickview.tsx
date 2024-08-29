"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Radio,
  RadioGroup,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";
import createClient from "../api";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import router from "next/router";

const classNames = (...classes: any) => {
  return classes.filter(Boolean).join(" ");
};

const Quickview = ({ id }: any) => {
  const [open, setOpen] = useState<any>(false);
  const [product, setProduct] = useState<any>(null);
  const [selectedColor, setSelectedColor] = useState<any>(
    product?.productColors[0]?.selectedClass
  );
  const [selectedSize, setSelectedSize] = useState<any>(
    product?.productSizes[0]?.selectedClass
  );
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useAuth();

  const addToCartFun = async (e: any) => {
    e.preventDefault();
    if (user?.id) {
      const { addToCart } = createClient("");
      const cartItem = {
        productId: id,
        userId: user?.id,
        selectedColor: selectedColor.name,
        selectedSize: selectedSize.name,
        quantity,
      };

      try {
        const response = await addToCart(cartItem);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Product Added to Cart",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log("Product added to cart:", response);
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    } else {
      router.push("/login");
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { getProduct } = createClient("");
        const data = await getProduct(id);
        return setProduct(data.product);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  return (
    <div>
      <button
        style={{
          padding: "3px 0",
          width: "100%",
          border: "none",
          backgroundColor: "#000",
          color: "white",
          fontSize: "1rem",
          marginTop: "10px",
        }}
        onClick={() => setOpen(true)}
      >
        Quickview
      </button>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:block"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            <DialogPanel
              transition
              className="flex w-full transform text-left text-base transition data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:my-8 md:max-w-2xl md:px-4 data-[closed]:md:translate-y-0 data-[closed]:md:scale-95 lg:max-w-4xl"
            >
              <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </button>

                <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                  <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                    <img
                      alt="Product Image Alt"
                      src={product?.productUrlImgs[0]}
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="sm:col-span-8 lg:col-span-7">
                    <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                      {product?.productName}
                    </h2>

                    <section
                      aria-labelledby="information-heading"
                      className="mt-2"
                    >
                      <h3 id="information-heading" className="sr-only">
                        Product information
                      </h3>

                      <p className="text-2xl text-green-500">
                        {product?.productPrice}
                      </p>

                      {/* Reviews */}
                      <div className="mt-6">
                        <h4 className="sr-only">Reviews</h4>
                        <div className="flex items-center">
                          <div className="flex items-center">
                            {[0, 1, 2, 3, 4].map((rating) => (
                              <StarIcon
                                key={rating}
                                aria-hidden="true"
                                className={classNames(
                                  3.9 > rating
                                    ? "text-yellow-500"
                                    : "text-gray-200",
                                  "h-5 w-5 flex-shrink-0"
                                )}
                              />
                            ))}
                          </div>
                          <p className="sr-only">3.9 out of 5 stars</p>
                          <a
                            href="#"
                            className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            117 reviews
                          </a>
                        </div>
                      </div>
                    </section>

                    <section
                      aria-labelledby="options-heading"
                      className="mt-10"
                    >
                      <h3 id="options-heading" className="sr-only">
                        Product options
                      </h3>

                      <form onSubmit={addToCartFun}>
                        {/* Colors */}
                        <fieldset aria-label="Choose a color">
                          <legend className="text-sm font-medium text-gray-900">
                            Color
                          </legend>

                          <RadioGroup
                            value={selectedColor}
                            onChange={setSelectedColor}
                            className="mt-4 flex items-center space-x-3"
                          >
                            {product?.productColors?.map((color: any) => (
                              <Radio
                                key={color.name}
                                value={color}
                                aria-label={color.name}
                                className={classNames(
                                  color.selectedClass,
                                  "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none data-[checked]:ring-2 data-[focus]:data-[checked]:ring data-[focus]:data-[checked]:ring-offset-1"
                                )}
                              >
                                <span
                                  aria-hidden="true"
                                  className={classNames(
                                    color.class,
                                    "h-8 w-8 rounded-full border border-black border-opacity-10"
                                  )}
                                />
                              </Radio>
                            ))}
                          </RadioGroup>
                        </fieldset>

                        {/* Sizes */}
                        <fieldset aria-label="Choose a size" className="mt-10">
                          <div className="flex items-center justify-between">
                            <div className="text-sm font-medium text-gray-900">
                              Size
                            </div>
                            <a
                              href="#"
                              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              Size guide
                            </a>
                          </div>

                          <RadioGroup
                            value={selectedSize}
                            onChange={setSelectedSize}
                            className="mt-4 grid grid-cols-4 gap-4"
                          >
                            {product?.productSizes?.map((size: any) => (
                              <Radio
                                key={size.name}
                                value={size}
                                disabled={!size.inStock}
                                className={classNames(
                                  size.inStock
                                    ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                    : "cursor-not-allowed bg-gray-50 text-gray-200",
                                  "group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1"
                                )}
                              >
                                <span>{size.name}</span>
                                {size.inStock ? (
                                  <span
                                    aria-hidden="true"
                                    className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
                                  />
                                ) : (
                                  <span
                                    aria-hidden="true"
                                    className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                  >
                                    <svg
                                      stroke="currentColor"
                                      viewBox="0 0 100 100"
                                      preserveAspectRatio="none"
                                      className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                    >
                                      <line
                                        x1={0}
                                        x2={100}
                                        y1={100}
                                        y2={0}
                                        vectorEffect="non-scaling-stroke"
                                      />
                                    </svg>
                                  </span>
                                )}
                              </Radio>
                            ))}
                          </RadioGroup>
                        </fieldset>
                        {/* Quantity */}
                        <div className="mt-10">
                          <h3 className="text-sm font-medium text-gray-900">
                            Quantity
                          </h3>
                          <div className="relative mt-4">
                            <select
                              id="quantity"
                              name="quantity"
                              onChange={(e: any) =>
                                setQuantity(parseInt(e.target.value))
                              }
                              className="block w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-base leading-5 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                              {[...Array(10).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="mt-6 flex w-full items-center justify-center border border-transparent bg-green-600 px-8 py-3 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Add to Cart
                        </button>
                      </form>
                    </section>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Quickview;
