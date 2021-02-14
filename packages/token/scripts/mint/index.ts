import hre from "hardhat";
// import BN from "bn.js";
import { MIA_V0 } from "../../abis";
// import utils from "../utils";

// const { writeFileSync } = utils;


// MIA_TokenProxy deployed to rinkeby network
// AllowanceSheet deployed to: 0x56f5dfa18D381882283a412e1fa5Aa7FcC8185d0
// BalanceSheet deployed to: 0x549f1C0C3D78f20cBfc115A13b92e107735Dc6d0
// MIA_V0 deployed to 0x47695A7098CbF5D7ef224191575BD7e989843989
// MIA_TokenProxy deployed to 0x90B2695D49f8c26450B68b540C7B81f2c7188552

async function MintV0() {
  
  // const { HARDHAT_NETWORK } = process.env;
  // const network: string = HARDHAT_NETWORK as string;
  console.log("hre.ethers", hre.ethers);
  const contract = new hre.ethers.Contract("0x47695A7098CbF5D7ef224191575BD7e989843989", MIA_V0);
  console.log("contract", await contract.owner());
  // const AllowanceSheet = await hre.ethers.getContractFactory("MIA_AllowanceSheet");
  // const allowanceSheet = await AllowanceSheet.deploy();
  // 
  // const BalanceSheet = await hre.ethers.getContractFactory("MIA_BalanceSheet");
  // const balanceSheet = await BalanceSheet.deploy();
  // 
  // await allowanceSheet.deployed();
  // 
  // await balanceSheet.deployed();

  // console.log(`MIA_TokenProxy deployed to ${HARDHAT_NETWORK} network`)
  // console.log("AllowanceSheet deployed to:", allowanceSheet.address);
  // console.log("BalanceSheet deployed to:", balanceSheet.address);
  // 
  // const config = {
  //   name: "Miami DAO",
  //   symbol: "MIA",
  //   allowances: allowanceSheet.address,
  //   balances: balanceSheet.address
  // }
  
  // const { name, symbol, balances, allowances } = config;
  // const decimals = 6
  // const MIA = await hre.ethers.getContractFactory("MIA_V0");
  // const mia = await MIA.deploy(name, symbol, balances, allowances, decimals);
  // 
  // await mia.deployed();
  // 
  // let { address } = mia;
  // console.log("MIA_V0 deployed to", mia.address);
  // console.log("callstatic", mia.callStatic);
  // console.log("await mia.owner()", await mia.owner());
  // const initialSupply = 1000*1000;
  // const initialSupplyBN = new BN(initialSupply)
  // const exponent = new BN(1e6);
  // const totalSupply = Number(initialSupplyBN.mul(exponent));

  // await mia.mint("0x44A814f80c14977481b47C613CD020df6ea3D25D", 6, { gasLimit: 100000 })
  // let fileObject: any = {}
  // fileObject[network] = address;
  // 
  // writeFileSync(`../ui/src/services/web3/${HARDHAT_NETWORK}mia-token-address.json`, JSON.stringify(fileObject));
  // 
  // const MIATokenProxy = await hre.ethers.getContractFactory("MIA_TokenProxy");
  // const proxy = await MIATokenProxy.deploy(address, balances, allowances);
  // await proxy.deployed()
  // 
  // const  { address: proxyAddress } = proxy;
  // 
  // console.log("MIA_TokenProxy deployed to", proxyAddress);
  // fileObject = {}
  // fileObject[network] = proxyAddress;
  // writeFileSync(`../ui/src/services/web3/${HARDHAT_NETWORK}mia-proxy-token-address.json`, JSON.stringify(fileObject));
}

MintV0()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });