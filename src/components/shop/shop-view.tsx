import { CatalogProduct } from "@/domain/catalog.types";
import ProductCard from "../product-card";
import FilterSection from "./filter-section";
import FilterSectionMobile from "./filter-section-mobile";
import { SortSelect } from "./sort-select";
import { Suspense } from "react";
import Pagination from "./pagination";

type Props = {
  products: CatalogProduct[]
  total: number
  page: number
  limit: number
  maxPrice: number
}

export default async function ShopView({
  products,
  total,
  page,
  limit,
  maxPrice
}: Props) {
    const totalPages = Math.ceil(total / limit);

    if (!products) {
      return <div className="p-4">Cargando productos...</div>;
    }
  
    return (

        <main className="flex-1 grid grid-cols-1 lg:grid-cols-5 max-w-7xl mx-auto w-full p-4 gap-6 items-start h-full">

          <Suspense fallback={<div className="p-4">Cargando filtros...</div>}>
              <FilterSection maxPrice={maxPrice} />
          </Suspense>
          <Suspense fallback={null}>
              <FilterSectionMobile maxPrice={maxPrice} />
          </Suspense>
        
          {/* Aquí iría el listado de productos */}
          {products.length === 0 ? (
            <section className="col-span-4 flex flex-col gap-2 py-2 ">
              <p className="text-center col-span-full py-24 text-gray-500">No se encontraron productos que coincidan con los filtros seleccionados.</p>
            </section>
          ) : (
            <section className="col-span-4 flex flex-col gap-2 py-2">
              <div className="hidden justify-between items-center px-3 lg:flex gap-10">
                <p className="text-sm text-gray-500 w-full">{total} {total === 1 ? 'producto' : 'productos'}</p>
                <SortSelect />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-12 p-2 lg:grid-cols-3  mx-auto h-full w-full">
                {products.length === 0 ? (
                  <p className="text-center col-span-full py-24 text-gray-500">No se encontraron productos que coincidan con los filtros seleccionados.</p>
                ) : (
                products.map(product => (
                  <ProductCard key={product.id} product={product} />
                )))}
              </div>
              {totalPages > 1 && (
                  <div className="flex justify-center mt-10">
                      <Pagination page={page} totalPages={totalPages} />
                  </div>
              )}
            </section>
        )}

        </main>
    )
}