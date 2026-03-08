"use client"

import { useRouter, useSearchParams } from "next/navigation"

export default function Pagination({
  page,
  totalPages
}: {
  page: number
  totalPages: number
}) {

    const router = useRouter()
    const searchParams = useSearchParams()

    const updateUrl = (newParams: { page?: number }) => {
        const params = new URLSearchParams(searchParams.toString())
        if (newParams.page) {
            params.set("page", newParams.page.toString())
        }
        router.push(`/tienda?${params.toString()}`)
    }

    return (
        <div className="flex items-center gap-2">
            <button
                className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50 cursor-pointer"  
                disabled={page === 1}
                onClick={() => {
                    updateUrl({ page: page - 1 })
                }}
            >
                Anterior    
            </button>
            <span className="px-3 py-1 rounded-md bg-gray-100 text-gray-500">
                Página {page} de {totalPages}
            </span>
            <button
                className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50 cursor-pointer"  
                
                onClick={() => {
                    updateUrl({ page: page + 1 })
                }}
                disabled={page === totalPages}
            >
                Siguiente    
            </button>
        </div>
    )
}