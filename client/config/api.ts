// API Configuration
// Prefer same-origin relative path in production to avoid CORS and cookie issues.
// If NEXT_PUBLIC_API_URL is provided, it will be used; otherwise fall back to '/api/v1'.
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || '/api',
  TIMEOUT: 10000, // 10 seconds
} as const;

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  LOGOUT: '/auth/logout',
  ME: '/auth/me',
  
  // Products
  PRODUCTS: '/products',
  PRODUCT: (id: string) => `/products/${id}`,
  
  // Cart
  ADD_TO_CART: '/cart/add-to-cart',
  GET_CART: (userId: string) => `/cart/${userId}`,
  DELETE_CART_ITEM: (itemId: string) => `/cart/${itemId}`,
  RESET_CART: (userId: string) => `/cart/reset/${userId}`,
  
  // Profile
  GET_PROFILE: (userId: string) => `/profile/${userId}`,
  EDIT_PROFILE: (userId: string) => `/profile/${userId}`,
  EDIT_PASSWORD: (userId: string) => `/profile/password/${userId}`,
  
  // Orders
  GET_ORDERS: (userId: string) => `/orders/${userId}`,
  
  // Payment
  CREATE_PAYMENT_INTENT: '/payment/create-payment-intent',
} as const;
