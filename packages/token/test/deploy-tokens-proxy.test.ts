import hre from "hardhat";

import { expect } from "chai";

describe("MIA MIA_TokenProxy contract", function() {
  it("Should deploy MIA TokenProxy contract", async function() {
    const MIA_BalanceSheet = await hre.ethers.getContractFactory("MIA_BalanceSheet");
    const miaBalanceSheet = await MIA_BalanceSheet.deploy();
    await miaBalanceSheet.deployed();
    // console.log("miaBalanceSheet.owner()", await miaBalanceSheet.owner());
    const MIA_AllowanceSheet = await hre.ethers.getContractFactory("MIA_AllowanceSheet");
    const miaAllowanceSheet = await MIA_AllowanceSheet.deploy();
    await miaAllowanceSheet.deployed();
    // console.log("miaAllowanceSheet.owner()", await miaAllowanceSheet.owner());
    const MIA = await hre.ethers.getContractFactory("MIA_V0");

    const config = {
      name: "Miami DAO",
      symbol: "MIA",
      allowances: miaAllowanceSheet.address,
      balances: miaBalanceSheet.address
    }

    const { name, symbol, balances, allowances } = config;
    const mia = await MIA.deploy(name, symbol, balances, allowances, 6);
    await mia.deployed();
    console.log("mia.owner()", await mia.owner());
    // console.log("mia.callStatic", mia.callStatic);
    // console.log("mia.owner()2", await mia.owner());
    await mia.mint("0x44A814f80c14977481b47C613CD020df6ea3D25D", 6, { gasLimit: 100000 });
    // console.log("mia.owner()3", await mia.owner());
    // const { address } = mia;

    // const MIATokenProxy = await hre.ethers.getContractFactory("MIA_TokenProxy");
    // const proxy = await MIATokenProxy.deploy(address, balances, allowances);
    // await proxy.deployed()

    // expect(proxy).to.exist;
    // expect(proxy.address).to.exist;

  })
})
