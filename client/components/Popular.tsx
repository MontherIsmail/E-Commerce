import Card from "./Card";
import { ProductCardSkeleton } from "./Skeletons";

const Popular = ({data, loading = false}: any) => {
  const basePath = process.env.NODE_ENV === 'production' ? '/ecommerce' : '';
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
          <a href={`${basePath}/products`}>
            <button className="modern-btn">
              <span className="btn-text">See More</span>
              <div className="btn-shine"></div>
            </button>
          </a>
        </div>
        {loading ? (
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : products && products.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.slice(0, 4).map((product: any) => (
              <Card key={product?.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <svg
              className="w-24 h-24 text-gray-300 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Products Available
            </h3>
            <p className="text-gray-500 text-center">
              We're currently updating our collection. Check back soon!
            </p>
          </div>
        )}
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
      `}</style>
    </div>
  );
};

export default Popular;
