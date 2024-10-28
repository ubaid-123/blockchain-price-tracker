const { AppDataSource } = require("../config/db");
const Price = require("../entities/Price");

async function getHourlyDataLast24Hours() {
  try {
    const result = await AppDataSource
      .createQueryBuilder(Price, 'price')
      .select("date_trunc('hour', price.timestamp)", 'hour')
      .addSelect('AVG(price.ethereum)', 'avg_ethereum')
      .addSelect('AVG(price.polygon)', 'avg_polygon')
      .where('price.timestamp >= NOW() - INTERVAL \'24 HOURS\'')
      .groupBy('hour')
      .orderBy('hour')
      .getRawMany();

    console.log("Hourly data (Last 24 Hours):", result);
    return result;
  } catch (error) {
    console.error("Error fetching hourly data:", error);
  }
}

module.exports = { getHourlyDataLast24Hours };



