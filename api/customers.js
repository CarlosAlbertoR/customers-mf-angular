// Vercel Function para API de Customers
const fs = require('fs');
const path = require('path');

// Cargar datos desde db.json
const dbPath = path.join(__dirname, 'db.json');
let db = { customers: [] };

try {
  const data = fs.readFileSync(dbPath, 'utf8');
  db = JSON.parse(data);
} catch (error) {
  console.error('Error loading db.json:', error);
  // Datos de ejemplo si no se puede cargar el archivo
  db = {
    customers: [
      { id: '1', name: 'John Doe', email: 'john@example.com', status: 'active', createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2025-01-01T00:00:00.000Z' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com', status: 'active', createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2025-01-01T00:00:00.000Z' }
    ]
  };
}

module.exports = (req, res) => {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Manejar preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { method, url } = req;
  console.log(`API Request: ${method} ${url}`);

  // Parsear URL para obtener el ID
  const urlParts = url.split('/');
  const id = urlParts[urlParts.length - 1];

  switch (method) {
    case 'GET':
      if (id && id !== 'customers') {
        // GET /api/customers/:id
        const customer = db.customers.find(c => c.id === id);
        if (customer) {
          res.status(200).json(customer);
        } else {
          res.status(404).json({ error: 'Customer not found' });
        }
      } else {
        // GET /api/customers
        res.status(200).json(db.customers);
      }
      break;

    case 'POST':
      // POST /api/customers
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', () => {
        try {
          const newCustomer = JSON.parse(body);
          newCustomer.id = Date.now().toString();
          newCustomer.createdAt = new Date().toISOString();
          newCustomer.updatedAt = new Date().toISOString();
          db.customers.push(newCustomer);
          res.status(201).json(newCustomer);
        } catch (error) {
          res.status(400).json({ error: 'Invalid JSON' });
        }
      });
      break;

    case 'PUT':
      // PUT /api/customers/:id
      if (!id || id === 'customers') {
        return res.status(400).json({ error: 'Customer ID required' });
      }
      let updateBody = '';
      req.on('data', chunk => {
        updateBody += chunk.toString();
      });
      req.on('end', () => {
        try {
          const updatedCustomer = JSON.parse(updateBody);
          const index = db.customers.findIndex(c => c.id === id);
          if (index !== -1) {
            updatedCustomer.id = id;
            updatedCustomer.updatedAt = new Date().toISOString();
            db.customers[index] = { ...db.customers[index], ...updatedCustomer };
            res.status(200).json(db.customers[index]);
          } else {
            res.status(404).json({ error: 'Customer not found' });
          }
        } catch (error) {
          res.status(400).json({ error: 'Invalid JSON' });
        }
      });
      break;

    case 'DELETE':
      // DELETE /api/customers/:id
      if (!id || id === 'customers') {
        return res.status(400).json({ error: 'Customer ID required' });
      }
      const deleteIndex = db.customers.findIndex(c => c.id === id);
      if (deleteIndex !== -1) {
        db.customers.splice(deleteIndex, 1);
        res.status(200).json({ message: 'Customer deleted successfully' });
      } else {
        res.status(404).json({ error: 'Customer not found' });
      }
      break;

    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
};
