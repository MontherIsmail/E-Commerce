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
      console.log("response", response);
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

    // getMenu: async (): Promise<any> => {
    //     const response = await get("menu");
    //     return response;
    // },

    // getCollections: async (): Promise<any> => {
    //     const response = await get("collection");
    //     return response;
    // },

    // getOrder: async (orderId: string): Promise<any> => {
    //     const response = await get("order/" + orderId);
    //     return response;
    // },

    // getUserOrders: async (userId: string) => {
    //     const response = await get("order/user/" + userId);
    //     return response;
    // },

    // getOrders: async () => {
    //     const response = await get("order");
    //     return response;
    // },

    // startVerification: async (i: any) => {
    //     const response = await post("sms/verify/start", {
    //         data: { ...i },
    //     });
    //     return response;
    // },

    // endVerification: async (i: any) => {
    //     const response = await post("sms/verify/end", {
    //         data: { ...i },
    //     });
    //     return response;
    // },

    // isTokenValid: async (token: string) => {
    //     const response = await post("/user/token", { data: { token } })
    //     return response;

    // },

    // createProduct: async (p: any) => {
    //     const response = await post("product", {
    //         data: { ...p },
    //     });
    //     return response;
    // },

    // createOrder: async (o: any) => {
    //     const response = await post("order", {
    //         data: { ...o },
    //     });
    //     return response;
    // },

    // updateOrderStatus: async (i: any) => {
    //     const response = await post("order/" + i.id + "/status", {
    //         data: { status: i.status },
    //     });
    //     return response;
    // },
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
