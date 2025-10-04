import { FC } from 'react';

const EditFormSkeleton: FC = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl">
        {/* Header Skeleton */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
            <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Form Content Skeleton */}
        <div className="p-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Name Field Skeleton */}
              <div className="md:col-span-2">
                <div className="h-4 bg-gray-200 rounded w-24 mb-2 animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>

              {/* Price Field Skeleton */}
              <div>
                <div className="h-4 bg-gray-200 rounded w-16 mb-2 animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>

              {/* Stock Field Skeleton */}
              <div>
                <div className="h-4 bg-gray-200 rounded w-20 mb-2 animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>

              {/* Category Field Skeleton */}
              <div>
                <div className="h-4 bg-gray-200 rounded w-16 mb-2 animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>

              {/* Description Field Skeleton */}
              <div className="md:col-span-2">
                <div className="h-4 bg-gray-200 rounded w-20 mb-2 animate-pulse"></div>
                <div className="h-20 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>

              {/* Images Field Skeleton */}
              <div className="md:col-span-2">
                <div className="h-4 bg-gray-200 rounded w-20 mb-2 animate-pulse"></div>
                <div className="h-20 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-48 mt-1 animate-pulse"></div>
              </div>

              {/* Colors Field Skeleton */}
              <div>
                <div className="h-4 bg-gray-200 rounded w-12 mb-2 animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-32 mt-1 animate-pulse"></div>
              </div>

              {/* Sizes Field Skeleton */}
              <div>
                <div className="h-4 bg-gray-200 rounded w-10 mb-2 animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-28 mt-1 animate-pulse"></div>
              </div>
            </div>

            {/* Action Buttons Skeleton */}
            <div className="flex justify-end space-x-3 pt-6 border-t">
              <div className="h-10 bg-gray-200 rounded-lg w-20 animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded-lg w-28 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditFormSkeleton;
