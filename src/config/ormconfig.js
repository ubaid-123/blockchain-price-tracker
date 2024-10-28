const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "crypto_db",
  synchronize: true,
  entities: ["src/entities/*.js"],
};
