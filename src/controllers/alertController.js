const express = require("express");
const { setAlert } = require("../services/alertService");
const router = express.Router();

/**
 * @swagger
 * /alert:
 *   post:
 *     summary: Set a price alert.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               chain:
 *                 type: string
 *                 example: ethereum
 *               dollar:
 *                 type: number
 *                 example: 1000
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: Alert set successfully.
 */
router.post("/", async (req, res) => {
  try {
    const { chain, dollar, email } = req.body;
    await setAlert(chain, dollar, email);
    res.json({ message: "Alert set successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
