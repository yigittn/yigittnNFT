const hre = require("hardhat");

async function main() {
  const YigittnNFT = await hre.ethers.getContractFactory("YigittnNFT");
  const yigittnNFT = await YigittnNFT.deploy();

  await yigittnNFT.deployed();

  console.log(`YigittnNFT deployed to ${yigittnNFT.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
