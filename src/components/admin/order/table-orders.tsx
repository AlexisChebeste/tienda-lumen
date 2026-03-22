import { Order } from "@/domain/order";
import { Eye } from "lucide-react";
import Link from "next/link";

export default function TableOrders({ orders }: { orders: Order[] }) {

    const statusNames: Record<string, string> = {
        "pending": "Pendiente",
        "processing": "En proceso",
        "shipped": "Enviado",
        "delivered": "Entregado",
        "cancelled": "Cancelado",
    };

    return (
        <div className="overflow-x-auto">
            <table className=" w-full border border-collapse rounded-md text-sm">
                <thead className="bg-gray-200">
                <tr>
                    <th className="text-left px-4 py-2.5 table-cell" scope="col">Pedido</th>
                    <th className="text-left px-4 py-2.5 hidden sm:table-cell" scope="col">Cliente</th>
                    <th className="text-left px-4 py-2.5 hidden md:table-cell" scope="col">Fecha</th>
                    <th className="text-left px-4 py-2.5 table-cell" scope="col">Total</th>
                    <th className=" px-4 py-2.5 table-cell text-center" scope="col">Estado</th>
                    <th className="text-right px-4 py-2.5 table-cell " scope="col"></th>
                </tr>
                </thead>
                <tbody className="text-stone-600 divide-y">
                {orders.length === 0 ? (
                    <tr>
                    <td colSpan={7} className="text-center py-10 text-sm text-muted-foreground">
                        No se encontraron pedidos.
                    </td>
                    </tr>
                ) : (
                
                orders?.map((order: Order) => {
                    
                    const orderDate = new Date(order.createdAt);
                    const formattedDate = orderDate.toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    });

                    const statusColors: Record<string, string> = {
                    "pending": "bg-yellow-100 text-yellow-800",
                    "processing": "bg-blue-100 text-blue-800",
                        "shipped": "bg-green-100 text-green-800",
                        "delivered": "bg-green-100 text-green-800",
                        "cancelled": "bg-red-100 text-red-800",
                    };

                    const statusColor = statusColors[order.status] || "bg-gray-100 text-gray-800";

                    const orderNumberFormatted = `#${order.orderNumber.toString().padStart(4, '0')}`;

                    return(
                    <tr key={order.id} className="border-t hover:bg-muted/30">
                        <td className="px-4  py-2.5 table-cell text-black">
                            <p className="text-sm">{orderNumberFormatted}</p>
                        </td>

                        <td className="px-4 py-2.5 font-medium hidden sm:table-cell">
                        <div className="flex flex-col">
                            <p className="text-sm text-black">{order.customerName}</p>
                            <p className="text-xs text-muted-foreground">{order.customerEmail}</p>
                        </div>
                        </td>

                        <td className="px-4 py-2.5 text-left hidden md:table-cell">
                            <p>{formattedDate}</p>
                        </td>

                        <td className="px-4 py-2.5 table-cell text-black">
                        <p>${order.total}</p>
                        </td>

                        <td className="px-4 py-2.5 table-cell text-center">
                        <span className={`inline-flex items-center justify-center rounded-full px-2 py-1 text-xs font-bold ${statusColor}`}>{statusNames[order.status] || order.status}</span>
                        </td>
                    
                        <td className="px-4 py-2.5 table-cell text-right">
                        <div className="flex items-center justify-center gap-4">
                            <Link href={`/admin/orders/${order.id}/view`}  
                            className="cursor-pointer p-1 rounded-full text-black hover:text-blue-500 hover:bg-sky-100 transition-colors "
                            >
                            <Eye className="h-4 w-4 " />
                            </Link>
                        </div>
                        </td>
                    </tr>
                    )
                }))}
                </tbody>

            </table>
        </div>
    )
}