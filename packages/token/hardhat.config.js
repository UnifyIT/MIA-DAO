require("@nomiclabs/hardhat-waffle");
const dotenv = require("dotenv");

require('dotenv').config();


const { INFURA_ID, RINKEBY_PRIVATE_KEY, RINKEBY_INFURA_URL, } = process.env

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

