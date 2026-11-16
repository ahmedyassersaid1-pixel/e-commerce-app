"use client";

import { useState, type FormEvent } from "react";
import { Apple, ArrowRight, Leaf, Mail, Play, ShoppingBasket, Tag, Truck } from "lucide-react";

const perks = [
  { label: "Fresh Picks Weekly", Icon: Leaf },
  { label: "Free Delivery Codes", Icon: Truck },
  { label: "Members-Only Deals", Icon: Tag },
];

export default function Newsletter() {
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubscribed(true);
    event.currentTarget.reset();
  }

  return (
    <section aria-labelledby="newsletter-heading" className="px-4 py-10 sm:px-6 lg:px-6 lg:py-14 ">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[40px] border border-#D0FAE580] bg-linear-135 from-[#F3F4F6] via-[#FFFFFF] to-[#FEF2F2] px-5 py-7 sm:px-8 sm:py-9 lg:px-9 lg:py-8">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_1px_0.58fr] lg:gap-5">
          <div className="lg:pr-5">
            <div className="mb-1 flex items-center gap-2.5">
              <span className="grid size-8 place-items-center rounded-lg bg-[#00b98b] text-white shadow-sm"><Mail size={15} fill="currentColor" /></span>
              <span className="text-[10px] font-bold uppercase tracking-wide text-[#009c78]">Newsletter</span>
            </div>
            <h2 id="newsletter-heading" className="text-[23px] font-bold leading-tight tracking-[-0.5px] text-[#172033] sm:text-[26px]">
              Get the Freshest Updates <span className="text-[#00a878]">Delivered Free</span>
            </h2>
            <p className="mt-2 text-[11px] leading-5 text-[#788294] sm:text-xs">Weekly recipes, seasonal offers &amp; exclusive member perks.</p>

            <ul className="mt-3 flex flex-wrap gap-2">
              {perks.map(({ label, Icon }) => (
                <li key={label} className="inline-flex items-center gap-1.5 rounded-full border border-[#d9efe6] bg-white/90 px-2.5 py-1.5 text-[9px] font-medium text-[#3e5360] shadow-[0_2px_5px_rgba(25,75,60,0.04)] sm:text-[10px]">
                  <span className="grid size-4 place-items-center rounded-full bg-[#d9faed] text-[#00a878]"><Icon size={9} fill="currentColor" /></span>{label}
                </li>
              ))}
            </ul>

            <form onSubmit={handleSubmit} className="mt-4 sm:flex sm:gap-2">
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input id="newsletter-email" name="email" type="email" required placeholder="you@example.com" className="h-10 w-full rounded-[10px] border border-[#e1e5eb] bg-white px-3 text-[10px] text-[#293449] shadow-sm outline-none transition placeholder:text-[#9aa4b6] focus:border-[#00b98b] focus:ring-2 focus:ring-[#00b98b]/15 sm:flex-1" />
              <button type="submit" className="mt-2 inline-flex h-10 w-full items-center justify-center gap-2 rounded-[9px] bg-[#00b779] px-4 text-[10px] font-semibold text-white shadow-[0_4px_10px_rgba(0,183,121,0.22)] transition hover:bg-[#009f6a] sm:mt-0 sm:w-auto">
                Subscribe <ArrowRight size={13} />
              </button>
            </form>
            <p className="mt-1.5 text-[8px] text-[#9aa4b6]">✨ Unsubscribe anytime. No spam, ever.</p>
            {subscribed && <p role="status" className="mt-1 text-xs font-medium text-[#07834b]">Thanks for subscribing!</p>}
          </div>

          <div aria-hidden="true" className="hidden h-full min-h-52 bg-[#e6eee9] lg:block" />

          <aside aria-label="FreshCart mobile app" className="rounded-2xl bg-[radial-gradient(circle_at_85%_16%,rgba(0,185,139,0.24),transparent_24%),linear-gradient(135deg,#151c2b,#1c2938)] p-5 text-white shadow-lg sm:p-6">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#064b43] px-2.5 py-1 text-[8px] font-semibold uppercase tracking-wide text-[#42e6bd]">
              <ShoppingBasket size={10} /> Mobile app
            </span>
            <h3 className="mt-3 text-sm font-bold">Shop Faster on Our App</h3>
            <p className="mt-2 text-[9px] leading-4 text-[#a6afbd]">Get app-exclusive deals &amp; 15% off your first order.</p>
            <div className="mt-4 grid gap-1.5">
              <a href="#" className="flex h-9 items-center gap-2.5 rounded-lg border border-white/5 bg-white/10 px-3 transition hover:bg-white/15">
                <Apple size={16} fill="white" />
                <span className="leading-tight"><span className="block text-[6px] uppercase tracking-wide text-[#a6afbd]">Download on</span><span className="block text-[9px] font-semibold">App Store</span></span>
              </a>
              <a href="#" className="flex h-9 items-center gap-2.5 rounded-lg border border-white/5 bg-white/10 px-3 transition hover:bg-white/15">
                <Play size={15} fill="white" />
                <span className="leading-tight"><span className="block text-[6px] uppercase tracking-wide text-[#a6afbd]">Get it on</span><span className="block text-[9px] font-semibold">Google Play</span></span>
              </a>
            </div>
            <p className="mt-4 text-[9px] text-[#a6afbd]"><span className="text-amber-400">★★★★★</span> &nbsp;4.9 · 100K+ downloads</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
