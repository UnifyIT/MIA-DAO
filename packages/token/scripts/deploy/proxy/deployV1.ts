import hre from "hardhat";

import utils from "../../utils";

const { ethers } = hre;
const { writeFileSync } = utils;

async function TokenV1() {
  const { HARDHAT_NETWORK } = process.env;
  const network: string = HARDHAT_NETWORK as string;
  try {
      const MIATokenV1 = await ethers.getContractFactory("MIATokenV1");
      const miaTokenV1 = await MIATokenV1.deploy();

      const { address: miaTokenV1Address } = miaTokenV1;
      
      let fileObject1: any = {}
      fileObject1["name"] = "MIATokenV1"
      fileObject1[network] = miaTokenV1Address;
      fileObject1 = JSON.stringify(fileObject1);
      writeFileSync(`./scripts/addresses/${HARDHAT_NETWORK}-MIATokenV1-address.json`, fileObject1);
    
  } catch (error) {
    console.log("error in before", error);
  }
}

TokenV1()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
  
  
  