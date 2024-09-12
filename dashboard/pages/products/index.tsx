import { FC, useState, ChangeEvent } from "react";
import Link from "next/link";
import { Product } from "../../types/product";
import DashboardLayout from "../../components/DashboardLayout";
import Image from "next/image";

const productsData: Product[] = [
  {
    id: 1,
    productName: "T-shirt",
    productImages: [
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
      { name: "XS", inStock: true },
      { name: "S", inStock: true },
      { name: "M", inStock: true },
    ],
    stock: 500,
  },
  {
    id: 2,
    productName: "T-shirt",
    productImages: [
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
      { name: "XS", inStock: true },
      { name: "S", inStock: true },
      { name: "M", inStock: true },
    ],
    stock: 500,
  },
  {
    id: 3,
    productName: "T-shirt",
    productImages: [
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
      { name: "XS", inStock: true },
      { name: "S", inStock: true },
      { name: "M", inStock: true },
    ],
    stock: 500,
  },
  {
    id: 4,
    productName: "T-shirt",
    productImages: [
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
      { name: "XS", inStock: true },
      { name: "S", inStock: true },
      { name: "M", inStock: true },
    ],
    stock: 500,
  },
  {
    id: 5,
    productName: "test",
    productImages: [
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
      { name: "XS", inStock: true },
      { name: "S", inStock: true },
      { name: "M", inStock: true },
    ],
    stock: 500,
  },
  {
    id: 6,
    productName: "T-shirt",
    productImages: [
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
      { name: "XS", inStock: true },
      { name: "S", inStock: true },
      { name: "M", inStock: true },
    ],
    stock: 500,
  },
  {
    id: 7,
    productName: "mm",
    productImages: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfuvq66T2bVxg9fi1ovJww5kDy5icC0v2xUpBMrk_M8QAn4cl4K7223QuwtWLy_SAWquk&usqp=CAU",
    ],
    productPrice: 49,
    productDescription: "Nice t-shirt with many colors",
    productCategory: "women",
    productColors: [
      { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
      { name: "Gray", class: "bg-gray-400", selectedClass: "ring-gray-400" },
      { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
    ],
    productSizes: [
      { name: "XS", inStock: true },
      { name: "S", inStock: true },
      { name: "M", inStock: true },
    ],
    stock: 500,
  },
  // Add more product data as needed...
];

const ProductsPage: FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  const handleDelete = (productId: number) => {
    console.log(`Delete product with id: ${productId}`);
  };

  // Filter and sort products
  const filteredAndSortedProducts = productsData
    .filter((product) => {
      const matchesSearch = product.productName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" ||
        product.productCategory === selectedCategory;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return b.id - a.id;
      } else if (sortOrder === "oldest") {
        return a.id - b.id;
      }
      return 0;
    });

  return (
    <DashboardLayout>
      <div className="container mx-auto p-4 relative">
        {/* Add Product Button */}
        <Link href="/add-product">
          <button className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 hover:bg-green-600">
            Add Product
          </button>
        </Link>

        <h1 className="text-3xl font-bold mb-4">Products</h1>

        {/* Search and Filter */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(e.target.value)
            }
            className="border p-2 mr-4"
          />

          <select
            value={selectedCategory}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setSelectedCategory(e.target.value)
            }
            className="border p-2 mr-4"
          >
            <option value="all">All</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setSortOrder(e.target.value)
            }
            className="border p-2"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>

        {/* Product Table */}
        <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Colors</th>
              <th className="px-4 py-2">Sizes</th>
              <th className="px-4 py-2">Stock</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedProducts.map((product) => (
              <tr key={product.id}>
                <td className="border px-4 py-2">
                  <Image
                    src={product.productImages[0]}
                    alt={product.productName}
                    width={50}
                    height={50}
                    className="rounded-lg"
                  />
                </td>
                <td className="border px-4 py-2 w-40 overflow-hidden text-ellipsis whitespace-nowrap">{product.productName}</td>
                <td className="border px-4 py-2 overflow-hidden">${product.productPrice}</td>
                <td className="border px-4 py-2 overflow-hidden">{product.productCategory}</td>
                <td className="border px-4 py-2 overflow-hidden">
                  {product.productColors.map((color: any) => color.name).join(", ")}
                </td>
                <td className="border px-4 py-2 overflow-hidden">
                  {product.productSizes
                    .filter((size: any) => size.inStock)
                    .map((size: any) => size.name)
                    .join(", ")}
                </td>
                <td className="border px-4 py-2 overflow-hidden">{product.stock}</td>
                <td className="border px-4 py-2 overflow-hidden">
                  <div className="flex space-x-2 overflow-hidden">
                    <Link
                      href={`/products/${product.id}`}
                      className="bg-green-500 text-white px-4 py-2 hover:bg-green-600"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-500 text-white px-4 py-2 hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default ProductsPage;
