import hre from "hardhat";
import BN from "bn.js";
import open from "open";
import { MIA_V0, MIA_AllowanceSheet, MIA_BalanceSheet } from "../../abis";
import utils from "../utils";

const { HARDHAT_NETWORK } = process.env;
// const network: string = HARDHAT_NETWORK as string;
const tokenAddress = require(`./${HARDHAT_NETWORK}mia-token-address.json`);
const proxyAddress = require(`./${HARDHAT_NETWORK}mia-proxy-token-address.json`);
const allowanceSheetAddress = require(`./${HARDHAT_NETWORK}mia-token-allowances-address.json`);
const balanceSheetAddress = require(`./${HARDHAT_NETWORK}mia-token-balances-address.json`);
const { writeFileSync } = utils;

async function MintV0() {
  console.log('proxyAddress.rinkeby', proxyAddress.rinkeby);
  console.log("allowanceSheetAddress.rinkeby", allowanceSheetAddress.rinkeby);
  console.log("balanceSheetAddress", balanceSheetAddress.rinkeby);
  
  const allowances = await hre.ethers.getContractAt(MIA_AllowanceSheet, allowanceSheetAddress.rinkeby);
  console.log("allowances.owner()", await allowances.owner());
  
  const balances = await hre.ethers.getContractAt(MIA_BalanceSheet, balanceSheetAddress.rinkeby);
  console.log("balances.owner()", await balances.owner());
  
  const tokenv0 = await hre.ethers.getContractAt(MIA_V0, tokenAddress.rinkeby);
  console.log("tokenv0.owner()", await tokenv0.owner());
  console.log('i have to be true', await tokenv0.owner() === proxyAddress.rinkeby);
  const tokenProxy = await hre.ethers.getContractAt(MIA_V0, proxyAddress.rinkeby);
  console.log("tokenProxy.owner()", await tokenProxy.owner());

  const initialSupply = 1000*1000;
  const initialSupplyBN = new BN(initialSupply)
  const exponent = new BN(1e6);
  const totalSupply = Number(initialSupplyBN.mul(exponent));
  
  const mint = await tokenProxy.mint("0x44A814f80c14977481b47C613CD020df6ea3D25D", totalSupply, { gasLimit: 1000000 });
  console.log('mint', mint)
  // open(`https://rinkeby.etherscan.io/tx/${mint.hash}`)
  writeFileSync(`./scripts/mint/${HARDHAT_NETWORK}/mia-token-mint.json`, JSON.stringify({ ...mint }) );
}

MintV0()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });