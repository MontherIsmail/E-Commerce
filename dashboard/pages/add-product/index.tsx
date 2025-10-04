import { FC, useState } from "react";
import { Formik, Field, Form, FieldArray, ErrorMessage } from "formik";
import { useRouter } from "next/router";
import DashboardLayout from "@/components/DashboardLayout";
import withAuth from "../../hoc/withAuth";
import addProductSchema from "@/utils/validation/addProductSchema";
import axios from "axios";
import Swal from "sweetalert2";

interface AddProductPageProps {}

const AddProductPage: FC<AddProductPageProps> = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Predefined color options
  const colorOptions = [
    { name: "Black", class: "bg-black", selectedClass: "ring-black" },
    { name: "White", class: "bg-white border border-gray-300", selectedClass: "ring-gray-300" },
    { name: "Red", class: "bg-red-500", selectedClass: "ring-red-500" },
    { name: "Blue", class: "bg-blue-500", selectedClass: "ring-blue-500" },
    { name: "Green", class: "bg-green-500", selectedClass: "ring-green-500" },
    { name: "Yellow", class: "bg-yellow-500", selectedClass: "ring-yellow-500" },
    { name: "Purple", class: "bg-purple-500", selectedClass: "ring-purple-500" },
    { name: "Pink", class: "bg-pink-500", selectedClass: "ring-pink-500" },
    { name: "Gray", class: "bg-gray-500", selectedClass: "ring-gray-500" },
    { name: "Orange", class: "bg-orange-500", selectedClass: "ring-orange-500" },
    { name: "Indigo", class: "bg-indigo-500", selectedClass: "ring-indigo-500" },
    { name: "Teal", class: "bg-teal-500", selectedClass: "ring-teal-500" },
  ];

  const handleSubmit = async (values: any) => {
    const {
      productName,
      productImages,
      productPrice,
      productDescription,
      productCategory,
      productColors,
      productSizes,
      stock,
    } = values;

    setIsSubmitting(true);

    try {
      await axios.post(
        "http://localhost:5000/api/v1/products/add-product",
        {
          productName,
          productImages,
          productPrice: parseFloat(productPrice),
          productDescription,
          productCategory,
          productColors,
          productSizes,
          stock: parseInt(stock),
        },
        {
          withCredentials: true, // Send cookies with request
        }
      );

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Product added successfully",
        timer: 2000,
        showConfirmButton: false,
      });

      router.push("/products");
    } catch (error: any) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to add product",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
              <p className="text-gray-600 mt-1">Fill in the details to create a new product</p>
            </div>
            <button
              onClick={() => router.push("/products")}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Products
            </button>
          </div>
        </div>

        <Formik
          initialValues={{
            productName: "",
            productImages: [""],
            productPrice: "",
            productDescription: "",
            productCategory: "",
            productColors: [{ name: "Black", class: "bg-black", selectedClass: "ring-black" }],
            productSizes: [{ name: "", inStock: true }],
            stock: "",
          }}
          validationSchema={addProductSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched }) => (
            <Form>
              {/* Basic Information Section */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
                  <p className="text-sm text-gray-500 mt-1">Essential product details</p>
                </div>
                <div className="p-6 space-y-6">
                  {/* Product Name & Price */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-2">
                        Product Name <span className="text-red-500">*</span>
                      </label>
                      <Field
                        id="productName"
                        name="productName"
                        type="text"
                        placeholder="Enter product name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                      <ErrorMessage name="productName" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                      <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700 mb-2">
                        Price ($) <span className="text-red-500">*</span>
                      </label>
                      <Field
                        id="productPrice"
                        name="productPrice"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                      <ErrorMessage name="productPrice" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                  </div>

                  {/* Category & Stock */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="productCategory" className="block text-sm font-medium text-gray-700 mb-2">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <Field
                        id="productCategory"
                        name="productCategory"
                        as="select"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="">Select a category</option>
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                        <option value="kids">Kids</option>
                      </Field>
                      <ErrorMessage name="productCategory" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                      <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-2">
                        Stock Quantity <span className="text-red-500">*</span>
                      </label>
                      <Field
                        id="stock"
                        name="stock"
                        type="number"
                        placeholder="0"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                      <ErrorMessage name="stock" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700 mb-2">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <Field
                      id="productDescription"
                      name="productDescription"
                      as="textarea"
                      rows={4}
                      placeholder="Describe your product..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                    <ErrorMessage name="productDescription" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                </div>
              </div>

              {/* Product Images Section */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Product Images</h2>
                  <p className="text-sm text-gray-500 mt-1">Add images for your product</p>
                </div>
                <div className="p-6">
                  <FieldArray name="productImages">
                    {({ push, remove }) => (
                      <div className="space-y-3">
                        {values.productImages.map((image, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <div className="flex-1">
                              <Field
                                name={`productImages.${index}`}
                                type="text"
                                placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                              />
                            </div>
                            {values.productImages.length > 1 && (
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => push("")}
                          className="flex items-center px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          Add Another Image
                        </button>
                      </div>
                    )}
                  </FieldArray>
                </div>
              </div>

              {/* Colors & Sizes Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Colors */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Colors</h2>
                    <p className="text-sm text-gray-500 mt-1">Available color options</p>
                  </div>
                  <div className="p-6">
                    <FieldArray name="productColors">
                      {({ push, remove }) => (
                        <div className="space-y-4">
                          {values.productColors.map((color, index) => (
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
                                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Color</label>
                                  <Field
                                    name={`productColors.${index}.name`}
                                    as="select"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                  >
                                    <option value="">Choose a color...</option>
                                    {colorOptions.map((option) => (
                                      <option key={option.name} value={option.name}>
                                        {option.name}
                                      </option>
                                    ))}
                                  </Field>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">Color Preview</label>
                                  <div className="flex items-center space-x-3">
                                    <div 
                                      className={`w-8 h-8 rounded-full border-2 ${colorOptions.find(opt => opt.name === color.name)?.class || 'bg-gray-300'} ${colorOptions.find(opt => opt.name === color.name)?.selectedClass || 'ring-gray-300'}`}
                                    ></div>
                                    <span className="text-sm text-gray-600">
                                      {color.name || "No color selected"}
                                    </span>
                                  </div>
                                </div>
                                {/* Hidden fields for class and selectedClass */}
                                <Field
                                  name={`productColors.${index}.class`}
                                  type="hidden"
                                  value={colorOptions.find(opt => opt.name === color.name)?.class || "bg-gray-300"}
                                />
                                <Field
                                  name={`productColors.${index}.selectedClass`}
                                  type="hidden"
                                  value={colorOptions.find(opt => opt.name === color.name)?.selectedClass || "ring-gray-300"}
                                />
                              </div>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => push({ name: "", class: "bg-gray-300", selectedClass: "ring-gray-300" })}
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
                  </div>
                </div>

                {/* Sizes */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Sizes</h2>
                    <p className="text-sm text-gray-500 mt-1">Available size options</p>
                  </div>
                  <div className="p-6">
                    <FieldArray name="productSizes">
                      {({ push, remove }) => (
                        <div className="space-y-4">
                          {values.productSizes.map((size, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4">
                              <div className="flex justify-between items-center mb-3">
                                <span className="text-sm font-medium text-gray-700">Size {index + 1}</span>
                                {values.productSizes.length > 1 && (
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
                                <Field
                                  name={`productSizes.${index}.name`}
                                  type="text"
                                  placeholder="Size name (e.g., XL, 42)"
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                />
                                <label className="flex items-center space-x-2">
                                  <Field
                                    name={`productSizes.${index}.inStock`}
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                  />
                                  <span className="text-sm text-gray-700">In Stock</span>
                                </label>
                              </div>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => push({ name: "", inStock: true })}
                            className="w-full flex items-center justify-center px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border-2 border-dashed border-gray-300"
                          >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add Size
                          </button>
                        </div>
                      )}
                    </FieldArray>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => router.push("/products")}
                  disabled={isSubmitting}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Adding Product...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Add Product
                    </>
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </DashboardLayout>
  );
};

export default withAuth(AddProductPage);
