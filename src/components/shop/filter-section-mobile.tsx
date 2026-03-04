'use client';
import { FiltersProducts } from "@/app/tienda/page";
import { categories } from "@/domain/categories";
import { colors } from "@/domain/colors";
import { sizes } from "@/domain/sizes";
import { Filter, X } from "lucide-react";
import { useState } from "react";

interface FilterSectionMobileProps {
    filters: FiltersProducts;
    setFilters: React.Dispatch<React.SetStateAction<FiltersProducts>>;
}

export default function FilterSectionMobile({filters, setFilters}: FilterSectionMobileProps) {
    const [openMenu, setOpenMenu] = useState(false);
    
    const [priceRange, setPriceRange] = useState([0, 500]);
    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setPriceRange([0, value]);
        setFilters(prev => ({
            ...prev,
            priceRange: [0, value],
        }));
    }

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, filterType: 'categoryIds' | 'sizeIds' | 'colorIds') => {
        const value = e.target.value;
        setFilters(prev => {
            const currentValues = Array.isArray(prev[filterType]) ? prev[filterType] : [];
            if (e.target.checked) {
                return {
                    ...prev,
                    [filterType]: [...currentValues, value],
                };
            } else {
                return {
                    ...prev,
                    [filterType]: currentValues.filter(v => v !== value),
                };
            }
        });
    }
    return (
        <div className="flex items-center w-full p-2 lg:hidden col-span-4 ">
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
                        {filters.categoryIds && filters.categoryIds.length > 0 && (
                                <div>
                                    <span className="font-medium">Categorías:</span> {filters.categoryIds.map(id => categories.find(c => c.id === id)?.name).join(', ')}
                                </div>
                        )}
                        {filters.sizeIds && filters.sizeIds.length > 0 && (
                            <div>
                                <span className="font-medium">Talles:</span> {filters.sizeIds.map(id => sizes.find(s => s.id === id)?.name).join(', ')}
                            </div>
                        )}
                        {filters.colorIds && filters.colorIds.length > 0 && (
                            <div>
                                <span className="font-medium">Colores:</span> {filters.colorIds.map(id => colors.find(c => c.id === id)?.name).join(', ')}
                            </div>
                        )}
                        {filters.priceRange && (
                            <div>
                                <span className="font-medium">Precio:</span> ${filters.priceRange[0]} - ${filters.priceRange[1]}
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
                        value={priceRange[1]}
                        onChange={handlePriceChange}
                        className="w-full accent-black cursor-pointer" 
                    />
                    <div className="flex justify-between text-sm mt-2">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                    </div>
                </div>
            </div>


        </div>
    );
}