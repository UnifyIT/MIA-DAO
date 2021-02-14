//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;
import "hardhat/console.sol";

import "./MIA_V0.sol";

contract MIA_V1 is MIA_V0 {
  constructor(
    string memory _name, 
    string memory _symbol, 
    address _balances, 
    address _allowances,
    uint8 _decimals
  ) public MIA_V0(_name, _symbol, _balances, _allowances, _decimals) {}
}