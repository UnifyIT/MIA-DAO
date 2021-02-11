//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

import "./helpers/MIA_Ownable.sol";

 contract MIA_V0 is ERC20, MIA_Ownable {
  constructor(string memory name, string memory symbol) ERC20(name, symbol) public {
    console.log("HELLO MIA_V0");
  }
}