import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { Product } from "@/api/types";

type CartItem = {
  product: Product;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotalCents: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function cartKey(storeSlug: string) {
  return `s2w-cart-${storeSlug}`;
}

function CartProvider({
  children,
  storeSlug,
}: {
  children: ReactNode;
  storeSlug: string;
}) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(cartKey(storeSlug));
      if (raw) setItems(JSON.parse(raw) as CartItem[]);
      else setItems([]);
    } catch {
      setItems([]);
    }
  }, [storeSlug]);

  useEffect(() => {
    localStorage.setItem(cartKey(storeSlug), JSON.stringify(items));
  }, [items, storeSlug]);

  const addItem = useCallback((product: Product, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((item) => item.product.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...current, { product, quantity }];
    });
  }, []);

  const removeItem = useCallback((productId: number) => {
    setItems((current) => current.filter((item) => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity <= 0) {
      setItems((current) => current.filter((item) => item.product.id !== productId));
      return;
    }
    setItems((current) =>
      current.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item,
      ),
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const subtotalCents = useMemo(
    () => items.reduce((sum, item) => sum + item.product.priceCents * item.quantity, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      itemCount,
      subtotalCents,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [items, itemCount, subtotalCents, addItem, removeItem, updateQuantity, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}

export { CartProvider, useCart };
export type { CartItem };
