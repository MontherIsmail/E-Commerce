import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  const AuthenticatedComponent = (props: any) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const response = await axios.get('/api/auth/me', {
            withCredentials: true,
          });
          
          // Check if user is admin
          if (response.data.user && response.data.user.role === 'admin') {
            setIsAuthenticated(true);
          } else {
            // Not an admin, redirect to login
            router.push('/login');
          }
        } catch (error) {
          // Not authenticated, redirect to login
          console.error('Authentication failed:', error);
          router.push('/login');
        } finally {
          setIsLoading(false);
        }
      };

      checkAuth();
    }, [router]);

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      );
    }

    if (!isAuthenticated) {
      return null; // Router will redirect
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;

