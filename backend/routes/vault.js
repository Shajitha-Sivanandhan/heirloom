// routes/vault.js
const express = require("express");
const router = express.Router();
const vaultController = require("../controllers/vaultController");

// POST /api/vault
router.post("/vault", vaultController.createVault);

module.exports = router;
