import Card from "./Card";

const ProductsList = ({ data }: any) => {
  const { products } = data;

  return (
    <div className="bg-white">
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {products?.map((product: any) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
