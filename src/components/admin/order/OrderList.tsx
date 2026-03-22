import { ViewSelect } from "@/components/admin/view-select";
import Pagination from "@/components/shop/pagination";
import { SortSelect } from "@/components/shop/sort-select";
import { supabase } from "@/lib/supabase/client";
import TableOrders from "./table-orders";
import { GetOrdersResponse, Order } from "@/domain/order";

type OrderListProps = {
  params: {
    status_filter?: string
    sort?: string
    page?: string
    search_query?: string
    limit?: number
  }
}

export default async function OrderList({ params }: OrderListProps) {

  const pagination = {
    page: Number(params.page) || 1,
    limit: Number(params.limit) || 10,
    sort: params.sort as "price-asc" | "price-desc" |  "recent" | "name-asc" | "name-desc" || 'recent',
    search_query: params.search_query || null,
    status_filter: params.status_filter || null
  }

  const { data, error } = await supabase.rpc("get_orders", {
    page_number: pagination.page,
    page_size: pagination.limit,
    status_filter: pagination.status_filter,
    search_query: pagination.search_query,
    payment_status_filter: null,
    sort_option: pagination.sort
  })

  if (error) {
    console.error("Error fetching orders:", error);
    return <div className="p-4">Error al cargar los pedidos.</div>;
  }

  const orders = data as GetOrdersResponse
  const totalPages = Math.ceil(orders.total / orders.limit);

  
  return (
    <>
      <TableOrders orders={orders.data as Order[]} />

      <div className="flex flex-col sm:flex-row items-center justify-between  gap-4 pb-6">
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
          <Pagination page={orders.page} totalPages={totalPages} />
        </div>
      )}
    </>
  )
}