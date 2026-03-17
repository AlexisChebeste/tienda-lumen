
import { Color } from "@/domain/colors"
import { Plus, Trash2 } from "lucide-react"
import { useFieldArray, useFormContext } from "react-hook-form"
import SelectColor from "./select-color"
import { useEffect, useState } from "react"
import { getSizes } from "@/services/filter.service"
import SelectSize from "./select-sizes"
import { Size } from "@/domain/sizes"


export default function VariantsProduct({ colors }: { colors: Color[] }) {
    const { control, register, formState: { errors } } = useFormContext()

    const { fields, append, remove } = useFieldArray({
        control,
        name: "variants"
    })


    const [sizes, setSizes] = useState<Size[]>([])

    useEffect(() => {
        const fetchSizes = async () => {
            const data = await getSizes()
            setSizes(data)
        }

        fetchSizes()
    }, [])

    return (
        <section className="flex flex-col gap-4 max-w-4xl mx-auto w-full mt-4">
            <h2 className="font-serif text-xl font-light">Variantes del producto</h2>
            <div className="flex justify-between items-center gap-2 ">
                <p className="text-sm text-gray-700 w-full">Define las combinaciones de color y talla disponibles</p>
                <button
                    className="input-form min-w-max sm:w-20! justify-center sm:self-end flex items-center gap-1"
                    type="button"
                    onClick={() =>
                        append({
                            color_id: colors[0]?.id || "",
                            size_id: sizes[0]?.id || "",
                            price: 0,
                            stock: 0,
                            sku: ""
                        })
                    }
                >
                    <Plus size={14} />
                    Agregar variante
                </button>
            </div>
                    
            <div className="flex flex-col p-4 border border-dashed gap-4 min-h-32 items-center justify-center rounded-lg">
            {fields.length === 0 ? (
                    <p className="text-center text-gray-500">No hay variantes. Agrega al menos una para poder vender este producto.</p>
                ) : (
                    fields.map((field, idx) => (
                        <div key={field.id} className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-7 w-full items-center ">
                            <div className="flex flex-col gap-2 ">
                                <label htmlFor={`variant-color-${idx}`} className="font-medium text-sm">Color</label>
                                <SelectColor colors={colors} name={`variants.${idx}.color_id`} isVariant={true} />
                            </div>
                            <div className="flex flex-col gap-2 ">
                                <label htmlFor={`variant-size-${idx}`} className="font-medium text-sm">Talla</label>
                                <SelectSize sizes={sizes} name={`variants.${idx}.size_id`}  />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor={`variant-price-${idx}`} className="font-medium text-sm">Precio</label>
                                <input type="number" id={`variant-price-${idx}`}  className="input-form" 
                                    {...register(`variants.${idx}.price`, { valueAsNumber: true })}  
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                    <label htmlFor={`variant-stock-${idx}`} className="font-medium text-sm">Stock</label>
                                    <input type="number" id={`variant-stock-${idx}`}  className="input-form" 
                                        {...register(`variants.${idx}.stock`, { valueAsNumber: true })}
                                    />
                            </div>
                            <div className="flex flex-col gap-2  md:col-span-2">
                                <label htmlFor={`variant-sku-${idx}`} className="font-medium text-sm">SKU</label>
                                <input type="text" id={`variant-sku-${idx}`} placeholder="ABC-EDF" className="input-form" 
                                    {...register(`variants.${idx}.sku`)}
                                />
                            </div>
                            <button 
                                className="flex text-gray-500 hover:text-red-700 cursor-pointer  px-1  rounded transition-colors h-max self-end py-3 w-full justify-center" 
                                onClick={() => remove(idx)}
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))
                ) }
            </div>

            {errors.variants && (
                <p className="text-red-600 text-sm mt-1">
                    {typeof errors.variants.message === "string" ? errors.variants.message :  "Completar las variantes"}
                </p>
            )}
        </section>
    )
}