'use client';
import { Filter } from "lucide-react";
import { useState } from "react";

export default function FilterSectionMobile({filters, setFilters}: {filters: {category: string[], size: string[], priceRange: [number, number]}, setFilters: React.Dispatch<React.SetStateAction<{category: string[], size: string[], priceRange: [number, number]}>>}) {
    const [openMenu, setOpenMenu] = useState(false);
    return (
        <div className="w-full p-4 lg:hidden">
            <div className="flex items-center justify-between gap-4">
                <select name="order-by" id="order-by" className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md  cursor-pointer">
                    <option value="">Ordenar por</option>
                    <option value="price-low">Precio: De menor a mayor</option>
                    <option value="price-high">Precio: De mayor a menor</option>
                    <option value="name">Nombre</option>
                </select>
                <button className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md  cursor-pointer flex items-center gap-2 "
                    onClick={() => setOpenMenu(!openMenu)}>
                    <Filter className="size-4 text-slate-700" />
                        Filtrar por
                </button>
            </div>

            {openMenu && (
                <div className="mt-4 p-4 border border-slate-200 rounded">
                    <h3 className="text-sm font-medium text-slate-700 mb-2">Filter by</h3>
                    <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" name="category" value="electronics" className="form-checkbox text-blue-500" />
                            Electronics
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" name="category" value="clothing" className="form-checkbox text-blue-500" />
                            Clothing
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" name="category" value="home" className="form-checkbox text-blue-500" />
                            Home
                        </label>
                    </div>
                </div>
            )}
        </div>
    );
}