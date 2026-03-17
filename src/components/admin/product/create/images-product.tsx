import { ImagePlus, Trash2 } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import Image from "next/image";
import { Color } from "@/domain/colors";
import SelectColor from "./select-color";

interface ImageField {
    url: string;
    color_id: string;
    alt: string;
    position: number;
    is_main: boolean;
}

interface FormValues {
    images: ImageField[];
}

export default function ImagesProduct({ colors }: { colors: Color[] }) {
    const { control, register, formState: { errors }, setValue, watch } = useFormContext<FormValues>()
    const images = watch("images")

    const { fields, append, remove } = useFieldArray<FormValues>({
        control,
        name: "images"
    })

    function handleSetMain(index: number) {
        images.forEach((_, i) => {
            setValue(`images.${i}.is_main`, i === index)
        })
    }
    
    return (

        <section className="flex flex-col gap-4 max-w-4xl mx-auto w-full mt-4">
            <h2 className="font-serif text-xl font-light">Imagenes del producto</h2>
            <div className="flex  justify-between items-center gap-2 ">
                <p className="text-sm text-gray-700 w-full">Agrega imágenes del producto</p>
                <button
                    className="input-form min-w-max sm:w-20! justify-center sm:self-end flex items-center gap-1"
                    type="button"
                    onClick={() => append({
                        url: "",
                        color_id: "",
                        alt: "",
                        position: fields.length,
                        is_main: fields.length === 0
                    })}
                >
                    <ImagePlus size={16} />
                    Agregar Imagen
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 p-4 border border-dashed gap-4 min-h-32 place-items-center  rounded-lg">
            {fields.length === 0 ? (
                    <p className="text-center text-gray-500 col-span-full">No hay imágenes. Agrega al menos una imagen principal.</p>
                ) : (
                    fields.map((image, idx) => (
                        <div key={image.id} className="flex flex-col w-full gap-4 items-center">
                            <div className="flex gap-2 h-full w-full">
                                <Image src={image.url || "/placeholder.jpg"} alt={image.alt || "Imagen del producto"} width={128} height={128} className="object-cover rounded-md border" />
                                <div className="flex flex-col w-full items-center justify-between">
                                    <input type="text" id={`image-url-${idx}`} placeholder={image.alt ? image.alt : "https://ejemplo.com/imagen.jpg"} className="input-form"
                                        {...register(`images.${idx}.url`)}
                                    />
                                    <div className="flex gap-2">
                                        <label htmlFor="isMain" className="flex items-center gap-2 text-xs">
                                            <input
                                                type="checkbox"
                                                checked={images?.[idx]?.is_main || false}
                                                onChange={() => handleSetMain(idx)}
                                            />
                                            Marcar producto como destacado
                                        </label>
                                    </div>

                                    <input type="text" id={`image-alt-${idx}`} placeholder="Texto alternativo" className="input-form"
                                        {...register(`images.${idx}.alt`)}
                                    />

                                </div>
                            </div>

                            <div className="flex  gap-2 w-full">
                                <SelectColor
                                    colors={colors}
                                    name={`images.${idx}.color_id`}
                                />
                                <button className="flex text-gray-500 hover:text-red-700 cursor-pointer items-end py-3 h-full" onClick={() => remove(idx)}>
                                    <Trash2 size={18} />
                                </button>
                            </div>

                        </div>
                    ))
                ) }
            </div>

            {errors.images && (
                <p className="text-red-600 text-sm mt-1">
                    {typeof errors.images.message === "string" ? errors.images.message :  "Completar las imágenes del producto correctamente."}
                </p>
            )}
        </section>    
    )
}