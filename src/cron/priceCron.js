const axios = require("axios");
const cron = require("node-cron");
const { AppDataSource } = require("../config/db");
const Price = require("../entities/Price");
const { checkAlerts } = require("../services/alertService");
const { sendEmail } = require("../services/emailService");
const dotenv = require("dotenv");
dotenv.config();

const HYPERHIRE_EMAIL = process.env.NOTIFICATION_EMAIL;

function calculatePercentageIncrease(oldPrice, newPrice) {
  return ((newPrice - oldPrice) / oldPrice) * 100;
}

async function checkPricesAndSendAlert(prices) {
  try {
    const priceRepository = AppDataSource.getRepository(Price);

    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const previousPrices = await priceRepository.findOne({
      where: { timestamp: oneHourAgo },
      order: { timestamp: "DESC" },
    });

    if (!previousPrices) {
      return;
    }

    const ethIncrease = calculatePercentageIncrease(
      previousPrices.ethereum,
      prices.ethereum
    );
    if (ethIncrease > 3) {
      await sendEmail(HYPERHIRE_EMAIL, "Ethereum Price Increase", ethIncrease.toFixed(2));
    }

    const polygonIncrease = calculatePercentageIncrease(
      previousPrices.polygon,
      prices.polygon
    );
    if (polygonIncrease > 3) {
      await sendEmail(HYPERHIRE_EMAIL, "Polygon Price Increase", polygonIncrease.toFixed(2));
    }

  } catch (error) {
    console.error("Error checking prices:", error);
  }
}

const cronJob = cron.schedule("*/5 * * * * ", async () => {
  try {
    const { data } = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum,matic-network&vs_currencies=usd"
    );
    const ethPrice = data.ethereum.usd;
    const polygonPrice = data["matic-network"].usd;

    const prices = {
      ethereum: ethPrice,
      polygon: polygonPrice,
      timestamp: new Date(),
    };
    console.log("cron job running");

    const priceRepo = AppDataSource.getRepository(Price);
    await priceRepo.save(prices);
    await checkAlerts(prices);
    await checkPricesAndSendAlert(prices);
  } catch (error) {
    console.error("Error fetching prices:", error);
  }
});

module.exports = cronJob;
