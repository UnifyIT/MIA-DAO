import hre from "hardhat";
import { expect } from "chai";

import { MIATokenV0ABI, MIATokenProxyABI, MIATokenV1ABI } from "../../abis";

const { ethers } = hre;

// Deploy in this order:
// MIA TokenV0Logic inherits MIA Ledger/Storage(BalanceSheet, AllowanceSheet) Contract
// MIA ProxyAdmin Contract
// MIA TransparentUpgradeableProxy Contract

describe("MIA Admin Proxy contract", function() {
  before("Deploy prequisite contracts first", async function() {
      const MIATokenV0 = await ethers.getContractFactory("MIATokenV0");
      const miaTokenV0 = await MIATokenV0.deploy();
      const { 
        address: miaTokenV0Address, 
      } = miaTokenV0;
      const MIAProxyAdmin = await ethers.getContractFactory("MIATokenProxyAdmin");
      const miaProxyAdmin = await MIAProxyAdmin.deploy();
      this.MIAProxyAdmin = miaProxyAdmin;
      const { address: miaProxyAdminAddress } = miaProxyAdmin

      this.abi = {
        MIATokenV0ABI,
        MIATokenV1ABI,
        MIATokenProxyABI,
      }

      const abiInterface = new ethers.utils.Interface(this.abi.MIATokenV0ABI);
      const functionToCall = "initialize";
      this.totalSupply = 1000*1000
      const parameters = ["MIA DAO", "MIA", 6, this.totalSupply];
      this.bytes = abiInterface.encodeFunctionData(functionToCall, parameters);
      this.spender = "0x5Db06acd673531218B10430bA6dE9b69913Ad545";
      this.addresses = {
        MIATokenV0: miaTokenV0Address,
        MIAProxyAdmin: miaProxyAdminAddress,
      }
  });

  it("Should deploy MIATokenProxy", async function() {
      const MIATokenProxy = await ethers.getContractFactory("MIATokenProxy");
      this.MIATokenProxy = await MIATokenProxy.deploy(this.addresses.MIATokenV0, this.addresses.MIAProxyAdmin, this.bytes);
      const { address } = this.MIATokenProxy;
      expect(address).to.exist;
  });
  
  it("Should instanciate MIATokenV0Proxy contract", async function () {
    this.MIATokenV0Proxy = await ethers.getContractAt(this.abi.MIATokenV0ABI, this.MIATokenProxy.address);
    const events = await  this.MIATokenV0Proxy.queryFilter("Transfer")
    const lastEvent = events[events.length - 1]; 
    const lastEventTransferAmount = Number(lastEvent.args[2]);
    const { address } = this.MIATokenV0Proxy;
    expect(address).to.exist;
  });
  
  it("Should have owner", async function() {
    this.owner = await this.MIATokenV0Proxy.owner();
    expect(this.owner).to.exist;
  });
  
  it(`Should have a MIATokenV0Proxy.totalSupply equal to${1000*1000}`, async function() {
    const totalSupply = await this.MIATokenV0Proxy.totalSupply();
    expect(Number(totalSupply)).equals(1000*1000);
  });

  it("Should approve 10,000 tokens", async function() {
    const approved = await this.MIATokenV0Proxy.approve(this.spender, 1000*10);
    expect(approved).to.exist;
  });
  
  it("Should allowance 10,000", async function() {
    const allowance = await this.MIATokenV0Proxy.allowance(this.owner, this.spender);
    expect(Number(allowance)).to.equals(1000*10);
  });
  
  it("Should transferFrom tokens", async function() {
    const events = await  this.MIATokenV0Proxy.queryFilter("Transfer")
    const lastEvent = events[events.length - 1]; 
    const lastEventTransferAmount = Number(lastEvent.args[2])
    const transferAmount = 1000*10;
    
    const balanceOfProxy = Number(await this.MIATokenV0Proxy.balanceOf(this.owner));
    const expectedBalanceOfProxy = balanceOfProxy - transferAmount;
    
    const balanceOf = Number((await this.MIATokenV0Proxy.balanceOf("0x5Db06acd673531218B10430bA6dE9b69913Ad545")));
  
    const transfer = await this.MIATokenV0Proxy.transferFrom(this.owner, "0x5Db06acd673531218B10430bA6dE9b69913Ad545", transferAmount);
    
    const postTransferFromBalanceOfProxy = Number(await this.MIATokenV0Proxy.balanceOf(this.owner));
    const postTransferFromBalanceOf = Number((await this.MIATokenV0Proxy.balanceOf("0x5Db06acd673531218B10430bA6dE9b69913Ad545")));
    
    expect(balanceOf).to.equals(0);
    expect(postTransferFromBalanceOf).to.equals(transferAmount);
    expect(postTransferFromBalanceOfProxy).to.equals(expectedBalanceOfProxy);
  });
  
  it("Should have a transfer Event with an amount of 10000", async function(){
    const events = await  this.MIATokenV0Proxy.queryFilter("Transfer")
    const lastEvent = events[events.length - 1]; 
    const lastEventTransferAmount = Number(lastEvent.args[2]);
    expect(lastEventTransferAmount).to.equals(1000*10);
  });
  
  it("Should deploy MIATokenV1", async function() {
    const MIATokenV1 = await ethers.getContractFactory("MIATokenV1");
    this.MIATokenV1 = await MIATokenV1.deploy();
    const { address } = this.MIATokenV1;
    expect(address).to.exist;
  });
  
  it("Should update to new implementation and implementation address be equal to MIATokenV1 address", async function() {
    await this.MIAProxyAdmin.upgrade(this.MIATokenProxy.address, this.MIATokenV1.address);
    const implementation = await this.MIAProxyAdmin.getProxyImplementation(this.MIATokenProxy.address);
    expect(implementation).to.equals(this.MIATokenV1.address);
  });
  
  it("Should instanciate MIATokenV1Proxy contract", async function() {
    this.MIATokenV1Proxy = await ethers.getContractAt(this.abi.MIATokenV1ABI, this.MIATokenProxy.address);
    expect(this.MIATokenV1Proxy.address).to.exist;
  });
  
  it("Should have a MIATokenV1Proxy.totalSupply equal to${1000*1000}", async function() {
    const totalSupply = await this.MIATokenV1Proxy.totalSupply();
    expect(Number(totalSupply)).equals(1000*1000);
  });

});

