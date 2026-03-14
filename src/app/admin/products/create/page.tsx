"use client"

import { CategoryNew } from "@/components/admin/product/category-new";
import { ProductImage } from "@/domain/product-image";
import { ProductVariantCreate } from "@/domain/variants";
import { ImagePlus, Plus, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function CreateProductPage() {

    const [details, setDetails] = useState<string[]>([])
    const [detailsInput, setDetailsInput] = useState<string>("")
    const [variants, setVariants] = useState<ProductVariantCreate[]>([])
    const [images, setImages] = useState<ProductImage[]>([])

    function createVariant() {
        const newVariant: ProductVariantCreate = {
            id: crypto.randomUUID(),
            productId: "", // Este campo se llenará al crear el producto
            colorId: "", // Aquí podrías implementar una selección de colores
            sizeId: "", // Aquí podrías implementar una selección de tallas
            price: 0, // Precio adicional para esta variante
            stock: 0, // Stock inicial para esta variante
            sku: "" // SKU único para esta variante
        }
        setVariants(prev => [...prev, newVariant])
    }

    function createImage() {
        const newImage: ProductImage = {
            id: crypto.randomUUID(),
            productId: "", // Este campo se llenará al crear el producto
            url: "", // URL de la imagen (podrías implementar una subida de archivos)
            color_id: "", // Asociar imagen a un color específico (opcional)
            alt: "", // Texto alternativo para la imagen
            position: images.length, // Posición de la imagen (se puede usar para ordenar)
            isMain: images.length === 0 // La primera imagen agregada se marca como principal por defecto
        }
        setImages(prev => [...prev, newImage])
    }

    return (
        <div className="flex-1 flex flex-col gap-6 mx-auto w-full h-full p-4 min-h-max">
            <section className="flex flex-col gap-1">
                <h1 className="font-serif text-3xl font-light">Nuevo Producto</h1>
                <p className="text-gray-500 text-sm">Crea un nuevo producto en el catálogo</p>
            </section>

            <div className="flex flex-col gap-4 border rounded-xl p-4 lg:py-12 w-full h-full mx-auto min-h-max">

                <section className="flex flex-col gap-4 max-w-4xl mx-auto w-full">
                    <h2 className="font-serif text-xl font-light">Información del Producto</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="product-name" className="font-medium text-sm">Nombre</label>
                            <input type="text" id="product-name" placeholder="Nombre del producto" className="input-form" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="product-slug" className="font-medium text-sm">Slug</label>
                            <input type="text" id="product-slug" placeholder="Slug del producto" className="input-form" />
                        </div>
                        <div className="flex flex-col gap-2 md:col-span-2">
                            <label htmlFor="product-description" className="font-medium text-sm">Descripción</label>
                            <textarea id="product-description" placeholder="Descripción del producto..." className="input-form"></textarea>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="product-price" className="font-medium text-sm">Precio base</label>
                            <input type="number" id="product-price" placeholder="Precio del producto" className="input-form" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="product-category" className="font-medium text-sm">Categoría</label>
                            <CategoryNew />
                        </div>
                        <div className="md:col-span-2 w-full flex flex-col items-center gap-4">

                            <div className="flex flex-row gap-4 w-full">
                                <div className="flex flex-col gap-2 w-full">
                                <label htmlFor="product-details" className="font-medium text-sm">Detalles del producto</label>
                                <input
                                    type="text"
                                    id="product-details"
                                    placeholder="Ej: 100% algodón"
                                    className="input-form "
                                    value={detailsInput}
                                    onChange={e => setDetailsInput(e.target.value)}
                                />
                            </div>
                            <button
                                className="input-form w-max! self-end"
                                type="button"
                                onClick={() => {
                                    if (detailsInput.trim()) {
                                        setDetails(prev => [...prev, detailsInput.trim()]);
                                        setDetailsInput("");
                                    }
                                }}
                            >
                                Agregar
                            </button>
                            </div>

                            <div className="flex flex-wrap gap-2 w-full">
                                {details.map((detail, idx) => (
                                    <div key={idx} className="px-3 py-1 flex items-center gap-1 bg-gray-200 rounded-full text-sm">
                                        <button className="cursor-pointer text-gray-500 hover:text-red-700" onClick={() => setDetails(prev => prev.filter((_, i) => i !== idx))}>
                                            <X size={14}  />
                                        </button>
                                        <span>{detail}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <label htmlFor="isMain" className="flex items-center gap-2 text-sm">
                                <input
                                    type="checkbox"
                                    name="isMain"
                                    id="isMain"
                                    className="size-4 rounded-lg accent-black cursor-pointer checked:rounded-md"
                                />
                                Marcar producto como destacado
                            </label>
                        </div>
                    </div>

                </section>
                
                <section className="flex flex-col gap-4 max-w-4xl mx-auto w-full mt-4">
                    <h2 className="font-serif text-xl font-light">Variantes del producto</h2>
                    <div className="flex justify-between items-center gap-2 ">
                        <p className="text-sm text-gray-700">Define las combinaciones de color y talla disponibles</p>
                        <button
                            className="input-form w-max! self-end flex items-center gap-1"
                            type="button"
                            onClick={createVariant}
                        >
                            <Plus size={14} />
                            Agregar variante
                        </button>
                    </div>

                    <div className="flex flex-col p-4 border border-dashed gap-4 min-h-32 items-center justify-center rounded-lg">
                       {variants.length === 0 ? (
                            <p className="text-center text-gray-500">No hay variantes. Agrega al menos una para poder vender este producto.</p>
                        ) : (
                            variants.map((variant, idx) => (
                                <div key={idx} className="flex  gap-2 w-full items-center">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor={`variant-color-${idx}`} className="font-medium text-sm">Color</label>
                                        <input type="text" id={`variant-color-${idx}`} placeholder="Color (ej: Rojo)" className="input-form" 
                                            value={variant.colorId} defaultValue={""}
                                            onChange={e => {
                                                const newColorId = e.target.value;
                                                setVariants(prev => prev.map((v, i) => i === idx ? { ...v, colorId: newColorId } : v));
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor={`variant-size-${idx}`} className="font-medium text-sm">Talla</label>
                                        <input type="text" id={`variant-size-${idx}`} placeholder="Talla (ej: M)" className="input-form" 
                                            value={variant.sizeId} defaultValue={""}
                                            onChange={e => {
                                                const newSizeId = e.target.value;
                                                setVariants(prev => prev.map((v, i) => i === idx ? { ...v, sizeId: newSizeId } : v));
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor={`variant-price-${idx}`} className="font-medium text-sm">Precio</label>
                                        <input type="number" id={`variant-price-${idx}`}  className="input-form" 
                                            value={variant.price}  defaultValue={0}
                                            onChange={e => {
                                                const newPrice = parseFloat(e.target.value);
                                                setVariants(prev => prev.map((v, i) => i === idx ? { ...v, price: isNaN(newPrice) ? 0 : newPrice } : v));
                                            }}    
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                            <label htmlFor={`variant-stock-${idx}`} className="font-medium text-sm">Stock</label>
                                            <input type="number" id={`variant-stock-${idx}`}  className="input-form" 
                                                value={variant.stock} defaultValue={0}
                                                onChange={e => {
                                                    const newStock = parseInt(e.target.value);
                                                    setVariants(prev => prev.map((v, i) => i === idx ? { ...v, stock: isNaN(newStock) ? 0 : newStock } : v));
                                                }}    
                                            />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor={`variant-sku-${idx}`} className="font-medium text-sm">SKU</label>
                                        <input type="text" id={`variant-sku-${idx}`} placeholder="ABC-EDF" className="input-form" 
                                            value={variant.sku} defaultValue={""} 
                                            onChange={e => {
                                                const newSku = e.target.value;
                                                setVariants(prev => prev.map((v, i) => i === idx ? { ...v, sku: newSku } : v));
                                            }}
                                        />
                                    </div>
                                    <button className="flex text-gray-500 hover:text-red-700 cursor-pointer items-end py-3 h-full" onClick={() => setVariants(prev => prev.filter((_, i) => i !== idx))}>
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))
                        ) }
                    </div>
                </section>

                <section className="flex flex-col gap-4 max-w-4xl mx-auto w-full mt-4">
                    <h2 className="font-serif text-xl font-light">Imagenes del producto</h2>
                    <div className="flex justify-between items-center gap-2 ">
                        <p className="text-sm text-gray-700">Agrega imágenes del producto (asociar a un color específico)</p>
                        <button
                            className="input-form w-max! self-end flex items-center gap-1"
                            type="button"
                            onClick={createImage}
                        >
                            <ImagePlus size={14} />
                            Agregar Imagen
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 p-4 border border-dashed gap-4 min-h-32 place-items-center  rounded-lg">
                       {images.length === 0 ? (
                            <p className="text-center text-gray-500 lg:col-span-2">No hay imágenes. Agrega al menos una imagen principal.</p>
                        ) : (
                            images.map((image, idx) => (
                                <div key={idx} className="flex flex-col w-full gap-4 items-center">
                                    <div className="flex gap-2 h-full w-full">
                                        <Image src={image.url || "/placeholder.png"} alt={image.alt || "Imagen del producto"} width={128} height={128} className="object-cover rounded-md border" />
                                        <div className="flex flex-col w-full items-center justify-between">
                                            <input type="text" id={`image-url-${idx}`} placeholder="https://ejemplo.com/imagen.jpg" className="input-form"
                                                value={image.url} defaultValue={""}
                                                onChange={e => {
                                                    const newUrl = e.target.value;
                                                    setImages(prev => prev.map((img, i) => i === idx ? { ...img, url: newUrl } : img));
                                                }}
                                            />

                                            <input type="text" id={`image-alt-${idx}`} placeholder="Texto alternativo" className="input-form"
                                                value={image.alt} defaultValue={""}
                                                onChange={e => {
                                                    const newAlt = e.target.value;
                                                    setImages(prev => prev.map((img, i) => i === idx ? { ...img, alt: newAlt } : img));
                                                }}
                                            />

                                        </div>
                                    </div>

                                    <div className="flex  gap-2 w-full">
                                        <input type="text" id={`image-color-${idx}`} placeholder="Color (ej: Rojo)" className="input-form" 
                                            value={image.color_id} defaultValue={""}
                                            onChange={e => {
                                                const newColorId = e.target.value;
                                                setImages(prev => prev.map((img, i) => i === idx ? { ...img, color_id: newColorId } : img));
                                            }}
                                        />
                                        
                                        <button className="flex text-gray-500 hover:text-red-700 cursor-pointer items-end py-3 h-full" onClick={() => setImages(prev => prev.filter((_, i) => i !== idx))}>
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) }
                    </div>
                </section>

                <section className="max-w-4xl w-full flex gap-4 items-center mx-auto justify-end">
                    <button className="btn-secondary">
                        Cancelar
                    </button>
                    <button className="btn-primary">
                        Crear producto
                    </button>
                </section>
            </div>
        </div>
    );
}