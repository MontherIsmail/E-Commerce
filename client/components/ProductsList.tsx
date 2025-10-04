import Card from "./Card";
import { ProductCardSkeleton } from "./Skeletons";

interface ProductsListProps {
  data: any;
  productsCategory: string;
  sortedProducts: () => any; // sortedProducts function as a prop
  loading?: boolean;
}

const ProductsList: React.FC<ProductsListProps> = ({
  data,
  productsCategory,
  sortedProducts,
  loading = false,
}) => {
  // Use sortedProducts to get the sorted list of products
  const sortedData = sortedProducts();

  // Filter products based on the selected category
  const filteredProducts =
    productsCategory !== "all"
      ? sortedData?.filter(
          (product: any) => product.productCategory === productsCategory
        )
      : sortedData;

  return (
    <div className="bg-white">
      {loading ? (
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      ) : filteredProducts && filteredProducts.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {filteredProducts.map((product: any) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <svg
            className="w-32 h-32 text-gray-300 mb-6"
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
          <h3 className="text-2xl font-bold text-gray-700 mb-2">
            No Products Found
          </h3>
          <p className="text-gray-500 text-center max-w-md mb-6">
            {productsCategory !== "all"
              ? `We couldn't find any products in the "${productsCategory}" category. Try browsing all products or different categories.`
              : "We couldn't find any products at the moment. Please check back later!"}
          </p>
          {productsCategory !== "all" && (
            <a
              href="/products"
              className="inline-flex items-center px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              View All Products
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductsList;
