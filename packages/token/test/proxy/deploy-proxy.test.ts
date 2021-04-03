import hre from "hardhat";
import { expect } from "chai";

import { MIATokenV0ABI, MIATokenProxyABI, MIATokenV1ABI } from "../../abis";

const { ethers } = hre;

// Deploy in this order:
// MIA TokenV0Logic
// MIA ProxyAdmin Contract
// MIA TransparentUpgradeableProxy Contract

const million = 1000*1000;
const mockTransferAmount = 1000*10;

describe("MIA Admin Proxy contract", function() {

  before("Deploy prequisite contracts first", async function() {
      const MIATokenV0 = await ethers.getContractFactory("MIATokenV0");
      const miaTokenV0 = await MIATokenV0.deploy();
      const { address: miaTokenV0Address, } = miaTokenV0;
      
      const MIAProxyAdmin = await ethers.getContractFactory("MIATokenProxyAdmin");
      const miaProxyAdmin = await MIAProxyAdmin.deploy();
      this.MIAProxyAdmin = miaProxyAdmin;
      
      const { address: miaProxyAdminAddress } = miaProxyAdmin;
      
      this.addresses = {
        MIATokenV0: miaTokenV0Address,
        MIAProxyAdmin: miaProxyAdminAddress,
      }
      
      this.abi = {
        MIATokenV0ABI,
        MIATokenV1ABI,
        MIATokenProxyABI,
      }

      const abiInterface = new ethers.utils.Interface(this.abi.MIATokenV0ABI);
      const functionToCall = "initialize";
      this.totalSupply = million;
      const parameters = ["MIA DAO", "MIA", 6, this.totalSupply];
      this.bytes = abiInterface.encodeFunctionData(functionToCall, parameters);

      this.spender = "0x5Db06acd673531218B10430bA6dE9b69913Ad545";

  });

  it("Should deploy MIATokenProxy", async function() {
    const MIATokenProxy = await ethers.getContractFactory("MIATokenProxy");
    this.MIATokenProxy = await MIATokenProxy.deploy(this.addresses.MIATokenV0, this.addresses.MIAProxyAdmin, this.bytes);
    const { address } = this.MIATokenProxy;
    this.addresses = {
      ...this.addresses,
      MIATokenProxy: address,
    }

    expect(address).to.exist;
  });
  
  it("Should instanciate MIATokenV0Proxy contract", async function () {
    this.MIATokenV0Proxy = await ethers.getContractAt(this.abi.MIATokenV0ABI, this.MIATokenProxy.address);
    const { address } = this.MIATokenV0Proxy;

    expect(address).to.exist;
  });
  
  it("Should have owner", async function() {
    this.owner = await this.MIATokenV0Proxy.owner();

    expect(this.owner).to.exist;
  });
  
  it("Should MIATokenV0Proxy totalSupply be equal to: 1,000,000", async function() {
    const totalSupply = await this.MIATokenV0Proxy.totalSupply();

    expect(Number(totalSupply)).equals(million);
  });

  it("Should approve 10,000 tokens", async function() {
    const approved = await this.MIATokenV0Proxy.approve(this.owner, mockTransferAmount);

    expect(approved).to.exist;
  });
  
  it("Should allowance 10,000", async function() {
    const allowance = await this.MIATokenV0Proxy.allowance(this.owner, this.owner);

    expect(Number(allowance)).to.equals(mockTransferAmount);
  });
  
  it("Should transferFrom tokens", async function() {
    const balanceOfProxy = Number(await this.MIATokenV0Proxy.balanceOf(this.owner));
    const balanceOf = Number((await this.MIATokenV0Proxy.balanceOf(this.spender)));
    const expectedBalanceOfProxy = balanceOfProxy - mockTransferAmount;
    
    const transfer = await this.MIATokenV0Proxy.transferFrom(this.owner, this.spender, mockTransferAmount);
    
    const postTransferFromBalanceOfProxy = Number(await this.MIATokenV0Proxy.balanceOf(this.owner));
    const postTransferFromBalanceOfRecipient = Number((await this.MIATokenV0Proxy.balanceOf(this.spender)));

    expect(balanceOf).to.equals(0);
    expect(postTransferFromBalanceOfRecipient).to.equals(mockTransferAmount);
    expect(postTransferFromBalanceOfProxy).to.equals(expectedBalanceOfProxy);
  });
  
  it("Should have a Transfer event with an amount of 10,000", async function() {
    const events = await  this.MIATokenV0Proxy.queryFilter("Transfer");
    const lastEvent = events[events.length - 1]; 
    const lastEventTransferAmount = Number(lastEvent.args[2]);

    expect(lastEventTransferAmount).to.equals(mockTransferAmount);
  });
  
  it("Should deploy MIATokenV1", async function() {
    const MIATokenV1 = await ethers.getContractFactory("MIATokenV1");
    this.MIATokenV1 = await MIATokenV1.deploy();
    this.addresses = {
      ...this.addresses,
      MIATokenV1: this.MIATokenV1.address,
    }
    const { address } = this.MIATokenV1;

    expect(address).to.exist;
  });
  
  it("Should update to a new implementation and such implementation address be equal to MIATokenV1 address", async function() {
    const upgrade = await this.MIAProxyAdmin.upgrade(this.MIATokenProxy.address, this.addresses.MIATokenV1);
    const implementation = await this.MIAProxyAdmin.getProxyImplementation(this.addresses.MIATokenProxy);

    expect(implementation).to.equals(this.MIATokenV1.address);
  });
  
  it("Should instanciate MIATokenV1Proxy contract", async function() {
    this.MIATokenV1Proxy = await ethers.getContractAt(this.abi.MIATokenV1ABI, this.addresses.MIATokenProxy);
    await this.MIATokenV1Proxy.initializeV2();

    expect(this.MIATokenV1Proxy.address).to.exist;
  });
  
  it("Should have a MIATokenV1Proxy.totalSupply equal to: 1,000,000", async function() {
    const totalSupply = await this.MIATokenV1Proxy.totalSupply();

    expect(Number(totalSupply)).equals(million);
  });

});

