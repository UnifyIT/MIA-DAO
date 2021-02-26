//SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;
import "@openzeppelin/contracts/proxy/TransparentUpgradeableProxy.sol";
import "@openzeppelin/contracts/proxy/ProxyAdmin.sol";
import "hardhat/console.sol";

// ProxyAdmin

contract MIATransparentUpgradableProxy is TransparentUpgradeableProxy {
  constructor(address _logic, address admin_, bytes memory _data) TransparentUpgradeableProxy(_logic, admin_, _data) {
    console.log("TransparentUpgradableProxy constructor");
  }
}