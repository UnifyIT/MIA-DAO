import hre from "hardhat";
import { encodeCall } from "@openzeppelin/upgrades";

describe("MIA Admin Proxy contract", function() {
  before("Deploy prequisite contracts first", function(){
    try {

      // console.log('I need to run first')
    } catch (error) {
      console.log("error in before", error);
    }
  });
  it("Should deploy MIA Admin Proxy", async function() {
    // Deploy in this order:
    // MIA Logic Contact
    // MIA Admin Contract
    // MIA TransparentUpgradeableProxy Contract
    try {
      // console.log("i run second")
      const MIALogicV0 = await hre.ethers.getContractFactory("MIALogicV0");
      const miaLogicV0 = await MIALogicV0.deploy();
      const { address: miaLogicV0Address } = miaLogicV0; 
      
      
      const MIAAdminProxy = await hre.ethers.getContractFactory("MIAAdminProxy");
      const miaAdminProxy = await MIAAdminProxy.deploy();
      const { address: adminProxyAddress } = miaAdminProxy;
      
      
      const MIATransparentUpgradableProxy = await hre.ethers.getContractFactory("MIATransparentUpgradableProxy");
      
      const bytes = encodeCall('initialize');
      console.log('bytes', bytes);
      const miaTransparentUpgradableProxy = await MIATransparentUpgradableProxy.deploy(miaLogicV0Address, adminProxyAddress, bytes);
      // const tokenTotalSupply = await tokenProxy.totalSupply();
      // console.log("totalSupply", Number(tokenTotalSupply));
      // const address = await miaBalanceSheet.owner()
      // await tokenProxy.approve(address, 1);
      // console.log("")
      // const mint = await tokenProxy.mint("0x44A814f80c14977481b47C613CD020df6ea3D25D", totalSupply, { gasLimit: 100000 });
      // console.log('mint', mint);
    } catch (error) {
      console.log(`error in it("Should deploy MIA Adming Proxy"")`, error);
    }
    
    // expect(proxy).to.exist;
    // expect(proxy.address).to.exist;

  })
})
