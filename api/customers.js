// Vercel Function para API de Customers
const fs = require('fs');
const path = require('path');

// Cargar datos del archivo db.json
const dbPath = path.join(__dirname, '../customers-mf/db.json');
let customers = [];

try {
  const dbData = fs.readFileSync(dbPath, 'utf8');
  const db = JSON.parse(dbData);
  customers = db.customers || [];
} catch (error) {
  console.error('Error loading db.json:', error);
  customers = [];
}

// Función principal de la API
module.exports = (req, res) => {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Manejar preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Obtener el método HTTP y la URL
  const method = req.method;
  const url = req.url;

  console.log(`API Request: ${method} ${url}`);

  // Manejar diferentes métodos HTTP
  switch (method) {
    case 'GET':
      if (url === '/api/customers' || url === '/api/customers/') {
        // GET /api/customers - Obtener todos los clientes
        return res.status(200).json(customers);
      } else if (url.startsWith('/api/customers/')) {
        // GET /api/customers/:id - Obtener un cliente específico
        const id = url.split('/').pop();
        const customer = customers.find(c => c.id === id);
        if (customer) {
          return res.status(200).json(customer);
        } else {
          return res.status(404).json({ error: 'Customer not found' });
        }
      }
      break;

    case 'POST':
      if (url === '/api/customers' || url === '/api/customers/') {
        // POST /api/customers - Crear nuevo cliente
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });
        req.on('end', () => {
          try {
            const newCustomer = JSON.parse(body);
            newCustomer.id = (customers.length + 1).toString();
            newCustomer.createdAt = new Date().toISOString();
            newCustomer.updatedAt = new Date().toISOString();
            customers.push(newCustomer);
            return res.status(201).json(newCustomer);
          } catch (error) {
            return res.status(400).json({ error: 'Invalid JSON' });
          }
        });
        return;
      }
      break;

    case 'PUT':
      if (url.startsWith('/api/customers/')) {
        // PUT /api/customers/:id - Actualizar cliente
        const id = url.split('/').pop();
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });
        req.on('end', () => {
          try {
            const updatedCustomer = JSON.parse(body);
            const index = customers.findIndex(c => c.id === id);
            if (index !== -1) {
              updatedCustomer.id = id;
              updatedCustomer.updatedAt = new Date().toISOString();
              customers[index] = { ...customers[index], ...updatedCustomer };
              return res.status(200).json(customers[index]);
            } else {
              return res.status(404).json({ error: 'Customer not found' });
            }
          } catch (error) {
            return res.status(400).json({ error: 'Invalid JSON' });
          }
        });
        return;
      }
      break;

    case 'DELETE':
      if (url.startsWith('/api/customers/')) {
        // DELETE /api/customers/:id - Eliminar cliente
        const id = url.split('/').pop();
        const index = customers.findIndex(c => c.id === id);
        if (index !== -1) {
          customers.splice(index, 1);
          return res.status(200).json({ message: 'Customer deleted successfully' });
        } else {
          return res.status(404).json({ error: 'Customer not found' });
        }
      }
      break;
  }

  // Si no se encuentra la ruta
  return res.status(404).json({ error: 'Not found' });
};
