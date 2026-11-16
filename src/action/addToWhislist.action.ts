"use server"
import { getMyToken } from "@/utils";

export async function getWhislistData(){
    const token =await getMyToken()
    if(!token) return null;
    try{
const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
    headers:{
token: token as string    }
});
const data = await res.json()
return data
    }catch(err){
        console.error("Could not fetch wishlist:", err)
        return null
    }
}
export async function addToWhislist(id:string){
    const token =await getMyToken()
    if(!token){
        throw new Error("please login first")
    }
    try{
const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
    method:"POST",
    headers:{
token: token as string  ,
      "content-type": "application/json",  },
    body: JSON.stringify({
      productId: id,
    }),
});
const data = await res.json()
return data
    }catch(err){
        console.log("error",err)
        return err
    }
}
export async function deleteWhislistItem(deletedId:string){
    const token =await getMyToken()
    if(!token){
        throw new Error("please login first")
    }
    try{
const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${deletedId}`,{
    method:"DELETE",
    headers:{
token: token as string  ,
      "content-type": "application/json",  },

});
const data = await res.json()
return data
    }catch(err){
        console.log("error",err)
        return err
    }
}
