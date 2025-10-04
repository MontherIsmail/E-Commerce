const CartItemSkeleton = () => {
  return (
    <li className="flex py-6 animate-pulse">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-gray-300"></div>
      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between">
            <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-16"></div>
          </div>
          <div className="h-3 bg-gray-200 rounded w-20 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-16"></div>
        </div>
        <div className="flex flex-1 items-end justify-between">
          <div className="h-8 bg-gray-300 rounded w-24"></div>
          <div className="h-8 bg-gray-300 rounded w-16"></div>
        </div>
      </div>
    </li>
  );
};

export default CartItemSkeleton;

