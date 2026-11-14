import { NextRequest, NextResponse } from "next/server"
// route handler 
export async function GET(request:NextRequest){
const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands`)
const data = await res.json()
return NextResponse.json({
    myData:data
})
}