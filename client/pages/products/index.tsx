import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Navbar, Footer } from "../../components";
import Card from "../../components/Card";
import { ProductCardSkeleton } from "../../components/Skeletons";
import createClient from "../../api";
import { useRouter } from "next/router";

interface Product {
  id: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  productUrlImgs: string[];
  productCategory?: string;
  productRating?: number;
  productReviews?: number;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

interface ProductsResponse {
  products: Product[];
}

interface PriceRange {
  min: number;
  max: number;
}

type SortOption = "default" | "newest" | "oldest" | "price-low" | "price-high";

const Products = () => {
  const router = useRouter();
  const { category, sort } = router.query;

  // State
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSort, setSelectedSort] = useState<SortOption>("default");
  const [priceRange, setPriceRange] = useState<PriceRange>({ min: 0, max: 10000 });

  // Fetch products from API
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { getProducts } = createClient("");
      const response = await getProducts();
      
      // API returns products directly in the response, not in response.data
      // Same structure as men/women pages use
      const products = (response as any)?.products || [];
      
      console.log("Products fetched:", products.length);
      if (products.length > 0) {
        console.log("First product:", products[0]);
      }
      
      setAllProducts(products);
      
      if (products.length === 0) {
        setError("No products available. The database might be empty.");
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(`Failed to load products: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setAllProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Filter and sort products using useMemo for performance
  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts];

    console.log("Starting filter with", filtered.length, "products");

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.productCategory?.toLowerCase() === selectedCategory.toLowerCase()
      );
      console.log("After category filter:", filtered.length);
    }

    // Filter by price range
    filtered = filtered.filter(
      (product) => product.productPrice >= priceRange.min && product.productPrice <= priceRange.max
    );
    console.log("After price filter:", filtered.length, "Range:", priceRange);

    // Sort products
    switch (selectedSort) {
      case "newest":
        filtered.sort((a, b) => {
          const dateA = new Date(a.createdAt || 0).getTime();
          const dateB = new Date(b.createdAt || 0).getTime();
          return dateB - dateA;
        });
        break;
      case "oldest":
        filtered.sort((a, b) => {
          const dateA = new Date(a.createdAt || 0).getTime();
          const dateB = new Date(b.createdAt || 0).getTime();
          return dateA - dateB;
        });
        break;
      case "price-low":
        filtered.sort((a, b) => a.productPrice - b.productPrice);
        break;
      case "price-high":
        filtered.sort((a, b) => b.productPrice - a.productPrice);
        break;
      default:
        break;
    }

    console.log("Final filtered products:", filtered.length);
    return filtered;
  }, [allProducts, selectedCategory, selectedSort, priceRange]);

  // Reset all filters
  const handleResetFilters = useCallback(() => {
    setSelectedCategory("all");
    setSelectedSort("default");
    setPriceRange({ min: 0, max: 10000 });
  }, []);

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Handle URL query parameters
  useEffect(() => {
    if (category && typeof category === "string") {
      setSelectedCategory(category);
    }
    if (sort && typeof sort === "string" && ["default", "newest", "oldest", "price-low", "price-high"].includes(sort)) {
      setSelectedSort(sort as SortOption);
    }
  }, [category, sort]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f5f5f5', overflowX: 'hidden' }}>
      <div style={{ flex: 1, width: '100%', overflowX: 'hidden' }}>
        <Navbar />
        <div className="products-container">
            {/* Hero Header */}
            <div className="products-hero">
              <div className="hero-content">
                <h1 className="hero-title">
                  Discover Our Collection
                </h1>
                <p className="hero-subtitle">
                  {loading ? 'Loading products...' : `${filteredProducts.length} premium products available`}
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
              {/* Compact Filters Section */}
              <div className="filters-wrapper">
                <div className="filters-grid">
                  {/* Category Filter */}
                  <div className="filter-item">
                    <label className="filter-label">Category</label>
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
                    <label className="filter-label">Sort By</label>
                    <select
                      value={selectedSort}
                      onChange={(e) => setSelectedSort(e.target.value as SortOption)}
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
                  <div className="filter-item filter-item-price">
                    <label className="filter-label">Price Range: ${priceRange.min} - ${priceRange.max}</label>
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
                  <div className="filter-item filter-item-button">
                    <label className="filter-label" style={{ opacity: 0, pointerEvents: 'none' }}>Actions</label>
                    <button
                      onClick={handleResetFilters}
                      className="reset-button"
                      aria-label="Reset all filters"
                    >
                      <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Reset
                    </button>
                  </div>
                </div>
              </div>

              {/* Loading State */}
              {loading && (
                <div className="products-grid">
                  {[...Array(8)].map((_, index) => (
                    <ProductCardSkeleton key={index} />
                  ))}
                </div>
              )}

              {/* Error State */}
              {!loading && error && (
                <div className="empty-state">
                  <div className="empty-state-icon">
                    <svg className="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="empty-state-title">{error}</h3>
                  <button
                    onClick={fetchProducts}
                    className="empty-state-button"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {/* Products Grid */}
              {!loading && !error && filteredProducts.length > 0 && (
                <div className="products-grid">
                  {filteredProducts.map((product) => (
                    <Card key={product.id} product={product as any} />
                  ))}
                </div>
              )}

              {/* No Products Found */}
              {!loading && !error && allProducts.length > 0 && filteredProducts.length === 0 && (
                <div className="empty-state">
                  <div className="empty-state-icon">
                    <svg className="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                  </div>
                  <h3 className="empty-state-title">No products found</h3>
                  <p className="empty-state-description">
                    Try adjusting your filters to find what you're looking for.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="empty-state-button"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
      </div>
      <Footer />

      <style jsx>{`
        .products-container {
          animation: fadeIn 0.5s ease-in;
          width: 100%;
          overflow-x: hidden;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .products-hero {
          background: #f5ebe8;
          padding: 5rem 2rem 3rem;
          text-align: center;
          position: relative;
          overflow: hidden;
          width: 100%;
          margin-top: 64px;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 800px;
          margin: 0 auto;
        }

        .hero-title {
          font-size: 2.75rem;
          font-weight: 700;
          font-family: 'Poppins', sans-serif;
          color: #000;
          margin-bottom: 0.75rem;
          letter-spacing: -0.01em;
          line-height: 1.2;
        }

        .hero-subtitle {
          font-size: 1.125rem;
          color: rgba(0, 0, 0, 0.6);
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          margin: 0 auto;
          line-height: 1.5;
        }

        .filters-wrapper {
          background: white;
          border-radius: 0.75rem;
          padding: 1.5rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          margin-bottom: 2.5rem;
          border: 1px solid rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          width: 100%;
          max-width: 100%;
        }

        .filters-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(200px, 100%), 1fr));
          gap: 1rem;
          align-items: end;
          width: 100%;
        }

        .filter-item {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .filter-item-price {
          grid-column: span 1;
        }

        .filter-item-button {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }

        .filter-label {
          font-size: 0.8rem;
          font-weight: 600;
          font-family: 'Poppins', sans-serif;
          color: rgba(0, 0, 0, 0.6);
          margin-bottom: 0.25rem;
        }

        .filter-select {
          width: 100%;
          padding: 0.65rem 0.875rem;
          border: 1px solid rgba(0, 0, 0, 0.12);
          border-radius: 0.5rem;
          font-size: 0.9rem;
          font-weight: 500;
          font-family: 'Poppins', sans-serif;
          color: #000;
          background-color: #fafafa;
          transition: all 0.2s ease;
          cursor: pointer;
          outline: none;
        }

        .filter-select:hover {
          border-color: rgba(0, 0, 0, 0.25);
          background-color: white;
        }

        .filter-select:focus {
          border-color: #000;
          background-color: white;
          box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05);
        }

        .price-inputs {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .price-input {
          flex: 1;
          padding: 0.65rem 0.875rem;
          border: 1px solid rgba(0, 0, 0, 0.12);
          border-radius: 0.5rem;
          font-size: 0.9rem;
          font-weight: 500;
          font-family: 'Poppins', sans-serif;
          color: #000;
          background-color: #fafafa;
          transition: all 0.2s ease;
          outline: none;
          min-width: 0;
        }

        .price-input:hover {
          border-color: rgba(0, 0, 0, 0.25);
          background-color: white;
        }

        .price-input:focus {
          border-color: #000;
          background-color: white;
          box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05);
        }

        .price-separator {
          color: rgba(0, 0, 0, 0.4);
          font-weight: 500;
          font-size: 0.875rem;
          flex-shrink: 0;
        }

        .reset-button {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.65rem 1.25rem;
          background: #000;
          color: white;
          font-weight: 600;
          font-family: 'Poppins', sans-serif;
          font-size: 0.875rem;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.2s ease;
          width: 100%;
          white-space: nowrap;
        }

        .reset-button:hover {
          background: #1a1a1a;
          transform: translateY(-1px);
        }

        .reset-button:active {
          transform: translateY(0);
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(min(280px, 100%), 1fr));
          gap: 2rem;
          animation: slideUp 0.6s ease-out;
          width: 100%;
          max-width: 100%;
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
            gap: 0.875rem;
          }

          .products-grid {
            grid-template-columns: repeat(auto-fill, minmax(min(250px, 100%), 1fr));
            gap: 1.5rem;
          }
          
          .filters-wrapper {
            padding: 1.25rem;
          }

          .filter-item-button {
            margin-top: 0.5rem;
          }

          .filter-label {
            font-size: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Products;

