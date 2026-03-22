import FilterOrder from "@/components/admin/order/order-filter";
import OrderList from "@/components/admin/order/OrderList";
import ProductsSkeleton from "@/components/admin/product/products-skeleton";
import { Suspense } from "react";

export type Props = {
  searchParams: Promise<{
    status_filter?: string
    sort?: string
    page?: string
    search_query?: string
    limit?: number
  }>
}

export default async function OrdersPage({ searchParams }: Props) {
  const params = await searchParams

  return (
    <div className="flex-1 flex flex-col gap-6 mx-auto w-full  h-full pb-6">
      <section className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-light">Pedidos</h1>
        </div>
      </section>

      {/* Filtros nombre, slug y categoria */}
      <FilterOrder />

      <Suspense fallback={<ProductsSkeleton />}>
        <OrderList params={params} />
      </Suspense>
    </div>
  );
}