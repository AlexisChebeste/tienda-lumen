import { CatalogProduct } from "@/domain/catalog.types";
import { getProductMeta } from "@/services/product.service";
import { ImagePlus, Pencil, Trash2 } from "lucide-react";
import Image from "next/image"

export default function TableProducts({products} : {products: CatalogProduct[]}) {
  return (
    <div className="overflow-x-auto hidden lg:block">
      <table className=" w-full border border-collapse rounded-md text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="text-left px-4 py-2.5 table-cell" scope="col">Producto</th>
            <th className="text-left px-4 py-2.5 table-cell" scope="col">Categoría</th>
            <th className="text-left px-4 py-2.5 table-cell" scope="col">Precio</th>
            <th className="text-left px-4 py-2.5 table-cell" scope="col">Variantes</th>
            <th className=" px-4 py-2.5 table-cell text-center w-10" scope="col">Stock</th>
            <th className="text-right px-4 py-2.5 table-cell w-24" scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-stone-600 divide-y">
          {products.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-10 text-sm text-muted-foreground">
                No se encontraron productos.
              </td>
            </tr>
          ) : (
          
          products?.map((product: CatalogProduct) => {
            
            const mainImage = product.images.find((img) => img.isMain) || product.images[0]
            const { totalStock, uniqueColors } = getProductMeta(product)

            return(
              <tr key={product.id} className="border-t hover:bg-muted/30">
                <td className="px-4  py-2.5 table-cell h-24">
                  <div className="flex items-center gap-3">
                    <div className="h-14 w-14 overflow-hidden rounded-lg bg-muted">
                      {mainImage ? (
                        <Image
                          src={mainImage.url}
                          alt={mainImage.alt}
                          width={54}
                          height={54}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                          <ImagePlus className="h-5 w-5" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium truncate">{product.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{product.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-2.5 table-cell font-medium">
                  <p >{product.category.name}</p>
                </td>
                <td className="px-4 py-2.5 table-cell text-black">
                  <p>${product.basePrice}</p>
                </td>
                <td className="px-4 py-2.5 table-cell text-center">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-1">
                      {uniqueColors.slice(0, 4).map((colorId) => {
                        const color = product.variants.find(v => v.color.id === colorId)
                        return (
                          <span
                            key={colorId}
                            className="h-5 w-5 rounded-full border"
                            style={{ backgroundColor: color?.color.hex || '#ccc' }}
                            title={color?.color.name}
                          />
                        )
                      })}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {product.variants.length} var.
                    </span>
                  </div>
                </td>
                <td className="px-4 py-2.5 table-cell text-center w-10">
                  <span className={`inline-block  rounded-full px-2 py-1 text-xs ${
                    totalStock === 0 ? 'bg-red-100 text-red-800' :
                    totalStock < 100 ? 'bg-amber-100 text-amber-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {totalStock}
                  </span>
                </td>
                <td className="px-4 py-2.5 table-cell text-right">
                  <div className="flex justify-center gap-4">
                    <button  /* onClick={() => openEditModal(product)} */
                      className="cursor-pointer"
                    >
                      <Pencil className="h-4 w-4 text-black" />
                    </button>
                    <button  /* onClick={() => handleDelete(product.id)} */
                      className="cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4 text-black" />
                    </button>
                  </div>
                </td>
              </tr>
            )
          }))}
        </tbody>

      </table>
    </div>
  )
}