const OrderSkeleton = () => {
  return (
    <div className="animate-pulse mb-8">
      {/* Order Header */}
      <div className="bg-gray-200 p-8 lg:flex lg:justify-between lg:items-center">
        <div className="lg:flex lg:justify-between lg:items-center lg:w-2/5 space-y-4 lg:space-y-0 lg:space-x-8">
          <div className="flex flex-col space-y-2">
            <div className="h-3 bg-gray-300 rounded w-20"></div>
            <div className="h-4 bg-gray-400 rounded w-24"></div>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="h-3 bg-gray-300 rounded w-24"></div>
            <div className="h-4 bg-gray-400 rounded w-16"></div>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="h-3 bg-gray-300 rounded w-20"></div>
            <div className="h-4 bg-gray-400 rounded w-20"></div>
          </div>
        </div>
        <div className="h-10 bg-gray-300 rounded lg:w-32 w-full mt-4 lg:mt-0"></div>
      </div>
      
      {/* Order Items */}
      <div className="py-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4 w-1/3">
            <div className="h-24 w-24 bg-gray-300 rounded-md"></div>
            <div className="h-4 bg-gray-300 rounded w-32"></div>
          </div>
          <div className="h-4 bg-gray-300 rounded w-16"></div>
          <div className="h-4 bg-gray-300 rounded w-20"></div>
          <div className="h-10 bg-gray-300 rounded w-24"></div>
        </div>
      </div>
    </div>
  );
};

export default OrderSkeleton;

