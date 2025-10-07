import React, { useEffect, useState } from "react";
import { Navbar, Footer } from "../../components";
import Card from "../../components/Card";
import { ProductCardSkeleton } from "../../components/Skeletons";
import createClient from "../../api";
import { useRouter } from "next/router";

const Products = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
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
      
      // Apply filters
      let products = (data as any).products || [];
      
      // Filter by category if specified
      if (category) {
        products = products.filter((product: any) => 
          product.productCategory?.toLowerCase() === category.toString().toLowerCase()
        );
      }
      
      // Sort if specified
      if (sort === 'newest') {
        products = [...products].sort((a: any, b: any) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else if (sort === 'price-low') {
        products = [...products].sort((a: any, b: any) => a.price - b.price);
      } else if (sort === 'price-high') {
        products = [...products].sort((a: any, b: any) => b.price - a.price);
      }
      
      setFilteredProducts(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
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
                  {category ? `${category.toString().charAt(0).toUpperCase() + category.toString().slice(1)}'s Products` : 'All Products'}
                </h2>
                <div className="text-sm text-gray-500">
                  {loading ? 'Loading...' : `${filteredProducts.length} products`}
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

