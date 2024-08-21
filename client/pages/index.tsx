import React from "react";
import {
  Navbar,
  Popular,
  Promo,
  CollectionSample,
  Catigories,
  Footer,
} from "../components";
import createClient from "../api";

const Home = ({ data }: any) => {
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

export async function getStaticProps() {
  const { getProducts } = createClient("");
  const data = await getProducts();

  return {
    props: { data },
  };
}

export default Home;
