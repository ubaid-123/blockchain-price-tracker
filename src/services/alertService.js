const { AppDataSource } = require("../config/db");
const Alert = require("../entities/Alert");
const { sendEmail } = require("./emailService");

async function setAlert(chain, dollar, email) {
  const alertRepository = AppDataSource.getRepository(Alert);
  const currentDate = new Date();
  const alert = alertRepository.create({ chain, dollar, email, createdAt: currentDate });
  await alertRepository.save(alert);
}

async function checkAlerts(currentPrices) {
  const alertRepo = AppDataSource.getRepository(Alert);

  const alerts = await alertRepo.find();
  for (const alert of alerts) {
    if (
      (alert.chain === "ethereum" && currentPrices.ethereum == alert.dollar) ||
      (alert.chain === "polygon" && currentPrices.polygon == alert.dollar)
    ) {
      await sendEmail(
        alert.email,
        `Price Alert for ${alert.chain}`,
        `The price of ${alert.chain} has reached ${alert.dollar} USD!`
      );
    }
  }
}

module.exports = { setAlert, checkAlerts };
