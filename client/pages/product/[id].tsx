"use client";

import { useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Radio, RadioGroup } from "@headlessui/react";
import { Footer, Navbar, RelatedProducts } from "../../components";
import createClient from "../../api";
import { GetStaticPaths, GetStaticProps } from "next";
import Swal from 'sweetalert2';

const reviews = { href: "#", average: 4, totalCount: 117 };

const classNames = (...classes: any) => {
  return classes.filter(Boolean).join(" ");
};

const Product = ({ product, products, userId }: any) => {
  const [selectedColor, setSelectedColor] = useState(product.productColors[0]);
  const [selectedSize, setSelectedSize] = useState(product.productSizes[2]);
  const [quantity, setQuantity] = useState(1);

  const addToCartFun = async (e: any) => {
    e.preventDefault();
    const { addToCart } = createClient("");
    const cartItem = {
      productId: product.id,
      userId,
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
        timer: 1500
      });
      console.log("Product added to cart:", response);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ marginTop: "70px" }} className="bg-white">
        <div className="pt-6">
          <nav aria-label="Breadcrumb">
            <ol
              role="list"
              className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
            >
              <li>
                <div className="flex items-center">
                  <a
                    href="/men"
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    men
                  </a>
                  <svg
                    fill="currentColor"
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
              <li className="text-sm">
                <a
                  href={product.href}
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  {product.productName}
                </a>
              </li>
            </ol>
          </nav>
          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2"></div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <h1 className="text-2xl font-bold tracking-tight mb-5 text-gray-900 sm:text-3xl">
                {product.productName}
              </h1>
              <p className="text-3xl tracking-tight text-green-500">
                ${product.productPrice}
              </p>

              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        aria-hidden="true"
                        className={classNames(
                          reviews.average > rating
                            ? "text-yellow-500"
                            : "text-gray-200",
                          "h-5 w-5 flex-shrink-0"
                        )}
                      />
                    ))}
                  </div>
                  <p className="sr-only">{reviews.average} out of 5 stars</p>
                  <a
                    href={reviews.href}
                    className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {reviews.totalCount} reviews
                  </a>
                </div>
              </div>

              <form className="mt-10" onSubmit={addToCartFun}>
                {/* Colors */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Color</h3>

                  <fieldset aria-label="Choose a color" className="mt-4">
                    <RadioGroup
                      value={selectedColor}
                      onChange={setSelectedColor}
                      className="flex items-center space-x-3"
                    >
                      {product.productColors.map((color: any) => (
                        <Radio
                          key={color.name}
                          value={color}
                          aria-label={color.name}
                          className={classNames(
                            color.selectedClass,
                            "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none data-[checked]:ring-2"
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
                </div>

                {/* Sizes */}
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                    <a
                      href="#"
                      className="text-sm font-medium text-green-600 hover:text-green-500"
                    >
                      Size guide
                    </a>
                  </div>

                  <fieldset aria-label="Choose a size" className="mt-4">
                    <RadioGroup
                      value={selectedSize}
                      onChange={setSelectedSize}
                      className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                    >
                      {product.productSizes.map((size: any) => (
                        <Radio
                          key={size.name}
                          value={size}
                          disabled={!size.inStock}
                          className={classNames(
                            size.inStock
                              ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                              : "cursor-not-allowed bg-gray-50 text-gray-200",
                            "group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1 sm:py-6"
                          )}
                        >
                          <span>{size.name}</span>
                          {size.inStock ? (
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-green-500"
                            />
                          ) : (
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-px  border-2 border-gray-200"
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
                </div>

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
                  className="mt-10 flex w-full items-center justify-center  border border-transparent bg-green-600 px-8 py-3 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add to Cart
                </button>
              </form>
            </div>

            <div className="lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pr-8 lg:pt-6">
              <div className="mx-auto max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                  <img
                    alt={product.productUrlImgs[1]}
                    src={product.productUrlImgs[1]}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                  <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                    <img
                      alt={product.productUrlImgs[1]}
                      src={product.productUrlImgs[1]}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                    <img
                      alt={product.productUrlImgs[2]}
                      src={product.productUrlImgs[2]}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mt-10 lg:px-7">
                <h3 className="text-sm font-medium text-gray-900 mb-5">
                  Description
                </h3>
                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product.productDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ padding: "0 70px" }}>
        <RelatedProducts products={products} />
      </div>
      <Footer />
    </>
  );
};

interface ProductPageProps {
  product: any;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { getProducts } = createClient("");
  const data = await getProducts();
  const { products } = data;

  const paths = products.map((product: { id: string }) => ({
    params: { id: product.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<ProductPageProps> = async (
  context
) => {
  const { id } = context.params!;

  const { getProduct, getProducts } = createClient("");
  const productData = await getProduct(id);
  const { product } = productData;
  const productsData = await getProducts();
  const { products } = productsData;

  const userId = 1;

  return {
    props: {
      product,
      products,
      userId,
    },
  };
};

export default Product;
