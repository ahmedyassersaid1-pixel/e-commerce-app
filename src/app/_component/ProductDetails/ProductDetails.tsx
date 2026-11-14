import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  Check,
  ChevronRight,
  Heart,
  RotateCcw,
  Share2,
  ShieldCheck,
  Star,
  StarHalf,
  Truck,
} from "lucide-react";
import type { ProductType } from "@/types/route.type";
import type { ReactNode } from "react";
import AddToCartBtn from "@/app/_component/AddToCartBtn/AddToCartBtn";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-EG", { maximumFractionDigits: 2 }).format(price);
}

export default function ProductDetails({
  product,
  relatedProducts = [],
}: {
  product: ProductType;
  relatedProducts?: ProductType[];
}) {
  const price = product.priceAfterDiscount ?? product.price;
  const rating = product.ratingsAverage ?? 0;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const categoryName = product.category?.name ?? "Shop";
  const subcategoryName = product.subcategory?.[0]?.name;
  const gallery = [product.imageCover, ...(product.images ?? [])]
    .filter((image, index, images) => Boolean(image) && images.indexOf(image) === index)
    .slice(0, 4);

  return (
    <main className="bg-[#f8faf9] px-4 py-5 text-[#21313c] sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-1.5 text-xs text-[#8a9499] sm:mb-7 sm:text-sm">
          <Link href="/" className="transition-colors hover:text-[#16a34a]">Home</Link>
          <ChevronRight className="size-3.5" />
          <Link href="/shop" className="transition-colors hover:text-[#16a34a]">{categoryName}</Link>
          {subcategoryName && (
            <>
              <ChevronRight className="size-3.5" />
              <span>{subcategoryName}</span>
            </>
          )}
          <ChevronRight className="size-3.5" />
          <span className="max-w-40 truncate font-medium text-[#364153] sm:max-w-none">{product.title}</span>
        </nav>

        <section className="grid gap-7 rounded-2xl border border-[#e8ece9] bg-white p-4 shadow-[0_8px_28px_rgba(33,49,60,0.04)] sm:p-6 lg:grid-cols-2 lg:gap-10 lg:p-8">
          <div className="min-w-0">
            <div className="relative aspect-square overflow-hidden rounded-xl border border-[#edf0ee] bg-white p-3 sm:p-5">
              {product.priceAfterDiscount && (
                <span className="absolute top-4 left-4 z-10 rounded-md bg-[#ef4444] px-2.5 py-1 text-xs font-semibold text-white">
                  -{Math.round(((product.price - product.priceAfterDiscount) / product.price) * 100)}%
                </span>
              )}
              <Image
                src={product.imageCover}
                alt={product.title}
                fill
                priority
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-contain p-4 sm:p-7"
              />
              <button
                type="button"
                aria-label="Add to wishlist"
                className="absolute top-3 right-3 grid size-10 place-items-center rounded-full border border-[#edf0ee] bg-white text-[#6a7282] shadow-sm transition-colors hover:text-rose-500"
              >
                <Heart className="size-5" />
              </button>
            </div>

            <div className="mt-3 grid grid-cols-4 gap-2.5 sm:mt-4 sm:gap-3">
              {gallery.map((image, index) => (
                <div
                  className={`relative aspect-square overflow-hidden rounded-lg border bg-white p-1.5 sm:p-2 ${index === 0 ? "border-[#16a34a] ring-1 ring-[#16a34a]" : "border-[#e8ece9]"}`}
                  key={`${image}-${index}`}
                >
                  <Image
                    src={image}
                    alt={`${product.title} image ${index + 1}`}
                    fill
                    sizes="(min-width: 1024px) 10vw, 22vw"
                    className="object-contain p-1"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex min-w-0 flex-col py-1 sm:py-2 lg:py-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#eaf8ef] px-3 py-1 text-xs font-medium text-[#16833f]">
                {categoryName}
              </span>
              {product.brand?.name && (
                <span className="rounded-full bg-[#f2f4f6] px-3 py-1 text-xs font-medium text-[#6a7282]">
                  {product.brand.name}
                </span>
              )}
            </div>

            <h1 className="mt-4 text-2xl leading-tight font-bold tracking-[-0.4px] text-[#21313c] sm:text-3xl lg:text-[34px]">
              {product.title}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-1">
              <div className="flex items-center gap-0.5 text-[#f5b400]" aria-label={`Rated ${rating} out of 5`}>
                {[0, 1, 2, 3, 4].map((index) => {
                  const filled = index < fullStars;
                  const half = index === fullStars && hasHalfStar;

                  return filled ? (
                    <Star key={index} className="size-4" fill="currentColor" strokeWidth={1.8} />
                  ) : half ? (
                    <StarHalf key={index} className="size-4" fill="currentColor" strokeWidth={1.8} />
                  ) : (
                    <Star key={index} className="size-4" strokeWidth={1.8} />
                  );
                })}
              </div>
              <span className="text-sm font-semibold text-[#364153]">{rating.toFixed(1)}</span>
              <span className="text-sm text-[#8a9499]">({product.ratingsQuantity} reviews)</span>
              <span className="hidden h-4 w-px bg-[#e5e7eb] sm:block" />
              <span className="inline-flex items-center gap-1 text-xs font-medium text-[#16a34a]">
                <Check className="size-3.5" /> In Stock
              </span>
            </div>

            <div className="mt-5 flex flex-wrap items-baseline gap-2.5">
              <p className="text-[28px] leading-9 font-bold text-[#16a34a] sm:text-[32px]">
                {formatPrice(price)} EGP
              </p>
              {product.priceAfterDiscount && (
                <p className="text-base text-[#8a9499] line-through">{formatPrice(product.price)} EGP</p>
              )}
            </div>

            <p className="mt-4 border-t border-[#edf0ee] pt-4 text-sm leading-6 text-[#6a7282]">
              {product.description}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="text-sm font-semibold text-[#364153]">Quantity</span>
              <div className="inline-flex h-10 items-center overflow-hidden rounded-lg border border-[#e5e7eb]">
                <button type="button" aria-label="Decrease quantity" className="grid size-10 place-items-center text-lg text-[#6a7282] transition-colors hover:bg-[#f4f7f5]">−</button>
                <span className="grid h-full min-w-10 place-items-center border-x border-[#e5e7eb] px-3 text-sm font-medium">1</span>
                <button type="button" aria-label="Increase quantity" className="grid size-10 place-items-center text-lg text-[#364153] transition-colors hover:bg-[#f4f7f5]">+</button>
              </div>
              <span className="text-xs text-[#8a9499]">{product.quantity} available</span>
            </div>

            <div className="mt-5 flex items-center justify-between rounded-lg bg-[#f7f9f8] px-4 py-3.5">
              <span className="text-sm text-[#6a7282]">Total Price</span>
              <span className="text-lg font-bold text-[#16a34a]">{formatPrice(price)} EGP</span>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-[1.2fr_1fr]">
              {/* <button type="button" className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#16a34a] px-5 text-sm font-semibold text-white shadow-[0_3px_10px_rgba(22,163,74,0.18)] transition-colors hover:bg-[#12843d]">
                <ShoppingCart className="size-4.5" /> Add to Cart
              </button> */}
              <AddToCartBtn id={product.id} label={"Add to Cart"} css={"inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#16a34a] px-5 text-sm font-semibold text-white shadow-[0_3px_10px_rgba(22,163,74,0.18)] transition-colors hover:bg-[#12843d]"}/>
              <button type="button" className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#111827] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#273449]">
                Buy Now
              </button>
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-b border-[#edf0ee] pb-5 text-xs text-[#6a7282]">
              <button type="button" className="inline-flex items-center gap-1.5 transition-colors hover:text-[#16a34a]">
                <Heart className="size-4" /> Add to Wishlist
              </button>
              <button type="button" className="inline-flex items-center gap-1.5 transition-colors hover:text-[#16a34a]">
                <Share2 className="size-4" /> Share Product
              </button>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <ServiceItem icon={Truck} title="Free Delivery" detail="On orders over 500 EGP" />
              <ServiceItem icon={RotateCcw} title="Easy Returns" detail="14-day return policy" />
              <ServiceItem icon={ShieldCheck} title="Secure Payment" detail="100% protected checkout" />
            </div>
          </div>
        </section>

        <section className="mt-7 overflow-hidden rounded-2xl border border-[#e8ece9] bg-white sm:mt-9" id="about-product">
          <div className="flex flex-wrap gap-1 border-b border-[#edf0ee] px-4 sm:px-7">
            <a href="#about-product" className="border-b-2 border-[#16a34a] px-3 py-4 text-sm font-semibold text-[#16a34a] sm:px-4">Product Details</a>
            <a href="#reviews" className="px-3 py-4 text-sm text-[#6a7282] transition-colors hover:text-[#16a34a] sm:px-4">Reviews ({product.ratingsQuantity})</a>
            <a href="#shipping" className="px-3 py-4 text-sm text-[#6a7282] transition-colors hover:text-[#16a34a] sm:px-4">Shipping &amp; Returns</a>
          </div>

          <div className="grid gap-8 p-5 sm:p-7 lg:grid-cols-2 lg:gap-12 lg:p-8">
            <div>
              <h2 className="text-lg font-bold text-[#21313c]">About this Product</h2>
              <p className="mt-3 text-sm leading-7 text-[#6a7282]">{product.description}</p>
              <h3 className="mt-6 text-sm font-semibold text-[#364153]">Product Information</h3>
              <dl className="mt-3 divide-y divide-[#edf0ee] rounded-lg border border-[#edf0ee] text-sm">
                <InfoRow label="Category" value={categoryName} />
                <InfoRow label="Subcategory" value={subcategoryName ?? "—"} />
                <InfoRow label="Brand" value={product.brand?.name ?? "—"} />
                <InfoRow label="Availability" value={`${product.quantity} in stock`} />
                <InfoRow label="Rating" value={`${rating.toFixed(1)} / 5 (${product.ratingsQuantity} reviews)`} />
              </dl>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#21313c]">Key Features</h3>
              <ul className="mt-4 space-y-3">
                <FeatureItem>Quality selected by FreshCart</FeatureItem>
                <FeatureItem>Carefully checked before delivery</FeatureItem>
                <FeatureItem>Easy returns within 14 days</FeatureItem>
                <FeatureItem>Secure checkout and order support</FeatureItem>
              </ul>
              <div className="mt-7 rounded-xl bg-[#f2fbf5] p-4 sm:p-5" id="shipping">
                <p className="flex items-center gap-2 text-sm font-semibold text-[#16833f]">
                  <Truck className="size-4" /> Delivery and Returns
                </p>
                <p className="mt-2 text-sm leading-6 text-[#6a7282]">
                  Free delivery on orders over 500 EGP. Returns are accepted within 14 days of delivery.
                </p>
              </div>
            </div>

            <div className="border-t border-[#edf0ee] pt-6 lg:col-span-2" id="reviews">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-[#21313c]">Customer Reviews</h3>
                  <p className="mt-1 text-sm text-[#8a9499]">Based on {product.ratingsQuantity} customer reviews</p>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-[#fff9e8] px-3 py-2">
                  <Star className="size-5 fill-[#f5b400] text-[#f5b400]" />
                  <span className="font-bold text-[#364153]">{rating.toFixed(1)}</span>
                  <span className="text-sm text-[#8a9499]">/ 5</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {relatedProducts.length > 0 && (
          <section className="mt-8 sm:mt-10" aria-labelledby="related-products-title">
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-wide text-[#16a34a]">MORE TO EXPLORE</p>
                <h2 id="related-products-title" className="mt-1 text-xl font-bold text-[#21313c] sm:text-2xl">You May Also Like</h2>
              </div>
              <Link href="/shop" className="text-sm font-semibold text-[#16a34a] hover:text-[#12843d]">View all</Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
              {relatedProducts.map((related) => (
                <Link
                  key={related.id}
                  href={`/product-details/${related.id}`}
                  className="group overflow-hidden rounded-xl border border-[#e8ece9] bg-white p-3 transition-shadow hover:shadow-md sm:p-4"
                >
                  <div className="relative aspect-square overflow-hidden rounded-lg bg-[#f8faf9]">
                    <Image
                      src={related.imageCover}
                      alt={related.title}
                      fill
                      sizes="(min-width: 1024px) 22vw, 45vw"
                      className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-3 truncate text-sm font-medium text-[#364153]">{related.title}</p>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <span className="text-sm font-bold text-[#16a34a]">{formatPrice(related.priceAfterDiscount ?? related.price)} EGP</span>
                    <span className="inline-flex items-center gap-1 text-xs text-[#8a9499]">
                      <Star className="size-3.5 fill-[#f5b400] text-[#f5b400]" /> {related.ratingsAverage.toFixed(1)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function ServiceItem({
  icon: Icon,
  title,
  detail,
}: {
  icon: typeof Truck;
  title: string;
  detail: string;
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-lg bg-[#f7f9f8] p-3 sm:block sm:p-3.5">
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#e8f8ee] text-[#16a34a] sm:mb-2">
        <Icon className="size-4" />
      </span>
      <span className="min-w-0">
        <span className="block text-xs font-semibold text-[#364153]">{title}</span>
        <span className="mt-0.5 block text-[11px] text-[#8a9499]">{detail}</span>
      </span>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 px-4 py-3">
      <dt className="text-[#8a9499]">{label}</dt>
      <dd className="text-right font-medium text-[#364153]">{value}</dd>
    </div>
  );
}

function FeatureItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-sm text-[#6a7282]">
      <BadgeCheck className="mt-0.5 size-4 shrink-0 text-[#16a34a]" />
      <span>{children}</span>
    </li>
  );
}
