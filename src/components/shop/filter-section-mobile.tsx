'use client';

import { Filter, X } from "lucide-react";
import { useState } from "react";
import { SortSelect } from "./sort-select";
import FiltersItems from "./filters-items";

export default function FilterSectionMobile({maxPrice}: { maxPrice: number }) {
    const [openMenu, setOpenMenu] = useState(false);

    return (
        <>
            <div className="h-max flex items-center w-full p-2 lg:hidden col-span-4 ">
                <div className="grid grid-cols-2 w-full  gap-6">
                    <SortSelect />
                    <button className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md  cursor-pointer flex items-center gap-2 " onClick={() => setOpenMenu(!openMenu)} >
                        <Filter className="size-4 text-slate-700" />
                        Filtrar por
                    </button>
                </div>

                {openMenu && (
                    <div className={`absolute inset-0 z-40 bg-black/50 h-full w-full`} onClick={() => setOpenMenu(false)}  />
                )}

                <div className={`
                    absolute left-0 top-0 p-4 border border-slate-200 rounded z-50 bg-white h-full w-full sm:w-max
                    ${openMenu ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease flex flex-col gap-5
                `}>
                    <div className="flex items-center justify-between">

                        <h3 className="font-medium text-base tracking-wide">Filtrar por</h3>
                        <button className="text-sm text-slate-500" onClick={() => setOpenMenu(false)}>
                            <X className="size-5" />
                        </button>
                    </div>
            
                    <FiltersItems maxPrice={maxPrice} />

                </div>


            </div>
            <div className="w-full  hidden py-4 lg:flex flex-col gap-5 p-2">

                <h3 className="font-medium text-base tracking-wide">Filtrar por</h3>

                <FiltersItems maxPrice={maxPrice} />
            </div>
        </>
    );
}