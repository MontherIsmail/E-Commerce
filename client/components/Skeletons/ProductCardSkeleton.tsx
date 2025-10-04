const ProductCardSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
        <div className="h-full w-full bg-gray-300"></div>
      </div>
      <div className="mt-4 flex justify-between">
        <div className="flex-1">
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="h-4 bg-gray-300 rounded w-16"></div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;

