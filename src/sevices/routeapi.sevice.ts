// export type ApiResult<T> = {
//   data: T[];
//   error: string | null;
// };

import { registerSchemaType } from "@/schemas/auth.schema";
import { CategoryType, ProductType } from "@/types/route.type";

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

