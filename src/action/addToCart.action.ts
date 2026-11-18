"use server";

import { getMyToken } from "@/utils";

export async function addToCart(id: string) {
  const token = await getMyToken();
  // console.log("tokeeeen",token)
  if (!token) return { status: "fail", message: "Please sign in to add items to your cart." };

  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        token,
      },
      body: JSON.stringify({ productId: id }),
    });
    return await res.json();
  } catch (error) {
    console.error("Could not add product to cart:", error);
    return { status: "fail", message: "Could not reach the store. Please try again." };
  }
}
export async function getProductsCart() {
  const token = await getMyToken();
  if (!token) return null;
  try{
   const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: { token: String(token ?? "") },
      cache: "no-store",
    });

    if (!response.ok) return null;
    return await response.json();
  } catch (err){
    console.error("Could not fetch cart:", err);
    return null;
  }
}
export async function deleteOneItem(itemId:string){
   const token = await getMyToken();
  if (!token) return { status: "fail", message: "Please sign in first." };
 try{
const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${itemId}`,{
      method: "DELETE",
  headers:{
    token:token as string,
    "content-type":"application/json"

  }

})
 if (!res.ok) return null;
const data = await res.json();
return data
 }catch(err){
console.error("Could not remove cart item:", err);
return { status: "fail", message: "Could not remove this item. Please try again." };
 }
}
export async function updateCartItem(itemId:string,newCount:number){
//  console.log("finishhhhhhhhhgggggggggggggggg")
   const token = await getMyToken();
  if (!token) return { status: "fail", message: "Please sign in first." };
 try{
const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${itemId}`,{
      method: "PUT",
  headers:{
    token:token as string,
    "content-type":"application/json"

  },
    body: JSON.stringify({
      count: newCount,
    }),
})
 if (!res.ok) return null;
const data = await res.json();
return data
 }catch(err){
console.error("Could not update cart item:", err);
return { status: "fail", message: "Could not update this item. Please try again." };
 }
}
export async function clearCartData(){
//  console.log("finishhhhhhhhhgggggggggggggggg")
   const token = await getMyToken();
  if (!token) return { status: "fail", message: "Please sign in first." };
 try{
const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`,{
      method: "DELETE",
  headers:{
    token:token as string,
    "content-type":"application/json"

  }
})
 if (!res.ok) return null;
const data = await res.json();
return data
 }catch(err){
console.error("Could not clear cart:", err);
return { status: "fail", message: "Could not clear your cart. Please try again." };
 }
}

