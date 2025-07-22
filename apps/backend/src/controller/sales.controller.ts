import { db } from "src/db/connection";
import { casamientos, sales } from "src/db/schema";
import { Request, Response } from 'express';
import { and, desc, eq, or } from "drizzle-orm";

export const getAllSales = async (req: Request, res: Response) => {
    try {
       const allSales = await db
  .select()
  .from(sales)
  .where(eq(sales.description, "Casamiento"))
  .limit(10);
        res.json(allSales);
    } catch (e) {
        res.status(500).json({ message: 'Error al obtener los pagos' })
    }
};

export const createSale = async (req: Request, res: Response) => {
    const { monto, id_casamiento } = req.body;
    try {
        const user_id = 4
        const description = "Casamiento"
        const date = new Date()
        const result = await db.insert(sales).values({ description, date, user_id, monto, id_casamiento });
        res.status(201).json({ message: 'venta creada', result });
        console.log(result)
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la venta' });
    }
};

export const updateSale = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { description, user_id, date, monto } = req.body;
    try {
        await db.update(sales)
            .set({ description, user_id, date: new Date(date), monto })
            .where(eq(sales.id, Number(id)));
        res.json({ message: 'venta actualizada' });
    } catch (error) {
      console.log(error)
        res.status(500).json({ message: 'Error al actualizar la venta ' });
    }
};

export const deleteSale = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const venta = await db
      .select()
      .from(sales)
      .where(eq(sales.id, Number(id)))
      .limit(1);

    if (venta.length === 0) {
      return res.status(404).json({ message: "Venta no encontrada" });
    }
    const idCasamiento = venta[0].id_casamiento;
    await db.delete(sales).where(eq(sales.id, Number(id)));
    if (idCasamiento !== null && idCasamiento !== undefined) {
      await db.delete(casamientos).where(eq(casamientos.id, idCasamiento));
    }
    res.json({ message: "Venta y casamiento eliminados correctamente" });
  } catch (error) {
    console.error("Error al eliminar venta y casamiento:", error);
    res.status(500).json({ message: "Error al eliminar la venta y el casamiento" });
  }
};