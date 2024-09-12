import { FC, useState } from "react";
import Image from "next/image";
import DashboardLayout from "@/components/DashboardLayout";
import ProductEditForm from "../../components/ProductEditForm";
import { Product } from "@/types/product";

const product: Product = {
  id: 1,
  productName: "T-shirt",
  productImages: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfuvq66T2bVxg9fi1ovJww5kDy5icC0v2xUpBMrk_M8QAn4cl4K7223QuwtWLy_SAWquk&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfuvq66T2bVxg9fi1ovJww5kDy5icC0v2xUpBMrk_M8QAn4cl4K7223QuwtWLy_SAWquk&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfuvq66T2bVxg9fi1ovJww5kDy5icC0v2xUpBMrk_M8QAn4cl4K7223QuwtWLy_SAWquk&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfuvq66T2bVxg9fi1ovJww5kDy5icC0v2xUpBMrk_M8QAn4cl4K7223QuwtWLy_SAWquk&usqp=CAU",
  ],
  productPrice: 49,
  productDescription: "Nice t-shirt with many colors",
  productCategory: "men",
  productColors: [
    { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Gray", class: "bg-gray-400", selectedClass: "ring-gray-400" },
    { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
  ],
  productSizes: [
    { name: "XXS", inStock: false },
    { name: "XS", inStock: true },
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
    { name: "2XL", inStock: true },
    { name: "3XL", inStock: true },
  ],
  stock: 500,
};

const ProductPage: FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  const handleClosePopup = () => {
    setSelectedProduct(null);
    setIsEditFormOpen(false);
  };

  const handleSaveProduct = (updatedProduct: Product) => {
    console.log("Saving updated product:", updatedProduct);
    // Update the product in your state or make an API call to save changes
    setIsEditFormOpen(false);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.productImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.productImages.length - 1 : prevIndex - 1
    );
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsEditFormOpen(true);
  };

  const handleDelete = (productId: number) => {
    console.log(`Delete product with id: ${productId}`);
    
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6 bg-gray-100">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Image Slider */}
            <div className="relative w-full md:w-1/2 overflow-hidden">
              <Image
                src={product.productImages[currentImageIndex]}
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

            {/* Product Info */}
            <div className="w-full md:w-1/2 p-6">
              <h1 className="text-3xl font-bold mb-2">{product.productName}</h1>
              <p className="text-green-500 text-2xl font-semibold mb-4">
                ${product.productPrice}
              </p>
              <p className="text-gray-700 mb-4">
                Description: {product.productDescription}
              </p>
              <p className="text-gray-700 mb-4">
                Category: {product.productCategory}
              </p>
              <p className="text-gray-700 mb-4">
                Colors:{" "}
                {product.productColors.map((color: any) => color.name).join(", ")}
              </p>
              <p className="text-gray-700 mb-4">
                Sizes:{" "}
                {product.productSizes
                  .filter((size: any) => size.inStock)
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
      {/* Edit Product Form Popup */}
      {isEditFormOpen && (
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
