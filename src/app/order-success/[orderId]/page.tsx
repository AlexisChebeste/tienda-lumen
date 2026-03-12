"use client"

import { getOrderById } from "@/services/orders.service";
import { Handbag, Package, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export type OrderSuccess = {
  id: string;
  order_number: number;
  total: number;
  created_at: string;

  customer_name: string;
  customer_email:string;
  customer_phone: string;

  order_items: {
    product_name: string;
    quantity: number;
    price: number;
    color_name: string;
    size: string;
    image: string;
  }[];

  order_addresses: {
    street: string;
    number: string;
    province: string;
    postal_code: string;
  }[];
  subtotal: number;
  shipping_total: number;
  payment_method: string;
  payment_status: string;

  status: string;
}

export default function OrderSuccessPage() {
  
    const params = useParams();
    const { orderId} = params;

    const [order,setOrder] = useState<OrderSuccess | null>(null)

    useEffect(()=>{
        const fetchOrder = async () => {

            try {
                if (!orderId || Array.isArray(orderId)) {
                    throw new Error("Order ID is missing in the URL")
                }    

                const res = await getOrderById(orderId)

                console.log("Fetched order data:", res) 
                setOrder(res)
            } catch (error) {
                console.error("Error fetching order:", error)
            }
        }

        fetchOrder()
    }, [orderId])

    const orderAddress = order?.order_addresses[0] 

    const orderNumber = order?.order_number.toString().padStart(6, "0") || "N/A";

    return (
      <div className="flex flex-1 bg-background flex-col">
        <main className="flex-1 flex flex-col max-w-7xl mx-auto w-full p-6 gap-10 items-start justify-center h-full relative md:p-10">

          <section className="flex flex-col gap-4 items-center justify-center w-full">

            <div className="mx-auto  flex h-20 w-20 items-center justify-center border border-border rounded-full">
              <ShieldCheck className="h-10 w-10 text-foreground" />
            </div>
            <h1 className="mx-auto font-serif text-3xl font-light tracking-wide">Gracias por tu compra</h1>
            <p className="mx-auto text-lg text-muted-foreground">
              Número de pedido: <span className="mx-auto  font-medium text-foreground">LMN-{orderNumber}</span>
            </p>
            <div className="flex items-center gap-5 md:gap-7">
              <div className="flex flex-col items-center">
                <div className={`h-16 w-16 rounded-full flex items-center justify-center ${order?.status === "pending" || order?.status === "in_transit" || order?.status === "delivered" ? "bg-foreground text-background" : "bg-border"}`}>
                  <Handbag className="h-6 w-6" />
                </div>
                <p className="text-xs mt-1">Pendiente</p>
              </div>
              
              <div className={`flex-1 h-1 ${order?.status === "in_transit" || order?.status === "delivered" ? "bg-foreground" : "bg-border"}`} />
              
              <div className="flex flex-col items-center">
                <div className={`h-16 w-16 rounded-full flex items-center justify-center ${order?.status === "in_transit" || order?.status === "delivered" ? "bg-foreground text-background" : "bg-border "}`}>
                  <Truck className="h-6 w-6" />
                </div>
                <p className="text-xs mt-1">En camino</p>
              </div>
              
              <div className={`flex-1 h-1 ${order?.status === "delivered" ? "bg-foreground" : "bg-border"}`} />
              
              <div className="flex flex-col items-center">
                <div className={`h-16 w-16 rounded-full flex items-center justify-center ${order?.status === "delivered" ? "bg-foreground text-background" : "bg-border"}`}>
                  <Package className="h-6 w-6" />
                </div>
                <p className="text-xs mt-1">Entregado</p>
              </div>
            </div>
          </section>

          <section className="flex flex-col items-center justify-center w-full max-w-3xl mx-auto">
            <h2 className="font-serif text-2xl font-medium tracking-wide mb-4 text-center">Detalles del Pedido</h2>
            <div className="flex flex-col gap-8 w-full mx-auto items-start justify-center ">
              

              <div className="flex flex-col gap-4 w-full border-t border-gray-200 ">
                <div className="grid grid-cols-1 w-full">
                  {order?.order_items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between gap-4 py-4 border-b border-gray-200">
                      <div className="flex gap-4 items-center">
                        <img
                          src={item.image} 
                          alt={item.product_name} 
                          className="w-24 h-24 object-cover" 
                        />
                        <div className="flex flex-col">
                          <p className="text-sm font-medium text-foreground">{item.product_name}</p>
                          <p className="text-sm text-muted-foreground">Color: {item.color_name}</p>
                          <p className="text-sm text-muted-foreground">Talle: {item.size}</p>
                        </div>
                      </div>
                      
                      
                      <div className="flex flex-col gap-4 items-end">
                        <p className="text-sm text-muted-foreground">Cantidad: {item.quantity}</p>
                        <p className="text-sm text-foreground border p-2 bg-gray-300 font-medium rounded">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>


              {/* Valores del pedido */}
              <div className="flex flex-col gap-4 w-full bg-gray-200 rounded-2xl p-4">
                <h3 className="text-base font-medium text-foreground">Resumen del pedido</h3>
                <div className="flex justify-between w-full">
                  <h4 className="text-sm font-medium text-muted-foreground">Subtotal</h4>
                  <p className="text-sm text-foreground">
                    ${order?.subtotal.toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-between w-full">
                  <h4 className="text-sm font-medium text-muted-foreground">Envio</h4>
                  <p className="text-sm text-foreground">
                    ${order?.shipping_total.toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-between w-full pt-4 border-t border-white">
                  <h4 className="text-sm font-medium text-muted-foreground">Total</h4>
                  <p className="text-sm text-foreground">
                    ${order?.total.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Dirección y fecha */}

              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="flex flex-col gap-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Dirección de Envío</h3>
                  <p className="text-sm text-foreground">
                    {orderAddress?.street} {orderAddress?.number}
                  </p>
                  <p className="text-sm text-foreground">
                    {orderAddress?.province}, {orderAddress?.postal_code} 
                  </p>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <h3 className="text-sm font-medium text-muted-foreground">Fecha de Pedido</h3>
                  <p className="text-sm text-foreground"> 
                    {order?.created_at ? new Date(order.created_at).toLocaleDateString("es-AR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    }) : "N/A"}
                  </p>
                </div>
              </div>


            </div>
          </section>
          
          <button  className="mx-auto border border-black mt-8 rounded-none px-8 py-4 text-sm tracking-widest uppercase hover:bg-black hover:text-white transition-colors cursor-pointer">
            <Link href="/tienda">Continuar Comprando</Link>
          </button>
        </main>
      </div>
    )
}