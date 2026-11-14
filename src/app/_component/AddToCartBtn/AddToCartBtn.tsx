"use client";
import { addToCart } from "@/action/addToCart.action";
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
      toast.add({
        type: "success",
        description: res.message,
      });
            setProductsArr(res.data.products)

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
