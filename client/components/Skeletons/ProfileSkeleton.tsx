const ProfileSkeleton = () => {
  return (
    <div className="animate-pulse space-y-6">
      {/* Profile Card Skeleton */}
      <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <div className="h-6 bg-gray-300 rounded w-48 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-32"></div>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Username Field */}
          <div className="border-b border-gray-200 pb-4">
            <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
            <div className="h-6 bg-gray-300 rounded w-40"></div>
          </div>

          {/* Email Field */}
          <div className="border-b border-gray-200 pb-4">
            <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
            <div className="h-6 bg-gray-300 rounded w-56"></div>
          </div>

          {/* Role Field */}
          <div className="pb-4">
            <div className="h-4 bg-gray-200 rounded w-12 mb-2"></div>
            <div className="h-6 bg-gray-300 rounded w-24"></div>
          </div>

          {/* Edit Button */}
          <div className="pt-4">
            <div className="h-12 bg-gray-300 rounded w-full"></div>
          </div>
        </div>
      </div>

      {/* Security Card Skeleton */}
      <div className="bg-gray-50 border border-gray-200 shadow-sm p-6">
        <div className="h-5 bg-gray-300 rounded w-40 mb-3"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;

