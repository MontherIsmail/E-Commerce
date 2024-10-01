import { FC } from "react";
import { Formik, Field, Form, FieldArray } from "formik";
import { useRouter } from "next/router";
import DashboardLayout from "@/components/DashboardLayout";
import addProductSchema from "@/utils/validation/addProductSchema";
import axios from "axios";
import Swal from "sweetalert2";

interface AddProductPageProps {}

const AddProductPage: FC<AddProductPageProps> = () => {
  const router = useRouter();

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
    try {
      await axios.post("http://localhost:5000/api/v1/products/add-product", {
        productName,
        productImages,
        productPrice,
        productDescription,
        productCategory,
        productColors,
        productSizes,
        stock,
      });
    } catch (error) {
      console.log(error);
    }
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Product Added Successfully",
      showConfirmButton: false,
      timer: 1500,
    });
    router.push("/products");
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Add Product</h1>

        <Formik
          initialValues={{
            productName: "",
            productImages: [""],
            productPrice: 0,
            productDescription: "",
            productCategory: "",
            productColors: [{ name: "", class: "", selectedClass: "" }],
            productSizes: [{ name: "", inStock: false }],
            stock: 0,
          }}
          validationSchema={addProductSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                {/* Product Name */}
                <div className="mb-4">
                  <label
                    htmlFor="productName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Product Name
                  </label>
                  <Field
                    id="productName"
                    name="productName"
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                {/* Product Price */}
                <div className="mb-4">
                  <label
                    htmlFor="productPrice"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Product Price
                  </label>
                  <Field
                    id="productPrice"
                    name="productPrice"
                    type="number"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                {/* Product Description */}
                <div className="mb-4 col-span-2">
                  <label
                    htmlFor="productDescription"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Product Description
                  </label>
                  <Field
                    id="productDescription"
                    name="productDescription"
                    as="textarea"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                {/* Product Category */}
                <div className="mb-4">
                  <label
                    htmlFor="productCategory"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Product Category
                  </label>
                  <Field
                    id="productCategory"
                    name="productCategory"
                    as="select"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  >
                    <option value="">Select a category</option>
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="kids">Kids</option>
                  </Field>
                </div>

                {/* Product Images */}
                <div className="mb-4 col-span-2">
                  <label
                    htmlFor="productImages"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Product Images
                  </label>
                  <FieldArray name="productImages">
                    {({ push, remove }) => (
                      <div>
                        {values.productImages.map((image, index) => (
                          <div key={index} className="mb-2 flex items-center">
                            <Field
                              id={`productImages.${index}`}
                              name={`productImages.${index}`}
                              type="text"
                              placeholder="Image URL"
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                            />
                            <button
                              type="button"
                              className="ml-2 text-red-500"
                              onClick={() => remove(index)}
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          className="text-blue-500"
                          onClick={() => push("")}
                        >
                          Add Image
                        </button>
                      </div>
                    )}
                  </FieldArray>
                </div>

                {/* Product Colors */}
                <div className="mb-4 col-span-2">
                  <label
                    htmlFor="productColors"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Product Colors
                  </label>
                  <FieldArray name="productColors">
                    {({ push, remove }) => (
                      <div>
                        {values.productColors.map((color, index) => (
                          <div key={index} className="mb-2 flex flex-col">
                            <Field
                              id={`productColors.${index}.name`}
                              name={`productColors.${index}.name`}
                              type="text"
                              placeholder="Color Name"
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                            />
                            <Field
                              id={`productColors.${index}.class`}
                              name={`productColors.${index}.class`}
                              type="text"
                              placeholder="Color Class"
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                            />
                            <Field
                              id={`productColors.${index}.selectedClass`}
                              name={`productColors.${index}.selectedClass`}
                              type="text"
                              placeholder="Selected Color Class"
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                            />
                            <button
                              type="button"
                              className="mt-2 text-red-500"
                              onClick={() => remove(index)}
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          className="text-blue-500"
                          onClick={() =>
                            push({ name: "", class: "", selectedClass: "" })
                          }
                        >
                          Add Color
                        </button>
                      </div>
                    )}
                  </FieldArray>
                </div>

                {/* Product Sizes */}
                <div className="mb-4 col-span-2">
                  <label
                    htmlFor="productSizes"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Product Sizes
                  </label>
                  <FieldArray name="productSizes">
                    {({ push, remove }) => (
                      <div>
                        {values.productSizes.map((size, index) => (
                          <div key={index} className="mb-2 flex flex-col">
                            <Field
                              id={`productSizes.${index}.name`}
                              name={`productSizes.${index}.name`}
                              type="text"
                              placeholder="Size Name"
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                            />
                            <div className="flex items-center mt-2">
                              <Field
                                id={`productSizes.${index}.inStock`}
                                name={`productSizes.${index}.inStock`}
                                type="checkbox"
                                className="mr-2"
                              />
                              <label
                                htmlFor={`productSizes.${index}.inStock`}
                                className="text-sm text-gray-700"
                              >
                                In Stock
                              </label>
                            </div>
                            <button
                              type="button"
                              className="mt-2 text-red-500"
                              onClick={() => remove(index)}
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          className="text-blue-500"
                          onClick={() => push({ name: "", inStock: false })}
                        >
                          Add Size
                        </button>
                      </div>
                    )}
                  </FieldArray>
                </div>

                {/* Stock */}
                <div className="mb-4">
                  <label
                    htmlFor="stock"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Stock
                  </label>
                  <Field
                    id="stock"
                    name="stock"
                    type="number"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => router.push("/products")}
                  className="bg-gray-500 text-white px-4 py-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2"
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </DashboardLayout>
  );
};

export default AddProductPage;
