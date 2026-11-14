import ProductDetails from "@/app/_component/ProductDetails/ProductDetails";
import { getAllProducts, getProductDetails } from "@/sevices/routeapi.sevice";

export default async function ProductDetailsPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const [product, products] = await Promise.all([
    getProductDetails(id),
    getAllProducts(),
  ]);

  if (!product) {
    return (
      <main className="mx-auto my-16 max-w-3xl rounded-xl border border-[#e5e7eb] bg-white p-8 text-center text-[#6a7282]">
        This product is unavailable right now.
      </main>
    );
  }

  const candidates = (products ?? []).filter((item) => item.id !== product.id);
  const sameCategory = candidates.filter(
    (item) => item.category?._id === product.category?._id,
  );
  const relatedProducts = [
    ...sameCategory,
    ...candidates.filter((item) => item.category?._id !== product.category?._id),
  ].slice(0, 4);

  return <ProductDetails product={product} relatedProducts={relatedProducts} />;
}
