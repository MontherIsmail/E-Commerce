import { ReactNode } from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="lg:flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main content */}
      <main className="flex-1 p-4 max-h-screen overflow-y-auto">{children}</main>
    </div>
  );
};

export default DashboardLayout;
