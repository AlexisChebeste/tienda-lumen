'use client'

import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DeleteButton({id, name, className} :    {id: string, name: string, className?: string}) {

    const [openModal, setOpenModal] = useState(false)

    const router = useRouter()

    const  handleDelete = async ()  => {
        
        const { error } = await supabase.rpc("soft_delete_product", {
        p_product_id: id || ""
        })

        if (error) {
            toast.error("Error al eliminar producto")
        } else {
            toast.success("Producto eliminado")
            router.refresh()
        }
    }

    return (
        <>
            <button className={`cursor-pointer ${className || ''}`}
                onClick={() => {
                setOpenModal(true)
            }}
            >
                <Trash2 className="inline-block lg:block mr-2 lg:mr-0 h-4 w-4 "  />
                <span className="lg:hidden">Eliminar</span>
            </button>
            {/* Modal de confirmación para eliminar producto */}
            {openModal && (
                <div className="fixed inset-0 bg-black/50 bg-opacity-50 p-2 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-lg flex flex-col items-center">
                        <h2 className="text-xl font-bold mb-4">Confirmar eliminación</h2>
                        <p className="mb-6 text-center">¿Estás seguro de que deseas eliminar el producto "<span className="font-bold">{name}</span>"?</p>
                        <div className="flex justify-end gap-4">
                        <button
                            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer font-semibold"
                            onClick={() => setOpenModal(false)}
                        >
                            Cancelar
                        </button>
                        <button
                            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 cursor-pointer font-semibold"
                            onClick={() => {
                            handleDelete()
                            setOpenModal(false)
                            }}
                        >
                            Eliminar
                        </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}