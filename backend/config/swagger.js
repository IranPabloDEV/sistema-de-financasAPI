const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "API Controle Financeiro",

      version: "1.0.0",

      description: "API CRUD para controle financeiro",
    },

    servers: [
      {
        url: "https://sistema-de-financasapi.onrender.com",
      },
    ],
  },

  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
