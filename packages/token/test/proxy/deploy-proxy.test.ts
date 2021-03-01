import hre from "hardhat";

import { AdminProxy, TransparentUpgradeableProxy } from "../../abis";

describe("MIA Admin Proxy contract", function() {
  
  before("Deploy prequisite contracts first", async function(){
      // Deploy in this order:
      // MIA Logic Contact
      // MIA Admin Contract
      // MIA TransparentUpgradeableProxy Contract
      try {
        const MIALogicV0 = await hre.ethers.getContractFactory("MIALogicV0");
        const miaLogicV0 = await MIALogicV0.deploy();
        const { address: miaLogicV0Address } = miaLogicV0; 
        // const signer = (await hre.ethers.getSigners())[0];
        
        // const MIAAdminProxy = await hre.ethers.getContractFactory(AdminProxy.abi, AdminProxy.bytecode);
        const MIAAdminProxy = await hre.ethers.getContractFactory("ProxyAdmin")
        const miaAdminProxy = await MIAAdminProxy.deploy();
        const { address: adminProxyAddress } = miaAdminProxy;
        console.log("adminProxyAddress", adminProxyAddress);
        
        const abi = ['function initialize()']
        const abiInterface = new hre.ethers.utils.Interface(abi);
        const bytes = abiInterface.encodeFunctionData('initialize', [])
        
        // const MIATransparentUpgradableProxy = await hre.ethers.getContractFactory(TransparentUpgradeableProxy.abi, TransparentUpgradeableProxy.bytecode)
        const MIATransparentUpgradableProxy = await hre.ethers.getContractFactory("TransparentUpgradeableProxy");
        const miaTransparentUpgradableProxy = await MIATransparentUpgradableProxy.deploy(miaLogicV0Address, adminProxyAddress, bytes);
        console.log('miaTransparentUpgradableProxy.address',  miaTransparentUpgradableProxy.address);
      } catch (error) {
        console.log("error in before", error);
      }
  });
  it("Should deploy MIA Admin Proxy", async function() {

    // try {
    //   const MIALogicV0 = await hre.ethers.getContractFactory("MIALogicV0");
    //   const miaLogicV0 = await MIALogicV0.deploy();
    //   const { address: miaLogicV0Address } = miaLogicV0; 
    //   // console.log("miaLogicV0.callStatic", miaLogicV0.callStatic);
    // 
    //   const MIAAdminProxy = await hre.ethers.getContractFactory("MIAAdminProxy");
    //   const miaAdminProxy = await MIAAdminProxy.deploy();
    //   const { address: adminProxyAddress } = miaAdminProxy;
    //   // console.log("miaAdminProxy.callStatic", miaAdminProxy.callStatic);
    //   const bytes = encodeCall('initialize');
    //   // console.log('bytes', bytes);
    //   console.log('this.miaLogic', this.miaLogic);
    //   const MIATransparentUpgradableProxy = await hre.ethers.getContractFactory("MIATransparentUpgradableProxy");
    //   const miaTransparentUpgradableProxy = await MIATransparentUpgradableProxy.deploy(miaLogicV0Address, adminProxyAddress, bytes);
    //   console.log('miaTransparentUpgradableProxy.address', miaTransparentUpgradableProxy.address);
    //   // console.log('I need to run first')
    // } catch (error) {
    //   console.log("error in before", error);
    // }

  })
})
