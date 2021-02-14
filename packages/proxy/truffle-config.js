/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a 
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() { 
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>') 
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */
const HDWalletProvider = require("truffle-hdwallet-provider");
require('dotenv').config()  // Stores environment-specific variable from '.env' to process.env

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!

	networks: {
		development: {
			host: 'localhost',
			port: 8545,
			network_id: '*',
		},
		ropsten: {
	      provider: function () {
	          return new HDWalletProvider(process.env.METAMASK_MNEMONIC, process.env.ROSPTEN_INFURA_URL + process.env.INFURA_ID)
	      },
	      network_id: 3,
	      gas: 7000000
	    },
	},
	mocha: {
	   reporter: 'eth-gas-reporter',
	   reporterOptions: {
	     gasPrice: 21
	   }
	},
};
