import hre from "hardhat";
import utils from "../../utils";
import { MIATokenV0ABI } from "../../../abis";

const { writeFileSync } = utils;

// MIA Logic Contact
// MIA Admin Contract
// MIA TransparentUpgradeableProxy Contract

async function ProxyV0() {
  let fileObject: any = {}
  const { HARDHAT_NETWORK } = process.env;
  const network: string = HARDHAT_NETWORK as string;
  try {
    const MIALogicV0 = await hre.ethers.getContractFactory("MIALogicV0");
    const miaLogicV0 = await MIALogicV0.deploy();
    const { address: miaLogicV0Address } = miaLogicV0; 

    const MIAAdminProxy = await hre.ethers.getContractFactory("ProxyAdmin")
    const miaAdminProxy = await MIAAdminProxy.deploy();
    const { address: adminProxyAddress } = miaAdminProxy;

    const abi =  MIATokenV0ABI
    const abiInterface = new hre.ethers.utils.Interface(abi);
    const bytes = abiInterface.encodeFunctionData('initialize', [9, 'MYSTRING2222'])

    const MIATransparentUpgradableProxy = await hre.ethers.getContractFactory("TransparentUpgradeableProxy");
    const miaTransparentUpgradableProxy = await MIATransparentUpgradableProxy.deploy(miaLogicV0Address, adminProxyAddress, bytes);
    
    const { address } = miaTransparentUpgradableProxy;
    
    const ProxyToken = await hre.ethers.getContractAt(abi, address);
    fileObject[network] =  miaTransparentUpgradableProxy.address;
    fileObject = JSON.stringify(fileObject);
    writeFileSync(`./scripts/${HARDHAT_NETWORK}miaTransparentUpgradableProxy-address.json`, fileObject);
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
  
  
  