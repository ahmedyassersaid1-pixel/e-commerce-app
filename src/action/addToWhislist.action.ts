"use server"
import { getMyToken } from "@/utils";

export async function getWhislistData(){
    const token =await getMyToken()
    if(!token){
        throw new Error("please login first")
    }
    try{
const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
    headers:{
token: token as string    }
});
const data = await res.json()
return data
    }catch(err){
        console.log("error",err)
        return err
    }
}