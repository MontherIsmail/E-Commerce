import React, { useEffect, useState } from "react";
import { Navbar, Footer, Filters } from "../../components";
import createClient from "../../api";

const Products = () => {
  const [data, setData] = useState({});
  const getProducts = async () => {
    const { getProducts } = createClient("");
    const data = await getProducts();
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

export default Products;
