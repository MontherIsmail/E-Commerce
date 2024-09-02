import Card from "./Card";

interface ProductsListProps {
  data: any;
  productsCategory: string;
  sortedProducts: () => any; // sortedProducts function as a prop
}

const ProductsList: React.FC<ProductsListProps> = ({
  data,
  productsCategory,
  sortedProducts,
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
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {filteredProducts?.map((product: any) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
