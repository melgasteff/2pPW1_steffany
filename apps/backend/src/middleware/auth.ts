import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("Falta definir JWT_SECRET en el archivo .env");
}

const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies?.token;

  if (!token) {
    res.status(401).json({ message: "No token" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Token inválido o expirado" });
  }
};

export default verifyToken;
