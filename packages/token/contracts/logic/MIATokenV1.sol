//SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

import "./MIATokenV0.sol";

contract MIATokenV1 is MIATokenV0 {
  using SafeMath for uint256;
  bool internal _initializedV2;
  
  modifier initializerV2 () {
    require(!_initializedV2, "MIATokenV1: contract is already initialized");
    _;
  }
  
  function initializeV2() public initializerV2 {
    _initializedV2 = true;
  }
  
  function burn(uint256 amount) public {
    _burn(_msgSender(), amount);
  }

  function burnFrom(address account, uint256 amount) public {
    uint256 decreasedAllowance = allowance(account, _msgSender()).sub(amount, "ERC20: burn amount exceeds allowance");
    _approve(account, _msgSender(), decreasedAllowance);
    _burn(account, amount);
  }

}