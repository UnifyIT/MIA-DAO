import hre from "hardhat";
import BN from "bn.js";
import open from "open";

import utils from "../../utils";

const { writeFileSync } = utils;
import { MIATokenV0, MIATokenV0ABI } from "../../../abis";

async function V0() {
  let fileObject: any = {}
  const { HARDHAT_NETWORK } = process.env;
  const network: string = HARDHAT_NETWORK as string;

  const AllowanceSheet = await hre.ethers.getContractFactory("MIA_AllowanceSheet");
  const allowanceSheet = await AllowanceSheet.deploy();
  
  const BalanceSheet = await hre.ethers.getContractFactory("MIA_BalanceSheet");
  const balanceSheet = await BalanceSheet.deploy();

  await allowanceSheet.deployed();
  
  await balanceSheet.deployed();

  console.log(`MIA_TokenProxy deployed to ${HARDHAT_NETWORK} network`)
  console.log("AllowanceSheet deployed to:", allowanceSheet.address);
  console.log("BalanceSheet deployed to:", balanceSheet.address);
  fileObject[network] = allowanceSheet.address;

  writeFileSync(`./scripts/mint/${HARDHAT_NETWORK}mia-token-allowances-address.json`, JSON.stringify(fileObject));
  
  fileObject[network] = balanceSheet.address;

  writeFileSync(`./scripts/mint/${HARDHAT_NETWORK}mia-token-balances-address.json`, JSON.stringify(fileObject));
  const config = {
    name: "City of Miami DAO",
    symbol: "MIA",
    allowances: allowanceSheet.address,
    balances: balanceSheet.address
  }
  
  const { name, symbol, balances, allowances } = config;
  const decimals = 6
  const MIA = await hre.ethers.getContractFactory("MIA_V0");
  const mia = await MIA.deploy(name, symbol, balances, allowances, decimals);
  
  await mia.deployed();
  
  let { address } = mia;
  console.log("MIA_V0 deployed to", mia.address);
  
  fileObject[network] = address;
  writeFileSync(`./scripts/mint/${HARDHAT_NETWORK}mia-token-address.json`, JSON.stringify(fileObject));
  writeFileSync(`../ui/src/services/web3/${HARDHAT_NETWORK}mia-token-address.json`, JSON.stringify(fileObject));
  
  const MIATokenProxy = await hre.ethers.getContractFactory("MIA_TokenProxy");
  const proxy = await MIATokenProxy.deploy(address, balances, allowances);
  await proxy.deployed()
  
  const  { address: proxyAddress } = proxy;
  console.log("MIA_TokenProxy deployed to", proxyAddress);

  // const implementationAddress = await proxy.implementation();
  
  // const allowancesOwnership = await allowanceSheet.transferOwnership(implementationAddress);
  const allowancesOwnership = await allowanceSheet.transferOwnership(proxyAddress);
  console.log('allowancesOwnership', allowancesOwnership);
  
  // const balancesOwnership = await balanceSheet.transferOwnership(implementationAddress);
  const balancesOwnership = await balanceSheet.transferOwnership(proxyAddress);
  console.log('balancesOwnership', balancesOwnership);
  
  const miaOwnership = await mia.transferOwnership(proxyAddress);
  console.log('miaOwnership', miaOwnership);

  fileObject = {}
  fileObject[network] = proxyAddress;
  writeFileSync(`../ui/src/services/web3/${HARDHAT_NETWORK}mia-proxy-token-address.json`, JSON.stringify(fileObject));
  writeFileSync(`./scripts/mint/${HARDHAT_NETWORK}mia-proxy-token-address.json`, JSON.stringify(fileObject));
}

V0()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });