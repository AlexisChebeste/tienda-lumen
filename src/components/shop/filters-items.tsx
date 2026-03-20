"use client"
import { getCategories, getColors, getSizes } from "@/services/filter.service";
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";
import { Category } from "@/domain/categories";
import { Color } from "@/domain/colors";
import { Size } from "@/domain/sizes";

export default function FiltersItems({maxPrice}: { maxPrice: number }) {
    const router = useRouter()
    const searchParams = useSearchParams()

    function updateUrl(param: string, value: string) {
            const params = new URLSearchParams(searchParams.toString())
    
        
            if (param === "priceRange") {
                const newPrice = Number(value.split("-")[1])

                if (newPrice === maxPrice) {
                    params.delete("priceRange")
                } else {
                    params.set("priceRange", value)
                }
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
    
            router.replace(`/tienda?${params.toString()}`)
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

    const [categories, setCategories] = useState<Category[]>([])
    const [colors, setColors] = useState<Color[]>([])
    const [sizes, setSizes] = useState<Size[]>([])
    
    useEffect(() => {
        async function fetchFilters() {
            try {
                const [fetchedCategories, fetchedColors, fetchedSizes] = await Promise.all([
                    getCategories(),
                    getColors(),
                    getSizes()
                ])
                setCategories(fetchedCategories)
                setColors(fetchedColors)
                setSizes(fetchedSizes)
            } catch (error) {
                console.error("Error fetching filters:", error)
            }
        }

        fetchFilters()
    }, [])

    const selectedCategories = searchParams.get("category")?.split(",") || []

    const selectedSizes = searchParams.get("size")?.split(",") || []

    const selectedColors = searchParams.get("color")?.split(",") || []

    const priceParam = searchParams.get("priceRange")

    const selectedPriceRange = priceParam
    ? priceParam.split("-").map(Number)
    : [0, maxPrice]

    const isPriceFiltered = priceParam !== null
        
    const [price, setPrice] = useState(selectedPriceRange ? selectedPriceRange[1] : maxPrice)
    
    useEffect(() => {
        if (price === selectedPriceRange[1]) return

        const timeout = setTimeout(() => {
            updateUrl("priceRange", `0-${price}`)
        }, 400)

        return () => clearTimeout(timeout)
    }, [price])


    function cleanFilters() {
        setPrice(maxPrice)
        router.push("/tienda")
    }
    useEffect(() => {
        setPrice(selectedPriceRange[1])
    }, [selectedPriceRange])

    const activeFiltersCount =
        selectedCategories.length +
        selectedSizes.length +
        selectedColors.length +
        (isPriceFiltered ? 1 : 0)

    return(
        <>
            {/* Filtro utilizados */}
            {activeFiltersCount > 0 && (
                <div className="flex flex-col gap-3 border-b border-slate-200 ">
                    <div className={`flex flex-col gap-2 text-sm text-slate-800 `}>
                        {selectedCategories && selectedCategories.length > 0 && (
                                <div>
                                    <span className="font-medium">Categorías:</span> {selectedCategories.map(slug => categories.find(c => c.slug === slug)?.name).join(', ')}
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
                        {isPriceFiltered && (
                        <div>
                            <span className="font-medium">Precio:</span> ${selectedPriceRange[0]} - ${selectedPriceRange[1]}
                        </div>
                        )}
                    </div>

                    
                    <button
                    onClick={cleanFilters}
                    className="
                        text-sm
                        font-medium
                        text-red-500
                        hover:text-red-600
                        transition
                        cursor-pointer
                        pb-5
                    "
                    >
                        Limpiar filtros ({activeFiltersCount})
                    </button>
                </div>
            )}
            {/* Filtro de Categoria */}
            <div className="flex flex-col gap-3 border-b border-slate-200 pb-5">
                <label className="block uppercase text-sm font-semibold">Categoría</label>
                <div className="flex flex-col gap-2 text-sm  text-slate-800">
                    {categories.map(category => (
                        <label key={category.id} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="category"
                                value={category.slug}
                                className="size-4 rounded-lg accent-black cursor-pointer checked:rounded-md"
                                onChange={(e) => handleCheckboxChange(e, 'category')}
                                checked={selectedCategories.includes(category.slug)}
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
            <div className="flex flex-col gap-3 border-b border-slate-200 pb-5">
                <label className="block uppercase text-sm font-semibold">Rango de Precios</label>
                <input 
                    type="range" 
                    min="0" 
                    max={maxPrice}
                    value={price}
                    onChange={handlePriceChange}
                    className="w-full accent-black cursor-pointer" 
                />
                <div className="flex justify-between text-sm mt-2">
                    <span>$0</span>
                    <span>${price}</span>
                </div>
            </div>
        </>
    )
}