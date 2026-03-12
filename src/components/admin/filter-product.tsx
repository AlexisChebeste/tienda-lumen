

export default function FilterProduct() {

    return(
        <section>
            <div className="flex items-center gap-4">
                <input
                type="text"
                placeholder="Buscar por nombre o slug"
                className="border rounded-md p-2 flex-1"
                />
                <select className="border rounded-md p-2">
                <option value="">Todas las categorías</option>
                <option value="camisetas">Camisetas</option>
                <option value="pantalones">Pantalones</option>
                <option value="accesorios">Accesorios</option>
                </select>
            </div>  
        </section>
    )
}