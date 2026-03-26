import CardDashboard from "@/components/admin/dashboard/card-dashboard";
import { supabase } from "@/lib/supabase/client";
import { Archive, Award, ClipboardList, DollarSign, LineChart, Package, ShoppingCart, TriangleAlert } from "lucide-react";
import { toast } from "sonner";
import TableDashboard from "./table-dashboard";
import { StatusBadge } from "./status-badge";
import { SalesChart } from "./sales-rechart";

export interface DashboardData {
  stats: {
    products: number;
    orders: number;
    revenue: number;
    low_stock: number;
  };
  sales: {
    month: string;
    total: number;
  }[];
  top_products: TopProduct[];
  recent_orders: RecentOrder[];
  low_stock: ProductStock[];
}

interface ProductStock {
    variant_id: string;
    product_id: string;
    product_name: string;
    sku: string;
    stock: number;
    color: string;
    size: string;
}

interface TopProduct {
    product_id: string;
    product_name: string;
    total_sold: number;
    revenue: number;
}

interface RecentOrder {
    id: string;
    order_number: number;
    customer_name: string;
    total: number;
    status: string;
    created_at: string;
}

export default async function ResumeDashboard(){

    const { data, error } = await supabase.rpc("get_dashboard_data");

    if (error) {
        toast.error("Error al cargar los datos del dashboard");
        return <div className="text-red-500">Error al cargar los datos del dashboard</div>;
    }

    const dashboardData: DashboardData = data;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
            <CardDashboard title="Productos" value={dashboardData.stats.products }  resume icon={<Package className="size-4"/>} description="2 pendientes"/>
            <CardDashboard title="Pedidos Totales" value={dashboardData.stats.orders}  resume icon={<ShoppingCart className="size-4"/>} description="5 pendientes"/>
            <CardDashboard title="Ingresos Totales" value={`$${dashboardData.stats.revenue}`}  resume icon={<DollarSign className="size-4"/>} description="Pagos confirmados"/>
            <CardDashboard title="Stock Bajo" value={dashboardData.stats.low_stock}  resume icon={<TriangleAlert className="size-4"/>} description="Productos con stock crítico"/>

            <CardDashboard title="Ventas por mes" icon={<LineChart className="size-4"/>} description="Ingresos de los ultimos meses"  className="col-span-full lg:col-span-2">
                <SalesChart data={dashboardData.sales} />
            </CardDashboard>

            <CardDashboard title="Productos más vendidos"  icon={<Award className="size-4"/>} description="Top 5 por cantidad vendida" className="col-span-full lg:col-span-2"
            >
                <TableDashboard
                    columns={[
                        { key: "producto", label: "Producto" },
                        { key: "cantidad", label: "Cantidad" },
                        { key: "ingresos", label: "Ingresos" }
                    ]}
                    data={dashboardData.top_products}
                    renderMobile={(product: TopProduct) => (
                        <div className="border rounded-lg p-3">
                        <p className="font-semibold">{product.product_name}</p>
                        <p className="text-sm text-gray-500">
                            Cantidad: {product.total_sold}
                        </p>
                        <p className="font-medium">
                            ${product.revenue}
                        </p>
                        </div>
                    )}
                    dataFormatters={
                        dashboardData.top_products.map(product => ({ 
                            producto: product.product_name, 
                            cantidad: product.total_sold, 
                            ingresos: `$${product.revenue}` 
                        }))
                    }
                />
            </CardDashboard>

            <CardDashboard title="Pedidos Recientes"   icon={<ClipboardList className="size-4"/>} description="Ultimos 5 pedidos" className="col-span-full ">

                <TableDashboard
                    columns={[
                        { key: "número de pedido", label: "Número de Pedido" },
                        { key: "cliente", label: "Cliente" },
                        { key: "total", label: "Total" },
                        { key: "estado", label: "Estado" },
                        { key: "fecha", label: "Fecha" }
                    ]}
                    data={dashboardData.recent_orders}
                    renderMobile={(order: RecentOrder) => (
                        <div className="border rounded-lg p-3">
                            <div className="flex justify-between">
                                <span className="font-semibold">
                                #{order.order_number.toString().padStart(5, "0")}
                                </span>
                                <StatusBadge status={order.status} />
                            </div>

                            <p className="text-sm text-gray-500">
                                {order.customer_name}
                            </p>

                            <p className="font-medium">
                                {order.total}
                            </p>
                        </div>
                    )}
                    dataFormatters={dashboardData.recent_orders.map(order => ({ 
                        "número de pedido": order.order_number, 
                            cliente: order.customer_name, 
                            total: `$${order.total}`, 
                            estado: <StatusBadge status={order.status} />, 
                            fecha: new Date(order.created_at).toLocaleDateString() 
                        }))
                    }
                    
                />
                
            </CardDashboard>

            {dashboardData.low_stock.length > 0 && (
                <CardDashboard title="Alertas de Stock"  icon={<Archive className="size-4"/>} description="Variantes con bajo inventario"className="col-span-full">
                    <TableDashboard
                        columns={[
                            { key: "sku", label: "SKU" },
                            { key: "producto", label: "Producto" },
                            { key: "color", label: "Color" },
                            { key: "talla", label: "Talla" },
                            { key: "stock", label: "Stock" }
                        ]}
                        data={dashboardData.low_stock}
                        renderMobile={(item: ProductStock) => {
                            const isCritical = item.stock <= 2;
                            const isWarning = item.stock <= 5;

                            const maxStock = 300; // Define un valor máximo para la barra de progreso
                            const percentage = Math.min((item.stock / maxStock) * 100, 100);

                            return (
                            <div
                                key={item.variant_id}
                                className="border rounded-lg p-3 flex flex-col gap-2 bg-white"
                            >
                                {/* Header */}
                                <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-medium text-sm">
                                    {item.product_name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                    {item.color} / {item.size}
                                    </p>
                                </div>

                                {/* Badge */}
                                <span
                                    className={`
                                    px-2 py-1 text-xs rounded-full font-medium
                                    ${isCritical && "bg-red-100 text-red-700"}
                                    ${!isCritical && isWarning && "bg-yellow-100 text-yellow-700"}
                                    `}
                                >
                                    {item.stock} unidades
                                </span>
                                </div>

                                {/* SKU */}
                                <p className="text-xs text-gray-400">
                                SKU: {item.sku}
                                </p>

                                {/* CONTEXTO + BARRA */}
                                <div className="flex flex-col gap-1">
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>Stock disponible</span>
                                    <span>{item.stock} / {maxStock}</span>
                                </div>

                                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                    className={`
                                        h-full transition-all duration-300
                                        ${isCritical && "bg-red-500"}
                                        ${!isCritical && isWarning && "bg-yellow-500"}
                                    `}
                                    style={{ width: `${percentage}%` }}
                                    />
                                </div>
                                </div>
                            </div>
                            );
                        }}
                        dataFormatters={
                            dashboardData.low_stock.map(item => ({ 
                                sku: item.sku, 
                                producto: item.product_name, 
                                color: item.color, 
                                talla: item.size, 
                                stock: ( <span className={ item.stock <= 2 ? "text-red-600 font-semibold" : item.stock <= 5 ? "text-yellow-600" : "" }> {item.stock} </span> ) 
                            }))
                        }
                />
                </CardDashboard>
            )}
        </div>
    );
}