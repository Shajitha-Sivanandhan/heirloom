const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Deploying HeirloomVault...");

  const HeirloomVault = await ethers.getContractFactory("HeirloomVault");
  const vault = await HeirloomVault.deploy();

  await vault.deployed();

  console.log("✅ HeirloomVault deployed to:", vault.address);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
