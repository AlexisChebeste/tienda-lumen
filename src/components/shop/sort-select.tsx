"use client"

import { useRouter, useSearchParams } from "next/navigation"

export function SortSelect() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("sort", value)
    router.push(`?${params.toString()}`)
  }

  return (
    <select
      onChange={(e) => handleChange(e.target.value)}
      defaultValue={searchParams.get("sort") || "recent"}
      className="border border-neutral-300 px-4 py-2 text-sm"
    >
      <option value="recent">Recientes</option>
      <option value="price-asc">Precio: menor a mayor</option>
      <option value="price-desc">Precio: mayor a menor</option>
      <option value="name-asc">Nombre A-Z</option>
      <option value="name-desc">Nombre Z-A</option>
    </select>
  )
}