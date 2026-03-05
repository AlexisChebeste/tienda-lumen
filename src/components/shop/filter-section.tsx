'use client';

import { categories } from "@/domain/categories";
import { colors } from "@/domain/colors";
import { sizes } from "@/domain/sizes";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation"

export default function FilterSection() {

    const router = useRouter()
    const searchParams = useSearchParams()

    function updateUrl(param: string, value: string) {
        const params = new URLSearchParams(searchParams.toString())

    
        if (param === "priceRange") {
            params.set(param, value)
        } else {
            const current = params.get(param)

            if (!current) {
            params.set(param, value)
            } else {
            const values = current.split(",")

            if (values.includes(value)) {
                const filtered = values.filter(v => v !== value)

                if (filtered.length === 0) params.delete(param)
                else params.set(param, filtered.join(","))
            } else {
                params.set(param, [...values, value].join(","))
            }
            }
        }

        params.set("page", "1") // Resetear a página 1 al cambiar filtros

        router.push(`/tienda?${params.toString()}`)
    }
    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(Number(e.target.value))
    }

    

    const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    param: string
    ) => {

    const value = e.target.value

    updateUrl(param, value)
    }
    
    const selectedCategories = searchParams.get("category")?.split(",") || []

    const selectedSizes = searchParams.get("size")?.split(",") || []

    const selectedColors = searchParams.get("color")?.split(",") || []

    const selectedPriceRange = searchParams.get("priceRange")?.split("-").map(Number) || [0, 500]

const [price, setPrice] = useState(selectedPriceRange[1])

useEffect(() => {
    const timeout = setTimeout(() => {
        updateUrl("priceRange", `0-${price}`)
    }, 400) // 400ms debounce

    return () => clearTimeout(timeout)
    }, [price])
  return (
    <div className="w-full  hidden py-4 lg:flex flex-col gap-5 p-2">

        <h3 className="font-medium text-base tracking-wide">Filtrar por</h3>

        {/* Filtro utilizados */}
        <div className="flex flex-col gap-3 border-b border-slate-200 pb-4">
            <div className="flex flex-col gap-2 text-sm text-slate-800">
                {selectedCategories && selectedCategories.length > 0 && (
                        <div>
                            <span className="font-medium">Categorías:</span> {selectedCategories.map(id => categories.find(c => c.id === id)?.name).join(', ')}
                        </div>
                )}
                {selectedSizes && selectedSizes.length > 0 && (
                    <div>
                        <span className="font-medium">Talles:</span> {selectedSizes.map(id => sizes.find(s => s.id === id)?.name).join(', ')}
                    </div>
                )}
                {selectedColors && selectedColors.length > 0 && (
                    <div>
                        <span className="font-medium">Colores:</span> {selectedColors.map(id => colors.find(c => c.id === id)?.name).join(', ')}
                    </div>
                )}
                {selectedPriceRange && (
                    <div>
                        <span className="font-medium">Precio:</span> ${selectedPriceRange[0]} - ${selectedPriceRange[1]}
                    </div>
                )}
            </div>
        </div>
        {/* Filtro de Categoria */}
        <div className="flex flex-col gap-3 border-b border-slate-200 pb-5">
            <label className="block uppercase text-sm font-semibold">Categoría</label>
            <div className="flex flex-col gap-2 text-sm  text-slate-800">
                {categories.map(category => (
                    <label key={category.id} className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="category"
                            value={category.id}
                            className="size-4 rounded-lg accent-black cursor-pointer checked:rounded-md"
                            onChange={(e) => handleCheckboxChange(e, 'category')}
                            checked={selectedCategories.includes(category.id)}
                        />
                        {category.name}
                    </label>
                ))}
            </div>
        </div>

        {/* Filtro de talle */}
        <div className="flex flex-col gap-3 border-b border-slate-200 pb-5">
            <label className="block uppercase text-sm font-semibold">Talle</label>
            <div className="flex flex-col gap-2 text-sm  text-slate-800">
                {sizes.map(size => (
                    <label key={size.id} className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="talle"
                            value={size.id}
                            className="size-4 rounded-lg accent-black cursor-pointer checked:rounded-md"
                            onChange={(e) => handleCheckboxChange(e, 'size')}
                            checked={selectedSizes.includes(size.id)}
                        />
                        {size.name}
                    </label>
                ))}
            </div>
        </div>

        {/* Filtro de color */}
        <div className="flex flex-col gap-3 border-b border-slate-200 pb-5">
            <label className="block uppercase text-sm font-semibold">Color</label>
            <div className="flex flex-wrap gap-3 text-sm  text-slate-800">
                {colors.map(color => (
                    <label key={color.name} className="cursor-pointer" title={color.name}>
                        <input
                        type="checkbox"
                        value={color.id}
                        onChange={(e) => handleCheckboxChange(e, "color")}
                        checked={selectedColors.includes(color.id)}
                        className="peer sr-only"
                        />

                        <div
                        className="
                            size-8
                            rounded-full
                            border border-neutral-300
                            peer-checked:ring-2
                            peer-checked:ring-black
                            peer-checked:ring-offset-2
                            hover:scale-110
                            transition
                        "
                        style={{ backgroundColor: color.hex }}
                        />
                    </label>
                ))}
            </div>
        </div>

        {/* Filtro de precio */}
        <div >
            <label className="block mb-2 uppercase">Rango de Precios</label>
            <input 
                type="range" 
                min="0" 
                max="500" 
                value={price}
                onChange={handlePriceChange}
                className="w-full accent-black cursor-pointer" 
            />
            <div className="flex justify-between text-sm mt-2">
                <span>${selectedPriceRange[0]}</span>
                <span>${price}</span>
            </div>
        </div>
    </div>
  );
}