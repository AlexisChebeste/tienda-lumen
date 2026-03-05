'use client';

import { categories } from "@/domain/categories";
import { colors } from "@/domain/colors";
import { sizes } from "@/domain/sizes";
import { Filter, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react";


export default function FilterSectionMobile() {
    const [openMenu, setOpenMenu] = useState(false);
    const router = useRouter()
    const searchParams = useSearchParams()

    function updateUrl(param: string, value: string) {

        const params = new URLSearchParams(searchParams.toString())

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

        params.set("page", "1") // reset paginación

        router.push(`/tienda?${params.toString()}`)
    }
    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const value = e.target.value

    const params = new URLSearchParams(searchParams.toString())

    params.set("minPrice", "0")
    params.set("maxPrice", value)
    params.set("page", "1")

    router.push(`/tienda?${params.toString()}`)
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

    return (
        <div className="h-max flex items-center w-full p-2 lg:hidden col-span-4 ">
            <div className="grid grid-cols-2 w-full  gap-6">
                <select className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md cursor-pointer appearance-none pr-8 bg-no-repeat bg-right" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23475569' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`, backgroundPosition: 'right 8px center'}}>
                    <option value="">Ordenar por</option>
                    <option value="price-asc">Precio: Menor a Mayor</option>
                    <option value="price-desc">Precio: Mayor a Menor</option>
                    <option value="name">Nombre</option>
                </select>
                <button className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md  cursor-pointer flex items-center gap-2 " onClick={() => setOpenMenu(!openMenu)} >
                    <Filter className="size-4 text-slate-700" />
                    Filtrar por
                </button>
            </div>

            {openMenu && (
                <div className={`absolute inset-0 z-40 bg-black/50 h-full w-full`} onClick={() => setOpenMenu(false)}  />
            )}
            <div className={`
                absolute left-0 top-0 p-4 border border-slate-200 rounded z-50 bg-white h-full w-full sm:w-max
                ${openMenu ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease
            `}>
                <div className="flex items-center justify-between">

                    <h3 className="font-medium text-base tracking-wide">Filtrar por</h3>
                    <button className="text-sm text-slate-500" onClick={() => setOpenMenu(false)}>
                        <X className="size-5" />
                    </button>
                </div>


        
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
                <div className="flex flex-col gap-3 border-b border-slate-200 py-5">
                    <label className="block uppercase text-sm font-semibold">Categoría</label>
                    <div className="flex flex-col gap-2 text-sm  text-slate-800">
                        {categories.map(category => (
                            <label key={category.id} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="category"
                                    value={category.id}
                                    className="size-4 rounded-lg accent-black cursor-pointer checked:rounded-md"
                                    onChange={(e) => handleCheckboxChange(e, 'categoryIds')}
                                    checked={selectedCategories.includes(category.id)}
                                />
                                {category.name}
                            </label>
                        ))}
                    </div>
                </div>
        
                {/* Filtro de talle */}
                <div className="flex flex-col gap-3 border-b border-slate-200 py-5">
                    <label className="block uppercase text-sm font-semibold">Talle</label>
                    <div className="flex flex-col gap-2 text-sm  text-slate-800">
                        {sizes.map(size => (
                            <label key={size.id} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="talle"
                                    value={size.id}
                                    className="size-4 rounded-lg accent-black cursor-pointer checked:rounded-md"
                                    onChange={(e) => handleCheckboxChange(e, 'sizeIds')}
                                    checked={selectedSizes.includes(size.id)}
                                />
                                {size.name}
                            </label>
                        ))}
                    </div>
                </div>
        
                {/* Filtro de color */}
                <div className="flex flex-col gap-3 border-b border-slate-200 py-5">
                    <label className="block uppercase text-sm font-semibold">Color</label>
                    <div className="flex flex-wrap gap-3 text-sm  text-slate-800">
                        {colors.map(color => (
                            <label key={color.name} className="cursor-pointer" title={color.name}>
                                <input
                                type="checkbox"
                                value={color.id}
                                onChange={(e) => handleCheckboxChange(e, "colorIds")}
                                className="peer sr-only"
                                checked={selectedColors.includes(color.id)}
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
                <div className="py-5 flex flex-col gap-3">
                    <label className="block uppercase text-sm font-semibold">Rango de Precios</label>
                    <input 
                        type="range" 
                        min="0" 
                        max="500" 
                        value={selectedPriceRange ? selectedPriceRange[1] : 500}
                        onChange={handlePriceChange}
                        className="w-full accent-black cursor-pointer" 
                        checked={selectedPriceRange ? selectedPriceRange[1] === selectedPriceRange[1] : false}
                    />
                    <div className="flex justify-between text-sm mt-2">
                        <span>${selectedPriceRange[0]}</span>
                        <span>${selectedPriceRange[1]}</span>
                    </div>
                </div>
            </div>


        </div>
    );
}