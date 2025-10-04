import React, { useState, useEffect } from "react";
import {
  Navbar,
  Popular,
  Promo,
  CollectionSample,
  Catigories,
  Footer,
} from "../components";
import createClient from "../api";

const Home = () => {
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
  const isEmpty = (obj: object) => Object.keys(obj).length === 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div style={{ flex: 1 }}>
        <Navbar />
        <Promo />
        {!isEmpty(data) || loading ? (
          <>
            <Popular data={data} loading={loading} />
            <CollectionSample />
            <Catigories />
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '100px 20px', minHeight: '400px' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#666' }}>
              No Products Available
            </h2>
            <p style={{ color: '#999' }}>Check back later for new arrivals!</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

// export async function getStaticProps() {
//   const { getProducts } = createClient("");
//   const data = await getProducts();

//   return {
//     props: { data },
//   };
// }

export default Home;
