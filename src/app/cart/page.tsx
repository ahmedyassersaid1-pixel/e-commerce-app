"use client";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { ImSpinner3 } from "react-icons/im";
import { IoIosArrowRoundBack } from "react-icons/io";
import Herosection from "@/app/_component/HeroSection/Herosection";

import { useContext, useEffect, useState } from "react";
import {
  getProductsCart,
  deleteOneItem,
  updateCartItem,
  clearCartData,
} from "@/action/addToCart.action";
import { CartItem, CartResponse } from "@/types/route.type";
import { toast } from "@/components/ui/toast";
import { CartContext } from "@/Context/CartContext";

export default function CartPage() {
  const [cartData, setcartData] = useState<null | CartResponse>(null);
  const [isDisable, setisDisable] = useState(false);
  const [isUpdated, setisUpdated] = useState(false);
  const [currentId, setcurrentId] = useState("");
  const [totalItems, settotalItems] = useState(0);
  const { setProductsArr } = useContext(CartContext);
  useEffect(() => {
    let active = true;
    void getProductsCart()
      .then((res) => {
        if (!active) return;
        if (res?.status === "success" && Array.isArray(res.data?.products)) {
          setcartData(res.data);
          settotalItems(
            res.data.products.reduce(
              (sum: number, product: CartItem) => sum + product.count,
              0,
            ),
          );
        } else {
          setcartData(null);
          settotalItems(0);
        }
      })
      .catch((error) => {
        console.error("Could not load cart:", error);
        if (active) {
          setcartData(null);
          settotalItems(0);
        }
      });
    return () => {
      active = false;
    };
  }, []);
  async function handleDeletItem(id: string) {
    setisDisable(true);
    try {
      const res = await deleteOneItem(id);
      if (res?.status === "success") {
        toast.add({ type: "success", description: "Product removed from your cart." });
        setcartData(res.data);
        setProductsArr(res.data.products);
      } else {
        toast.add({ type: "error", description: res?.message ?? "Could not remove this item." });
      }
    } catch (error) {
      toast.add({
        type: "error",
        description: error instanceof Error ? error.message : "Could not remove this item.",
      });
    } finally {
      setisDisable(false);
    }
  }
  async function handleUpdateItem(id: string, count: number) {
    setcurrentId(id);
    setisUpdated(true);
    try {
      const res = await updateCartItem(id, count);
      if (res.status === "success") {
        toast.add({
          type: "success",
          description: "product updated successfully",
        });
        setcartData(res.data);
        setcurrentId("");
        setisUpdated(false);
        setProductsArr(res.data.products);
      } else {
        toast.add({ type: "error", description: res.message });
        setcurrentId("");
        setisUpdated(false);
      }
    } catch (err) {
      toast.add({
        type: "error",
        description:
          err instanceof Error ? err.message : "An unexpected error occurred",
      });
    }
  }
  async function handleClearCart() {
    try {
      const res = await clearCartData();
      // console.log("resssss", res);
      if (res?.message === "success") {
        toast.add({
          type: "success",
          description: "Cart Deleted Successfully",
        });
        setcartData(null);
        setProductsArr([]);
      } else {
        toast.add({ type: "error", description: res?.message ?? "Could not clear your cart." });
      }
    } catch (err) {
      toast.add({
        type: "error",
        description:
          err instanceof Error ? err.message : "An unexpected error occurred",
      });
    }
  }
  const cartProducts = (
    cartData as (CartResponse & { products: CartItem[] }) | null
  )?.products;
  const subtotal =
    cartProducts?.reduce(
      (sum, product) => sum + product.count * product.price,
      0,
    ) ?? 0;

  return (
    <main className="min-h-[65vh] bg-[#f8faf9] px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto ">
        <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-green-600">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#21313c]">Shopping Cart</span>
        </nav>

        <div className="mb-6 flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-xl bg-green-100 text-green-700">
            <ShoppingCart size={22} />
          </span>
          <div>
            <h1 className="text-2xl font-bold text-[#21313c] sm:text-3xl">
              Shopping Cart
            </h1>
            <p className="mt-1 text-sm text-gray-500">Your selected products</p>
          </div>
        </div>
        {Array.isArray(cartProducts) && cartProducts.length > 0 ? (
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_450px] lg:gap-8">
            <div className="flex flex-col gap-4">
              {cartProducts.map((product: CartItem) => (
                <article
                  key={product.product.id}
                  className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                    <div className="relative my-2 size-24 shrink-0 self-start overflow-hidden rounded-xl bg-gray-50 sm:size-28">
                      <Image
                        src={product.product.imageCover}
                        alt={product.product.title}
                        fill
                        sizes="112px"
                        className="object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="mb-1 text-xs font-medium text-gray-400">
                        {product.product.category.name}
                      </p>
                      <h2 className="text-base font-semibold text-[#21313c] sm:text-lg">
                        {product.product.title}
                      </h2>
                      <p className="mt-2 text-sm font-bold text-green-600">
                        {product.price} EGP
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-4 sm:justify-end">
                      <div className="flex h-10 items-center rounded-lg border border-gray-200">
                        <button
                          onClick={() => {
                            handleUpdateItem(
                              product.product._id,
                              product.count - 1,
                            );
                          }}
                          disabled={isUpdated}
                          type="button"
                          aria-label="Decrease quantity"
                          className="grid size-9 disabled:cursor-not-allowed place-items-center text-gray-500 hover:text-green-600"
                        >
                          <Minus size={15} />
                        </button>
                        {product.product._id === currentId ? (
                          <ImSpinner3 className="animate-spin min-w-8" />
                        ) : (
                          <span className="min-w-8 text-center text-sm font-semibold text-[#21313c]">
                            {product.count}
                          </span>
                        )}

                        <button
                          onClick={() => {
                            handleUpdateItem(
                              product.product._id,
                              product.count + 1,
                            );
                          }}
                          disabled={isUpdated}
                          type="button"
                          aria-label="Increase quantity"
                          className="grid size-9 disabled:cursor-not-allowed place-items-center text-gray-500 hover:text-green-600"
                        >
                          <Plus size={15} />
                        </button>
                      </div>

                      <p className="text-sm font-bold text-[#21313c] sm:w-24 sm:text-right">
                        {((product.count * product.price) / 1000).toFixed(3)}{" "}
                        EGP
                      </p>
                      <button
                        disabled={isDisable}
                        onClick={() => {
                          handleDeletItem(product.product.id);
                        }}
                        type="button"
                        aria-label="Remove product from cart"
                        className="grid size-9 disabled:cursor-not-allowed disabled:bg-gray-400  disabled:text-black  place-items-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
              <div className="flex justify-between p-3 border-t">
                <Link
                  href={"/"}
                  className="flex gap-2 items-center text-[#16a34a]"
                >
                  {" "}
                  <IoIosArrowRoundBack size={25} />
                  Continue Shopping
                </Link>
                <button
                  onClick={() => {
                    handleClearCart();
                  }}
                  type="button"
                  aria-label="Remove product from cart"
                  className="flex gap-1 items-center disabled:cursor-not-allowed disabled:bg-gray-400  disabled:text-black   rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500"
                >
                  <Trash2 size={17} /> clear all items
                </button>
              </div>
            </div>

            <aside className="h-fit overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm lg:sticky lg:top-24">
              <div className="bg-[#16a34a] px-5 py-4 text-white">
                <h2 className="flex items-center gap-2 font-semibold">
                  <ShoppingCart size={18} /> Order Summary
                </h2>
                <p className="mt-1 text-xs text-green-50">
                  {totalItems} item in your cart
                </p>
              </div>

              <div className="space-y-5 p-5 sm:p-6">
                <div className="flex items-center gap-3 rounded-xl bg-green-50 px-4 py-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-white text-green-600">
                    <ShoppingCart size={17} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-green-700">
                      Free Shipping!
                    </p>
                    <p className="mt-0.5 text-xs text-gray-500">
                      You qualify for free delivery
                    </p>
                  </div>
                </div>

                <div className="space-y-3 border-b border-gray-100 pb-5 text-sm">
                  <div className="flex justify-between gap-4 text-gray-500">
                    <span>Subtotal</span>
                    <span className="font-medium text-[#21313c]">
                      {(subtotal / 1000).toFixed(3)} EGP
                    </span>
                  </div>
                  <div className="flex justify-between gap-4 text-gray-500">
                    <span>Shipping</span>
                    <span className="font-semibold text-green-600">FREE</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="font-semibold text-[#21313c]">Total</span>
                  <span className="text-xl font-bold text-[#21313c]">
                    {(subtotal / 1000).toFixed(3)} EGP
                  </span>
                </div>

                <button
                  type="button"
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 transition hover:border-green-500 hover:text-green-700"
                >
                  Apply Promo Code
                </button>
                <button
                  type="button"
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#16a34a] text-sm font-semibold text-white transition hover:bg-green-700"
                >
                  Secure Checkout <span aria-hidden="true">→</span>
                </button>
                <div className="flex items-center justify-center gap-2 text-center text-[11px] text-gray-500">
                  <span className="text-green-600">✓ Secure Payment</span>
                  <span>•</span>
                  <span>Fast Delivery</span>
                </div>
                <Link
                  href="/"
                  className="block text-center text-xs font-medium text-green-700 hover:text-green-800"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </aside>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
            <div className="mb-6 flex size-28 items-center justify-center rounded-full bg-gray-100 text-gray-400">
              <ShoppingCart size={48} strokeWidth={1.5} />
            </div>

            <h2 className="text-2xl font-bold text-[#21313c] sm:text-3xl">
              Your cart is empty
            </h2>

            <p className="mt-2 text-sm text-gray-500 sm:text-base">
              Looks like you haven&apos;t added anything to your cart yet.
              <br />
              Start exploring our products!
            </p>

            <Link
              href="/"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#16a34a] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-green-600/20 transition-all hover:bg-green-700 hover:shadow-green-700/30"
            >
              Start Shopping <span aria-hidden="true">→</span>
            </Link>
          </div>
        )}
      </div>
      <Herosection />
    </main>
  );
}
