import { notFound } from "next/navigation";
import Image from "next/image";
import { getCategoryDetails, getProductsByCategory } from "@/sevices/routeapi.sevice";
import ProductCard from "@/app/_component/ProductCard/ProductCard";
import HeaderSec from "@/app/_component/HeaderSec/HeaderSec";

export default async function CategoryPage({ params }: PageProps<"/categories/[id]">) {
  const { id } = await params;
  const [category, products] = await Promise.all([
    getCategoryDetails(id),
    getProductsByCategory(id),
  ]);

  if (!category) notFound();

  return (
    <main className="min-h-[60vh] bg-[#fbfcfb] pb-12">
      <HeaderSec
        title={category.name}
        description={`Browse products in ${category.name}`}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Categories", href: "/categories" }, { label: category.name }]}
        icon={<Image alt="" src={category.image} width={64} height={64} className="size-12 rounded-lg object-contain sm:size-14" />}
        variant="account"
      />
      <section className="mx-auto  px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-[#21313c]">{category.name} products</h2>
          {products && <p className="text-sm text-[#748078]">{products.length} products</p>}
        </div>
        {products === null ? (
          <div className="rounded-2xl border border-[#edf0f2] bg-white px-6 py-14 text-center text-[#687786]">
            We couldn’t load products right now. Please refresh the page to try again.
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-2xl border border-[#edf0f2] bg-white px-6 py-14 text-center text-[#687786]">
            There are no products in this category yet.
          </div>
        ) : (
          <div className="flex w-full flex-wrap">
            {products.map((product) => <ProductCard key={product._id} product={product} />)}
          </div>
        )}
      </section>
    </main>
  );
}
