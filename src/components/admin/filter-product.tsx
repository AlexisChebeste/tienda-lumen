import { Search } from "lucide-react";
import { CategorySelect } from "./category-select";
import QueryFilter from "./query-filter";


export default function FilterProduct() {

    return(
        <section>
            <div className="flex items-center gap-4 flex-col lg:flex-row">
                <QueryFilter />
                <CategorySelect />
            </div>  
        </section>
    )
}