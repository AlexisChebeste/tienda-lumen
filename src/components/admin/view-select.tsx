"use client"

import { useRouter, useSearchParams } from "next/navigation"

export function ViewSelect() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
      if (value) {
      params.set("limit", value)
    } else {
      params.delete("limit")
    }

    params.set("page", "1") // reset page
    router.replace(`?${params.toString()}`)
  }

  return (
    <select onChange={(e) => handleChange(e.target.value)}
      defaultValue={searchParams.get("limit") || "5"} 
      className="w-full lg:w-max bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md cursor-pointer appearance-none pr-8 bg-no-repeat bg-right" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23475569' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`, backgroundPosition: 'right 8px center'}}
    >
      <option value="5">5 por página</option>
      <option value="10">10 por página</option>
      <option value="20">20 por página</option>
      <option value="50">50 por página</option>
    </select>
  )
}

