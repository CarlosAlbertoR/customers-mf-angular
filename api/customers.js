const jsonServer = require('json-server');
const path = require('path');

// Crear el servidor json-server
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, '../customers-mf/db.json'));
const middlewares = jsonServer.defaults();

// Configurar middlewares
server.use(middlewares);
server.use(jsonServer.bodyParser);

// Configurar CORS
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Usar el router de json-server
server.use('/api/customers', router);

// Exportar para Vercel Functions
module.exports = (req, res) => {
  // Manejar rutas de API
  if (req.url.startsWith('/api/customers')) {
    // Remover el prefijo /api/customers para que json-server maneje la ruta correctamente
    req.url = req.url.replace('/api/customers', '');
    return server(req, res);
  }
  
  // Para otras rutas, devolver 404
  res.status(404).json({ error: 'Not found' });
};
