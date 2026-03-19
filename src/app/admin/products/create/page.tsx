"use client"

import ProductFormSection from "@/components/admin/product/product-form";

export default function CreateProductPage() {
    
    return (
        <div className="flex-1 flex flex-col gap-6 mx-auto w-full h-full min-h-max">
            <section className="flex flex-col gap-1">
                <h1 className="font-serif text-3xl font-light">Nuevo Producto</h1>
                <p className="text-gray-500 text-sm">Crea un nuevo producto en el catálogo</p>
            </section>

            <ProductFormSection mode="create" />

        </div>
    );
}