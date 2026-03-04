'use client';

import { FiltersProducts } from "@/app/tienda/page";
import { CatalogProduct } from "@/domain/catalog.types";
import { categories } from "@/domain/categories";
import { colors } from "@/domain/colors";
import { sizes } from "@/domain/sizes";
import { useState } from "react";

interface FilterSectionProps {
    filters: FiltersProducts;
    setFilters: React.Dispatch<React.SetStateAction<FiltersProducts>>;
}

export default function FilterSection({filters, setFilters}: FilterSectionProps) {


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
    <div className="w-full  hidden py-4 lg:flex flex-col gap-5 p-2">

        <h3 className="font-medium text-base tracking-wide">Filtrar por</h3>

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
                            onChange={(e) => handleCheckboxChange(e, 'categoryIds')}
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
                            onChange={(e) => handleCheckboxChange(e, 'sizeIds')}
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
        <div >
            <label className="block mb-2 uppercase">Rango de Precios</label>
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
  );
}