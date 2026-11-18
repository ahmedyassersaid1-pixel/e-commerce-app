import HeaderSec from "@/app/_component/HeaderSec/HeaderSec";
import CategoryCard from "@/app/_component/CategoryCard/CategoryCard";
import { getAllCategories } from "@/sevices/routeapi.sevice";

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <main className="min-h-[60vh] bg-[#fbfcfb] pb-12">
      <HeaderSec
        title="Shop by category"
        description="Choose a category to explore its products."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Categories" }]}
      />
      <section className="mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {!categories?.length ? (
          <div className="rounded-2xl border border-[#edf0f2] bg-white px-6 py-14 text-center text-[#687786]">
            We couldn’t load categories right now. Please refresh the page to try again.
          </div>
        ) : (
          <div className="flex w-full flex-wrap">
            {categories.map((category) => <CategoryCard key={category._id} category={category} />)}
          </div>
        )}
      </section>
    </main>
  );
}
