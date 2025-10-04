import { Request, Response } from "express";
import { addProductSchema } from "../../utils/validation";
import prisma from "../../middleware/prisma";
import cloudinaryImg from "../../utils/cloudinary";

const addProduct = async (req: Request, res: Response) => {
  try {
    const {
      productName,
      productImages,
      productPrice,
      productDescription,
      productCategory,
      productColors,
      productSizes,
      stock,
    } = req.body;

    // Validate request body
    await addProductSchema.validateAsync(req.body);

    // Process images - if already a URL, use it; otherwise upload to Cloudinary
    const productUrlImgs = await Promise.all(
      productImages.map(async (productImage: any) => {
        try {
          // Check if it's already a valid URL
          if (productImage.startsWith('http://') || productImage.startsWith('https://')) {
            return productImage;
          }
          // Otherwise, try to upload to Cloudinary
          const url = await cloudinaryImg(productImage);
          return url;
        } catch (cloudinaryError) {
          console.error('Cloudinary upload error:', cloudinaryError);
          // If Cloudinary fails, check if it's a URL and use it anyway
          if (productImage.startsWith('http://') || productImage.startsWith('https://')) {
            return productImage;
          }
          // If not a URL, throw error
          throw new Error('Invalid image: must be a URL or valid image file');
        }
      })
    );

    const newProduct = await prisma.products.create({
      data: {
        productName,
        productUrlImgs,
        productPrice: parseFloat(productPrice),
        productDescription,
        productCategory,
        productColors,
        productSizes,
        stock: parseInt(stock),
      },
    });

    return res
      .status(201)
      .json({ message: "Product Added Successfully", newProduct });
  } catch (error: any) {
    console.error('Add product error:', error);
    
    // Handle validation errors
    if (error.isJoi) {
      return res.status(400).json({ 
        message: "Validation Error", 
        details: error.details 
      });
    }

    // Handle other errors
    return res.status(500).json({ 
      message: "Internal Server Error", 
      error: error.message || error 
    });
  }
};

export default addProduct;
