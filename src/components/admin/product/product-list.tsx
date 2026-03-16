

import { Props } from "@/app/admin/products/page";
import CardsProducts from "@/components/admin/cards-products";
import TableProducts from "@/components/admin/table-products";
import { ViewSelect } from "@/components/admin/view-select";
import Pagination from "@/components/shop/pagination";
import { SortSelect } from "@/components/shop/sort-select";
import { CatalogProduct } from "@/domain/catalog.types";
import { supabase } from "@/lib/supabase/client";
import { parseFilters, parsePriceRange } from "@/services/catalog.service";
import { getMaxPrice } from "@/services/filter.service";

type ProductListProps = {
  params: {
    category?: string
    color?: string
    size?: string
    priceRange?: string
    sort?: string
    page?: string
    search_query?: string
    limit?: number
  }
}

export default async function ProductList({ params }: ProductListProps) {

  const filters =  parseFilters(params)
  const price = parsePriceRange(params.priceRange)

  const maxPrice = await getMaxPrice()

  const pagination = {
    page: Number(params.page) || 1,
    limit: Number(params.limit) || 5,
    sort: params.sort as "price-asc" | "price-desc" |  "recent" | "name-asc" | "name-desc" || 'recent'
  }

  const { data, error } = await supabase.rpc("get_catalog_products", {
    page_number: pagination.page,
    page_size: pagination.limit,

    category_slugs: filters.category?.length ? filters.category : null,
    color_ids: filters.color?.length ? filters.color : null,
    size_ids: filters.size?.length ? filters.size : null,

    min_price: price.min || 0,
    max_price: price.max || maxPrice,

    search_query: params.search_query || null,

    sort_option: pagination.sort
  })

  if (error) {
    console.error("Error fetching products:", error);
    return <div className="p-4">Error al cargar los productos.</div>;
  }

  const totalPages = Math.ceil(data.total / data.limit);

  
  return (
    <>
      <CardsProducts products={data.data as CatalogProduct[]} />

      <TableProducts products={data.data as CatalogProduct[]} />

      <div className="flex items-center justify-between  gap-4 pb-6">
        <div className="flex items-center gap-2 w-max">
          <span className="text-sm text-gray-500 min-w-max">Ordenar por:</span>
          <SortSelect />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Mostrar:</span>
          <ViewSelect />
        </div>
      </div>
        
      {totalPages > 1 &&(
        <div className="flex w-full items-center justify-center pb-6">
          <Pagination page={data.page} totalPages={totalPages} />
        </div>
      )}
    </>
  )
}