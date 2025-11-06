// controllers/vaultController.js

exports.createVault = async (req, res) => {
  const { walletAddress, name } = req.body;

  if (!walletAddress || !name) {
    return res.status(400).json({ ok: false, error: "Missing walletAddress or name" });
  }

  // For now we’re not saving to DB — just simulating
  console.log("Vault request:", { walletAddress, name });

  res.json({
    ok: true,
    message: "Vault created successfully (simulated)",
    data: { walletAddress, name }
  });
};
