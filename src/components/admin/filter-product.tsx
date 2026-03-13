import { Search } from "lucide-react";
import { CategorySelect } from "./category-select";


export default function FilterProduct() {

    return(
        <section>
            <div className="flex items-center gap-4 flex-col lg:flex-row">
                <div className="relative flex-1 flex items-center w-full">
                    <input
                        type="text"
                        placeholder="Buscar por nombre o slug"
                        className="border rounded-md p-2 pl-8 w-full"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                </div>
                <CategorySelect />
            </div>  
        </section>
    )
}