import hre from "hardhat";
import { TokenV0 as TokenV0ABI } from "../abis";
// import { expect } from "chai";
// import BN from "bn.js";

describe("Upgradable Token contract", function() {
  it("Should deploy Registry contract", async function() {
    const Registry = await hre.ethers.getContractFactory("Registry");
    const registry = await Registry.deploy();
    await registry.deployed();
    // console.log('registry.address', registry.address);
    const { address } = registry;
    const TokenV0 = await hre.ethers.getContractFactory("TokenV0");
    const tokenv0 = await TokenV0.deploy();
    // console.log("tokenv0.address", tokenv0.address);

    // const TokenV1 = await hre.ethers.getContractFactory("TokenV0");
    // const tokenv1 = await TokenV1.deploy();
    // console.log("tokenv1.address", tokenv1.address);


    // console.log("registry.callStatic", registry.callStatic);
    // console.log('await registry.logic_contract 1', await registry.logic_contract());
    await registry.setLogicContract(tokenv0.address);
    // console.log('await registry.logic_contract 2', await registry.logic_contract());
    const registryProxy = await hre.ethers.getContractAt(TokenV0ABI, address);
    console.log("registryProxy", registryProxy.callStatic);
    let val1 = await registryProxy.val()
    console.log("registryProxy.val0()", val1.toString())
    await registryProxy.setVal(5*1000000000);
    val1 = await registryProxy.val()
    console.log("registryProxy.val1()", val1.toString())
    console.log("registryProxy.val2()", (await registryProxy.val()).toString())

    try {

    } catch (error) {
      
    }
    // expect(proxy).to.exist;
    // expect(proxy.address).to.exist;
  })
})
