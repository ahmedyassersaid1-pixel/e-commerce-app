"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/assetes/logo.png";
import { useContext, useEffect, useState } from "react";
import { ChevronRight, Heart, Menu, Search, X, UserRound, PackageCheck } from "lucide-react";
import { FaRegUser } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";
import { FaTruck } from "react-icons/fa";
import { IoGiftSharp } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa6";
import { LuLogOut } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import { FaRegAddressBook } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";

import { IoIosArrowDown } from "react-icons/io";
// shadcn

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import Sidebar from "../Sidebar/Sidebar";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { CartContext } from "@/Context/CartContext";
import { WishlistContext } from "../../../Context/WhislistContext";
import { loadCategoriesForMenu } from "@/action/category.action";
import type { CategoryType } from "@/types/route.type";


const links = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Categories", href: "/categories" },
  { label: "Brands", href: "/brands" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const mySession = useSession();
  const {totalItemsCount} = useContext(CartContext);
  const { wishlistCount } = useContext(WishlistContext);
  useEffect(() => {
    let isMounted = true;
    void loadCategoriesForMenu().then((result) => {
      if (isMounted) setCategories(result || []);
    });
    return () => {
      isMounted = false;
    };
  }, []);
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
              className="hidden h-10.5 min-w-0 flex-1 items-center overflow-hidden rounded-2xl border border-[#e1e6e4] bg-[#fbfcfd] transition focus-within:border-[#0aad0a] focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(10,173,10,0.1)] lg:flex"
              action="/shop"
              role="search"
            >
              <input
                className="h-full w-full min-w-0 bg-transparent px-4 text-sm text-[#21313c] outline-none placeholder:text-[#8a9499]"
                aria-label="Search products and brands"
                name="q"
                placeholder="Search for products, brands and more..."
                type="search"
                required
              />
              <button
                className="mr-1 grid size-9 shrink-0 place-items-center rounded-full border-0 bg-[#16a34a] text-white transition-colors hover:bg-[#12843e]"
                type="submit"
                aria-label="Search"
              >
                <Search size={19} strokeWidth={2.2} />
              </button>
            </form>
            <div className="hidden lg:flex gap-6 items-center">
              {links.map((link) => (
                <div key={link.label}>
                  {link.label === "Categories" ? (
                    <div className="group relative">
                      <Link
                        className="flex items-center gap-1.5 py-2 font-medium text-[#364153] no-underline hover:text-[#0aad0a]"
                        href={link.href}
                      >
                        Categories
                        <IoIosArrowDown className="transition-transform duration-200 group-hover:rotate-180" />
                      </Link>
                      <div className="absolute left-0 top-full z-50 hidden w-64 rounded-2xl bg-white py-3 shadow-xl group-hover:block group-focus-within:block">
                        <Link
                          className="block rounded-lg px-4 py-2.5 text-sm text-[#364153] no-underline hover:bg-[#f0fdf4] hover:text-[#16a34a]"
                          href="/categories"
                        >
                          All Categories
                        </Link>
                        {categories.map((category) => (
                          <Link
                            key={category._id}
                            className="block rounded-lg px-4 py-2.5 text-sm text-[#364153] no-underline hover:bg-[#f0fdf4] hover:text-[#16a34a]"
                            href={`/categories/${category._id}`}
                          >
                            {category.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      className=" py-2  font-medium text-[#364153] no-underline hover:text-[#0aad0a]"
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
                className="relative items-center gap-1.5 whitespace-nowrap text-[13px] text-[#364153] no-underline transition-colors  md:flex hover:bg-[#f2f4f6] p-2 rounded-full hover:text-[#16a34a]"
                href="/whislist"
                aria-label="Wishlist"
              >
                <Heart className="size-5 stroke-[1.8]" />
                                {wishlistCount>0 &&               <span className="absolute top-0.5 right-0.5 size-4.5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">{wishlistCount}</span>}

              </Link>
              <Link
                className="flex relative items-center gap-1.5 whitespace-nowrap  text-[13px] text-[#6a7282] no-underline transition-colors hover:bg-[#f2f4f6] p-2 rounded-full hover:text-[#16a34a]"
                href="/cart"
                aria-label="Shopping cart"
              >
                {totalItemsCount>0 &&   <span className="absolute top-0.5 right-0.5 size-4.5 rounded-full bg-[#16a34a] text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">{totalItemsCount}</span>
}
                <FaCartShopping className="size-5 stroke-[1.8]  " />
              </Link>
              {mySession.status === "authenticated" ? (
                //////////////////
                <>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button
                          variant="destructive"
                          aria-label="Open account menu"
                          className="size-10 rounded-full p-0 transition hover:bg-[#f0fdf4] focus-visible:ring-2 focus-visible:ring-[#16a34a]/30"
                        >
                          <span className="flex size-10 items-center justify-center rounded-full border border-[#dcfce7] bg-[#f0fdf4]">
                            <FaRegUserCircle className="size-5 text-[#16a34a]" />
                          </span>
                        </Button>
                      }
                    />
                    <DropdownMenuContent
                      align="end"
                      sideOffset={10}
                      className="w-[280px] rounded-2xl border border-[#e8ece9] bg-white p-2 text-[#21313c] shadow-[0_14px_40px_rgba(33,49,60,0.16)]"
                    >
                      <DropdownMenuGroup>
                        <DropdownMenuLabel className="p-0">
                          <div className="flex items-center gap-3 rounded-xl bg-[#f6faf7] p-3">
                            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#e1f7e8] text-[#16a34a]">
                              <FaRegUserCircle className="size-5" />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-sm font-semibold text-[#21313c]">{mySession.data?.user?.name || "My account"}</span>
                              <span className="mt-0.5 block truncate text-xs font-normal text-[#7b8580]">{mySession.data?.user?.email || "Manage your FreshCart account"}</span>
                            </span>
                          </div>
                        </DropdownMenuLabel>
                      </DropdownMenuGroup>

                      <DropdownMenuSeparator className="my-2 bg-[#edf0ee]" />

                      <DropdownMenuGroup className="space-y-1">
                        <DropdownMenuItem
                          render={<Link href="/profile" />}
                          className="h-10 cursor-pointer gap-3 rounded-xl px-3 text-sm font-medium text-[#364153] transition-colors hover:bg-[#f0fdf4] hover:text-[#13843d]! "
                        >
                          <UserRound className="size-4 " />
                          <span className="flex-1">My Profile</span>
                          <ChevronRight className="size-4 text-[#a0aaa4]" />
                        </DropdownMenuItem>
                             <DropdownMenuItem
                          render={<Link href="/orders" />}
                          className="h-10 cursor-pointer gap-3 rounded-xl px-3 text-sm font-medium text-[#364153] transition-colors hover:bg-[#f0fdf4] hover:text-[#13843d]! "
                        >
                          <PackageCheck className="size-4 " />
                          <span className="flex-1">My Orders</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          render={<Link href="/whislist" />}
                          className="h-10 cursor-pointer gap-3 rounded-xl px-3 text-sm font-medium text-[#364153] transition-colors hover:bg-[#f0fdf4] hover:text-[#13843d]! "
                        >
                          <Heart className="size-4 " />
                          <span className="flex-1">My Wishlist</span>
                          {wishlistCount > 0 && <span className="rounded-full bg-[#e7f8ec] px-2 py-0.5 text-[10px] font-semibold text-[#13843d]">{wishlistCount}</span>}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          render={<Link href="/profile/addresses" />}
                          className="h-10 cursor-pointer gap-3 rounded-xl px-3 text-sm font-medium text-[#364153] transition-colors hover:bg-[#f0fdf4] hover:text-[#13843d]! "
                        >
                          <FaRegAddressBook className="size-4 " />
                          <span className="flex-1">My Addresses</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          render={<Link href="/profile/settings" />}
                          className="h-10 cursor-pointer gap-3 rounded-xl px-3 text-sm font-medium text-[#364153] transition-colors hover:bg-[#f0fdf4] hover:text-[#13843d]! "
                        >
                          <IoSettingsSharp className="size-4 " />
                          <span className="flex-1">My Settings</span>
                        </DropdownMenuItem>
                   
                      </DropdownMenuGroup>

                      <DropdownMenuSeparator className="my-2 bg-[#edf0ee]" />
                      <DropdownMenuGroup>
                        <DropdownMenuItem
                          onClick={handleLogOut}
                          className="h-10 cursor-pointer gap-3 rounded-xl px-3 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 hover:text-red-700 focus:bg-red-50 focus:text-red-700"
                        >
                          <LuLogOut className="size-4" />
                          Log out
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
        </>
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

        <form className="px-4 pb-3 lg:hidden" action="/shop" role="search">
          <div className="flex h-11 items-center overflow-hidden rounded-2xl border border-[#e1e6e4] bg-[#fbfcfd] transition focus-within:border-[#0aad0a] focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(10,173,10,0.1)]">
            <input
              className="h-full min-w-0 flex-1 bg-transparent px-4 text-sm text-[#21313c] outline-none placeholder:text-[#8a9499]"
              aria-label="Search products and brands"
              name="q"
              placeholder="Search products, brands and more..."
              type="search"
              required
            />
            <button className="mr-1 grid size-9 shrink-0 place-items-center rounded-full bg-[#16a34a] text-white transition-colors hover:bg-[#12843e]" type="submit" aria-label="Search">
              <Search size={19} strokeWidth={2.2} />
            </button>
          </div>
        </form>

        <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      </header>
    </>
  );
}
