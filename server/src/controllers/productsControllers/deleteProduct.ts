import { Request, Response } from "express";
import prisma from "../../middleware/prisma";

const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const productId = parseInt(id);
  try {
    const product = await prisma.products.findUnique({
      where: { id: productId },
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    // Delete cart items that reference this product
    await prisma.cart.deleteMany({
      where: { productId: productId },
    });
    
    // Delete order items that reference this product
    await prisma.orderItem.deleteMany({
      where: { productId: productId },
    });
    
    // Delete the product
    await prisma.products.delete({
      where: { id: productId },
    });
    
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error: any) {
    console.error("Delete product error:", error);
    return res.status(500).json({ 
      message: "Internal Server Error", 
      error: error.message || error 
    });
  }
};

export default deleteProduct;
