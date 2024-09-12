import { FC } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  productName: Yup.string().required("Required"),
  productImages: Yup.array().of(Yup.string().url("Invalid URL")).min(1, "At least one image is required"),
  productPrice: Yup.number().required("Required").positive("Price must be positive"),
  productDescription: Yup.string().required("Required"),
  productCategory: Yup.string().required("Required"),
  productColors: Yup.array().of(
    Yup.object({
      name: Yup.string().required("Required"),
      class: Yup.string().required("Required"),
      selectedClass: Yup.string().required("Required"),
    })
  ).min(1, "At least one color is required"),
  productSizes: Yup.array().of(
    Yup.object({
      name: Yup.string().required("Required"),
      inStock: Yup.boolean().required("Required"),
    })
  ).min(1, "At least one size is required"),
  stock: Yup.number().required("Required").positive("Stock must be positive"),
});

interface AddProductFormProps {
  onClose: () => void;
  onSave: (product: any) => void;
}

const AddProductForm: FC<AddProductFormProps> = ({ onClose, onSave }) => {
  return (
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
      onSubmit={(values) => {
        onSave(values);
      }}
    >
      {({ values, handleChange, setFieldValue }) => (
        <Form className="max-h-screen overflow-y-auto">
          <div className="mb-4">
            <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Product Name</label>
            <Field
              id="productName"
              name="productName"
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="productImages" className="block text-sm font-medium text-gray-700">Product Images</label>
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
                  onClick={() => setFieldValue("productImages", values.productImages.filter((_, i) => i !== index))}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="text-blue-500"
              onClick={() => setFieldValue("productImages", [...values.productImages, ""])}
            >
              Add Image
            </button>
          </div>

          <div className="mb-4">
            <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700">Product Price</label>
            <Field
              id="productPrice"
              name="productPrice"
              type="number"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700">Product Description</label>
            <Field
              id="productDescription"
              name="productDescription"
              as="textarea"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="productCategory" className="block text-sm font-medium text-gray-700">Product Category</label>
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
            <label htmlFor="productColors" className="block text-sm font-medium text-gray-700">Product Colors</label>
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
                  onClick={() => setFieldValue("productColors", values.productColors.filter((_, i) => i !== index))}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="text-blue-500"
              onClick={() => setFieldValue("productColors", [...values.productColors, { name: "", class: "", selectedClass: "" }])}
            >
              Add Color
            </button>
          </div>

          <div className="mb-4">
            <label htmlFor="productSizes" className="block text-sm font-medium text-gray-700">Product Sizes</label>
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
                <label htmlFor={`productSizes.${index}.inStock`} className="ml-2 text-sm text-gray-700">In Stock</label>
                <button
                  type="button"
                  className="mt-2 text-red-500"
                  onClick={() => setFieldValue("productSizes", values.productSizes.filter((_, i) => i !== index))}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="text-blue-500"
              onClick={() => setFieldValue("productSizes", [...values.productSizes, { name: "", inStock: false }])}
            >
              Add Size
            </button>
          </div>

          <div className="mb-4">
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
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
              onClick={onClose}
              className="mr-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Save
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddProductForm;
