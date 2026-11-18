"use client";
import { toast } from "@/components/ui/toast";
import { ProductType } from "@/types/route.type";
import { useContext, useState } from "react";
import { FaHeart } from "react-icons/fa";

import {  Heart } from "lucide-react";
import { addToWhislist } from "@/action/addToWhislist.action";
import { WishlistContext } from "../../../Context/WhislistContext";

export default function AddToWhislistBtn({product ,style,label}:{product: ProductType,style:string,label:string}) {

  const { wishlistCount, setWishlistCount,wishlistArr,setWishlistArr } = useContext(WishlistContext);
  const [isSaving, setIsSaving] = useState(false);
  const isWisList=wishlistArr.some((productId)=>productId===product._id || productId===product.id)

 
async function handleAddToWhislist(){
  if (isSaving) return;
  setIsSaving(true);
  try {
    const res = await addToWhislist(product.id);
    if (res?.status === "success") {
      const responseProducts = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data?.products)
          ? res.data.products
          : [];
      const responseIds = responseProducts
        .map((item: string | { _id?: string; id?: string; product?: { _id?: string; id?: string } }) =>
          typeof item === "string" ? item : String(item.product?._id ?? item.product?.id ?? item._id ?? item.id ?? ""),
        )
        .filter(Boolean);
      const productId = String(product._id ?? product.id);

      setWishlistArr((currentIds) => Array.from(new Set([...currentIds, ...responseIds, productId])));
      setWishlistCount(res.count ?? wishlistCount + (isWisList ? 0 : 1));
      toast.add({ type: "success", description: res.message });
    } else {
      toast.add({ type: "error", description: res?.message ?? "Could not save this item." });
    }
  } catch (error) {
    toast.add({
      type: "error",
      description: error instanceof Error ? error.message : "Could not save this item.",
    });
  } finally {
    setIsSaving(false);
  }
}
  return (
    <>
      {" "}
              <button
                   onClick={(e) => {
          e.preventDefault();
          handleAddToWhislist();
        }}
                className={`${style} disabled:cursor-wait disabled:opacity-60`}
                disabled={isSaving}
                type="button"
                aria-label={`Add ${product.title} to wishlist`}
              >
                {isWisList ? <FaHeart className="text-red-500" size={18} />: <Heart size={18} />}
                {label}
              </button>
    </>
  );
}
