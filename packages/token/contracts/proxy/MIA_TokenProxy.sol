//SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;
import "hardhat/console.sol";
import "@openzeppelin/contracts/proxy/UpgradeableProxy.sol";

import "../access/MIA_Ownable.sol";
import "../storage/MIA_TokenStorage.sol";

contract MIA_TokenProxy is UpgradeableProxy, MIA_Ownable, MIA_TokenStorage {
  constructor(address _implementation, address _balances, address _allowances) 
  UpgradeableProxy(_implementation, "")
  MIA_TokenStorage(_balances, _allowances) public {}

  function upgradeTo(address newImplementation) public onlyOwner {
    _upgradeTo(newImplementation);
  }

  function implementation() public view returns (address) {
    return _implementation();
  }
}
