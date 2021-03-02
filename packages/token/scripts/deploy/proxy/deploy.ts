import hre from "hardhat";
import utils from "../../utils";
import { MIALogic } from "../../../abis";

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
    // const signer = (await hre.ethers.getSigners())[0];
    
    // const MIAAdminProxy = await hre.ethers.getContractFactory(AdminProxy.abi, AdminProxy.bytecode);
    const MIAAdminProxy = await hre.ethers.getContractFactory("ProxyAdmin")
    const miaAdminProxy = await MIAAdminProxy.deploy();
    const { address: adminProxyAddress } = miaAdminProxy;
    //   const MIAAdminProxy = await hre.ethers.getContractFactory("MIAAdminProxy");
    //   const miaAdminProxy = await MIAAdminProxy.deploy();
    //   const { address: adminProxyAddress } = miaAdminProxy;
    
    // console.log("adminProxyAddress", adminProxyAddress);
    const abi =  MIALogic.abi;
    const abiInterface = new hre.ethers.utils.Interface(abi);
    const bytes = abiInterface.encodeFunctionData('initialize', [9, 'MYSTRING2222'])
    
    // const MIATransparentUpgradableProxy = await hre.ethers.getContractFactory("MIATransparentUpgradableProxy");
    const MIATransparentUpgradableProxy = await hre.ethers.getContractFactory("TransparentUpgradeableProxy");
    const miaTransparentUpgradableProxy = await MIATransparentUpgradableProxy.deploy(miaLogicV0Address, adminProxyAddress, bytes);
    
    const { address } = miaTransparentUpgradableProxy;
    // console.log('miaTransparentUpgradableProxy.address',  address);
    // console.log('callStatic', callStatic);
    
    const ProxyToken = await hre.ethers.getContractAt(abi, address);
    console.log(await ProxyToken.name());
    console.log(await ProxyToken.symbol());
    console.log(await ProxyToken.decimals());
    console.log(await ProxyToken.totalSupply());
    // console.log(`MIA TransparentUpgradeableProxy Contract deployed to ${HARDHAT_NETWORK} network`)
    // fileObject[network] =  miaTransparentUpgradableProxy.address;
    // fileObject = JSON.stringify(fileObject);
    // writeFileSync(`./scripts/${HARDHAT_NETWORK}miaTransparentUpgradableProxy-address.json`, fileObject);
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
  
  
  