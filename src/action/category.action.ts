"use server";

import { getAllCategories } from "@/sevices/routeapi.sevice";

export async function loadCategoriesForMenu() {
  return getAllCategories();
}
