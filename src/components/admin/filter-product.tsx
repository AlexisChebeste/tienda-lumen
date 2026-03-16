import { getCategories } from "@/services/filter.service";
import { CategorySelect } from "./category-select";
import QueryFilter from "./query-filter";


export default async function FilterProduct() {

    const categories = await getCategories()

    return(
        <section>
            <div className="flex items-center gap-4 flex-col lg:flex-row">
                <QueryFilter />
                <CategorySelect categories={categories} />
            </div>  
        </section>
    )
}