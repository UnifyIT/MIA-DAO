var TokenProxy = artifacts.require("./TokenProxy.sol");
var Token_V0 = artifacts.require("./Token_V0.sol");
var BalanceSheet = artifacts.require("./BalanceSheet.sol");
var AllowanceSheet = artifacts.require("./AllowanceSheet.sol");

module.exports = function(deployer, network, accounts) {
  let owner = accounts[0];
  console.log('account claiming contracts as owner: ' + owner)
  Token_V0.deployed().then(proxy => {
    BalanceSheet.deployed().then(function (balances) {
      AllowanceSheet.deployed().then(function (allowances) {
        TokenProxy.deployed().then(function(proxy) {
          balances.transferOwnership(proxy.address, {from:owner}).then(function() {
            allowances.transferOwnership(proxy.address, {from:owner}).then(function() {
              proxy.claimBalanceOwnership().then(function() {
                proxy.claimAllowanceOwnership().then(function () {
                	console.log('---SETUP COMPLETE, PROXY IS READY TO USE!---')
                })
              })
            })
          })
        })
      })
    })
  })
};
