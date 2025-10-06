import React from 'react';
import withAuth from './withAuth';
import { useAuth } from '../context/AuthContext';

type PermissionKey =
  | 'manageUsers'
  | 'manageProducts'
  | 'manageOrders'
  | 'viewAnalytics'
  | 'manageAdmins';

const withPermission = (permission: PermissionKey) => (
  WrappedComponent: React.ComponentType<any>
) => {
  const Guard: React.FC<any> = (props) => {
    const { user, loading } = useAuth();

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      );
    }

    const allowed = Boolean(user?.permissions && (user.permissions as any)[permission]);
    if (!allowed) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-semibold mb-2">Forbidden</h1>
            <p className="text-gray-600">You do not have permission to access this page.</p>
          </div>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  return withAuth(Guard);
};

export default withPermission;


