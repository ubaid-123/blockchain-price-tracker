const express = require("express");
const logger = require("morgan");
const { initializeDatabase } = require("./config/db");
const priceRoutes = require("./controllers/priceController");
const alertRoutes = require("./controllers/alertController");
const cronJob = require("./cron/priceCron");
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./config/swagger');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(logger("dev"));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

(async () => {
  const isInit = await initializeDatabase();

  if (isInit) {
    console.log("Database is initialized, setting up routes.");
    app.use("/price", priceRoutes);
    app.use("/alert", alertRoutes);
    cronJob.start();
  } else {
    console.error("Database initialization failed. Exiting...");
    process.exit(1);
  }
})();

module.exports = { app };
