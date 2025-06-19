import { Request, Response } from 'express';

const User = (req:Request, res: Response) => {
    res.json({ message: 'Ruta protegida', user: 'Nombre' });
}



export { User };