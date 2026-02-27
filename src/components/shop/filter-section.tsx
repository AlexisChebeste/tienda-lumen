'use client';

import { ProductFilter } from "@/data/products";
import { useState } from "react";


export default function FilterSection({filters, setFilters}: {filters: ProductFilter, setFilters: React.Dispatch<React.SetStateAction<ProductFilter>>}) {


    const [priceRange, setPriceRange] = useState([0, 500]);
    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setPriceRange([0, value]);
        setFilters(prev => ({
            ...prev,
            priceRange: [0, value],
        }));
    }

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, filterType: 'category' | 'size' | 'color') => {
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
    <div className="w-full p-4 hidden py-4 lg:flex flex-col gap-8 border-r border-slate-200">
        <div className="flex flex-col gap-4">
            <label className="block uppercase text-sm font-semibold">Categoría</label>
            <div className="flex flex-col gap-2 text-sm  text-slate-800">
                <label className="flex items-center gap-2">
                    <input type="checkbox" name="category" value="camisetas" className="size-4 rounded-lg accent-black cursor-pointer checked:rounded-md" onChange={(e) => handleCheckboxChange(e, 'category')} />
                    Camisetas
                </label>
                <label className="flex items-center gap-2">
                    <input type="checkbox" name="category" value="pantalones" className="size-4 rounded-lg accent-black cursor-pointer checked:rounded-md" onChange={(e) => handleCheckboxChange(e, 'category')} />
                    Pantalones
                </label>
                <label className="flex items-center gap-2">
                    <input type="checkbox" name="category" value="abrigos" className="size-4 rounded-lg accent-black cursor-pointer checked:rounded-md" onChange={(e) => handleCheckboxChange(e, 'category')} />
                    Abrigos
                </label>
            </div>
        </div>
        <div className="flex flex-col gap-4">
            <label className="block uppercase text-sm font-semibold">Talle</label>
            <div className="flex flex-col gap-2 text-sm  text-slate-800">
                <label className="flex items-center gap-2">
                    <input type="checkbox" name="talle" value="xs" className="size-4 rounded-lg accent-black cursor-pointer checked:rounded-md" onChange={(e) => handleCheckboxChange(e, 'size')} />
                    XS
                </label>
                <label className="flex items-center gap-2">
                    <input type="checkbox" name="talle" value="s" className="size-4 rounded-lg accent-black cursor-pointer checked:rounded-md" onChange={(e) => handleCheckboxChange(e, 'size')} />
                    S
                </label>
                <label className="flex items-center gap-2">
                    <input type="checkbox" name="talle" value="m" className="size-4 rounded-lg accent-black cursor-pointer checked:rounded-md" onChange={(e) => handleCheckboxChange(e, 'size')} />
                    M
                </label>
                <label className="flex items-center gap-2">
                    <input type="checkbox" name="talle" value="l" className="size-4 rounded-lg accent-black cursor-pointer checked:rounded-md" onChange={(e) => handleCheckboxChange(e, 'size')} />
                    L
                </label>
                <label className="flex items-center gap-2">
                    <input type="checkbox" name="talle" value="xl" className="size-4 rounded-lg accent-black cursor-pointer checked:rounded-md" onChange={(e) => handleCheckboxChange(e, 'size')} />
                    XL
                </label>
            </div>
        </div>
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