import hre from "hardhat";

import { MIATokenV0ABI } from "../../abis";

const { ethers } = hre;


// Deploy in this order:
// MIA Ledger/Storage(BalanceSheet, AllowanceSheet)
// MIA TokenV0Logic Contact(MIA_Storage_logic)
// MIA ProxyAdmin Contract
// MIA TransparentUpgradeableProxy Contract

describe("MIA Admin Proxy contract", function() {
  before("Deploy prequisite contracts first", async function() {
    try {
      const MIATokenLedger = await ethers.getContractFactory("MIATokenLedger");
      const miaTokenLedger = await MIATokenLedger.deploy();
      const { address: miaTokenLedgerAddress } = miaTokenLedger;
      console.log("MIATokenLedger address: ", miaTokenLedgerAddress);
            
      const MIATokenV0 = await ethers.getContractFactory("MIATokenV0");
      const miaTokenV0 = await MIATokenV0.deploy();
      const { address: miaTokenV0Address, callStatic } = miaTokenV0;
      console.log("MIATokenV0 address: ", miaTokenV0Address);
      // console.log("callStatic", callStatic)
      console.log('miaTokenV0.totalSupply()', await miaTokenV0.totalSupply());
      const MIAProxyAdmin = await ethers.getContractFactory("ProxyAdmin");
      const miaProxyAdmin = await MIAProxyAdmin.deploy();
      const { address: miaProxyAdminAddress } = miaProxyAdmin
      console.log("MIAProxyAdmin address: ", miaProxyAdminAddress);
      
      const abi = MIATokenV0ABI
      const abiInterface = new ethers.utils.Interface(abi);
      const functionToCall = "initialize";
      const parameters = ["MIA DAO", "MIA", 6, miaTokenLedgerAddress]
      const bytes = abiInterface.encodeFunctionData(functionToCall, parameters)
      console.log("bytes", bytes);
      
      const MIATransparentUpgradableProxy = await hre.ethers.getContractFactory("TransparentUpgradeableProxy");
      const miaTransparentUpgradableProxy = await MIATransparentUpgradableProxy.deploy(miaTokenV0Address, miaProxyAdminAddress, bytes);
      const { address: miaTransparentUpgradableProxyAddress } = miaTransparentUpgradableProxy;
      console.log("MIATransparentUpgradableProxy address: ", miaTransparentUpgradableProxyAddress);
      
    } catch (error) {
      console.log("error in before", error);
    }
  });

  it("Should deploy MIA Proxy", async function() {
    try {
      
    } catch (error) {
      console.log("error Should deploy MIA Proxy", error);
    }
  })

})
