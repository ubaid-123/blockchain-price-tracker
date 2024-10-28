const { DataSource } = require("typeorm");
const ormconfig = require("./ormconfig");

const AppDataSource = new DataSource(ormconfig);

async function initializeDatabase() {
  try {
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");
    return true;
  } catch (err) {
    console.error("Error during Data Source initialization", err);
    return false;
  }
}

module.exports = { AppDataSource, initializeDatabase };
