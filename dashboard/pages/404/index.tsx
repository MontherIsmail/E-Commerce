import Link from "next/link";

export default function Custom404() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-800">404</h1>
        <p className="text-2xl font-medium text-gray-600">Page Not Found</p>
        <p className="mt-4 text-lg text-gray-500">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          className="mt-6 inline-block px-8 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          href="/"
        >
          Go Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
