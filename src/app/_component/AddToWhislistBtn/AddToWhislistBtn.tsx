"use client";
import { toast } from "@/components/ui/toast";
import { ProductType } from "@/types/route.type";
import { useContext, useState,useEffect} from "react";
import { FaHeart } from "react-icons/fa";

import {  Heart } from "lucide-react";
import { addToWhislist } from "@/action/addToWhislist.action";
import { WishlistContext } from "../../../Context/WhislistContext";
import { getWhislistData } from "@/action/addToWhislist.action";

export default function AddToWhislistBtn({product ,style,label}:{product: ProductType,style:string,label:string}) {

  const { wishlistCount,setWishlistCount,wishlistArr,setWishlistArr } = useContext(WishlistContext);
  const isWisList=wishlistArr.some((productId)=>productId===product._id)

 
async function handleAddToWhislist(){

const res = await addToWhislist(product.id)
if(res.status==="success"){
// console.log("adddddd",res)
  // console.log("wishlistArr",wishlistArr)

setWishlistCount(res.data.length)
setWishlistArr(res.data)
      toast.add({
        type: "success",
        description: res.message,
      });

    // console.log(res)
}else{
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
          handleAddToWhislist();
        }}
                className={style}
                type="button"
                aria-label="Add Woman Shawl to wishlist"
              >
                {isWisList ? <FaHeart className="text-red-500" size={18} />: <Heart size={18} />}
                {label}
              </button>
    </>
  );
}
