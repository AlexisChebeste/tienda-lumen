import { CreateOrder } from "@/domain/order"
import { supabase } from "@/lib/supabase/client"

export async function createOrder(order: CreateOrder) {
  
  const { data: newOrder, error } = await supabase
    .from("orders")
    .insert({
      subtotal: order.subtotal,
      shipping_method: order.shipping.method,
      shipping_total: order.shipping.price,
      total: order.total,

      customer_name: order.customer.nombre,
      customer_email: order.customer.email,
      customer_phone: `${order.customer.telefono.codigo_pais}${order.customer.telefono.codigo_area}${order.customer.telefono.numero}`,

      payment_method: order.payment.method,
      payment_status: order.payment.status
    })
    .select()
    .single()

  if (error) throw error

  const orderId = newOrder.id

  const items = order.items.map(item => ({
    order_id: orderId,

    product_id: item.productId,
    variant_id: item.id,

    product_name: item.name,
    sku: item.sku,
    image: item.image,

    size: item.size,
    color_name: item.colorName,

    quantity: item.quantity,
    price: item.price
  }))

    const { error: itemsError } = await supabase
    .from("order_items")
    .insert(items)

  if (itemsError) throw itemsError

  const { error: addressError } = await supabase
    .from("order_addresses")
    .insert({
      order_id: orderId,

      street: order.direccion.calle,
      number: order.direccion.numero,
      province: order.direccion.provincia,
      postal_code: order.direccion.codigo_postal
    })

  if (addressError) throw addressError

  for (const item of order.items) {

    await supabase.rpc("decrease_variant_stock", {
      variant_id: item.id,
      qty: item.quantity
    })
  }

  return newOrder
}

export async function getOrderById(orderId: string) {

  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      order_items (*),
      order_addresses (*)
    `)
    .eq("id", orderId)
    .single()

  if (error) throw error

  return data
}
