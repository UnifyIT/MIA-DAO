import hre from "hardhat";

import utils from "../../utils";
import { MIATokenV0ABI, MIATokenProxyABI, MIATokenV1ABI } from "../../../abis";

const { ethers } = hre;
const { writeFileSync } = utils;

// MIA Logic Contact
// MIA Admin Contract
// MIA TransparentUpgradeableProxy Contract

const million = 1000*1000*1000*1000;

async function ProxyV0() {
  const { HARDHAT_NETWORK } = process.env;
  const network: string = HARDHAT_NETWORK as string;
  try {
    
    let fileObject1: any = {}
    const MIATokenV0 = await ethers.getContractFactory("MIATokenV0");
    const miaTokenV0 = await MIATokenV0.deploy();
    const { address: miaTokenV0Address } = miaTokenV0;
    
    fileObject1["name"] = "MIATokenV0"
    fileObject1[network] = miaTokenV0Address;
    fileObject1 = JSON.stringify(fileObject1);
    writeFileSync(`./scripts/addresses/${HARDHAT_NETWORK}-MIATokenV0-address.json`, fileObject1);
    
    const MIAProxyAdmin = await ethers.getContractFactory("MIATokenProxyAdmin");
    const miaProxyAdmin = await MIAProxyAdmin.deploy();    
    const { address: miaProxyAdminAddress } = miaProxyAdmin;
    
    let fileObject2: any = {}
    fileObject2["name"] = "MIAProxyAdmin";
    fileObject2[network] = miaProxyAdminAddress;
    fileObject2 = JSON.stringify(fileObject2);
    writeFileSync(`./scripts/addresses/${HARDHAT_NETWORK}-MIAProxyAdmin-address.json`, fileObject2);
    
    const abiInterface = new ethers.utils.Interface(MIATokenV0ABI);
    const functionToCall = "initialize";
    const totalSupply = million;
    const parameters = ["Miami Coin", "MIA", 6, totalSupply];
    const bytes = abiInterface.encodeFunctionData(functionToCall, parameters);
    
    const MIATokenProxy = await ethers.getContractFactory("MIATokenProxy");
    const miaTokenProxy = await MIATokenProxy.deploy(miaTokenV0Address, miaProxyAdminAddress, bytes, { gasLimit: 1000000 });
    const { address } = miaTokenProxy;
    
    let fileObject3: any = {}
    fileObject3["name"] = "MIATokenProxy";
    fileObject3[network] =  address;
    fileObject3 = JSON.stringify(fileObject3);
    writeFileSync(`./scripts/addresses/${HARDHAT_NETWORK}-MIATokenProxy-address.json`, fileObject3);
    
  } catch (error) {
    console.log("error in before", error);
  }
}

ProxyV0()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
  
  
  