import { ChangeStatus } from "@/components/admin/order/change-status";
import { OrderView } from "@/domain/order";
import { getOrderById } from "@/services/orders.service";
import { UUID } from "crypto";
import { CreditCard, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

export default async function OrderViewPage({ params }: { params: Promise<{ orderId: UUID }> }) { 
    const { orderId } = await params; 
    
    const order : OrderView | null = await getOrderById(orderId as UUID); 
    
    if (!order) { return <div>Pedido no encontrado</div> }

    const orderDate = new Date(order.created_at);
    const formattedDate = orderDate.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    });
    const statusNames: Record<string, string> = {
        "pending": "Pendiente",
        "processing": "En proceso",
        "shipped": "Enviado",
        "delivered": "Entregado",
        "cancelled": "Cancelado",
    };

    const methodNames: Record<string, string> = {
        "card": "Tarjeta de Crédito",
        "paypal": "PayPal",
        "bank_transfer": "Transferencia Bancaria",
        "cash_on_delivery": "Pago contra entrega",
    };

    const paymentStatusNames: Record<string, string> = {
        "paid": "Pagado",
        "pending": "Pendiente",
        "failed": "Fallido",
        "refunded": "Reembolsado",
    };

    const statusColors: Record<string, string> = {
        "pending": "bg-yellow-100 text-yellow-800",
        "processing": "bg-blue-100 text-blue-800",
        "shipped": "bg-green-100 text-green-800",
        "delivered": "bg-green-100 text-green-800",
        "cancelled": "bg-red-100 text-red-800",
    };

    const statusColor = statusColors[order.status] || "bg-gray-100 text-gray-800";

    const orderNumberFormatted = `#${order.order_number.toString().padStart(4, '0')}`;

    const address = order.order_addresses[0]; 

  return (
    <div className="max-w-4xl mx-auto w-full p-4 sm:p-6 flex flex-col gap-8">

      {/* HEADER */}
      <div className="flex justify-between items-end border-b pb-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold">
            Pedido {orderNumberFormatted}
          </h1>
          <span className={`inline-block mt-2 px-3 py-1 w-max text-sm rounded-full ${statusColor}`}>
            {statusNames[order.status] || order.status}
          </span>
        </div>

        <p className="text-sm text-gray-500 h-full">
            {formattedDate}
        </p>

      </div>

      {/* CLIENTE */}
      <section className="flex flex-col gap-4 border-b pb-8">
        <h2 className="text-lg font-semibold">Información del Cliente</h2>

        <p className="font-medium">{order.customer_name}</p>
        <div className="flex gap-1 items-center">
            <Mail className="inline-block mr-1 text-gray-500" size={19} />
            <p className="text-sm text-gray-600">{order.customer_email}</p>
        </div>
        <div className="flex gap-1 items-center">
            <Phone className="inline-block mr-1 text-gray-500" size={19} />
            <p className="text-sm text-gray-600">{order.customer_phone}</p>
        </div>

      </section>

      {/* DIRECCIÓN */}
      <section className="flex flex-col gap-4 border-b pb-8">
        <h2 className="text-lg font-semibold">Dirección de Envío</h2>

        <div className="flex gap-1 items-center">
            <MapPin className="inline-block mr-1 text-gray-500" size={19} />
            {address ? (
                <p className="text-sm text-gray-700">
                    {address.street} {address.number},{" "}
                    {address.province} ({address.postal_code})
                </p>
                ) : (
                <p className="text-sm text-gray-500">Sin dirección</p>
            )}
        </div>

      </section>

      {/* PRODUCTOS */}
      <section className="flex flex-col gap-4 border-b pb-8">
        <h2 className="text-lg font-semibold">Productos</h2>

        {order.order_items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center gap-4"
          >
            <div className="flex gap-4 items-center">
              <div className="w-16 h-16 relative rounded-md overflow-hidden border">
                <Image
                  src={item.image || "/placeholder.jpg"}
                  alt={item.product_name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col">
                <p className="font-medium">{item.product_name}</p>
                <p className="text-sm text-gray-500">
                  {item.color_name} / {item.size} × {item.quantity}
                </p>
              </div>
            </div>

            <p className="font-medium">
              ${(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </section>

      {/* PAGO */}
      <section className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6 pb-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">Pago</h2>

          <p className="text-sm text-gray-700">
            Método: {methodNames[order.payment_method] || order.payment_method}
          </p>
        <div className="flex gap-1 items-center">
            <CreditCard className="inline-block mr-1 text-gray-500" size={19} />
            
            <span className="inline-block px-2 py-1 text-xs rounded bg-green-100 text-green-700 w-max">
                {paymentStatusNames[order.payment_status] || order.payment_status}
            </span>
        </div>
        </div>

        <div className="flex flex-col gap-6 sm:max-w-72 w-full">
            <div className="flex flex-col gap-1 text-sm ">
                <div className="flex justify-between">
                    <span className="text-gray-500">Subtotal</span>
                    <span>${order.subtotal}</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-500">Envío</span>
                    <span>
                    {order.shipping_total === 0
                        ? "Gratis"
                        : `$${order.shipping_total}`}
                    </span>
                </div>

                <div className="flex justify-between font-semibold text-base pt-2 border-t">
                    <span>Total</span>
                    <span>${order.total}</span>
                </div>
            </div>

            <ChangeStatus status={order.status} orderId={order.id} />
        </div>

      </section>

    </div>
  );
}