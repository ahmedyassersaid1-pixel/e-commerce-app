"use client"
import { getProductsCart } from "@/action/addToCart.action";
import { createContext, useEffect, useState } from "react";
import { CartItem } from "@/types/route.type";

interface CartContextType {
  totalItemsCount: number;
  productsArr: CartItem[];
  setProductsArr: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

export const CartContext = createContext<CartContextType>({
  totalItemsCount: 0,
  productsArr: [],
  setProductsArr: () => {},
});

export default function CartContextProvider({ children }: { children: React.ReactNode }) {
    const [productsArr, setProductsArr] = useState<CartItem[]>([]); 

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await getProductsCart();
                if (res?.status === "success") {
                    setProductsArr(res.data.products);
                }
            } catch (error) {
                // Guests do not have a cart yet; keep the empty cart state.
                console.error("Error fetching cart products:", error);
            }
        };

        fetchProducts();
    }, []);

    const totalItemsCount = productsArr.reduce((sum: number, product: CartItem) => {
        return sum + product.count;
    }, 0);

    return (
        <CartContext.Provider value={{ totalItemsCount, productsArr, setProductsArr }}>
            {children}
        </CartContext.Provider>
    );
}
