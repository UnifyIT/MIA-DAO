import hre from "hardhat";

import { expect } from "chai";

describe("MIA Token AllowanceSheet contract", function() {
  it("Should deploy MIA Token AllowanceSheet contract", async function() {
    const MIA_AllowanceSheet = await hre.ethers.getContractFactory("MIA_AllowanceSheet");
    const mia = await MIA_AllowanceSheet.deploy();

    await mia.deployed();
    expect(mia).to.exist
    expect(mia.address).to.exist
  });
});

describe("MIA Token BalanceSheet contract", function() {
  it("Should deploy MIA Token BalanceSheet contract", async function() {
    const MIA_BalanceSheet = await hre.ethers.getContractFactory("MIA_BalanceSheet");
    const mia = await MIA_BalanceSheet.deploy();

    await mia.deployed();
    expect(mia).to.exist
    expect(mia.address).to.exist
  });
});

describe("MIA TokenStorage contract", function() {
  it("Should deploy MIA TokenStorage contract", async function() {
    const MIA_BalanceSheet = await hre.ethers.getContractFactory("MIA_BalanceSheet");
    const miaBalanceSheet = await MIA_BalanceSheet.deploy();
    await miaBalanceSheet.deployed();
    
    const MIA_AllowanceSheet = await hre.ethers.getContractFactory("MIA_AllowanceSheet");
    const miaAllowanceSheet = await MIA_AllowanceSheet.deploy();
    await miaAllowanceSheet.deployed();
    
    const MIA_TokenStorage = await hre.ethers.getContractFactory("MIA_TokenStorage");
    const miaTokenStorage = await MIA_TokenStorage.deploy(miaBalanceSheet.address, miaAllowanceSheet.address);

    await miaTokenStorage.deployed();

    expect(miaTokenStorage).to.exist;
    expect(miaTokenStorage.address).to.exist;
  });
});
