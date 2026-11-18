"use client";

import { FormEvent, useEffect, useState, useTransition } from "react";
import { Building2, MapPin, Pencil, Phone, Plus, Trash2, X } from "lucide-react";
import { createAddress, deleteAddress, loadAddresses } from "@/action/profile.action";

type Address = { _id?: string; name?: string; details?: string; city?: string; phone?: string };

function unpackAddresses(payload: unknown): Address[] {
  if (Array.isArray(payload)) return payload as Address[];
  if (payload && typeof payload === "object" && "data" in payload) {
    const nested = (payload as { data?: unknown }).data;
    if (Array.isArray(nested)) return nested as Address[];
  }
  return [];
}

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState("");

  async function refreshAddresses() {
    setIsLoading(true);
    const result = await loadAddresses();
    if (result.ok) setAddresses(unpackAddresses(result.data));
    else setMessage(result.message || "Could not load your addresses.");
    setIsLoading(false);
  }

  useEffect(() => {
    void Promise.resolve().then(refreshAddresses);
  }, []);

  async function handleAddAddress(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const address = {
      name: String(form.get("label") || "Home"),
      details: String(form.get("street") || ""),
      city: String(form.get("city") || ""),
      phone: String(form.get("phone") || ""),
    };

    if (editingAddress) {
      setAddresses((current) => current.map((item) =>
        item === editingAddress || Boolean(editingAddress._id && item._id === editingAddress._id) ? { ...item, ...address } : item,
      ));
      setMessage("Address updated in this view. The API does not provide an address update endpoint.");
      setIsFormOpen(false);
      setEditingAddress(null);
      return;
    }

    startTransition(async () => {
      const result = await createAddress(address);
      setMessage(result.message);
      if (result.ok) {
        setIsFormOpen(false);
        await refreshAddresses();
      }
    });
  }

  function handleDeleteAddress(addressId: string) {
    startTransition(async () => {
      const result = await deleteAddress(addressId);
      setMessage(result.message);
      if (result.ok) await refreshAddresses();
    });
  }

  return (
    <section>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#17212b]">My Addresses</h2>
          <p className="mt-1 text-[#687786]">Manage your saved delivery addresses</p>
        </div>
        <button className="inline-flex h-14 items-center gap-2 rounded-2xl bg-[#16a34a] px-6 font-semibold text-white shadow-lg shadow-green-700/15 transition hover:bg-[#12843e]" onClick={() => setIsFormOpen(true)} type="button">
          <Plus size={20} strokeWidth={2.5} /> Add Address
        </button>
      </div>

      {message && <p aria-live="polite" className={`mb-4 rounded-xl px-4 py-3 text-sm ${message.includes("successfully") || message.includes("removed") ? "bg-[#effbf3] text-[#08733d]" : message.includes("updated in this view") ? "bg-[#eef6ff] text-[#315c89]" : "bg-[#fff5f3] text-[#a33d32]"}`}>{message}</p>}

      {isLoading ? (
        <div className="grid min-h-97.5 place-items-center rounded-[28px] border border-[#edf0f2] bg-white text-[#687786]" role="status">Loading addresses…</div>
      ) : addresses.length === 0 ? (
        <div className="flex min-h-97.5 flex-col items-center justify-center rounded-[28px] border border-[#edf0f2] bg-white px-6 py-12 text-center">
          <span className="mb-6 grid size-24 place-items-center rounded-full bg-[#f1f3f5] text-[#9aa3af]"><MapPin size={32}  strokeWidth={1.5} /></span>
          <h3 className="text-xl font-bold text-[#17212b]">No Addresses Yet</h3>
          <p className="mt-3 max-w-md text-lg leading-7 text-[#687786]">Add your first delivery address to make checkout<br className="hidden sm:block" /> faster and easier.</p>
          <button className="mt-8 inline-flex h-15 items-center gap-2 rounded-2xl bg-[#16a34a] px-7 font-bold text-white shadow-lg shadow-green-700/15 transition hover:bg-[#12843e]" onClick={() => setIsFormOpen(true)} type="button">
            <Plus size={21} strokeWidth={2.5} /> Add Your First Address
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {addresses.map((address, index) => (
            <article className="flex max-w-180 items-start gap-5 rounded-2xl border border-[#d8f3e2] bg-white p-5 shadow-[0_4px_10px_rgba(22,163,74,0.10)] sm:p-6" key={address._id || `${address.details}-${index}`}>
              <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-[#dcfce8] text-[#16a34a]"><MapPin size={22}  /></span>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold capitalize text-[#17212b]">{address.name || "Delivery address"}</h3>
                <p className="mt-1 whitespace-pre-wrap text-[#52616f]">{address.details}</p>
                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#687786]">
                  {address.phone && <span className="inline-flex items-center gap-2"><Phone size={15}  />{address.phone}</span>}
                  {address.city && <span className="inline-flex items-center gap-2"><Building2 size={15}  />{address.city}</span>}
                </div>
              </div>
              <div className="flex shrink-0 gap-2">
                <button aria-label={`Edit ${address.name || "address"}`} className="grid size-11 place-items-center rounded-xl bg-[#f1f3f5] text-[#53616f] transition hover:bg-[#e8f7ed] hover:text-[#159447]" onClick={() => { setEditingAddress(address); setIsFormOpen(true); }} type="button"><Pencil size={18}  /></button>
                {address._id && <button aria-label={`Delete ${address.name || "address"}`} className="grid size-11 place-items-center rounded-xl bg-[#f1f3f5] text-[#53616f] transition hover:bg-[#fff0f0] hover:text-[#c43d3d] disabled:opacity-50" disabled={isPending} onClick={() => handleDeleteAddress(address._id!)} type="button"><Trash2 size={18}  /></button>}
              </div>
            </article>
          ))}
        </div>
      )}

      {isFormOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#17212b]/50 p-4 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) { setIsFormOpen(false); setEditingAddress(null); } }}>
          <section aria-labelledby="address-form-title" aria-modal="true" className="w-full max-w-2xl rounded-[28px] bg-white p-6 shadow-2xl sm:p-10" role="dialog">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div><h2 className="text-2xl font-bold text-[#17212b]" id="address-form-title">{editingAddress ? "Edit Address" : "Add Address"}</h2><p className="mt-1 text-sm text-[#687786]">{editingAddress ? "Update your saved delivery details." : "Save a place for your next order."}</p></div>
              <button aria-label="Close" className="rounded-xl bg-[#f1f3f5] p-3 text-[#53616f] hover:bg-[#e7ebee]" onClick={() => { setIsFormOpen(false); setEditingAddress(null); }} type="button"><X size={20} /></button>
            </div>
            <form key={editingAddress?._id || "new-address"} onSubmit={handleAddAddress} className="space-y-5">
              <label className="block text-sm font-medium text-[#34434d]">Address Name<input className="mt-2 h-14 w-full rounded-2xl border border-[#dfe5e1] px-5 outline-none focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/15" defaultValue={editingAddress?.name || ""} name="label" placeholder="Home, Work..." required /></label>
              <label className="block text-sm font-medium text-[#34434d]">Full Address<textarea className="mt-2 min-h-32 w-full resize-y rounded-2xl border border-[#dfe5e1] px-5 py-4 outline-none focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/15" defaultValue={editingAddress?.details || ""} name="street" placeholder="Street and building" required /></label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-[#34434d]">Phone Number<input className="mt-2 h-14 w-full rounded-2xl border border-[#dfe5e1] px-5 outline-none focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/15" defaultValue={editingAddress?.phone || ""} name="phone" placeholder="01xxxxxxxxx" required /></label>
                <label className="block text-sm font-medium text-[#34434d]">City<input className="mt-2 h-14 w-full rounded-2xl border border-[#dfe5e1] px-5 outline-none focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/15" defaultValue={editingAddress?.city || ""} name="city" placeholder="City" required /></label>
              </div>
              <div className="grid gap-3 pt-2 sm:grid-cols-2">
                <button className="h-14 rounded-2xl bg-[#f1f3f5] font-semibold text-[#34434d] transition hover:bg-[#e7ebee]" onClick={() => { setIsFormOpen(false); setEditingAddress(null); }} type="button">Cancel</button>
                <button className="h-14 rounded-2xl bg-[#16a34a] font-semibold text-white shadow-lg shadow-green-700/15 transition hover:bg-[#12843e] disabled:opacity-60" disabled={isPending} type="submit">{isPending ? "Saving…" : editingAddress ? "Update" : "Save Address"}</button>
              </div>
            </form>
          </section>
        </div>
      )}
    </section>
  );
}
