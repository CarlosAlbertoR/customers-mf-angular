// Vercel Function para API de Customers usando json-server
const jsonServer = require('json-server');
const path = require('path');

// Crear el servidor json-server
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

// Usar middlewares
server.use(middlewares);
server.use('/api', router);

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

  console.log(`API Request: ${req.method} ${req.url}`);
  
  // Procesar la request con json-server
  server(req, res);
};
