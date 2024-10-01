import { FC, useState, ChangeEvent, useEffect } from "react";
import Link from "next/link";
import { Product } from "../../types/product";
import DashboardLayout from "../../components/DashboardLayout";
import Image from "next/image";
import axios from "axios";
import Swal from "sweetalert2";

const ProductsPage: FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [productsData, setProductsData] = useState<Product[]>([]);

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

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/products");
      setProductsData(response.data.products);
      console.log("response", response.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

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
                    src={product.productUrlImgs[0]}
                    alt={product.productName}
                    width={50}
                    height={50}
                    className="rounded-lg"
                  />
                </td>
                <td className="border px-4 py-2 w-40 overflow-hidden text-ellipsis whitespace-nowrap">
                  {product.productName}
                </td>
                <td className="border px-4 py-2 overflow-hidden">
                  ${product.productPrice}
                </td>
                <td className="border px-4 py-2 overflow-hidden">
                  {product.productCategory}
                </td>
                <td className="border px-4 py-2 overflow-hidden">
                  {product.productColors
                    .map((color: any) => color.name)
                    .join(", ")}
                </td>
                <td className="border px-4 py-2 overflow-hidden">
                  {product.productSizes
                    .filter((size: any) => size.inStock)
                    .map((size: any) => size.name)
                    .join(", ")}
                </td>
                <td className="border px-4 py-2 overflow-hidden">
                  {product.stock}
                </td>
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
