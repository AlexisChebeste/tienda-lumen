'use client'

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductForm, productSchema } from "@/schemas/product.schema";
import { useEffect, useState } from "react";
import { getColors } from "@/services/filter.service";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Color } from "@/domain/colors";
import InfoProduct from "@/components/admin/product/create/info-product";
import VariantsProduct from "@/components/admin/product/create/variants-product";
import ImagesProduct from "@/components/admin/product/create/images-product";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { UUID } from "crypto";

type Props = {
    mode: "create" | "edit",
    defaultValues?: ProductForm
}

export default function ProductFormSection({mode, defaultValues}: Props) {
    const [colors, setColors] = useState<Color[]>([])

    const params = useParams();
    const { productId } = params;
    const router = useRouter();
    
    const methods = useForm<ProductForm>({
        resolver: zodResolver(productSchema),
        defaultValues: defaultValues || {
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
        
        if (mode === 'create'){
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
            router.push("/admin/products")
            router.refresh()

        } else {

            const {error} = await supabase.rpc("update_product_full", {
                p_product_id: productId as UUID || 0,
                product_data: forrmatedProduct,
                variants_data: data.variants,
                images_data: data.images
            })

            if (error) {
                const message = getErrorMessage(error)
                toast.error(message)
                return
            }

            toast.success("Producto actualizado correctamente")
            router.push("/admin/products")
            router.refresh()
        }


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
        <FormProvider {...methods}>

            <form onSubmit={methods.handleSubmit(onSubmit)}  className="flex flex-col gap-4 border rounded-xl p-4 lg:py-12 w-full h-full mx-auto min-h-max">

                <InfoProduct />
                
                <VariantsProduct colors={colors} />

                <ImagesProduct colors={colors} />

                {/*Botones */}
                <section className="max-w-4xl w-full flex gap-4 items-center mx-auto justify-end">
                    <Link href="/admin/products" className="btn-secondary"  >
                        Cancelar
                    </Link>
                    <button className="btn-primary" type="submit">
                        {mode === "create" ? "Crear Producto" : "Actualizar Producto"}
                    </button>
                </section>
            </form>
        
        </FormProvider>
    )
}