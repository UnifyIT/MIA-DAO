require("@nomiclabs/hardhat-waffle");
const dotenv = require("dotenv");
// console.log("process.env1", process.env);
require('dotenv').config();
// console.log("process.env2", process.env);

const { INFURA_ID, RINKEBY_PRIVATE_KEY, RINKEBY_INFURA_URL, } = process.env
// console.log(INFURA_ID, RINKEBY_PRIVATE_KEY, RINKEBY_INFURA_URL);
// const INFURA_ID = "a121d29a5c61486cb7e74cd223d55004";
// const RINKEBY_PRIVATE_KEY = "d8e68ee7bc4b81c4201aeba2baac52c9d478f845ee3be13e6b99eaa66a92f889";
// const RINKEBY_INFURA_URL ="https://rinkeby.infura.io/v3/";
const url = `${RINKEBY_INFURA_URL}${INFURA_ID}`;
// console.log('url', url);
const accounts = [`0x${RINKEBY_PRIVATE_KEY}`];
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.7.3",
  networks: {
  rinkeby: {
    url,
    accounts
  }
}
};

