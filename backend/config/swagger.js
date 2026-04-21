const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Rahima Store API',
      version: '1.0.0',
      description: 'Documentation de l\'API Rahima Store (MERN Stack). Cette API permet la gestion des produits, des commandes, des utilisateurs et des notifications.',
      contact: {
        name: 'Rahima Store Support',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
        description: 'Serveur de Développement',
      },
      {
        url: 'https://rahima-store-api.onrender.com/api',
        description: 'Serveur de Production',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'], // Chemins vers les fichiers de routes contenant les annotations Swagger
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
