import React, { useEffect, useState } from "react";
import { Navbar, Footer } from "../../components";
import Card from "../../components/Card";
import { ProductCardSkeleton } from "../../components/Skeletons";
import createClient from "../../api";
import { useRouter } from "next/router";

const WomenProducts = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getProducts = async () => {
    try {
      setLoading(true);
      const { getProducts } = createClient("");
      // Add minimum delay to show skeleton loaders
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const data = await getProducts();
      // Filter only women products
      const womenProducts = {
        ...data,
        products: (data as any).products?.filter((product: any) => 
          product.productCategory?.toLowerCase() === 'women'
        ) || []
      };
      setData(womenProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const isEmpty = (obj: object) => {
    return Object.keys(obj).length === 0;
  };

  const products = (data as any).products || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div style={{ flex: 1 }}>
        <Navbar />
        {!isEmpty(data) || loading ? (
          <div className="bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                  Women's Collection
                </h1>
              </div>
              <section aria-labelledby="products-heading" className="pb-24 pt-6">
                <h2 id="products-heading" className="sr-only">
                  Products
                </h2>
                <div className="bg-white">
                  {loading ? (
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                      {Array.from({ length: 8 }).map((_, index) => (
                        <ProductCardSkeleton key={index} />
                      ))}
                    </div>
                  ) : products && products.length > 0 ? (
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                      {products.map((product: any) => (
                        <Card key={product.id} product={product} />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-20 px-4">
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
                          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        />
                      </svg>
                      <h3 className="text-2xl font-bold text-gray-700 mb-2">
                        No Women's Products Found
                      </h3>
                      <p className="text-gray-500 text-center max-w-md mb-6">
                        We couldn't find any women's products at the moment. Please check back later!
                      </p>
                      <a
                        href="/products"
                        className="inline-flex items-center px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200"
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
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                          />
                        </svg>
                        View All Products
                      </a>
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '100px 20px', minHeight: '400px' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#666' }}>
              No Women's Products Found
            </h2>
            <p style={{ color: '#999', marginBottom: '2rem' }}>
              We're currently updating our women's collection. Please check back soon!
            </p>
            <a
              href="/products"
              style={{
                display: 'inline-block',
                padding: '12px 30px',
                backgroundColor: '#000',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '4px',
              }}
            >
              View All Products
            </a>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default WomenProducts;
