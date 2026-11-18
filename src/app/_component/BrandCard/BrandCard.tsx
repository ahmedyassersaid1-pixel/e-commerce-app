import Image from "next/image";
import type { Brand } from "@/types/route.type";

export default function BrandCard({ brand }: { brand: Brand }) {
  return (
    <article className="flex min-h-25 flex-col items-center justify-center rounded-lg border border-[#edf0f2] bg-white px-3 py-3 text-center shadow-sm transition-shadow hover:shadow-md">
      <Image
        src={brand.image}
        alt={brand.name}
        width={180}
        height={80}
        className="h-12 w-full object-contain"
      />
      <h2 className="mt-2 text-sm font-medium text-[#364153]">{brand.name}</h2>
    </article>
  );
}
