//SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/proxy/TransparentUpgradeableProxy.sol";

contract MIATokenProxy is TransparentUpgradeableProxy {
  constructor(address _logic, address _admin, bytes memory _data) TransparentUpgradeableProxy(_logic, _admin, _data) { }
}