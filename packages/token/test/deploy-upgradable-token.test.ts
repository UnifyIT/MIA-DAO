import hre from "hardhat";
// import { MIA_V0 } from "../abis";
// import { expect } from "chai";
// import BN from "bn.js";

describe("Upgradable Token contract", function() {
  it("Should deploy Registry contract", async function() {
    const Registry = await hre.ethers.getContractFactory("Registry");
    const registry = await Registry.deploy();
    await registry.deployed();
    console.log('registry.address', registry.address);
    
    const TokenV0 = await hre.ethers.getContractFactory("TokenV0");
    const tokenv0 = await TokenV0.deploy();
    console.log("tokenv0.address", tokenv0.address);
    
    const TokenV1 = await hre.ethers.getContractFactory("TokenV0");
    const tokenv1 = await TokenV1.deploy();
    console.log("tokenv1.address", tokenv1.address);
    
    
    console.log("registry", registry);
    // console.log("miaBalanceSheet.owner()", await miaBalanceSheet.owner());
    // console.log("miaBalanceSheet.owner()", await miaBalanceSheet.owner());
    // console.log("miaBalanceSheet.address", miaBalanceSheet.address);
    // const MIA_AllowanceSheet = await hre.ethers.getContractFactory("MIA_AllowanceSheet");
    // const miaAllowanceSheet = await MIA_AllowanceSheet.deploy();
    // await miaAllowanceSheet.deployed();

    // console.log("miaAllowanceSheet.owner()", await miaAllowanceSheet.owner());
    // console.log("miaAllowanceSheet.address", miaAllowanceSheet.address)
    // const MIA = await hre.ethers.getContractFactory("MIA_V0");

    // const config = {
    //   name: "Miami DAO",
    //   symbol: "MIA",
    //   allowances: miaAllowanceSheet.address,
    //   balances: miaBalanceSheet.address
    // }
    // 
    // const { name, symbol, balances, allowances } = config;
    // const mia = await MIA.deploy(name, symbol, balances, allowances, 6);
    // await mia.deployed();
    // const { address } = mia;
    // console.log("mia address", address);
    // console.log("mia owner", await mia.owner());

    // const proxyAddress = require(`./${HARDHAT_NETWORK}mia-proxy-token-address.json`);
    
    // console.log("mia.owner()", await mia.owner());
    // console.log("mia.callStatic", mia.callStatic);
    
    // console.log("mia.owner()2", await mia.owner());
    // await mia.mint("0x44A814f80c14977481b47C613CD020df6ea3D25D", 6);
    // console.log("mia.owner()3", await mia.owner());
    // 
    // 
    // const MIATokenProxy = await hre.ethers.getContractFactory("MIA_TokenProxy");
    // const proxy = await MIATokenProxy.deploy(address, MIA_V0.deployedBytecode, balances, allowances);
    // await proxy.deployed()
    // const { address: proxyAddress } = proxy;        
    // 
    // const tokenProxy = await hre.ethers.getContractAt(MIA_V0_ABI, proxyAddress);
    // // console.log("tokenProxy", tokenProxy);
    // console.log("tokenProxy owner 1", await tokenProxy.owner());
    // 
    // console.log("tokenProxy address", proxyAddress);
    // // console.log("tokenProxy owner", await tokenProxy.owner());
    // 
    // await miaAllowanceSheet.transferOwnership(proxyAddress);
    // await miaBalanceSheet.transferOwnership(proxyAddress);
    // console.log("tokenProxy 2", await tokenProxy.owner());
    // await tokenProxy.claimAllowanceOwnership();
    // await tokenProxy.claimBalanceOwnership();
    // console.log("tokenProxy 3", await tokenProxy.owner());
    // 
    // console.log("allowances new owner", await miaAllowanceSheet.owner());
    // console.log("balances new owner", await miaBalanceSheet.owner());
    // 
    // const initialSupply = 1000*1000;
    // const initialSupplyBN = new BN(initialSupply);
    // const exponent = new BN(1e6);
    // const totalSupply = Number(initialSupplyBN.mul(exponent));
    
    try {
      // const tokenTotalSupply = await tokenProxy.totalSupply();
      // console.log("totalSupply", Number(tokenTotalSupply));
      // const address = await miaBalanceSheet.owner()
      // await tokenProxy.approve(address, 1);
      // console.log("")
      // const mint = await tokenProxy.mint("0x44A814f80c14977481b47C613CD020df6ea3D25D", totalSupply, { gasLimit: 100000 });
      // console.log('mint', mint);
    } catch (error) {
      // console.log("error mint", error);
    }
    
    // expect(proxy).to.exist;
    // expect(proxy.address).to.exist;

  })
})
