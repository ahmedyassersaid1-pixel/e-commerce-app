import { Search } from "lucide-react";
import HeaderSec from "@/app/_component/HeaderSec/HeaderSec";
import ProductCard from "@/app/_component/ProductCard/ProductCard";
import { getAllProducts, getProductsByKeyword } from "@/sevices/routeapi.sevice";

export default async function ShopPage({ searchParams }: PageProps<"/shop">) {
  const { q } = await searchParams;
  const query = typeof q === "string" ? q.trim() : "";
  const products = query ? await getProductsByKeyword(query) : await getAllProducts();

  return (
    <main className="min-h-[60vh] bg-[#fbfcfb] pb-12">
      <HeaderSec
        title={query ? `Search results for “${query}”` : "Shop all products"}
        description={query ? "Products matching your search" : "Browse our full collection."}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: query ? "Search" : "Shop" }]}
        icon={<Search size={23} />}
      />
      <section className="mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {products === null ? (
          <div className="rounded-2xl border border-[#edf0f2] bg-white px-6 py-14 text-center text-[#687786]">
            We couldn’t load products right now. Please try again.
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-2xl border border-[#edf0f2] bg-white px-6 py-14 text-center">
            <h2 className="text-lg font-semibold text-[#21313c]">No products found</h2>
            <p className="mt-2 text-sm text-[#687786]">Try a different product name or keyword.</p>
          </div>
        ) : (
          <>
            <p className="mb-3 text-sm text-[#748078]">{products.length} products</p>
            <div className="flex w-full flex-wrap">
              {products.map((product) => <ProductCard key={product._id} product={product} />)}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
