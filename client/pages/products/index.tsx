import React, { useEffect, useState } from "react";
import { Navbar, Footer, Filters } from "../../components";
import createClient from "../../api";

const Products = () => {
  const [data , setData] = useState({});
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
      <Filters data={data} />
      <Footer />
    </>
  );
};

// export async function getStaticProps() {  
//   const { getProducts } = createClient("");
//   const data = await getProducts();
  
//   return {
//       props: { data },
//   };
// }

export default Products;
