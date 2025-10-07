import React, { useEffect, useState } from "react";
import { Navbar, Footer } from "../../components";
import Card from "../../components/Card";
import { ProductCardSkeleton } from "../../components/Skeletons";
import createClient from "../../api";
import { useRouter } from "next/router";

const Products = () => {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState("default");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const router = useRouter();
  const { category, sort } = router.query;

  const getProducts = async () => {
    try {
      setLoading(true);
      const { getProducts } = createClient("");
      // Add minimum delay to show skeleton loaders
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const data = await getProducts();
      setData(data);
      applyFilters((data as any).products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = (products: any[]) => {
    let filtered = [...products];
    
    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product: any) => 
        product.productCategory?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    // Filter by price range
    filtered = filtered.filter((product: any) => 
      product.price >= priceRange.min && product.price <= priceRange.max
    );
    
    // Sort products
    if (selectedSort === 'newest') {
      filtered = filtered.sort((a: any, b: any) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (selectedSort === 'oldest') {
      filtered = filtered.sort((a: any, b: any) => 
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    } else if (selectedSort === 'price-low') {
      filtered = filtered.sort((a: any, b: any) => a.price - b.price);
    } else if (selectedSort === 'price-high') {
      filtered = filtered.sort((a: any, b: any) => b.price - a.price);
    }
    
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    getProducts();
  }, []);
  
  useEffect(() => {
    if ((data as any).products) {
      applyFilters((data as any).products);
    }
  }, [selectedCategory, selectedSort, priceRange]);
  
  useEffect(() => {
    if (category) {
      setSelectedCategory(category.toString());
    }
    if (sort) {
      setSelectedSort(sort.toString());
    }
  }, [category, sort]);

  const isEmpty = (obj: object) => {
    return Object.keys(obj).length === 0;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div style={{ flex: 1 }}>
        <Navbar />
        {!isEmpty(data) || loading ? (
          <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                  All Products
                </h2>
                <div className="text-sm text-gray-500">
                  {loading ? 'Loading...' : `${filteredProducts.length} products`}
                </div>
              </div>

              {/* Filters Section */}
              <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                    >
                      <option value="all">All Categories</option>
                      <option value="men">Men</option>
                      <option value="women">Women</option>
                    </select>
                  </div>

                  {/* Sort Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sort By
                    </label>
                    <select
                      value={selectedSort}
                      onChange={(e) => setSelectedSort(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                    >
                      <option value="default">Default</option>
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                    </select>
                  </div>

                  {/* Price Range Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price Range: ${priceRange.min} - ${priceRange.max}
                    </label>
                    <div className="flex gap-2 items-center">
                      <input
                        type="number"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                        placeholder="Min"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                      <span className="text-gray-500">-</span>
                      <input
                        type="number"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                        placeholder="Max"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Reset Filters Button */}
                <div className="mt-4">
                  <button
                    onClick={() => {
                      setSelectedCategory("all");
                      setSelectedSort("default");
                      setPriceRange({ min: 0, max: 1000 });
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                  {[...Array(8)].map((_, index) => (
                    <ProductCardSkeleton key={index} />
                  ))}
                </div>
              ) : (
                <>
                  {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                      {filteredProducts.map((product: any) => (
                        <Card key={product.id} product={product} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                      <p className="text-gray-500">Try adjusting your filters or check back later.</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 text-center">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
                No Products Available
              </h2>
              <p className="text-gray-500">
                Check back soon for new products!
              </p>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Products;

