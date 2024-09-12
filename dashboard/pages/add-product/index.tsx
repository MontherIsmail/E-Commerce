// pages/add-product.tsx
import { FC } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import DashboardLayout from "@/components/DashboardLayout";

// Validation Schema
const validationSchema = Yup.object({
  productName: Yup.string().required("Required"),
  productImages: Yup.array()
    .of(Yup.string().url("Invalid URL"))
    .min(1, "At least one image is required"),
  productPrice: Yup.number()
    .required("Required")
    .positive("Price must be positive"),
  productDescription: Yup.string().required("Required"),
  productCategory: Yup.string().required("Required"),
  productColors: Yup.array()
    .of(
      Yup.object({
        name: Yup.string().required("Required"),
        class: Yup.string().required("Required"),
        selectedClass: Yup.string().required("Required"),
      })
    )
    .min(1, "At least one color is required"),
  productSizes: Yup.array()
    .of(
      Yup.object({
        name: Yup.string().required("Required"),
        inStock: Yup.boolean().required("Required"),
      })
    )
    .min(1, "At least one size is required"),
  stock: Yup.number().required("Required").positive("Stock must be positive"),
});

interface AddProductPageProps {}

const AddProductPage: FC<AddProductPageProps> = () => {
  const router = useRouter();

  const handleSubmit = (values: any) => {
    // Here you would typically send values to your backend
    console.log(values);

    // Redirect to products page or display a success message
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
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, setFieldValue }) => (
            <Form>
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

              <div className="mb-4">
                <label
                  htmlFor="productImages"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Images
                </label>
                {values.productImages.map((_, index) => (
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
                      onClick={() =>
                        setFieldValue(
                          "productImages",
                          values.productImages.filter((_, i) => i !== index)
                        )
                      }
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="text-blue-500"
                  onClick={() =>
                    setFieldValue("productImages", [
                      ...values.productImages,
                      "",
                    ])
                  }
                >
                  Add Image
                </button>
              </div>

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

              <div className="mb-4">
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

              <div className="mb-4">
                <label
                  htmlFor="productColors"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Colors
                </label>
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
                      onClick={() =>
                        setFieldValue(
                          "productColors",
                          values.productColors.filter((_, i) => i !== index)
                        )
                      }
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="text-blue-500"
                  onClick={() =>
                    setFieldValue("productColors", [
                      ...values.productColors,
                      { name: "", class: "", selectedClass: "" },
                    ])
                  }
                >
                  Add Color
                </button>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="productSizes"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Sizes
                </label>
                {values.productSizes.map((size, index) => (
                  <div key={index} className="mb-2 flex flex-col">
                    <Field
                      id={`productSizes.${index}.name`}
                      name={`productSizes.${index}.name`}
                      type="text"
                      placeholder="Size Name"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    />
                    <Field
                      id={`productSizes.${index}.inStock`}
                      name={`productSizes.${index}.inStock`}
                      type="checkbox"
                      className="mt-1"
                    />
                    <label
                      htmlFor={`productSizes.${index}.inStock`}
                      className="ml-2 text-sm text-gray-700"
                    >
                      In Stock
                    </label>
                    <button
                      type="button"
                      className="mt-2 text-red-500"
                      onClick={() =>
                        setFieldValue(
                          "productSizes",
                          values.productSizes.filter((_, i) => i !== index)
                        )
                      }
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="text-blue-500"
                  onClick={() =>
                    setFieldValue("productSizes", [
                      ...values.productSizes,
                      { name: "", inStock: false },
                    ])
                  }
                >
                  Add Size
                </button>
              </div>

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

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => router.push("/products")}
                  className="mr-2 bg-gray-500 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
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
