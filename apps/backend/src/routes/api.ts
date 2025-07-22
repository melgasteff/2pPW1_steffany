import { Router } from 'express';
import { Request, Response } from 'express';
import { login } from 'src/controller/auth.controller';
import { createCasamiento, deleteCasamiento, getAllCasamientos, updateCasamiento } from 'src/controller/casamientos.controller';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from 'src/controller/product.controller';
import { createSale, deleteSale, getAllSales, updateSale } from 'src/controller/sales.controller';
import verifyToken from 'src/middleware/auth';

const router = Router();


router.get('/dashboard', (req:Request, res:Response) => {
  const response = {
    message: 'Bienvenido a la API de la tienda',

  };
  res.json(response);
});

router.get('/status', (req, res) => {
  res.json({ status: 'OK' });
});

router.post('/login', login);

router.get('/me', verifyToken, (req, res) => {
  res.json({ user: req.user });
});

router.get('/products', verifyToken, getAllProducts);
router.post('/products', verifyToken, createProduct);
router.put('/products/:id', verifyToken, updateProduct);
router.delete('/products/:id', verifyToken, deleteProduct);

router.get('/casamientos', getAllCasamientos);
router.post('/casamientos', createCasamiento);
router.put('/editcasamiento/:id', updateCasamiento);
router.delete('/deletecasamiento/:id', deleteCasamiento);

router.get('/ventas', getAllSales);
router.post('/ventas', createSale);
router.put('/ventas/:id', updateSale);
router.delete('/ventas/:id', deleteSale);

export default router;
