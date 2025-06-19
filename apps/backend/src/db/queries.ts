// backend/db/queries.ts

// Consultas para la tabla de productos
export const productQueries = {
  getAll: 'SELECT * FROM products',
  getById: 'SELECT * FROM products WHERE id = ?',
  create: 'INSERT INTO products (name, price) VALUES (?, ?)',
  update: 'UPDATE products SET name = ?, price = ? WHERE id = ?',
  delete: 'DELETE FROM products WHERE id = ?'
};

// Consultas para otras tablas pueden agregarse aquí