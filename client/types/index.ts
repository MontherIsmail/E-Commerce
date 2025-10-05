// User Types
export interface User {
  id: string;
  username: string;
  role: 'user' | 'admin';
}

export interface AuthResponse {
  message: string;
  user?: User;
}

// Product Types
export interface Product {
  id: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  productUrlImgs: string[];
  productCategory?: string;
  productRating?: number;
  productReviews?: number;
  productColors?: ProductColor[];
  productSizes?: ProductSize[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductColor {
  name: string;
  class: string;
  selectedClass: string;
}

export interface ProductSize {
  name: string;
  inStock: boolean;
  selectedClass: string;
}

// Cart Types
export interface CartItem {
  id: string;
  productId: string;
  userId: string;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
  products: Product;
}

export interface Cart {
  cartItems: CartItem[];
}

// Order Types
export interface Order {
  id: string;
  userId: string;
  products: CartItem[];
  totalAmount: number;
  status: string;
  createdAt: string;
}

// Profile Types
export interface Profile {
  id: string;
  email: string;
  username: string;
  role: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  error?: string;
}

// Form Types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  role?: string;
}

export interface AddToCartData {
  productId: string;
  userId: string;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

export interface EditProfileData {
  username?: string;
  email?: string;
}

export interface EditPasswordData {
  currentPassword: string;
  newPassword: string;
}
