

import FilterProduct from "@/components/admin/filter-product";
import ProductList from "@/components/admin/product/product-list";
import ProductsSkeleton from "@/components/admin/product/products-skeleton";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

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


  return (
    <div className="flex-1 flex flex-col gap-6 mx-auto w-full  h-full pb-6">
      <section className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-light">Productos</h1>
        </div>

        <Link href="/admin/products/create" className="bg-black p-2 px-4 text-white cursor-pointer text-sm rounded-md flex items-center gap-2 hover:bg-gray-800 transition-colors">
          <Plus className="inline-block" size={18} />
          Nuevo producto
        </Link>
      </section>

      {/* Filtros nombre, slug y categoria */}
      <FilterProduct />

      <Suspense fallback={<ProductsSkeleton />}>
        <ProductList params={params} />
      </Suspense>
    </div>
  );
}