// export type ApiResult<T> = {
//   data: T[];
//   error: string | null;
// };

import type { Brand, CategoryType, ProductType } from "@/types/route.type";

// type ProductsResponse<T> = {
//   data?: T[];
//   message?: string;
// };

export async function getAllProducts(): Promise<ProductType[]|null> {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products`,
      { cache: "force-cache" }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();

    // console.log("Products:", result.data);

    return result.data;
  } catch (error) {
    console.error("Fetch error details:", error);
    return null;
  }
}
export async function getProductDetails(id:string): Promise<ProductType|null> {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();

    // console.log("Product:", result.data);

    return result.data;
  } catch (error) {
    console.error("Fetch error details:", error);
    return null;
  }
}
export async function getAllCategories(): Promise<CategoryType[]|null> {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();

    // console.log("categories:", result.data);

    return result.data;
  } catch (error) {
    console.error("Fetch error details:", error);
    return null;
  }
}

export async function getAllBrands(): Promise<Brand[] | null> {
  try {
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/brands", {
      cache: "no-store",
    });
    if (!response.ok) return null;

    const result = await response.json();
    return result.data ?? [];
  } catch (error) {
    console.error("Brands fetch error:", error);
    return null;
  }
}

export async function getCategoryDetails(id: string): Promise<CategoryType | null> {
  try {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${encodeURIComponent(id)}`);
    if (!response.ok) return null;
    const result = await response.json();
    return result.data ?? null;
  } catch (error) {
    console.error("Category fetch error:", error);
    return null;
  }
}

export async function getProductsByCategory(categoryId: string): Promise<ProductType[] | null> {
  try {
    const params = new URLSearchParams();
    params.set("category[in]", categoryId);
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products?${params.toString()}`);
    if (!response.ok) return null;
    const result = await response.json();
    return result.data ?? [];
  } catch (error) {
    console.error("Category products fetch error:", error);
    return null;
  }
}

export async function getProductsByKeyword(keyword: string): Promise<ProductType[] | null> {
  const trimmedKeyword = keyword.trim();
  if (!trimmedKeyword) return [];

  try {
    const params = new URLSearchParams();
    params.set("keyword", trimmedKeyword);
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products?${params.toString()}`, {
      cache: "no-store",
    });
    if (!response.ok) return null;
    const result = await response.json();
    return result.data ?? [];
  } catch (error) {
    console.error("Product search error:", error);
    return null;
  }
}

