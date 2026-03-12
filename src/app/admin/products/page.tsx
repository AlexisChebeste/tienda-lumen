

import FilterProduct from "@/components/admin/filter-product";
import { ViewSelect } from "@/components/admin/view-select";
import Pagination from "@/components/shop/pagination";
import { SortSelect } from "@/components/shop/sort-select";
import { CatalogProduct } from "@/domain/catalog.types";
import { supabase } from "@/lib/supabase/client";
import { parseFilters, parsePriceRange } from "@/services/catalog.service";
import { getMaxPrice } from "@/services/filter.service";
import { Plus } from "lucide-react";

export type Props = {
  searchParams: Promise<{
    category?: string
    color?: string
    size?: string
    priceRange?: string
    sort?: string
    page?: string
    search_query?: string
    limit?: number
  }>
}




export default async function ProductsPage({ searchParams }: Props) {

  const params = await searchParams
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
    console.error("RPC Error:", error);
    return <div className="p-4">Error al cargar los productos.</div>;
  }

  const totalPages = Math.ceil(data.total / data.limit);

  return (
    <div className="flex-1 flex flex-col gap-6 max-w-7xl mx-auto w-full  h-full">
      <section className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-light">Products</h1>
          <p className="text-gray-500 mt-2">{data.data.length} productos en cátalogo</p>
        </div>

        <button className="bg-black p-2 px-4 text-white cursor-pointer text-sm rounded-md flex items-center gap-2">
          <Plus className="inline-block" size={18} />
          Nuevo producto
        </button>
      </section>

      {/* Filtros nombre, slug y categoria */}
      <FilterProduct />

      <section className="">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.data?.map((product: CatalogProduct) => (
            <div key={product.slug} className="border rounded-md p-4">
              <h3 className="font-bold">{product.name}</h3>
              <p className="text-gray-500">${product.basePrice.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </section>


      <div className="flex items-center justify-between  gap-4 mt-6">
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
        <div className="flex w-full items-center justify-center">
          <Pagination page={data.page} totalPages={totalPages} />
        </div>
      )}
    </div>
  );
}