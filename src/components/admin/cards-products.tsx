import { CatalogProduct } from "@/domain/catalog.types";
import Image from "next/image";


export default function CardsProducts({products} : {products: CatalogProduct[]}) {
  return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:hidden">
        {products?.map((product: CatalogProduct) => {
            const mainImage = product.images.find((img) => img.isMain) || product.images[0]
            const totalStock = product.variants.reduce((sum, v) => sum + v.stock, 0)
            const uniqueColors = [...new Set(product.variants.map(v => v.color.id))]
            return(
              <div key={product.slug} className="border rounded-[6px] p-4">
                <div className="relative w-full aspect-square mb-4">
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

                <h3 className="font-bold">{product.name}</h3>
                <p className="text-gray-500">${product.basePrice.toFixed(2)}</p>
              </div>
            )
        })}
      </div>
  )
}