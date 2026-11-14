"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/assetes/logo.png";
import { useContext, useState } from "react";
import { Heart, Menu, Search, X } from "lucide-react";
import { FaRegUser } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";
import { FaTruck } from "react-icons/fa";
import { IoGiftSharp } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa6";

import { IoIosArrowDown } from "react-icons/io";
// shadcn

import Sidebar from "../Sidebar/Sidebar";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { CartContext } from "@/Context/CartContext";


const links = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  {
    label: "Categories",
    href: "/categories",
    subLinks: [
      { label: "All Categories", href: "/categories" },
      { label: "Electronics", href: "/categories/electronics" },
      { label: "Women's Fashion", href: "/categories/women-fashion" },
      { label: "Men's Fashion", href: "/categories/men-fashion" },
      { label: "Beauty & Health", href: "/categories/beauty-health" },
    ],
  },
  { label: "Brands", href: "/brands" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const mySession = useSession();
  const {totalItemsCount} = useContext(CartContext);
// console.log("contextttttttt",totalItemsCount)
  // console.log("sessionnnnnnnnn", mySession);
  function handleLogOut() {
    signOut({ redirect: true, callbackUrl: "/login" });
  }
  return (
    <>
      <div className=" border-b border-[#edf0ee] bg-white text-[10px] text-[#6A7282] sm:text-xs">
        <div className="mx-auto hidden lg:flex min-h-8 w-[calc(100%-24px)]  items-center justify-between gap-5 sm:w-[calc(100%-36px)] lg:w-[calc(100%-48px)]">
          <div className="flex items-center gap-6">
            <span className="flex items-center font-semibold leading-5">
              <FaTruck className="mr-2 font-bold text-[#16A34A] size-4" />
              Free Shipping on Orders 500 EGP
            </span>
            <span className="hidden items-center gap-2 sm:flex font-semibold leading-5">
              <IoGiftSharp className="mr-1 font-bold text-[#16A34A] size-4 " />
              New Arrivals Daily
            </span>
          </div>
          <div className="hidden items-center gap-6 md:flex ">
            <a
              className="whitespace-nowrap text-inherit no-underline flex items-center font-semibold leading-5 gap-2"
              href="tel:+18001234567"
            >
              <FaPhone />
              +1 (800) 123-4567
            </a>
            <a
              className="whitespace-nowrap border-e-2 pe-6 text-inherit no-underline flex items-center font-semibold leading-5 gap-2"
              href="mailto:support@freshcart.com"
            >
              <MdOutlineEmail />
              support@freshcart.com
            </a>
            {mySession.status === "authenticated" ? (
              <Button
                onClick={handleLogOut}
                className="capitalize flex items-center gap-2 text-[14px] leading-5 font-semibold bg-transparent hover:bg-transparent text-black hover:cursor-pointer hover:text-red-500"
              >
                log out
              </Button>
            ) : (
              <>
                <Link
                  href={"/login"}
                  className="capitalize flex items-center  gap-2 text-[14px] leading-5 font-semibold"
                >
                  <FaRegUser className="size-3" />
                  sign in
                </Link>
                <Link
                  href={"/register"}
                  className="capitalize flex items-center gap-2 text-[14px] leading-5 font-semibold"
                >
                  <FaUserPlus className="size-3" />
                  sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <header className=" sticky top-0 z-20  bg-white text-[#21313c] shadow-[0_1px_3px_rgba(33,49,60,0.08)]">
        <div className="bg-white mx-auto w-[80%] lg:w-full lg:px-4">
          <div className=" flex justify-between min-h-16  items-center gap-2  sm:gap-5 lg:min-h-18  lg:gap-7.5">
            <Link
              className="inline-flex shrink-0 items-center gap-1.5 text-[17px] font-bold tracking-[-0.7px] text-[#21313c] no-underline sm:text-[19px] lg:gap-2 lg:text-[22px]"
              href="/"
              aria-label="FreshCart home"
            >
              <Image
                src={logo}
                alt=""
                width={32}
                height={26}
                className="h-4.75 w-6 object-contain sm:h-5.5 sm:w-6.75 lg:h-6.5 lg:w-8"
                priority
              />
              <span>FreshCart</span>
            </Link>

            <form
              className="hidden lg:flex h-9.5 min-w-0 flex-1 items-center overflow-hidden rounded-[7px] border border-[#e1e6e4] bg-white focus-within:border-[#0aad0a] focus-within:shadow-[0_0_0_3px_rgba(10,173,10,0.1)] sm:h-10.5"
              action="/shop"
              role="search"
            >
              <input
                className="h-full w-full min-w-0 bg-transparent px-2.5 text-[11px] text-[#21313c] outline-none placeholder:text-[#8a9499] sm:px-3.5 sm:text-[13px]"
                aria-label="Search products and brands"
                name="q"
                placeholder="Search for products, brands and more..."
              />
              <button
                className="mr-1 grid size-7.5 shrink-0 place-items-center rounded-full border-0 bg-[#0aad0a] text-white transition-colors hover:bg-[#088f08] sm:size-8"
                type="submit"
                aria-label="Search"
              >
                <Search size={19} strokeWidth={2.2} />
              </button>
            </form>
            <div className="hidden lg:flex gap-6 ">
              {links.map((link) => (
                <div key={link.label}>
                  {link.subLinks ? (
                    <div className="relative group">
                      <button className="flex items-center gap-2">
                        Categories
                        <IoIosArrowDown className="group-hover:rotate-180 transition-all duration-200" />
                      </button>

                      <div className="absolute left-0 top-full hidden w-64 py-3 rounded-2xl bg-white  shadow-xl group-hover:block">
                        {link.subLinks.map((category) => (
                          <Link
                            key={category.label}
                            href={category.href}
                            className="block rounded-lg px-2 py-3 hover:bg-gray-100"
                          >
                            {category.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      className="border-b  border-[#f0f2f1] py-2.5  font-medium text-[#364153] no-underline hover:text-[#0aad0a]"
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
            <div className=" shrink-0 items-center gap-4 flex lg:gap-5.5">
              <Link
                className="hidden lg:flex border-e pe-2 items-center gap-1.5 whitespace-nowrap  text-[13px] text-[#364153] no-underline transition-colors hover:text-[#0aad0a]"
                href="/contact"
                aria-label="Account"
              >
                <div className="w-10 h-10 rounded-full p-2 bg-[#f0fdf4] flex items-center justify-center">
                  <BiSupport className="size-5  text-[#16a34a]" />
                </div>
                <div className="text-xs">
                  <div className="text-gray-400">Support</div>
                  <div className="font-semibold text-gray-700">24/7 Help</div>
                </div>
              </Link>
              <Link
                className=" items-center gap-1.5 whitespace-nowrap text-[13px] text-[#364153] no-underline transition-colors  md:flex hover:bg-[#f2f4f6] p-2 rounded-full hover:text-[#16a34a]"
                href="/whislist"
                aria-label="Wishlist"
              >
                <Heart className="size-5 stroke-[1.8]" />
              </Link>
              <Link
                className="flex relative items-center gap-1.5 whitespace-nowrap  text-[13px] text-[#6a7282] no-underline transition-colors hover:bg-[#f2f4f6] p-2 rounded-full hover:text-[#16a34a]"
                href="/cart"
                aria-label="Shopping cart"
              >
                {totalItemsCount>0 &&               <span className="absolute top-0.5 right-0.5 size-4.5 rounded-full bg-[#16a34a] text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">{totalItemsCount}</span>
}
                <FaCartShopping className="size-5 stroke-[1.8]  " />
              </Link>
              {mySession.status === "authenticated" ? (
                <Button
                  onClick={handleLogOut}
                  className="hidden lg:flex capitalize  items-center gap-2 text-[14px] leading-5 font-semibold bg-red-600 hover:bg-red-400 hover:cursor-pointer transition-all duration-200"
                >
                  log out
                </Button>
              ) : (
                <Link
                  className="hidden lg:flex items-center gap-1.5 whitespace-nowrap text-[13px] text-white rounded-2xl no-underline transition-colors hover:bg-[#0e8138] bg-[#16a34a] px-4 py-2 font-bold"
                  href="/login"
                  aria-label="Shopping cart"
                >
                  <span className="relative inline-flex ">
                    <FaRegUser className="size-4 stroke-[1.8]" />
                  </span>
                  <span className="hidden lg:inline capitalize">sign in</span>
                </Link>
              )}
              {/* mobile*/}
              <button
                className="grid size-10 shrink-0 place-items-center rounded-full border border-[#e5e9e7] bg-[#0aad0a] text-white lg:hidden"
                type="button"
                aria-label={
                  menuOpen ? "Close navigation menu" : "Open navigation menu"
                }
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((open) => !open)}
              >
                {menuOpen ? <X size={23} /> : <Menu size={23} />}
              </button>
            </div>
          </div>
        </div>

        <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      </header>
    </>
  );
}
