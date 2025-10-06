import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import { 
  FiMenu, 
  FiX, 
  FiBox, 
  FiUsers, 
  FiLock, 
  FiUser, 
  FiLogOut,
  FiHome,
  FiSettings,
  FiBell
} from "react-icons/fi";

// Use Next.js basePath configured in next.config.mjs; provide app-relative paths

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { user, loading } = useAuth();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navigationItems = [
    {
      name: "Dashboard",
      href: `/`,
      icon: FiHome,
      description: "Overview & Analytics"
    },
    {
      name: "Products",
      href: `/products`,
      icon: FiBox,
      description: "Manage Inventory"
    },
    {
      name: "Users",
      href: `/users`,
      icon: FiUsers,
      description: "User Management"
    },
    {
      name: "Admins",
      href: `/admins`,
      icon: FiLock,
      description: "Admin Panel"
    },
    {
      name: "Profile",
      href: `/profile`,
      icon: FiUser,
      description: "Account Settings"
    }
  ];

  const isActive = (href: string) => {
    const asPath = router.asPath.split('?')[0];
    const basePath = (router as any).basePath || '';
    const current = basePath && asPath.startsWith(basePath)
      ? asPath.slice(basePath.length)
      : asPath;

    const target = href === '/' ? '/' : href.replace(/\/$/, '');
    const curr = current.replace(/\/$/, '') || '/';

    if (target === '/') return curr === '/';
    return curr === target || curr.startsWith(`${target}/`);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-blue-600 text-white shadow-lg">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar} 
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
          <div className="ml-4">
            <h1 className="text-xl font-bold">E-Commerce</h1>
            <p className="text-sm text-blue-100">Admin Dashboard</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
            <FiBell className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white shadow-xl border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out overflow-hidden`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <div className="ml-3">
              <h1 className="text-xl font-bold text-gray-900">E-Commerce</h1>
              <p className="text-sm text-gray-500">Admin Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navigationItems
            .filter((item) => {
              if (!user) return true;
              if (item.href === '/users') return Boolean((user.permissions as any)?.manageUsers);
              if (item.href === '/products') return Boolean((user.permissions as any)?.manageProducts);
              if (item.href === '/admins') return Boolean((user.permissions as any)?.manageAdmins);
              return true;
            })
            .map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    setIsOpen(false);
                  }
                }}
                className={`group flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                  active
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <div className={`p-2 rounded-lg ${
                  active 
                    ? "bg-blue-500" 
                    : "bg-gray-100 group-hover:bg-gray-200"
                } transition-colors`}>
                  <Icon className={`w-5 h-5 ${
                    active ? "text-white" : "text-gray-600 group-hover:text-gray-700"
                  }`} />
                </div>
                <div className="ml-3 flex-1">
                  <div className={`font-medium ${
                    active ? "text-white" : "text-gray-900"
                  }`}>
                    {item.name}
                  </div>
                  <div className={`text-xs ${
                    active ? "text-blue-100" : "text-gray-500"
                  }`}>
                    {item.description}
                  </div>
                </div>
                {active && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-gray-200 flex-shrink-0">
          <div className="flex items-center p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">
                {loading ? '...' : user ? user.username.charAt(0).toUpperCase() : 'A'}
              </span>
            </div>
            <div className="ml-3 flex-1">
              <div className="text-sm font-medium text-gray-900">
                {loading ? 'Loading...' : user ? user.username : 'Admin User'}
              </div>
              <div className="text-xs text-gray-500">
                {loading ? '...' : user ? user.email : 'admin@example.com'}
              </div>
            </div>
            <button className="p-1 rounded-lg hover:bg-gray-200 transition-colors">
              <FiSettings className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Logout Button */}
        <div className="p-4 flex-shrink-0">
          <Link
            href="/logout"
            className="flex items-center px-4 py-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-all duration-200 group"
          >
            <div className="p-2 rounded-lg bg-red-100 group-hover:bg-red-200 transition-colors">
              <FiLogOut className="w-5 h-5" />
            </div>
            <span className="ml-3 font-medium">Logout</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
