import { CatalogProduct } from "@/domain/catalog.types";
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";


export default function CardsProducts({products} : {products: CatalogProduct[]}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:hidden">
      {products?.map((product: CatalogProduct) => {
        const mainImage = product.images.find((img) => img.isMain) || product.images[0]
        const totalStock = product.variants.reduce((sum, v) => sum + v.stock, 0)
        const uniqueColors = [...new Set(product.variants.map(v => v.color.id))]

        return(
          <div key={product.slug} className="border rounded-[6px] p-4 flex flex-col gap-2">
            {/* Imagen del producto con indicador de stock y cantidad de colores */}
            <div className="relative w-full aspect-square ">
              {uniqueColors.length > 1 && (
                <div className="absolute top-2 left-2 z-10 bg-white bg-opacity-75 px-2 py-1 rounded text-xs">
                  {uniqueColors.length} colores
                </div>
              )}
              <Image 
                src={mainImage?.url} 
                alt={product.name} 
                fill
                className="object-cover w-full h-full rounded-[6px]" 
              />
              {totalStock === 0 && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-white font-bold">Agotado</span>
                </div>
              )}
            </div>
            {/* Nombre y precio del producto */}
            <div className="flex flex-col">
              <h3 className="font-bold">{product.name}</h3>
            </div>
            <div className="flex items-center justify-between ">
              <p className="text-sm font-semibold text-gray-700">Precio:</p>
              <p className="text-gray-500 text-sm">${product.basePrice.toFixed(2)}</p>

            </div>
            <div className="flex items-center justify-between ">
              <p className="text-sm font-semibold text-gray-700">Categoría:</p>
              <p className="text-gray-500 text-sm">{product.category?.name}</p>

            </div>
            <div className="flex items-center justify-between ">
              <p className="text-sm font-semibold text-gray-700">Stock:</p>
              <span className={`inline-block  rounded-full px-2 py-1 text-xs ${
                totalStock === 0 ? 'bg-red-100 text-red-800' :
                totalStock < 100 ? 'bg-amber-100 text-amber-800' :
                'bg-green-100 text-green-800'
              }`}>
                {totalStock}
              </span>


            </div>

            <div className="flex justify-between items-center w-full gap-4 mt-2 font-semibold text-sm">
              <button className="text-sm text-blue-500 hover:underline border w-full py-2 rounded-xl border-blue-500 bg-blue-100">
                <Edit className="inline-block mr-2" size={16} />
                Editar
              </button>
              <button className="text-sm text-red-500 hover:underline border w-full py-2 rounded-xl border-red-500 bg-red-100">
                <Trash2 className="inline-block mr-2" size={16} />
                Eliminar
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}