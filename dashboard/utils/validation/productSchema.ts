import * as Yup from 'yup';

export const productSchema = Yup.object().shape({
  productName: Yup.string().required('Product name is required'),
  productPrice: Yup.number().required('Product price is required').positive('Price must be a positive number'),
  productImages: Yup.array().of(Yup.string().url('Invalid URL')).required('At least one image URL is required'),
  productColors: Yup.array().of(
    Yup.object({
      name: Yup.string().required('Color name is required'),
      hex: Yup.string()
        .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Invalid hex color format')
        .required('Hex color is required'),
    })
  ).required('At least one color is required'),
  productSizes: Yup.array().of(Yup.string().required('Size is required')).required('At least one size is required'),
});
