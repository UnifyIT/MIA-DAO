//SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/proxy/ProxyAdmin.sol";
import "hardhat/console.sol";

contract MIAAdminProxy is Ownable, ProxyAdmin {
  function setLogic(address _logic) public onlyOwner {
    
  }
}