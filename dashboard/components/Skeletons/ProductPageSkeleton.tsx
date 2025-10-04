import { FC } from 'react';

const ProductPageSkeleton: FC = () => {
  return (
    <div className="p-6">
      {/* Breadcrumb Skeleton */}
      <div className="flex mb-6">
        <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-4 mx-2 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-4 mx-2 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Image Gallery Skeleton */}
            <div className="relative bg-gray-50">
              {/* Main Image Skeleton */}
              <div className="aspect-square bg-gray-200 animate-pulse"></div>
              
              {/* Thumbnail Strip Skeleton */}
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  {[...Array(4)].map((_, index) => (
                    <div
                      key={index}
                      className="w-16 h-16 bg-gray-200 rounded-lg animate-pulse"
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Information Skeleton */}
            <div className="p-8">
              <div className="space-y-6">
                {/* Product Header Skeleton */}
                <div>
                  <div className="h-8 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                  <div className="flex items-center space-x-4">
                    <div className="h-8 bg-gray-200 rounded w-24 animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded-full w-20 animate-pulse"></div>
                  </div>
                </div>

                {/* Description Skeleton */}
                <div>
                  <div className="h-5 bg-gray-200 rounded w-24 mb-2 animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
                  </div>
                </div>

                {/* Product Details Grid Skeleton */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="h-4 bg-gray-200 rounded w-16 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="h-4 bg-gray-200 rounded w-16 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
                  </div>
                </div>

                {/* Colors Skeleton */}
                <div>
                  <div className="h-5 bg-gray-200 rounded w-32 mb-3 animate-pulse"></div>
                  <div className="flex flex-wrap gap-2">
                    {[...Array(3)].map((_, index) => (
                      <div
                        key={index}
                        className="h-6 bg-gray-200 rounded-full w-16 animate-pulse"
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Sizes Skeleton */}
                <div>
                  <div className="h-5 bg-gray-200 rounded w-28 mb-3 animate-pulse"></div>
                  <div className="flex flex-wrap gap-2">
                    {[...Array(4)].map((_, index) => (
                      <div
                        key={index}
                        className="h-6 bg-gray-200 rounded-full w-8 animate-pulse"
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons Skeleton */}
                <div className="pt-6 border-t">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                    <div className="flex-1 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPageSkeleton;
