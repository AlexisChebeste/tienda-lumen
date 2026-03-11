
import { CatalogProduct } from "@/domain/catalog.types";
import { supabase } from "@/lib/supabase/client";

export interface QueryPaginationDto {
  page?: number;
  limit?: number;
  sort?: "price-asc" | "price-desc" | "recent" | "name-asc" | "name-desc";
}

export function parsePriceRange(range?: string) {
  if (!range) return { min: null, max: null }

  const [min, max] = range.split("-").map(Number)

  return {
    min: min ?? null,
    max: max ?? null
  }
}

export function parseFilters(searchParams: any) {

  const category = searchParams.category
    ? searchParams.category.split(",")
    : []

  const color = searchParams.color
    ? searchParams.color.split(",")
    : []

  const size = searchParams.size
    ? searchParams.size.split(",")
    : []

  const priceRange =
    searchParams.priceRange ? searchParams.priceRange.split("-").map(Number) : undefined

  return {
    category,
    color,
    size,
    priceRange
  }
}

export async function getProductBySlug(slug: string): Promise<CatalogProduct | undefined> {
  const { data, error } = await supabase.rpc("get_product_by_slug", {
    product_slug: slug
  })

  if (error) {
    console.error("RPC Error:", error);
    return undefined;
  }

  return data;

}

export type ProductPopularType = {
  id: string;
  name: string;
  slug: string;
  basePrice: number;
  image: string;
  category: {
    id: string;
    name: string;
    slug: string;
  }

}

export async function getProductsPopular(): Promise<ProductPopularType[] | undefined> {
  const { data, error } = await supabase.rpc("get_popular_products", {
    limit_count: 8
  })

  if (error) {
    console.error("RPC Error:", error);
    return undefined;
  }

  return data;
}