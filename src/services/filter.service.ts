import { supabase } from "@/lib/supabase/client"

export async function getCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw error

  return data
}

export async function getColors() {
  const { data, error } = await supabase
    .from("colors")
    .select("*")
    .order("created_at", { ascending: false })

    if (error) throw error

    return data
}

export async function getSizes() {
  const { data, error } = await supabase
    .from("sizes")
    .select("*")
    .order("created_at", { ascending: false })

    if (error) throw error

    return data
}

export async function getMaxPrice() {
  const { data, error } = await supabase
    .from("products")
    .select("base_price")
    .order("base_price", { ascending: false })
    .limit(1)

  if (error) throw error

  return data[0]?.base_price || 0
}
