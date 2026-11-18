import HeaderSec from "@/app/_component/HeaderSec/HeaderSec";
import BrandCard from "@/app/_component/BrandCard/BrandCard";
import { getAllBrands } from "@/sevices/routeapi.sevice";
import { Store } from "lucide-react";

export default async function BrandsPage() {
  const brands = await getAllBrands();

  return (
    <main className="min-h-[60vh] bg-[#fbfcfb] pb-12">
      <HeaderSec
        title="Top Brands"
        description="Shop from your favorite brands"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Brands" }]}
        icon={<Store size={23} />}
        variant="brands"
      />
      <section className="mx-auto  px-4 py-8 sm:px-6 lg:px-8">
        {!brands?.length ? (
          <div className="rounded-2xl border border-[#edf0f2] bg-white px-6 py-14 text-center text-[#687786]">
            We couldn’t load brands right now. Please refresh the page to try again.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {brands.map((brand) => (
              <BrandCard key={brand._id} brand={brand} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
