import React from "react";
import Quickview from "./Quickview";
import { Product } from "../types";

interface CardProps {
  product: Product;
}

const Card = ({ product }: CardProps) => {
  // Handle basePath for production
  const basePath = process.env.NODE_ENV === 'production' ? '/ecommerce' : '';
  
  return (
    <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
        <img
          alt={product?.productName || "Product"}
          src={product?.productUrlImgs?.[0] || "https://via.placeholder.com/400x400?text=No+Image"}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
            <div className="bg-white rounded-lg px-4 py-2 shadow-lg">
              <Quickview id={product.id} />
            </div>
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-gray-800 shadow-sm">
            {product?.productCategory || "Product"}
          </span>
        </div>

        {/* Stock Badge */}
        {product?.productSizes && product.productSizes.length > 0 ? (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              In Stock
            </span>
          </div>
        ) : (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Product Name */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-gray-700 transition-colors">
          <a href={`${basePath}/product/${product.id}`} className="hover:underline">
            {product?.productName || "Product Name"}
          </a>
        </h3>

        {/* Product Description */}
        {product?.productDescription && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.productDescription}
          </p>
        )}

        {/* Colors */}
        {product?.productColors && product.productColors.length > 0 && (
          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-2">Available Colors:</p>
            <div className="flex flex-wrap gap-2">
              {product.productColors.slice(0, 4).map((color: any, index: number) => (
                <div key={index} className="flex items-center space-x-1">
                  <div
                    className={`w-4 h-4 rounded-full border border-gray-300 ${color.class || 'bg-gray-300'}`}
                    title={color.name}
                    style={{
                      backgroundColor: color.name === 'Black' ? '#000000' :
                        color.name === 'Red' ? '#ef4444' :
                          color.name === 'Pink' ? '#ec4899' :
                            color.name === 'Purple' ? '#a855f7' :
                              color.name === 'Yellow' ? '#eab308' :
                                color.name === 'Blue' ? '#3b82f6' :
                                  color.name === 'Green' ? '#22c55e' :
                                    color.name === 'Orange' ? '#f97316' :
                                      color.name === 'Gray' ? '#6b7280' :
                                        color.name === 'White' ? '#ffffff' :
                                          color.name === 'Indigo' ? '#6366f1' :
                                            color.name === 'Teal' ? '#14b8a6' : '#6b7280'
                    }}
                  ></div>
                  <span className="text-xs text-gray-600">{color.name}</span>
                </div>
              ))}
              {product.productColors.length > 4 && (
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 rounded-full border border-gray-300 bg-gray-200"></div>
                  <span className="text-xs text-gray-600">+{product.productColors.length - 4} more</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900">
              ${product?.productPrice || "0.00"}
            </span>
            {product?.productPrice && product.productPrice > 50 && (
              <span className="text-sm text-green-600 font-medium">Free Shipping</span>
            )}
          </div>
        </div>

        {/* Rating (if available) */}
        <div className="mt-3 flex items-center">
          <div className="flex items-center">
            {[0, 1, 2, 3, 4].map((rating) => (
              <svg
                key={rating}
                className="h-4 w-4 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">(4.5)</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
