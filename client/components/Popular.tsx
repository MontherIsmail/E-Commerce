import Card from "./Card";

// const products = [
//   {
//     id: 1,
//     name: "Basic Tee",
//     href: "#",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
//   {
//     id: 1,
//     name: "Basic Tee",
//     href: "#",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
//   {
//     id: 1,
//     name: "Basic Tee",
//     href: "#",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-03.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
//   {
//     id: 1,
//     name: "Basic Tee",
//     href: "#",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-04.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },

//   // More products...
// ];

const Popular = ({data}: any) => {
  const { products } = data
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-center">
          <div>
            <p className="p-style">Summer Collection</p>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Popular T-Shirts
            </h2>
          </div>
          <a href="/products">
            <button className="see-more">See More</button>
          </a>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products?.slice(0, 4).map((product: any) => (
            <Card product={product} />
          ))}
        </div>
      </div>
      <style jsx>{`
        .p-style {
          color: rgba(0, 0, 0, 0.6);
          line-height: 1.25em;
          font-weight: 400;
          font-family: "Poppins", sans-serif;
          font-size: 0.8rem;
          margin-bottom: 5px;
        }
        .see-more {
          padding: 5px 10px;
          background: none;
          color: #000;
          margin-top: 30px;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default Popular;
