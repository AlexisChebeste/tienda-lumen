"use client"

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";


export default function QueryFilter() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleChange = (value: string) => {
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        debounceTimeoutRef.current = setTimeout(() => {
        
            const params = new URLSearchParams(searchParams.toString())
            params.set("search_query", value)
            router.push(`?${params.toString()}`)
        }, 300);

    }

    return(
        <div className="relative flex-1 flex items-center w-full">

            <input
                type="text"
                placeholder="Buscar por nombre o slug"
                className="border p-2 pl-8 w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border-slate-200 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md rounded-xl"
                onChange={(e) => handleChange(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        </div>
    )
}