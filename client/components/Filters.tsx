"use client";

import { useState } from "react";
import { Dialog, Disclosure, Menu } from "@headlessui/react";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import ProductsList from "./ProductsList";

const sortOptions = [
  { name: "Most Popular", value: "popular", current: true },
  { name: "Best Rating", value: "rating", current: false },
  { name: "Newest", value: "newest", current: false },
  { name: "Price: Low to High", value: "priceAsc", current: false },
  { name: "Price: High to Low", value: "priceDesc", current: false },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const Filters = ({ data }: any) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [productsCategory, setProductsCategory] = useState("all");
  const [sortOption, setSortOption] = useState("popular");

  const handleCategoryChange = (value: string) => {
    setProductsCategory(value);
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
  };

  const filters = [
    {
      id: "category",
      name: "Category",
      options: [
        { value: "all", label: "All", checked: true },
        { value: "men", label: "Men", checked: false },
        { value: "women", label: "Women", checked: false },
      ],
    },
    // Add other filter sections here
  ];

  const sortedProducts = () => {
    let filteredProducts =
      productsCategory !== "all"
        ? data.products.filter(
            (product: any) => product.productCategory === productsCategory
          )
        : data.products;

    switch (sortOption) {
      case "rating":
        return filteredProducts.sort((a: any, b: any) => b.rating - a.rating);
      case "newest":
        return filteredProducts.sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "priceAsc":
        return filteredProducts.sort(
          (a: any, b: any) => a.productPrice - b.productPrice
        );
      case "priceDesc":
        return filteredProducts.sort(
          (a: any, b: any) => b.productPrice - a.productPrice
        );
      default:
        return filteredProducts; // Most popular or default sorting
    }
  };

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Dialog
          open={mobileFiltersOpen}
          onClose={() => setMobileFiltersOpen(false)}
          className="relative z-40 lg:hidden"
        >
          <div className="fixed inset-0 z-40 flex">
            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                {/* Category Filter */}
                <Disclosure
                  key={"category"}
                  as="div"
                  className="border-t border-gray-200 px-4 py-6"
                >
                  <h3 className="-mx-2 -my-3 flow-root">
                    <Disclosure.Button className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                      <span className="font-medium text-gray-900">
                        Category
                      </span>
                      <span className="ml-6 flex items-center">
                        <PlusIcon
                          aria-hidden="true"
                          className="h-5 w-5 group-open:hidden"
                        />
                        <MinusIcon
                          aria-hidden="true"
                          className="h-5 w-5 hidden group-open:block"
                        />
                      </span>
                    </Disclosure.Button>
                  </h3>
                  <Disclosure.Panel className="pt-6">
                    <div className="space-y-6">
                      {filters[0].options.map((option: any, optionIdx: any) => (
                        <div key={option.value} className="flex items-center">
                          <input
                            value={option.value}
                            checked={productsCategory === option.value}
                            onChange={() => handleCategoryChange(option.value)}
                            id={`filter-mobile-category-${optionIdx}`}
                            name={`category`}
                            type="radio"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor={`filter-mobile-category-${optionIdx}`}
                            className="ml-3 min-w-0 flex-1 text-gray-500"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </Disclosure.Panel>
                </Disclosure>
              </form>
            </Dialog.Panel>
          </div>
        </Dialog>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <p className="text-1xl tracking-tight text-gray-600">
              Products / {productsCategory}
            </p>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </Menu.Button>
                </div>

                <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <Menu.Item key={option.value}>
                        {({ active }) => (
                          <a
                            href="#"
                            onClick={() => handleSortChange(option.value)}
                            className={classNames(
                              sortOption === option.value
                                ? "font-medium text-gray-900"
                                : "text-gray-500",
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            {option.name}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Menu>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <Disclosure
                  key={"category"}
                  as="div"
                  className="border-b border-gray-200 py-6"
                >
                  <h3 className="-my-3 flow-root">
                    <Disclosure.Button className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                      <span className="font-medium text-gray-900">
                        Category
                      </span>
                      <span className="ml-6 flex items-center">
                        <PlusIcon
                          aria-hidden="true"
                          className="h-5 w-5 group-open:hidden"
                        />
                        <MinusIcon
                          aria-hidden="true"
                          className="h-5 w-5 hidden group-open:block"
                        />
                      </span>
                    </Disclosure.Button>
                  </h3>
                  <Disclosure.Panel className="pt-6">
                    <div className="space-y-4">
                      {filters[0].options.map((option, optionIdx) => (
                        <div key={option.value} className="flex items-center">
                          <input
                            value={option.value}
                            checked={productsCategory === option.value}
                            onChange={() => handleCategoryChange(option.value)}
                            id={`filter-category-${optionIdx}`}
                            name={`category`}
                            type="radio"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor={`filter-category-${optionIdx}`}
                            className="ml-3 text-sm text-gray-600"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </Disclosure.Panel>
                </Disclosure>
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                <ProductsList
                  data={data}
                  sortedProducts={() => sortedProducts()}
                  productsCategory={productsCategory}
                />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Filters;
