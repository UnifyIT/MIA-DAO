//SPDX-License-Identifier: MIT
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

  /**
  * @dev claim ownership of balance sheet passed into constructor.
  **/
  function claimBalanceOwnership() public {
      balances.claimOwnership();
  }

  /**
  * @dev claim ownership of allowance sheet passed into constructor.
  **/
  function claimAllowanceOwnership() public {
      allowances.claimOwnership();
  }

}
