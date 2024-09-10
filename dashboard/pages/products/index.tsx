import { FC, useState } from "react";
import { Product } from "../../types/product";
import ProductEditForm from "../../components/ProductEditForm";
import DashboardLayout from "../../components/DashboardLayout";
import Image from "next/image";

const productsData: Product[] = [
  {
    id: "1",
    productName: "T-Shirt",
    productPrice: 19.99,
    productImages: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcAUioMRqtwqMnztNK9CB98U35MmEMw4qVQg&s",
      "https://cdn.pixabay.com/photo/2017/01/13/04/56/t-shirt-1976334_1280.png",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcAUioMRqtwqMnztNK9CB98U35MmEMw4qVQg&s",
    ],
    productColors: ["Red", "Blue"],
    productSizes: ["S", "M", "L"],
  },

  {
    id: "1",
    productName: "T-Shirt",
    productPrice: 19.99,
    productImages: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcAUioMRqtwqMnztNK9CB98U35MmEMw4qVQg&s",
      "https://cdn.pixabay.com/photo/2017/01/13/04/56/t-shirt-1976334_1280.png",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcAUioMRqtwqMnztNK9CB98U35MmEMw4qVQg&s",
    ],
    productColors: ["Red", "Blue"],
    productSizes: ["S", "M", "L"],
  },
  {
    id: "1",
    productName: "T-Shirt",
    productPrice: 19.99,
    productImages: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcAUioMRqtwqMnztNK9CB98U35MmEMw4qVQg&s",
      "https://cdn.pixabay.com/photo/2017/01/13/04/56/t-shirt-1976334_1280.png",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcAUioMRqtwqMnztNK9CB98U35MmEMw4qVQg&s",
    ],
    productColors: ["Red", "Blue"],
    productSizes: ["S", "M", "L"],
  },
  {
    id: "1",
    productName: "T-Shirt",
    productPrice: 19.99,
    productImages: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcAUioMRqtwqMnztNK9CB98U35MmEMw4qVQg&s",
      "https://cdn.pixabay.com/photo/2017/01/13/04/56/t-shirt-1976334_1280.png",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcAUioMRqtwqMnztNK9CB98U35MmEMw4qVQg&s",
    ],
    productColors: ["Red", "Blue"],
    productSizes: ["S", "M", "L"],
  },
  {
    id: "1",
    productName: "T-Shirt",
    productPrice: 19.99,
    productImages: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcAUioMRqtwqMnztNK9CB98U35MmEMw4qVQg&s",
      "https://cdn.pixabay.com/photo/2017/01/13/04/56/t-shirt-1976334_1280.png",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcAUioMRqtwqMnztNK9CB98U35MmEMw4qVQg&s",
    ],
    productColors: ["Red", "Blue"],
    productSizes: ["S", "M", "L"],
  },
  {
    id: "1",
    productName: "T-Shirt",
    productPrice: 19.99,
    productImages: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcAUioMRqtwqMnztNK9CB98U35MmEMw4qVQg&s",
      "https://cdn.pixabay.com/photo/2017/01/13/04/56/t-shirt-1976334_1280.png",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcAUioMRqtwqMnztNK9CB98U35MmEMw4qVQg&s",
    ],
    productColors: ["Red", "Blue"],
    productSizes: ["S", "M", "L"],
  },
  {
    id: "1",
    productName: "T-Shirt",
    productPrice: 19.99,
    productImages: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcAUioMRqtwqMnztNK9CB98U35MmEMw4qVQg&s",
      "https://cdn.pixabay.com/photo/2017/01/13/04/56/t-shirt-1976334_1280.png",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcAUioMRqtwqMnztNK9CB98U35MmEMw4qVQg&s",
    ],
    productColors: ["Red", "Blue"],
    productSizes: ["S", "M", "L"],
  },
  {
    id: "1",
    productName: "T-Shirt",
    productPrice: 19.99,
    productImages: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcAUioMRqtwqMnztNK9CB98U35MmEMw4qVQg&s",
      "https://cdn.pixabay.com/photo/2017/01/13/04/56/t-shirt-1976334_1280.png",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcAUioMRqtwqMnztNK9CB98U35MmEMw4qVQg&s",
    ],
    productColors: ["Red", "Blue"],
    productSizes: ["S", "M", "L"],
  },
  
  // Add more products here
];

const ProductsPage: FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isViewProductOpen, setIsViewProductOpen] = useState(false);

  const handleDelete = (productId: string) => {
    console.log(`Delete product with id: ${productId}`);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsEditFormOpen(true);
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
    setIsViewProductOpen(true);
  };

  const handleClosePopup = () => {
    setSelectedProduct(null);
    setIsEditFormOpen(false);
    setIsViewProductOpen(false);
  };

  const handleSaveProduct = (updatedProduct: Product) => {
    console.log("Saving updated product:", updatedProduct);
    // Update the product in your state or make an API call to save changes
    setIsEditFormOpen(false);
  };

  const handleNextImage = () => {
    if (selectedProduct) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === selectedProduct.productImages.length - 1
          ? 0
          : prevIndex + 1
      );
    }
  };

  const handlePreviousImage = () => {
    if (selectedProduct) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0
          ? selectedProduct.productImages.length - 1
          : prevIndex - 1
      );
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Products</h1>

        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {productsData.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md p-4 flex space-x-4"
            >
              {/* Product Image */}
              <Image
                src={product.productImages[0]}
                alt={product.productName}
                width={150}
                height={150}
                className="rounded-lg"
              />

              {/* Product Info */}
              <div className="flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-bold">{product.productName}</h2>
                  <p className="text-gray-700">
                    Price: ${product.productPrice}
                  </p>
                  <p className="text-gray-700">
                    Colors: {product.productColors.join(", ")}
                  </p>
                  <p className="text-gray-700">
                    Sizes: {product.productSizes.join(", ")}
                  </p>
                </div>

                {/* Action Buttons */}
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
                  <button
                    onClick={() => handleViewProduct(product)}
                    className="bg-green-500 text-white px-4 py-2 hover:bg-green-600"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

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

        {/* View Product Popup with Image Slider */}
        {isViewProductOpen && selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg w-full max-w-lg">
              <h2 className="text-2xl font-bold mb-4">
                {selectedProduct.productName}
              </h2>

              {/* Image Slider */}
              <div className="relative">
                <Image
                  src={selectedProduct.productImages[currentImageIndex]}
                  alt={selectedProduct.productName}
                  width={400}
                  height={300}
                  className="rounded-lg mb-2"
                />
                <button
                  onClick={handlePreviousImage}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white px-2 py-1 rounded-r-lg hover:bg-gray-900"
                >
                  &#8592;
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white px-2 py-1 rounded-l-lg hover:bg-gray-900"
                >
                  &#8594;
                </button>
              </div>

              <p className="text-gray-700 mb-2">
                Price: ${selectedProduct.productPrice}
              </p>
              <p className="text-gray-700 mb-2">
                Colors: {selectedProduct.productColors.join(", ")}
              </p>
              <p className="text-gray-700 mb-2">
                Sizes: {selectedProduct.productSizes.join(", ")}
              </p>
              <button
                onClick={handleClosePopup}
                className="mt-4 bg-red-500 text-white px-4 py-2 hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ProductsPage;
