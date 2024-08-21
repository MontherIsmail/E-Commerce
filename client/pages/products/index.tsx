import React from "react";
import { Navbar, Footer, Filters } from "../../components";
import createClient from "../../api";

const Products = ({data}: any) => {
  return (
    <>
      <Navbar />
      <Filters data={data} />
      <Footer />
    </>
  );
};

export async function getStaticProps() {  
  const { getProducts } = createClient("");
  const data = await getProducts();
  
  return {
      props: { data },
  };
}

export default Products;
