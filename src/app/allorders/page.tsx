"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { CalendarDays, Check, Clock3, CreditCard, MapPin, PackageCheck, Phone, ReceiptText, Truck } from "lucide-react";
import { getAllOrders } from "@/action/allorders";
import type { OrderType } from "@/types/route.type";

export default function AllOrders() {
  const session = useSession();
  const userId = session.data?.id;
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadOrders() {
      if (session.status === "loading") return;
      if (!userId) {
        if (active) {
          setOrders([]);
          setError("Please sign in to view your orders.");
          setLoading(false);
        }
        return;
      }

      setLoading(true);
      setError("");
      try {
        const response = await getAllOrders(userId);
        if (!active) return;
        if (response?.status === "fail") {
          setError(response.message ?? "Could not load your orders.");
          setOrders([]);
          return;
        }
        const data = Array.isArray(response) ? response : response?.data;
        setOrders(Array.isArray(data) ? (data as OrderType[]) : []);
      } catch {
        if (active) setError("Could not load your orders. Please try again.");
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadOrders();
    return () => { active = false; };
  }, [session.status, userId]);

  return (
    <main className="min-h-[70vh] bg-[#f7faf8] px-4 py-9 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[.16em] text-green-700">Your account</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#21313c] sm:text-4xl">My orders</h1>
          <p className="mt-2 text-[#687786]">Review your order details and delivery progress.</p>
        </div>

        {loading ? (
          <div className="rounded-3xl border border-[#e5ece7] bg-white px-6 py-16 text-center text-[#687786]">Loading your orders…</div>
        ) : error ? (
          <div role="alert" className="rounded-3xl border border-amber-200 bg-white px-6 py-12 text-center text-[#687786]">{error}</div>
        ) : orders.length === 0 ? (
          <div className="rounded-3xl border border-[#e5ece7] bg-white px-6 py-16 text-center"><PackageCheck className="mx-auto size-9 text-green-700"/><h2 className="mt-4 text-lg font-bold text-[#21313c]">No orders yet</h2><p className="mt-2 text-sm text-[#687786]">Your orders will appear here after checkout.</p></div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <article key={order._id} className="overflow-hidden rounded-3xl border border-[#e5ece7] bg-white shadow-[0_14px_45px_rgba(33,49,60,.06)]">
                <header className="flex flex-col gap-5 border-b border-[#edf1ee] bg-gradient-to-r from-white to-[#f6fbf7] p-5 sm:flex-row sm:items-center sm:justify-between sm:px-7 sm:py-6">
                  <div className="flex items-start gap-4"><span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-green-100 text-green-700"><ReceiptText size={23}/></span><div><p className="text-xs font-medium uppercase tracking-wider text-[#87929a]">Order number</p><h2 className="mt-1 text-lg font-bold text-[#21313c]">#{order.id}</h2><p className="mt-1 text-xs text-[#87929a]">Ref: {order._id}</p></div></div>
                  <div className="flex flex-wrap gap-2 sm:justify-end">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${order.isPaid ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}>{order.isPaid ? <Check size={14}/> : <Clock3 size={14}/>} {order.isPaid ? "Paid" : "Payment pending"}</span>
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${order.isDelivered ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}>{order.isDelivered ? <Check size={14}/> : <Clock3 size={14}/>} {order.isDelivered ? "Delivered" : "Preparing order"}</span>
                  </div>
                </header>

                <div className="grid gap-7 p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_280px]">
                  <section>
                    <div className="mb-4 flex items-center justify-between"><h3 className="font-bold text-[#21313c]">Items in this order</h3><span className="text-xs text-[#87929a]">{order.cartItems?.reduce((sum, item) => sum + item.count, 0) ?? 0} items</span></div>
                    <div className="divide-y divide-[#edf1ee]">
                      {order.cartItems?.map((item) => (
                        <div key={item._id} className="flex items-center gap-3 py-4 first:pt-1 last:pb-1 sm:gap-4">
                          <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-[#f5f7f6] sm:size-[72px]"><Image src={item.product.imageCover} alt={item.product.title} fill sizes="72px" className="object-cover"/></div>
                          <div className="min-w-0 flex-1"><p className="text-xs text-[#87929a]">{item.product.category?.name}</p><h4 className="line-clamp-2 text-sm font-semibold leading-5 text-[#21313c]">{item.product.title}</h4><p className="mt-1 text-xs text-[#87929a]">Qty: {item.count} <span className="px-1">·</span> {item.price.toLocaleString()} EGP each</p></div>
                          <p className="shrink-0 text-sm font-bold text-[#21313c]">{(item.count * item.price).toLocaleString()} <span className="text-xs font-medium">EGP</span></p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <aside className="h-fit rounded-2xl border border-[#e8eeea] bg-[#fbfcfb] p-4 sm:p-5">
                    <h3 className="font-bold text-[#21313c]">Order details</h3>
                    <div className="mt-4 flex items-center gap-3 text-sm"><CalendarDays size={17} className="text-green-700"/><span className="text-[#687786]">Placed on {new Date(order.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span></div>
                    <div className="mt-3 flex items-center gap-3 text-sm"><CreditCard size={17} className="text-green-700"/><span className="text-[#687786]">Paid by {order.paymentMethodType}</span></div>
                    <div className="mt-5 border-t border-[#e8eeea] pt-4"><p className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#21313c]"><MapPin size={16} className="text-green-700"/>Delivery address</p><p className="text-sm leading-6 text-[#687786]">{order.shippingAddress.details}<br/>{order.shippingAddress.city}</p><p className="mt-2 flex items-center gap-2 text-sm text-[#687786]"><Phone size={14}/>{order.shippingAddress.phone}</p></div>
                    <div className="mt-5 border-t border-[#e8eeea] pt-4"><p className="flex items-center gap-2 text-sm text-[#687786]"><Truck size={16} className="text-green-700"/>Shipping <span className="ml-auto font-semibold text-green-700">{order.shippingPrice ? `${order.shippingPrice.toLocaleString()} EGP` : "FREE"}</span></p><div className="mt-4 flex items-end justify-between"><span className="text-sm font-semibold text-[#21313c]">Order total</span><span className="text-xl font-bold text-[#21313c]">{order.totalOrderPrice.toLocaleString()} <span className="text-xs">EGP</span></span></div></div>
                  </aside>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
