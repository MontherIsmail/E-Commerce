import { FC, useEffect, useState } from "react";
import Image from "next/image";
import DashboardLayout from "@/components/DashboardLayout";
import withAuth from "../../hoc/withAuth";
import ProductEditForm from "../../components/ProductEditForm";
import { Product } from "@/types/product";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import Link from "next/link";
import { ProductPageSkeleton } from "../../components/Skeletons";

const ProductPage: FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { id } = router.query;

  const getProduct = async () => {
    if (id) {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          `http://localhost:5000/api/v1/products/${id}`
        );
        console.log("product", response.data.product);
        setProduct(response.data.product);
      } catch (error: any) {
        console.error("Error fetching product:", error);
        setError(error?.response?.data?.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  const handleClosePopup = () => {
    setSelectedProduct(null);
    setIsEditFormOpen(false);
  };

  const handleSaveProduct = (updatedProduct: Product) => {
    console.log("Saving updated product:", updatedProduct);
    setIsEditFormOpen(false);
    setProduct(updatedProduct); // Update the product in state
    // Reset image index if needed
    setCurrentImageIndex(0);
  };

  const handleNextImage = () => {
    if (product && product.productUrlImgs.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === product.productUrlImgs.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const handlePreviousImage = () => {
    if (product && product.productUrlImgs.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? product.productUrlImgs.length - 1 : prevIndex - 1
      );
    }
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsEditFormOpen(true);
  };

  const handleDelete = async (productId: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Make API call to delete the product
          await axios.delete(`http://localhost:5000/api/v1/products/${productId}`, {
            withCredentials: true,
          });
          
          Swal.fire({
            title: "Deleted!",
            text: "Your product has been deleted.",
            icon: "success",
          });
  
          // Redirect to products page
          router.push("/products");
        } catch (error: any) {
          Swal.fire({
            title: "Error!",
            text: error?.response?.data?.message || "Something went wrong. The product could not be deleted.",
            icon: "error",
          });
          console.error(error);
        }
      }
    });
  };

  if (loading) {
    return (
      <DashboardLayout>
        <ProductPageSkeleton />
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <div className="text-red-600 text-lg font-semibold mb-2">Error Loading Product</div>
              <p className="text-red-500 mb-4">{error}</p>
              <div className="space-x-4">
                <button
                  onClick={() => getProduct()}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Try Again
                </button>
                <Link
                  href="/products"
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 inline-block"
                >
                  Back to Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!product) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
              <div className="text-gray-600 text-lg font-semibold mb-2">Product Not Found</div>
              <p className="text-gray-500 mb-4">The product you're looking for doesn't exist.</p>
              <Link
                href="/products"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 inline-block"
              >
                Back to Products
              </Link>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Breadcrumb Navigation */}
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                </svg>
                Dashboard
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
                <Link href="/products" className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2">
                  Products
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                  {product.productName}
                </span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="max-w-7xl mx-auto">
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Enhanced Image Gallery */}
              <div className="relative bg-gray-50">
                {product.productUrlImgs && product.productUrlImgs.length > 0 ? (
                  <>
                    {/* Main Image */}
                    <div className="relative aspect-square">
                      <Image
                        src={product.productUrlImgs[currentImageIndex]}
                        alt={product.productName}
                        fill
                        className="object-cover"
                        priority
                      />
                      {/* Navigation Arrows */}
                      {product.productUrlImgs.length > 1 && (
                        <>
                          <button
                            onClick={handlePreviousImage}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200"
                          >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                          </button>
                          <button
                            onClick={handleNextImage}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200"
                          >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </>
                      )}
                      {/* Image Counter */}
                      {product.productUrlImgs.length > 1 && (
                        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                          {currentImageIndex + 1} / {product.productUrlImgs.length}
                        </div>
                      )}
                    </div>
                    
                    {/* Thumbnail Strip */}
                    {product.productUrlImgs.length > 1 && (
                      <div className="p-4 border-t">
                        <div className="flex space-x-2 overflow-x-auto">
                          {product.productUrlImgs.map((img, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                                index === currentImageIndex
                                  ? 'border-blue-500 ring-2 ring-blue-200'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <Image
                                src={img}
                                alt={`${product.productName} ${index + 1}`}
                                fill
                                className="object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="aspect-square flex items-center justify-center bg-gray-100">
                    <div className="text-center text-gray-500">
                      <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-lg font-medium">No images available</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Enhanced Product Information */}
              <div className="p-8">
                <div className="space-y-6">
                  {/* Product Header */}
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {product.productName}
                    </h1>
                    <div className="flex items-center space-x-4">
                      <span className="text-3xl font-bold text-green-600">
                        ${product.productPrice?.toFixed(2)}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        product.stock > 10 
                          ? 'bg-green-100 text-green-800' 
                          : product.stock > 0 
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                      </span>
                    </div>
                  </div>

                  {/* Product Description */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {product.productDescription || 'No description available'}
                    </p>
                  </div>

                  {/* Product Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Category</h4>
                      <p className="text-gray-700">{product.productCategory || 'Uncategorized'}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Product ID</h4>
                      <p className="text-gray-700 font-mono">#{product.id}</p>
                    </div>
                  </div>

                  {/* Colors */}
                  {product.productColors && product.productColors.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Available Colors</h3>
                      <div className="flex flex-wrap gap-2">
                        {product.productColors.map((color: any, index: number) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                          >
                            {color.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sizes */}
                  {product.productSizes && product.productSizes.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Available Sizes</h3>
                      <div className="flex flex-wrap gap-2">
                        {product.productSizes
                          .filter((size: any) => size.inStock)
                          .map((size: any, index: number) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                            >
                              {size.name}
                            </span>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="pt-6 border-t">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => handleEdit(product)}
                        className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium flex items-center justify-center"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit Product
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium flex items-center justify-center"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete Product
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Product Form Modal */}
      {isEditFormOpen && selectedProduct && (
        <ProductEditForm
          product={selectedProduct}
          onClose={handleClosePopup}
          onSave={handleSaveProduct}
        />
      )}
    </DashboardLayout>
  );
};

export default withAuth(ProductPage);
