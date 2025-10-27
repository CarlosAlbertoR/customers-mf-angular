// Environment configuration for shell
const isDevelopment = process.env.NODE_ENV === 'development';

export const shellConfig = {
  customersMFUrl: isDevelopment 
    ? 'http://localhost:3001/mf-manifest.json'
    : 'https://customers-mf-angular-f4duaa06u-carlos-alberto-rs-projects.vercel.app/customers-mf/mf-manifest.json'
};
