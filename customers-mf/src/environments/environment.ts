// Auto-detect environment
const isProduction = typeof window !== 'undefined' && window.location.hostname !== 'localhost';

export const environment = {
  production: isProduction,
  aot: true,
  apiUrl: isProduction 
    ? 'https://customers-mf-angular-f4duaa06u-carlos-alberto-rs-projects.vercel.app/api/customers'
    : 'http://localhost:3002/customers'
};

export const environmentProd = {
  production: true,
  aot: true,
  apiUrl: 'https://customers-mf-angular-f4duaa06u-carlos-alberto-rs-projects.vercel.app/api/customers'
};