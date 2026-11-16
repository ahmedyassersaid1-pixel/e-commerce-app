import Image from "next/image";
import { Eye, Heart, Plus, RotateCw, Star, StarHalf } from "lucide-react";
import { ProductType } from "@/types/route.type";
import Link from "next/link";
import AddToCartBtn from "../AddToCartBtn/AddToCartBtn";
import AddToWhislistBtn from "../AddToWhislistBtn/AddToWhislistBtn";
import { FaStarHalfStroke } from "react-icons/fa6";

export default function ProductCard({ product }: { product: ProductType }) {
  const rating = product.ratingsAverage ?? 0;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  // console.log("product",product)
  return (
    <div className="w-full lg:w-1/4 xl:w-1/5 p-3">
      <Link href={`/product-details/${product.id}`}>
        <article className="w-full overflow-hidden rounded-lg border border-[#e5e7eb] bg-white text-[#21313c] hover:-translate-y-2 hover:shadow-lg transition-all duration-200">
          <div className="relative h-60 w-full bg-white">
            {product.priceAfterDiscount && (
              <div className="absolute top-3 left-3 z-10">
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                  {" "}
                  -
                  {Math.floor(
                    ((product.price - product.priceAfterDiscount) /
                      product.price) *
                      100,
                  )}
                  %{" "}
                </span>
              </div>
            )}
            <Image
              src={product.imageCover}
              alt={product.title}
              fill
              sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, 100vw"
              className="object-cover  p-3"
            />
            <div className="absolute top-2 right-2 flex flex-col gap-2">
              <AddToWhislistBtn
                product={product}
                style={
                  "grid size-8 place-items-center rounded-full bg-white text-[#6b7280] shadow-[0_1px_6px_rgba(0,0,0,0.12)] transition-colors hover:text-red-500"
                }
                label={""}
              />
              <button
                className="grid size-8 place-items-center rounded-full bg-white text-[#6b7280] shadow-[0_1px_6px_rgba(0,0,0,0.12)] transition-colors hover:text-[#16a34a]"
                type="button"
                aria-label="Compare Woman Shawl"
              >
                <RotateCw size={19} />
              </button>
              <button
                className="grid size-8 place-items-center rounded-full bg-white text-[#6b7280] shadow-[0_1px_6px_rgba(0,0,0,0.12)] transition-colors hover:text-[#16a34a]"
                type="button"
                aria-label="Quick view Woman Shawl"
              >
                <Eye size={19} />
              </button>
            </div>
          </div>

          <div className="flex min-h-38.25 flex-col px-4 pt-1 pb-4">
            <p className="mb-1 text-[14px] leading-5 text-[#6b7280] line-clamp-2">
              {product.slug}
            </p>
            <h2 className="mb-1 truncate text-[20px] font-normal leading-6 text-[#364153]">
              {product.title}
            </h2>
            <div
              className="flex items-center gap-2"
              aria-label="Rated 4.8 out of 5 from 18 reviews"
            >
              <div
                className="flex items-center gap-0.5 text-[#eab308]"
                aria-hidden="true"
              >
                {[0, 1, 2, 3, 4].map((star) => {
                  const isFull = star < fullStars;
                  const isHalf = star === fullStars && hasHalfStar;

                  return (
                    <span key={star}>
                      {isFull ? (
                        <Star className="size-4" fill="currentColor" />
                      ) : isHalf ? (
                        <FaStarHalfStroke
                          className="size-4"
                          fill="currentColor"
                        />
                      ) : (
                        <Star className="size-4" />
                      )}
                    </span>
                  );
                })}
              </div>
              <span className="text-[14px] text-[#6b7280]">
                {product.ratingsAverage} ({product.ratingsQuantity})
              </span>
            </div>

            <div className="mt-auto flex items-end justify-between pt-2">
              <div className="mt-auto flex items-center gap-2 ">
                {product.priceAfterDiscount && (
                  <p className="m-0 text-[20px] font-bold leading-7 text-[#16a34a]">
                    {product.priceAfterDiscount} EGP{" "}
                  </p>
                )}
                <p
                  className={`m-0   leading-7  ${product.priceAfterDiscount ? "text-[16px] line-through text-[#6a7282]" : "text-[20px] text-[#21313c] font-bold"}`}
                >
                  {product.price} EGP
                </p>
              </div>
              <AddToCartBtn
                id={product.id}
                label={"+"}
                css={
                  "grid text-2xl font-semibold size-10 place-items-center rounded-full bg-[#16a34a] text-white transition-colors hover:bg-[#12843e]"
                }
              />
            </div>
          </div>
        </article>
      </Link>
    </div>
  );
}
