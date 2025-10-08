import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Get basePath for favicon paths (Next.js doesn't auto-prefix Head links)
const basePath = process.env.NODE_ENV === 'production' ? '/ecommerce' : '';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>E-Commerce Store</title>
        <meta name="description" content="Your premier online shopping destination" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="light only" />
        <link rel="icon" href={`${basePath}/favicon.svg?v=9`} type="image/svg+xml" />
        <link rel="icon" href={`${basePath}/favicon.ico?v=9`} />
        <link rel="apple-touch-icon" href={`${basePath}/apple-touch-icon.png?v=9`} />
        <link rel="icon" type="image/png" sizes="192x192" href={`${basePath}/icon-192.png?v=9`} />
        <link rel="icon" type="image/png" sizes="512x512" href={`${basePath}/icon-512.png?v=9`} />
        <link rel="manifest" href={`${basePath}/manifest.json`} />
        <meta name="theme-color" content="#ffffff" />
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
