"use client";
import { addToCart, getProductsCart } from "@/action/addToCart.action";
import { toast } from "@/components/ui/toast";
import { useContext } from "react";
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


  const {setProductsArr}=useContext(CartContext)
  async function handleAddToCart() {

    const res = await addToCart(id);
    // console.log("click", res);
    if (res.status === "success") {
      // Get the latest cart from the API so the shared context has the same data as a page refresh.
      const updatedCart = await getProductsCart();

      if (Array.isArray(updatedCart?.data?.products)) {
        setProductsArr(updatedCart.data.products);
      } else if (Array.isArray(res.data?.products)) {
        setProductsArr(res.data.products);
      }

      toast.add({
        type: "success",
        description: res.message,
      });

    } else {
      toast.add({
        type: "error",
        description: res.message,
      });
    }
  }
  return (
    <>
      {" "}
      <button
        onClick={(e) => {
          e.preventDefault();
          handleAddToCart();
        }}
        className={css}
        type="button"
        aria-label="Add Woman Shawl to cart"
      >
        {label}
      </button>
    </>
  );
}
