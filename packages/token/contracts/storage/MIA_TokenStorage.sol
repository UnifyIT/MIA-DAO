//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;
import "hardhat/console.sol";

import "./MIA_BalanceSheet.sol";
import "./MIA_AllowanceSheet.sol";

/**
* @title MIA_TokenStorage
*/

contract MIA_TokenStorage {
  
  MIA_BalanceSheet public balances;
  MIA_AllowanceSheet public allowances;

  constructor(address _balances, address _allowances) public {
    console.log("MIA Token Storage");
    balances = MIA_BalanceSheet(_balances);
    allowances = MIA_AllowanceSheet(_allowances);
  }
}
