import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Meals API',
    version: '1.0.0',
    description: 'API for searching meals and ingredients',
    contact: {
      name: 'Sergio Rodas',
      url: 'https://github.com/SergioRodas',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
};

const options: swaggerJSDoc.Options = {
  swaggerDefinition,
  apis: [
    './src/infrastructure/docs/*.ts', // Archivos de documentación
  ],
};

export const swaggerSpec = swaggerJSDoc(options);
