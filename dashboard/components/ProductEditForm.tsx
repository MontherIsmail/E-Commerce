import { FC, useState } from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { Product } from "../types/product";
import axios from "axios";
import { EditFormSkeleton } from "./Skeletons";
import { getApiUrl } from "../config/api";
import Swal from "sweetalert2";

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
  productDescription: Yup.string().required("Product description is required"),
  productCategory: Yup.string().required("Product category is required"),
  stock: Yup.number()
    .required("Stock is required")
    .min(0, "Stock cannot be negative"),
  productImages: Yup.string().required("Product images are required"),
  productColors: Yup.array()
    .of(
      Yup.object({
        name: Yup.string().required("Color Name is required"),
        hex: Yup.string()
          .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid hex color format")
          .required("Hex Color is required"),
      })
    )
    .min(1, "At least one color is required"),
  productSizes: Yup.string().required("Product sizes are required"),
});

const ProductEditForm: FC<ProductEditFormProps> = ({
  product,
  onClose,
  onSave,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Helper function to validate hex color
  const isValidHexColor = (hex: string) => {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
  };

  const initialValues = {
    productName: product.productName || "",
    productPrice: product.productPrice || 0,
    productDescription: product.productDescription || "",
    productCategory: product.productCategory || "",
    stock: product.stock || 0,
    productImages: product.productUrlImgs?.join(", ") || "",
    productColors: product.productColors || [{ name: "", hex: "#000000" }],
    productSizes: product.productSizes?.map((size: any) => size.name).join(", ") || "",
  };

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true);
    setIsLoading(true);
    try {
      // Prepare data according to the API schema
      const requestData = {
        name: values.productName,
        price: parseFloat(values.productPrice),
        description: values.productDescription,
        category: values.productCategory,
        stock: parseInt(values.stock),
        images: values.productImages
          .split(",")
          .map((img: string) => img.trim())
          .filter((img: string) => img.length > 0),
        productColors: values.productColors.filter((color: any) => color.name.length > 0 && color.hex.length > 0),
        productSizes: values.productSizes
          .split(",")
          .map((name: string) => ({
            name: name.trim(),
            inStock: true,
          }))
          .filter((size: any) => size.name.length > 0),
      };

      // Make API call to update the product
      const response = await axios.put(
        getApiUrl(`/products/${product.id}`),
        requestData,
        { withCredentials: true }
      );

      // Update the product in the parent component
      const updatedProduct = {
        ...product,
        productName: values.productName,
        productPrice: parseFloat(values.productPrice),
        productDescription: values.productDescription,
        productCategory: values.productCategory,
        stock: parseInt(values.stock),
        productUrlImgs: requestData.images,
        productColors: requestData.productColors,
        productSizes: requestData.productSizes,
      };

      onSave(updatedProduct);
      
      // Show success message
      Swal.fire({
        title: "Success!",
        text: "Product updated successfully",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      
      onClose();
    } catch (error: any) {
      console.error("Error updating product:", error);
      // Show error message to user
      Swal.fire({
        title: "Error!",
        text: error?.response?.data?.message || "Failed to update product. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsSubmitting(false);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <EditFormSkeleton />;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl">
        <div className="sticky top-0 bg-white border-b px-6 py-4 rounded-t-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Edit Product</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6">
          <Formik
            initialValues={initialValues}
            validationSchema={productSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting: formikSubmitting }) => (
              <Form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Product Name Field */}
                  <div className="md:col-span-2">
                    <label
                      htmlFor="productName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Product Name *
                    </label>
                    <Field
                      type="text"
                      name="productName"
                      id="productName"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter product name"
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
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Price ($) *
                    </label>
                    <Field
                      type="number"
                      step="0.01"
                      min="0"
                      name="productPrice"
                      id="productPrice"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="0.00"
                    />
                    <ErrorMessage
                      name="productPrice"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Stock Field */}
                  <div>
                    <label
                      htmlFor="stock"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Stock Quantity *
                    </label>
                    <Field
                      type="number"
                      min="0"
                      name="stock"
                      id="stock"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="0"
                    />
                    <ErrorMessage
                      name="stock"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Product Category Field */}
                  <div>
                    <label
                      htmlFor="productCategory"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Category *
                    </label>
                    <Field
                      type="text"
                      name="productCategory"
                      id="productCategory"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="e.g., Electronics, Clothing"
                    />
                    <ErrorMessage
                      name="productCategory"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Product Description Field */}
                  <div className="md:col-span-2">
                    <label
                      htmlFor="productDescription"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Description *
                    </label>
                    <Field
                      as="textarea"
                      name="productDescription"
                      id="productDescription"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                      placeholder="Enter product description"
                    />
                    <ErrorMessage
                      name="productDescription"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Product Images Field */}
                  <div className="md:col-span-2">
                    <label
                      htmlFor="productImages"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Image URLs *
                    </label>
                    <Field
                      as="textarea"
                      name="productImages"
                      id="productImages"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                      placeholder="Enter image URLs separated by commas"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Separate multiple URLs with commas
                    </p>
                    <ErrorMessage
                      name="productImages"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Product Colors Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Colors *
                    </label>
                    <FieldArray name="productColors">
                      {({ push, remove }) => (
                        <div className="space-y-4">
                          {values.productColors.map((color: any, index: number) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4">
                              <div className="flex justify-between items-center mb-3">
                                <span className="text-sm font-medium text-gray-700">Color {index + 1}</span>
                                {values.productColors.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="text-red-600 hover:text-red-800"
                                  >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  </button>
                                )}
                              </div>
                              <div className="space-y-3">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">Color Name</label>
                                  <Field
                                    name={`productColors.${index}.name`}
                                    type="text"
                                    placeholder="e.g., Midnight Blue, Cherry Red"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                                  <div className="flex items-center space-x-3">
                                    <div className="flex-1">
                                      <Field
                                        name={`productColors.${index}.hex`}
                                        type="color"
                                        className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
                                      />
                                    </div>
                                    <Field
                                      name={`productColors.${index}.hex`}
                                      type="text"
                                      placeholder="#000000"
                                      className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm font-mono"
                                    />
                                    <div 
                                      className="w-12 h-12 rounded-lg border-2 border-gray-300 flex-shrink-0"
                                      style={{ 
                                        backgroundColor: isValidHexColor(color.hex) ? color.hex : '#f3f4f6',
                                        borderColor: isValidHexColor(color.hex) ? color.hex : '#d1d5db'
                                      }}
                                    ></div>
                                  </div>
                                  {color.hex && !isValidHexColor(color.hex) && (
                                    <p className="text-red-500 text-sm mt-1">Please enter a valid hex color (e.g., #FF0000)</p>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => push({ name: "", hex: "#000000" })}
                            className="w-full flex items-center justify-center px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border-2 border-dashed border-gray-300"
                          >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add Color
                          </button>
                        </div>
                      )}
                    </FieldArray>
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
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Sizes *
                    </label>
                    <Field
                      type="text"
                      name="productSizes"
                      id="productSizes"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="S, M, L, XL"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Separate sizes with commas
                    </p>
                    <ErrorMessage
                      name="productSizes"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-6 border-t">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || formikSubmitting}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ProductEditForm;
