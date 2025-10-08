"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogPanel, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import logo from "../assets/logo.png";
import ProfileMenu from "./ProfileMenu";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

// Dynamic base path based on environment
const getBasePath = () => {
  return process.env.NODE_ENV === 'production' ? '/ecommerce' : '';
};

const basePath = getBasePath();

const navigation = [
  { name: "Products", href: "/products" },
  { name: "Men", href: "/men" },
  { name: "Women", href: "/women" },
  { name: "About Us", href: "/about" },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { logout, user } = useAuth();
  const { cartCount } = useCart();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'navbar-scrolled' : 'navbar-transparent'}`}>
      <nav
        aria-label="Global"
        className="navbar-container"
      >
        <div className="navbar-content">
          <div className="logo-container">
            <Link href="/" className="logo-link">
              <span className="sr-only">Your Company</span>
              <Image alt="" src={logo} className="logo-image" />
            </Link>
          </div>
          <div className="nav-links">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="nav-link"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="nav-actions">
            {user?.id ? (
              <>
                <div className="cart-container">
                  <Link href="/cart" className="cart-link">
                    <div className="cart-icon-wrapper">
                      <ShoppingBagIcon
                        aria-hidden="true"
                        className="cart-icon"
                      />
                      <span className="cart-count">
                        {cartCount}
                      </span>
                    </div>
                    <span className="sr-only">items in cart, view bag</span>
                  </Link>
                </div>
                <div className="profile-container">
                  <ProfileMenu />
                </div>
              </>
            ) : (
              <div className="auth-links">
                <Link
                  href="/login"
                  className="login-link"
                >
                  Log in <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            )}
          </div>

          <div className="mobile-menu-button">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="menu-toggle"
              aria-label="Open main menu"
            >
              <Bars3Icon className="menu-icon" />
            </button>
          </div>
        </div>
      </nav>
      {/********************************************************* */}

      <Dialog
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        className="lg:hidden"
      >
        <Transition
          show={mobileMenuOpen}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
        </Transition>
        <Transition
          show={mobileMenuOpen}
          enter="transition-transform duration-300"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transition-transform duration-300"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <DialogPanel 
            className="mobile-menu-panel"
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              zIndex: 9999,
              width: '100%',
              maxWidth: '24rem',
              overflowY: 'auto',
              background: 'white',
              padding: '1rem',
              borderLeft: '1px solid rgba(0, 0, 0, 0.1)',
              boxShadow: '-4px 0 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          >
          <div className="mobile-menu-header" style={{position: 'relative', zIndex: 1}}>
            <Link href="/" className="mobile-logo">
              <span className="sr-only">Your Company</span>
              <Image alt="" src={logo} className="h-8 w-auto" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="mobile-close-button"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mobile-menu-content" style={{position: 'relative', zIndex: 1}}>
            <div className="mobile-nav-section" style={{position: 'relative', zIndex: 1}}>
              <div className="mobile-nav-links" style={{position: 'relative', zIndex: 1}}>
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="mobile-nav-link"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      display: 'block', 
                      color: '#374151', 
                      fontSize: '16px', 
                      padding: '12px 16px', 
                      backgroundColor: 'transparent',
                      textDecoration: 'none',
                      marginBottom: '4px',
                      borderRadius: '8px',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      zIndex: 1
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
                      (e.target as HTMLElement).style.color = '#667eea';
                      (e.target as HTMLElement).style.transform = 'translateX(8px)';
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.backgroundColor = 'transparent';
                      (e.target as HTMLElement).style.color = '#374151';
                      (e.target as HTMLElement).style.transform = 'translateX(0)';
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="mobile-auth-section" style={{position: 'relative', zIndex: 1}}>
                {user?.id ? (
                  <>
                    <Link
                      href="/cart"
                      className="mobile-cart-link"
                      onClick={() => setMobileMenuOpen(false)}
                      style={{
                        display: 'flex', 
                        alignItems: 'center',
                        gap: '8px',
                        color: '#374151', 
                        fontSize: '16px', 
                        padding: '12px 16px', 
                        backgroundColor: 'transparent',
                        textDecoration: 'none',
                        marginBottom: '4px',
                        borderRadius: '8px',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        zIndex: 1
                      }}
                      onMouseEnter={(e) => {
                        (e.target as HTMLElement).style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
                        (e.target as HTMLElement).style.color = '#667eea';
                        (e.target as HTMLElement).style.transform = 'translateX(8px)';
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLElement).style.backgroundColor = 'transparent';
                        (e.target as HTMLElement).style.color = '#374151';
                        (e.target as HTMLElement).style.transform = 'translateX(0)';
                      }}
                    >
                      <ShoppingBagIcon className="h-5 w-5" />
                      Cart ({cartCount})
                    </Link>
                    <Link
                      href="/profile"
                      className="mobile-auth-link"
                      onClick={() => setMobileMenuOpen(false)}
                      style={{
                        display: 'block', 
                        color: '#374151', 
                        fontSize: '16px', 
                        padding: '12px 16px', 
                        backgroundColor: 'transparent',
                        textDecoration: 'none',
                        marginBottom: '4px',
                        borderRadius: '8px',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        zIndex: 1
                      }}
                      onMouseEnter={(e) => {
                        (e.target as HTMLElement).style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
                        (e.target as HTMLElement).style.color = '#667eea';
                        (e.target as HTMLElement).style.transform = 'translateX(8px)';
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLElement).style.backgroundColor = 'transparent';
                        (e.target as HTMLElement).style.color = '#374151';
                        (e.target as HTMLElement).style.transform = 'translateX(0)';
                      }}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="mobile-logout-button"
                      style={{
                        display: 'block', 
                        color: '#374151', 
                        fontSize: '16px', 
                        padding: '12px 16px', 
                        backgroundColor: 'transparent',
                        border: 'none',
                        marginBottom: '4px',
                        borderRadius: '8px',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        zIndex: 1,
                        width: '100%',
                        textAlign: 'left',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        (e.target as HTMLElement).style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                        (e.target as HTMLElement).style.color = '#ef4444';
                        (e.target as HTMLElement).style.transform = 'translateX(8px)';
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLElement).style.backgroundColor = 'transparent';
                        (e.target as HTMLElement).style.color = '#374151';
                        (e.target as HTMLElement).style.transform = 'translateX(0)';
                      }}
                    >
                      Log out
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="mobile-auth-link"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      display: 'block', 
                      color: '#374151', 
                      fontSize: '16px', 
                      padding: '12px 16px', 
                      backgroundColor: 'transparent',
                      textDecoration: 'none',
                      marginBottom: '4px',
                      borderRadius: '8px',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      zIndex: 1
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
                      (e.target as HTMLElement).style.color = '#667eea';
                      (e.target as HTMLElement).style.transform = 'translateX(8px)';
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.backgroundColor = 'transparent';
                      (e.target as HTMLElement).style.color = '#374151';
                      (e.target as HTMLElement).style.transform = 'translateX(0)';
                    }}
                  >
                    Log in
                  </Link>
                )}
              </div>
            </div>
          </div>
          </DialogPanel>
        </Transition>
      </Dialog>
      <style jsx>{`
        .navbar-transparent {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .navbar-scrolled {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .navbar-container {
          padding: 0 1rem;
        }
        @media (min-width: 640px) {
          .navbar-container {
            padding: 0 2rem;
          }
        }
        .navbar-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1280px;
          margin: 0 auto;
          height: 60px;
        }
        @media (min-width: 640px) {
          .navbar-content {
            height: 70px;
          }
        }
        @media (min-width: 1024px) {
          .navbar-content {
            height: 80px;
          }
        }
        .logo-container {
          flex: 1;
          min-width: 0;
        }
        .logo-link {
          display: flex;
          align-items: center;
          transition: transform 0.3s ease;
        }
        .logo-link:hover {
          transform: scale(1.05);
        }
        .logo-image {
          height: 1.5rem;
          width: auto;
        }
        @media (min-width: 640px) {
          .logo-image {
            height: 1.75rem;
          }
        }
        @media (min-width: 1024px) {
          .logo-image {
            height: 2rem;
          }
        }
        .nav-links {
          display: none;
          gap: 1rem;
        }
        @media (min-width: 768px) {
          .nav-links {
            gap: 1.5rem;
          }
        }
        @media (min-width: 1024px) {
          .nav-links {
            display: flex;
            gap: 2rem;
          }
        }
        .nav-link {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-primary);
          transition: var(--transition);
          position: relative;
          padding: 0.5rem 0;
        }
        @media (min-width: 768px) {
          .nav-link {
            font-size: 0.875rem;
          }
        }
        .nav-link:hover {
          color: var(--primary-color);
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
          transition: width 0.3s ease;
        }
        .nav-link:hover::after {
          width: 100%;
        }
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 2rem;
          margin-left: 3rem;
        }
        @media (max-width: 1023px) {
          .nav-actions {
            display: none;
          }
        }
        .cart-container {
          display: none;
        }
        @media (min-width: 1024px) {
          .cart-container {
            display: block;
          }
        }
        .cart-link {
          display: flex;
          align-items: center;
          padding: 0.5rem 0.75rem;
          border-radius: 0.5rem;
          transition: var(--transition);
          position: relative;
          background: rgba(0, 0, 0, 0.03);
        }
        .cart-link:hover {
          background: rgba(0, 0, 0, 0.08);
        }
        .cart-icon-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .cart-icon {
          height: 1.25rem;
          width: 1.25rem;
          color: var(--text-secondary);
          transition: var(--transition);
        }
        @media (min-width: 640px) {
          .cart-icon {
            height: 1.5rem;
            width: 1.5rem;
          }
        }
        .cart-link:hover .cart-icon {
          color: var(--primary-color);
        }
        .cart-count {
          position: absolute;
          top: -0.5rem;
          right: -0.5rem;
          background: var(--primary-color);
          color: white;
          font-size: 0.65rem;
          font-weight: 700;
          padding: 0.15rem 0.4rem;
          border-radius: 9999px;
          min-width: 1.25rem;
          height: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          line-height: 1;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .profile-container {
          display: none;
        }
        @media (min-width: 1024px) {
          .profile-container {
            display: block;
          }
        }
        .auth-links {
          display: none;
        }
        @media (min-width: 1024px) {
          .auth-links {
            display: block;
          }
        }
        .login-link {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-primary);
          transition: var(--transition);
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          background: rgba(0, 0, 0, 0.03);
        }
        .login-link:hover {
          background: rgba(0, 0, 0, 0.08);
        }
        @media (min-width: 768px) {
          .login-link {
            font-size: 0.875rem;
          }
        }
        .mobile-menu-button {
          display: block;
          flex-shrink: 0;
          z-index: 10;
        }
        @media (min-width: 1024px) {
          .mobile-menu-button {
            display: none;
          }
        }
        .menu-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem;
          border-radius: 0.5rem;
          color: #374151;
          background: transparent;
          border: 1px solid rgba(0, 0, 0, 0.1);
          cursor: pointer;
          transition: all 0.3s ease;
          min-width: 44px;
          min-height: 44px;
        }
        .menu-toggle:hover {
          background: rgba(0, 0, 0, 0.05);
          color: #1f2937;
        }
        .menu-icon {
          height: 1.5rem;
          width: 1.5rem;
          color: inherit;
          stroke-width: 2;
        }
        @media (min-width: 640px) {
          .menu-icon {
            height: 1.75rem;
            width: 1.75rem;
          }
        }
        .mobile-menu-panel {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          z-index: 9999;
          width: 100%;
          max-width: 24rem;
          overflow-y: auto;
          background: white;
          padding: 1rem;
          border-left: 1px solid rgba(0, 0, 0, 0.1);
          box-shadow: -4px 0 6px -1px rgba(0, 0, 0, 0.1);
        }
        @media (min-width: 640px) {
          .mobile-menu-panel {
            padding: 1.5rem;
          }
        }
        .mobile-menu-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          position: relative;
          z-index: 1;
        }
        @media (min-width: 640px) {
          .mobile-menu-header {
            margin-bottom: 2rem;
          }
        }
        .mobile-logo {
          display: flex;
          align-items: center;
        }
        .mobile-close-button {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem;
          border-radius: 0.5rem;
          color: var(--text-primary);
          transition: var(--transition);
        }
        .mobile-close-button:hover {
          background: rgba(0, 0, 0, 0.05);
        }
        .mobile-menu-content {
          margin-top: 1rem;
          position: relative;
          z-index: 1;
        }
        @media (min-width: 640px) {
          .mobile-menu-content {
            margin-top: 1.5rem;
          }
        }
        .mobile-nav-section {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          position: relative;
          z-index: 1;
        }
        @media (min-width: 640px) {
          .mobile-nav-section {
            gap: 2rem;
          }
        }
        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          position: relative;
          z-index: 1;
        }
        .mobile-nav-link {
          display: block;
          padding: 0.75rem 1rem;
          font-size: 0.9rem;
          font-weight: 600;
          color: #374151;
          border-radius: 0.75rem;
          transition: all 0.3s ease;
          text-decoration: none;
          position: relative;
          z-index: 1;
        }
        @media (min-width: 640px) {
          .mobile-nav-link {
            font-size: 1rem;
          }
        }
        .mobile-nav-link:hover {
          background: rgba(0, 0, 0, 0.05);
          color: #667eea;
          transform: translateX(8px);
        }
        .mobile-auth-section {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(0, 0, 0, 0.1);
          position: relative;
          z-index: 1;
        }
        .mobile-cart-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          font-size: 0.9rem;
          font-weight: 600;
          color: #374151;
          border-radius: 0.75rem;
          transition: all 0.3s ease;
          text-decoration: none;
          position: relative;
          z-index: 1;
        }
        @media (min-width: 640px) {
          .mobile-cart-link {
            font-size: 1rem;
          }
        }
        .mobile-cart-link:hover {
          background: rgba(0, 0, 0, 0.05);
          color: #667eea;
          transform: translateX(8px);
        }
        .mobile-auth-link {
          display: block;
          padding: 0.75rem 1rem;
          font-size: 0.9rem;
          font-weight: 600;
          color: #374151;
          border-radius: 0.75rem;
          transition: all 0.3s ease;
          text-decoration: none;
          position: relative;
          z-index: 1;
        }
        @media (min-width: 640px) {
          .mobile-auth-link {
            font-size: 1rem;
          }
        }
        .mobile-auth-link:hover {
          background: rgba(0, 0, 0, 0.05);
          color: #667eea;
          transform: translateX(8px);
        }
        .mobile-logout-button {
          display: block;
          width: 100%;
          padding: 0.75rem 1rem;
          font-size: 0.9rem;
          font-weight: 600;
          color: #374151;
          background: transparent;
          border: none;
          border-radius: 0.75rem;
          text-align: left;
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
          z-index: 1;
        }
        @media (min-width: 640px) {
          .mobile-logout-button {
            font-size: 1rem;
          }
        }
        .mobile-logout-button:hover {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          transform: translateX(8px);
        }
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .navbar-content > div {
          animation: fadeIn 0.6s ease-out;
        }
        .navbar-content > div:nth-child(1) {
          animation-delay: 0.1s;
        }
        .navbar-content > div:nth-child(2) {
          animation-delay: 0.2s;
        }
        .navbar-content > div:nth-child(3) {
          animation-delay: 0.3s;
        }
      `}</style>
    </header>
  );
};

export default Navbar;
