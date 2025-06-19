// backend/src/validations/puestos.ts
import { z } from 'zod';

export const PuestoSchema = z.object({
    nombre: z.string().min(3),
    categoria: z.enum(['dulce', 'salado', 'bebidas']),
});