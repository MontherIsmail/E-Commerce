import {
  Navbar,
  Popular,
  Promo,
  CollectionSample,
  Catigories,
} from "./components";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Promo />
      <Popular />
      <CollectionSample />
      <Catigories />
    </div>
  );
}
