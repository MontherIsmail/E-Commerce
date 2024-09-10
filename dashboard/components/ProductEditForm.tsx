// components/ProductEditForm.tsx
import { FC } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { productSchema } from '../utils/validation/productSchema';
import { Product } from '../types/product';

interface ProductEditFormProps {
  product: Product;
  onClose: () => void;
  onSave: (values: Product) => void;
}

const ProductEditForm: FC<ProductEditFormProps> = ({ product, onClose, onSave }) => {
  const initialValues = {
    productName: product.productName,
    productPrice: product.productPrice,
    productImages: product.productImages,
    productColors: product.productColors,
    productSizes: product.productSizes,
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Product</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={productSchema}
          onSubmit={(values: any) => {
            onSave(values);
            onClose();
          }}
        >
          {() => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <Field
                  type="text"
                  name="productName"
                  id="productName"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <ErrorMessage name="productName" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700">
                  Product Price
                </label>
                <Field
                  type="number"
                  name="productPrice"
                  id="productPrice"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <ErrorMessage name="productPrice" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="productImages" className="block text-sm font-medium text-gray-700">
                  Product Images (comma-separated URLs)
                </label>
                <Field
                  type="text"
                  name="productImages"
                  id="productImages"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <ErrorMessage name="productImages" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="productColors" className="block text-sm font-medium text-gray-700">
                  Product Colors (comma-separated)
                </label>
                <Field
                  type="text"
                  name="productColors"
                  id="productColors"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <ErrorMessage name="productColors" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="productSizes" className="block text-sm font-medium text-gray-700">
                  Product Sizes (comma-separated)
                </label>
                <Field
                  type="text"
                  name="productSizes"
                  id="productSizes"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <ErrorMessage name="productSizes" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-500 text-white px-4 py-2 hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600"
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
