"use client";
import { addToCart, getProductsCart } from "@/action/addToCart.action";
import { toast } from "@/components/ui/toast";
import { useContext, useState } from "react";
import { CartContext } from "@/Context/CartContext";

export default function AddToCartBtn({
  label,
  css,
  id,
}: {
  label: string;
  css: string;
  id: string;
}) {


  const { setProductsArr } = useContext(CartContext);
  const [isAdding, setIsAdding] = useState(false);
  async function handleAddToCart() {
    if (isAdding) return;
    setIsAdding(true);
    try {
      const res = await addToCart(id);
      if (res?.status === "success") {
        const updatedCart = await getProductsCart();
        if (Array.isArray(updatedCart?.data?.products)) {
          setProductsArr(updatedCart.data.products);
        } else if (Array.isArray(res.data?.products)) {
          setProductsArr(res.data.products);
        }
        toast.add({ type: "success", description: res.message });
      } else {
        toast.add({
          type: "error",
          description: res?.message ?? "Could not add this product to your cart.",
        });
      }
    } catch (error) {
      toast.add({
        type: "error",
        description: error instanceof Error ? error.message : "Could not add this product to your cart.",
      });
    } finally {
      setIsAdding(false);
    }
  }
  return (
    <>
      {" "}
      <button
        onClick={handleAddToCart}
        className={`${css} disabled:cursor-wait disabled:opacity-60`}
        disabled={isAdding}
        type="button"
        aria-label="Add Woman Shawl to cart"
      >
        {isAdding ? "…" : label}
      </button>
    </>
  );
}
