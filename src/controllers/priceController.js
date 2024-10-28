const express = require("express");
const { getHourlyDataLast24Hours } = require("../services/priceService");
const router = express.Router();

/**
 * @swagger
 * /price/hourly:
 *   get:
 *     summary: Get hourly prices for the last 24 hours.
 *     responses:
 *       200:
 *         description: A list of prices.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ethereum:
 *                     type: number
 *                   polygon:
 *                     type: number
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 */
router.get("/hourly", async (req, res) => {
  try {
    const prices = await getHourlyDataLast24Hours();
    res.json(prices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
