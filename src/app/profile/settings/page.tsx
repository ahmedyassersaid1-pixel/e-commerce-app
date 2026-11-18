"use client";

import { FormEvent, useEffect, useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { Eye, LockKeyhole, Save, UserRound } from "lucide-react";
import { loadCurrentUser, saveCurrentUser, saveNewPassword } from "@/action/profile.action";
import { toast } from "@/components/ui/toast";

const inputClass = "mt-2 h-[62px] w-full rounded-2xl border border-[#dfe4e9] bg-white px-5 text-base text-[#273640] outline-none transition placeholder:text-[#9aa3ad] focus:border-[#16a34a] focus:ring-4 focus:ring-[#16a34a]/10";

type UserDetails = { name: string; email: string; phone: string; _id?: string; role?: string };

function unpackUser(payload: unknown): Partial<UserDetails> {
  if (!payload || typeof payload !== "object") return {};
  const outer = payload as Record<string, unknown>;
  const user = (outer.user || outer.data || outer) as Record<string, unknown>;
  return {
    name: typeof user.name === "string" ? user.name : "",
    email: typeof user.email === "string" ? user.email : "",
    phone: typeof user.phone === "string" ? user.phone : "",
    _id: typeof user._id === "string" ? user._id : undefined,
    role: typeof user.role === "string" ? user.role : undefined,
  };
}

export default function AccountSettingsPage() {
  const { data: session } = useSession();
  const [user, setUser] = useState<UserDetails>({ name: session?.user?.name || "", email: session?.user?.email || "", phone: "" });
  const [passwords, setPasswords] = useState({ currentPassword: "", password: "", rePassword: "" });
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    void loadCurrentUser().then((result) => {
      if (result.ok) setUser((current) => ({ ...current, ...unpackUser(result.data) }));
      else setMessage(result.message || "Could not load your profile.");
    });
  }, []);

  function submitProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    startTransition(async () => {
      const result = await saveCurrentUser(user);
      setMessage(result.message);
    });
  }

  function submitPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (passwords.password !== passwords.rePassword) {
      toast.add({ type: "error", description: "The new password and confirmation do not match." });
      return;
    }
    if (passwords.password.length < 6) {
      toast.add({ type: "error", description: "The new password must be at least 6 characters." });
      return;
    }
    if (passwords.currentPassword === passwords.password) {
      toast.add({ type: "error", description: "Choose a new password that is different from your current password." });
      return;
    }
    startTransition(async () => {
      try {
        const result = await saveNewPassword(passwords);
        toast.add({
          type: result.ok ? "success" : "error",
          description: result.message || (result.ok ? "Password changed successfully." : "Could not change your password."),
        });

        if (result.ok) {
          setPasswords({ currentPassword: "", password: "", rePassword: "" });
          setVisiblePasswords({});
          setMessage("");
        }
      } catch {
        toast.add({ type: "error", description: "Could not change your password. Please try again." });
      }
    });
  }

  return (
    <div className="space-y-7">
      <div>
        <h2 className="text-2xl font-bold text-[#17212b]">Account Settings</h2>
        <p className="mt-1 text-[#687786]">Update your profile information and change your password</p>
      </div>
      {message && <p aria-live="polite" className={`rounded-xl px-4 py-3 text-sm ${message.includes("successfully") || message.includes("updated") ? "bg-[#effbf3] text-[#08733d]" : "bg-[#fff5f3] text-[#a33d32]"}`}>{message}</p>}

      <section className="overflow-hidden rounded-[28px] border border-[#edf0f2] bg-white shadow-sm">
        <form className="space-y-6 p-6 sm:p-10" onSubmit={submitProfile}>
          <div className="flex items-center gap-5">
            <span className="grid size-17.5 place-items-center rounded-2xl bg-[#dcfce8] text-[#16a34a]"><UserRound size={27} fill="currentColor" /></span>
            <div><h3 className="text-xl font-bold text-[#17212b]">Profile Information</h3><p className="text-[#687786]">Update your personal details</p></div>
          </div>
          <label className="block text-base text-[#26343e]">Full Name<input className={inputClass} onChange={(event) => setUser({ ...user, name: event.target.value })} required value={user.name} /></label>
          <label className="block text-base text-[#26343e]">Email Address<input className={inputClass} onChange={(event) => setUser({ ...user, email: event.target.value })} placeholder="Enter your email" required type="email" value={user.email} /></label>
          <label className="block text-base text-[#26343e]">Phone Number<input className={inputClass} onChange={(event) => setUser({ ...user, phone: event.target.value })} placeholder="01xxxxxxxxx" type="tel" value={user.phone} /></label>
          <button className="inline-flex h-15 items-center gap-3 rounded-2xl bg-[#16a34a] px-8 font-bold text-white shadow-lg shadow-green-700/15 transition hover:bg-[#12843e] disabled:opacity-60" disabled={isPending} type="submit"><Save size={19} fill="currentColor" /> {isPending ? "Saving…" : "Save Changes"}</button>
        </form>
        <div className="border-t border-[#edf0f2] bg-[#f8fafb] px-6 py-6 sm:px-10">
          <h3 className="font-bold text-[#26343e]">Account Information</h3>
          <div className="mt-4 flex justify-between gap-4 text-[#687786]"><span>User ID</span><span className="text-right">{user._id || session?.id || "—"}</span></div>
          <div className="mt-4 flex justify-between gap-4 text-[#687786]"><span>Role</span><span className="rounded-lg bg-[#dcfce8] px-3 py-1 text-sm text-[#008b48]">{user.role || session?.user?.role || "User"}</span></div>
        </div>
      </section>

      <section className="rounded-[28px] border border-[#edf0f2] bg-white p-6 shadow-sm sm:p-10">
        <div className="mb-7 flex items-center gap-5">
          <span className="grid size-17.5 place-items-center rounded-2xl bg-[#fff2c7] text-[#e87900]"><LockKeyhole size={26} fill="currentColor" /></span>
          <div><h3 className="text-xl font-bold text-[#17212b]">Change Password</h3><p className="text-[#687786]">Update your account password</p></div>
        </div>
        <form className="space-y-6" onSubmit={submitPassword}>
          {[
            { key: "currentPassword" as const, label: "Current Password", placeholder: "Enter your current password" },
            { key: "password" as const, label: "New Password", placeholder: "Enter your new password", hint: "Must be at least 6 characters" },
            { key: "rePassword" as const, label: "Confirm New Password", placeholder: "Confirm your new password" },
          ].map(({ key, label, placeholder, hint }) => (
            <label className="block text-base text-[#26343e]" key={key}>{label}<span className="relative block"><input autoComplete={key === "currentPassword" ? "current-password" : "new-password"} className={`${inputClass} pr-14`} onChange={(event) => setPasswords({ ...passwords, [key]: event.target.value })} placeholder={placeholder} required type={visiblePasswords[key] ? "text" : "password"} value={passwords[key]} /><button aria-label={`${visiblePasswords[key] ? "Hide" : "Show"} ${label.toLowerCase()}`} aria-pressed={Boolean(visiblePasswords[key])} className="absolute right-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-lg text-[#8995a0] transition hover:bg-[#f2f5f3] hover:text-[#159447] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16a34a]" onClick={() => setVisiblePasswords((current) => ({ ...current, [key]: !current[key] }))} type="button"><Eye aria-hidden="true" size={20} /></button></span>{hint && <span className="mt-1 block text-sm text-[#687786]">{hint}</span>}</label>
          ))}
          <button className="inline-flex h-15 items-center gap-3 rounded-2xl bg-[#e87900] px-8 font-bold text-white shadow-lg shadow-orange-700/15 transition hover:bg-[#ca6800] disabled:opacity-60" disabled={isPending} type="submit"><LockKeyhole size={19} fill="currentColor" /> {isPending ? "Updating…" : "Change Password"}</button>
        </form>
      </section>
    </div>
  );
}
