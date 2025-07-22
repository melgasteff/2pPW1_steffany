import { db } from "src/db/connection"
import { casamientos } from "src/db/schema"
import { Request, Response } from 'express';
import { and, desc, eq, or } from "drizzle-orm";
import { datetime } from "drizzle-orm/singlestore-core";


export const getAllCasamientos = async (req: Request, res: Response) => {
    try {
        const allCasamientos = await db.select().from(casamientos).limit(10)
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
        const fecha = new Date().toISOString().split('T')[0];
        const result = await db.insert(casamientos).values({persona1, persona2, fecha}).$returningId();
        res.status(201).json({message : 'Casamiento Creado', casamiento: result[0]})
    } catch (error) {
        res.status(500).json({message: 'Error al crear el casamiento'})
    }
}

export const updateCasamiento = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { persona1, persona2 } = req.body;
  try {
    await db.update(casamientos)
      .set({ persona1, persona2 })
      .where(eq(casamientos.id, Number(id)));
    res.json({ message: 'Casamiento actualizado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el casamiento' });
  }
};

export const deleteCasamiento = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await db.delete(casamientos)
      .where(eq(casamientos.id, Number(id)));
    res.json({ message: 'Casamiento eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el casamiento' });
  }
};