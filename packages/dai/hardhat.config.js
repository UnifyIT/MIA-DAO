require("@nomiclabs/hardhat-waffle");
const dotenv = require("dotenv");
dotenv.config()

const { 
  INFURA_ID, 
  RINKEBY_PRIVATE_KEY, 
  RINKEBY_INFURA_URL,

} = process.env

const url = `${RINKEBY_INFURA_URL}${INFURA_ID}`;

const accounts = [`0x${RINKEBY_PRIVATE_KEY}`];
const rinkeby = {
  url,
  accounts,
}
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.7.3",
  networks: {
    rinkeby,

  }
};

