
import { CatalogProduct } from "@/domain/catalog.types";
import { supabase } from "@/lib/supabase/client";
import { UUID } from "crypto";

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

export type ProductBySearchQueryType = {
  id: string;
  name: string;
  slug: string;
  price: number;
  categories: {
    name: string;
  }[];
  product_images: {
    url: string;
    is_main: boolean;
  }[];
  variants: {
    color_id: string;
  }[];
}

export async function searchProducts(query: string) {
  const { data } = await supabase.rpc("search_catalog_products", {
    search: query
  })

  return data
}

export async function getProductById(id: UUID): Promise<CatalogProduct | undefined> {
  const { data, error } = await supabase.rpc("get_product_by_id", {
    product_id: id
  })

  if (error) {
    console.error("RPC Error:", error);
    return undefined;
  }

  return data;
}
  