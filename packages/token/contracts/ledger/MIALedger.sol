//SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;
import "@openzeppelin/contracts/proxy/Initializable.sol";

import "./MIABalanceSheet.sol";
import "./MIAAllowanceSheet.sol";

contract MIALedger is Initializable {
  MIABalanceSheet public balances;
  MIAAllowanceSheet public allowances;

  function initialize(address _balances, address _allowances) public initializer {
    balances = MIABalanceSheet(_balances);
    allowances = MIAAllowanceSheet(_allowances);
  }
}