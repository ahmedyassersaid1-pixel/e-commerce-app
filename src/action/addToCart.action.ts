"use server";

import { getMyToken } from "@/utils";

export async function addToCart(id: string) {
  const token = await getMyToken();
  if(!token){
    throw new Error("please login first")
  }
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      token: token as string,
    },
    body: JSON.stringify({
      productId: id,
    }),
  });
  const data = await res.json();
  return data
}
export async function getProductsCart() {
  const token = await getMyToken();
  if(!token){
    throw new Error("please login first")
  }
  try{
   const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: { token: String(token ?? "") },
      cache: "no-store",
    });

    if (!response.ok) return null;
    return await response.json();
  } catch (err){
    return err;
  }
}
export async function deleteOneItem(itemId:string){
 console.log("finishhhhhhhhhgggggggggggggggg")
   const token = await getMyToken();
  if(!token){
    throw new Error("please login first")
  }
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
return err
 }
}
export async function updateCartItem(itemId:string,newCount:number){
//  console.log("finishhhhhhhhhgggggggggggggggg")
   const token = await getMyToken();
  if(!token){
    throw new Error("please login first")
  }
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
return err
 }
}
export async function clearCartData(){
//  console.log("finishhhhhhhhhgggggggggggggggg")
   const token = await getMyToken();
  if(!token){
    throw new Error("please login first")
  }
 try{
const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`,{
      method: "DELETE",
  headers:{
    token:token as string,
    "content-type":"application/json"

  }
})
console.log("resssssssss",res)
 if (!res.ok) return null;
const data = await res.json();
return data
 }catch(err){
return err
 }
}

