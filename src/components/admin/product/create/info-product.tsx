"use client"

import CategoryNew  from "@/components/admin/product/category-new";
import { useFormContext } from "react-hook-form";
import ProductDetails from "./product-details";

export default function InfoProduct() {

    const {register, formState: { errors }} = useFormContext();

    return (
        <section className="flex flex-col gap-4 max-w-4xl mx-auto w-full">
            <h2 className="font-serif text-xl font-light">Información del Producto</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/*Nombre */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="product-name" className="font-medium text-sm">Nombre</label>
                    <input type="text" id="product-name" {...register("name")} placeholder="Nombre del producto" className="input-form" />
                    {errors.name && (
                        <p className="text-red-500 text-sm">
                        {typeof errors.name.message === "string" ? errors.name.message : "Error"}
                        </p>
                    )}
                </div>

                {/*Slug */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="product-slug" className="font-medium text-sm">Slug</label>
                    <input type="text" id="product-slug" {...register("slug")} placeholder="Slug del producto" className="input-form" />
                    {errors.slug && (
                        <p className="text-red-500 text-sm">
                        {typeof errors.slug.message === "string" ? errors.slug.message : "Error"}
                        </p>
                    )}
                </div>

                {/*Descripción */}
                <div className="flex flex-col gap-2 md:col-span-2">
                    <label htmlFor="product-description" className="font-medium text-sm">Descripción</label>
                    <textarea id="product-description" {...register("description")} placeholder="Descripción del producto..." className="input-form"></textarea>
                    {errors.description && (
                        <p className="text-red-500 text-sm">
                        {typeof errors.description.message === "string" ? errors.description.message : "Error"}
                        </p>
                    )}

                </div>

                {/*Precio base */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="product-price" className="font-medium text-sm">Precio base</label>
                    <input type="number" id="product-price" {...register("base_price", { valueAsNumber: true })} placeholder="Precio del producto" className="input-form" 
                        defaultValue={0}
                    />
                    {errors.base_price && (
                        <p className="text-red-500 text-sm">
                        {typeof errors.base_price.message === "string" ? errors.base_price.message : "Error"}
                        </p>
                    )}
                </div>

                {/*Categoría */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="product-category" className="font-medium text-sm">Categoría</label>
                    <CategoryNew />
                    {errors.category_id && (
                        <p className="text-red-500 text-sm">
                        {typeof errors.category_id.message === "string" ? errors.category_id.message : "Error"}
                        </p>
                    )}
                </div>

                {/*Detalles */}
                <ProductDetails />

                {/*Producto destacado */}
                <div className="flex gap-2">
                    <label htmlFor="isMain" className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            {...register("is_popular")}
                            id="isMain"
                            className="size-4 rounded-lg accent-black cursor-pointer checked:rounded-md"
                        />
                        Marcar producto como destacado
                    </label>
                </div>

            </div>

        </section>
    )
}