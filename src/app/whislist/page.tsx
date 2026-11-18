"use client";
import { toast } from "@/components/ui/toast";
import {
  getWhislistData,
  deleteWhislistItem,
} from "@/action/addToWhislist.action";
import  { useEffect, useState, useContext} from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProductType ,CartItem} from "@/types/route.type";
import { IoCart } from "react-icons/io5";
import {
  FaTrash,
  FaCheck,
  FaRegHeart,
  FaArrowRightLong,
} from "react-icons/fa6";
import { ImSpinner3 } from "react-icons/im";
import { FaHeart } from "react-icons/fa";
import { WishlistContext } from "@/Context/WhislistContext";
import { CartContext } from "@/Context/CartContext";

import Herosection from "../_component/HeroSection/Herosection";
import AddToCartBtn from "../_component/AddToCartBtn/AddToCartBtn";

function isProductInCart(product: ProductType, cartItems: CartItem[]) {
  const wishlistProductId = String(product._id ?? product.id);

  return cartItems.some((cartItem) => {
    const cartProductId = String(
      cartItem.product._id ?? cartItem.product.id,
    );

    return cartProductId === wishlistProductId;
  });
}

export default function Page() {
  const [cartData, setCartData] = useState<null | ProductType[]>(null);
  const { setWishlistCount } = useContext(WishlistContext);

  const {productsArr} = useContext(CartContext);
  async function handleGetWhislist() {
    const res = await getWhislistData();
    if (res.status === "success") {
      console.log("dataaaaaa",res)
      setCartData(res.data);
    }
  }

  useEffect(() => {
    let active = true;
    void getWhislistData()
      .then((res) => {
        if (active) setCartData(res?.status === "success" ? res.data : []);
      })
      .catch((error) => {
        console.error("Could not load wishlist:", error);
        if (active) setCartData([]);
      });
    return () => {
      active = false;
    };
  }, []);

  async function handleDeletItem(id: string) {
    const res = await deleteWhislistItem(id);
    if (res.status === "success") {
      handleGetWhislist();
      // console.log("deleeete",res)
      setWishlistCount(res.data.length)
      toast.add({
        type: "success",
        description: res.message,
      });
    } else {
      toast.add({
        type: "error",
        description: res.message,
      });
    }
  }

  if (cartData === null) {
    return (
      <main className="min-h-[65vh] bg-[#f8faf9] px-4 py-8 flex items-center justify-center">
        <p className="text-gray-500">
          <ImSpinner3 className="animate-spin" />
        </p>
      </main>
    );
  }

  return (
    <>
      <main className="min-h-[65vh] bg-[#f8faf9] px-4 py-8 text-[#21313c] sm:px-6 sm:py-12">
        <div className="mx-auto ">
          {/* 2. لو السلة فاضية تماماً */}
          {cartData.length === 0 ? (
            <div className="min-h-[50vh] flex items-center justify-center">
              <div className="max-w-sm mx-auto text-center">
                <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-6">
                  <FaRegHeart className="text-3xl text-gray-400" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Your wishlist is empty
                </h2>
                <p className="text-gray-500 text-sm mb-6">
                  Browse products and save your favorites here. Sign in to sync
                  your wishlist across devices.
                </p>
                <div className="flex flex-col gap-3">
                  <Link
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl hover:bg-[#0e8138] bg-[#16a34a] text-white font-semibold transition-colors"
                    href="/shop"
                  >
                    Browse Products
                    <FaArrowRightLong />
                  </Link>
                  <Link
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-gray-200 text-gray-700 font-semibold hover:bg-gray-100 transition-colors"
                    href="/login"
                  >
                    Sign In
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            /* 3. لو السلة فيها منتجات */
            <>
              <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
                <Link href="/" className="hover:text-[#16a34a]">
                  Home
                </Link>
                <span>/</span>
                <span className="text-[#21313c]">Wishlist</span>
              </nav>

              <div className="mb-6 flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-xl bg-red-100 text-red-500">
                  <FaHeart size={21} />
                </span>
                <div>
                  <h1 className="text-2xl font-bold sm:text-3xl">
                    My Wishlist
                  </h1>
                  <p className="mt-1 text-sm text-gray-500">
                    {cartData.length} item saved
                  </p>
                </div>
              </div>

              <section className="flex flex-col gap-3">
                <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-100 text-sm font-medium text-gray-500 rounded-t-xl">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Status</div>
                  <div className="col-span-2 text-center">Actions</div>
                </div>

                <div className="divide-y divide-gray-100 bg-white rounded-xl shadow-xs border border-gray-100">
                  {cartData.map((product) => (
                    <div
                      key={product.id}
                      className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:px-6 md:py-5 items-center hover:bg-gray-50/50 transition-colors"
                    >
                      <div className="md:col-span-6 flex items-center gap-4">
                        <Link
                          className="w-20 h-20 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0"
                          href={`/product-details/${product.id}`}
                        >
                          <Image
                            alt={product.category?.name || "Product"}
                            width={300}
                            height={300}
                            className="w-full h-full object-contain p-2"
                            src={product.imageCover}
                          />
                        </Link>
                        <div className="min-w-0">
                          <Link
                            className="font-medium text-gray-900 hover:text-primary-600 transition-colors line-clamp-2"
                            href={`/product-details/${product.id}`}
                          >
                            {product.title || product.slug}
                          </Link>
                          <p className="text-sm text-gray-400 mt-1">
                            {product.category?.name}
                          </p>
                        </div>
                      </div>

                      <div className="md:col-span-2 flex md:justify-center items-center gap-2">
                        <span className="md:hidden text-sm text-gray-500">
                          Price:
                        </span>
                        <div className="text-right md:text-center">
                          {!product.priceAfterDiscount?     <div className="font-semibold text-gray-900">
                            {product.price} EGP
                          </div>:<><div className="font-semibold text-gray-900">
                            {product.priceAfterDiscount} EGP
                          </div><div className="f text-sm text-gray-400 line-through">
                            {product.price} EGP
                          </div></>}
                      
                        </div>
                      </div>

                      <div className="md:col-span-2 flex md:justify-center">
                        <span className="md:hidden text-sm text-gray-500 mr-2">
                          Status:
                        </span>
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${isProductInCart(product, productsArr) ? "bg-[#f0fdf4] text-primary-700" : "bg-gray-100 text-gray-600"}`}>
                         {isProductInCart(product, productsArr)? <IoCart className=" text-green-500" />:<div className="size-1.5 bg-green-500 rounded-full animate-pulse"></div>}
                          <span className="text-green-700">{isProductInCart(product, productsArr) ? "In Cart" : "In Stock"}</span>
                        </span>
                      </div>

                      <div className="md:col-span-2 flex items-center gap-2 md:justify-center">
                        {/* /////// */}
                        {
                          isProductInCart(product, productsArr) ? (<Link
                          className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
                          href="/cart"
                        >
                          <FaCheck />
                          <span className="md:hidden lg:inline">View Cart</span>
                        </Link>):  (<AddToCartBtn
                id={product.id}
                label={`add to cart`}
                css={
                  "flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all bg-[#16a34a] text-white transition-colors hover:bg-[#12843e]"
}/>)
                        }
                      
                        <button
                          onClick={() => handleDeletItem(product.id)}
                          className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all cursor-pointer"
                          title="Remove"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <Link
                href="/"
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#16a34a] hover:text-[#12843d]"
              >
                <ArrowLeft size={16} /> Continue Shopping
              </Link>
            </>
          )}
        </div>
      </main>
      <Herosection />
    </>
  );
}
