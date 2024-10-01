import { FC, useEffect, useState } from "react";
import Image from "next/image";
import DashboardLayout from "@/components/DashboardLayout";
import ProductEditForm from "../../components/ProductEditForm";
import { Product } from "@/types/product";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";

const ProductPage: FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  const getProduct = async () => {
    if (id) {
      // Ensure id is available before making the request
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/products/${id}`
        );
        console.log("product", response.data.product);
        setProduct(response.data.product);
      } catch (error) {
        console.log(error);
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
    setProduct(updatedProduct); // Optionally update the product in state
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
          await axios.delete(`http://localhost:5000/api/v1/products/${productId}`);
          
          Swal.fire({
            title: "Deleted!",
            text: "Your product has been deleted.",
            icon: "success",
          });
  
          // Optionally, redirect or refresh the page
          router.push("/products");
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Something went wrong. The product could not be deleted.",
            icon: "error",
          });
          console.error(error);
        }
      }
    });
  };

  return (
    <DashboardLayout>
      {product ? (
        <div className="container mx-auto p-6 bg-gray-100">
          <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Image Slider */}
              {product && product.productUrlImgs.length > 0 ? (
                <div className="relative w-full md:w-1/2 overflow-hidden">
                  <Image
                    src={product.productUrlImgs[currentImageIndex]}
                    alt={product.productName}
                    width={800}
                    height={600}
                    className="rounded-t-lg md:rounded-l-lg object-cover"
                  />
                  <button
                    onClick={handlePreviousImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-900"
                  >
                    &#8592;
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-900"
                  >
                    &#8594;
                  </button>
                </div>
              ) : (
                <p>No images available</p>
              )}

              {/* Product Info */}
              <div className="w-full md:w-1/2 p-6">
                <h1 className="text-3xl font-bold mb-2">
                  {product?.productName}
                </h1>
                <p className="text-green-500 text-2xl font-semibold mb-4">
                  ${product?.productPrice}
                </p>
                <p className="text-gray-700 mb-4">
                  Description: {product?.productDescription}
                </p>
                <p className="text-gray-700 mb-4">
                  Category: {product?.productCategory}
                </p>
                <p className="text-gray-700 mb-4">
                  Colors:{" "}
                  {product?.productColors
                    ?.map((color: any) => color.name)
                    .join(", ")}
                </p>
                <p className="text-gray-700 mb-4">
                  Sizes:{" "}
                  {product?.productSizes
                    ?.filter((size: any) => size.inStock)
                    .map((size: any) => size.name)
                    .join(", ")}
                </p>
                <p className="text-gray-700 mb-4">Stock: {product.stock}</p>
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 text-white px-4 py-2 hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h2>No Product</h2>
      )}

      {/* Edit Product Form Popup */}
      {isEditFormOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg w-full max-w-lg">
            <ProductEditForm
              product={selectedProduct}
              onClose={handleClosePopup}
              onSave={handleSaveProduct}
            />
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ProductPage;
