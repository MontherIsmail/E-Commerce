import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Dynamic base path based on environment variables
// For favicon paths, use empty string since basePath is already handled by Next.js
const getBasePath = () => {
  // Favicons should use root path as Next.js basePath already prefixes URLs
  return '';
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>E-Commerce Store</title>
        <meta name="description" content="Your premier online shopping destination" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg?v=8" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico?v=8" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=8" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png?v=8" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png?v=8" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
      </Head>
      <AuthProvider>
        <CartProvider>
          <Component {...pageProps} />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </CartProvider>
      </AuthProvider>
    </>
  );
}
