import * as Yup from "yup";

const addProductSchema = Yup.object({
  productName: Yup.string().required("Product Name is required"),
  productImages: Yup.array()
    .of(Yup.string().url("Invalid URL").required("Image URL is required"))
    .min(1, "At least one image is required"),
  productPrice: Yup.number()
    .required("Product Price is required")
    .positive("Price must be positive"),
  productDescription: Yup.string().required("Product Description is required"),
  productCategory: Yup.string().required("Product Category is required"),
  productColors: Yup.array()
    .of(
      Yup.object({
        name: Yup.string().required("Color Name is required"),
        class: Yup.string().required("Color Class is required"),
        selectedClass: Yup.string().required("Selected Class is required"),
      })
    )
    .min(1, "At least one color is required"),
  productSizes: Yup.array()
    .of(
      Yup.object({
        name: Yup.string().required("Size Name is required"),
        inStock: Yup.boolean().required("In Stock status is required"),
      })
    )
    .min(1, "At least one size is required"),
  stock: Yup.number()
    .required("Stock is required")
    .positive("Stock must be positive"),
});

export default addProductSchema;
