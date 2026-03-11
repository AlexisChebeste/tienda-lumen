import { supabase } from "@/lib/supabase/client"

export async function createOrder(order: any) {
  const { data, error } = await supabase
    .from("orders")
    .insert(order)
    .select()
    .single()

  if (error) throw error

  return data
}

export async function getOrders() {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw error

  return data
}