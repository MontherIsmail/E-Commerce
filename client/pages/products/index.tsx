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
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const router = useRouter();
  const { category, sort } = router.query;

  const getProducts = async () => {
    try {
      setLoading(true);
      const { getProducts } = createClient("");
      // Add minimum delay to show skeleton loaders
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const data = await getProducts();
      console.log("Products data:", data);
      console.log("Products array:", (data as any).products);
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
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)' }}>
      <div style={{ flex: 1 }}>
        <Navbar />
        {!isEmpty(data) || loading ? (
          <div className="products-container">
            {/* Hero Header */}
            <div className="products-hero">
              <div className="hero-content">
                <h1 className="hero-title">
                  Discover Our <span className="gradient-text">Collection</span>
                </h1>
                <p className="hero-subtitle">
                  {loading ? 'Loading amazing products...' : `${filteredProducts.length} premium products available`}
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
              {/* Modern Filters Section */}
              <div className="filters-wrapper">
                <div className="filters-header">
                  <div className="filters-icon">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                  </div>
                  <h3 className="filters-title">Filters</h3>
                </div>

                <div className="filters-grid">
                  {/* Category Filter */}
                  <div className="filter-item">
                    <label className="filter-label">
                      <svg className="filter-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      Category
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="filter-select"
                    >
                      <option value="all">All Categories</option>
                      <option value="men">Men</option>
                      <option value="women">Women</option>
                    </select>
                  </div>

                  {/* Sort Filter */}
                  <div className="filter-item">
                    <label className="filter-label">
                      <svg className="filter-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                      </svg>
                      Sort By
                    </label>
                    <select
                      value={selectedSort}
                      onChange={(e) => setSelectedSort(e.target.value)}
                      className="filter-select"
                    >
                      <option value="default">Default</option>
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                    </select>
                  </div>

                  {/* Price Range Filter */}
                  <div className="filter-item">
                    <label className="filter-label">
                      <svg className="filter-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Price Range
                    </label>
                    <div className="price-range-display">
                      ${priceRange.min} - ${priceRange.max}
                    </div>
                    <div className="price-inputs">
                      <input
                        type="number"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                        placeholder="Min"
                        className="price-input"
                      />
                      <span className="price-separator">—</span>
                      <input
                        type="number"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                        placeholder="Max"
                        className="price-input"
                      />
                    </div>
                  </div>

                  {/* Reset Button */}
                  <div className="filter-item filter-item-center">
                    <button
                      onClick={() => {
                        setSelectedCategory("all");
                        setSelectedSort("default");
                        setPriceRange({ min: 0, max: 10000 });
                      }}
                      className="reset-button"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Reset Filters
                    </button>
                  </div>
                </div>
              </div>

              {loading ? (
                <div className="products-grid">
                  {[...Array(8)].map((_, index) => (
                    <ProductCardSkeleton key={index} />
                  ))}
                </div>
              ) : (
                <>
                  {filteredProducts.length > 0 ? (
                    <div className="products-grid">
                      {filteredProducts.map((product: any) => (
                        <Card key={product.id} product={product} />
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state">
                      <div className="empty-state-icon">
                        <svg className="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                      </div>
                      <h3 className="empty-state-title">No products found</h3>
                      <p className="empty-state-description">
                        Try adjusting your filters or search criteria to find what you're looking for.
                      </p>
                      <button
                        onClick={() => {
                          setSelectedCategory("all");
                          setSelectedSort("default");
                          setPriceRange({ min: 0, max: 10000 });
                        }}
                        className="empty-state-button"
                      >
                        Clear All Filters
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="empty-state-full">
            <div className="empty-state-icon">
              <svg className="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="empty-state-title">No products available</h3>
            <p className="empty-state-description">Check back soon for new arrivals!</p>
          </div>
        )}
      </div>
      <Footer />

      <style jsx>{`
        .products-container {
          animation: fadeIn 0.5s ease-in;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .products-hero {
          background: linear-gradient(135deg, #faedeb 0%, #f0e6e3 100%);
          padding: 6rem 2rem 4rem;
          text-align: center;
          position: relative;
          overflow: hidden;
          animation: fadeInUp 0.8s ease-out;
        }

        .products-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0.1;
          background-image: radial-gradient(circle, rgba(0, 0, 0, 0.3) 1px, transparent 1px);
          background-size: 20px 20px;
          animation: float 6s ease-in-out infinite;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
        }

        .hero-title {
          font-size: 3rem;
          font-weight: 600;
          font-family: 'Poppins', sans-serif;
          color: #000;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
          line-height: 1.1;
          animation: slideInUp 0.6s ease-out 0.4s both;
        }

        .gradient-text {
          background: linear-gradient(135deg, #000 0%, #333 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: rgba(0, 0, 0, 0.6);
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
          animation: slideInUp 0.6s ease-out 0.6s both;
        }

        .filters-wrapper {
          background: rgba(255, 255, 255, 0.5);
          border-radius: 1rem;
          padding: 2rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          margin-bottom: 3rem;
          border: 1px solid rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .filters-wrapper:hover {
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .filters-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }

        .filters-icon {
          width: 2.5rem;
          height: 2.5rem;
          background: #000;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .filters-title {
          font-size: 1.5rem;
          font-weight: 600;
          font-family: 'Poppins', sans-serif;
          color: #000;
          margin: 0;
        }

        .filters-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          align-items: end;
        }

        .filter-item {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .filter-item-center {
          justify-content: flex-end;
        }

        .filter-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          font-weight: 600;
          font-family: 'Poppins', sans-serif;
          color: rgba(0, 0, 0, 0.7);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .filter-icon {
          width: 1.25rem;
          height: 1.25rem;
          color: rgba(0, 0, 0, 0.6);
        }

        .filter-select {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 0.5rem;
          font-size: 1rem;
          font-weight: 500;
          font-family: 'Poppins', sans-serif;
          color: rgba(0, 0, 0, 0.7);
          background-color: rgba(255, 255, 255, 0.8);
          transition: all 0.2s ease;
          cursor: pointer;
          outline: none;
        }

        .filter-select:hover {
          border-color: rgba(0, 0, 0, 0.2);
          background-color: rgba(255, 255, 255, 1);
        }

        .filter-select:focus {
          border-color: rgba(0, 0, 0, 0.3);
          background-color: white;
          box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05);
        }

        .price-range-display {
          font-size: 0.875rem;
          font-weight: 600;
          font-family: 'Poppins', sans-serif;
          color: #000;
          padding: 0.5rem 0;
        }

        .price-inputs {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .price-input {
          flex: 1;
          padding: 0.75rem 1rem;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 0.5rem;
          font-size: 1rem;
          font-weight: 500;
          font-family: 'Poppins', sans-serif;
          color: rgba(0, 0, 0, 0.7);
          background-color: rgba(255, 255, 255, 0.8);
          transition: all 0.2s ease;
          outline: none;
        }

        .price-input:hover {
          border-color: rgba(0, 0, 0, 0.2);
          background-color: rgba(255, 255, 255, 1);
        }

        .price-input:focus {
          border-color: rgba(0, 0, 0, 0.3);
          background-color: white;
          box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05);
        }

        .price-separator {
          color: rgba(0, 0, 0, 0.6);
          font-weight: 600;
        }

        .reset-button {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem 1.5rem;
          background: #000;
          color: white;
          font-weight: 600;
          font-family: 'Poppins', sans-serif;
          font-size: 0.9rem;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .reset-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
          background: #333;
        }

        .reset-button:active {
          transform: translateY(0);
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 2rem;
          animation: slideUp 0.6s ease-out;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          animation: fadeIn 0.5s ease-in;
        }

        .empty-state-full {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 60vh;
          padding: 2rem;
        }

        .empty-state-icon {
          width: 120px;
          height: 120px;
          background: rgba(0, 0, 0, 0.05);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 2rem;
        }

        .empty-icon {
          width: 60px;
          height: 60px;
          color: rgba(0, 0, 0, 0.4);
        }

        .empty-state-title {
          font-size: 2rem;
          font-weight: 600;
          font-family: 'Poppins', sans-serif;
          color: #000;
          margin-bottom: 0.75rem;
        }

        .empty-state-description {
          font-size: 1.125rem;
          color: rgba(0, 0, 0, 0.6);
          font-family: 'Poppins', sans-serif;
          margin-bottom: 2rem;
          max-width: 500px;
          line-height: 1.6;
        }

        .empty-state-button {
          padding: 1rem 2rem;
          background: #000;
          color: white;
          font-weight: 600;
          font-family: 'Poppins', sans-serif;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          font-size: 1rem;
        }

        .empty-state-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
          background: #333;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2rem;
          }

          .hero-subtitle {
            font-size: 1rem;
          }

          .filters-grid {
            grid-template-columns: 1fr;
          }

          .products-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Products;

