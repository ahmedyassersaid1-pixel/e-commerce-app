"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Banknote, Check, CreditCard, LockKeyhole, MapPin, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { getProductsCart } from "@/action/addToCart.action";
import { submitCheckout } from "@/action/checkout.action";
import { checkoutSchema, type CheckoutSchemaType } from "@/schemas/checkout.schema";
import { toast } from "@/components/ui/toast";

type CartInfo = { _id?: string; id?: string; cartId?: string; totalCartPrice?: number; products?: { count: number; price: number; product: { id?: string; _id?: string; title: string; imageCover: string; category?: { name: string } } }[] };

const inputClass = "h-12 rounded-xl border-[#e1e8e3] bg-white px-4 focus-visible:border-[#16a34a] focus-visible:ring-[#16a34a]/15";

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartInfo | null>(null);
  const [loadingCart, setLoadingCart] = useState(true);
  const form = useForm<CheckoutSchemaType>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { details: "", phone: "", city: "", paymentMethod: "cash" },
  });
  const { control, handleSubmit, watch, formState: { isSubmitting } } = form;
  const paymentMethod = watch("paymentMethod");

  useEffect(() => {
    let active = true;
    void getProductsCart().then((res) => {
      if (!active) return;
      if (res?.status === "success" && res.data?.products?.length) setCart({ ...res.data, cartId: res.cartId });
      setLoadingCart(false);
    }).catch(() => { if (active) setLoadingCart(false); });
    return () => { active = false; };
  }, []);

  const subtotal = cart?.products?.reduce((sum, item) => sum + item.price * item.count, 0) ?? 0;
  const total = subtotal / 1000;
  const onSubmit = async (values: CheckoutSchemaType) => {
    console.log("values", values);
    const result = await submitCheckout(cart?.cartId ?? cart?._id ?? cart?.id ?? "", values);
    if (result.status !== "success") {
      toast.add({ type: "error", title: "Checkout failed", description: result.message });
      return;
    }
    if (values.paymentMethod === "visa") {
      const checkoutUrl = (result.data as { session?: { url?: string } } | undefined)?.session?.url
        ?? (result.session as { url?: string } | undefined)?.url;
      if (checkoutUrl) { window.location.assign(checkoutUrl); return; }
      toast.add({ type: "error", title: "Payment link unavailable", description: "Your order was created, but the payment link was not returned." });
      return;
    }
    toast.add({ type: "success", title: "Order placed", description: "Your cash on delivery order has been placed." });
    router.push("/cart");
  };

  if (loadingCart) return <main className="grid min-h-[55vh] place-items-center bg-[#f8faf9] text-[#687786]">Loading checkout…</main>;
  if (!cart?.products?.length) return <main className="grid min-h-[55vh] place-items-center bg-[#f8faf9] px-5"><div className="text-center"><h1 className="text-2xl font-bold text-[#21313c]">Your cart is empty</h1><p className="mt-2 text-[#687786]">Add something before checking out.</p><Link href="/cart" className="mt-5 inline-flex items-center gap-2 font-semibold text-green-700"><ArrowLeft size={17} /> Back to cart</Link></div></main>;

  return <main className="min-h-screen bg-[#f7faf8] px-4 py-8 sm:px-6 sm:py-12">
    <div className="mx-auto max-w-6xl">
      <Link href="/cart" className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-[#687786] transition hover:text-green-700"><ArrowLeft size={17} /> Back to cart</Link>
      <div className="mb-8"><p className="text-sm font-semibold uppercase tracking-[.18em] text-green-700">FreshCart checkout</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-[#21313c] sm:text-4xl">Delivery &amp; payment</h1><p className="mt-2 text-[#687786]">A few details and your order will be on its way.</p></div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_370px]">
        <div className="space-y-6">
          <section className="rounded-3xl border border-[#e8eeea] bg-white p-5 shadow-[0_10px_35px_rgba(33,49,60,.04)] sm:p-8">
            <div className="mb-6 flex items-center gap-3"><span className="grid size-11 place-items-center rounded-2xl bg-green-50 text-green-700"><MapPin size={21}/></span><div><h2 className="text-lg font-bold text-[#21313c]">Delivery address</h2><p className="text-sm text-[#87929a]">Where should we bring your order?</p></div></div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Controller name="details" control={control} render={({ field, fieldState }) => <Field data-invalid={fieldState.invalid} className="sm:col-span-2"><FieldLabel htmlFor="details">Street address</FieldLabel><Input {...field} id="details" placeholder="Building, street, apartment" autoComplete="street-address" aria-invalid={fieldState.invalid} className={inputClass}/>{fieldState.invalid && <FieldError errors={[fieldState.error]}/>}</Field>}/>
              <Controller name="city" control={control} render={({ field, fieldState }) => <Field data-invalid={fieldState.invalid}><FieldLabel htmlFor="city">City</FieldLabel><Input {...field} id="city" placeholder="Cairo" autoComplete="address-level2" aria-invalid={fieldState.invalid} className={inputClass}/>{fieldState.invalid && <FieldError errors={[fieldState.error]}/>}</Field>}/>
              <Controller name="phone" control={control} render={({ field, fieldState }) => <Field data-invalid={fieldState.invalid}><FieldLabel htmlFor="phone">Mobile number</FieldLabel><Input {...field} id="phone" type="tel" inputMode="tel" placeholder="01xxxxxxxxx" autoComplete="tel" aria-invalid={fieldState.invalid} className={inputClass}/>{fieldState.invalid && <FieldError errors={[fieldState.error]}/>}</Field>}/>
            </div>
          </section>
          <section className="rounded-3xl border border-[#e8eeea] bg-white p-5 shadow-[0_10px_35px_rgba(33,49,60,.04)] sm:p-8">
            <div className="mb-5"><h2 className="text-lg font-bold text-[#21313c]">Payment method</h2><p className="mt-1 text-sm text-[#87929a]">Choose how you would like to pay.</p></div>
            <Controller name="paymentMethod" control={control} render={({ field }) => <div className="grid gap-3 sm:grid-cols-2">
              {[{ value: "cash" as const, title: "Cash on delivery", detail: "Pay when your order arrives", Icon: Banknote }, { value: "visa" as const, title: "Credit or debit card", detail: "Secure online card payment", Icon: CreditCard }].map(({ value, title, detail, Icon }) => <button key={value} type="button" role="radio" aria-checked={field.value === value} onClick={() => field.onChange(value)} className={`relative flex items-center gap-4 rounded-2xl border p-4 text-left transition ${field.value === value ? "border-green-600 bg-green-50/60 ring-2 ring-green-600/10" : "border-[#e5ebe7] hover:border-green-300"}`}><span className={`grid size-11 shrink-0 place-items-center rounded-xl ${field.value === value ? "bg-green-100 text-green-700" : "bg-[#f5f7f6] text-[#65727b]"}`}><Icon size={21}/></span><span className="min-w-0 flex-1"><span className="block text-sm font-semibold text-[#21313c]">{title}</span><span className="mt-1 block text-xs text-[#87929a]">{detail}</span></span>{field.value === value && <Check className="size-4 text-green-700"/>}</button>)}
            </div>}/>
            {paymentMethod === "visa" && <p className="mt-4 flex items-center gap-2 rounded-xl bg-[#f6f8fc] px-4 py-3 text-xs leading-5 text-[#687786]"><LockKeyhole size={15} className="shrink-0 text-green-700"/>You’ll continue to our secure payment provider to enter your card details.</p>}
          </section>
        </div>
        <aside className="rounded-3xl border border-[#e8eeea] bg-white p-5 shadow-[0_10px_35px_rgba(33,49,60,.05)] lg:sticky lg:top-24 sm:p-6">
          <h2 className="text-lg font-bold text-[#21313c]">Order summary</h2><p className="mt-1 text-sm text-[#87929a]">{cart.products.reduce((sum, item) => sum + item.count, 0)} items in your cart</p>
          <div className="mt-5 max-h-80 space-y-4 overflow-auto border-b border-[#edf0ee] pb-5">{cart.products.map((item, index) => <article key={item.product._id ?? item.product.id ?? `${item.product.title}-${index}`} className="flex items-center gap-3"><div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-gray-50"><Image src={item.product.imageCover} alt={item.product.title} fill sizes="64px" className="object-cover"/></div><div className="min-w-0 flex-1"><p className="text-xs text-gray-400">{item.product.category?.name}</p><p className="line-clamp-1 text-sm font-semibold text-[#21313c]">{item.product.title}</p><p className="mt-1 text-xs text-[#87929a]">{item.price} EGP × {item.count}</p></div><span className="shrink-0 text-sm font-bold text-[#21313c]">{((item.price * item.count) / 1000).toFixed(3)} EGP</span></article>)}</div>
          <div className="mt-4 flex justify-between text-sm text-[#687786]"><span>Subtotal</span><span className="font-medium text-[#21313c]">{total.toFixed(3)} EGP</span></div><div className="mt-3 flex justify-between text-sm text-[#687786]"><span>Shipping</span><span className="font-semibold text-green-700">FREE</span></div><div className="mt-4 flex justify-between border-t border-[#edf0ee] pt-4"><span className="font-semibold text-[#21313c]">Total</span><span className="text-xl font-bold text-[#21313c]">{total.toFixed(3)} <span className="text-sm font-semibold">EGP</span></span></div>
          <Button type="submit" disabled={isSubmitting} className="mt-6 h-12 w-full rounded-xl bg-[#16a34a] text-base font-semibold text-white hover:bg-[#12843e]">{isSubmitting ? "Processing…" : paymentMethod === "visa" ? "Continue to payment" : "Place cash order"}</Button>
          <p className="mt-4 flex items-center justify-center gap-2 text-xs text-[#87929a]"><ShieldCheck size={15} className="text-green-700"/>Secure checkout · Free delivery</p>
        </aside>
      </form>
    </div>
  </main>;
}
