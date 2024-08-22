import axios from "axios";

const createClient = (
  userToken: string,
  baseURL = "http://localhost:5000/api/v1/"
): any => {
  const api = axios.create({
    baseURL,
    timeout: 1000,
    headers: { authorization: userToken },
  });

  const get = async (query: string) => {
    try {
      const response = await api.get(query);
      // console.log("response", response);
      return response?.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const post = async (query: string, data: any) => {
    try {
      const response = await api.post(query, data);
      return response?.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const dele = async (query: string) => {
    try {
      const response = await api.delete(query);
      // console.log("response", response);
      return response?.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  return {
    getProducts: async (): Promise<any> => {
      const response = await get("products");
      return response;
    },

    getProduct: async (productId: string): Promise<any> => {
      const response = await get(`products/${productId}`);
      return response;
    },

    addToCart: async (i: any): Promise<any> => {
      const response = await post("cart/add-to-cart", {
        data: { ...i },
      });
      return response;
    },

    getCart: async (userId: string): Promise<any> => {
      const response = await get(`cart/${userId}`);
      return response;
    },

    getOrders: async (userId: any): Promise<any> => {
      const response = await get(`orders/${userId}`);
      return response;
    },

    deleteCartItem: async (itemId: any): Promise<any> => {
      const response = await dele(`cart/${itemId}`);
      return response;
    },

    resetCart: async (userId: any): Promise<any> => {
      const response = await dele(`cart/reset/${userId}`);
      return response;
    },
    get,
    post,
  };
};

export default createClient;

//export const setUserToken = (token: string): boolean => {
//    try {
//        //@ts-ignore
//        window.localStorage.setItem(TOKEN_NAME, token);
//        return true;
//    } catch (error) {
//        return false;
//    }
//};
