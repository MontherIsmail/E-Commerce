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
  const getProducts = async () => {
    const { getProducts } = createClient("");
    const data = await getProducts(1);
    setData(data);
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <Navbar />
      <Promo />
      <Popular data={data} />
      <CollectionSample />
      <Catigories />
      <Footer />
    </>
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
