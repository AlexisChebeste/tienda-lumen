import {z} from 'zod';

export const CreateDireccionSchema = z.object({
    calle: z.string()
        .min(1, "Calle es requerida")
        .max(100, "Máximo 100 caracteres"),
    numero: z.string()
        .min(1, "Número es requerido")
        .max(10, "Máximo 10 caracteres"),
    ciudad: z.string()
        .min(1, "Ciudad es requerida")
        .max(50, "Máximo 50 caracteres"),
    provincia: z.string()
        .min(1, "Provincia es requerido")
        .max(50, "Máximo 50 caracteres"),
    codigo_postal: z.string()
        .min(1, "Código postal es requerido")
        .max(10, "Máximo 10 caracteres"),
})

export const DireccionSchema = CreateDireccionSchema.extend({
    _id: z.string().regex(/^[a-f\d]{24}$/i, "ID de direccion inválido (esperado ObjectId de 24 caracteres hexadecimales)"),
});

export const UpdateDireccionSchema = CreateDireccionSchema.partial().extend({
    _id: z.string().regex(/^[a-f\d]{24}$/i, "ID de direccion inválido (esperado ObjectId de 24 caracteres hexadecimales)"),
});

export type DireccionSchema = z.infer<typeof DireccionSchema>;
export type CreateDireccionSchema = z.infer<typeof CreateDireccionSchema>;
export type UpdateDireccionSchema = z.infer<typeof UpdateDireccionSchema>;