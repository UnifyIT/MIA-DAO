//SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

contract MIAAllowanceSheet is Ownable {
  using SafeMath for uint256;
  
  mapping (address => mapping (address => uint256)) public allowanceOf;

  
  function addAllowance(address user, address spender, uint256 amount) public onlyOwner {
    allowanceOf[user][spender] = allowanceOf[user][spender].add(amount);
  }
  
  function subtractAllowance(address user, address spender, uint256 amount) public onlyOwner {
    allowanceOf[user][spender] = allowanceOf[user][spender].sub(amount);
  }
  
  function setAllowance(address user, address spender, uint256 amount) public onlyOwner {
    allowanceOf[user][spender] = amount;
  }

 }