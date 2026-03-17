import { z } from "zod"

export const productSchema = z.object({
  name: z.string().min(3, "El nombre es obligatorio"),
  slug: z.string().min(3 , "El slug es obligatorio"),
  description: z.string().optional(),

  base_price: z
    .number()
    .refine(val => typeof val === 'number', { message: "Debe ser un número" })
    .min(1, "El precio base debe ser mayor a $1"),
  
  category_id: z.string().uuid("Selecciona una categoría válida"),

  is_popular: z.boolean().optional(),

  details: z.array(
    z.object({
      value: z.string().min(1, "Es obligatorio un valor para el detalle")
    })
  ).min(1, "Debes agregar al menos un detalle"),

  variants: z.array(
    z.object({
      color_id: z.string().min(1, "El color es obligatorio"),
      size_id: z.string().min(1, "La talla es obligatoria"),
      price: z.number().min(0, "El precio debe ser un número positivo"),
      stock: z.number().min(0, "El stock debe ser un número positivo"),
      sku: z.string().min(3, "El SKU es obligatorio")
    })
  ).min(1, "Debes crear al menos una variante"),

  images: z.array(
    z.object({
      url: z.string().min(1, "La URL de la imagen es obligatoria"),
      alt: z.string().min(1, "El texto alternativo es obligatorio"),
      color_id: z.string().min(1, "El color es obligatorio"),
      position: z.number().min(0, "La posición debe ser un número positivo"),
      is_main: z.boolean()
    })
  ).min(1, "Debes agregar al menos una imagen")
}).refine((data) => {
  const mainImages = data.images.filter(img => img.is_main)
  return mainImages.length === 1
}, {
  message: "Debe haber exactamente una imagen principal",
  path: ["images"]
})

export type ProductForm = z.infer<typeof productSchema>