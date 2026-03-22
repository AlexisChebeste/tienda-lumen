"use client"

import { supabase } from "@/lib/supabase/client";
import { UUID } from "crypto";
import { toast } from "sonner";


export function ChangeStatus({status, orderId}: {status: string, orderId: UUID}) {

const statusNames: Record<string, string> = {
    "pending": "Pendiente",
    "processing": "En proceso",
    "shipped": "Enviado",
    "delivered": "Entregado",
    "cancelled": "Cancelado",
};




const changeStatus = async (newStatus: string) => {
  const { error } = await supabase.rpc("update_order_status", {
    p_order_id: orderId,
    p_new_status: newStatus,
  })

  if (error) {
    
    toast.error(error.message)
    throw new Error(error.message)
  }

    toast.success("Estado del pedido actualizado")
}



  return (
    <select onChange={(e) => changeStatus(e.target.value)}
      defaultValue={status || "pending"} 
      className="w-full  bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md cursor-pointer appearance-none pr-8 bg-no-repeat bg-right" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23475569' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`, backgroundPosition: 'right 8px center'}}
    >
        {Object.entries(statusNames).map(([key, name]) => (
            <option key={key} value={key}>{name}</option>
        ))}
    </select>
  )
}

