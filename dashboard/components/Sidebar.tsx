import { useState } from 'react';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Sidebar button for mobile */}
      <div className="lg:hidden flex items-center p-4 bg-gray-800 text-white">
        <button onClick={toggleSidebar} className="text-3xl">
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
        <span className="ml-4 text-2xl font-bold">Dashboard</span>
      </div>

      {/* Sidebar - hidden on small screens, visible on large screens */}
      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } lg:block w-64 h-screen bg-gray-800 text-white flex flex-col fixed lg:static`}>
        <div className="text-2xl font-bold p-4">Dashboard</div>
        <nav className="flex-1 p-4">
          <ul>
            <li className="my-2">
              <Link href="/" className="block p-2 rounded hover:bg-gray-700">
                Dashboard
              </Link>
            </li>
            <li className="my-2">
              <Link href="/products" className="block p-2 rounded hover:bg-gray-700">
                Products
              </Link>
            </li>
            <li className="my-2">
              <Link href="/profile" className="block p-2 rounded hover:bg-gray-700">
                Profile
              </Link>
            </li>
            <li className="my-2">
              <Link href="/settings" className="block p-2 rounded hover:bg-gray-700">
                Settings
              </Link>
            </li>
            <li className="my-2">
              <Link href="/logout" className="block p-2 rounded hover:bg-gray-700">
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
