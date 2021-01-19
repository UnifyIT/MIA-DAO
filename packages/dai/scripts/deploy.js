// We require the Hardhat Runtime Environment explicitly here. This is optional 
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const utils = require("./utils/deploy.utils");
const hre = require("hardhat");
const BN = require("bn.js");
const { writeFileSync } = utils;

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  // If this script is run directly using `node` you may want to call compile 
  // manually to make sure everything is compiled
  const { HARDHAT_NETWORK } = process.env;
  await hre.run('compile');
  
  // We get the contract to deploy
  const MIA = await hre.ethers.getContractFactory("MIA");
  const decimals = 6;
  const initialSupply = 1000*1000;
  const initialSupplyBN = new BN(initialSupply)
  const exponent = new BN(1e18);
  const totalSupply = Number(initialSupplyBN.mul(exponent));
  const mia = await MIA.deploy("Miami Stablecoin", "MIA", totalSupply, decimals);
  await mia.deployed();
  console.log(`MIA deployed to ${HARDHAT_NETWORK} network`)
  console.log("MIA deployed to:", mia.address);
  const fileObject = {};
  fileObject[HARDHAT_NETWORK] = mia.address;
  writeFileSync(`../ui/src/services/web3/${HARDHAT_NETWORK}mia-token-address.json`, JSON.stringify(fileObject));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });