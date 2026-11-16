"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProductType } from "@/types/route.type";
import AddToWhislistBtn from "../AddToWhislistBtn/AddToWhislistBtn";

export default function ProductGallery({
  images,
  product,
}: {
  images: string[];
  product: ProductType;
}) {
  const [selectedImage, setSelectedImage] = useState(images[0] ?? "");
  const title = product.title;

  return (
    <>
      <div className="relative aspect-square overflow-hidden rounded-xl border border-[#edf0ee] bg-white p-3 sm:p-5">
        {product.priceAfterDiscount && (
          <span className="absolute left-4 top-4 z-10 rounded-md bg-[#ef4444] px-2.5 py-1 text-xs font-semibold text-white">
            -
            {Math.round(
              ((product.price - product.priceAfterDiscount) / product.price) * 100,
            )}
            %
          </span>
        )}
        {selectedImage && (
          <Image
            src={selectedImage}
            alt={title}
            fill
            priority
            sizes="(min-width: 1024px) 46vw, 100vw"
            className="object-contain p-4 sm:p-7"
          />
        )}
        <AddToWhislistBtn
          product={product}
          style="absolute right-3 top-3 z-10 grid size-10 place-items-center rounded-full border border-[#edf0ee] bg-white text-[#6a7282] shadow-sm transition-colors hover:text-rose-500"
          label=""
        />
      </div>

      <div className="mt-3 grid grid-cols-4 gap-2.5 sm:mt-4 sm:gap-3">
        {images.map((image, index) => (
          <button
            type="button"
            key={`${image}-${index}`}
            onClick={() => setSelectedImage(image)}
            aria-label={`Show image ${index + 1} of ${title}`}
            aria-pressed={selectedImage === image}
            className={`relative aspect-square overflow-hidden rounded-lg border bg-white p-1.5 transition sm:p-2 ${
              selectedImage === image
                ? "border-[#16a34a] ring-1 ring-[#16a34a]"
                : "border-[#e8ece9] hover:border-[#16a34a]"
            }`}
          >
            <Image
              src={image}
              alt={`${title} image ${index + 1}`}
              fill
              sizes="(min-width: 1024px) 10vw, 22vw"
              className="object-contain p-1"
            />
          </button>
        ))}
      </div>
    </>
  );
}
