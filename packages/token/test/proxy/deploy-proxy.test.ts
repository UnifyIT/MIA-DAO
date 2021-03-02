import hre from "hardhat";

const { ethers } = hre;

// Deploy in this order:
// MIA AllowanceSheet
// MIA BalanceSheet
// MIA Ledger/Storage(BalanceSheet, AllowanceSheet)
// MIA TokenV0Logic Contact(MIA_Storage_logic)
// MIA ProxyAdmin Contract
// MIA TransparentUpgradeableProxy Contract

describe("MIA Admin Proxy contract", function() {
  
  before("Deploy prequisite contracts first", async function() {
      try {
        const MIAAllowanceSheet = await ethers.getContractFactory("MIAAllowanceSheet");
        const MIABalanceSheet = await ethers.getContractFactory("MIABalanceSheet");
      
        const miaAllowanceSheet = await MIAAllowanceSheet.deploy();
        const miaBalanceSheet = await MIABalanceSheet.deploy();
      
        const { address: allowanceSheetAddress } = miaAllowanceSheet;
        const { address: balanceSheetAddress } = miaBalanceSheet;
      
        const MIATokenV0 = await ethers.getContractFactory("MIATokenV0");
        const miaTokenV0 = await MIATokenV0.deploy();
      
        const { address: miaTokenV0Address } = miaTokenV0;

        console.log("MIAAllowanceSheet address: ", allowanceSheetAddress);
        console.log("MIABalanceSheet address: ", balanceSheetAddress );
        console.log("MIATokenV0 address: ", miaTokenV0Address);
  
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
