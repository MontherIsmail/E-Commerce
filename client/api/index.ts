import axios, { AxiosInstance, AxiosError } from "axios";
import { API_CONFIG } from "../config/api";
import type {
  Product,
  Cart,
  Profile,
  Order,
  AddToCartData,
  EditProfileData,
  EditPasswordData,
  ApiResponse,
} from "../types";

class ApiClient {
  private api: AxiosInstance;

  constructor(userToken: string = "", baseURL: string = API_CONFIG.BASE_URL) {
    this.api = axios.create({
      baseURL,
      timeout: API_CONFIG.TIMEOUT,
      headers: { authorization: userToken },
      withCredentials: true,
    });
  }

  private handleError(error: unknown): never {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const message = axiosError.response?.data?.message || axiosError.message;
      throw new Error(message);
    }
    throw error;
  }

  private async get<T>(url: string): Promise<T> {
    try {
      const response = await this.api.get<T>(url);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  private async post<T>(url: string, data: any): Promise<T> {
    try {
      const response = await this.api.post<T>(url, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  private async put<T>(url: string, data: any): Promise<T> {
    try {
      const response = await this.api.put<T>(url, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  private async delete<T>(url: string): Promise<T> {
    try {
      const response = await this.api.delete<T>(url);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Product methods
  async getProducts(): Promise<ApiResponse<{ products: Product[] }>> {
    return this.get("products");
  }

  async getProduct(productId: string): Promise<ApiResponse<{ product: Product }>> {
    return this.get(`products/${productId}`);
  }

  // Cart methods
  async addToCart(data: AddToCartData): Promise<ApiResponse> {
    return this.post("cart/add-to-cart", data);
  }

  async getCart(userId: string): Promise<Cart> {
    return this.get(`cart/${userId}`);
  }

  async deleteCartItem(itemId: string): Promise<ApiResponse> {
    return this.delete(`cart/${itemId}`);
  }

  async resetCart(userId: string): Promise<ApiResponse> {
    return this.delete(`cart/reset/${userId}`);
  }

  // Profile methods
  async getProfile(userId: string): Promise<ApiResponse<{ profileData: Profile }>> {
    return this.get(`profile/${userId}`);
  }

  async editProfile(userId: string, data: EditProfileData): Promise<ApiResponse> {
    return this.put(`profile/${userId}`, data);
  }

  async editPassword(userId: string, data: EditPasswordData): Promise<ApiResponse> {
    return this.put(`profile/password/${userId}`, data);
  }

  // Order methods
  async getOrders(userId: string): Promise<ApiResponse<{ orders: Order[] }>> {
    return this.get(`orders/${userId}`);
  }

  // Auth methods (legacy - kept for backwards compatibility)
  async login(data: { email: string; password: string }): Promise<ApiResponse> {
    return this.post("auth/login", data);
  }

  async register(data: {
    username: string;
    email: string;
    password: string;
    role: string;
  }): Promise<ApiResponse> {
    return this.post("auth/signup", data);
  }

  async logout(): Promise<ApiResponse> {
    return this.post("auth/logout", {});
  }
}

// Factory function to create API client instance with bound methods
const createClient = (userToken: string = "", baseURL?: string) => {
  const client = new ApiClient(userToken, baseURL);
  
  // Return object with bound methods to preserve 'this' context
  return {
    getProducts: client.getProducts.bind(client),
    getProduct: client.getProduct.bind(client),
    addToCart: client.addToCart.bind(client),
    getCart: client.getCart.bind(client),
    deleteCartItem: client.deleteCartItem.bind(client),
    resetCart: client.resetCart.bind(client),
    getProfile: client.getProfile.bind(client),
    editProfile: client.editProfile.bind(client),
    editPassword: client.editPassword.bind(client),
    getOrders: client.getOrders.bind(client),
    login: client.login.bind(client),
    register: client.register.bind(client),
    logout: client.logout.bind(client),
  };
};

export default createClient;