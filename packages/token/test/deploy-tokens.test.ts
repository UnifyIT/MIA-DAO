import hre from "hardhat";

import { expect } from "chai";

describe("MIA Token V0", function() {
  it("Should return the properties of the MIA Token V0 such as name, symbol correctly", async function() {
    const MIA = await hre.ethers.getContractFactory("MIA_V0");
    
    const config = {
      name: "Miami DAO",
      symbol: "MIA",
      balances: "0x5Db06acd673531218B10430bA6dE9b69913Ad545",
      allowances: "0x5Db06acd673531218B10430bA6dE9b69913Ad545" 
    }
    
    const { name, symbol, balances, allowances } = config;
    const decimals = 6;
    const mia = await MIA.deploy(name, symbol, balances, allowances, decimals);
    
    await mia.deployed();
    expect(await mia.name()).to.equal("Miami DAO");
    expect(await mia.symbol()).to.equal("MIA");
  });
});

describe("MIA Token V1", function() {
  it("Should return the properties of the MIA Token V1 such as name, symbol correctly", async function() {
    const MIA = await hre.ethers.getContractFactory("MIA_V1");
    const config = {
      name: "City of Miami DAO",
      symbol: "MIA_V1",
      balances: "0x5Db06acd673531218B10430bA6dE9b69913Ad545",
      allowances: "0x5Db06acd673531218B10430bA6dE9b69913Ad545" 
    }
    
    const { name, symbol, balances, allowances } = config;
    const mia = await MIA.deploy(name, symbol, balances, allowances);
    
    await mia.deployed();
    expect(await mia.name()).to.equal("City of Miami DAO");
    expect(await mia.symbol()).to.equal("MIA_V1");
  });
});
