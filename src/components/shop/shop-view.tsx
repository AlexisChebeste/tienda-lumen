import { CatalogProduct } from "@/domain/catalog.types";
import Footer from "../footer";
import ProductCard from "../product-card";
import { Loader2 } from "lucide-react";
import FilterSection from "./filter-section";
import FilterSectionMobile from "./filter-section-mobile";
import Header from "../header";
import { SortSelect } from "./sort-select";
import { Suspense } from "react";

type Props = {
  products: CatalogProduct[]
  total: number
  page: number
  limit: number
}

export default function ShopView({
  products,
  total,
  page,
  limit
}: Props) {
    const totalPages = Math.ceil(total / limit);
    return (
        <div className="flex min-h-screen flex-col ">
      <Header />

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-5 max-w-7xl mx-auto w-full p-4 gap-6 items-start h-full">

        <Suspense fallback={<div className="p-4">Cargando filtros...</div>}>
            <FilterSection />
        </Suspense>
        <Suspense fallback={null}>
            <FilterSectionMobile />
        </Suspense>
       
        {/* Aquí iría el listado de productos */}
        {products.length === 0 ? (
          <section className="col-span-4 flex flex-col gap-2 py-2 ">
            <p className="text-center col-span-full py-24 text-gray-500">No se encontraron productos que coincidan con los filtros seleccionados.</p>
          </section>
        ) : (
          <section className="col-span-4 flex flex-col gap-2 py-2 ">
            <div className="hidden justify-between items-center px-3 lg:flex">
              <p className="text-sm text-gray-500">{total} {total === 1 ? 'producto' : 'productos'}</p>
              <SortSelect />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-12 p-2 lg:grid-cols-3  mx-auto h-full">
              {products.length === 0 ? (
                <p className="text-center col-span-full py-24 text-gray-500">No se encontraron productos que coincidan con los filtros seleccionados.</p>
              ) : (
              products.map(product => (
                <ProductCard key={product.id} product={product} />
              )))}
            </div>
            {/* {totalPages > 1 && (
                <div className="flex justify-center mt-10">
                    <Pagination page={page} totalPages={totalPages} />
                </div>
            )} */}
          </section>
      )}

      </main>

      <Footer />
    </div>
    )
}