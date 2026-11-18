import Image from "next/image";
import Link from "next/link";
import logo from "@/assetes/logo.png";
import { FaYoutube, FaFacebook, FaInstagram } from "react-icons/fa";
import { Mail, MapPin, Phone, CreditCard } from "lucide-react";
import { IoLogoTwitter } from "react-icons/io";

const linkGroups = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/shop" },
      { label: "Categories", href: "/categories" },
      { label: "Brands", href: "/brands" },
      { label: "Electronics", href: "/" },
      { label: "Men’s Fashion", href: "/" },
      { label: "Women’s Fashion", href: "/" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "My Account", href: "/login" },
      { label: "Order History", href: "/cart" },
      { label: "Wishlist", href: "/whislist" },
      { label: "Shopping Cart", href: "/cart" },
      { label: "Sign In", href: "/login" },
      { label: "Create Account", href: "/register" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Help Center", href: "/contact" },
      { label: "Shipping Info", href: "/contact" },
      { label: "Returns & Refunds", href: "/contact" },
      { label: "Track Order", href: "/cart" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/contact" },
      { label: "Terms of Service", href: "/contact" },
      { label: "Cookie Policy", href: "/contact" },
    ],
  },
];

const socialIcons = [FaFacebook, IoLogoTwitter, FaInstagram, FaYoutube];
const socialLabels = ["Facebook", "Twitter", "Instagram", "YouTube"];

export default function Footer() {
  return (
    <footer className="bg-[#101828] text-[#99A1AF]">
      <div className="mx-auto max-w-7xl px-5 pb-6 pt-9 sm:px-7 sm:pt-10 lg:px-0">
        <div className="grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-3 sm:gap-x-8 lg:grid-cols-[2.05fr_repeat(4,minmax(0,1fr))] lg:gap-x-10">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Link href="/" aria-label="FreshCart home" className="inline-flex items-center gap-1.5 rounded-md bg-white px-2.5 py-1 text-[18px] font-bold leading-6 tracking-tight text-[#263746]">
              <Image src={logo} alt="" width={22} height={20} className="h-5 w-auto object-contain" />
              <span>FreshCart</span>
            </Link>
            <p className="mt-5 max-w-75 text-[14px] leading-[1.6] text-[#99A1AF]">
              FreshCart is your one-stop destination for quality products. From fashion to electronics, we bring you the best brands at competitive prices with a seamless shopping experience.
            </p>
            <ul className="mt-4 space-y-2 text-[14px] text-[#99A1AF]">
              <li><a href="tel:+18001234567" className="flex items-center gap-2.5 transition hover:text-white"><Phone size={11} className="fill-[#00c950] text-[#00c950]" />+1 (800) 123-4567</a></li>
              <li><a href="mailto:support@freshcart.com" className="flex items-center gap-2.5 transition hover:text-white"><Mail size={11} className="fill-[#00c950] text-[#00c950]" />support@freshcart.com</a></li>
              <li className="flex items-center gap-2.5"><MapPin size={11} className="fill-[#00c950] text-[#00c950]" />123 Commerce Street, New York, NY 10001</li>
            </ul>
            <div className="mt-4 flex items-center gap-2">
              {socialIcons.map((Icon, index) => (
                <a key={socialLabels[index]} href="#" aria-label={socialLabels[index]} className="grid size-7 place-items-center rounded-full bg-[#1E2939] text-[#99A1AF] transition hover:bg-[#00c950] hover:text-white">
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>

          {linkGroups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="text-[18px] font-semibold leading-5 text-white">{group.title}</h2>
              <ul className="mt-3 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}><Link href={link.href} className="text-[14px] leading-4 text-[#99A1AF] transition hover:text-white">{link.label}</Link></li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="border-t border-[#1e2939]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-4 text-[14px] text-[#697586] sm:flex-row sm:items-center sm:justify-between sm:px-7 lg:px-0">
          <p>© {new Date().getFullYear()} FreshCart. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2" aria-label="Accepted payment methods">
            <span className="inline-flex items-center gap-1.5"><CreditCard size={11} /> Visa</span>
            <span className="inline-flex items-center gap-1.5"><CreditCard size={11} /> Mastercard</span>
            <span className="inline-flex items-center gap-1.5"><CreditCard size={11} /> PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
