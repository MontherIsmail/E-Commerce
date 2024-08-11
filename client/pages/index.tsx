import {
  Navbar,
  Popular,
  Promo,
  CollectionSample,
  Catigories,
  Footer,
} from "./components";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Promo />
      <Popular />
      <CollectionSample />
      <Catigories />
      <Footer />
    </div>
  );
}
