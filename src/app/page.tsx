import ProductCard from "./_component/ProductCard/ProductCard";
import Header from "./_component/Header/Header";
import Slider from "./_component/Slider/Slider";
import Herosection from "./_component/HeroSection/Herosection";
import { getAllProducts,getAllCategories } from "@/sevices/routeapi.sevice";
import CategoryCard from "./_component/CategoryCard/CategoryCard";
import ScrollTriggered from './_component/ScrollTriggered/ScrollTriggered';
import Newsletter from "./_component/Newsletter/Newsletter";
import { CategoryType } from "@/types/route.type";


export default async function Home() {
  const data = await getAllProducts();
  const categories = await getAllCategories();
  return (<>
  
  
      <section className="">
        {/* slider */}
        <Slider/>
        {/* hero sec */}
        <Herosection/>
      </section>
    <main className="mx-auto w-full  px-4 py-8 sm:px-6 lg:px-8">
      <section aria-labelledby="featured-products-heading mx-auto  lg:w-full lg:px-[16px]">
        <Header firstWord={"Shop By"} secondWord={"Category"} />

        <div className="flex w-full flex-wrap ">
          {categories?.map((category:CategoryType) => (
       
           <CategoryCard key={category._id} category={category} />
          ))}
        </div>
      </section>
      {/* animated cards */}
      <ScrollTriggered />
      <section aria-labelledby="featured-products-heading mx-auto  lg:w-full lg:px-[16px]">
        <Header firstWord={"Featured"} secondWord={"Products"} />

        <div className="flex w-full flex-wrap ">
          {data?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
    <Newsletter />
      <Herosection/>
  </>
  );
}
