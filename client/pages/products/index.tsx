import React, { useEffect, useState } from "react";
import { Navbar, Footer, Filters } from "../../components";
import createClient from "../../api";

const Products = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const getProducts = async () => {
    try {
      setLoading(true);
      const { getProducts } = createClient("");
      // Add minimum delay to show skeleton loaders
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const data = await getProducts();
      setData(data);
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
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div style={{ flex: 1 }}>
        <Navbar />
        {!isEmpty(data) || loading ? (
          <Filters data={data} loading={loading} />
        ) : (
          <div style={{ textAlign: 'center', padding: '100px 20px', minHeight: '400px' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#666' }}>
              No Products Found
            </h2>
            <p style={{ color: '#999', marginBottom: '2rem' }}>
              We're currently updating our inventory. Please check back soon!
            </p>
            <a
              href="/"
              style={{
                display: 'inline-block',
                padding: '12px 30px',
                backgroundColor: '#000',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '4px',
              }}
            >
              Go to Home
            </a>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Products;
