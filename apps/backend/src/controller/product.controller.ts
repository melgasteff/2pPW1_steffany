// src/controllers/products.ts
import { Request, Response } from 'express';
import { db } from '../db/connection';
import { products } from '../db/schema';
import { eq } from 'drizzle-orm';

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const allProducts = await db.select().from(products);
    res.json(allProducts);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los productos' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, price } = req.body;
  try {
    const result = await db.insert(products).values({ name, price });
    res.status(201).json({ message: 'Producto creado', result });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el producto' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, price } = req.body;
  try {
    await db.update(products)
      .set({ name, price })
      .where(eq(products.id, Number(id)));
    res.json({ message: 'Producto actualizado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el producto' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await db.delete(products)
      .where(eq(products.id, Number(id)));
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto' });
  }
};
