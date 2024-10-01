import { FC } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Product } from "../types/product";

interface ProductEditFormProps {
  product: Product;
  onClose: () => void;
  onSave: (updatedProduct: Product) => void;
}

const productSchema = Yup.object().shape({
  productName: Yup.string().required("Product name is required"),
  productPrice: Yup.number()
    .required("Product price is required")
    .positive("Product price must be positive"),
  productImages: Yup.string().required("Product images are required"),
  productColors: Yup.string().required("Product colors are required"),
  productSizes: Yup.string().required("Product sizes are required"),
});

const ProductEditForm: FC<ProductEditFormProps> = ({
  product,
  onClose,
  onSave,
}) => {
  const initialValues = {
    productName: product.productName,
    productPrice: product.productPrice,
    productImages: product.productUrlImgs.join(", "),
    productColors: product.productColors
      .map((color: any) => color.name)
      .join(", "),
    productSizes: product.productSizes.map((size: any) => size.name).join(", "),
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 w-full max-w-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Product</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={productSchema}
          onSubmit={(values) => {
            const updatedProduct = {
              ...product, // Preserve existing product data
              productName: values.productName,
              productPrice: values.productPrice,
              productUrlImgs: values.productImages
                .split(",")
                .map((img: string) => img.trim()),
              productColors: values.productColors
                .split(",")
                .map((name: string) => ({
                  name,
                  class: "", // Add class values as per your use case
                  selectedClass: "",
                })),
              productSizes: values.productSizes
                .split(",")
                .map((name: string) => ({
                  name,
                  inStock: true, // Customize inStock as needed
                })),
            };
            onSave(updatedProduct);
            onClose();
          }}
        >
          {() => (
            <Form className="space-y-4">
              {/* Product Name Field */}
              <div>
                <label
                  htmlFor="productName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Name
                </label>
                <Field
                  type="text"
                  name="productName"
                  id="productName"
                  className="mt-1 block w-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 rounded-md"
                />
                <ErrorMessage
                  name="productName"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Product Price Field */}
              <div>
                <label
                  htmlFor="productPrice"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Price
                </label>
                <Field
                  type="number"
                  name="productPrice"
                  id="productPrice"
                  className="mt-1 block w-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 rounded-md"
                />
                <ErrorMessage
                  name="productPrice"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Product Images Field */}
              <div>
                <label
                  htmlFor="productImages"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Images (comma-separated URLs)
                </label>
                <Field
                  type="text"
                  name="productImages"
                  id="productImages"
                  className="mt-1 block w-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 rounded-md"
                />
                <ErrorMessage
                  name="productImages"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Product Colors Field */}
              <div>
                <label
                  htmlFor="productColors"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Colors (comma-separated names)
                </label>
                <Field
                  type="text"
                  name="productColors"
                  id="productColors"
                  className="mt-1 block w-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 rounded-md"
                />
                <ErrorMessage
                  name="productColors"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Product Sizes Field */}
              <div>
                <label
                  htmlFor="productSizes"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Sizes (comma-separated names)
                </label>
                <Field
                  type="text"
                  name="productSizes"
                  id="productSizes"
                  className="mt-1 block w-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 rounded-md"
                />
                <ErrorMessage
                  name="productSizes"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-500 text-white px-4 py-2 hover:bg-gray-600 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 rounded-md"
                >
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ProductEditForm;
