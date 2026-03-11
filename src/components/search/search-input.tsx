"use client"

import { use, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { searchProducts } from "@/services/catalog.service"

type Product = {
  id: string
  name: string
  slug: string
  price: number
  image: string
}

export default function SearchInput(
  {setIsSearchOpen, isSearchOpen}: {setIsSearchOpen: (open: boolean) => void; isSearchOpen: boolean}
) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!query) {
      setResults([])
      return
    }

    const timeout = setTimeout(async () => {
      setLoading(true)

      const res = await searchProducts(query)

      setResults(res || [])
      setLoading(false)
    }, 300)

    return () => clearTimeout(timeout)
  }, [query])

  useEffect(() => {
    if (!isSearchOpen) {
      setQuery("")
      setResults([])
    }
  }, [isSearchOpen])

  return (
    <div className="relative w-full mx-auto max-w-xl bg-white">

      <input
        type="text"
        placeholder="Buscar productos..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full  rounded-md px-4 py-3 outline-none  border-x border-b"
      />

      {results.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-white border border-y-0 shadow-md z-50">

          {results.map(product => (
            <Link
              key={product.id}
              href={`/producto/${product.slug}`}
              className="flex items-center gap-3 p-3 py-4 hover:bg-gray-100"
              onClick={() => setIsSearchOpen(false)}
            >
              <div className="relative w-12 h-12">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover rounded"
                />
              </div>

              <div className="flex flex-col">
                <span className="text-sm">{product.name}</span>
                <span className="text-xs text-gray-500">
                  ${product.price}
                </span>
              </div>
            </Link>
          ))}

        </div>
      )}

    </div>
  )
}