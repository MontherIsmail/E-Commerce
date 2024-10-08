import Card from "./Card";

const RelatedProducts = ({products}: any) => {  
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Related Products
          </h2>
          <a href="/products">
          <button className="see-more">See More</button>
          </a>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {Array.isArray(products) ? products?.slice(0, 4).map((product: any) => (
            <Card product={product} />
          )) : <h2>No Products</h2>}
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

export default RelatedProducts;
