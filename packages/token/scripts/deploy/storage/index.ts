// We require the Hardhat Runtime Environment explicitly here. This is optional 
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import hre from "hardhat";


import utils from "../../utils";

const { writeFileSync } = utils;

async function main() {
  const { HARDHAT_NETWORK } = process.env;
  const network: string = HARDHAT_NETWORK as string;
  // await hre.run('compile');

  // We get the contract to deploy
  const AllowanceSheet = await hre.ethers.getContractFactory("AllowanceSheet");
  const allowanceSheet = await AllowanceSheet.deploy();
  
  const BalanceSheet = await hre.ethers.getContractFactory("BalanceSheet");
  const balanceSheet = await BalanceSheet.deploy();
  
  await allowanceSheet.deployed();
  
  await balanceSheet.deployed();
  
  console.log(`MIA deployed to ${HARDHAT_NETWORK} network`)
  console.log("AllowanceSheet deployed to:", allowanceSheet.address);
  console.log("BalanceSheet deployed to:", balanceSheet.address);

  const config = {
    name: "Miami DAO",
    symbol: "MIA",
    allowances: allowanceSheet.address,
    balances: balanceSheet.address
  }
  const { name, symbol, balances, allowances } = config;
  const MIA = await hre.ethers.getContractFactory("MIA_V0");
  const mia = await MIA.deploy(name, symbol, balances, allowances);
  const { address } = mia;
  
  const fileObject: any = {}
  fileObject[network] = address;
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