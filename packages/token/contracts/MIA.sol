//SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract MIA is ERC20 {
  address public owner;

  constructor(string memory name, string memory symbol, uint256 initialSupply, uint8 decimals) public ERC20(name, symbol) {
    owner = msg.sender;
    _setupDecimals(decimals);
    _mint(msg.sender, initialSupply);
    // hg
    // _mint(0x5Db06acd673531218B10430bA6dE9b69913Ad545, initialSupply);
    // Scott
    _mint(0x5eE2A41A96bA013d502F5cf3d250F73D88c22a6c, initialSupply);
    // Jorge
    _mint(0xE3EDE12b72Da70CF0aeCE9f27E9c443B2b4F93Bf, initialSupply);
    // NestorB
    _mint(0x00F51D0eEd160D53F9D90e70b35A43EbfB618c5b, initialSupply);
  }

}