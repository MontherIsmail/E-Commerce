import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import createClient from "../api";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";
import type { CartItem } from "../types";

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  refreshCart: () => Promise<void>;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const refreshCart = async () => {
    if (!user?.id) {
      setCartItems([]);
      return;
    }

    try {
      setLoading(true);
      const { getCart } = createClient("");
      const data = await getCart(user.id);
      setCartItems(data.cartItems || []);
    } catch (error) {
      toast.error("Failed to load cart items");
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshCart();
  }, [user?.id]);

  const cartCount = cartItems.length;

  return (
    <CartContext.Provider value={{ cartItems, cartCount, refreshCart, loading }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

