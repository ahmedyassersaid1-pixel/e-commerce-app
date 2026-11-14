import { CategoryType } from "@/types/route.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CategoryCard({category}:{category:CategoryType}) {
    

  return (
    <>
    <div className="w-1/2 md:w-1/3 lg:w-1/6 bg-white  p-3  transition group cursor-pointer">
         <Link
        className=" p-4 block shadow-sm hover:shadow-md text-center rounded-lg transition group"
        href="/categories/"
      >
        <div className="h-20 w-20 overflow-hidden bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary-200 transition">
          <Image
            alt="Music"
            width={300}
            height={300}
            className="w-full h-full object-cover"
            src={category.image}
      
          />
        </div>
        <h3 className="font-medium text-[#505663]">{category.name}</h3>
      </Link>
    </div>
     
    </>
  );
}
