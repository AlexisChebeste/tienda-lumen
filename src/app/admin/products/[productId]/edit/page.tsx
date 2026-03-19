import ProductFormSection from "@/components/admin/product/product-form";
import { getProductById } from "@/services/catalog.service";
import { UUID } from "crypto";

export default async function EditProductPage({ params }: { params: Promise<{ productId: UUID }> }) {

  const { productId} = await params;

  const product = await getProductById(productId as UUID)

  if (!product) {
    return <div>Producto no encontrado</div>
  }

  const defaultValues = {
    name: product.name,
    slug: product.slug,
    description: product.description,
    base_price: product.basePrice,
    category_id: product.category.id,
    is_popular: product.is_popular,

    details: product.details.map((d: string) => ({ value: d })),

    variants: product.variants.map((v: any) => ({
        
      color_id: v.color.id,
      size_id: v.size.id,
      price: v.price,
      stock: v.stock,
      sku: v.sku
    })),

    images: product.images.map((img: any) => ({
      url: img.url,
      alt: img.alt,
      color_id: img.color_id,
      is_main: img.is_main,
      position: img.position
    }))
  }


  return (
      <div className="flex-1 flex flex-col gap-6 mx-auto w-full h-full min-h-max">
          <section className="flex flex-col gap-1">
              <h1 className="font-serif text-3xl font-light">Editar Producto</h1>
              <p className="text-gray-500 text-sm">
                  Modifica los detalles de tu producto para mantener tu catálogo actualizado y atractivo para tus clientes.
              </p>
          </section>

          <ProductFormSection mode="edit" defaultValues={defaultValues} />

      </div>
  )
}