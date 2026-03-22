"use client"

import { useRouter, useSearchParams } from "next/navigation"

export function StatusSelect() {
  const router = useRouter()
  const searchParams = useSearchParams()

const statusNames: Record<string, string> = {
    "pending": "Pendiente",
    "processing": "En proceso",
    "shipped": "Enviado",
    "delivered": "Entregado",
    "cancelled": "Cancelado",
};


  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
        params.set("status_filter", value)
      } else {
        params.delete("status_filter")
      }

      params.set("page", "1") // reset page
      router.replace(`?${params.toString()}`)
  }



  return (
    <select onChange={(e) => handleChange(e.target.value)}
      defaultValue={searchParams.get("status_filter") || ""} 
      className="w-full lg:w-max bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md cursor-pointer appearance-none pr-8 bg-no-repeat bg-right" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23475569' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`, backgroundPosition: 'right 8px center'}}
    >
        <option value="">Todos los estados</option>
        {Object.entries(statusNames).map(([key, name]) => (
            <option key={key} value={key}>{name}</option>
        ))}
    </select>
  )
}

