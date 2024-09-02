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
  const isEmpty = (obj: object) => {
    return Object.keys(obj).length === 0;
  };
  return (
    <>
      <Navbar />
      {!isEmpty(data) ? <Filters data={data} /> : <h2 style={{margin: "200px"}}>No Products</h2>}
      <Footer />
    </>
  );
};

export default Products;
