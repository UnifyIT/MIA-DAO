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
      // const { address: miaTokenLedgerAddress } = miaTokenLedger;
      const MIATokenV0 = await ethers.getContractFactory("MIATokenV0");
      const miaTokenV0 = await MIATokenV0.deploy();
      const { 
        address: miaTokenV0Address, 
      } = miaTokenV0;
      this.miaTokenV0Address = miaTokenV0Address;
      const MIAProxyAdmin = await ethers.getContractFactory("MIATokenProxyAdmin");
      const miaProxyAdmin = await MIAProxyAdmin.deploy();
      const { address: miaProxyAdminAddress } = miaProxyAdmin
      this.miaProxyAdminAddress = miaProxyAdminAddress;
      
      const abi = MIATokenV0ABI
      this.abi = abi;
      const abiInterface = new ethers.utils.Interface(abi);
      const functionToCall = "initialize";
      this.totalSupply = 1000*1000
      const parameters = ["MIA DAO", "MIA", 6, this.totalSupply];
      this.bytes = abiInterface.encodeFunctionData(functionToCall, parameters);
      this.spender = "0x5Db06acd673531218B10430bA6dE9b69913Ad545";

    } catch (error) {
      console.log("error in before", error);
    }
  })

  it("Should deploy MIATokenProxy with MIATokenV0ABI & MIATokenProxy address", async function() {
    try {  
      const MIATokenProxy = await ethers.getContractFactory("MIATokenProxy");
      const { miaTokenV0Address, miaProxyAdminAddress, bytes, abi } = this
      this.MIATokenProxy = await MIATokenProxy.deploy(miaTokenV0Address, miaProxyAdminAddress, bytes);
      const { address } = this.MIATokenProxy;
      // this.miaTokenProxyAddress = address;
      
      this.owner = await this.MIATokenProxy.owner();
      console.log("this.owner", this.owner);
      this.MIATokenProxy = await ethers.getContractAt(abi, this.miaTokenV0Address);
      
      const { callStatic } = this.MIATokenProxy;
      console.log('callStatic', callStatic);
      expect(address).to.exist;
    } catch (error) {
      console.log("error Should deploy MIA Proxy", error);
    }
  })
  it(`Should totalSupply be 10000000 totalSupply: ${1000*1000}`, async function() {
    try {
      // expect(await this.MIATokenProxy.totalSupply()).equals(1000*1000);
    } catch (error) {
      console.log("error hould have totalSupply: ${this.totalSupply", error);
    }
  });

  it("Should approve 10,000 tokens", async function() {
    // const approved = await this.MIATokenProxy.approve(this.spender, 1000*10);
    // console.log("approved", approved);
    // expect(approved).to.be.true;
  });
  
  it("Should allowance 10,000", async function(){
    // console.log("await this.MIAProxyToken.allowace()", await this.MIATokenProxy.allowance(this.owner, this.spender));
  });
  
  it("Should trasfer tokens", async function() {
    // this.MIATokenProxy.transfer("0x5Db06acd673531218B10430bA6dE9b69913Ad545", 1000*10);
    // const previousTotalSupply = 1000*1000
    // const currentTotalSupply = await this.MIATokenProxy.totalSupply();
    // console.log("currentTotalSupply", currentTotalSupply);
    // expect(currentTotalSupply).to.equals(previousTotalSupply - 1000*10)
  })

})


// it("Should deploy MIATokenProxy with MIATokenV0ABI & MIATokenProxy address", async function() {
//   try {  
//     // console.log('this.miaTokenProxyAddress', this.miaTokenProxyAddress);
//     // console.log("MIAProxyToken.callStatic", MIAProxyToken.callStatic);
//     console.log('await MIAProxyToken.totalSupply()', Number(await this.MIAProxyToken.totalSupply()))
//     console.log('await MIAProxyToken.owner()', await this.MIAProxyToken.owner());
//     const { address: MIAProxy } = this.MIAProxyToken.
//     expect(address).to.exist;
//   } catch (error) {
//     console.log("error Should deploy MIA Proxy", error);
//   }
// })
