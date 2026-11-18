"use client";

import HeaderSec from "@/app/_component/HeaderSec/HeaderSec";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Settings, UserRound } from "lucide-react";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isSettings = pathname.startsWith("/profile/settings");
  const links = [
    { label: "My Addresses", href: "/profile/addresses", icon: MapPin, active: !isSettings },
    { label: "Settings", href: "/profile/settings", icon: Settings, active: isSettings },
  ];

  return (
    <>
      <HeaderSec
        title="My Account"
        description="Manage your addresses and account settings"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "My Account" }]}
        icon={<UserRound size={29} fill="currentColor" />}
        variant="account"
      />
      <div className="min-h-115 bg-[#f8fafb] px-4 py-8 sm:px-6 lg:py-10">
        <div className="mx-auto grid  items-start gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
          <aside className="overflow-hidden rounded-2xl border border-[#edf0f2] bg-white shadow-sm">
            <h2 className="border-b border-[#edf0f2] px-5 py-5 text-lg font-bold text-[#17212b]">My Account</h2>
            <nav aria-label="My account" className="space-y-1 p-3">
              {links.map(({ label, href, icon: Icon, active }) => (
                <Link
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-3 rounded-2xl px-5 py-3.5 transition-colors ${active ? "bg-[#effbf3] text-[#008b48]" : "text-[#53616f] hover:bg-[#f7f9fa]"}`}
                  href={href}
                  key={href}
                >
                  <span className={`grid size-11 place-items-center rounded-xl ${active ? "bg-[#1cbd5e] text-white" : "bg-[#f1f3f5] text-[#6c7782]"}`}>
                    <Icon size={19}  />
                  </span>
                  <span className="flex-1 font-medium">{label}</span>
                  <span aria-hidden="true" className={`text-2xl leading-none ${active ? "text-[#1cbd5e]" : "text-[#98a2ad]"}`}>›</span>
                </Link>
              ))}
            </nav>
          </aside>
          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </>
  );
}
