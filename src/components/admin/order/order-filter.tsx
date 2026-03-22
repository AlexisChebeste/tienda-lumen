import QueryFilter from "../query-filter";
import { StatusSelect } from "./status-select";


export default async function FilterOrder() {

    return(
        <section>
            <div className="flex items-center gap-4 flex-col lg:flex-row">
                <QueryFilter placholder="Buscar por nombre o email"/>
                <StatusSelect />
            </div>  
        </section>
    )
}