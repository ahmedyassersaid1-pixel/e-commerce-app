"use client"
import { getWhislistData } from '@/action/addToWhislist.action'
import React, { useEffect,useState } from 'react'

export default function page() {
    const [cartData, setcartData] = useState(null);
  
async function handleGetWhislist(){

  const res = await getWhislistData()
  console.log("done",res)
  if(res.status==="success"){
    setcartData(res.data)
  }
}
useEffect(()=>{
  handleGetWhislist()
},[])
  return (
    <div>whislist</div>
  )
}
