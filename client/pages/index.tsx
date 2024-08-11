import React from "react";
import {
  Navbar,
  Popular,
  Promo,
  CollectionSample,
  Catigories,
  Footer,
} from "../components";

const Home = () => {
  return (
    <>
      <Navbar />
      <Promo />
      <Popular />
      <CollectionSample />
      <Catigories />
      <Footer />
    </>
  );
};

export default Home;
