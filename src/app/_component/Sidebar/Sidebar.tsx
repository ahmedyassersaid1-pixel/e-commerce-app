"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Headset,
  Heart,
  Search,
  ShoppingCart,
  X,
} from "lucide-react";
import logo from "@/assetes/logo.png";
import { signOut, useSession } from 'next-auth/react';
import { Button } from "@/components/ui/button";

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

const shopLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Categories", href: "/categories" },
  { label: "Brands", href: "/brands" },
];

export default function Sidebar({ open, onClose }: SidebarProps) {
  const mySession=useSession()
  if (!open) return null;
function handleLogOut() {
  signOut({redirect:true ,callbackUrl:"/login"})
}
  return (
    <div className="fixed inset-0 z-50">
      <button
        className="absolute inset-0 size-full cursor-default bg-black/60"
        type="button"
        aria-label="Close navigation sidebar"
        onClick={onClose}
      />

      <aside
        className="absolute inset-y-0 right-0 flex h-dvh w-full max-w-85 flex-col bg-white text-[#21313c] shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation sidebar"
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-[#edf0ee] px-5">
          <Link
            className="inline-flex items-center gap-2 text-[30px] font-bold tracking-[-1.1px] text-[#21313c] no-underline"
            href="/"
            onClick={onClose}
            aria-label="FreshCart home"
          >
            <Image src={logo} alt="logo" width={38} height={30} className="h-7.5 w-9.5 object-contain" />
            <span>FreshCart</span>
          </Link>
          <button
            className="grid size-11 place-items-center rounded-full bg-[#f2f4f6] text-[#5b6870] transition-colors hover:bg-[#e8ecee]"
            type="button"
            onClick={onClose}
            aria-label="Close navigation sidebar"
          >
            <X size={23} strokeWidth={2.4} />
          </button>
        </div>

        <form
          className="flex p-4 shrink-0 items-center border-b border-[#edf0ee] px-5"
          action="/shop"
          role="search"
        >
          <div className="flex  w-full items-center overflow-hidden rounded-xl border border-[#e1e6e4] bg-[#fbfcfd] px-3">
            <input
              className="py-3 px-4 min-w-0 flex-1 bg-transparent  text-[16px] text-[#21313c] outline-none placeholder:text-[#8995a6]"
              type="search"
              name="q"
              placeholder="Search products..."
              aria-label="Search products"
            />
            <button
              className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#16a34a] text-white transition-colors hover:bg-[#12843e]"
              type="submit"
              aria-label="Search"
            >
              <Search size={20} strokeWidth={2.5} />
            </button>
          </div>
        </form>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 ">
          <nav className="border-b border-[#edf0ee] py-4" aria-label="Main navigation">
            <ul className="m-0 list-none p-0">
              {shopLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    className="flex items-center rounded-lg px-4 py-3 text-[#21313c] no-underline transition-colors hover:bg-[#f0fdf4] hover:text-[#16a34a]"
                    href={item.href}
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="grid gap-1 border-b border-[#edf0ee] py-5">
            <Link
              className="flex py-3 items-center gap-4 rounded-2xl bg-[#f8fbfa] px-4  text-[#21313c] no-underline transition-colors hover:bg-[#f1faf4]"
              href="/whislist"
              onClick={onClose}
            >
              <span className="grid size-9 place-items-center rounded-full bg-[#fff1f2] text-[#ff3548]">
                <Heart size={18} strokeWidth={2} />
              </span>
              Wishlist
            </Link>
            <Link
              className="flex py-3 items-center gap-4 rounded-2xl px-4  text-[#21313c] no-underline transition-colors hover:bg-[#f8fbfa]"
              href="/shop"
              onClick={onClose}
            >
              <span className="grid size-9 place-items-center rounded-full bg-[#effbf3] text-[#16a34a]">
                <ShoppingCart size={18} fill="currentColor" strokeWidth={1.8} />
              </span>
              Cart
            </Link>
          </div>
{mySession.status==="unauthenticated"?      <div className="grid grid-cols-2 gap-2 border-[#edf0ee] pt-7">
            <Link
              className="flex py-3 px-4 items-center justify-center rounded-2xl bg-[#16a34a]  font-semibold text-white no-underline transition-colors hover:bg-[#12843e]"
              href="/login"
              onClick={onClose}
            >
              Sign In
            </Link>
            <Link
              className="flex py-3 items-center justify-center rounded-2xl border-2 border-[#16a34a] bg-white  font-semibold text-[#16a34a] no-underline transition-colors hover:bg-[#f1faf4]"
              href="/register"
              onClick={onClose}
            >
              Sign Up
            </Link>
            <Link
              className="col-span-2 flex p-4 items-center mt-4 gap-4 rounded-2xl border border-[#edf0ee] bg-[#f8fafb]  no-underline"
              href="/contact"
              onClick={onClose}
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#dcfce7] text-[#16a34a]">
                <Headset size={19} strokeWidth={2.5} />
              </span>
              <span className="flex flex-col gap-1">
                <span className="text-[14px] font-medium text-[#21313c]">Need Help?</span>
                <span className="text-[14px] text-[#16a34a]">Contact Support</span>
              </span>
            </Link>
          </div> :<Button onClick={handleLogOut} className="flex mt-2 rounded-xl w-full p-5 capitalize  items-center gap-2 text-[14px] leading-5 font-semibold bg-red-600 hover:bg-red-400 hover:cursor-pointer transition-all duration-200">
                log out
              </Button>}
     
        </div>
      </aside>
    </div>
  );
}
