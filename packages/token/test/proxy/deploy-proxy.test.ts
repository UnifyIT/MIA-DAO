import hre from "hardhat";
import { expect } from "chai";

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
      console.log('miaTokenV0.totalSupply()', await miaTokenV0.totalSupply());
      const MIAProxyAdmin = await ethers.getContractFactory("MIATokenProxyAdmin");
      const miaProxyAdmin = await MIAProxyAdmin.deploy();
      const { address: miaProxyAdminAddress } = miaProxyAdmin
      console.log("MIAProxyAdmin address: ", miaProxyAdminAddress);
      
      const abi = MIATokenV0ABI
      const abiInterface = new ethers.utils.Interface(abi);
      const functionToCall = "initialize";
      const parameters = ["MIA DAO", "MIA", 6]
      const bytes = abiInterface.encodeFunctionData(functionToCall, parameters)
      // console.log("bytes", bytes);

      const MIATokenProxy = await ethers.getContractFactory("MIATokenProxy");
      const miaTokenProxy = await MIATokenProxy.deploy(miaTokenV0Address, miaProxyAdminAddress, bytes);
      // console.log('await miaTokenProxy.owner()', await miaTokenProxy.owner())
      const { address: miaTokenProxyAddress } = miaTokenProxy
      this.miaTokenProxyAddress = miaTokenProxyAddress;
      console.log("MIATransparentUpgradableProxy address: ", this.miaTokenProxyAddress);
      expect(miaTokenProxyAddress).to.exist;
    } catch (error) {
      console.log("error in before", error);
    }
  });

  it("Should deploy MIATokenProxy with MIATokenV0ABI & MIATokenProxy address", async function() {
    try {
      const abi = MIATokenV0ABI
      const MIAProxyToken = await ethers.getContractAt(abi, this.miaTokenProxyAddress);
      // console.log('this.miaTokenProxyAddress', this.miaTokenProxyAddress);
      // console.log("MIAProxyToken.callStatic", MIAProxyToken.callStatic);
      console.log('await MIAProxyToken.totalSupply()', Number(await MIAProxyToken.totalSupply()))
      console.log('await MIAProxyToken.owner()', await MIAProxyToken.owner());
      expect(MIAProxyToken.address).to.exist;
    } catch (error) {
      console.log("error Should deploy MIA Proxy", error);
    }
  })

})
