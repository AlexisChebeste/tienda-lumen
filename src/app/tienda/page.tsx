
import ShopView from "@/components/shop/shop-view"
import { ProductData } from "@/domain/filters.types"
import { supabase } from "@/lib/supabase/client"
import { getProductsSearch, parseFilters, parsePriceRange } from "@/services/catalog.service"
import { getMaxPrice } from "@/services/filter.service"

type Props = {
  searchParams: Promise<{
    category?: string
    color?: string
    size?: string
    priceRange?: string
    sort?: string
    page?: string
  }>
}

export default async function ShopPage({ searchParams }: Props) {
  const params = await searchParams
  const filters =  parseFilters(params)
  const price = parsePriceRange(params.priceRange)
  
  const pagination = {
    page: Number(params.page) || 1,
    limit: 10,
    sort: params.sort as "price-asc" | "price-desc" |  "recent" | "name-asc" | "name-desc" || 'recent'
  }

  const maxPrice = await getMaxPrice()

  const { data, error } = await supabase.rpc("get_catalog_products", {
    page_number: pagination.page,
    page_size: pagination.limit,

    category_slugs: filters.category?.length ? filters.category : null,
    color_ids: filters.color?.length ? filters.color : null,
    size_ids: filters.size?.length ? filters.size : null,

    min_price: price.min || 0,
    max_price: price.max || maxPrice,

    sort_option: pagination.sort
  })

  if (error) {
    console.error("RPC Error:", error);
    return <div className="p-4">Error al cargar los productos.</div>;
  }

  return (
    <ShopView
      products={data.data}
      total={data.total}
      page={data.page}
      limit={data.limit}
      maxPrice={maxPrice}
    />
  )
}