//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;
import "hardhat/console.sol";

import "./MIA_V0.sol";

contract MIA_V1 is MIA_V0 {
  constructor(string memory name, string memory symbol) public MIA_V0(name, symbol) {}
}