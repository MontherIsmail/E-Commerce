import '../styles/globals.css'; // Ensure this is your global stylesheet
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { AuthProvider } from '../context/AuthContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>E-Commerce Admin Dashboard</title>
        <meta name="description" content="Admin dashboard for E-Commerce management" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg?v=7" />
        <link rel="shortcut icon" href="/favicon.ico?v=7" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=7" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png?v=6" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png?v=6" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3B82F6" />
      </Head>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}

export default MyApp;