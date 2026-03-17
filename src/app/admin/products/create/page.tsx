"use client"


import ImagesProduct from "@/components/admin/product/create/images-product";
import InfoProduct from "@/components/admin/product/create/info-product";
import VariantsProduct from "@/components/admin/product/create/variants-product";
import { Color } from "@/domain/colors";
import { supabase } from "@/lib/supabase/client";
import { ProductForm, productSchema } from "@/schemas/product.schema";
import { getColors } from "@/services/filter.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner"

export default function CreateProductPage() {
    const [colors, setColors] = useState<Color[]>([])

    const methods = useForm<ProductForm>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            is_popular: false,
            name: "",
            slug: "",
            description: "",
            base_price: 0,
            category_id: "",
            details: [],
            variants: [],  
            images: [],    
        }
    })

    const onSubmit = async (data: ProductForm) => {
        
        const forrmatedProduct = {
            name: data.name,
            slug: data.slug,
            description: data.description,
            base_price: data.base_price,
            is_popular: data.is_popular,
            category_id: data.category_id,
            details: data.details.map(details => details.value)
        }
        
        const {error} = await supabase.rpc("create_product_full", {
            product_data: forrmatedProduct,
            variants_data: data.variants,
            images_data: data.images
        })
        
        if (error) {
            const message = getErrorMessage(error)

            toast.error(message)
            return
        }

        toast.success("Producto creado correctamente")
    }

    function getErrorMessage(error: any): string {
        if (!error) return "Error desconocido"

        const msg = error.message || ""

        if (msg.includes("one_main_image_per_product")) {
            return "Debe haber una sola imagen principal"
        }

        if (msg.includes("unique_variant_combination")) {
            return "Ya existe una variante con ese color y talla"
        }

        if (msg.includes("create_product_full")) {
            return "Error al crear el producto"
        }

        return msg
    }

    useEffect(() => {
        const fetchColors = async () => {
            const data = await getColors()
            setColors(data)
        }

        fetchColors()
    }, [])

    return (
        <div className="flex-1 flex flex-col gap-6 mx-auto w-full h-full min-h-max">
            <section className="flex flex-col gap-1">
                <h1 className="font-serif text-3xl font-light">Nuevo Producto</h1>
                <p className="text-gray-500 text-sm">Crea un nuevo producto en el catálogo</p>
            </section>

            <FormProvider {...methods}>

                <form onSubmit={methods.handleSubmit(onSubmit)}  className="flex flex-col gap-4 border rounded-xl p-4 lg:py-12 w-full h-full mx-auto min-h-max">

                    <InfoProduct />
                    
                    <VariantsProduct colors={colors} />

                    <ImagesProduct colors={colors} />

                    {/*Botones */}
                    <section className="max-w-4xl w-full flex gap-4 items-center mx-auto justify-end">
                        <button className="btn-secondary" type="button">
                            Cancelar
                        </button>
                        <button className="btn-primary" type="submit">
                            Crear producto
                        </button>
                    </section>
                </form>
            
            </FormProvider>
        </div>
    );
}