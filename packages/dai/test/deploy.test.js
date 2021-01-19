const { expect } = require("chai");

describe("MIA Token", function() {
  it("Should return the properties of the MIA Toke such as name, decimals, symbol correctly", async function() {
    const MIA = await ethers.getContractFactory("MIA");
    const totalSupply = 1000000
    const mia = await MIA.deploy("Miami DAO", "MIA", 1000000, 6);
    
    await mia.deployed();
    expect(await mia.name()).to.equal("Miami DAO");
    expect(await mia.decimals()).to.equal(6);
    expect(await mia.symbol()).to.equal("MIA");
    expect(await mia.totalSupply()).to.equal(totalSupply*2);
  });
});
