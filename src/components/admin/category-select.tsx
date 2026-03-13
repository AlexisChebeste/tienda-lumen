"use client"

import { Category } from "@/domain/categories"
import { getCategories } from "@/services/filter.service"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export function CategorySelect() {
  const router = useRouter()
  const searchParams = useSearchParams()

    const [categorys, setCategorys] = useState<Category[]>([])

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("category", value)
    router.push(`?${params.toString()}`)
  }

  useEffect(() => {

    const fetchCategorys = async () => {
      const response = await getCategories()
      setCategorys(response)
    }

    fetchCategorys()
  }, [])



  return (
    <select onChange={(e) => handleChange(e.target.value)}
      defaultValue={searchParams.get("category") || ""} 
      className="w-full lg:w-max bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md cursor-pointer appearance-none pr-8 bg-no-repeat bg-right" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23475569' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`, backgroundPosition: 'right 8px center'}}
    >
        <option value="">Todas las categorías</option>
        {categorys.map((category) => (
            <option key={category.id} value={category.slug}>{category.name}</option>
        ))}
    </select>
  )
}

