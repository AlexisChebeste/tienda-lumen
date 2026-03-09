import { z } from "zod"
import { CreateTelefonoSchema } from "./telefono.schema"
import { CreateDireccionSchema } from "./direccion.schema"

export const CreateCheckoutSchema = z.object({
    nombre: z.string()
        .min(1, "Nombre es requerido")
        .max(100, "Máximo 100 caracteres"),
    email: z.string().email("Email inválido"),
    telefono: CreateTelefonoSchema,
    direccion: CreateDireccionSchema,
    shipping: z.object({
        method: z.enum(["standard", "express"]),
    }),
    payment: z.object({
        method: z.enum(["card"]),
    }),
})

const CheckoutSchema = CreateCheckoutSchema.extend({
    id: z.string().uuid("ID de checkout inválido (esperado UUID)")
})

export type CreateCheckoutSchema = z.infer<typeof CreateCheckoutSchema>;
export type CheckoutSchema = z.infer<typeof CheckoutSchema>;
