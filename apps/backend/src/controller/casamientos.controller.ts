import { db } from "src/db/connection"
import { casamientos } from "src/db/schema"
import { Request, Response } from 'express';
import { and, desc, eq, or } from "drizzle-orm";


export const getAllCasamientos = async (req: Request, res: Response) => {
    try {
        const allCasamientos = await db.select().from(casamientos).limit(5).orderBy(desc(casamientos.id))
        res.json(allCasamientos);
    } catch (e) {
        res.status(500).json({message: 'Error al obtener los casamientos'})
    }
};

export const createCasamiento = async (req : Request, res: Response) => {
    const {persona1, persona2} = req.body
    try {
       const casados = await db.select()
        .from(casamientos)
        .where(
            or(
                and(
                    eq(casamientos.persona1, req.body.persona1),
                    eq(casamientos.persona2, req.body.persona2),
                ),
                and(
                    eq(casamientos.persona1, req.body.persona2),
                    eq(casamientos.persona2, req.body.persona1),
                )
            )
        )
        if(casados.length > 0) {
            res.status(400).json({message: 'Estas personas ya estan casadas'})
            return;
        }
        const result = await db.insert(casamientos).values({persona1, persona2});
        res.status(201).json({message : 'Casamiento Creado', result})
    } catch (error) {
        res.status(500).json({message: 'Error al crear el casamiento'})
    }
}