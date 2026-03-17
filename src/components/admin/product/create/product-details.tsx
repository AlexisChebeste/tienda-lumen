import { X } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";


export default function ProductDetails() {

    const {control, register, formState: { errors }} = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "details"
    })

    const [inputValue, setInputValue] = useState<string>("")

    const addDetail = () => {
        if (!inputValue.trim()) return

        append({ value: inputValue })
        setInputValue("")
    }
    
    return (
        <div className="md:col-span-2 w-full flex flex-col items-center gap-4">

            <div className="flex flex-row gap-4 w-full">
                <div className="flex flex-col gap-2 w-full">
                <label htmlFor="product-details" className="font-medium text-sm">Detalles del producto</label>
                <input
                    type="text"
                    id="product-details"
                    placeholder="Ej: 100% algodón"
                    className="input-form "
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault()
                            addDetail()
                        }
                    }}
                />
            </div>
            <button
                className="input-form w-max! self-end"
                type="button"
                onClick={addDetail}
            >
                Agregar
            </button>
            </div>
            {errors.details && (
                <p className="text-red-500 text-sm w-full">
                {typeof errors.details.message === "string" ? errors.details.message : "Error"}
                </p>
            )}

            <div className="flex flex-wrap gap-2 w-full">
                {fields.map((field, index) => (
                    <div 
                        key={field.id} 
                        className="px-3 py-1 flex items-center gap-1 bg-gray-200 rounded-full text-sm"
                    >
                        <button 
                            type="button"
                            onClick={() => remove(index)}
                            className="cursor-pointer text-gray-500 hover:text-red-700" 
                        >
                            <X size={14}  />
                        </button>

                        <span>
                            {(field as unknown as { value: string }).value}
                        </span>

                        <input
                            type="hidden"
                            {...register(`details.${index}.value`)}
                        />
                    </div>
                ))}
            </div>
        </div>

    )
}