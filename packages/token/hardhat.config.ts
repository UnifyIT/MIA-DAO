import dotenv from "dotenv"
// import { task } from "hardhat";
import { HardhatUserConfig } from "hardhat/types"
import "@nomiclabs/hardhat-waffle"
import "hardhat-typechain"

dotenv.config()

const { 
  INFURA_ID, 
  RINKEBY_PRIVATE_KEY, 
  RINKEBY_INFURA_URL,
} = process.env

console.log("now running in typescript");

const url = `${RINKEBY_INFURA_URL}${INFURA_ID}`;

const accounts = [`0x${RINKEBY_PRIVATE_KEY}`];

const rinkeby = {
  url,
  accounts,
}

const config: HardhatUserConfig = {
  solidity: {
    compilers: [{ version: "0.7.3", settings: {} }],
  },
  networks: {
    rinkeby,
  }
}

export default config;

