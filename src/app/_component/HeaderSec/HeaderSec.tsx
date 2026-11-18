import Link from "next/link";
import type { ReactNode } from "react";

export type HeaderBreadcrumb = {
  label: string;
  href?: string;
};

type HeaderSecProps = {
  title: string;
  description?: string;
  breadcrumbs?: HeaderBreadcrumb[];
  icon?: ReactNode;
  variant?: "default" | "account" | "brands";
};

export default function HeaderSec({
  title,
  description,
  breadcrumbs = [{ label: "Home", href: "/" }],
  icon,
  variant = "default",
}: HeaderSecProps) {
  const isHighlighted = variant === "account" || variant === "brands";
  return (
    <section className={variant === "account" ? "bg-linear-to-r from-[#16b451] to-[#2bd66a] text-white" : variant === "brands" ? "bg-linear-to-r from-[#8429f6] to-[#ae39fa] text-white" : "border-b border-[#e8eee9]"}>
      <div className={`mx-auto px-4 lg:px-8 ${variant === "account" ? "py-14 sm:px-6 sm:py-16" : "py-8 sm:px-6 sm:py-10"}`}>
        <nav aria-label="Breadcrumb" className={`mb-5 flex items-center gap-2 text-sm ${isHighlighted ? "text-white/75" : "text-[#77837c]"}`}>
          {breadcrumbs.map((item, index) => (
            <span className="flex items-center gap-2" key={`${item.label}-${index}`}>
              {index > 0 && <span aria-hidden="true" className={isHighlighted ? "text-white/55" : "text-[#b6c0b9]"}>/</span>}
              {item.href && index < breadcrumbs.length - 1 ? (
                <Link className={`transition-colors ${isHighlighted ? "hover:text-white" : "hover:text-[#009966]"}`} href={item.href}>
                  {item.label}
                </Link>
              ) : (
                <span aria-current={index === breadcrumbs.length - 1 ? "page" : undefined} className={index === breadcrumbs.length - 1 ? (isHighlighted ? "font-semibold text-white" : "font-medium text-[#21313c]") : ""}>
                  {item.label}
                </span>
              )}
            </span>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          {icon && (
            <div className={`grid shrink-0 place-items-center rounded-2xl shadow-sm ${isHighlighted ? "size-16 bg-white/20 text-white ring-1 ring-white/30 sm:size-20" : "size-12 bg-white text-[#009966] ring-1 ring-[#e8eee9] sm:size-14"}`}>
              {icon}
            </div>
          )}
          <div>
            <h1 className={`font-bold tracking-tight ${isHighlighted ? "text-3xl text-white sm:text-4xl" : "text-2xl text-[#21313c] sm:text-3xl"}`}>{title}</h1>
            {description && <p className={`mt-1 ${isHighlighted ? "text-base text-white/85 sm:text-lg" : "text-sm text-[#68766e] sm:text-base"}`}>{description}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
